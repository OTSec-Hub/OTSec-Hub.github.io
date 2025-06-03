// import React from "react";
// import { Link } from "react-router-dom";
// import { Container } from "react-bootstrap";

// // Components
// import BackToTop from "../components/BackToTop";
// import Title from "../components/Title";

// // Utils
// import { updateTitle } from "../utils";

// // Data
// import datasets from "../components/datasets";

// const Benchmarks = () => {
//   React.useEffect(() => {
//     updateTitle("benchmarks | OTSec-Hub.io");
//   }, []);

//   return (
//     <>
//       <main>
//         <Container className="d-flex justify-content-center my-5">
//           <Title size="h2" text="Benchmarks" />
//         </Container>
//         <Container>
//           <div className="row">
//             <div className="col-md-7 offset-md-0" style={{ marginLeft: "5%" }}>
//               <section>
//                 {datasets.map((dataset) => (
//                   <div key={dataset.id} className="mb-4">
//                     <h4>
//                       <Link to={dataset.link}>{dataset.title}</Link>
//                     </h4>
//                     <p>{dataset.description}</p>
//                   </div>
//                 ))}
//               </section>
//             </div>
//           </div>
//         </Container>
//         <BackToTop home="Home" />
//       </main>
//     </>
//   );
// };

// export default Benchmarks;

import React from "react";
import { Link } from "react-router-dom";
import { Container, Card, Row, Col } from "react-bootstrap";

// Components
import BackToTop from "../components/BackToTop";
import Title from "../components/Title";

// Utils
import { updateTitle } from "../utils";

// Data
import datasets from "../components/datasets";

const Benchmarks = () => {
  React.useEffect(() => {
    updateTitle("benchmarks | OTSec-Hub.io");
  }, []);

  return (
    <>
      <main>
        <Container className="text-center my-5">
          <Title size="h2" text="Benchmarks" />
        </Container>

        <Container className="pb-5">
          <Row className="justify-content-center">
            {datasets.map((dataset) => (
              <Col key={dataset.id} xs={12} md={6} lg={5} className="mb-4">
                <Card className="h-100 shadow-sm rounded-4">
                  <Card.Body>
                    <Card.Title as="h5" className="mb-3">
                      <Link
                        to={dataset.link}
                        style={{
                          textDecoration: "none",
                          color: "var(--custom-blue)",
                        }}
                      >
                        {dataset.title}
                      </Link>
                    </Card.Title>
                    <Card.Text>{dataset.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>

        <BackToTop home="Home" />
      </main>
    </>
  );
};

export default Benchmarks;

