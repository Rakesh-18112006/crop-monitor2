import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import io from "socket.io-client";
import axios from "../api/chatApi";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig"; // Import Firestore

const socket = io("http://localhost:5000");

const Chat = () => {
  const { productId, farmerId, buyerId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [farmerName, setFarmerName] = useState("Loading..."); // Store Farmer Name from Firestore
  const chatEndRef = useRef(null);

  // ✅ Fetch previous messages & farmer details
  useEffect(() => {
    axios.getChatMessages(productId, buyerId, farmerId)
      .then((res) => setMessages(res.data.messages))
      .catch((err) => console.error("Error fetching chat:", err));

    // ✅ Fetch Farmer Name from Firestore
    const fetchFarmerName = async () => {
      try {
        const farmerDoc = await getDoc(doc(db, "users", farmerId));
        setFarmerName(farmerDoc.exists() ? farmerDoc.data().name : "Unknown Farmer");
      } catch (err) {
        console.error("Error fetching farmer name:", err);
      }
    };

    fetchFarmerName();

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receiveMessage");
  }, [productId, farmerId, buyerId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = {
      chatId: productId,
      senderId: buyerId,
      message,
    };

    socket.emit("sendMessage", newMessage);

    try {
      await axios.sendMessage(buyerId, farmerId, productId, buyerId, message);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center p-4 bg-green-700 text-white">
        <Link to="/chats" className="mr-3 text-lg">⬅️</Link>
        <div className="flex items-center">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/1999/1999625.png" 
            alt="Farmer" 
            className="w-10 h-10 rounded-full mr-3"
          />
          <h2 className="text-xl font-bold">{farmerName}</h2>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 border rounded-lg bg-white shadow-md">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.senderId === buyerId ? "justify-end" : "justify-start"} mb-2`}>
              <div className={`p-3 max-w-xs md:max-w-md rounded-lg shadow ${msg.senderId === buyerId ? "bg-green-500 text-white" : "bg-gray-200 text-gray-900"}`}>
                <p>{msg.message}</p>
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Chat Input */}
      <div className="mt-4 flex p-3 bg-white">
        <input className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="ml-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
