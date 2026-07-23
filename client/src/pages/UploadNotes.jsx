import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./UploadNotes.css";
import ReactMarkdown from "react-markdown"

function UploadNotes() {

    const [file, setFile] = useState(null);
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a PDF first.");
            return;
        }
        const formData = new FormData();
        formData.append("pdf", file);
        try {
            setLoading(true);
            const response = await api.post(
                "/notes/upload",
                formData
            );
            setSummary(response.data.summary);
        }
        catch (error) {
            console.error(error);
            alert("Failed to generate summary.");
        }
        finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Navbar />
            <div className="upload-page">
                <div className="upload-hero">
                    <h1>📄 AI Note Summarizer</h1><br></br>
                    <p>
                        Upload your PDF notes and generate a concise,
                        AI-powered summary in seconds.
                    </p>
                </div>
                <div className="upload-container">
                    <div className="upload-form">
                        <h2>📚 Upload Notes</h2>
                        <p className="upload-text">
                            Select your PDF and let AI create
                            an easy-to-read summary for quick revision.
                        </p>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleChange}
                            />
                            <button
                                type="submit"
                                disabled={loading}
                            >
                                {
                                    loading
                                        ? "⏳ Generating Summary..."
                                        : "🚀 Upload & Generate Summary"
                                }
                            </button>
                        </form>
                    </div>
                    {summary && (
                        <div className="summary-box">
                            <h2>🤖 AI Summary</h2>
                            <ReactMarkdown>{summary}</ReactMarkdown>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
export default UploadNotes;