import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Set up the timer using setTimeout
    const timer = setTimeout(() => {
      // Decrease the timeRemaining by 1 every second
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : prevTime));

      // Check if timeRemaining has reached 0
      if (timeRemaining === 1) {
        // Reset timeRemaining back to 10 seconds
        setTimeRemaining(10);
        
        // Call the onAnswered callback with a value of false
        onAnswered(false);
      }
    }, 1000);

    // Clean up the timer when the component unmounts or when timeRemaining changes
    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
