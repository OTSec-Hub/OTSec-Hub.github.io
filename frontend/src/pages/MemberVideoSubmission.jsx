// import React, { useState } from "react";

// const VideoSubmissionPage = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     subtitle: "",
//     youtubeUrl: "",
//     description: "",
//     submissionReason: "",
//     relevance: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: Send to backend API
//     console.log("Submitted:", formData);
//     alert("Video submission saved (pending backend integration).");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
//      {/* <div className="max-w-3xl mx-auto bg-gray shadow-md rounded-xl p-8"> */}
//      <div className="max-w-3xl mx-auto bg-gray shadow-md rounded-xl p-8">
//         <h1 className="text-2xl font-semibold mb-6">Submit a Video for Review</h1>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Video Title *</label>
//             <input
//               type="text"
//               name="title"
//               required
//               className="mt-1 block w-full border rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               value={formData.title}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Subtitle</label>
//             <input
//               type="text"
//               name="subtitle"
//               className="mt-1 block w-full border rounded-md p-2 shadow-sm"
//               value={formData.subtitle}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">YouTube URL *</label>
//             <input
//               type="url"
//               name="youtubeUrl"
//               required
//               pattern="https?://(www\.)?(youtube\.com|youtu\.be)/.+"
//               className="mt-1 block w-full border rounded-md p-2 shadow-sm"
//               value={formData.youtubeUrl}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Video Description *</label>
//             <textarea
//               name="description"
//               required
//               rows="3"
//               className="mt-1 block w-full border rounded-md p-2 shadow-sm"
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Why are you submitting this video? *
//             </label>
//             <textarea
//               name="submissionReason"
//               required
//               rows="3"
//               className="mt-1 block w-full border rounded-md p-2 shadow-sm"
//               value={formData.submissionReason}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               How is this video relevant to OT security? *
//             </label>
//             <textarea
//               name="relevance"
//               required
//               rows="3"
//               className="mt-1 block w-full border rounded-md p-2 shadow-sm"
//               value={formData.relevance}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="pt-4">
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 shadow"
//             >
//               Submit Video
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VideoSubmissionPage;


import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Add this import at the top

const VideoSubmissionPage = () => {
  const navigate = useNavigate(); // Use navigate for back button
  const [hover, setHover] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    youtubeUrl: "",
    description: "",
    relevance: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    alert("Video submission saved.");
  };

  return (
    <Container className="py-5" style={{ maxWidth: "900px" }}>
        {/* <div className="d-flex align-items-center justify-content-between mb-4">
        <Button
          onClick={() => navigate(-1)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            backgroundColor: hover ? "lightgray" : "var(--custom-blue)",
            borderColor: hover ? "lightgray" : "var(--custom-blue)",
            color: hover ? "black" : "white",
            transition: "background-color 0.2s ease",
          }}
        >
          ← Back
        </Button>
        <h1 className="mb-0 text-center flex-grow-1">Submit Your Video!</h1>
        </div> */}
<div className="row align-items-center mb-4">
  <div className="col-auto">
    <Button
      onClick={() => navigate(-1)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor: hover ? "lightgray" : "var(--custom-blue)",
        borderColor: hover ? "lightgray" : "var(--custom-blue)",
        color: hover ? "black" : "white",
        transition: "background-color 0.2s ease",
      }}
    >
      ← Back
    </Button>
  </div>
  <div className="col text-center" style={{ marginLeft: "-65px" }}>
    <h1 className="mb-0">Submit Your Video!</h1>
  </div>
  <div className="col-auto" /> {/*Empty col to balance the row*/}
</div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Video Title *</Form.Label>
          <Form.Control
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter video title"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSubtitle">
          <Form.Label>Subtitle</Form.Label>
          <Form.Control
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="Enter subtitle"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formYoutubeUrl">
          <Form.Label>YouTube URL *</Form.Label>
          <Form.Control
            type="url"
            name="youtubeUrl"
            required
            pattern="https?://(www\.)?(youtube\.com|youtu\.be)/.+"
            value={formData.youtubeUrl}
            onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Video Description *</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            placeholder="Briefly describe the video"
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formRelevance">
          <Form.Label>How is this video relevant to OT security? *</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="relevance"
            required
            value={formData.relevance}
            onChange={handleChange}
            placeholder="Explain the OT security relevance"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Submit Video
        </Button>
      </Form>
    </Container>
  );
};

export default VideoSubmissionPage;

