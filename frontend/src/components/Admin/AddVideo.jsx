import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import axios from "axios";

export default function AddVideo() {
    const [open, setOpen] = React.useState(false);
    const [video, setVideo] = React.useState({
        title: "",
        subtitle: "",
        description: "",
        url: "",
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
        setVideo({ title: "", subtitle: "", description: "", url: "" });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVideo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/video/add_video`,
                {
                    title: video.title,
                    subtitle: video.subtitle,
                    description: video.description,
                    url: video.url,
                }
            );

            setSuccess(true);

            // setTimeout(() => {
            //     setVideo({ name: "", email: "", role: "educator" });
            //     setOpen(false);
            // }, 1500);
        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to add video"
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
                Video
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Video</DialogTitle>
                <DialogContent>
                    <>
                        <TextField
                            margin="dense"
                            name="url"
                            label="Video URL"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={video.url}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <TextField
                            margin="dense"
                            name="title"
                            label="Video Title"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={video.title}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <TextField
                            margin="dense"
                            name="subtitle"
                            label="Video Subtitle"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={video.subtitile}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <TextField
                            margin="dense"
                            name="description"
                            label="Video Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={video.description}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>
                        {success ? "Close" : "Cancel"}
                    </Button>
                    {!success && (
                        <Button
                            onClick={handleSubmit}
                            disabled={loading || !video.title || !video.url || !video.description || !video.subtitle}
                        >
                            {loading ? "Adding..." : "Add Video"}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
}
