
import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

// Components
import Title from "../components/Title";
import { updateTitle } from "../utils";


function CommunityVideos() {
//   const [datasets, setDatasets] = React.useState([]);

//   React.useEffect(() => {
//     updateTitle("Community Videos | OTSec-Hub.io");

//     // Simulate an async fetch — replace this with actual fetch/axios call
//     const fetchData = async () => {
//       // Simulate delay
//       await new Promise((res) => setTimeout(res, 500));
//       setDatasets(fakeDatasets); // Will be replaced with real API response
//     };

//     fetchData();
//   }, []);

  return (
    <div>
      <Container className="text-center my-5">
        <Title size="h2" text="Community Videos" />
      </Container>
        <Container className="mb-3">
            <p className="text-center fs-5 text-muted mb-4">
            Watch videos shared by members of the OTSec-Hub community, covering a wide range of topics in ICS and OT security. These peer-created resources offer insights into real-world scenarios, technical walkthroughs, and educational content to help you deepen your understanding of securing industrial systems.
            </p>
            <p className="text-center fs-7 text-muted mb-4">
                Want to contribute to the community? Submit your tabletop video{" "}
            <Link to="/Resources/Videos/Video-Submission" className="text-primary fw-semibold text-decoration-none">
            here.
            </Link>
            </p>
        </Container>

    </div>
  );
}

export default CommunityVideos;
