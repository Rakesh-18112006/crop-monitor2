import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/chatApi";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig"; // Import Firestore

const ChatList = ({ userId }) => {
  const [chats, setChats] = useState([]);
  const [farmers, setFarmers] = useState({}); // Store farmer names from Firestore

  useEffect(() => {
    axios.getChatList(userId)
      .then(async (res) => {
        setChats(res.data);

        // Fetch farmer names from Firestore for each chat
        const farmerNames = {};
        for (const chat of res.data) {
          if (!farmerNames[chat.farmerId]) {
            const farmerDoc = await getDoc(doc(db, "users", chat.farmerId));
            farmerNames[chat.farmerId] = farmerDoc.exists() ? farmerDoc.data().name : "Unknown Farmer";
          }
        }
        setFarmers(farmerNames);
      })
      .catch((err) => console.error("Error fetching chat list:", err));
  }, [userId]);

  return (
    <div className="w-1/3 h-screen p-4 bg-white shadow-lg overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Chats</h2>
      {chats.length === 0 ? (
        <p>No chats found.</p>
      ) : (
        chats.map((chat) => (
          <Link 
            key={chat._id} 
            to={`/chat/${chat.productId}/${chat.farmerId}/${userId}`} 
            className="flex items-center p-3 border-b hover:bg-gray-100"
          >
            {/* Default Farmer Icon */}
            <img 
              src="https://cdn-icons-png.flaticon.com/512/1999/1999625.png" 
              alt="Farmer" 
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              {/* Farmer Name from Firestore */}
              <p className="font-semibold">{farmers[chat.farmerId] || "Loading..."}</p>
              <p className="text-gray-500 text-sm truncate">{chat.lastMessage}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default ChatList;
