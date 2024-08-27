import axios from 'axios';

const API_URL = 'https://tranquilback.vercel.app/api/journal-entries'; // Update this URL if you deploy your backend

export const getJournalEntries = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    throw error;
  }
};

export const getJournalEntryByDate = async (date) => {
  try {
    const response = await axios.get(`${API_URL}/${date}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching journal entry:', error);
    throw error;
  }
};

export const createJournalEntry = async (newEntry) => {
  const { date, journalText, mood, recordings } = newEntry;
  const apiUrl = `https://tranquilback.vercel.app/api/journal-entries/${date}`;

  try {
    const response = await axios.post(apiUrl, {
      journalText,
      mood,
      recordings,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating journal entry:', error);
    throw error;
  }
};