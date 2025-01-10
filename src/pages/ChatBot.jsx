import React, { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

const ChatBot = () => {
  const axiosPublic = useAxiosPublic();
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  // Function to send a message to the API
  const sendMessage = async () => {
    if (!userMessage.trim()) return;
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: userMessage },
    ]);

    try {
      const response = await axiosPublic.post("/ask", { message: userMessage });
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: response.data.message },
      ]);
    } catch (error) {
      console.error("Error communicating with chatbot API:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
    }

    setUserMessage("");
  };

  return (
    <div className="flex flex-col items-center p-6 mx-auto max-w-2xl h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">ChatBot</h1>
      <div className="flex flex-col w-full h-4/5 bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex-grow p-4 overflow-y-scroll">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${
                msg.role === "user"
                  ? "text-right text-blue-600"
                  : "text-left text-gray-700"
              }`}
            >
              <span className="font-semibold">
                {msg.role === "user" ? "You" : "Bot"}:
              </span>{" "}
              {msg.content}
            </div>
          ))}
        </div>
        <div className="flex items-center border-t border-gray-300 p-4">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={sendMessage}
            className="ml-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
