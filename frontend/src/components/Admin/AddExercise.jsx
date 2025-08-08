import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import axios from "axios";
import MarkDownEditor from "../MarkDownEditor";

export default function AddExercise() {
    const [open, setOpen] = React.useState(false);
    const [exercise, setExercise] = React.useState({
        title: "",
        subtitle: "",
        content: "",
        questions: []
    });

    const token = localStorage.getItem('token')

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(false);

    const addQuestion = () => {
        setExercise((prev) => ({
            ...prev,
            questions: [...prev.questions, ""]
        }));
    };

    const handleQuestionChange = (index, value) => {
        const updatedQuestions = [...exercise.questions];
        updatedQuestions[index] = value;
        setExercise((prev) => ({
            ...prev,
            questions: updatedQuestions
        }));
    };

    const removeQuestion = (index) => {
        const updatedQuestions = [...exercise.questions];
        updatedQuestions.splice(index, 1);
        setExercise((prev) => ({
            ...prev,
            questions: updatedQuestions
        }));
    };

    const handleClickOpen = () => {
        setOpen(true);
        setError(null);
        setSuccess(false);
    };

    const handleClose = () => {
        setOpen(false);
        setExercise({ title: "", subtitle: "", content: "", questions: [] }
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExercise((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSubmit = async () => {
        if (!exercise.title || !exercise.subtitle || !exercise.content) {
            setError("Please fill all lab fields");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/create_exercise`, exercise,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setSuccess(true);
            setTimeout(() => {
                handleClose();
            }, 1500);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.detail || "Failed to add exercise with questions");
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
                Exercise
            </Button>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Add New Exercise</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="title"
                        label="Exercise Title"
                        fullWidth
                        variant="standard"
                        value={exercise.title}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <TextField
                        margin="dense"
                        name="subtitle"
                        label="Exercise Subtitle"
                        fullWidth
                        variant="standard"
                        value={exercise.subtitle}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <MarkDownEditor
                        value={exercise.content}
                        handleChange={handleChange}
                        disabled={loading}
                    />
                    <Button
                        onClick={addQuestion}
                        variant="outlined"
                        color="primary"
                        sx={{ my: 2 }}
                    >
                        + Add Question
                    </Button>
                    {exercise.questions.map((q, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <TextField
                                fullWidth
                                label={`Question ${index + 1}`}
                                variant="outlined"
                                value={q}
                                onChange={(e) => handleQuestionChange(index, e.target.value)}
                                disabled={loading}
                            />
                            <Button
                                onClick={() => removeQuestion(index)}
                                color="error"
                                disabled={loading}
                            >
                                Remove
                            </Button>
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

                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Submitting..." : "Submit All"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
