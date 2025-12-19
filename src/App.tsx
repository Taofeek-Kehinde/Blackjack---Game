import { useState, useEffect } from 'react';
import { useBlackjack } from './hooks/useBlackjack';
import { Hand } from './components/Hand';
import { GameControls } from './components/GameControls';
import { GameStatusDisplay } from './components/GameStatus';
import './styles/game.css';

function App() {
  const {
    playerHand,
    dealerHand,
    gameStatus,
    playerScore,
    dealerScore,
    playerHit,
    playerStand,
    resetGame,
    calculateHandValue
  } = useBlackjack();

  const [isLoading, setIsLoading] = useState(true);
  const [isDealerCardHidden, setIsDealerCardHidden] = useState(true);

  const playerValue = calculateHandValue(playerHand);
  const dealerValue = calculateHandValue(dealerHand);

  const getDealerVisibleValue = () => {
    if (gameStatus === 'playing' && isDealerCardHidden && dealerHand.length > 0) {
      const firstCard = dealerHand[0];
      return calculateHandValue(firstCard ? [firstCard] : []);
    }
    return dealerValue;
  };

  const dealerVisibleValue = getDealerVisibleValue();

  useEffect(() => {
    if (playerHand.length > 0 && dealerHand.length > 0) {
      setIsLoading(false);
    }
  }, [playerHand, dealerHand]);

  useEffect(() => {
    if (gameStatus !== 'playing') {
      const timer = setTimeout(() => setIsDealerCardHidden(false), 500);
      return () => clearTimeout(timer);
    } else {
      setIsDealerCardHidden(true);
    }
  }, [gameStatus]);

  if (isLoading) {
    return (
      <div className="game-container">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <div className="loading-text">Shuffling cards...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <header className="game-header">
        <h1 className="game-title">BLACKJACK</h1>
        <p className="game-subtitle">Get as close to 21 as possible without going over!</p>
        
        <div className="score-container">
          <div className="score-box player">
            <div className="score-label">Player Score</div>
            <div className="score-value">{playerScore}</div>
          </div>
          <div className="score-box dealer">
            <div className="score-label">Dealer Score</div>
            <div className="score-value">{dealerScore}</div>
          </div>
        </div>
      </header>

      <GameStatusDisplay status={gameStatus} />

      <div className="game-layout">
        <div className="controls-section">
          <GameControls
            onHit={playerHit}
            onStand={playerStand}
            onReset={resetGame}
            gameStatus={gameStatus}
          />
        </div>

        <div className="table-section">
          <div className="game-table">
            <Hand
              cards={dealerHand}
              title="Dealer's Hand"
              value={dealerVisibleValue}
              isDealer={true}
              hideSecondCard={isDealerCardHidden}
              isBust={dealerValue > 21}
            />

            <div className="table-divider"></div>

            <Hand
              cards={playerHand}
              title="Your Hand"
              value={playerValue}
              isBust={playerValue > 21}
            />

            <div className="value-indicators">
              <div className="value-box player">
                <div className="value-label">Your Total</div>
                <div className="value-number">{playerValue}</div>
              </div>
              <div className="value-box dealer">
                <div className="value-label">Dealer's Total</div>
                <div className="value-number">
                  {gameStatus === 'playing' && isDealerCardHidden ? '?' : dealerValue}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Last Part*/}
      <footer className="game-footer">
        <p>Cards in deck: {Math.max(0, 52 - (playerHand.length + dealerHand.length))}</p>
        <p className="footer-note">Blackjack Game with React & TypeScript</p>
      </footer>
    </div>
  );
}

export default App;