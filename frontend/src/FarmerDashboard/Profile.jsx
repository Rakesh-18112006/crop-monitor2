import React, { useEffect, useState } from "react";
import { auth } from "../Firebase/FirebaseConfig";
import { signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaUser } from "react-icons/fa"; // Profile Icon

const Profile = ({ user }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Fetch username from Firestore
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username); // Set the username from Firestore
        }
      } catch (error) {
        console.error("Error fetching username: ", error);
      }
    };

    fetchUsername();
  }, [user.uid]);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase logout
      navigate("/login"); // Redirect to the login page after logout
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-20 p-6 bg-white rounded-4xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-green-800">Your Profile</h2>
        <div className="flex items-center space-x-6">
          <FaUser className="text-4xl text-blue-900 mb-2" /> {/* Profile Icon */}
          <div>
            <p className="text-xl text-gray-700 font-semibold">Username: {username || "Loading..."}</p>
            <p className="text-xl text-gray-700 font-semibold">Email: {user?.email}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg shadow-md">
            <p className="text-lg text-gray-600">User ID: {user?.uid}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg shadow-md">
            <p className="text-lg text-gray-600">Account Created: {user?.metadata?.creationTime}</p>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-700 transition duration-300 "
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
