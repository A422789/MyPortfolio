const Skill = require('../models/Skill');
const { sendSuccess, sendCreated, sendError } = require('../utils/responseFormatter');
const asyncHandler = require('../utils/asyncHandler');
const cacheService = require('../services/cacheService');
const { logActivity } = require('./analyticsController');

// GET /api/skills — public
const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find().sort({ order: 1 });
  if (res.sendCachedSuccess) {
    return res.sendCachedSuccess(skills);
  }
  sendSuccess(res, skills);
});

// POST /api/admin/skills
const createSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.create(req.body);
  cacheService.invalidatePublicData();
  await logActivity('CREATE', 'Skill', skill._id, `Created skill: ${skill.name}`, req.ip);
  sendCreated(res, skill);
});

// PUT /api/admin/skills/:id
const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!skill) {
    return sendError(res, 'Skill not found', 404);
  }
  cacheService.invalidatePublicData();
  await logActivity('UPDATE', 'Skill', skill._id, `Updated skill: ${skill.name}`, req.ip);
  sendSuccess(res, skill, 'Skill updated successfully');
});

// DELETE /api/admin/skills/:id
const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);
  if (!skill) {
    return sendError(res, 'Skill not found', 404);
  }
  cacheService.invalidatePublicData();
  await logActivity('DELETE', 'Skill', skill._id, `Deleted skill: ${skill.name}`, req.ip);
  sendSuccess(res, null, 'Skill deleted successfully');
});

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};
