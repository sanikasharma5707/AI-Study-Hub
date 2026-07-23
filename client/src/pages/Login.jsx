import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Login() {
    const [formData, setFormData] = useState({
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
            const response = await api.post("/users/login", formData);
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            alert("Invalid Email or Password");
        }
    };

    return (

        <div className="auth-container">
            {/* Left Side */}

            <div className="auth-left">
                <h1>📚 AI Study Hub</h1>
                <p className="tagline">
                    Learn Smarter with Artificial Intelligence
                </p>
                <img src="/ai-study.png" alt="AI Study Hub" className="auth-image"/>
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

            {/* Right Side */}
            <div className="auth-right">
                <div className="auth-card">
                    <h2>Welcome Back 👋</h2>
                    <p>
                        Login to continue your learning journey.
                    </p>
                    <form onSubmit={handleSubmit}>
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
                            Login
                        </button>
                    </form>
                    <p className="bottom-text">
                        Don't have an account?
                        <Link to="/register"> Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;