
"use client";
import { useState, useEffect } from "react";

export default function JokeScramblerGame({ jokes }) {
  const [currentJoke, setCurrentJoke] = useState(null);
  const [scrambledWords, setScrambledWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  useEffect(() => {
    if (jokes && jokes.length > 0) {
      loadNewJoke();
    }
  }, [jokes]);

  function loadNewJoke() {
    // Pick a random joke
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    setCurrentJoke(randomJoke);

    // Split punchline into words and scramble
    const words = randomJoke.punchline.trim().split(/\s+/);
    const scrambled = [...words]
      .map((word, index) => ({ word, originalIndex: index, id: Math.random() }))
      .sort(() => Math.random() - 0.5);

    setScrambledWords(words);
    setAvailableWords(scrambled);
    setSelectedWords([]);
    setShowResult(false);
    setIsCorrect(false);
  }

  function handleWordClick(wordObj) {
    // Move from available to selected
    setSelectedWords([...selectedWords, wordObj]);
    setAvailableWords(availableWords.filter(w => w.id !== wordObj.id));
  }

  function handleSelectedClick(wordObj) {
    // Move from selected back to available
    setAvailableWords([...availableWords, wordObj]);
    setSelectedWords(selectedWords.filter(w => w.id !== wordObj.id));
  }

  function checkAnswer() {
    const userAnswer = selectedWords.map(w => w.word).join(' ');
    const correctAnswer = currentJoke.punchline.trim();
    const correct = userAnswer === correctAnswer;
    
    setIsCorrect(correct);
    setShowResult(true);
    setGamesPlayed(gamesPlayed + 1);
    
    if (correct) {
      setScore(score + 1);
    }
  }

  function nextJoke() {
    loadNewJoke();
  }

  if (!currentJoke) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ marginTop: "4rem" }}>
      <div className="section-card">
        <h2 style={{ fontSize: "2.5rem" }}>🔤 Joke Scrambler</h2>
        <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
          Unscramble the punchline! • Score: {score}/{gamesPlayed}
        </p>
      </div>

      {/* Setup */}
      <div style={{
        background: "#fff9d6",
        border: "5px solid #000",
        boxShadow: "8px 8px 0 #000",
        padding: "2rem",
        margin: "2rem auto",
        maxWidth: "800px",
        textAlign: "center"
      }}>
        <p style={{ fontSize: "2.3rem", fontWeight: "700" }}>
          <span style={{ fontSize: "2.8rem" }}>{currentJoke.emoji}</span> {currentJoke.setup}
        </p>
      </div>

      {/* Selected Words Area */}
      <div style={{
        background: "#ffe600",
        border: "5px solid #000",
        boxShadow: "8px 8px 0 #000",
        padding: "2rem",
        margin: "2rem auto",
        maxWidth: "800px",
        minHeight: "120px"
      }}>
        <p style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "1rem" }}>
          Your Answer:
        </p>
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "0.75rem",
          justifyContent: "center",
          minHeight: "60px"
        }}>
          {selectedWords.map((wordObj) => (
            <button
              key={wordObj.id}
              onClick={() => handleSelectedClick(wordObj)}
              style={{
                padding: "0.75rem 1.5rem",
                background: "#fff",
                border: "3px solid #000",
                boxShadow: "3px 3px 0 #000",
                fontSize: "1.3rem",
                fontWeight: "700",
                cursor: "pointer",
                fontFamily: "Fredoka, 'Comic Sans MS', 'Arial Rounded MT Bold', system-ui"
              }}
            >
              {wordObj.word}
            </button>
          ))}
        </div>
      </div>

      {/* Available Words */}
      {!showResult && (
        <div style={{
          background: "#ff5fa2",
          border: "5px solid #000",
          boxShadow: "8px 8px 0 #000",
          padding: "2rem",
          margin: "2rem auto",
          maxWidth: "800px"
        }}>
          <p style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "1rem", textAlign: "center" }}>
            Click words to build the punchline:
          </p>
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: "0.75rem",
            justifyContent: "center"
          }}>
            {availableWords.map((wordObj) => (
              <button
                key={wordObj.id}
                onClick={() => handleWordClick(wordObj)}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "#fff",
                  border: "3px solid #000",
                  boxShadow: "3px 3px 0 #000",
                  fontSize: "1.3rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  fontFamily: "Fredoka, 'Comic Sans MS', 'Arial Rounded MT Bold', system-ui"
                }}
              >
                {wordObj.word}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Check Answer Button */}
      {!showResult && selectedWords.length === scrambledWords.length && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            className="pink-btn"
            onClick={checkAnswer}
            style={{ 
              fontSize: "1.6rem", 
              fontFamily: "Fredoka, 'Comic Sans MS', 'Arial Rounded MT Bold', system-ui",
              padding: "1rem 2rem"
            }}
          >
            ✅ Check Answer
          </button>
        </div>
      )}

      {/* Result */}
      {showResult && (
        <div style={{
          background: isCorrect ? "#4CAF50" : "#f44336",
          border: "5px solid #000",
          boxShadow: "8px 8px 0 #000",
          padding: "2rem",
          margin: "2rem auto",
          maxWidth: "800px",
          textAlign: "center"
        }}>
          <h2 style={{ fontSize: "3rem", margin: "0 0 1rem 0", color: "#fff" }}>
            {isCorrect ? "🎉 Correct!" : "❌ Not Quite!"}
          </h2>
          {!isCorrect && (
            <p style={{ fontSize: "1.5rem", color: "#fff", marginBottom: "1rem" }}>
              The answer was: <strong>{currentJoke.punchline}</strong>
            </p>
          )}
          <button
            className="pink-btn"
            onClick={nextJoke}
            style={{ 
              fontSize: "1.4rem", 
              fontFamily: "Fredoka, 'Comic Sans MS', 'Arial Rounded MT Bold', system-ui",
              marginTop: "1rem"
            }}
          >
            ➡️ Next Joke
          </button>
        </div>
      )}
    </div>
  );
}
