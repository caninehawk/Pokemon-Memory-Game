import './App.css';
import Header from './Header.jsx';
import Cards from './Cards.jsx';
import Win from './Win.jsx';
import Lose from './Lose.jsx';
import { useState } from 'react';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameWin, setGameWin] = useState(false);
  const [gameLose, setGameLose] = useState(false);
  const [visitedCards, setVisitedCards] = useState([]);

  const startGame = () => {
    setGameStarted(true);
    setGameWin(false); 
    setGameLose(false); 
    setVisitedCards([]); 
    setScore(0); 
  };

  const resetGame = () => {
    startGame(); 
  };

  return (
    <div className="container">
      <Header startGame={startGame} resetGame={resetGame} score={score} highScore={highScore} />
      {!gameWin && !gameLose && gameStarted && (
        <Cards
          score={score}
          setScore={setScore}
          highScore={highScore}
          setHighScore={setHighScore}
          setGameWin={setGameWin}
          setGameLose={setGameLose}
          visitedCards={visitedCards}
          setVisitedCards={setVisitedCards}
        />
      )}
      {gameWin && <Win />}
      {gameLose && <Lose />}
    </div>
  );
}

export default App;
