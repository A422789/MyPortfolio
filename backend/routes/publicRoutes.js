const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/profileController');
const { getSocialLinks } = require('../controllers/socialLinkController');
const { getProjects } = require('../controllers/projectController');
const { getSkills } = require('../controllers/skillController');
const { getCertificates } = require('../controllers/certificateController');
const { submitContact } = require('../controllers/contactController');
const { validate, schemas } = require('../middleware/validate');
const { contactLimiter } = require('../middleware/rateLimiter');
const cacheMiddleware = require('../middleware/cacheMiddleware');

// Public read-only endpoints with in-memory caching
router.get('/profile', cacheMiddleware(600), getProfile);
router.get('/social-links', cacheMiddleware(600), getSocialLinks);
router.get('/projects', cacheMiddleware(600), getProjects);
router.get('/skills', cacheMiddleware(600), getSkills);
router.get('/certificates', cacheMiddleware(600), getCertificates);

// Contact form submission (rate-limited + validated)
router.post('/contact', contactLimiter, validate(schemas.contact), submitContact);

module.exports = router;
