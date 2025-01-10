import React, { useState } from "react";

const AIPopUp = () => {
  const [isChatOpen, setIsChatOpen] = useState(false); // Toggle for mini chat
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (!userMessage.trim()) return;

    const newMessage = {
      role: "user",
      content: userMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: "assistant",
        content: "This is a response from AI.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);

    setUserMessage("");
  };

  return (
    <>
      {!isChatOpen && (
        <button
          className="fixed bottom-8 right-8 bg-steelBlue text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
          onClick={() => setIsChatOpen(true)}
        >
          💬
        </button>
      )}

      {isChatOpen && (
        <div className="fixed bottom-16 right-8 w-80 bg-white shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-steelBlue">AI Chat</h2>
            <button
              className="text-red-500"
              onClick={() => setIsChatOpen(false)}
            >
              ✖
            </button>
          </div>

          <div className="overflow-y-auto max-h-64 mb-4 custom-scrollbar">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <div
                  className={`p-2 rounded-lg max-w-xs text-sm shadow-md ${
                    message.role === "user"
                      ? "bg-steelBlue text-white"
                      : "bg-gray-300 text-gray-800"
                  }`}
                >
                  {message.content}
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 text-sm"
              placeholder="Type a message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="ml-2 px-4 py-2 bg-steelBlue text-white rounded-lg hover:bg-blue-600 text-sm"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>

          <div className="text-xs text-gray-500 mt-2 text-center">
            Voice & TTS available on the full AI page.
            <button
              className="text-steelBlue font-semibold ml-1 underline"
              onClick={() => (window.location.href = "/ai-page")}
            >
              Go to AI Page
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIPopUp;
