const Certificate = require('../models/Certificate');
const { sendSuccess, sendCreated, sendError } = require('../utils/responseFormatter');
const { uploadToCloudinary, replaceOnCloudinary, deleteFromCloudinary, removeTempFile } = require('../utils/cloudinaryUpload');
const asyncHandler = require('../utils/asyncHandler');
const cacheService = require('../services/cacheService');
const { logActivity } = require('./analyticsController');

// GET /api/certificates — public
const getCertificates = asyncHandler(async (req, res) => {
  const certificates = await Certificate.find().sort({ order: 1 });
  if (res.sendCachedSuccess) {
    return res.sendCachedSuccess(certificates);
  }
  sendSuccess(res, certificates);
});

// POST /api/admin/certificates
const createCertificate = asyncHandler(async (req, res) => {
  const certData = { ...req.body };
  let uploadedAsset = null;

  if (req.file) {
    uploadedAsset = await uploadToCloudinary(req.file.path, 'portfolio/certificates', 'raw');
    certData.certificateFile = { url: uploadedAsset.url, publicId: uploadedAsset.publicId };
    removeTempFile(req.file.path);
  }

  try {
    const certificate = await Certificate.create(certData);
    cacheService.invalidatePublicData();
    await logActivity('CREATE', 'Certificate', certificate._id, `Created certificate: ${certificate.title}`, req.ip);
    sendCreated(res, certificate);
  } catch (err) {
    if (uploadedAsset?.publicId) {
      await deleteFromCloudinary(uploadedAsset.publicId, 'raw').catch(() => {});
    }
    throw err;
  }
});

// PUT /api/admin/certificates/:id
const updateCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findById(req.params.id);
  if (!certificate) {
    if (req.file) removeTempFile(req.file.path);
    return sendError(res, 'Certificate not found', 404);
  }

  const updateData = { ...req.body };

  if (req.file) {
    const result = await replaceOnCloudinary(
      req.file.path,
      certificate.certificateFile?.publicId,
      'portfolio/certificates',
      'raw'
    );
    updateData.certificateFile = { url: result.url, publicId: result.publicId };
    removeTempFile(req.file.path);
  }

  const updatedCert = await Certificate.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  cacheService.invalidatePublicData();
  await logActivity('UPDATE', 'Certificate', updatedCert._id, `Updated certificate: ${updatedCert.title}`, req.ip);

  sendSuccess(res, updatedCert, 'Certificate updated successfully');
});

// DELETE /api/admin/certificates/:id
const deleteCertificate = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findById(req.params.id);
  if (!certificate) {
    return sendError(res, 'Certificate not found', 404);
  }

  if (certificate.certificateFile?.publicId) {
    await deleteFromCloudinary(certificate.certificateFile.publicId, 'raw').catch(() => {});
  }

  await Certificate.findByIdAndDelete(req.params.id);
  cacheService.invalidatePublicData();
  await logActivity('DELETE', 'Certificate', certificate._id, `Deleted certificate: ${certificate.title}`, req.ip);

  sendSuccess(res, null, 'Certificate deleted successfully');
});

module.exports = {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
};
