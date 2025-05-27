// import React from "react";
// import PropTypes from "prop-types";
// import styled from "styled-components";
// import { Card } from "react-bootstrap";

// const StyledSidebarBox = styled.div`
//   .card {
//     background-color: #000;
//     border: 1px solid limegreen;
//     color: white;
//     margin-bottom: 1.5rem;
//     padding: 1rem;
//     border-radius: 0.375rem;

//     .card-title {
//       color: white;
//       font-weight: bold;
//     }

//     .card-text {
//       color: white;
//     }

//     a {
//       color: limegreen;
//       text-decoration: underline;
//     }
//   }
// `;

// const SidebarBox = ({ title, items }) => {
//   return (
//     <StyledSidebarBox>
//       <Card>
//         <Card.Body>
//           <Card.Title>{title}</Card.Title>
//           {items.map((item, index) => (
//             <Card.Text key={index}>
//               {item.link ? <a href={item.link}>{item.text}</a> : item.text}
//             </Card.Text>
//           ))}
//         </Card.Body>
//       </Card>
//     </StyledSidebarBox>
//   );
// };

// SidebarBox.propTypes = {
//   title: PropTypes.string.isRequired,
//   items: PropTypes.arrayOf(
//     PropTypes.shape({
//       text: PropTypes.string.isRequired,
//       link: PropTypes.string, // optional
//     })
//   ).isRequired,
// };

// export default SidebarBox;

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Card } from "react-bootstrap";

const StyledSidebarBox = styled.div`
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
    padding: 1rem;
    border-radius: 0.375rem;
    transition: all 0.2s ease-in-out;

    .card-title {
      font-weight: bold;
      color: ${({ theme }) =>
        theme.name === "light" ? "var(--bs-dark)" : "var(--bs-light)"};
      margin-bottom: 0.75rem;
    }

    .card-text {
      color: ${({ theme }) =>
        theme.name === "light" ? "var(--bs-dark)" : "var(--bs-light)"};
      margin-bottom: 0.5rem;
    }
  }
`;

const SidebarBox = ({ title, items }) => {
  return (
    <StyledSidebarBox>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          {items.map((item, index) => (
            <Card.Text key={index}>
              {item.link ? <a href={item.link}>{item.text}</a> : item.text}
            </Card.Text>
          ))}
        </Card.Body>
      </Card>
    </StyledSidebarBox>
  );
};

SidebarBox.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      link: PropTypes.string, // optional
    })
  ).isRequired,
};


export default SidebarBox;

