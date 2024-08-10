require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Define a schema for journal entries
const journalEntrySchema = new mongoose.Schema({
  date: { type: String, required: true },
  mood: { type: String, required: true },
  journalText: { type: String, required: true },
  recordings: [{ type: Object }]
});

// Create a model for journal entries
const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

// API Endpoints

// Create a new journal entry
app.post('/api/journal-entries', async (req, res) => {
  try {
    const newEntry = new JournalEntry(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ message: 'Error creating journal entry', error });
  }
});

// Get all journal entries
app.get('/api/journal-entries', async (req, res) => {
  try {
    const entries = await JournalEntry.find();
    res.status(200).json(entries);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching journal entries', error });
  }
});

// Get a journal entry by date
app.get('/api/journal-entries/:date', async (req, res) => {
  try {
    const entry = await JournalEntry.findOne({ date: req.params.date });
    if (!entry) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }
    res.status(200).json(entry);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching journal entry', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});