import React, { useEffect, useState } from "react";
import BackToTop from "../components/BackToTop";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Quiz from "../components/Quiz";

const LabPage = () => {
    const [lab, setLab] = useState({ content: "", quiz: {} });
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const [quizzes, setQuizzes] = useState([]);


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_BASE_URL}/api/get_lab/${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setLab(response.data);
                setQuizzes(response.data.quizzes)
            } catch (err) {
                console.error("Failed to fetch lab:", err);
            }
        }
        fetchData();
    }, [id, token]);

    return (
        <main className="min-h-screen">
            <Container className="px-4 sm:px-6 lg:px-8 mx-auto">
                <div className="row my-5 col-md-8 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="markdown-body "> {/* Centered with responsive margins */}
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {lab.content}
                        </ReactMarkdown>
                    </div>
                    <Quiz questions={quizzes} labId={id} mode="lab" />
                </div>
                <BackToTop home="Home" />
            </Container>
        </main>
    );
};

export default LabPage;