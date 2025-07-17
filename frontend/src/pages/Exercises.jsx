
import React from "react";
import { Link } from "react-router-dom";
import { Container} from "react-bootstrap";

// Components
// import BackToTop from "../components/BackToTop";
import Title from "../components/Title";
import datasets from "../components/exercises";

// Utils
import { updateTitle } from "../utils";
import { InputGroup, FormControl } from "react-bootstrap";
import { Icon } from "@iconify/react";


function Exercises() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredDatasets = datasets.filter(dataset =>
    dataset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dataset.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
    React.useEffect(() => {
    updateTitle("exercises | OTSec-Hub.io");
  }, []);
  return (
    <div>
      <Container className="text-center my-5">
        <Title size="h5" text="Exercises" />
      </Container>

      <Container>
        <p className="text-center fs-5 text-muted mb-4">These tabletop exercises are designed to build familiarity with ICS and OT security challenges, threat actor tactics, and incident response strategies across industrial environments. Some scenarios will introduce emerging threat vectors, such as AI-enabled attacks and novel exploitation techniques—that reflect the evolving technological landscape and its potential impact on critical infrastructure.</p>
        <p className="text-center fs-7 text-muted mb-4">
            Want to contribute to the community? Submit your tabletop exercise{" "}
        <Link to="/Resources/Exercises/Exercise-Submission" className="text-primary fw-semibold text-decoration-none">
        here.
        </Link>
        </p>
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

      <div className="p-4 max-w-xl mx-auto">
        {filteredDatasets.map(dataset => (
          <div key={dataset.id} className="mb-3 border rounded p-3 bg-gray-100">
            <h2 className="text-xl font-medium">{dataset.title}</h2>
            <p>{dataset.description}</p>
            <Link
              to={`/Exercises/${encodeURIComponent(dataset.link)}`}
              className="text-blue-600 underline text-sm mt-1 inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Exercises;

