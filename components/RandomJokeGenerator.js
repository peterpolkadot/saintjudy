
"use client";
import { useState } from "react";

export default function RandomJokeGenerator({ jokes }) {
  const [joke, setJoke] = useState(null);

  return (
    <div className="joke-generator">
      <button
        className="reveal-btn"
        onClick={() =>
          setJoke(jokes[Math.floor(Math.random() * jokes.length)])
        }
      >
        Tell me a joke 😄
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
