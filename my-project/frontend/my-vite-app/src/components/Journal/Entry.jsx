import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createJournalEntry } from './api';

const JournalEntryPage = () => {
  const { date } = useParams();  // Capture the date from the URL
  const [isRecording, setIsRecording] = useState(false);
  const [journalText, setJournalText] = useState('');
  const [recordings, setRecordings] = useState([]);
  const [mood, setMood] = useState('');
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const navigate = useNavigate();

  const handleStartRecording = async (type) => {
    const mediaStream = await navigator.mediaDevices.getUserMedia(
      type === 'audio' ? { audio: true } : { video: true, audio: true }
    );
    mediaStreamRef.current = mediaStream;
    const mediaRecorder = new MediaRecorder(mediaStream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordings((prev) => [...prev, { type, url: URL.createObjectURL(event.data) }]);
      }
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    setIsRecording(false);
  };

  const handleDeleteRecording = (index) => {
    setRecordings((prev) => {
      const updatedRecordings = [...prev];
      const recordingToRemove = updatedRecordings[index];
      updatedRecordings.splice(index, 1);
      URL.revokeObjectURL(recordingToRemove.url);
      return updatedRecordings;
    });
  };

  const handleSaveJournal = async () => {
    const newEntry = {
      date,
      journalText,
      mood,
      recordings,
    };

    try {
      await createJournalEntry(newEntry);
      navigate('/journal'); // Navigate back to the calendar page after saving
    } catch (error) {
      console.error('Failed to save journal entry:', error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-10 min-h-screen">
      <div className="w-full max-w-5xl p-5 bg-white rounded-lg shadow-lg relative">
        <textarea
          className="textarea textarea-secondary w-full h-[70vh] p-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          defaultValue={journalText}
          placeholder="Write your journal entry here..."
          onChange={(e) => setJournalText(e.target.value)}
        ></textarea>
        <div className="mt-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-2">
            <button className="btn btn-primary lg:w-auto" onClick={handleSaveJournal}>
              Save Entry
            </button>
            {!isRecording ? (
              <>
                <button className="btn btn-primary lg:w-auto" onClick={() => handleStartRecording('audio')}>
                  Start Voice Recording
                </button>
                <button className="btn btn-primary lg:w-auto" onClick={() => handleStartRecording('video')}>
                  Start Video Recording
                </button>
              </>
            ) : (
              <button className="btn btn-secondary lg:w-auto" onClick={handleStopRecording}>
                Stop Recording
              </button>
            )}
            <select
              id="mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="btn btn-primary lg:w-auto border custom-dropdown"
            >
              <option value="">Overall Mood</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="neutral">Neutral</option>
              <option value="angry">Angry</option>
              <option value="anxious">Anxious</option>
              <option value="tired">Tired</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-bold">Recordings</h2>
          <ul>
            {recordings.map((rec, index) => (
              <li key={index} className="mt-2 flex items-center">
                {rec.type.includes('audio') ? (
                  <audio controls src={rec.url}></audio>
                ) : (
                  <video controls src={rec.url} width="200"></video>
                )}
                <button className="btn btn-red ml-4" onClick={() => handleDeleteRecording(index)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JournalEntryPage;