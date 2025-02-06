import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

const Chat = () => {
  const { productId, farmerId, buyerId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/chat/${productId}`)
      .then((res) => setMessages(res.data.messages))
      .catch((err) => console.error("Error fetching chat:", err));

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receiveMessage");
  }, [productId]);

  const sendMessage = () => {
    socket.emit("sendMessage", { chatId: productId, senderId: buyerId, message });

    axios.post("http://localhost:5000/api/chat/send", {
      buyerId,
      farmerId,
      productId,
      senderId: buyerId,
      message,
    });

    setMessage("");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Chat with Seller</h2>
      <div className="border p-4 rounded shadow">
        {messages.map((msg, idx) => (
          <p key={idx} className="mb-2">{msg.message}</p>
        ))}
      </div>

      <div className="mt-4">
        <input 
          className="border p-2 w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
