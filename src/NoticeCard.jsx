import { Link } from "react-router-dom";

function NoticeCard({ notice }) {
  console.log(
    notice.title,
    notice.image?.fields?.file?.url
  );

  const imageUrl = notice.image?.fields?.file?.url
    ? `https:${notice.image.fields.file.url}`
    : "https://via.placeholder.com/800x400?text=No+Image";

  return (
    <div className="card">
      <img
        src={imageUrl}
        alt={notice.title}
        className="notice-image"
      />

      <div className="card-content">
        <h3>{notice.title}</h3>

        <span
          className={`category ${notice.category?.toLowerCase()}`}
        >
          {notice.category}
        </span>

        <p className="date">
          {new Date(notice.date).toLocaleDateString()}
        </p>

        <p className="description">
          {notice.description}
        </p>

        <Link to={`/notice/${notice.id}`}>
          <button className="view-btn">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NoticeCard;