
import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

// Components
import Title from "../components/Title";
import { updateTitle } from "../utils";

// Fake data (for development)
const fakeDatasets = [
  {
    id: "communityBenchmark-1",
    title: "title 1",
    description: "Description",
  },
  {
    id: "communityBenchmark-2",
    title: "title 2",
    description: "...",
  },
];

function CommunityBenchmarks() {
  const [datasets, setDatasets] = React.useState([]);

  React.useEffect(() => {
    updateTitle("Community Benchmarks | OTSec-Hub.io");

    // Simulate an async fetch — replace this with actual fetch/axios call
    const fetchData = async () => {
      // Simulate delay
      await new Promise((res) => setTimeout(res, 500));
      setDatasets(fakeDatasets); // Will be replaced with real API response
    };

    fetchData();
  }, []);

  return (
    <div>
      <Container className="text-center my-5">
        <Title size="h2" text="Community Benchmark Datasets" />
      </Container>
        <Container className="mb-3">
      <p className="text-center fs-7 text-muted mb-4">
        Know a valuable dataset others should explore? Contribute it to the benchmarks section{" "}
        <Link to="/Resources/Benchmarks/Benchmark-Submission" className="text-primary fw-semibold text-decoration-none">
          here.
        </Link>
      </p>
        </Container>

      <div className="p-4 max-w-xl mx-auto">
        {datasets.map((dataset) => (
          <div key={dataset.id} className="mb-3 border rounded p-3 bg-gray-100">
            <h2 className="text-xl font-medium">{dataset.title}</h2>
            <p className="text-sm">{dataset.description}</p>
            <Link
              to={`/Community-Labs/${encodeURIComponent(dataset.id)}`}
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

export default CommunityBenchmarks;
