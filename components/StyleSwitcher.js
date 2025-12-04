
"use client";

import { useState } from "react";

export default function StyleSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStyle, setCurrentStyle] = useState("playful-modern");

  const styles = [
    { id: "playful-modern", name: "Playful Modern", emoji: "🎨" },
    { id: "rainbow-burst", name: "Rainbow Burst", emoji: "🌈" },
    { id: "minimal-clean", name: "Minimal Clean", emoji: "✨" },
    { id: "neon-pop", name: "Neon Pop", emoji: "💫" },
    { id: "retro-comic", name: "Retro Comic", emoji: "💥" }
  ];

  const handleStyleChange = async (styleId) => {
    try {
      const response = await fetch("/api/switch-style", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ style: styleId })
      });

      if (response.ok) {
        setCurrentStyle(styleId);
        setIsOpen(false);
        
        // Show success message
        alert(`✅ Style changed to ${styles.find(s => s.id === styleId).name}! Redeploying site...\n\nThis will take 1-2 minutes. Refresh the page in a moment to see the new style!`);
      } else {
        alert("❌ Failed to change style. Please try again.");
      }
    } catch (error) {
      console.error("Error changing style:", error);
      alert("❌ Error changing style. Please try again.");
    }
  };

  return (
    <div className="style-switcher">
      <button 
        className="style-switcher-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Change Site Style"
      >
        🎨
      </button>

      {isOpen && (
        <div className="style-switcher-menu">
          <div className="style-switcher-header">
            <h3>Choose a Style</h3>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className="style-switcher-options">
            {styles.map((style) => (
              <button
                key={style.id}
                className={`style-option ${currentStyle === style.id ? "active" : ""}`}
                onClick={() => handleStyleChange(style.id)}
              >
                <span className="style-emoji">{style.emoji}</span>
                <span className="style-name">{style.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
