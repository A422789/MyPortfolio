const Profile = require('../models/Profile');
const { sendSuccess, sendError } = require('../utils/responseFormatter');
const { replaceOnCloudinary, removeTempFile } = require('../utils/cloudinaryUpload');
const asyncHandler = require('../utils/asyncHandler');
const cacheService = require('../services/cacheService');
const { logActivity } = require('./analyticsController');

// GET /api/profile — public
const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne();
  if (!profile) {
    return sendError(res, 'Profile not found', 404);
  }
  if (res.sendCachedSuccess) {
    return res.sendCachedSuccess(profile);
  }
  sendSuccess(res, profile);
});

// PUT /api/admin/profile — update text fields
const updateProfile = asyncHandler(async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = new Profile();
  }

  const allowedFields = [
    'name', 'title', 'heroText', 'typeAnimationText',
    'aboutText', 'email', 'phone', 'location', 'footerText'
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      profile[field] = req.body[field];
    }
  });

  await profile.save();
  cacheService.invalidatePublicData();
  await logActivity('UPDATE', 'Profile', profile._id, 'Updated profile bio and details', req.ip);

  sendSuccess(res, profile, 'Profile updated successfully');
});

// PUT /api/admin/profile/hero-image
const updateHeroImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return sendError(res, 'No image file provided', 400);
  }

  const profile = await Profile.findOne();
  if (!profile) {
    removeTempFile(req.file.path);
    return sendError(res, 'Profile not found', 404);
  }

  const result = await replaceOnCloudinary(
    req.file.path,
    profile.heroImage?.publicId,
    'portfolio/profile',
    'image'
  );

  profile.heroImage = { url: result.url, publicId: result.publicId };
  await profile.save();
  removeTempFile(req.file.path);
  cacheService.invalidatePublicData();
  await logActivity('UPDATE_IMAGE', 'Profile', profile._id, 'Updated hero image', req.ip);

  sendSuccess(res, profile, 'Hero image updated successfully');
});

// PUT /api/admin/profile/about-image
const updateAboutImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return sendError(res, 'No image file provided', 400);
  }

  const profile = await Profile.findOne();
  if (!profile) {
    removeTempFile(req.file.path);
    return sendError(res, 'Profile not found', 404);
  }

  const result = await replaceOnCloudinary(
    req.file.path,
    profile.aboutImage?.publicId,
    'portfolio/profile',
    'image'
  );

  profile.aboutImage = { url: result.url, publicId: result.publicId };
  await profile.save();
  removeTempFile(req.file.path);
  cacheService.invalidatePublicData();
  await logActivity('UPDATE_IMAGE', 'Profile', profile._id, 'Updated about image', req.ip);

  sendSuccess(res, profile, 'About image updated successfully');
});

// PUT /api/admin/profile/contact-image
const updateContactImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return sendError(res, 'No image file provided', 400);
  }

  const profile = await Profile.findOne();
  if (!profile) {
    removeTempFile(req.file.path);
    return sendError(res, 'Profile not found', 404);
  }

  const result = await replaceOnCloudinary(
    req.file.path,
    profile.contactImage?.publicId,
    'portfolio/profile',
    'image'
  );

  profile.contactImage = { url: result.url, publicId: result.publicId };
  await profile.save();
  removeTempFile(req.file.path);
  cacheService.invalidatePublicData();
  await logActivity('UPDATE_IMAGE', 'Profile', profile._id, 'Updated contact image', req.ip);

  sendSuccess(res, profile, 'Contact image updated successfully');
});

// PUT /api/admin/profile/cv
const updateCV = asyncHandler(async (req, res) => {
  if (!req.file) {
    return sendError(res, 'No CV file provided', 400);
  }

  const profile = await Profile.findOne();
  if (!profile) {
    removeTempFile(req.file.path);
    return sendError(res, 'Profile not found', 404);
  }

  const result = await replaceOnCloudinary(
    req.file.path,
    profile.cvFile?.publicId,
    'portfolio/cv',
    'raw'
  );

  profile.cvFile = { url: result.url, publicId: result.publicId };
  await profile.save();
  removeTempFile(req.file.path);
  cacheService.invalidatePublicData();
  await logActivity('UPDATE_CV', 'Profile', profile._id, 'Updated CV PDF document', req.ip);

  sendSuccess(res, profile, 'CV updated successfully');
});

module.exports = {
  getProfile,
  updateProfile,
  updateHeroImage,
  updateAboutImage,
  updateContactImage,
  updateCV,
};
