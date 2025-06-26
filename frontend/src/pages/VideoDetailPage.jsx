// src/pages/VideoDetailPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import ReactPlayer from "react-player";
import Quiz from "../components/Quiz";

// Sample video data (later replace with API from database)
const videos = [
    {
        id: 1,
        title: "ICS Security Lab 1",
        description: "Introductory lab on ICS security and PLC concepts.",
        url: "https://www.youtube.com/embed/P7ZCGY8fXOU",
    },
];

const lab0QuizQuestions = [
    {
        id: 1,
        question: "What is the minimum amount of free disk space recommended for installing the required lab software?",
        options: ["10 GB", "20 GB", "40 GB", "100 GB"],
        correctAnswer: "40 GB",
    },
    {
        id: 2,
        question: "Which MATLAB tools must be installed to complete all labs?",
        options: [
            "Simulink and Data Acquisition Toolbox",
            "Simulink and Simulink PLC Coder",
            "Simulink only",
            "No add-ons are needed",
        ],
        correctAnswer: "Simulink and Simulink PLC Coder",
    },
    {
        id: 3,
        question: "Why can’t the online version of MATLAB be used for this course?",
        options: [
            "It is a paid service",
            "It does not support all required features",
            "It is too slow for simulations",
            "It’s not compatible with Windows",
        ],
        correctAnswer: "It does not support all required features",
    },
    {
        id: 4,
        question: "What version of CODESYS is required for the labs?",
        options: [
            "Latest version (any)",
            "Version 3.5.17.0 (32-bit)",
            "Version 3.5.20.0 (64-bit)",
            "Web-based version",
        ],
        correctAnswer: "Version 3.5.17.0 (32-bit)",
    },
];

const VideoDetailPage = () => {
    const { videoId } = useParams();
    const video = videos.find((v) => v.id === Number(videoId));

    if (!video) return <h2 className="text-center mt-5">Video not found</h2>;
    const handlePlay = () => {
        // Logic to track video play can be added here
        console.log(`Playing video: ${video.title}`);
    };
    return (
        <Container fluid className="py-5">
            <div className="mx-auto px-4 px-md-5" style={{ maxWidth: "1140px" }}>

                <h2 className="mb-3">{video.title}</h2>
                <p className="text-muted mb-4">{video.description}</p>
                <div className="ratio ratio-16x9">
                    <ReactPlayer
                        url={video.url}
                        width="100%"
                        height="100%"
                        controls
                        onPlay={handlePlay}
                    />
                </div>
                <div className="">
                    <Quiz questions={lab0QuizQuestions} />
                </div>
            </div>
        </Container>
    );
};

export default VideoDetailPage;
