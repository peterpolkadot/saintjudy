
"use client";

import { useState } from "react";

export default function RandomJokeGenerator({ jokes, categoryName }) {
  const [currentJoke, setCurrentJoke] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const getRandomJoke = () => {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    setCurrentJoke(jokes[randomIndex]);
    setRevealed(false);
  };

  return (
    <div className="joke-generator">
      {!currentJoke ? (
        <div className="joke-generator-start">
          <h2 className="generator-title">Ready for a {categoryName} Joke?</h2>
          <p className="generator-subtitle">We have {jokes.length} hilarious jokes in this category!</p>
          <button className="generate-btn" onClick={getRandomJoke}>
            🎲 Get Random Joke
          </button>
        </div>
      ) : (
        <div className="joke-display">
          <div className="joke-card-big">
            <h3 className="joke-setup-big">{currentJoke.setup}</h3>
            
            {!revealed ? (
              <button className="reveal-btn-big" onClick={() => setRevealed(true)}>
                👀 Show Punchline
              </button>
            ) : (
              <div className="joke-punchline-big">
                <p>{currentJoke.punchline}</p>
                <div className="joke-emoji-big">😂</div>
              </div>
            )}
          </div>
          
          <button className="another-btn" onClick={getRandomJoke}>
            🔄 Another Joke!
          </button>
        </div>
      )}
    </div>
  );
}
