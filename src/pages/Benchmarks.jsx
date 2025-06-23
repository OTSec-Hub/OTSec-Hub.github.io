
import React from "react";

//routing and layout tools
import { Link } from "react-router-dom";
import { Container} from "react-bootstrap";

// Components
// import BackToTop from "../components/BackToTop";
import Title from "../components/Title";

// Utils
import { updateTitle } from "../utils";

// Dataset information
import datasets from "../components/datasets";

//benchmarks page
function Benchmarks() {
  // Set the browser tab title when the component mounts
    React.useEffect(() => {
    updateTitle("benchmarks | OTSec-Hub.io");
  }, []);
  return (
    <div>
      <Container className="text-center my-5">
        <Title size="h2" text="Benchmarks" />
      </Container>

      {/* Main content: loop through and display all datasets */}
      <div className="p-4 max-w-xl mx-auto">
        {/*<h1 className="text-xl font-bold mb-4">Datasets</h1>*/}
        {datasets.map(dataset => (
          <div key={dataset.id} className="mb-3 border rounded p-3 bg-gray-100">
            <h2 className="text-xl font-medium">{dataset.title}</h2> {/* Dataset title */}
            <p className="text-sm">{dataset.description}</p> {/* Dataset description */}
           {/* Link to view dataset details, with encoded ID in URL */}
            <Link
              to={`/benchmarks/${encodeURIComponent(dataset.id)}`}
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

export default Benchmarks;

