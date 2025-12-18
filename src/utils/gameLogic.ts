
export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type CardValue = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export interface Card {
  suit: Suit;
  value: CardValue;
  id: string;
}

export type GameStatus = 'playing' | 'player_win' | 'dealer_win' | 'draw' | 'player_bust' | 'dealer_bust';

export const createDeck = (): Card[] => {
  const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];
  const values: CardValue[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const deck: Card[] = [];

  suits.forEach(suit => {
    values.forEach(value => {
      deck.push({
        suit,
        value,
        id: `${value}_${suit}_${Math.random().toString(36).slice(2, 11)}`
      });
    });
  });

  return deck;
};

export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const calculateHandValue = (hand: Card[]): number => {
  if (!hand || hand.length === 0) {
    return 0;
  }

  let value = 0;
  let aces = 0;

  hand.forEach(card => {
    if (!card) return;
    
    if (card.value === 'A') {
      aces += 1;
      value += 11;
    } else if (['J', 'Q', 'K'].includes(card.value)) {
      value += 10;
    } else {
      const numValue = parseInt(card.value, 10);
      if (!isNaN(numValue)) {
        value += numValue;
      }
    }
  });

  while (value > 21 && aces > 0) {
    value -= 10;
    aces -= 1;
  }

  return value;
};

export const determineWinner = (
  playerValue: number,
  dealerValue: number
): GameStatus => {
  if (playerValue > 21) return 'player_bust';
  if (dealerValue > 21) return 'dealer_bust';
  if (playerValue > dealerValue) return 'player_win';
  if (dealerValue > playerValue) return 'dealer_win';
  return 'draw';
};