//import core library
import React, { useEffect, useState } from "react";
import { Container, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import BackToTop from "../components/BackToTop";
import Title from "../components/Title";
import { updateTitle } from "../utils";
import axios from "axios";

// --- Helper: extract YouTube ID ---
function getYouTubeVideoId(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1);
    } else if (
      parsed.hostname === "www.youtube.com" ||
      parsed.hostname === "youtube.com"
    ) {
      return parsed.searchParams.get("v");
    }
    return null;
  } catch (err) {
    return null;
  }
}

// --- Helper: return announcement description ---
function getAnnouncementDescription(type) {
  switch (type) {
    case "video":
      return "We have added an exciting new video to our OTSec-Hub platform, packed with insights and practical examples to enhance your learning experience.";
    case "lab":
      return "A brand new lab is now available for you to explore hands-on exercises and put your Operational Technology Security skills into practice.";
    case "exercise":
      return "Sharpen your skills with our newly added exercise, designed to challenge you and deepen your understanding of key concepts.";
    case "announcement":
      return "Check out the latest announcement from our team, keeping you updated on new resources, platform features, and important news.";
    default:
      return "New content has been added to OTSec-Hub. Make sure to check it out and stay up-to-date!";
  }
}


const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 6; // show 6 announcements per page

  useEffect(() => {
    updateTitle("Announcements | OTSec-Hub");  //Fix Title: Just OTSec-Hub
    fetchAnnouncements(page);
  }, [page]);


  const fetchAnnouncements = async (page) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/get_announcements`,
        {
          params: { page, limit: limit },
        }
      );
      setAnnouncements(res.data.items);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <main>
      <Container className="d-flex justify-content-center my-5">
        <Title size="h2" text="Announcements" />
      </Container>

      <Container>
        <div className="row justify-content-center">
          <div className="col-md-10">
            {announcements.map((a) => {
              let imageUrl = null;
              const paths = {
                lab: `/Resources/All-Labs/${a.content_id}`,
                video: `/Resources/Videos/${a.content_id}`,
                exercise: `/Resources/Exercises/${a.content_id}`,
              };

              if (a.content_type === "lab" && a.image) {
                imageUrl = a.image;
              } else if (a.content_type === "video" && a.image) {
                const vid = getYouTubeVideoId(a.image);
                if (vid)
                  imageUrl = `https://img.youtube.com/vi/${vid}/hqdefault.jpg`;
              }

              // Format created_at (only date)
              const createdAt = a.created_at
                ? new Date(a.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                : "";

              return (
                <div
                  key={a.id}
                  className="d-flex p-3 mb-4 border rounded"
                  style={{
                    transition: "0.2s ease",
                  }}
                >
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={a.title}
                      style={{
                        width: "150px",
                        height: "auto",
                        borderRadius: "8px",
                        marginRight: "20px",
                        flexShrink: 0,
                      }}
                    />
                  )}

                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <h5 className="mb-0 fw-semibold">{a.title}</h5>
                      <small className="text-secondary">Posted on {createdAt}</small>
                    </div>
                    <p className="text-muted mb-2" style={{ fontSize: "0.95rem" }}>
                      {getAnnouncementDescription(a.content_type)}
                    </p>

                    <Link
                      to={paths[a.content_type]}
                      className="btn btn-sm btn-success"
                    >
                      View {a.content_type}
                    </Link>


                  </div>
                </div>
              );
            })}

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                {[...Array(totalPages)].map((_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === page}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          </div>
        </div>
      </Container>

      <BackToTop home="Home" />
    </main>
  );
};

export default Announcements;
