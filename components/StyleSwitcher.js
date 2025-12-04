
"use client";

import { useState } from "react";

export default function StyleSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const styles = [
    { id: "playful-modern", name: "Playful Modern", emoji: "🎨" },
    { id: "rainbow-burst", name: "Rainbow Burst", emoji: "🌈" },
    { id: "minimal-clean", name: "Minimal Clean", emoji: "✨" },
    { id: "neon-pop", name: "Neon Pop", emoji: "💫" },
    { id: "retro-comic", name: "Retro Comic", emoji: "💥" }
  ];

  const handleStyleChange = async (styleId) => {
    setLoading(true);
    
    try {
      // Direct call to your Google Apps Script Web App
      const scriptUrl = "YOUR_WEB_APP_URL_HERE"; // Replace with your actual URL
      
      const response = await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors", // Important for Google Apps Script
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ style: styleId })
      });

      // With no-cors, we can't read the response, so just assume success
      setIsOpen(false);
      setLoading(false);
      
      alert(`✅ Style change triggered: ${styles.find(s => s.id === styleId).name}!\n\nThe site will redeploy in 1-2 minutes.\nRefresh your browser to see the new style!`);
      
    } catch (error) {
      console.error("Error changing style:", error);
      setLoading(false);
      alert("❌ Error changing style. Check console for details.");
    }
  };

  return (
    <div className="style-switcher">
      <button 
        className="style-switcher-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Change Site Style"
        disabled={loading}
      >
        {loading ? "⏳" : "🎨"}
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
                className="style-option"
                onClick={() => handleStyleChange(style.id)}
                disabled={loading}
              >
                <span className="style-emoji">{style.emoji}</span>
                <span className="style-name">{style.name}</span>
              </button>
            ))}
          </div>
          {loading && (
            <div style={{ textAlign: "center", marginTop: "10px", fontSize: "14px", color: "#666" }}>
              ⏳ Triggering deployment...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
