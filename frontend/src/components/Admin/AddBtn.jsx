import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import axios from "axios";

export default function AddBtn({ onAddEducator }) {
  const [open, setOpen] = React.useState(false);
  const [educatorData, setEducatorData] = React.useState({
    name: "",
    email: "",
    role: "educator",
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setError(null);
    setSuccess(false);
  };

  const handleClose = () => {
    setOpen(false);
    setEducatorData({ name: "", email: "", role: "educator" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducatorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/educators/add_educator`,
        {
          email: educatorData.email,
          name: educatorData.name,
          redirectUrl: `${window.location.origin}/#/verify-email`,
        }
      );

      setSuccess(true);
      onAddEducator({
        ...educatorData,
        verificationSent: true,
        verificationToken: response.data.token,
      });

      setTimeout(() => {
        setEducatorData({ name: "", email: "", role: "educator" });
        setOpen(false);
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send verification email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="black"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        sx={{ mt: 2, mb: 2 }}
      >
        Educator
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Educator</DialogTitle>
        <DialogContent>
          <>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Full Name"
              type="text"
              fullWidth
              variant="standard"
              value={educatorData.name}
              onChange={handleChange}
              disabled={loading}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={educatorData.email}
              onChange={handleChange}
              disabled={loading}
            />
            {success ? (
              <div
                style={{
                  paddingTop: "20px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  textAlign: "center",
                  color: "#28a745",
                }}
              >
                <p style={{margin: "0"}}>
                  Verification email sent successfully to {educatorData.email}
                </p>
              </div>
            ) : (
              <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            )}
          </>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            {success ? "Close" : "Cancel"}
          </Button>
          {!success && (
            <Button
              onClick={handleSubmit}
              disabled={loading || !educatorData.email || !educatorData.name}
            >
              {loading ? "Sending..." : "Send Verification Mail"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
