const mongoose = require('mongoose');

// Define the schema for a journal entry
const journalSchema = new mongoose.Schema({
  date: { type: String, required: true },
  mood: { type: String, required: true },
  journalText: { type: String, required: true },
  recordings: [{ type: Object }]
});

// Create and export a model for journal entries
const JournalEntry = mongoose.model('JournalEntry', journalSchema);

module.exports = JournalEntry;
