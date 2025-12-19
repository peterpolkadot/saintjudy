
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function JokesList({ jokes, initialVotes }) {
  const [voteCounts, setVoteCounts] = useState(initialVotes || {});

  async function handleVote(jokeId, voteType) {
    // Optimistically update UI
    setVoteCounts(prev => ({
      ...prev,
      [jokeId]: {
        up: (prev[jokeId]?.up || 0) + (voteType === 'up' ? 1 : 0),
        down: (prev[jokeId]?.down || 0) + (voteType === 'down' ? 1 : 0)
      }
    }));

    // Save to database
    await supabase
      .from("sj_joke_votes")
      .insert({
        site_slug: "saintjudy",
        joke_id: jokeId,
        vote_type: voteType
      });
  }

  return (
    <section className="jokes-section">
      <div className="jokes-list">
        {jokes.map((j, i) => {
          const [show, setShow] = useState(false);
          const votes = voteCounts[j.id] || { up: 0, down: 0 };

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

              <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                <button
                  onClick={() => handleVote(j.id, 'up')}
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#4CAF50",
                    border: "3px solid #000",
                    boxShadow: "3px 3px 0 #000",
                    fontWeight: "700",
                    cursor: "pointer"
                  }}
                >
                  👍 {votes.up}
                </button>
                <button
                  onClick={() => handleVote(j.id, 'down')}
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#f44336",
                    border: "3px solid #000",
                    boxShadow: "3px 3px 0 #000",
                    fontWeight: "700",
                    cursor: "pointer"
                  }}
                >
                  👎 {votes.down}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
