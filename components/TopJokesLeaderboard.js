
"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

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
        <h2 style={{ 
          fontSize: "2.5rem",
          textShadow: "3px 3px 0 #fff, 3px 3px 0 #000"
        }}>
          <span style={{ fontSize: "2rem" }}>🏆</span> Judy's Best Jokes
        </h2>
      </div>

      <div className="jokes-list" style={{ maxWidth: "900px", margin: "0 auto" }}>
        {initialJokes.map((j, i) => {
          const [show, setShow] = useState(false);
          const votes = voteCounts[j.id] || { up: 0, down: 0 };
          const hasVoted = votedJokes[j.id];

          return (
            <div key={i} className="joke-item">
              
              {/* JOKE SETUP - FULL WIDTH */}
              <p className="joke-question" style={{ fontSize: "2.3rem", margin: "0 0 1.5rem 0" }}>
                {j.setup}
              </p>

              {/* PUNCHLINE */}
              {show && (
                <p className="joke-punchline" style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>{j.punchline}</p>
              )}

              {/* CONTROLS ROW */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "60px 60px auto 200px 200px",
                gap: "1rem", 
                alignItems: "center"
              }}>
                
                {/* RANK BADGE */}
                <div style={{
                  background: "#ff5fa2",
                  border: "4px solid #000",
                  boxShadow: "4px 4px 0 #000",
                  borderRadius: "8px",
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#000"
                }}>
                  #{i + 1}
                </div>

                {/* EMOJI LINK TO CATEGORY */}
                <Link 
                  href={`/${j.category_slug}`}
                  style={{
                    fontSize: "3rem",
                    textDecoration: "none",
                    transition: "transform 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: "1"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.2)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  {j.emoji}
                </Link>

                {/* REVEAL BUTTON (or empty space) */}
                <div>
                  {!show && (
                    <button
                      className="reveal-btn"
                      onClick={() => setShow(true)}
                      style={{ 
                        fontSize: "1.4rem", 
                        fontFamily: "Fredoka, 'Comic Sans MS', 'Arial Rounded MT Bold', system-ui"
                      }}
                    >
                      Reveal punchline
                    </button>
                  )}
                </div>

                {/* VOTING BUTTONS - FIXED POSITION */}
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
                    opacity: hasVoted && hasVoted !== 'up' ? 0.5 : 1,
                    width: "100%"
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
                    opacity: hasVoted && hasVoted !== 'down' ? 0.5 : 1,
                    width: "100%"
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
