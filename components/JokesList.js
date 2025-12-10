
"use client";

import { useState } from "react";

export default function JokesList({ jokes }) {
  return (
    <div className="jokes-list mt-12">
      <h2 className="section-title mb-6">All Jokes in This Category</h2>

      {jokes.length === 0 && (
        <p className="text-gray-600">No jokes found for this category yet.</p>
      )}

      <div className="space-y-5">
        {jokes.map((joke, idx) => (
          <JokeItem key={idx} joke={joke} />
        ))}
      </div>
    </div>
  );
}

function JokeItem({ joke }) {
  const [show, setShow] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md">
      <div className="flex gap-3 items-start">
        <span className="text-2xl">{joke.emoji || "😄"}</span>
        <p className="text-lg font-semibold text-gray-900">{joke.setup}</p>
      </div>

      {show && (
        <p className="mt-3 text-gray-800 text-lg border-l-4 border-yellow-400 pl-3">
          {joke.punchline}
        </p>
      )}

      <button
        onClick={() => setShow(!show)}
        className="mt-4 bg-yellow-400 hover:bg-yellow-500 transition text-gray-900 font-bold py-2 px-4 rounded"
      >
        {show ? "Hide Punchline" : "Reveal Punchline"}
      </button>
    </div>
  );
}
