const Project = require('../models/Project');
const { sendSuccess, sendCreated, sendError } = require('../utils/responseFormatter');
const { uploadToCloudinary, replaceOnCloudinary, deleteFromCloudinary, removeTempFile } = require('../utils/cloudinaryUpload');
const asyncHandler = require('../utils/asyncHandler');
const cacheService = require('../services/cacheService');
const { logActivity } = require('./analyticsController');

// GET /api/projects — public
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ order: 1 });
  if (res.sendCachedSuccess) {
    return res.sendCachedSuccess(projects);
  }
  sendSuccess(res, projects);
});

// POST /api/admin/projects
const createProject = asyncHandler(async (req, res) => {
  const projectData = { ...req.body };

  // Parse techStack if it's a comma-separated string
  if (typeof projectData.techStack === 'string') {
    projectData.techStack = projectData.techStack.split(',').map((s) => s.trim()).filter(Boolean);
  }

  let uploadedAsset = null;

  // Handle image upload
  if (req.file) {
    uploadedAsset = await uploadToCloudinary(req.file.path, 'portfolio/projects', 'image');
    projectData.image = { url: uploadedAsset.url, publicId: uploadedAsset.publicId };
    removeTempFile(req.file.path);
  }

  try {
    const project = await Project.create(projectData);
    cacheService.invalidatePublicData();
    await logActivity('CREATE', 'Project', project._id, `Created project: ${project.title}`, req.ip);
    sendCreated(res, project);
  } catch (err) {
    // Cloudinary rollback if MongoDB creation fails
    if (uploadedAsset?.publicId) {
      await deleteFromCloudinary(uploadedAsset.publicId, 'image').catch(() => {});
    }
    throw err;
  }
});

// PUT /api/admin/projects/:id
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    if (req.file) removeTempFile(req.file.path);
    return sendError(res, 'Project not found', 404);
  }

  const updateData = { ...req.body };

  // Parse techStack if it's a comma-separated string
  if (typeof updateData.techStack === 'string') {
    updateData.techStack = updateData.techStack.split(',').map((s) => s.trim()).filter(Boolean);
  }

  // Handle image replacement
  if (req.file) {
    const result = await replaceOnCloudinary(
      req.file.path,
      project.image?.publicId,
      'portfolio/projects',
      'image'
    );
    updateData.image = { url: result.url, publicId: result.publicId };
    removeTempFile(req.file.path);
  }

  const updatedProject = await Project.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  cacheService.invalidatePublicData();
  await logActivity('UPDATE', 'Project', updatedProject._id, `Updated project: ${updatedProject.title}`, req.ip);

  sendSuccess(res, updatedProject, 'Project updated successfully');
});

// DELETE /api/admin/projects/:id
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return sendError(res, 'Project not found', 404);
  }

  // Delete Cloudinary asset
  if (project.image?.publicId) {
    await deleteFromCloudinary(project.image.publicId, 'image').catch(() => {});
  }

  await Project.findByIdAndDelete(req.params.id);
  cacheService.invalidatePublicData();
  await logActivity('DELETE', 'Project', project._id, `Deleted project: ${project.title}`, req.ip);

  sendSuccess(res, null, 'Project deleted successfully');
});

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};
