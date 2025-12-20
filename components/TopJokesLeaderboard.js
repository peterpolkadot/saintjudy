
"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function TopJokesLeaderboard({ initialJokes, initialVotes }) {
  const [voteCounts, setVoteCounts] = useState(initialVotes || {});
  const [votedJokes, setVotedJokes] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem('judyJokesVoted');
    if (stored) {
      setVotedJokes(JSON.parse(stored));
    }
  }, []);

  async function handleVote(jokeId, voteType) {
    if (votedJokes[jokeId]) return;

    setVoteCounts(prev => ({
      ...prev,
      [jokeId]: {
        up: (prev[jokeId]?.up || 0) + (voteType === 'up' ? 1 : 0),
        down: (prev[jokeId]?.down || 0) + (voteType === 'down' ? 1 : 0)
      }
    }));

    const newVoted = { ...votedJokes, [jokeId]: voteType };
    setVotedJokes(newVoted);
    localStorage.setItem('judyJokesVoted', JSON.stringify(newVoted));

    await supabase
      .from("sj_joke_votes")
      .insert({
        site_slug: "saintjudy",
        joke_id: jokeId,
        vote_type: voteType
      });
  }

  return (
    <section style={{ marginTop: "4rem" }}>
      <div className="section-card">
        <h2>🏆 Top 10 Funniest Jokes 🏆</h2>
      </div>

      <div className="jokes-list">
        {initialJokes.map((j, i) => {
          const [show, setShow] = useState(false);
          const votes = voteCounts[j.id] || { up: 0, down: 0 };
          const hasVoted = votedJokes[j.id];
          const netScore = votes.up - votes.down;

          return (
            <div key={i} className="joke-item" style={{ position: "relative" }}>
              <div style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "#ffe600",
                border: "3px solid #000",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "1.5rem"
              }}>
                #{i + 1}
              </div>

              <p className="joke-question" style={{ fontSize: "2.3rem", paddingRight: "60px" }}>
                <span className="inline-emoji" style={{ fontSize: "2.8rem" }}>{j.emoji}</span>
                {j.setup}
              </p>

              {show && (
                <p className="joke-punchline" style={{ fontSize: "2rem" }}>{j.punchline}</p>
              )}

              {!show && (
                <button
                  className="reveal-btn"
                  onClick={() => setShow(true)}
                  style={{ fontSize: "1.4rem", fontFamily: "Fredoka, 'Comic Sans MS', 'Arial Rounded MT Bold', system-ui" }}
                >
                  Reveal punchline
                </button>
              )}

              <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
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
                <div style={{
                  padding: "0.5rem 1rem",
                  background: netScore > 0 ? "#4CAF50" : netScore < 0 ? "#f44336" : "#ccc",
                  border: "3px solid #000",
                  fontWeight: "700"
                }}>
                  Score: {netScore > 0 ? '+' : ''}{netScore}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
