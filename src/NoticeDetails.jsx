import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import client from "./contentful";

function NoticeDetails() {
  const { id } = useParams();

  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.getEntry(id)
      .then((response) => {
        setNotice(response.fields);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2>Loading...</h2>;

  if (!notice) return <h2>Notice not found</h2>;

  return (
    <div className="details-page">
      {notice.image && (
        <img
          src={`https:${notice.image.fields.file.url}`}
          alt={notice.title}
          className="notice-image"
        />
      )}

      <div className="details-content">
        <h1>{notice.title}</h1>

        <p>
          <strong>Category:</strong> {notice.category}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {new Date(notice.date).toLocaleDateString()}
        </p>

        <p>{notice.description}</p>

        <Link to="/">
          <button className="back-btn">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NoticeDetails;