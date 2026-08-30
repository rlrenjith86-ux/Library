import { useEffect, useState } from "react";
import api from "../services/api.js";

function BorrowRequests() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    setLoading(true);
    setMessage("");

    try {
      const endpoint =
        user.role === "admin"
          ? "/admin-requests"
          : "/my-requests";

      const response = await api.get(endpoint);

      setRequests(response.data.requests || []);

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to load requests"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const updateRequest = async (
    requestId,
    status
  ) => {
    try {
      const response = await api.post(
        "/update-request",
        {
          requestId,
          status
        }
      );

      setMessage(response.data.message);

      loadRequests();

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to update request"
      );
    }
  };

  return (
    <div className="page-container">

      <h1>
        {user.role === "admin"
          ? "Borrow Requests"
          : "My Borrow Requests"}
      </h1>

      {message && (
        <div className="info-message">
          {message}
        </div>
      )}

      {loading ? (
        <p>Loading requests...</p>
      ) : requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <div className="request-grid">

          {requests.map((request) => (

            <div
              className="request-card"
              key={request._id}
            >

              <h3>
                {request.bookTitle}
              </h3>

              {user.role === "admin" && (
                <>
                  <p>
                    <strong>User:</strong>{" "}
                    {request.userName}
                  </p>

                  <p>
                    <strong>Register Number:</strong>{" "}
                    {request.registerNumber}
                  </p>

                  <p>
                    <strong>Role:</strong>{" "}
                    {request.role}
                  </p>
                </>
              )}

              <p>
                <strong>Status:</strong>{" "}
                {request.status}
              </p>

              <p>
                <strong>Requested:</strong>{" "}
                {request.requestedAt
                  ? new Date(
                      request.requestedAt
                    ).toLocaleString()
                  : "-"}
              </p>

              {user.role === "admin" &&
                request.status === "pending" && (
                  <div className="request-actions">

                    <button
                      className="primary-btn"
                      onClick={() =>
                        updateRequest(
                          request._id,
                          "approved"
                        )
                      }
                    >
                      Approve
                    </button>

                    <button
                      className="danger-btn"
                      onClick={() =>
                        updateRequest(
                          request._id,
                          "rejected"
                        )
                      }
                    >
                      Reject
                    </button>

                  </div>
                )}

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default BorrowRequests;