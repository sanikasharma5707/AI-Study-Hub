import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./MCQ.css";

function MCQ() {
  const [file, setFile] = useState(null);
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      setLoading(true);

      const response = await api.post("/notes/mcq", formData);

      const raw = response.data.mcqs;

      const cleanJson = raw
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const quizData = JSON.parse(cleanJson);

      setMcqs(quizData);

      setCurrentQuestion(0);
      setSelectedAnswer("");
      setScore(0);
      setShowResult(false);

    } catch (error) {
      console.error(error);
      alert("Failed to generate MCQs.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {

    if (!selectedAnswer) {
      alert("Please select an option.");
      return;
    }

    if (selectedAnswer === mcqs[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }

    setSelectedAnswer("");

    if (currentQuestion < mcqs.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div className="page-header">
        <h1>❓ AI MCQ Quiz</h1>
        <p>
          Upload your PDF notes and generate AI-powered
          multiple-choice questions in seconds.
        </p>
      </div>
      <div className="upload-container">
        {/* Upload Card */}
        <div className="upload-form">
          <h2>📄 Generate Quiz</h2>
          <p className="page-desc">
            Select your PDF and let AI create
            practice questions instantly.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept=".pdf"
              onChange={handleChange}
            />
            <br />
            <br />
            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "🧠 Generating Quiz..."
                : "🚀 Generate MCQs"}
            </button>
          </form>
        </div>
        {/* Quiz */}
        {mcqs.length > 0 && !showResult && (
          <div className="summary-box">
            <h2>📝 Generated Quiz</h2>
            <div className="question-count">
              Question {currentQuestion + 1} of {mcqs.length}
            </div>
            <h3 className="question">
              {mcqs[currentQuestion].question}
            </h3>
            <div className="options">
              {mcqs[currentQuestion].options.map((option, index) => (
                <label
                  key={index}
                  className="option"
                >
                  <input
                    type="radio"
                    name="option"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={(e) =>
                      setSelectedAnswer(e.target.value)
                    }
                  />
                  {option}
                </label>
              ))}
            </div>
            <button onClick={handleNext}>
              {currentQuestion === mcqs.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </button>
          </div>
        )}
        {/* Result */}
        {showResult && (
          <div className="summary-box">
            <h2>🎉 Quiz Completed Successfully</h2>
            <h1 className="score">
              {score} / {mcqs.length}
            </h1>
            <p className="result-score">
              Accuracy :{" "}
              {Math.round((score / mcqs.length) * 100)}%
            </p>
            <p className="result-text">
              {score >= 8
                ? "🏆 Excellent Performance!"
                : score >= 6
                ? "😊 Great Job!"
                : "📚 Keep Practicing!"}
            </p>
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setSelectedAnswer("");
                setScore(0);
                setShowResult(false);
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </>
  );
}
export default MCQ;