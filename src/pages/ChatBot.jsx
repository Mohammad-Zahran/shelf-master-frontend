import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import useAxiosPublic from "../hooks/useAxiosPublic";

const ChatBot = () => {
  const axiosPublic = useAxiosPublic();
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const chatContainerRef = useRef(null);

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    const newMessage = { role: "user", content: userMessage };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const response = await axiosPublic.post("ai/ask", {
        message: userMessage,
      });
      const assistantMessage = { role: "assistant", content: response.data.message };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error communicating with chatbot API:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
    }

    setUserMessage("");
  };

  // GSAP animation for the last message
  useEffect(() => {
    if (chatContainerRef.current?.lastElementChild) {
      const lastMessage = chatContainerRef.current.lastElementChild;
      gsap.fromTo(
        lastMessage,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );

      // Scroll to the bottom
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Display Area */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-white"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs text-sm ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-800"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Type a message..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
