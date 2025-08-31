
import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

// Components
// import BackToTop from "../components/BackToTop";
import Title from "../components/Title";

// Utils
import { updateTitle } from "../utils";
import { InputGroup, FormControl } from "react-bootstrap";
import { Icon } from "@iconify/react";
import axios from "axios";


function Exercises() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [exercises, setExercises] = React.useState([]);

  React.useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/get_exercises`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setExercises(response.data);
      } catch (error) {
        setExercises([])
      }
    }
    fetchExercises();
  }, [])

  const filteredDatasets = exercises.filter(exercise =>
    exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  React.useEffect(() => {
    updateTitle("exercises | OTSec-Hub.io");
  }, []);

  return (
    <div>
      <Container className="d-flex justify-content-center mt-3">
        <Title size="h2" text="Exercises" />
      </Container>

      <Container>
        <p className="text-center fs-5 text-muted mb-4">These tabletop exercises build familiarity with ICS/OT security challenges, threat tactics, and incident response. Some scenarios cover emerging threats like AI-enabled attacks and novel exploitation techniques that impact critical infrastructure.</p>
      </Container>

      <Container className="mb-4 d-flex justify-content-center">
        <InputGroup style={{ maxWidth: "995px" }}>
          <InputGroup.Text id="search">
            <Icon icon="ic:round-search" />
          </InputGroup.Text>
          <FormControl
            placeholder="Search exercises by title or description"
            aria-label="Search exercises"
            aria-describedby="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </Container>
      <Container>

        <div className="p-4 max-w-xl mx-auto">
          {loading ? (
            <Container className="d-flex justify-content-center my-5">
              <Loading />
            </Container>
          ) : (
            filteredDatasets.map((exercise) => (
              <div key={exercise.id} className="mb-3 border rounded p-3 bg-gray-100">
                <h2 className="text-xl font-medium">{exercise.title}</h2>
                <p>{exercise.subtitle}</p>
                <Link
                  to={`/Resources/Exercises/${exercise.id}`}
                  className="text-blue-600 underline text-sm mt-1 inline-block"
                >
                  View Details
                </Link>
              </div>
            ))
          )}
        </div>

      </Container>
    </div>
  );
}

export default Exercises;

