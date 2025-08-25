// src/pages/VideoDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Spinner } from "react-bootstrap";
import ReactPlayer from "react-player";
import styled from "styled-components";
import Quiz from "../components/Quiz";
import axios from 'axios'
import { FiArrowLeft } from "react-icons/fi";


const BackButton = styled(Button)`
  margin-bottom: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.primary};
  border: none;
  padding: 0.5rem 1.25rem;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;

const VideoDetailPage = () => {
    const { videoId } = useParams();
    const [video, setVideo] = useState(null)
    const [hasPlayed, setHasPlayed] = useState(false);
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    // get quiz for the specific video
    useEffect(() => {
        async function fetchVideo() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/get_video/${videoId}`)
                setVideo(response.data);
                console.log('video with questions:', response.data.quizzes);
                setQuizzes(response.data.quizzes)
            } catch (err) {
                console.error('error fetch video:', err)
            }
        }
        fetchVideo()
    }, [])

    // add video to db as watched but not complete quiz yet
    const handlePlay = async () => {
        if (!hasPlayed) {
            try {
                await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/track_progress`, {
                    content_type: 'video',
                    content_id: videoId
                }, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                        "Content-Type": "application/json"
                    }
                });

                // update state immediately
                setHasPlayed(true);
            } catch (err) {
                console.error('Failed to track video play:', err);
            }
        }
    };


    if (!video) return (
        <div className="text-center mt-5">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );

    return (


        <Container fluid className="py-5">
            <div className="mx-auto px-4 px-md-5" style={{ maxWidth: "1140px" }}>
                {/* <BackButton onClick={() => navigate(-1)}>
                    <FiArrowLeft /> Back to Videos
                </BackButton> */}
                <h2 className="mb-3">{video.title}</h2>
                <p className="text-muted mb-4">{video.subtitle}</p>
                <div className="ratio ratio-16x9">
                    <ReactPlayer
                        url={video.url}
                        width="100%"
                        height="100%"
                        controls
                        onPlay={handlePlay}
                    />
                </div>
                <p className="text-muted my-4">{video.description}</p>
                <div className="">
                    <Quiz questions={quizzes} videoId={videoId} mode="video" isWatched={hasPlayed} />
                </div>
            </div>
        </Container>
    );
};

export default VideoDetailPage;
