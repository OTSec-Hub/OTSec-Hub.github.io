import React, { useEffect } from "react";
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
import ProjectCard from "../components/ProjectCard";
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
`;

const AllLabs = () => {
  const [labs, setLabs] = React.useState([]);
  const [filteredResults, setFilteredResults] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState("");
  const [activePage, setActivePage] = React.useState(1);
  const [pageItems, setPageItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const labsPerPage = 9;

  useEffect(() => {
    async function getLabs() {
      updateTitle("All Labs");
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/get_labs`)
        setLabs(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch labs", err);
        setError("Failed to fetch labs.");
        setLoading(false);
      };
    }
    getLabs()
  }, []);

  React.useEffect(() => {
    const data = labs.filter((lab) =>
      lab.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    const totalPages = Math.ceil(data.length / labsPerPage);
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

    const start = (activePage - 1) * labsPerPage;
    const end = start + labsPerPage;
    setFilteredResults(data.slice(start, end));
  }, [labs, searchInput, activePage]);
  // console.log(labs);

  React.useEffect(() => {
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
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </InputGroup>

            <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
              {filteredResults.map((lab) => (
                <Col key={lab.id} className="d-flex justify-content-center">
                  <Card className="text-center h-100 d-flex flex-column align-items-center justify-content-center p-3 shadow bg-secondary" style={{ width: "18rem" }}>
                    <div className="w-100">
                      <Card.Img
                        variant="top"
                        src={lab.lab_img || "/default-lab.jpg"}
                        alt={lab.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "0.5rem"
                        }}
                      />
                    </div>
                    <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                      <Card.Title className=" w-100">{lab?.title?.trim() || "Explore this lab"}</Card.Title>
                      <Link to={`/Resources/All-Labs/${lab.id}`} className="btn btn-primary mt-2">
                        Explore
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
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

export default AllLabs;
