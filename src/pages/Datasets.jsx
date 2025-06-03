import React from "react";
// Components

import BackToTop from "../components/BackToTop";
// Utils
import { updateTitle } from "../utils";

// Styles
import { Container } from "react-bootstrap";
import Title from "../components/Title";
import image from "../images/lab2pic.webp";

const Datasets = () => {
  React.useEffect(() => {
    updateTitle("datasets | OTSec-Hub.io");
  }, []);

  return (
    <>
      <main>
        <Container className="d-flex justify-content-center my-5">
          <Title size="h2" text="Datasets:" />
        </Container>

        <BackToTop home="Home" />
      </main>
    </>
  );
};

export default Datasets;