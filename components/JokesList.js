
"use client";
import { useState } from "react";

export default function JokesList({ jokes }) {
  return (
    <div className="jokes-list">
      {jokes.map((j, i) => (
        <JokeItem key={i} joke={j} />
      ))}
    </div>
  );
}

function JokeItem({ joke }) {
  const [show, setShow] = useState(false);

  return (
    <div className="joke-item">
      <div className="joke-emoji">{joke.emoji}</div>

      <div className="joke-content">
        <p className="joke-question">{joke.setup}</p>

        {show && <p className="joke-punchline">{joke.punchline}</p>}

        <button className="reveal-btn" onClick={() => setShow(!show)}>
          {show ? "Hide punchline" : "Reveal punchline"}
        </button>
      </div>
    </div>
  );
}
