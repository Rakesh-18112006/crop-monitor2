import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaPaperPlane, FaMicrophone, FaMoon, FaSun, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import "./chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef(null);
  const speechSynthRef = useRef(null);

  useEffect(() => {
    const chatMessages = document.querySelector(".chat-messages");
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setIsBotTyping(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chatbot", { message: input });
      const botMessage = { text: res.data.reply, sender: "bot" };
      setMessages([...newMessages, botMessage]);
      speak(botMessage.text);
    } catch (error) {
      setMessages([...newMessages, { text: "Error getting response.", sender: "bot" }]);
    } finally {
      setIsBotTyping(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  const speak = (text) => {
    stopSpeak();
    speechSynthRef.current = new SpeechSynthesisUtterance(text);
    speechSynthRef.current.lang = "en-US";
    speechSynthRef.current.volume = 1;
    setIsSpeaking(true);
    
    speechSynthRef.current.onend = () => setIsSpeaking(false);
    speechSynthesis.speak(speechSynthRef.current);
  };

  const stopSpeak = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const startListening = () => {
    if (isListening) return;

    recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.interimResults = false;
    recognitionRef.current.continuous = false;

    recognitionRef.current.start();
    setIsListening(true);

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => setIsListening(false);
    recognitionRef.current.onerror = () => setIsListening(false);
  };

  return (
    <div className={`chatbot-container ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="chat-header">
        <span className="text-2xl">Kissan Bot </span>
        <button className="theme-toggle-button" onClick={toggleTheme}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
            {msg.sender === "bot" && (
              <button className="speak-button" onClick={() => isSpeaking ? stopSpeak() : speak(msg.text)}>
                {isSpeaking ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
            )}
          </div>
        ))}
        {isBotTyping && (
          <div className="message bot">
            <div className="wave-loader">
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask me anything..."
        />
        <button className="send-button" onClick={sendMessage}>
          <FaPaperPlane />
        </button>
        <button
          className={`microphone-button ${isListening ? "listening" : ""}`}
          onClick={isListening ? () => recognitionRef.current?.stop() : startListening}
        >
          <FaMicrophone />
          {isListening && <div className="pulse-ring"></div>}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;