// src/pages/CommunityVideo.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Spinner } from "react-bootstrap";
import ReactPlayer from "react-player";
import styled from "styled-components";
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

const CommunityVideo = () => {
    const { id } = useParams();
    const [video, setVideo] = useState(null)
    const navigate = useNavigate()

    // get quiz for the specific video
    useEffect(() => {
        async function fetchVideo() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/get_communityVideo/${id}`)
                setVideo(response.data);
            } catch (err) {
            }
        }
        fetchVideo()
    }, [])


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
                <BackButton onClick={() => navigate(-1)}>
                    <FiArrowLeft /> Back to Videos
                </BackButton>
                <div className="d-flex align-items-center justify-content-between">
                    <h2 className="mb-3">{video.title}</h2>
                    <small className="text-muted fst-italic mb-2">
                        By: {video.user_name}
                    </small>
                </div>
                <p className="text-muted mb-4">{video.subtitle}</p>
                <div className="ratio ratio-16x9">
                    <ReactPlayer
                        url={video.url}
                        width="100%"
                        height="100%"
                        controls
                    />
                </div>
                <p className="text-muted my-4">{video.description}</p>
            </div>
        </Container>
    );
};

export default CommunityVideo;
