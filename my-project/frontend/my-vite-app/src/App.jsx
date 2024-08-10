import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import JournalEntryPage from './components/Journal/Entry';
import JournalPage from './components/Journal/JournalPage';
import Footer from './components/footer';
import HomePage from './components/HomePage';
import GameSelection from './components/Games/GameSelection';
import GameIframe from './components/Games/GameIframe';

const App = () => {
  const [selectedGameSrc, setSelectedGameSrc] = useState('');
  const navigate = useNavigate();

  const handleGameSelect = (gameSrc) => {
    setSelectedGameSrc(gameSrc);
    navigate('/game');
  };

  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleTheme={toggleTheme} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/journal-entry/:date" element={<JournalEntryPage />} />
          <Route path="/games" element={<GameSelection onSelectGame={handleGameSelect} />} />
          <Route path="/game" element={<GameIframe src={selectedGameSrc} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;