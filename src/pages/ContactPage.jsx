// import React from "react";
// // Components

// import BackToTop from "../components/BackToTop";
// // Utils
// import { updateTitle } from "../utils";

// // Styles
// import { Container } from "react-bootstrap";
// import Title from "../components/Title";
// import SidebarBox from "../components/SidebarBox";

// import ContactForm from "./ContactForm";

// // #region styled-components
// const StyledSection = styled.section`
//   min-height: calc(100vh - var(--nav-height) - 2rem);
// `;
// // #endregion

// // #region component
// const Contact = () => {
//   return (
//     <Element name={"Contact"} id="contact">
//       <StyledSection className="d-flex flex-column justify-content-center">
//         <Container className="d-flex justify-content-center">
//           <Title size={"h2"} text={"Contact"} />
//         </Container>
//         <Container>
//           <ContactForm />
//         </Container>
//       </StyledSection>
//     </Element>
//   );
// };
// // #endregion

// export default Contact;

// pages/contact.js (if using Next.js) or src/pages/Contact.jsx for React SPA

import React, { useEffect } from "react";
import styled from "styled-components";
import { Element } from "react-scroll";
import { Container } from "react-bootstrap";

// Components
import BackToTop from "../components/BackToTop";
import Title from "../components/Title";
import ContactForm from "../components/ContactForm"; // moved to components if this is a true page file
import SidebarBox from "../components/SidebarBox";

// Utils
import { updateTitle } from "../utils";

// #region styled-components
const StyledSection = styled.section`
  min-height: calc(100vh - var(--nav-height) - 2rem);
`;
// #endregion

// #region component
const ContactPage = () => {
  useEffect(() => {
    updateTitle("Contact");
  }, []);

  return (
    <Element name="Contact" id="contact">
      <StyledSection className="d-flex flex-column justify-content-center">
        <Container className="d-flex justify-content-center">
          <Title size="h2" text="Contact Us!" />
        </Container>
        <Container>
          <ContactForm />
        </Container>
        <BackToTop />
      </StyledSection>
    </Element>
  );
};

export default ContactPage;
// #endregion
