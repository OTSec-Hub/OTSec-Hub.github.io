import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import datasets from "./datasets";

function DatasetDetail() {
  const { datasetId } = useParams();
  const navigate = useNavigate();

  const decodedId = decodeURIComponent(datasetId);
  const dataset = datasets.find(d => d.id === decodedId);

  if (!dataset) {
    return (
      <div className="p-4">
        <p>Dataset not found.</p>
        <button onClick={() => navigate(-1)} className="text-blue-600 underline">
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 underline mb-3"
      >
        ← Back to all datasets
      </button>

      <h1 className="text-2xl font-bold">{dataset.title}</h1>
      <p className="mt-2">{dataset.description}</p>
      <a
        href={dataset.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline block mt-2"
      >
        Visit Resource
      </a>
    </div>
  );
}

export default DatasetDetail;
