//import for building component
import React from "react";

// Component for a Fill-in-the-Blank questions
// Takes `questions` as a prop, which is an array of question objects
const FillInTheBlank = ({ questions }) => {

  //use state to store user's answer
  const [userAnswers, setUserAnswers] = React.useState({});

  //state to determine whether to show correct answer or not
  const [showResults, setShowResults] = React.useState(false);

  //handle changes in input fields
  const handleChange = (id, value) => {
    setUserAnswers({ ...userAnswers, [id]: value });
  };

  //handle submit button
  const handleSubmit = () => {
    setShowResults(true);
  };

  //reset the quiz -> clear all prior selections and hid results
  const handleReset = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  //format the fill in the blank questions and answers; button functionalities
  return (
    <section style={{ maxWidth: 800, marginTop: "2rem" }}>
      <h4 style={{ color: "var(--custom-blue)", fontWeight: "bold" }}>📝 Fill in the Blanks</h4>

      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: 20 }}>
          <p style={{ fontSize: "1.1rem" }}>
            {q.question.split("________").map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && (
                  <input
                    type="text"
                    value={userAnswers[q.id] || ""}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    disabled={showResults}
                    style={{
                      width: 150,
                      padding: "4px 8px",
                      fontSize: "1rem",
                      borderRadius: 4,
                      border: "1px solid #ccc",
                      margin: "0 0.5rem",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </p>
          {showResults && (
            <div style={{ marginTop: 6 }}>
              {userAnswers[q.id]?.trim().toLowerCase() === q.correctAnswer.toLowerCase() ? (
                <span style={{ color: "green" }}>✅ Correct</span>
              ) : (
                <span style={{ color: "red" }}>
                  ❌ Incorrect — Correct answer: <strong>{q.correctAnswer}</strong>
                </span>
              )}
            </div>
          )}
        </div>
      ))}

      {!showResults ? (
        <button
          onClick={handleSubmit}
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            backgroundColor: "var(--custom-blue)",
            color: "white",
            border: "none",
            marginTop: 10,
          }}
        >
          🚀 Submit Answers
        </button>
      ) : (
        <button
          onClick={handleReset}
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            marginTop: 10,
          }}
        >
          🔁 Try Again
        </button>
      )}
    </section>
  );
};

export default FillInTheBlank;
