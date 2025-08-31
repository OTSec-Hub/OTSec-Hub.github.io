import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Container,
  Row,
  Col,
  FormControl,
  InputGroup,
  Pagination,
  Card,
  Button
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import Title from "../components/Title";
import BackToTop from "../components/BackToTop";
import Loading from "../components/Loading";
import { updateTitle } from "../utils";

const StyledSection = styled.section`
  .input-group {
    max-width: 90vw;
  }
  @media screen and (min-width: 800px) {
    .input-group {
      width: 75%;
    }
  }
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

const AllCommunityVideos = () => {
  const [videos, setVideos] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [pageItems, setPageItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const videosPerPage = 9;

  useEffect(() => {
    async function getVideos() {
      updateTitle("Community Videos | OTSec-Hub.io");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/get_communityVideos`
        );
        setVideos(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch videos.");
        setLoading(false);
      }
    }
    getVideos();
  }, []);

  useEffect(() => {
    const data = videos
      .filter(video => video.status?.toLowerCase() === "approved")
      .filter(video =>
        video.title?.toLowerCase().includes(searchInput.toLowerCase())
      );

    const totalPages = Math.ceil(data.length / videosPerPage);
    const tempPageItems = [];

    for (let i = 1; i <= totalPages; i++) {
      tempPageItems.push(
        <Pagination.Item
          key={i}
          active={i === activePage}
          onClick={() => setActivePage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    setPageItems(tempPageItems);

    const start = (activePage - 1) * videosPerPage;
    const end = start + videosPerPage;
    setFilteredResults(data.slice(start, end));
  }, [videos, searchInput, activePage]);

  useEffect(() => {
    setActivePage(1);
  }, [searchInput]);

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
          <Container className="d-flex justify-content-center">
            <Title size="h2" text="Community Videos" />
          </Container>

          <Container className="mb-3">
            <p className="text-center fs-5 text-muted mb-4">
              Watch videos shared by members of the OTSec-Hub community, covering a wide range of topics in ICS and OT security. These peer-created resources offer insights into real-world scenarios, technical walkthroughs, and educational content to help you deepen your understanding of securing industrial systems.
            </p>
            <p className="text-center fs-7 text-muted mb-4">
              Want to contribute to the community? Submit your tabletop video{" "}
              <Link
                to="/Resources/Videos/Video-Submission"
                className="text-primary fw-semibold text-decoration-none"
              >
                here.
              </Link>
            </p>
          </Container>

          <Container>
            <InputGroup className="mx-auto mb-3">
              <InputGroup.Text id="search">
                <Icon icon="ic:round-search" />
              </InputGroup.Text>
              <FormControl
                placeholder="Video name"
                aria-label="Search videos"
                aria-describedby="search"
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </InputGroup>

            <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
              {loading ? (
                <Container className="d-flex justify-content-center my-5">
                  <Loading />
                </Container>
              ) : (
                filteredResults.map((video) => (
                  <Col key={video.id} className="d-flex justify-content-center">
                    <Card className="video-card h-100">
                      <Card.Img
                        variant="top"
                        src={`https://img.youtube.com/vi/${getYouTubeVideoId(video.url)}/sddefault.jpg`}
                        alt={video.title}
                        className="video-thumbnail"
                      />
                      <Card.Body>
                        <Card.Title>{video.title}</Card.Title>
                        {video.subtitle && (
                          <Card.Text className="m-0">{video.subtitle}</Card.Text>
                        )}
                        <small className="text-muted fst-italic mb-2">
                          By {video.user_name}
                        </small>
                        <br />
                        <Link to={`/Community/Community-Videos/${video.id}`}>
                          <Button className="mt-3" variant="primary">
                            Watch
                          </Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )}
            </Row>


            {pageItems.length > 1 && (
              <Container className="d-flex justify-content-center mt-5">
                <Pagination>
                  <Pagination.Prev
                    onClick={() =>
                      setActivePage((prev) =>
                        prev === 1 ? pageItems.length : prev - 1
                      )
                    }
                  />
                  {pageItems}
                  <Pagination.Next
                    onClick={() =>
                      setActivePage((prev) =>
                        prev === pageItems.length ? 1 : prev + 1
                      )
                    }
                  />
                </Pagination>
              </Container>
            )}
          </Container>
        </StyledSection>
      </main>
      <BackToTop home={"Home"} />
    </>
  );
};

export default AllCommunityVideos;
