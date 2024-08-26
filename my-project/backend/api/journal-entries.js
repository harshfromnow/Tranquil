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


// GET: Retrieve all journal entries
router.get('/journal-entries', async (req, res) => {
  try {
    const entries = await JournalEntry.find();
    res.json(entries);
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    res.status(500).json({ error: 'Failed to fetch journal entries' });
  }
});

module.exports = router;