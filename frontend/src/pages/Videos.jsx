import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// Components
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
    React.useEffect(() => {
        updateTitle("ICS Videos");
    }, []);

    const videos = [{
        id: 1,
        title: "ICS Security Lab 1",
        description:
            "An introductory lab on Industrial Control System (ICS) security, including PLC concepts and analysis.",
        url: "https://www.youtube.com/watch?v=P7ZCGY8fXOU",
        image: "https://img.youtube.com/vi/P7ZCGY8fXOU/maxresdefault.jpg",
    }, {
        id: 2,
        title: "ICS Security Lab 1",
        description:
            "An introductory lab on Industrial Control System (ICS) security, including PLC concepts and analysis.",
        url: "https://www.youtube.com/watch?v=P7ZCGY8fXOU",
        image: "https://img.youtube.com/vi/P7ZCGY8fXOU/maxresdefault.jpg",
    },
    {
        id: 3,
        title: "ICS Security Lab 1",
        description:
            "An introductory lab on Industrial Control System (ICS) security, including PLC concepts and analysis.",
        url: "https://www.youtube.com/watch?v=P7ZCGY8fXOU",
        image: "https://img.youtube.com/vi/P7ZCGY8fXOU/maxresdefault.jpg",
    },
    {
        id: 4,
        title: "ICS Security Lab 1",
        description:
            "An introductory lab on Industrial Control System (ICS) security, including PLC concepts and analysis.",
        url: "https://www.youtube.com/watch?v=P7ZCGY8fXOU",
        image: "https://img.youtube.com/vi/P7ZCGY8fXOU/maxresdefault.jpg",
    },
    ];

    return (
        <>
            <main>
                <StyledSection className="d-flex flex-column justify-content-center">
                    <Container className="d-flex justify-content-center mb-3">
                        <Title size={"h2"} text={"ICS Videos"} />
                    </Container>

                    <Container>
                        <p className="text-center fs-5 text-muted mb-4">
                            In this series of labs, we explore the fundamentals of ICS security, PLCs, and common attack vectors. More videos coming soon.
                        </p>

                        <Row className="g-4">
                            {videos.map((video) => (
                                <Col key={video.id} xs={12} md={6} lg={4}>
                                    <Card className="video-card h-100">
                                        <Card.Img
                                            variant="top"
                                            src={video.image}
                                            alt={video.title}
                                            className="video-thumbnail"
                                        />
                                        <Card.Body>
                                            <Card.Title>{video.title}</Card.Title>
                                            <Card.Text>{video.description}</Card.Text>
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
