
"use client";
import { useState } from "react";

export default function RandomJokeGenerator({ jokes }) {
  const [joke, setJoke] = useState(null);

  function pickRandom() {
    const j = jokes[Math.floor(Math.random() * jokes.length)];
    setJoke(j);
  }

  return (
    <div className="joke-generator">
      <button className="reveal-btn" onClick={pickRandom}>
        🎲 Random Joke
      </button>

      {joke && (
        <div className="joke-card-big">
          <p className="joke-question">{joke.setup}</p>
          <p className="joke-punchline">{joke.punchline}</p>
        </div>
      )}
    </div>
  );
}
