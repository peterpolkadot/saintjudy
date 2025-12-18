
"use client";
import { useState } from "react";

export default function JokesList({ jokes }) {
  return (
    <div className="jokes-list">
      {jokes.map((j, i) => {
        const [show, setShow] = useState(false);

        return (
          <div key={i} className="joke-item">
            <div className="joke-emoji">{j.emoji}</div>

            <div className="joke-content">
              <p className="joke-question">{j.setup}</p>

              {show && (
                <p className="joke-punchline">{j.punchline}</p>
              )}

              <button
                className="reveal-btn"
                onClick={() => setShow(!show)}
              >
                {show ? "Hide punchline" : "Reveal punchline"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
