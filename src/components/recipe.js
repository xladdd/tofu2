import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export const Recipe = ({ recipeData, recipeNo }) => {
  const [processedInstructions, setProcessedInstructions] = useState("");

  useEffect(() => {
    if (recipeNo !== undefined && recipeData[recipeNo]) {
      const instructions = recipeData[recipeNo].instructions;
      // Replace timer placeholders with clickable links
      const processed = instructions.replace(
        /\[TIMER:(\d+):([^[\]]+)\]/g,
        (_, minutes, label) => {
          return `[${minutes}&nbsp;min](${minutes})`;
        }
      );
      setProcessedInstructions(processed);
    }
  }, [recipeNo, recipeData]);

  if (recipeNo === undefined) {
    return (
      <main>
        <h1>
          ↑<br />
          Dobrý den!
          <br />
          Co si dáte?
        </h1>
      </main>
    );
  }

  const selectedRecipe = recipeData[recipeNo];
  const imagePath = selectedRecipe.image;

  return (
    <main>
      <img className="image" src={imagePath} alt={selectedRecipe.title}></img>

      <h2>{selectedRecipe.title}</h2>

      <p id="description">
        <ReactMarkdown>{selectedRecipe.desc}</ReactMarkdown>
      </p>

      <ol id="method">
        <ReactMarkdown components={{ a: TimerLink }}>
          {processedInstructions}
        </ReactMarkdown>
      </ol>
    </main>
  );
};

// Custom component for timer links
const TimerLink = ({ children, href }) => {
  //const minutes = href;

  return (
    <span className="timerTrigger">
      {children}
    </span>
  );
};
