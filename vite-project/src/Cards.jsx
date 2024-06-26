import { useState, useEffect } from "react";
import './Cards.css';

const imageURL = `https://pokeapi.co/api/v2/pokemon?limit=9&offset=1000`;

function Cards(props) {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(imageURL);
        const data = await response.json();
        const promises = data.results.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonResponse.json();
          return {
            name: pokemon.name,
            url: pokemon.url,
            image: pokemonData.sprites.front_default
          };
        });
        const pokemonList = await Promise.all(promises);
        setPokemonData(pokemonList);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const shuffledCards = () => {
    const shuffleCards = [...pokemonData];
    for (let i = shuffleCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffleCards[i], shuffleCards[j]] = [shuffleCards[j], shuffleCards[i]]
    }
    setPokemonData(shuffleCards);
  };

  const handleClick = (name) => {
    if (props.visitedCards.includes(name)) {
      props.setScore(0);
      props.setVisitedCards([]);
      props.setGameLose(true); // Set gameLose state to true when losing the game
      return;
    }

    props.setVisitedCards([...props.visitedCards, name]);

    if (props.score + 1 > props.highScore) {
      props.setHighScore(props.score + 1);
    }

    props.setScore(props.score + 1);

    if (props.visitedCards.length + 1 === pokemonData.length) { // Check length of visitedCards
      props.setGameWin(true);
    }

    shuffledCards();
  };

  return (
    <div className="card-container">
      <div className="card-grid">
        {pokemonData.map((pokemon, index) => (
          <div key={index} className="card" onClick={() => handleClick(pokemon.name)}>
            <h3>{pokemon.name}</h3>
            <img src={pokemon.image} alt={pokemon.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
