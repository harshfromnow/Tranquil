import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/journal',  // Assuming backend API endpoint for journal
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default instance;