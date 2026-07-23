const fs = require("fs");
const pdfParse = require("pdf-parse");
const { generateSummary,generateFlashcards,generateMCQs } = require("../services/aiService");

const uploadController = async (req, res) => {
    try {
        const dataBuffer = fs.readFileSync(req.file.path);
        const data = await pdfParse(dataBuffer);
        const summary = await generateSummary(data.text);
        res.status(200).json({
            message: "PDF uploaded successfully",
            summary,
        });
    } catch (error) {
    console.error("========== ERROR ==========");
    console.error(error);
    console.error(error.message);
    if (error.error) {
        console.error(JSON.stringify(error.error, null, 2));
    }
    console.error("===========================");
    res.status(500).json({
        message: error.message,
    });
}
};
const flashcardsController = async (req, res) => {
    try {
        const dataBuffer = fs.readFileSync(req.file.path);
        const data = await pdfParse(dataBuffer);
        const flashcards = await generateFlashcards(data.text);
        res.status(200).json({
            flashcards
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error generating flashcards"
        });
    }
};
const mcqController = async (req, res) => {
    try {
        const dataBuffer = fs.readFileSync(req.file.path);
        const data = await pdfParse(dataBuffer);
        const mcqs = await generateMCQs(data.text);
        res.status(200).json({
            mcqs
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error generating MCQs"
        });
    }
};
module.exports = {
    uploadController,flashcardsController,mcqController
};