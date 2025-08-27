import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Logo from "../images/logo.png";
import { Light, Dark } from "../config";
import { useErrorBoundary } from "react-error-boundary";

const StyledHero = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - var(--nav-height));
  padding: 1rem;

  /* Background image */
  &::before {
    content: "";
    position: absolute;
    inset: 0; /* top:0; left:0; right:0; bottom:0; */
    background: ${({ theme }) =>
      theme.name === "light"
        ? `url(${Light}) center center / cover no-repeat`
        : `url(${Dark}) center center / cover no-repeat`};
    z-index: -2;
  }

  /* Overlay for contrast */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ theme }) =>
      theme.name === "light"
        ? "rgba(255,255,255,0.2)"
        : "rgba(0,0,0,0.2)"};
    z-index: -1;
  }

  .hero-img {
    max-width: 90%;
    height: auto;
    width: clamp(150px, 30vw, 400px); /* responsive size */
  }
`;

const Hero = ({ name }) => {
  const { showBoundary } = useErrorBoundary();

  return (
    <StyledHero>
      <img src={Logo} alt="Hero Logo" className="hero-img" />
      {/* Hidden button for error boundary */}
      <button
        className="d-none"
        onClick={() =>
          showBoundary({ name: "Error", message: "Simulated error" })
        }
      >
        Error
      </button>
    </StyledHero>
  );
};

Hero.propTypes = {
  name: PropTypes.string,
};

export default Hero;
