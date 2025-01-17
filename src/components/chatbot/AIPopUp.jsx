import React, { useState, useEffect, useRef, useContext } from "react";
import { FaComment } from "react-icons/fa6";
import { AuthContext } from "../../contexts/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import notificationSound from "../../../public/assets/audios/notification.mp3";

const AIPopUp = () => {
  const [isChatOpen, setIsChatOpen] = useState(false); // Toggle for mini chat
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const notificationAudio = useRef(null);

  // Initialize notification sound
  useEffect(() => {
    notificationAudio.current = new Audio(notificationSound);
  }, []);

  const sendMessage = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please Log In",
        text: "You need to be logged in to use the AI chat.",
        confirmButtonText: "Log In",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
      return;
    }

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

    try {
      const response = await axiosPublic.post("ai/ask", {
        message: userMessage,
      });

      const aiResponse = {
        role: "assistant",
        content: response.data.message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiResponse]);

      // Play notification sound for AI response
      if (notificationAudio.current) {
        notificationAudio.current.play();
      }
    } catch (error) {
      console.error("Error communicating with AI API:", error);
      const errorMessage = {
        role: "assistant",
        content: "Sorry, something went wrong. Please try again later.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, errorMessage]);

      // Play notification sound for error message
      if (notificationAudio.current) {
        notificationAudio.current.play();
      }
    }

    setUserMessage("");
  };

  return (
    <>
      {!isChatOpen && (
        <button
          className="fixed bottom-8 right-8 bg-steelBlue text-white p-3 rounded-full shadow-lg hover:bg-white hover:text-steelBlue"
          onClick={() => setIsChatOpen(true)}
        >
          <FaComment />
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
              className="ml-2 px-4 py-2 bg-steelBlue text-white rounded-lg hover:bg-white hover:text-steelBlue text-sm"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>

          <div className="text-xs text-gray-500 mt-2 text-center">
            Full voice & TTS features available on the main AI page.
            <button
              className="text-steelBlue font-semibold ml-1 underline"
              onClick={() => (window.location.href = "/assistant-ai")}
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
