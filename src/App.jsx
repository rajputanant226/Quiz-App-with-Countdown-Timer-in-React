import React, { useState, useEffect } from "react";
import questions from "./data/questions";
import QuestionCard from "./components/QuestionCard";
import Result from "./components/Result";
import "./App.css"; 

function App(){
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);

  // Reset timer when question changes
useEffect(() => {
  setTimeLeft(15); // reset timer to 15 seconds
  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev === 1) { // when timer reaches 1
        clearInterval(timer); // stop timer
        handleAutoNext();    // move to next question automatically
        return 15;           // reset timer for next question
      }
      return prev - 1; // reduce timer by 1 every second
    });
  }, 1000);

  return () => clearInterval(timer); // cleanup: stop timer if question changes
}, [currentQ]);

const handleAutoNext = () => {
  if (currentQ < questions.length - 1) {
    setCurrentQ((prev) => prev + 1); // go to next question
  } else {
    handleSubmit(); // if last question, submit quiz
  }
};

const handleOptionChange = (index) => {
  const updateAnswers = [...answers]; // copy existing answers
  updateAnswers[currentQ] = index;    // store selected option for current question
  setAnswers(updateAnswers);          // update state
};

const handleNext = () => {
  if (currentQ < questions.length - 1) {
    setCurrentQ(currentQ + 1); // go to next question
  }
};

const handlePrev = () => {
  if (currentQ > 0) {
    setCurrentQ(currentQ - 1); // go to previous question
  }
};

const handleSubmit = () => {
  let score = 0;
  answers.forEach((ans, idx) => {
    if (ans === questions[idx].answer) score++; // check if answer is correct
  });
  setScore(score); // save final score
};

return (
  <div className="app-wrapper">
    <div className="app">
      <h1 className="title">React MCQ Quiz</h1>
      {score === null ? (
        <QuestionCard
          question={questions[currentQ]} // current question object
          currentQ={currentQ}
          totalQ={questions.length}
          selected={answers[currentQ]}    // selected option
          onOptionChange={handleOptionChange}
          onPrev={handlePrev}
          onNext={handleNext}
          onSubmit={handleSubmit}
          timeLeft={timeLeft}             // show countdown
        />
      ) : (
        <Result score={score} total={questions.length} /> // show score after quiz
      )}
    </div>
  </div>
);
}

export default App;
