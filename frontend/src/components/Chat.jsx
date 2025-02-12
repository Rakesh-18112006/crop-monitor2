import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

const Chat = () => {
  const { productId, farmerId, buyerId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/chat/${productId}`)
      .then((res) => setMessages(res.data.messages))
      .catch((err) => console.error("Error fetching chat:", err));

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receiveMessage");
  }, [productId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      chatId: productId,
      senderId: buyerId,
      message,
    };

    socket.emit("sendMessage", newMessage);

    axios.post("http://localhost:5000/api/chat/send", {
      buyerId,
      farmerId,
      productId,
      senderId: buyerId,
      message,
    });

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Chat</h2>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 border rounded-lg bg-white shadow-md">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.senderId === buyerId ? "justify-end" : "justify-start"} mb-2`}
            >
              <div
                className={`p-3 max-w-xs md:max-w-md rounded-lg shadow ${
                  msg.senderId === buyerId
                    ? "bg-green-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}
              >
                <p>{msg.message}</p>
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Chat Input */}
      <div className="mt-4 flex">
        <input
          className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
