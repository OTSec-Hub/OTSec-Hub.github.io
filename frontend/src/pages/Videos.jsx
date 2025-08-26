import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Title from "../components/Title";
import BackToTop from "../components/BackToTop";
import { updateTitle } from "../utils";
import { InputGroup, FormControl } from "react-bootstrap";
import { Icon } from "@iconify/react";


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
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        async function fetchVideos() {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_BASE_URL}/api/get_videos`
                );
                setVideos(response.data);
            } catch (error) {
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
                            In this series of videos, we explore the fundamentals of ICS
                            security, PLCs, and common attack vectors. More videos coming
                            soon.
                        </p>
                        <p className="text-center fs-7 text-muted mb-4">
                            Want to contribute to the community? If you have a video related to OT/ICS security, you can{" "}
                        <Link to="/Resources/Videos/Video-Submission" className="text-primary fw-semibold text-decoration-none">
                        submit your own here
                        </Link>
                        </p>
                    </Container>
                    <Container className="d-flex justify-content-center mb-4">
                    <InputGroup className="mx-auto">
                        <InputGroup.Text id="search">
                        <Icon icon="ic:round-search" />
                        </InputGroup.Text>
                        <FormControl
                        placeholder="Search videos by title"
                        aria-label="Search videos"
                        aria-describedby="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.currentTarget.value)}
                        />
                    </InputGroup>
                    </Container>
                    <Container>
                        <Row className="g-4">
                            {videos
                            .filter((video) =>
                                video.title.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((video) => (
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
