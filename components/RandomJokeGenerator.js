
"use client";
import { useState } from "react";
export default function RandomJokeGenerator({ jokes }) {
  const [joke,setJoke] = useState(null);
  return (
    <div>
      <button onClick={()=>setJoke(jokes[Math.floor(Math.random()*jokes.length)])}>
        Random Joke
      </button>
      {joke && <p>{joke.setup} — {joke.punchline}</p>}
    </div>
  );
}
