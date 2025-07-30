import axios from "axios";
import React, { useEffect, useState } from "react";

const Quiz = ({ questions = [], videoId, labId, mode = "video" }) => {
  const isLab = mode === "lab";
  const isStatic = mode === "static";
  const contentId = mode === "video" ? videoId : labId;
  console.log(contentId);

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [isWatched, setIsWatched] = useState(null);
  const [completedQuiz, setCompletedQuiz] = useState(false);
  const [loading, setLoading] = useState(true);

  const isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  useEffect(() => {
    const initializeQuiz = async () => {
      try {
        // Skip check for static content

        if (contentId != undefined) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/track_progress/single_view`,
            {
              params: {  // Moved content_type and content_id to params
                content_type: mode,
                content_id: contentId
              },
              headers: {  // Proper headers structure
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }
          );
          console.log(response.data);

          // For videos, check if watched (record exists)
          if (mode === "video") {
            setIsWatched(!!response.data);
          }
          // For labs, we don't restrict access - just check completion status
          else if (mode === "lab") {
            setIsWatched(true); // Always allow access to lab quizzes
          }

          // Set the actual quiz completion status
          setCompletedQuiz(response.data?.quiz_completed ?? false);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          // No record found - for videos, not watched
          // For labs, we still allow access
          setIsWatched(mode === "lab");
          setCompletedQuiz(false);

        } else {
          console.error("Quiz initialization error:", error);
          setIsWatched(mode === "lab"); // Allow access to labs even if error
          setCompletedQuiz(false);
        }
      } finally {
        setLoading(false);
        console.log('fail here');
      }
    };

    initializeQuiz();
  }, [videoId, labId, isStatic, mode]);


  const handleAnswer = (option) => {
    setSelected(option);
    const correct = option === questions[currentQ].correct_answer;
    if (correct) setScore(prev => prev + 1);
    setUserAnswers(prev => ({ ...prev, [questions[currentQ].id]: option }));
  };

  const handleNext = async () => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
    } else {
      setShowScore(true);

      // Track progress if all answers correct
      if (score === questions.length && !isStatic) {
        try {
          await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/track_progress`,
            {
              content_type: mode,
              content_id: mode === "video" ? videoId : labId,
              quiz_completed: true
            },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
          );
          setCompletedQuiz(true);

          // For labs, update isWatched since it represents quiz completion
          if (mode === "lab") {
            setIsWatched(true);
          }
        } catch (err) {
          console.error("Progress update failed:", err);
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

  if (loading) {
    return <div className="p-3">Loading quiz...</div>;
  }

  if (mode === "video" && !isWatched && !isStatic) {
    return (
      <div className="mt-4">
        <hr className="border-top border-primary opacity-40 my-4 w-95" />
        <div className="alert alert-warning mt-3" style={{ maxWidth: "600px" }}>
          <h5>You must watch the video first to unlock this quiz.</h5>
        </div>
      </div>
    );
  }

  // if (mode === "lab" && !isWatched && !isStatic) {
  //   return (
  //     <div className="mt-4">
  //       <hr className="border-top border-primary opacity-40 my-4 w-95" />
  //       <div className="alert alert-warning mt-3" style={{ maxWidth: "600px" }}>
  //         <h5>You must complete the lab first to unlock this quiz.</h5>
  //       </div>
  //     </div>
  //   );
  // }

  if (!questions.length) {
    return (
      <div className="mt-4">
        <hr className="border-top border-primary opacity-40 my-4 w-95" />
        <div className="alert alert-info mt-3" style={{ maxWidth: "600px" }}>
          <h5>No questions available for this quiz.</h5>
        </div>
      </div>
    );
  }

  // Get options for current question
  const currentOptions = questions[currentQ].options || [
    questions[currentQ].option1,
    questions[currentQ].option2,
    questions[currentQ].option3,
    questions[currentQ].option4
  ].filter(Boolean);

  return (
    <section>
      <hr className="border-top border-primary opacity-40 my-4 w-95" />
      <div className="d-flex align-items-start justify-content-between">
        <h3 className="text-primary">Quick Quiz: Test Your Knowledge</h3>
        {completedQuiz && (
          <div className="alert alert-success d-inline-block py-2 px-3" style={{ maxWidth: "600px" }}>
            <strong>Solved ✅</strong>
          </div>
        )}
      </div>

      {!showScore && !showResults && (
        <div className="quiz-container">
          <p className="fs-5">{questions[currentQ].question}</p>
          <ul className="list-unstyled mx-auto" style={{ maxWidth: "400px" }}>
            {currentOptions.map((option) => (
              <li key={option} className="mb-2">
                <button
                  className={`btn w-100 ${selected === option ? "btn-primary" : "btn-outline-secondary"}`}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
          {selected && (
            <button className="btn btn-primary text-white mt-3" onClick={handleNext}>
              {currentQ + 1 === questions.length ? "Finish" : "Next"}
            </button>
          )}
        </div>
      )}

      {showScore && !showResults && (
        <div style={{ maxWidth: "800px" }}>
          <p className="fs-5 fw-bold mt-3">Your score: {score} / {questions.length}</p>
          <div className="d-flex gap-2">
            <button
              className="btn btn-primary"
              onClick={() => setShowResults(true)}
            >
              See Results
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleTryAgain}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {showResults && (
        <div style={{ maxWidth: "800px", marginTop: "20px" }}>
          {questions.map((q) => {
            const userAnswer = userAnswers[q.id];
            const isCorrect = userAnswer === q.correct_answer;

            return (
              <div
                key={q.id}
                className={`p-3 mb-3 rounded ${isCorrect ? "bg-success-light" : "bg-danger-light"}`}
                style={{ border: isDarkMode ? "1px solid #555" : "1px solid #ddd" }}
              >
                <p className="fw-bold">{q.question}</p>
                <p>Your answer: <span className="fw-bold">{userAnswer || "No answer"}</span></p>
                {!isCorrect && (
                  <p>Correct answer: <span className="fw-bold">{q.correct_answer}</span></p>
                )}
              </div>
            );
          })}
          <button className="btn btn-primary" onClick={handleTryAgain}>
            Try Again
          </button>
        </div>
      )}
    </section>
  );
};

export default Quiz;