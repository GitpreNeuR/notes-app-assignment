const express = require('express');
const noteController = require('../controller/note-controller');
const verifyToken = require('../middleware/auth-middleware');

const router = express.Router();

router.post('/create', verifyToken, noteController.createNote);
router.delete('/deleteNote/:id', verifyToken, noteController.deleteNote);
router.get('/getAllNotes', verifyToken, noteController.getAllNotes);

module.exports = router;