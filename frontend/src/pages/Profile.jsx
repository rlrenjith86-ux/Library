import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="page-container">
      <h1>My Profile</h1>

      <div className="profile-card">
        <div className="profile-row">
          <strong>Name:</strong>
          <span>{user.name || "-"}</span>
        </div>

        <div className="profile-row">
          <strong>Role:</strong>
          <span>{user.role || "-"}</span>
        </div>

        <div className="profile-row">
          <strong>Register Number:</strong>
          <span>
            {user.registerNumber || "-"}
          </span>
        </div>

        <div className="profile-row">
          <strong>College ID:</strong>
          <span>
            {user.idNumber || "-"}
          </span>
        </div>

        <div className="profile-row">
          <strong>Department:</strong>
          <span>
            {user.department || "-"}
          </span>
        </div>

        <div className="profile-row">
          <strong>Phone:</strong>
          <span>
            {user.phone || "-"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Profile;