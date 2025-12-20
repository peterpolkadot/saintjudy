
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
    <section style={{ marginTop: "2rem" }}>
      <div className="section-card">
        <h2 style={{ fontSize: "2.5rem" }}>🏆 Judy's Best Jokes 🏆</h2>
      </div>

      <div className="jokes-list" style={{ maxWidth: "900px", margin: "0 auto" }}>
        {initialJokes.map((j, i) => {
          const [show, setShow] = useState(false);
          const votes = voteCounts[j.id] || { up: 0, down: 0 };
          const hasVoted = votedJokes[j.id];
          const netScore = votes.up - votes.down;

          return (
            <div key={i} className="joke-item" style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
              
              {/* RANK BADGE - LEFT SIDE */}
              <div style={{
                flexShrink: 0,
                background: i < 3 ? "#FFD700" : "#ffe600",
                border: "4px solid #000",
                boxShadow: "4px 4px 0 #000",
                borderRadius: "8px",
                width: "80px",
                padding: "1rem",
                textAlign: "center"
              }}>
                <div style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  lineHeight: "1"
                }}>
                  #{i + 1}
                </div>
                <div style={{
                  fontSize: "0.9rem",
                  fontWeight: "700",
                  marginTop: "0.5rem",
                  color: netScore > 0 ? "#4CAF50" : netScore < 0 ? "#f44336" : "#666"
                }}>
                  {netScore > 0 ? '+' : ''}{netScore}
                </div>
              </div>

              {/* JOKE CONTENT - RIGHT SIDE */}
              <div style={{ flex: 1 }}>
                <p className="joke-question" style={{ fontSize: "2.3rem", margin: "0 0 1rem 0" }}>
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
                      fontSize: "1.1rem",
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
                      fontSize: "1.1rem",
                      cursor: hasVoted ? "not-allowed" : "pointer",
                      opacity: hasVoted && hasVoted !== 'down' ? 0.5 : 1
                    }}
                  >
                    👎 {votes.down}
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
