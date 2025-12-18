
"use client";
import { useState } from "react";

export default function RandomJokeGenerator({ jokes }) {
  const [joke, setJoke] = useState(
    jokes[Math.floor(Math.random() * jokes.length)]
  );

  return (
    <div className="joke-generator">
      <div className="joke-card-big">
        <p className="joke-question">{joke.setup}</p>
        <p className="joke-punchline">{joke.punchline}</p>

        <button
          className="pink-btn"
          onClick={() =>
            setJoke(jokes[Math.floor(Math.random() * jokes.length)])
          }
        >
          🔄 Another Joke!
        </button>
      </div>
    </div>
  );
}
