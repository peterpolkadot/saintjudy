
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
            style={{ fontSize: "2.3rem", fontFamily: "Fredoka, 'Comic Sans MS', 'Arial Rounded MT Bold', system-ui" }}
          >
            😂 Tell me a random joke!
          </button>
        )}

        {joke && (
          <>
            <p className="joke-question" style={{ fontSize: "2.3rem" }}>
              <span className="inline-emoji" style={{ fontSize: "2.8rem" }}>{joke.emoji}</span>
              {joke.setup}
            </p>

            {showPunchline && (
              <p className="joke-punchline" style={{ fontSize: "2rem" }}>{joke.punchline}</p>
            )}

            <div
              className="joke-buttons"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {!showPunchline && (
                <button
                  className="reveal-btn"
                  onClick={() => setShowPunchline(true)}
                  style={{ fontSize: "1.4rem", fontFamily: "Fredoka, 'Comic Sans MS', 'Arial Rounded MT Bold', system-ui" }}
                >
                  Show punchline
                </button>
              )}

              {showPunchline && (
                <button
                  className="pink-btn"
                  onClick={nextJoke}
                  style={{ fontSize: "1.4rem", fontFamily: "Fredoka, 'Comic Sans MS', 'Arial Rounded MT Bold', system-ui" }}
                >
                  🔄 Another Joke!
                </button>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
