import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      <div className="hero">

        <h1>📚 AI Study Hub</h1>

        <h2>Study Smarter with Artificial Intelligence</h2>

        <p>
          Upload your PDF notes and instantly generate
          <strong> AI Summaries</strong>,
          <strong> Flashcards</strong> and
          <strong> MCQ Quizzes</strong> to make learning faster,
          smarter and more interactive.
        </p>

        <div className="hero-buttons">

          <Link to="/login">
            <button className="primary-btn">
              Get Started
            </button>
          </Link>

          <Link to="/register">
            <button className="secondary-btn">
              Register
            </button>
          </Link>

        </div>

      </div>

      <div className="features">

        <div className="feature-card">
          <div className="icon">📄</div>
          <h3>AI Summary</h3>
          <p>
            Convert lengthy notes into concise summaries in seconds.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">🧠</div>
          <h3>Flashcards</h3>
          <p>
            Revise important concepts with smart AI flashcards.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">❓</div>
          <h3>MCQ Quiz</h3>
          <p>
            Test yourself using AI-generated multiple choice questions.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Home;