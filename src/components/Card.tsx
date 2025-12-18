import React from 'react';
import type { Card as CardType } from '../utils/gameLogic';
import '../styles/game.css';

interface CardProps {
  card: CardType;
  isHidden?: boolean;
  isFlipping?: boolean;
}

export const Card: React.FC<CardProps> = ({ card, isHidden = false, isFlipping = false }) => {
  const getSuitSymbol = (suit: string) => {
    switch (suit) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
      default: return '';
    }
  };

  if (isHidden) {
    return (
      <div className={`card card-hidden ${isFlipping ? 'flipping' : ''}`}>
        <div className="card-value">?</div>
        <div className="card-suit">?</div>
        <div className="card-name">Hidden</div>
      </div>
    );
  }

  return (
    <div className={`card ${isFlipping ? 'flipping' : ''}`}>
      <div className="card-value">{card.value}</div>
      <div className={`card-suit suit-${card.suit}`}>
        {getSuitSymbol(card.suit)}
      </div>
      <div className="card-name">{card.suit}</div>
    </div>
  );
};