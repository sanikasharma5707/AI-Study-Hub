import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(
                "/users/register",
                formData
            );
            alert(response.data.message);
            navigate("/login");
        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };
    return (
        <div className="auth-container">
            {/* LEFT */}
            <div className="auth-left">
                <h1>📚 AI Study Hub</h1>
                <p className="tagline">
                    Learn Smarter with Artificial Intelligence
                </p>
                <img
                    src="/ai-study.png"
                    alt="AI Study Hub"
                    className="auth-image"
                />
                <div className="features">
                    <p>✅ AI Generated Summaries</p>
                    <p>🧠 Smart Flashcards</p>
                    <p>❓ Interactive MCQ Quiz</p>
                    <p>⚡ Fast PDF Processing</p>
                </div>
                <h3 className="quote">
                    "Transform your notes into an intelligent learning experience."
                </h3>
            </div>
            {/* RIGHT */}
            <div className="auth-right">
                <div className="auth-card">
                    <h2>Create Account 🚀</h2>
                    <p>
                        Join AI Study Hub and start learning smarter.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                        <button type="submit">
                            Create Account
                        </button>
                    </form>
                    <p className="bottom-text">
                        Already have an account?
                        <Link to="/login">
                            {" "}Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;