import React, { useEffect, useState } from "react";
import { auth } from "../Firebase/FirebaseConfig";
import { signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import BuyerMarketplaceNavbar from "./BuyerMarketplaceNavbar";

const BuyerDashboard = ({ user }) => {
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
     <BuyerMarketplaceNavbar />
    <div>
                <h2>Welcome, {username || "User"}!</h2> {/* Display username or a fallback message */}
      <div className="p-6">
        <h2 className="text-3xl font-bold">Welcome to Your Buyer Dashboard</h2>
      </div>           
      <button onClick={handleLogout}>Logout</button> {/* Logout Button */}
      {/* Add other Buyer Dashboard content here */}
            </div>
     </>
  );
};

export default BuyerDashboard;
