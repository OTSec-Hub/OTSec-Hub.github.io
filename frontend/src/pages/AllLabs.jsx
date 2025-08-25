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
  Card
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import Title from "../components/Title";
import BackToTop from "../components/BackToTop";
import Loading from "../components/Loading";
import { updateTitle } from "../utils";

// Styled section
const StyledSection = styled.section`
  .input-group {
    max-width: 90vw;
  }

  @media screen and (min-width: 800px) {
    .input-group {
      width: 75%;
    }
  }

  .pagination {
    justify-content: center;
  }

  .pagination .page-item .page-link {
    color: #28a745;
    background-color: #222;
    border-color: #444;
  }

  .pagination .page-item.active .page-link {
    background-color: #28a745;
    border-color: #28a745;
    color: #222;
  }

  .pagination .page-item.disabled .page-link {
    color: #666;
    background-color: #222;
    border-color: #444;
  }
`;

const AllLabs = () => {
  const [labs, setLabs] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const labsPerPage = 9;

  // Fetch labs with server-side pagination and search
  const getLabs = async (page = 1, search = "") => {
    updateTitle("All Labs");
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/get_labs`, {
        params: { page, limit: labsPerPage, search }
      });
      setLabs(response.data.items || []);
      setTotalPages(Math.ceil(response.data.total / labsPerPage));
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch labs", err);
      setError("Failed to fetch labs.");
      setLoading(false);
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    getLabs(activePage, searchInput);
  }, [activePage, searchInput]);

  // Reset page when searching
  useEffect(() => {
    setActivePage(1);
  }, [searchInput]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Title size={"h2"} text={"ICS Labs"} />
        <Loading />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <h2>{error}</h2>
      </Container>
    );
  }

  return (
    <>
      <main>
        <StyledSection className="d-flex flex-column justify-content-center">
          <Container className="d-flex justify-content-center">
            <Title size={"h2"} text={"ICS Labs"} />
          </Container>

          <Container className="mb-3">
            <p className="text-center fs-5 text-muted">
              Industrial Control Systems (ICS) are of paramount importance nowadays...
            </p>
            <p className="text-center fs-7 text-muted mb-4">
              Built a hands-on lab others can learn from? Share it with the community{" "}
              <Link to="/Resources/All-Labs/Lab-Submission" className="text-primary fw-semibold text-decoration-none">
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
                placeholder="Lab name"
                aria-label="Search labs"
                aria-describedby="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </InputGroup>

            {labs.length === 0 ? (
              <Container className="text-center mt-5">
                <h4>No labs found matching your search.</h4>
              </Container>
            ) : (
              <>
                <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
                  {labs.map((lab) => (
                    <Col key={lab.id} className="d-flex justify-content-center">
                      <Card className="text-center h-100 d-flex flex-column align-items-center justify-content-center p-3 shadow bg-secondary" style={{ width: "18rem" }}>
                        <Card.Img
                          variant="top"
                          src={lab.lab_img || "/default-lab.jpg"}
                          alt={lab.title}
                          style={{
                            width: "80%",
                            height: "80%",
                            objectFit: "cover",
                            borderRadius: "0.5rem"
                          }}
                        />
                        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                          <Card.Title className="w-100">{lab?.title?.trim() || "Explore this lab"}</Card.Title>
                          <Link to={`/Resources/All-Labs/${lab.id}`} className="btn btn-primary mt-2">
                            Explore
                          </Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>

                {totalPages > 1 && (
                  <Container className="d-flex justify-content-center mt-5">
                    <Pagination>
                      <Pagination.Prev
                        onClick={() => setActivePage(prev => (prev === 1 ? totalPages : prev - 1))}
                        disabled={activePage === 1}
                      />
                      {Array.from({ length: totalPages }, (_, i) => (
                        <Pagination.Item
                          key={i + 1}
                          active={i + 1 === activePage}
                          onClick={() => setActivePage(i + 1)}
                        >
                          {i + 1}
                        </Pagination.Item>
                      ))}
                      <Pagination.Next
                        onClick={() => setActivePage(prev => (prev === totalPages ? 1 : prev + 1))}
                        disabled={activePage === totalPages}
                      />
                    </Pagination>
                  </Container>
                )}
              </>
            )}
          </Container>
        </StyledSection>
      </main>
      <BackToTop home={"Home"} />
    </>
  );
};

export default AllLabs;