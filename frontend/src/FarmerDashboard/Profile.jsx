import React from "react";

const Profile = ({ user }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Profile</h2>
      <p>Name: {user?.displayName}</p>
      <p>Email: {user?.email}</p>
      <img src={user?.photoURL} alt="Profile" className="w-16 h-16 rounded-full mt-2" />
    </div>
  );
};

export default Profile;
