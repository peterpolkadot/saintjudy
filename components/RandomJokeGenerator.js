
"use client";
import { useState } from "react";
export default function RandomJokeGenerator({ jokes }) {
  const [joke,setJoke] = useState(null);
  return (
    <div className="joke-generator">
      <button onClick={()=>setJoke(jokes[Math.floor(Math.random()*jokes.length)])}>
        🎲 Random Joke
      </button>
      {joke && (
        <div className="joke-card-big">
          <p>{joke.setup}</p>
          <p>{joke.punchline}</p>
        </div>
      )}
    </div>
  );
}
