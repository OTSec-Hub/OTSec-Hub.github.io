// src/components/Footer.js
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import SocialLinks from "./SocialLinks";

const StyledFooter = styled.footer`
  background: var(--bs-primary);
  padding: 1rem 0;
  color: ${({ $mode }) => $mode?.toLowerCase() === "light" ? "var(--bs-light)" : "var(--bs-gray-dark)"};
  margin-top: auto; // Ensures footer stays at bottom
  
  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  a {
    color: inherit;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${({ $mode }) => $mode?.toLowerCase() === "light" ? "var(--bs-gray-dark)" : "var(--bs-light)"};
      transform: scale(1.1);
    }
  }
`;

const Footer = ({ mode }) => {
  return (
    <StyledFooter $mode={mode}>
      <div className="container">
        <div className="footer-content">
          <SocialLinks />
          <div className="copyright">
            &copy; {new Date().getFullYear()} OTSec-Hub
          </div>
        </div>
      </div>
    </StyledFooter>
  );
};

Footer.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default Footer;