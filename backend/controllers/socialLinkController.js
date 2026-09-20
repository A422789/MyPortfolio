const SocialLink = require('../models/SocialLink');
const { sendSuccess, sendCreated, sendError } = require('../utils/responseFormatter');
const asyncHandler = require('../utils/asyncHandler');
const cacheService = require('../services/cacheService');
const { logActivity } = require('./analyticsController');

// GET /api/social-links — public
const getSocialLinks = asyncHandler(async (req, res) => {
  const links = await SocialLink.find().sort({ order: 1 });
  if (res.sendCachedSuccess) {
    return res.sendCachedSuccess(links);
  }
  sendSuccess(res, links);
});

// POST /api/admin/social-links
const createSocialLink = asyncHandler(async (req, res) => {
  const link = await SocialLink.create(req.body);
  cacheService.invalidatePublicData();
  await logActivity('CREATE', 'SocialLink', link._id, `Created social link: ${link.platform}`, req.ip);
  sendCreated(res, link);
});

// PUT /api/admin/social-links/:id
const updateSocialLink = asyncHandler(async (req, res) => {
  const link = await SocialLink.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!link) {
    return sendError(res, 'Social link not found', 404);
  }
  cacheService.invalidatePublicData();
  await logActivity('UPDATE', 'SocialLink', link._id, `Updated social link: ${link.platform}`, req.ip);
  sendSuccess(res, link, 'Social link updated successfully');
});

// DELETE /api/admin/social-links/:id
const deleteSocialLink = asyncHandler(async (req, res) => {
  const link = await SocialLink.findByIdAndDelete(req.params.id);
  if (!link) {
    return sendError(res, 'Social link not found', 404);
  }
  cacheService.invalidatePublicData();
  await logActivity('DELETE', 'SocialLink', link._id, `Deleted social link: ${link.platform}`, req.ip);
  sendSuccess(res, null, 'Social link deleted successfully');
});

module.exports = {
  getSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
};
