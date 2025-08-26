import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import axios from "axios";
import MarkDownEditor from "../MarkDownEditor";


const EditLab = ({ lab }) => {
    const [open, setOpen] = React.useState(false);
    const [labData, setLabData] = React.useState({
        id: lab.id || "",
        lab_img: lab.lab_img || "",
        title: lab.title || "",
        content: lab.content || "",
        quizzes: lab.quizzes || [],
    });

    const originalData = {
        id: lab.id || "",
        lab_img: lab.lab_img || "",
        title: lab.title || "",
        content: lab.content || "",
        quizzes: lab.quizzes || [],
    };
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setError(null);
        setSuccess(false);
    };

    const handleClose = () => {
        setOpen(false);
        setError(null);
        setSuccess(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLabData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const hasChanges = () => {
        if (
            labData.title !== originalData.title ||
            labData.lab_img !== originalData.lab_img ||
            labData.content !== originalData.content
        ) return true;

        if (labData.quizzes.length !== originalData.quizzes.length) return true;

        for (let i = 0; i < labData.quizzes.length; i++) {
            const newQuiz = labData.quizzes[i];
            const originalQuiz = originalData.quizzes[i];
            if (
                newQuiz.question !== originalQuiz.question ||
                newQuiz.correct_answer !== originalQuiz.correct_answer ||
                newQuiz.option1 !== originalQuiz.option1 ||
                newQuiz.option2 !== originalQuiz.option2 ||
                newQuiz.option3 !== originalQuiz.option3 ||
                newQuiz.option4 !== originalQuiz.option4
            ) return true;
        }

        return false;
    };


    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const payload = {
                title: labData.title,
                lab_img: labData.lab_img,
                content: labData.content,
                quizzes: labData.quizzes.map(q => ({
                    id: q.id,
                    question: q.question,
                    correct_answer: q.correct_answer,
                    options: [q.option1, q.option2, q.option3, q.option4], // ✅ critical line
                }))
            };

            const response = await axios.put(
                `${process.env.REACT_APP_API_BASE_URL}/api/update_lab/${labData.id}`,
                payload
            );

            setSuccess(true);
        } catch (err) {
            setError("Failed to update lab.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <StyledWrapper>
                <button className="editBtn" onClick={handleClickOpen}>
                    <svg height="1em" viewBox="0 0 512 512">
                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                    </svg>
                </button>
            </StyledWrapper>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Edit lab</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={labData.title}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <TextField
                        margin="dense"
                        name="lab_img"
                        label="Image URL"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={labData.lab_img}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    {/* <TextField
                        margin="dense"
                        name="content"
                        label="Content"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={labData.content}
                        onChange={handleChange}
                        disabled={loading}
                    /> */}
                    <MarkDownEditor
                        value={labData.content}
                        handleChange={handleChange}
                        disabled={loading}
                    />

                    {labData.quizzes.map((quiz, index) => (
                        <div key={index} style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }}>
                            <TextField
                                label={`Question ${index + 1}`}
                                variant="standard"
                                fullWidth
                                value={quiz.question}
                                onChange={(e) => {
                                    const updated = [...labData.quizzes];
                                    updated[index].question = e.target.value;
                                    setLabData((prev) => ({ ...prev, quizzes: updated }));
                                }}
                                disabled={loading}
                                style={{ marginBottom: "10px" }}
                            />

                            <TextField
                                label="Correct Answer"
                                variant="standard"
                                fullWidth
                                value={quiz.correct_answer}
                                onChange={(e) => {
                                    const updated = [...labData.quizzes];
                                    updated[index].correct_answer = e.target.value;
                                    setLabData((prev) => ({ ...prev, quizzes: updated }));
                                }}
                                disabled={loading}
                                style={{ marginBottom: "10px" }}
                            />

                            {["option1", "option2", "option3", "option4"].map((optKey, optIndex) => (
                                <TextField
                                    key={optKey}
                                    label={`Option ${optIndex + 1}`}
                                    variant="standard"
                                    fullWidth
                                    value={quiz[optKey]}
                                    onChange={(e) => {
                                        const updated = [...labData.quizzes];
                                        updated[index][optKey] = e.target.value;
                                        setLabData((prev) => ({ ...prev, quizzes: updated }));
                                    }}
                                    disabled={loading}
                                    style={{ marginBottom: "5px" }}
                                />
                            ))}
                        </div>
                    ))}


                    {success && (
                        <p
                            style={{
                                color: "#28a745",
                                textAlign: "center",
                                marginTop: 10,
                                marginBottom: 0,
                            }}
                        >
                            Data updated successfully!
                        </p>
                    )}
                    {error && (
                        <p
                            style={{
                                color: "red",
                                textAlign: "center",
                                marginTop: 10,
                                marginBottom: 0,
                            }}
                        >
                            {error}
                        </p>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>
                        {success ? "Close" : "Cancel"}
                    </Button>
                    {!success && (
                        <Button
                            onClick={handleSubmit}
                            disabled={loading || !labData.title || !labData.lab_img || !hasChanges()}
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
};

const StyledWrapper = styled.div`
  .editBtn {
    width: 50px;
    height: 50px;
    border-radius: 20px;
    border: none;
    background-color: rgb(93, 93, 116);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.123);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
  }
  .editBtn::before {
    content: "";
    width: 200%;
    height: 200%;
    background-color: rgb(102, 102, 141);
    position: absolute;
    z-index: 1;
    transform: scale(0);
    transition: all 0.3s;
    border-radius: 50%;
    filter: blur(10px);
  }
  .editBtn:hover::before {
    transform: scale(1);
  }
  .editBtn:hover {
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.336);
  }

  .editBtn svg {
    height: 17px;
    fill: white;
    z-index: 3;
    transition: all 0.2s;
    transform-origin: bottom;
  }
  .editBtn:hover svg {
    transform: rotate(-15deg) translateX(5px);
  }
  .editBtn::after {
    content: "";
    width: 25px;
    height: 1.5px;
    position: absolute;
    bottom: 19px;
    left: -5px;
    background-color: white;
    border-radius: 2px;
    z-index: 2;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease-out;
  }
  .editBtn:hover::after {
    transform: scaleX(1);
    left: 0px;
    transform-origin: right;
  }
`;

export default EditLab;
