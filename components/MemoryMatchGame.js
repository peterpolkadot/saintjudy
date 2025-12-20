
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function MemoryMatchGame({ categories }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, []);

  function startNewGame() {
    // Take 8 random categories and duplicate them
    const selectedCategories = categories
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
    
    const gameCards = [...selectedCategories, ...selectedCategories]
      .map((cat, index) => ({
        id: index,
        emoji: cat.emoji,
        categorySlug: cat.category_slug,
        categoryName: cat.category_name
      }))
      .sort(() => Math.random() - 0.5);

    setCards(gameCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  }

  function handleCardClick(index) {
    // Don't flip if already flipped, matched, or two cards showing
    if (flipped.includes(index) || matched.includes(index) || flipped.length === 2) {
      return;
    }

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    // Check for match when two cards are flipped
    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        // Match!
        setMatched([...matched, first, second]);
        setFlipped([]);
        
        // Check if game won
        if (matched.length + 2 === cards.length) {
          setTimeout(() => setGameWon(true), 500);
        }
      } else {
        // No match - flip back after delay
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <div className="section-card">
        <h2 style={{ fontSize: "2.5rem" }}>🧠 Memory Match</h2>
        <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
          Find matching pairs of emoji! • Moves: {moves}
        </p>
      </div>

      {gameWon && (
        <div style={{
          background: "#4CAF50",
          border: "5px solid #000",
          boxShadow: "8px 8px 0 #000",
          padding: "2rem",
          textAlign: "center",
          margin: "2rem auto",
          maxWidth: "600px"
        }}>
          <h2 style={{ fontSize: "3rem", margin: "0 0 1rem 0" }}>🎉 You Won! 🎉</h2>
          <p style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
            You matched all pairs in {moves} moves!
          </p>
          <button
            className="pink-btn"
            onClick={startNewGame}
            style={{ fontSize: "1.4rem", fontFamily: "Fredoka, 'Comic Sans MS', 'Arial Rounded MT Bold', system-ui" }}
          >
            🔄 Play Again
          </button>
        </div>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1.5rem",
        maxWidth: "700px",
        margin: "2rem auto",
        padding: "0 1rem"
      }}>
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          const isMatched = matched.includes(index);

          return (
            <div
              key={index}
              onClick={() => handleCardClick(index)}
              style={{
                aspectRatio: "1",
                background: isMatched ? "#4CAF50" : isFlipped ? "#ffe600" : "#ff5fa2",
                border: "4px solid #000",
                boxShadow: "6px 6px 0 #000",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "4rem",
                cursor: isMatched ? "default" : "pointer",
                transition: "all 0.3s ease",
                transform: isFlipped ? "rotateY(0deg)" : "rotateY(0deg)"
              }}
            >
              {isFlipped ? card.emoji : "❓"}
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <button
          className="reveal-btn"
          onClick={startNewGame}
          style={{ fontSize: "1.4rem", fontFamily: "Fredoka, 'Comic Sans MS', 'Arial Rounded MT Bold', system-ui" }}
        >
          🔄 New Game
        </button>
      </div>
    </div>
  );
}
