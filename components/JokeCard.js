
"use client";

import { useState } from "react";

export default function JokeCard({ joke, index }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="joke-card">
      <div className="joke-number">Joke #{index + 1}</div>
      <h3 className="joke-setup">{joke.setup}</h3>
      
      {!revealed ? (
        <button 
          className="reveal-btn"
          onClick={() => setRevealed(true)}
        >
          Show Punchline 👀
        </button>
      ) : (
        <div className="joke-punchline">
          <p>{joke.punchline}</p>
          <div className="joke-emoji">😂</div>
        </div>
      )}
    </div>
  );
}
