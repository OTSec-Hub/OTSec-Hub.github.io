import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import axios from 'axios';

const DeleteBtn = ({ videoId }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
    setError(null);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/video/delete_video/${videoId}`);
      setLoading(false);
      setOpen(false);
    } catch (err) {
      setLoading(false);
      setError('Failed to delete user.');
    }
  };

  return (
    <>
      <StyledWrapper>
        <button className="bin-button" onClick={handleClickOpen} aria-label="Delete User">
          <svg className="bin-top" viewBox="0 0 39 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1={5} x2={39} y2={5} stroke="white" strokeWidth={4} />
            <line x1={12} y1="1.5" x2="26.0357" y2="1.5" stroke="white" strokeWidth={3} />
          </svg>
          <svg className="bin-bottom" viewBox="0 0 33 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="path-1-inside-1" fill="white">
              <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" />
            </mask>
            <path d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z" fill="white" mask="url(#path-1-inside-1)" />
            <path d="M12 6L12 29" stroke="white" strokeWidth={4} />
            <path d="M21 6V29" stroke="white" strokeWidth={4} />
          </svg>
        </button>
      </StyledWrapper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          Are you sure you want to delete this video? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>Cancel</Button>
          <Button onClick={handleDelete} color="error" disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const StyledWrapper = styled.div`
  .bin-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 15px;
    background-color: rgb(216, 54, 54);
    cursor: pointer;
    transition-duration: 0.3s;
    border: none;
  }
  .bin-bottom {
    width: 15px;
  }
  .bin-top {
    width: 17px;
    transform-origin: right;
    transition-duration: 0.3s;
  }
  .bin-button:hover .bin-top {
    transform: rotate(45deg);
  }
  .bin-button:hover {
    background-color: rgb(255, 0, 0);
  }
  .bin-button:active {
    transform: scale(0.9);
  }
`;

export default DeleteBtn;
