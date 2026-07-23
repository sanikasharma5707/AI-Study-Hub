import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./Flashcards.css";

function Flashcards() {
    const [file, setFile] = useState(null);
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openCards, setOpenCards] = useState([]);
    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };
    const toggleAnswer = (index) => {
        if (openCards.includes(index)) {
            setOpenCards(openCards.filter((i) => i !== index));
        } else {
            setOpenCards([...openCards, index]);
        }
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
            const response = await api.post(
                "/notes/flashcards",
                formData
            );
            const rawText = response.data.flashcards;
            const cards = rawText
                .split("Q:")
                .filter(card => card.trim() !== "")
                .map(card => {
                    const parts = card.split("A:");
                    return {
                        question: parts[0].trim(),
                        answer: parts[1]?.trim() || ""
                    };
                });
            setFlashcards(cards);
            setOpenCards([]);
        } catch (error) {
            console.error(error);
            alert("Failed to generate flashcards.");

        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flashcards-page">
            <Navbar />
            {/* Hero Section */}
            <div className="page-header">
                <h1>🧠 AI Flashcards</h1>
                <p>
                    Upload your PDF notes and generate AI-powered flashcards
                    for faster revision and better memory retention.
                </p>
            </div>
            <div className="upload-container">
                {/* Upload Card */}
                <div className="upload-form">
                    <h2>🧠 Generate Flashcards</h2>
                    <p className="page-desc">
                        Select your PDF and let AI create interactive
                        flashcards instantly.
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
                            {
                                loading
                                    ? "🧠 Generating Flashcards..."
                                    : "🚀 Generate Flashcards"
                            }
                        </button>
                    </form>
                </div>
                {/* Flashcards */}
                {
                    flashcards.length > 0 && (
                        <div className="summary-box">
                            <h2>🧠 Generated Flashcards</h2>
                            <div className="flashcards-container">
                                {
                                    flashcards.map((card, index) => (
                                        <div
                                            className="flashcard"
                                            key={index}
                                        >
                                            <div className="card-number">
                                                Flashcard {index + 1}
                                            </div>
                                            <h3 className="question-title">
                                                {card.question}
                                            </h3>
                                            <button
                                                className="answer-btn"
                                                onClick={() => toggleAnswer(index)}
                                            >
                                                {
                                                    openCards.includes(index)
                                                        ? "🙈 Hide Answer"
                                                        : "👀 Show Answer"
                                                }
                                            </button>
                                            {
                                                openCards.includes(index) && (
                                                    <div className="answer-box">
                                                        <hr />
                                                        <h4>Answer</h4>
                                                        <p>
                                                            {card.answer}
                                                        </p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
export default Flashcards;