
"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function JokesList({ jokes, initialVotes }) {
  const [voteCounts, setVoteCounts] = useState(initialVotes || {});
  const [votedJokes, setVotedJokes] = useState({});

  useEffect(() => {
    // Load voted jokes from localStorage
    const stored = localStorage.getItem('judyJokesVoted');
    if (stored) {
      setVotedJokes(JSON.parse(stored));
    }
  }, []);

  async function handleVote(jokeId, voteType) {
    // Check if already voted
    if (votedJokes[jokeId]) return;

    // Optimistically update UI
    setVoteCounts(prev => ({
      ...prev,
      [jokeId]: {
        up: (prev[jokeId]?.up || 0) + (voteType === 'up' ? 1 : 0),
        down: (prev[jokeId]?.down || 0) + (voteType === 'down' ? 1 : 0)
      }
    }));

    // Mark as voted
    const newVoted = { ...votedJokes, [jokeId]: voteType };
    setVotedJokes(newVoted);
    localStorage.setItem('judyJokesVoted', JSON.stringify(newVoted));

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
          const hasVoted = votedJokes[j.id];

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
                  disabled={hasVoted}
                  style={{
                    padding: "0.5rem 1rem",
                    background: hasVoted === 'up' ? "#45a049" : hasVoted ? "#ccc" : "#4CAF50",
                    border: "3px solid #000",
                    boxShadow: "3px 3px 0 #000",
                    fontWeight: "700",
                    cursor: hasVoted ? "not-allowed" : "pointer",
                    opacity: hasVoted && hasVoted !== 'up' ? 0.5 : 1
                  }}
                >
                  👍 {votes.up}
                </button>
                <button
                  onClick={() => handleVote(j.id, 'down')}
                  disabled={hasVoted}
                  style={{
                    padding: "0.5rem 1rem",
                    background: hasVoted === 'down' ? "#d32f2f" : hasVoted ? "#ccc" : "#f44336",
                    border: "3px solid #000",
                    boxShadow: "3px 3px 0 #000",
                    fontWeight: "700",
                    cursor: hasVoted ? "not-allowed" : "pointer",
                    opacity: hasVoted && hasVoted !== 'down' ? 0.5 : 1
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
