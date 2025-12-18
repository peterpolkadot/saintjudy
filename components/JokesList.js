
"use client";
import { useState } from "react";
export default function JokesList({ jokes }) {
  return jokes.map((j,i) => {
    const [show,setShow] = useState(false);
    return (
      <div key={i}>
        <p>{j.setup}</p>
        {show && <p>{j.punchline}</p>}
        <button onClick={()=>setShow(!show)}>Reveal</button>
      </div>
    );
  });
}
