import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { Alert } from "react-bootstrap";
import axios from "axios";

export default function AddVideo() {
    const [open, setOpen] = React.useState(false);
    const [step, setStep] = React.useState(1); // Step 1 = video form, Step 2 = questions
    const [video, setVideo] = React.useState({
        title: "",
        subtitle: "",
        description: "",
        url: "",
    });
    const [questions, setQuestions] = React.useState([
        { question: "", correct_answer: "", options: ["", "", "", ""] },
        { question: "", correct_answer: "", options: ["", "", "", ""] },
        { question: "", correct_answer: "", options: ["", "", "", ""] },
        { question: "", correct_answer: "", options: ["", "", "", ""] },
    ]);

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setError(null);
        setSuccess(false);
        setStep(1);
    };

    const handleClose = () => {
        setOpen(false);
        setVideo({ title: "", subtitle: "", description: "", url: "" });
        setQuestions([
            { question: "", correct_answer: "", options: ["", "", "", ""] },
            { question: "", correct_answer: "", options: ["", "", "", ""] },
            { question: "", correct_answer: "", options: ["", "", "", ""] },
            { question: "", correct_answer: "", options: ["", "", "", ""] },
        ]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVideo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleQuestionChange = (index, field, value) => {
        const updated = [...questions];
        if (field.startsWith("option")) {
            const optIndex = parseInt(field.replace("option", "")) - 1;
            updated[index].options[optIndex] = value;
        } else {
            updated[index][field] = value;
        }
        setQuestions(updated);
    };

    const handleNext = () => {
        if (!video.title || !video.subtitle || !video.description || !video.url) {
            setError("Please fill all video fields");
            return;
        }
        setError(null);
        setStep(2);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/video/add_video`,
                {
                    ...video,
                    quizzes: questions,
                }
            );
            setSuccess(true);
            setTimeout(() => {
                handleClose();
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to add video with questions");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Button
                variant="outlined"
                color="black"
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
                sx={{ mt: 2, mb: 2 }}
            >
                Video
            </Button>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>{step === 1 ? "Add New Video" : "Add Questions"}</DialogTitle>
                <DialogContent>
                    {step === 1 && (
                        <>
                            <TextField
                                margin="dense"
                                name="url"
                                label="Video URL"
                                fullWidth
                                variant="standard"
                                value={video.url}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <TextField
                                margin="dense"
                                name="title"
                                label="Video Title"
                                fullWidth
                                variant="standard"
                                value={video.title}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <TextField
                                margin="dense"
                                name="subtitle"
                                label="Video Subtitle"
                                fullWidth
                                variant="standard"
                                value={video.subtitle}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <TextField
                                margin="dense"
                                name="description"
                                label="Video Description"
                                fullWidth
                                variant="standard"
                                value={video.description}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </>
                    )}


                    {step === 2 &&
                        questions.map((q, idx) => (
                            <div key={idx} style={{ marginTop: "16px" }}>
                                <h4>Question {idx + 1}</h4>
                                <TextField
                                    label="Question"
                                    fullWidth
                                    margin="dense"
                                    variant="outlined"
                                    value={q.question}
                                    onChange={(e) =>
                                        handleQuestionChange(idx, "question", e.target.value)
                                    }
                                />
                                <TextField
                                    label="Correct Answer"
                                    fullWidth
                                    margin="dense"
                                    variant="outlined"
                                    value={q.correct_answer}
                                    onChange={(e) =>
                                        handleQuestionChange(idx, "correct_answer", e.target.value)
                                    }
                                />
                                {q.options.map((opt, optIndex) => (
                                    <TextField
                                        key={optIndex}
                                        label={`Option ${optIndex + 1}`}
                                        fullWidth
                                        margin="dense"
                                        variant="outlined"
                                        value={opt}
                                        onChange={(e) =>
                                            handleQuestionChange(
                                                idx,
                                                `option${optIndex + 1}`,
                                                e.target.value
                                            )
                                        }
                                    />
                                ))}
                            </div>
                        ))}

                    {error && (
                        <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>

                    {step === 1 && (
                        <Button
                            onClick={handleNext}
                            disabled={
                                !video.title ||
                                !video.subtitle ||
                                !video.description ||
                                !video.url
                            }
                        >
                            Next
                        </Button>
                    )}

                    {step === 2 && (
                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading ? "Submitting..." : "Submit All"}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
}
