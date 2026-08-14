import { useEffect, useState } from "react";
import client from "./contentful";
import NoticeCard from "./NoticeCard";

function Home() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    client
      .getEntries({
        content_type: "notice",
      })
      .then((response) => {
        setNotices(response.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Contentful Error:", error);
        setLoading(false);
      });
  }, []);

  const filteredNotices = notices
    .filter((notice) =>
      notice.fields.title
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return (
          new Date(b.fields.date) -
          new Date(a.fields.date)
        );
      }

      return (
        new Date(a.fields.date) -
        new Date(b.fields.date)
      );
    });

  if (loading) {
    return (
      <div className="container">
        <h2>Loading notices...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="heading">📢 Team Notice Board</h1>

      <p className="subtitle">
        Stay updated with company announcements,
        meetings and training sessions.
      </p>

      <input
        type="text"
        placeholder="Search notices..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="sort-select"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>

      <div className="stats-container">
        <div className="stat-card">
          <h2>{notices.length}</h2>
          <p>Total Notices</p>
        </div>

        <div className="stat-card">
          <h2>
            {
              notices.filter(
                (n) => n.fields.category === "Meeting"
              ).length
            }
          </h2>
          <p>Meetings</p>
        </div>

        <div className="stat-card">
          <h2>
            {
              notices.filter(
                (n) => n.fields.category === "Holiday"
              ).length
            }
          </h2>
          <p>Holidays</p>
        </div>

        <div className="stat-card">
          <h2>
            {
              notices.filter(
                (n) => n.fields.category === "Training"
              ).length
            }
          </h2>
          <p>Training</p>
        </div>
      </div>

      <div className="notice-grid">
        {filteredNotices.map((notice) => (
          <NoticeCard
            key={notice.sys.id}
            notice={{
              id: notice.sys.id,
              ...notice.fields,
            }}
          />
        ))}
      </div>

      {filteredNotices.length === 0 && (
        <p className="no-results">
          No notices found.
        </p>
      )}

      <footer className="footer">
        Team Notice Board © 2026
      </footer>
    </div>
  );
}

export default Home;