const ActivityLog = require('../models/ActivityLog');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Certificate = require('../models/Certificate');
const ContactSubmission = require('../models/ContactSubmission');
const { sendSuccess } = require('../utils/responseFormatter');
const asyncHandler = require('../utils/asyncHandler');

/**
 * GET /api/admin/stats
 * Overview analytics for dashboard cards
 */
const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalProjects,
    totalSkills,
    totalCertificates,
    unreadMessages,
    totalMessages,
    recentLogs,
  ] = await Promise.all([
    Project.countDocuments(),
    Skill.countDocuments(),
    Certificate.countDocuments(),
    ContactSubmission.countDocuments({ isRead: false }),
    ContactSubmission.countDocuments(),
    ActivityLog.find().sort({ createdAt: -1 }).limit(10),
  ]);

  sendSuccess(res, {
    totalProjects,
    totalSkills,
    totalCertificates,
    unreadMessages,
    totalMessages,
    recentLogs,
  });
});

/**
 * GET /api/admin/activity-logs
 * Fetch recent activity audit logs
 */
const getActivityLogs = asyncHandler(async (req, res) => {
  const logs = await ActivityLog.find().sort({ createdAt: -1 }).limit(50);
  sendSuccess(res, logs);
});

/**
 * Helper to log an activity internally
 */
const logActivity = async (action, entity, entityId = null, details = '', ipAddress = '') => {
  try {
    await ActivityLog.create({
      action,
      entity,
      entityId,
      details,
      ipAddress,
    });
  } catch (err) {
    // Non-blocking error
    console.error('Failed to log activity:', err.message);
  }
};

module.exports = {
  getDashboardStats,
  getActivityLogs,
  logActivity,
};
