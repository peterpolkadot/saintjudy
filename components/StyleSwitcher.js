
"use client";

import { useState, useEffect } from "react";

export default function StyleSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStyle, setCurrentStyle] = useState("minimal-clean");

  const styles = [
    { id: "playful-modern", name: "Playful Modern", emoji: "🎨" },
    { id: "rainbow-burst", name: "Rainbow Burst", emoji: "🌈" },
    { id: "minimal-clean", name: "Minimal Clean", emoji: "✨" },
    { id: "neon-pop", name: "Neon Pop", emoji: "💫" },
    { id: "retro-comic", name: "Retro Comic", emoji: "💥" }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("judy-style");
    if (saved && styles.find(s => s.id === saved)) {
      setCurrentStyle(saved);
      loadStylesheet(saved);
    } else {
      loadStylesheet(currentStyle);
    }
  }, []);

  const loadStylesheet = (styleId) => {
    const oldLink = document.getElementById("theme-stylesheet");
    if (oldLink) {
      oldLink.remove();
    }

    const link = document.createElement("link");
    link.id = "theme-stylesheet";
    link.rel = "stylesheet";
    link.href = `/styles/${styleId}.css`;
    document.head.appendChild(link);
  };

  const handleStyleChange = (styleId) => {
    setCurrentStyle(styleId);
    setIsOpen(false);
    localStorage.setItem("judy-style", styleId);
    loadStylesheet(styleId);
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
