
"use client";
import { useState } from "react";

export default function RandomJokeGenerator({ jokes, category }) {
  const [joke, setJoke] = useState(null);
  const [showPunchline, setShowPunchline] = useState(false);

  function nextJoke() {
    setJoke(jokes[Math.floor(Math.random() * jokes.length)]);
    setShowPunchline(false);
  }

  return (
    <div className="joke-generator">
      <div className="joke-card-big">

        {!joke && (
          <button
            className="pink-btn big-joke-btn"
            onClick={nextJoke}
          >
            😂 Tell me a {category} joke!
          </button>
        )}

        {joke && (
          <>
            <p className="joke-question">
              <span className="inline-emoji">{joke.emoji}</span>
              {joke.setup}
            </p>

            {showPunchline && (
              <p className="joke-punchline">{joke.punchline}</p>
            )}

            {/* 🔥 FORCE VERTICAL STACK */}
            <div
              className="joke-buttons"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <button
                className="reveal-btn"
                onClick={() => setShowPunchline(!showPunchline)}
              >
                {showPunchline ? "Hide punchline" : "Show punchline"}
              </button>

              <button
                className="pink-btn"
                onClick={nextJoke}
              >
                🔄 Another Joke!
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
