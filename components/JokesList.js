
"use client";
import { useState } from "react";

export default function JokesList({ jokes }) {
  return (
    <section className="jokes-section">

<div className="section-card">
  <h2>{category.category_name} Jokes for Kids</h2>
</div>


      <div className="jokes-list">
        {jokes.map((j, i) => {
          const [show, setShow] = useState(false);

          return (
            <div key={i} className="joke-item">

              <p className="joke-question">
                <span className="inline-emoji">{j.emoji}</span>
                {j.setup}
              </p>

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
          );
        })}
      </div>

    </section>
  );
}
