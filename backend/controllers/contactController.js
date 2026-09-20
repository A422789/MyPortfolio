const ContactSubmission = require('../models/ContactSubmission');
const { sendSuccess, sendCreated, sendError } = require('../utils/responseFormatter');
const logger = require('../utils/logger');
const asyncHandler = require('../utils/asyncHandler');
const { logActivity } = require('./analyticsController');

// POST /api/contact — public
const submitContact = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  // Save to database
  const submission = await ContactSubmission.create({ name, email, message });
  logger.info(`Contact submission saved to DB from: ${email}`);

  sendCreated(res, { id: submission._id }, 'Message sent successfully');
});

// GET /api/admin/contacts — admin only
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await ContactSubmission.find().sort({ createdAt: -1 });
  sendSuccess(res, contacts);
});

// PUT /api/admin/contacts/:id/read — mark as read
const markAsRead = asyncHandler(async (req, res) => {
  const contact = await ContactSubmission.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );
  if (!contact) {
    return sendError(res, 'Contact submission not found', 404);
  }
  sendSuccess(res, contact, 'Marked as read');
});

// DELETE /api/admin/contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await ContactSubmission.findByIdAndDelete(req.params.id);
  if (!contact) {
    return sendError(res, 'Contact submission not found', 404);
  }
  await logActivity('DELETE', 'Message', contact._id, `Deleted contact message from: ${contact.email}`, req.ip);
  sendSuccess(res, null, 'Contact submission deleted successfully');
});

module.exports = {
  submitContact,
  getContacts,
  markAsRead,
  deleteContact,
};
