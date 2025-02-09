
import React, { useState } from "react";
import axios from "axios";


const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("address", profile.address);
    formData.append("phone", profile.phone);
    if (image) {
      formData.append("profileImage", image);
    }

    try {
      await axios.post("http://localhost:3000/api/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile.");
    }
  };
  return (
    <div>
      <div className="container mt-5">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title mb-4">Update Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={profile.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="profileImage" className="form-label">
                  Profile Picture
                </label>
                <input
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  onChange={handleImageChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
