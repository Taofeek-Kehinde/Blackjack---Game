import React from 'react';
import '../styles/game.css';

interface GameControlsProps {
  onHit: () => void;
  onStand: () => void;
  onReset: () => void;
  gameStatus: string;
}

export const GameControls: React.FC<GameControlsProps> = ({
  onHit,
  onStand,
  onReset,
  gameStatus
}) => {
  const isGameOver = !['playing'].includes(gameStatus);

  return (
    <div className="controls-container">
      <h3 className="controls-title">Game Controls</h3>
      <div className="buttons-container">
        <button
          onClick={onHit}
          disabled={isGameOver}
          className={`game-button button-hit ${isGameOver ? 'button-disabled' : ''}`}
        >
          <span> </span> Hit
        </button>
        <button
          onClick={onStand}
          disabled={isGameOver}
          className={`game-button button-stand ${isGameOver ? 'button-disabled' : ''}`}
        >
          <span> </span> Stand
        </button>
        <button
          onClick={onReset}
          className="game-button button-reset"
        >
          <span> </span> New Game
        </button>
      </div>
      <div className="rules-container">
        <h4 className="rules-title">How to Play</h4>
        <ul className="rules-list">
          <li><strong>Hit:</strong> Draw another card</li>
          <li><strong>Stand:</strong> Keep your hand and let dealer play</li>
          <li><strong>Goal:</strong> Get as close to 21 as possible without going over</li>
          <li><strong>Dealer:</strong> Must hit until score is 17 or higher</li>
          <li><strong>Blackjack:</strong> Ace + 10-value card pays 3:2</li>
        </ul>
      </div>
    </div>
  );
};