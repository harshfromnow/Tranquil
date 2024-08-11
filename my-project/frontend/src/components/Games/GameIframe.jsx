// src/components/Games/GameIframe.jsx
import React from 'react';
import './GameIframe.css';

const GameIframe = ({ src }) => {
  return (
    <div className="iframe-container">
      <iframe
        src={src}
        title="Game"
        className="game-iframe"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default GameIframe;
