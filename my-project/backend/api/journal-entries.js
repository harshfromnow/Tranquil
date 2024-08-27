const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/journalEntry');

// POST: Create a new journal entry with a dynamic date
router.post('/journal-entries/:date', async (req, res) => {
  const { date } = req.params;
  const { mood, journalText, recordings } = req.body;

  try {
    const newEntry = new JournalEntry({
      date: new Date(date).toISOString().split('T')[0], // Ensures consistent date format
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

// GET: Fetch journal entry for a specific date
router.get('/journal-entries/:date', async (req, res) => {
  const { date } = req.params;

  try {
    const formattedDate = new Date(date).toISOString().split('T')[0]; // Consistent date format
    const journalEntry = await JournalEntry.findOne({ date: formattedDate });

    if (!journalEntry) {
      return res.status(404).json({ message: 'No journal entry found for this date' });
    }

    res.json(journalEntry);
  } catch (error) {
    console.error('Error fetching journal entry:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;