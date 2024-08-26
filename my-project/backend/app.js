const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const journalEntriesRouter = require('./api/journal-entries');

// MongoDB connection string
const mongoURI = 'mongodb+srv://harshini:tranquil@cluster0.vmfzoqk.mongodb.net/Tranquil?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
  console.log('MongoDB connection established');
}).on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://tranquilfront.vercel.app', // Add your frontend URL here
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true, // Allow cookies and other credentials
};

app.use(cors(corsOptions)); // Use cors middleware with options
app.use(express.json()); // Middleware to parse JSON bodies

// Use journal entries API
app.use('/api', journalEntriesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
