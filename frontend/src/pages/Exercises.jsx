
import React from "react";
import { Link } from "react-router-dom";
import { Container} from "react-bootstrap";

// Components
// import BackToTop from "../components/BackToTop";
import Title from "../components/Title";
import datasets from "../components/exercises";

// Utils
import { updateTitle } from "../utils";


function Exercises() {
    React.useEffect(() => {
    updateTitle("exercises | OTSec-Hub.io");
  }, []);
  return (
    <div>
      <Container className="text-center my-5">
        <Title size="h5" text="Exercises" />
      </Container>

      <div className="p-4 max-w-xl mx-auto">
        {/*<h1 className="text-xl font-bold mb-4">Datasets</h1>*/}
        {datasets.map(dataset => (
          <div key={dataset.id} className="mb-3 border rounded p-3 bg-gray-100">
            <h2 className="text-xl font-medium">{dataset.title}</h2>
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

