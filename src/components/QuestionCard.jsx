import React from "react";
function QuestionCard({question,currentQ,totalQ,selected,onOptionChange,onPrev,onNext,onSubmit,timeLeft,})
{
    return(
        <div className="quiz-card">
            <h2>
                Question{currentQ+1}/{totalQ}
            </h2>
            <p className="question">{question.question}</p>
            <div className="timer">⏳ Time Left: {timeLeft}s</div>
      <div className="options">
        {question.options.map((opt, index) => (
          <label key={index}
          className={`option ${selected === index ? "selected" : ""}`}
          >
        <input
              type="radio"
              name="answer"
              value={index}
              checked={selected === index}
              onChange={() => onOptionChange(index)}
            />
            {opt} </label>
        ))}
      </div>
      <div className="buttons">
        <button onClick={onPrev} disabled={currentQ === 0} className="nav-btn">
          Previous
        </button>

        {
        currentQ < totalQ - 1 ? ( <button onClick={onNext} className="nav-btn">Next</button>) 
        : (
          <button onClick={onSubmit} className="submit-btn"> Submit </button>)
          }
      </div>
    </div>
  );
}
export default QuestionCard;