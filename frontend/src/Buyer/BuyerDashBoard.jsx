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

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        if (user?.uid) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUsername(userDoc.data().username);
          }
        }
      } catch (error) {
        console.error("Error fetching username: ", error);
      }
    };

    fetchUsername();
  }, [user?.uid]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <>
      <BuyerMarketplaceNavbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6 flex flex-col items-center">
        <div className="w-full max-w-5xl">
          <div className="bg-white shadow-md rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Welcome, {username || "User"}!</h2>
            <p className="text-gray-600 mt-2">Manage your activities effortlessly.</p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Recent Orders", desc: "Check the status of your purchases.", color: "blue", link: "#" },
              { title: "Favorites", desc: "See your marked favorite items.", color: "purple", link: "#" },
              { title: "Account Settings", desc: "Manage your profile and account.", color: "green", link: "#" },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-6 transition-transform transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{card.title}</h3>
                <p className="text-gray-600">{card.desc}</p>
                <button
                  className={`mt-4 bg-${card.color}-500 text-white px-5 py-2 rounded-lg hover:bg-${card.color}-600 transition duration-300`}
                >
                  View {card.title}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerDashboard;