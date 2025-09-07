import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";


const socket = io("http://localhost:3001");

export default function ChatRoom() {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const user = searchParams.get("user") || "guest";

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("join_room", roomId);

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [roomId]);

  // Fetch previous messages when component mounts
useEffect(() => {
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/chat/messages/${roomId}`);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  fetchMessages();
}, [roomId]);

  // Send message
  const sendMessage = async () => {
    if (!message.trim()) return;
    
    const msgData = { roomId, user, text: message };

    try {
      // Save to DB
      await axios.post(`http://localhost:3001/api/chat/send`, msgData);

      // Emit via socket
      socket.emit("send_message", msgData);

      // Update UI immediately
      setMessages((prev) => [...prev, msgData]);
      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded shadow">
      <h2 className="text-lg font-bold mb-2">Chat Room: {roomId}</h2>
      <div className="h-64 overflow-y-auto border p-2 mb-2">
        {messages.map((msg, idx) => (
          <p
            key={idx}
            className={msg.user === user ? "text-blue-600" : "text-green-600"}
          >
            <strong>{msg.user}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border flex-grow p-2"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
