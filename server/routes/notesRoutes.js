const express = require("express");
const router = express.Router();
const { uploadController,flashcardsController,mcqController } = require("../controllers/notesController");
const upload = require("../middlewares/uploadMiddleware");


router.post("/upload", upload.single("pdf"), uploadController);
router.post("/flashcards",upload.single("pdf"), flashcardsController);
router.post("/mcq", upload.single("pdf"),mcqController);

module.exports = router;