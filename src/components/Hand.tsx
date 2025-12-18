import React from 'react';
import type { Card as CardType } from '../utils/gameLogic';
import { Card } from './Card';
import '../styles/game.css';

interface HandProps {
  cards: CardType[];
  title: string;
  value: number;
  isDealer?: boolean;
  hideSecondCard?: boolean;
  isBust?: boolean;
}

export const Hand: React.FC<HandProps> = ({
  cards,
  title,
  value,
  isDealer = false,
  hideSecondCard = false,
  isBust = false
}) => {
  return (
    <div className={`hand-container ${isBust ? 'shake' : ''}`}>
      <div className="hand-header">
        <h2 className="hand-title">{title}</h2>
        <div className="hand-score">Score: {value}</div>
        {value === 21 && cards.length === 2 && (
          <div className="blackjack-badge">BLACKJACK!</div>
        )}
      </div>
      <div className="cards-container">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            isHidden={isDealer && hideSecondCard && index === 1}
            isFlipping={isDealer && hideSecondCard && index === 1}
          />
        ))}
      </div>
    </div>
  );
};