import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Title from "../components/Title";
import BackToTop from "../components/BackToTop";
import { updateTitle } from "../utils";

// #region styled-components
const StyledSection = styled.section`
  .video-card {
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.02);
    }
  }

  .video-thumbnail {
    height: 200px;
    object-fit: cover;
  }
`;
// #endregion

// #region component
const Videos = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function fetchVideos() {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_BASE_URL}/api/video/get_videos`
                );
                setVideos(response.data);
            } catch (error) {
                console.error("Failed to fetch videos:", error);
                setVideos([]);
            }
        }
        fetchVideos();
    }, []);

    useEffect(() => {
        updateTitle("ICS Videos");
    }, []);

    function getYouTubeVideoId(url) {
        try {
            const parsed = new URL(url);
            if (parsed.hostname === 'youtu.be') {
                return parsed.pathname.slice(1);
            } else if (
                parsed.hostname === 'www.youtube.com' ||
                parsed.hostname === 'youtube.com'
            ) {
                return parsed.searchParams.get('v');
            }
            return null;
        } catch (err) {
            console.error('Invalid YouTube URL:', err);
            return null;
        }
    }

    return (
        <>
            <main>
                <StyledSection className="d-flex flex-column justify-content-center">
                    <Container className="d-flex justify-content-center mb-3">
                        <Title size={"h2"} text={"ICS Videos"} />
                    </Container>

                    <Container>
                        <p className="text-center fs-5 text-muted mb-4">
                            In this series of labs, we explore the fundamentals of ICS
                            security, PLCs, and common attack vectors. More videos coming
                            soon.
                        </p>

                        <Row className="g-4">
                            {videos.map((video) => (
                                <Col key={video.id} xs={12} md={6} lg={4}>
                                    <Card className="video-card h-100">
                                        <Card.Img
                                            variant="top"
                                            src={`https://img.youtube.com/vi/${getYouTubeVideoId(video.url)}/sddefault.jpg`}
                                            alt={video.title}
                                            className="video-thumbnail"
                                        />
                                        <Card.Body>
                                            <Card.Title>{video.title}</Card.Title>
                                            <Card.Text>{video.subtitle}</Card.Text>
                                            <Link to={`/Resources/Videos/${video.id}`}>
                                                <Button variant="primary">Watch</Button>
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </StyledSection>
            </main>

            <BackToTop home={"Home"} />
        </>
    );
};
// #endregion

export default Videos;
