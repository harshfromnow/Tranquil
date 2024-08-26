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

export const createJournalEntry = async (entry) => {
  try {
    const response = await axios.post(API_URL, entry);
    return response.data;
  } catch (error) {
    console.error('Error creating journal entry:', error);
    throw error;
  }
};
