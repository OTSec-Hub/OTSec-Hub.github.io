// src/pages/CommunityVideo.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Spinner } from "react-bootstrap";
import ReactPlayer from "react-player";
import axios from 'axios'

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
