import { useState, useEffect, useCallback } from 'react';

import type { Card, GameStatus } from '../utils/gameLogic';
import {
  createDeck,
  shuffleDeck,
  calculateHandValue,
  determineWinner
} from '../utils/gameLogic';

export const useBlackjack = () => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

 
  const initializeGame = useCallback(() => {
    try {
      
      let newDeck = shuffleDeck(createDeck());
         
      const newPlayerHand: Card[] = [];
      const newDealerHand: Card[] = [];
      
      for (let i = 0; i < 2; i++) {
        if (newDeck.length > 0) {
          const card = newDeck.pop();
          if (card) newPlayerHand.push(card);
        }
      }
      
      
      for (let i = 0; i < 2; i++) {
        if (newDeck.length > 0) {
          const card = newDeck.pop();
          if (card) newDealerHand.push(card);
        }
      }
      
      
      setDeck(newDeck);
      setPlayerHand(newPlayerHand);
      setDealerHand(newDealerHand);
      setGameStatus('playing');
      setIsInitialized(true);
    } catch (error) {
      console.error('Error initializing game:', error);
      setDeck(shuffleDeck(createDeck()));
      setPlayerHand([]);
      setDealerHand([]);
      setIsInitialized(true);
    }
  }, []);

  
  const drawCard = (): Card => {
    try {
      let currentDeck = [...deck];
      
      if (currentDeck.length < 10) {
        currentDeck = shuffleDeck(createDeck());
        setDeck(currentDeck);
      }
      
      const card = currentDeck.pop();
      setDeck(currentDeck);
      
      if (card) {
        return card;
      }
    } catch (error) {
      console.error('Error drawing card:', error);
    }
    
    
    return {
      suit: 'hearts',
      value: 'A',
      id: `fallback_${Date.now()}`
    };
  };


  const playerHit = () => {
    if (gameStatus !== 'playing') return;
    
    const newCard = drawCard();
    const newPlayerHand = [...playerHand, newCard];
    setPlayerHand(newPlayerHand);
    
    const playerValue = calculateHandValue(newPlayerHand);
    if (playerValue > 21) {
      setGameStatus('player_bust');
    }
  };


  const playerStand = () => {
    if (gameStatus !== 'playing') return;
    
    let newDealerHand = [...dealerHand];
    let dealerValue = calculateHandValue(newDealerHand);
    
 
    while (dealerValue < 17) {
      const newCard = drawCard();
      newDealerHand = [...newDealerHand, newCard];
      dealerValue = calculateHandValue(newDealerHand);
    }
    
    setDealerHand(newDealerHand);
    
    const playerValue = calculateHandValue(playerHand);
    const winner = determineWinner(playerValue, dealerValue);
    setGameStatus(winner);
    
   
    if (winner === 'player_win' || winner === 'dealer_bust') {
      setPlayerScore(prev => prev + 1);
    } else if (winner === 'dealer_win' || winner === 'player_bust') {
      setDealerScore(prev => prev + 1);
    }
  };

  // Reset game
  const resetGame = () => {
    initializeGame();
  };

 
  useEffect(() => {
    if (!isInitialized) {
      initializeGame();
    }
  }, [isInitialized, initializeGame]);

  return {
    deck,
    playerHand,
    dealerHand,
    gameStatus,
    playerScore,
    dealerScore,
    playerHit,
    playerStand,
    resetGame,
    calculateHandValue
  };
};