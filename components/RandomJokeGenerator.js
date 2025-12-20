
"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function RandomJokeGenerator({ jokes, category }) {
  const [joke, setJoke] = useState(null);
  const [showPunchline, setShowPunchline] = useState(false);
  const [voteCounts, setVoteCounts] = useState({});
  const [votedJokes, setVotedJokes] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem('judyJokesVoted');
    if (stored) {
      setVotedJokes(JSON.parse(stored));
    }
  }, []);

  function nextJoke() {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    setJoke(randomJoke);
    setShowPunchline(false);
    
    // Load vote count for this joke
    loadVotes(randomJoke.id);
  }

  async function loadVotes(jokeId) {
    const { data } = await supabase
      .from("sj_joke_votes")
      .select("vote_type")
      .eq("site_slug", "saintjudy")
      .eq("joke_id", jokeId);
    
    const counts = { up: 0, down: 0 };
    (data || []).forEach(vote => {
      counts[vote.vote_type]++;
    });
    
    setVoteCounts(prev => ({ ...prev, [jokeId]: counts }));
  }

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

  const votes = joke ? (voteCounts[joke.id] || { up: 0, down: 0 }) : { up: 0, down: 0 };
  const hasVoted = joke ? votedJokes[joke.id] : false;

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
              <>
                <p className="joke-punchline" style={{ fontSize: "2rem" }}>{joke.punchline}</p>
                
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", justifyContent: "center", marginTop: "1rem" }}>
                  <button
                    onClick={() => handleVote(joke.id, 'up')}
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
                    onClick={() => handleVote(joke.id, 'down')}
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
              </>
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

              <button
                className="pink-btn"
                onClick={nextJoke}
                style={{ fontSize: "1.4rem", fontFamily: "Fredoka, 'Comic Sans MS', 'Arial Rounded MT Bold', system-ui" }}
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
