
"use client";
import { useState } from "react";

export default function RandomJokeGenerator({ jokes }) {
  const [joke, setJoke] = useState(null);
  const [show, setShow] = useState(false);

  function newJoke() {
    setJoke(jokes[Math.floor(Math.random() * jokes.length)]);
    setShow(false);
  }

  return (
    <div className="joke-generator">
      <div className="joke-card-big">

        {!joke && (
          <button className="pink-btn" onClick={newJoke}>
            🎲 Tell me a joke
          </button>
        )}

        {joke && (
          <>
            <p className="joke-question">{joke.setup}</p>

            {show && (
              <p className="joke-punchline">{joke.punchline}</p>
            )}

            <div style={{ marginTop: "1.5rem" }}>
              {!show && (
                <button
                  className="reveal-btn"
                  onClick={() => setShow(true)}
                >
                  👀 Show Punchline
                </button>
              )}

              <button className="pink-btn" onClick={newJoke}>
                🔄 Another Joke!
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
