import React from 'react';
import type { GameStatus } from '../utils/gameLogic';
import '../styles/game.css';

interface GameStatusDisplayProps {
  status: GameStatus;
}

export const GameStatusDisplay: React.FC<GameStatusDisplayProps> = ({ status }) => {
  const getStatusMessage = () => {
    switch (status) {
      case 'player_win':
        return { 
          message: ' You Win! ', 
          submessage: 'Congratulations! You beat the dealer!',
          icon: '💰'
        };
      case 'dealer_win':
        return { 
          message: ' Dealer Wins ', 
          submessage: 'Better luck next time!',
          icon: '🎩'
        };
      case 'player_bust':
        return { 
          message: ' Bust! You went over 21 ', 
          submessage: 'You lose this round',
          icon: '💣'
        };
      case 'dealer_bust':
        return { 
          message: ' Dealer Bust! You Win! ', 
          submessage: 'Dealer went over 21!',
          icon: '🎯'
        };
      case 'draw':
        return { 
          message: ' Push (Draw) ', 
          submessage: 'It\'s a tie! Your bet is returned',
          icon: '⚖️'
        };
      default:
        return { 
          message: ' Game in Progress... ', 
          submessage: 'Make your move! Hit or Stand?',
          icon: '🎲'
        };
    }
  };

  const { message, submessage, icon } = getStatusMessage();

  return (
    <div className="status-container">
      <div className="status-message">
        {icon} {message} {icon}
      </div>
      <div className="status-submessage">{submessage}</div>
    </div>
  );
};