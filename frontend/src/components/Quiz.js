import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Quiz = ({ questions }) => {
  const { videoId } = useParams();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [isWatched, setIsWatched] = useState(null);
  const [completedQuiz, setCompletedQuiz] = useState(false)

  const isDarkMode =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  useEffect(() => {
    const checkWatchedStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/video/single_view/${videoId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log('a5r response:', response.data);

        // If video view exists, allow quiz
        if (response.data) {
          setIsWatched(true);
        } else {
          setIsWatched(false);
        }
        // console.log(response.data.got_fullmark);

        if (response.data.got_fullmark) {
          setCompletedQuiz(true)
        } else {
          setCompletedQuiz(false)
        }
      } catch (error) {
        console.error("Failed to check video view status:", error);
        setIsWatched(false); // fallback
      }
    };

    checkWatchedStatus();
  }, [videoId]);

  const handleAnswer = (option) => {
    setSelected(option);
    const correct = option === questions[currentQ].correct_answer;
    if (correct) setScore((prev) => prev + 1);
    setUserAnswers((prev) => ({ ...prev, [questions[currentQ].id]: option }));
  };

  const handleNext = async () => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
    } else {
      setShowScore(true);

      // ✅ Patch if full mark
      if (score === questions.length) {
        try {
          await axios.patch(
            `${process.env.REACT_APP_API_BASE_URL}/api/video/video_view/fullmark/${videoId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        } catch (err) {
          console.error("Failed to update full mark status:", err);
        }
      }
    }
  };

  const handleTryAgain = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setShowScore(false);
    setShowResults(false);
    setUserAnswers({});
  };

  // ✅ 1. Still checking API
  if (isWatched === null) {
    return <p>Loading quiz...</p>;
  }

  // if (completedQuiz) {
  //   return (
  //     <>
  //       <hr
  //         style={{
  //           borderTop: "3px solid var(--custom-blue)",
  //           opacity: 0.4,
  //           margin: "2rem auto",
  //           width: "95%",
  //         }}
  //       />
  //       <div className="alert alert-success  mt-5" style={{ maxWidth: 600 }}>
  //         <h5>You have successfully completed this quiz.</h5>
  //       </div>
  //     </>
  //   );
  // }

  // ✅ 2. Block quiz if not watched
  if (!isWatched) {
    return (
      <>
        <hr
          style={{
            borderTop: "3px solid var(--custom-blue)",
            opacity: 0.4,
            margin: "2rem auto",
            width: "95%",
          }}
        />
        <div className="alert alert-warning mt-5" style={{ maxWidth: 600 }}>
          <h5>You must watch the video first to unlock this quiz.</h5>
        </div>
      </>
    );
  }

  // ✅ 3. Normal quiz flow
  return (
    <section>
      <hr
        style={{
          borderTop: "3px solid var(--custom-blue)",
          opacity: 0.4,
          margin: "2rem auto",
          width: "95%",
        }}
      />

      <div className="d-flex align-items-start justify-content-between">
        <h3 className=" text-primary">Quick Quiz: Test Your Knowledge</h3>
        {completedQuiz &&
          <div className="alert alert-success d-inline-block py-2 px-3" style={{ maxWidth: 600 }}>
            <strong>Solved ✅</strong>
          </div>
        }
      </div>

      {!showScore && !showResults && (
        <>
          <p className="fs-5">{questions[currentQ].question}</p>
          <ul className="list-unstyled mx-auto" style={{ maxWidth: 400 }}>
            {[questions[currentQ].option1, questions[currentQ].option2, questions[currentQ].option3, questions[currentQ].option4].map(
              (option) => (
                <li key={option} className="mb-2">
                  <button
                    className={`btn w-100 ${selected === option ? "btn-primary" : "btn-outline-secondary"
                      }`}
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </button>
                </li>
              )
            )}
          </ul>
          {selected && (
            <button
              className="btn btn-primary text-white mt-3"
              onClick={handleNext}
            >
              {currentQ + 1 === questions.length ? "Finish" : "Next"}
            </button>
          )}
        </>
      )}

      {showScore && !showResults && (
        <div style={{ maxWidth: 800 }}>
          <p style={{ fontSize: "1.3rem", fontWeight: "bold", marginTop: "1rem" }}>
            Your score: {score} / {questions.length}
          </p>
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

      {showResults && (
        <div style={{ maxWidth: 800, marginTop: 20 }}>
          {questions.map((q) => {
            const userAnswer = userAnswers[q.id];
            const isCorrect = userAnswer === q.correct_answer;
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
                  <span style={{ fontWeight: "bold" }}>{userAnswer || "No answer"}</span>
                </p>
                {!isCorrect && (
                  <p>
                    Correct answer:{" "}
                    <span style={{ fontWeight: "bold" }}>{q.correct_answer}</span>
                  </p>
                )}
              </div>
            );
          })}
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
