import { useEffect, useState } from "react";
import api from "../services/api.js";

function Resources() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [resources, setResources] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    link: ""
  });

  const loadResources = async () => {
    try {
      setLoading(true);

      const response = await api.get("/resources");

      setResources(response.data.resources || []);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to load resources"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  const addResource = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post(
        "/add-resource",
        newResource
      );

      setMessage(response.data.message);

      setNewResource({
        title: "",
        description: "",
        link: ""
      });

      loadResources();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to add resource"
      );
    }
  };

  return (
    <div className="page-container">
      <h1>Library Resources</h1>

      {message && (
        <div className="info-message">
          {message}
        </div>
      )}

      {user.role === "admin" && (
        <form
          className="add-book-form"
          onSubmit={addResource}
        >
          <h2>Add Resource</h2>

          <input
            type="text"
            placeholder="Resource Title"
            value={newResource.title}
            onChange={(event) =>
              setNewResource({
                ...newResource,
                title: event.target.value
              })
            }
            required
          />

          <textarea
            placeholder="Description"
            value={newResource.description}
            onChange={(event) =>
              setNewResource({
                ...newResource,
                description: event.target.value
              })
            }
            required
          />

          <input
            type="url"
            placeholder="Resource Link"
            value={newResource.link}
            onChange={(event) =>
              setNewResource({
                ...newResource,
                link: event.target.value
              })
            }
            required
          />

          <button
            type="submit"
            className="primary-btn"
          >
            Add Resource
          </button>
        </form>
      )}

      {loading ? (
        <p>Loading resources...</p>
      ) : resources.length === 0 ? (
        <p>No resources available.</p>
      ) : (
        <div className="book-grid">
          {resources.map((resource) => (
            <div
              className="book-card"
              key={resource._id}
            >
              <h2>{resource.title}</h2>

              <p>
                {resource.description}
              </p>

              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-btn resource-link"
              >
                Open Resource
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Resources;