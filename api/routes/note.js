const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Create a new note
router.post('/',
  async (req, res) => {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { user, topic, description } = req.body;
    try {
      const newNote = new Note({
        user,
        topic,
        description,
      });
      const note = await newNote.save();
      res.status(201).json(note);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }
);

// Update a note
router.post('update/:id',async (req, res) => {
    const { topic, description } = req.body;
    try {
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
      note.topic = topic;
      note.description = description;
      note.updatedAt = Date.now();
      note = await note.save();
      res.status(200).json(note);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }
);

// Delete a note
router.post('delete/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    await note.remove();
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;