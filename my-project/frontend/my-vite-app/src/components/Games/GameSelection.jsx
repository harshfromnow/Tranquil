import React from 'react';
import './GameSelection.css';
import animal from '../../images/Animals.jpg';
import pet from '../../images/pet.jpg';
import jump from '../../images/Infinity.jpg';
import tq from '../../images/turtle.jpg';
import panda from '../../images/panda.jpg';
import em from '../../images/elasticman.jpg';
import plants from '../../images/plant.jpg';
import jig from '../../images/jigsaw.jpg';
import dino from '../../images/dino.jpg';
import buddy from '../../images/rocket.jpg';
import pdraw from '../../images/puzzledraw.jpg';
import warp from '../../images/pixelwars.jpg';
import mandala from '../../images/mandala.jpg';

const games = [
  { id: 1, src: 'https://html5.gamemonetize.co/vtaqvtn2mbc8dh3k5xwmckcpntk59uya/', thumbnail: animal, name: 'AnimalPare' },
  { id: 2, src: 'https://html5.gamemonetize.co/ywkc35ovviqlkheih4mlocyfyc97lj18/', thumbnail: pet, name: 'MyPoky' },
  { id: 3, src: 'https://html5.gamemonetize.co/pko80kuwgswhb1y1q8we0977sxoxs2y4/', thumbnail: jump, name: 'InfinityJump' },
  { id: 4, src: 'https://html5.gamemonetize.co/6cwfk2fzlwxrs5l1npw9rvy1in09iu3c/', thumbnail: tq, name: 'Turtle Quest' },
  { id: 5, src: 'https://html5.gamemonetize.co/rbp3ando8632dmb6quph8nxxiw2la856/', thumbnail: panda, name: 'Panda CakeMaker' },
  { id: 6, src: 'https://html5.gamemonetize.co/w4ytwq2s6jdvmkp8tzplxo8jphjsvuxr/', thumbnail: em, name: 'Elastic Man' },
  { id: 7, src: 'https://html5.gamemonetize.co/ii67kla6ysrwd90rddusa7el27k43zvv/', thumbnail: plants, name: 'Plants Vs Zombies' },
  { id: 8, src: 'https://html5.gamemonetize.co/g4g2rsb9eqpbttn17vjhy2kbsvocfa3x/', thumbnail: jig, name: 'Jigsaw Puzzle' },
  { id: 9, src: 'https://html5.gamemonetize.games/8qbbg84vdtvzc5u59yktd8f53qdubkik/', thumbnail: dino, name: 'Dino Run' },
  { id: 10, src: 'https://html5.gamemonetize.co/unyq7wdvi2bfsowowi91obhn48m9kuje/', thumbnail: buddy, name: 'Rocket Buddy' },
  { id: 11, src: 'https://html5.gamemonetize.co/7r699i4e5i9l3lmlsaxi5do26x11upi7/', thumbnail: pdraw, name: 'Puzzle Draw' },
  { id: 12, src: 'https://html5.gamemonetize.co/cmb4ekw5gj5ljbl72ifbfw2dknlmy43l/', thumbnail: warp, name: 'Pixel Wars' },
  { id: 13, src: 'https://html5.gamemonetize.co/hb2ngrh7okkt8qcu0napz776q2juzq8w/', thumbnail: mandala, name: 'Coloring Book' }
];

const GameSelection = ({ onSelectGame }) => {
  return (
    <div className="game-selection grid grid-cols-6 gap-5 p-4">
      {games.map(game => (
        <div key={game.id} className="game-thumbnail cursor-pointer" onClick={() => onSelectGame(game.src)}>
          <img src={game.thumbnail} alt={game.name} className="w-full h-auto rounded-btn" />
          <p className="text-center mt-2">{game.name}</p>
        </div>
      ))}
    </div>
  );
};

export default GameSelection;
