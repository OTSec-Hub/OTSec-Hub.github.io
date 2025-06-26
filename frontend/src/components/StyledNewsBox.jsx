// components/StyledNewsBox.js
import styled from "styled-components";

const StyledNewsBox = styled.div`
  .card {
    border: var(--border);
    background: ${({ theme }) =>
      theme.name === "light" ? "white" : "var(--bs-gray)"};
    color: ${({ theme }) =>
      theme.name === "light" ? "var(--bs-dark)" : "var(--bs-light)"};
    box-shadow: ${({ theme }) =>
      theme.name === "light"
        ? "0 3px 10px rgb(0 0 0 / 0.2)"
        : "0 3px 10px rgb(255 255 255 / 0.2)"};
    margin-bottom: 1.5rem;
    padding: 1.25rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease-in-out;
  }


.card-title {
position: relative;
font-weight: 600;
font-size: 1.25rem;
margin-bottom: 0.75rem;
color: inherit;

&::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px; // distance from text
  width: 70px; // <-- set underline length here
  height: 5px;
  background-color: var(--custom-blue); // use your custom color
}
}

  // .card-meta {
  //   font-size: 0.9rem;
  //   margin-bottom: 0.75rem;
  // }

  .card-meta {
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  font-style: italic;
}

  .card-text {
    font-size: 1rem;
  }
`;

export default StyledNewsBox;
