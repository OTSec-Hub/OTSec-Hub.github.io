import React, { useEffect, useState } from 'react';
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import BackToTop from '../components/BackToTop';
import { Typography } from '@mui/material';
import { Alert, Button, Form, Spinner } from "react-bootstrap";

export default function ExercisePage() {
    const [exercise, setExercise] = useState({});
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const { exerciseId } = useParams();

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/get_exercise/${exerciseId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setExercise(response.data);
            } catch (error) {
                console.error("Error fetching exercise:", error);
            }
        };
        fetchExercise();
    }, [exerciseId]);

    const handleChange = (index, value) => {
        const newAnswers = [ ...answers ];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSubmitError(null);
        setSubmitSuccess(false);

        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/submit_exercise/${exerciseId}`, {
                answers: answers
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            setSubmitSuccess(true);
        } catch (error) {
            console.error("Submission failed:", error);
            setSubmitError("Failed to submit your answers. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen">
            <Container className="px-4 sm:px-6 lg:px-8 mx-auto">
                <div className="row my-5 col-md-8 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="markdown-body">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {exercise.content}
                        </ReactMarkdown>
                    </div>

                    {exercise.questions && exercise.questions.length > 0 ? (
                        <Form onSubmit={handleSubmit} className="mt-4">
                            {exercise.questions.map((question, index) => (
                                <Form.Group key={index} className="mb-3" controlId={`question-${index}`}>
                                    <Form.Label><strong>{question}</strong></Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Your Answer"
                                        value={answers[index] || ""}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            ))}

                            {submitError && <Alert variant="danger">{submitError}</Alert>}
                            {submitSuccess && <Alert variant="success">Answers submitted successfully!</Alert>}

                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : "Submit Answers"}
                            </Button>
                        </Form>
                    ) : (
                        <Typography variant="h6" className="text-center mt-4">
                            No questions available for this exercise.
                        </Typography>
                    )}
                </div>
                <BackToTop home="Home" />
            </Container>
        </main>
    );
}
