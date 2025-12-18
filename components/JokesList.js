
"use client";
import { useState } from "react";
export default function JokesList({ jokes }) {
  return (
    <div className="jokes-list">
      {jokes.map((j,i)=> {
        const [show,setShow] = useState(false);
        return (
          <div key={i} className="joke-item">
            <div className="joke-question">{j.setup}</div>
            {show && <div className="joke-punchline">{j.punchline}</div>}
            <button className="reveal-btn" onClick={()=>setShow(!show)}>
              Reveal
            </button>
          </div>
        );
      })}
    </div>
  );
}
