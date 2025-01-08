const Note = require('../models/Note');

exports.createNote = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user;

    if (!content) {
      throw new Error('Content is required');
    }

    const note = new Note({ user: userId, content });
    await note.save();

    res.status(200).json({ message: 'Note created successfully', note });
  } catch (error) {
    console.error('Error creating note:', error.message);
    res.status(500).json({ message: 'Error creating note', error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted successfully', note: deletedNote });
  } catch (error) {
    console.error('Error deleting note:', error.message);
    res.status(500).json({ message: 'Error deleting note', error: error.message });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const userId = req.user;
    const notes = await Note.find({ user: userId });
    res.status(200).json({ message: 'Fetched all notes', notes });
  } catch (error) {
    console.error('Error fetching notes:', error.message);
    res.status(500).json({ message: 'Error fetching notes', error: error.message });
  }
};