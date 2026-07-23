import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const handleUpload = () => {
    navigate("/upload");
    };
    
    const handleFlashcards = () => {
    navigate("/flashcards");
    };

    const handleMCQ = () => {
    navigate("/mcq");
    };

    return (
        <>
            <Navbar />

            <div className="dashboard">
                <div className="hero">
                    <h1>👋 Welcome Back!</h1>
                    <p> Study Smarter with AI</p>
                    <span>
                     Upload notes, generate summaries,
                     revise with flashcards and practice with AI-powered quizzes.
                    </span>
                </div>
                <br></br>

                <div className="cards">
                    <FeatureCard
                        icon="📄"
                        title="Upload Notes"
                        description="Upload PDF notes and instantly generate AI-powered summaries."
                        buttonText="Upload PDF"
                        onClick={handleUpload}
                    />

                    <FeatureCard
                        icon="❓"
                        title="MCQ Quiz"
                        description="Challenge yourself with AI-generated multiple-choice questions."
                        buttonText="Start Practice"
                        onClick={handleMCQ}
                    />

                    <FeatureCard
                        icon="🧠"
                        title="Flashcards"
                        description="Revise faster using intelligent AI-generated flashcards."
                        buttonText="Start Revising"
                        onClick={handleFlashcards}
                    />
                </div>
                <div className="quote-box">
                    <h3>💡 Quote of the Day</h3>
                    <p>
                    "The beautiful thing about learning is
                     that nobody can take it away from you."
                    </p>
                    <span>— B.B. King</span>
                </div>
            </div>
        </>
    );
}
export default Dashboard;