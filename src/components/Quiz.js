//import react and useState hook
import React, { useState } from "react";

//accept array of questions as props
const Quiz = ({ questions }) => {
  const [currentQ, setCurrentQ] = useState(0); //track current question index
  const [selected, setSelected] = useState(null); //track currently selected answer
  const [score, setScore] = useState(0); //track user's total score
  const [showScore, setShowScore] = useState(false); //to display score summary
  const [showResults, setShowResults] = useState(false); //to display full quiz results
  const [userAnswers, setUserAnswers] = useState({}); //store user's selected answers by Question ID

  //handle answer selection
  const handleAnswer = (option) => {
    setSelected(option); //store selected option
    const correct = option === questions[currentQ].correctAnswer;
    if (correct) setScore((prev) => prev + 1); //increase score if correct
    setUserAnswers((prev) => ({ ...prev, [questions[currentQ].id]: option })); //store answer by question ID
  };

  //go to the next question or complete the quiz
  const handleNext = () => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1); //move to next question
      setSelected(null); //reset selected anser
    } else {
      setShowScore(true); //show score summary if no more questions
    }
  };

  //restart quiz
  const handleTryAgain = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setShowScore(false);
    setShowResults(false);
    setUserAnswers({});
  };

  //detect dark mode for styling
  const isDarkMode =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  //quiz styling
  return (
    <section>
      <hr
        style={{
          borderTop: "3px solid var(--custom-blue)",
          opacity: 0.4,
          margin: "2rem 0",
          width: "95%",
        }}
      />
      <h3 className="mt-4" style={{ color: "var(--custom-blue)" }}>
        Quick Quiz: Test Your Knowledge
      </h3>

      {/* Render current question and answer options */}
      {!showScore && !showResults && (
        <>
          <p style={{ fontSize: "1.1rem", maxWidth: "800px" }}>
            {questions[currentQ].question}
          </p>

          {/* Answer options as buttons */}
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {questions[currentQ].options.map((option) => (
              <li key={option} style={{ marginBottom: 8 }}>
                <button
                  style={{
                    padding: "8px 12px",
                    width: "100%",
                    backgroundColor:
                      selected === option ? "#0d6efd" : "#eee",
                    color: selected === option ? "white" : "black",
                    border: "none",
                    cursor: selected ? "default" : "pointer",
                    borderRadius: 4,
                  }}
                  onClick={() => handleAnswer(option)}
                  disabled={selected !== null}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>

          {/* "Next" or "Finish" button shown after selecting an answer */}
          {selected && (
            <button
              onClick={handleNext}
              style={{
                marginTop: 12,
                padding: "8px 16px",
                cursor: "pointer",
                borderRadius: 4,
                backgroundColor: "var(--custom-blue)",
                color: "white",
                border: "none",
              }}
            >
              {currentQ + 1 === questions.length ? "Finish" : "Next"}
            </button>
          )}
        </>
      )}

      {/* Show users total score and post-quiz actions */}
      {showScore && !showResults && (
        <div style={{ maxWidth: 800 }}>
          <p
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              marginTop: "1rem",
            }}
          >
            Your score: {score} / {questions.length}
          </p>

          {/* Button to view full results */}
          <button
            onClick={() => setShowResults(true)}
            style={{
              marginRight: "1rem",
              padding: "8px 16px",
              cursor: "pointer",
              borderRadius: 4,
              backgroundColor: "var(--custom-blue)",
              color: "white",
              border: "none",
            }}
          >
            See Results
          </button>

          {/* Button to retake quiz */}
          <button
            onClick={handleTryAgain}
            style={{
              padding: "8px 16px",
              cursor: "pointer",
              borderRadius: 4,
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
            }}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Detailed results with answer correctness */}
      {showResults && (
        <div style={{ maxWidth: 800, marginTop: 20 }}>
          {questions.map((q) => {
            const userAnswer = userAnswers[q.id];
            const isCorrect = userAnswer === q.correctAnswer;
            const backgroundColor = isDarkMode
              ? "#444"
              : isCorrect
              ? "#d4edda"
              : "#f8d7da";

            const textColor = isDarkMode ? "#eee" : "#000";
            return (
              <div
                key={q.id}
                style={{
                  marginBottom: 20,
                  padding: 12,
                  border: isDarkMode ? "1px solid #555" : "1px solid #ddd",
                  borderRadius: 6,
                  backgroundColor,
                  color: textColor,
                }}
              >
                <p style={{ fontWeight: "bold" }}>{q.question}</p>
                <p>
                  Your answer:{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {userAnswer || "No answer"}
                  </span>
                </p>

                {/* Show correct answer if user was wrong */}
                {!isCorrect && (
                  <p>
                    Correct answer:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {q.correctAnswer}
                    </span>
                  </p>
                )}
              </div>
            );
          })}

          {/* Button to retake the quiz from results screen */}
          <button
            onClick={handleTryAgain}
            style={{
              padding: "8px 16px",
              cursor: "pointer",
              borderRadius: 4,
              backgroundColor: "var(--custom-blue)",
              color: "white",
              border: "none",
            }}
          >
            Try Again
          </button>
        </div>
      )}
    </section>
  );
};

export default Quiz;
