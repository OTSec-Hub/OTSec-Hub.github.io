
import React from "react";
import { Link } from "react-router-dom";
import { Container} from "react-bootstrap";

// Components
// import BackToTop from "../components/BackToTop";
import Title from "../components/Title";

// Utils
import { updateTitle } from "../utils";

// Data
import datasets from "../components/datasets";

// const Benchmarks = () => {
//   React.useEffect(() => {
//     updateTitle("benchmarks | OTSec-Hub.io");
//   }, []);

//   return (
//     <>
//       <main>
//         <Container className="text-center my-5">
//           <Title size="h2" text="Benchmarks" />
//         </Container>

//         <Container className="pb-5">
//           <Row className="justify-content-center">
//             {datasets.map((dataset) => (
//               <Col key={dataset.id} xs={12} md={6} lg={5} className="mb-4">
//                 <Card className="h-100 shadow-sm rounded-4">
//                   <Card.Body>
//                     <Card.Title as="h5" className="mb-3">
//                       <Link
//                         to={dataset.link}
//                         style={{
//                           textDecoration: "none",
//                           color: "var(--custom-blue)",
//                         }}
//                       >
//                         {dataset.title}
//                       </Link>
//                     </Card.Title>
//                     <Card.Text>{dataset.description}</Card.Text>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </Container>

//         <BackToTop home="Home" />
//       </main>
//     </>
//   );
// };

// export default Benchmarks;



function Benchmarks() {
    React.useEffect(() => {
    updateTitle("benchmarks | OTSec-Hub.io");
  }, []);
  return (
    <div>
      <Container className="text-center my-5">
        <Title size="h2" text="Benchmarks" />
      </Container>
      <container className="mb-3">
      <p className="text-center fs-7 text-muted mb-4">
        Know a valuable dataset others should explore? Contribute it to the benchmarks section{" "}
        <Link to="/Resources/Benchmarks/Benchmark-Submission" className="text-primary fw-semibold text-decoration-none">
          here.
        </Link>
      </p>
      </container>
      <div className="p-4 max-w-xl mx-auto">
        {/*<h1 className="text-xl font-bold mb-4">Datasets</h1>*/}
        {datasets.map(dataset => (
          <div key={dataset.id} className="mb-3 border rounded p-3 bg-gray-100">
            <h2 className="text-xl font-medium">{dataset.title}</h2>
            <p className="text-sm">{dataset.description}</p>
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

