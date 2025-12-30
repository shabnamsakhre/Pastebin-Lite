const express = require('express');
const router = express.Router();

const pastesController = require('./../controllers/pastes.controller')

// Health Check
router.get("/healthz", pastesController.healthzController)

// Create a paste
router.post('/pastes', pastesController.pasteContoller)

// Fetch a paste (API)
router.get('/pastes/:id', pastesController.getPasteController)

// View a paste (HTML)
router.get('/p/:id', pastesController.getViewPasteController)


module.exports = router;