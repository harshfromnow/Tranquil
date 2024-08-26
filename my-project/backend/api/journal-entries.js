const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/journalEntry');

// POST: Create a new journal entry
// POST: Create a new journal entry with a dynamic date
router.post('/journal-entries/:date', async (req, res) => {
  const { date } = req.params;
  const { mood, journalText, recordings } = req.body;

  try {
    const newEntry = new JournalEntry({
      date,
      mood,
      journalText,
      recordings
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    console.error('Error saving journal entry:', error);
    res.status(500).json({ error: 'Failed to save journal entry' });
  }
});

// Dynamic route for journal entries with a specific date
router.get('/journal-entries/:date', async (req, res) => {
  const { date } = req.params;

  try {
    // Fetch journal entries for the specific date from your MongoDB database
    const journalEntry = await JournalEntry.find({ date });
    
    if (!journalEntry) {
      return res.status(404).json({ message: 'No journal entry found for this date' });
    }

    res.json(journalEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
