//for state and import necessary hooks rom React Router
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

//import all the datasets for the benchmark page
import datasets from "./datasets";

//to display all the information for a single, selected dataset
function DatasetDetail() {
  const { datasetId } = useParams(); //get ID from URL parameters
  const navigate = useNavigate(); //hook to navigate back or to other routes

  const decodedId = decodeURIComponent(datasetId); //decode dataset ID
  const dataset = datasets.find(d => d.id === decodedId); //match to the dataset with the ID

  //show an error message if result not found
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

  //otherwise provide its details: title, description, link
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

//export dataset detail component
export default DatasetDetail;
