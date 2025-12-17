
"use client";

import { useState } from "react";

export default function JokesList({ jokes }) {
  if (!jokes || jokes.length === 0) return null;

  return (
    <div className="jokes-list">
      <h2 className="section-title">All Jokes in This Category</h2>

      {jokes.map((joke, idx) => (
        <JokeItem key={idx} joke={joke} />
      ))}
    </div>
  );
}

function JokeItem({ joke }) {
  const [show, setShow] = useState(false);

  return (
    <div className="joke-item">
      <div className="joke-content">
        <div className="joke-emoji">{joke.emoji || "😄"}</div>

        <div className="joke-question">
          {joke.setup}
        </div>

        {show && (
          <div className="joke-punchline">
            {joke.punchline}
          </div>
        )}

        <button
          className="reveal-btn"
          onClick={() => setShow(!show)}
        >
          {show ? "Hide Punchline" : "Reveal Punchline"}
        </button>
      </div>
    </div>
  );
}
