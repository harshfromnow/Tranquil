const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Import the cors package
const journalEntriesRouter = require('./api/journal-entries');

// MongoDB connection code...

const app = express();

// Enable CORS and allow requests from the frontend domain
app.use(cors({
  origin: 'https://tranquilfront.vercel.app'  // Add your frontend domain here
}));

app.use(express.json());

// Use journal entries API
app.use('/api', journalEntriesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});