import React, { useState, useEffect, useRef, useContext } from "react";
import { gsap } from "gsap";
import { AuthContext } from "../contexts/AuthProvider"; // Import AuthContext
import useAxiosPublic from "../hooks/useAxiosPublic";
import notificationSound from "../../public/assets/audios/notification.mp3"; // Import the audio file

const ChatBot = () => {
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const axiosPublic = useAxiosPublic();
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(false); // TTS toggle state
  const chatContainerRef = useRef(null);
  const recognitionRef = useRef(null);
  const notificationAudio = useRef(null); // Ref to handle audio playback

  // Initialize notification audio
  useEffect(() => {
    notificationAudio.current = new Audio(notificationSound);
  }, []);

  // Initialize SpeechRecognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserMessage(transcript);
      };

      recognitionRef.current = recognition;
    } else {
      console.error("Speech Recognition API is not supported in this browser.");
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const speakText = (text) => {
    if (!isTtsEnabled) return; // Exit if TTS is disabled

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    const newMessage = {
      role: "user",
      content: userMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setIsTyping(true); // Show typing indicator

    try {
      const response = await axiosPublic.post("ai/ask", {
        message: userMessage,
      });

      const assistantMessage = {
        role: "assistant",
        content: response.data.message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);

      // Play notification sound for AI response
      if (notificationAudio.current) {
        notificationAudio.current.play();
      }

      // Speak the assistant's response
      speakText(response.data.message);
    } catch (error) {
      console.error("Error communicating with chatbot API:", error);
      const errorMessage = {
        role: "assistant",
        content: "Sorry, something went wrong.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);

      // Play notification sound for error message
      if (notificationAudio.current) {
        notificationAudio.current.play();
      }

      // Speak the error message
      speakText(errorMessage.content);
    }

    setIsTyping(false); // Hide typing indicator
    setUserMessage("");
  };

  // GSAP animation for the last message
  useEffect(() => {
    if (chatContainerRef.current?.lastElementChild) {
      const lastMessage = chatContainerRef.current.lastElementChild;

      // Animate the last message
      gsap.fromTo(
        lastMessage,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );

      // Check if user is near bottom and scroll only if true
      const isNearBottom =
        chatContainerRef.current.scrollTop +
          chatContainerRef.current.clientHeight >=
        chatContainerRef.current.scrollHeight - 50;

      if (isNearBottom) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Section */}
      <div
        className="flex flex-col flex-1 w-full max-w-7xl mx-auto"
        style={{ height: "calc(100vh - 120px)" }} // Adjust height based on your navbar
      >
        {/* Chat Display Area */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-white rounded-lg mx-4 custom-scrollbar"
          style={{ minHeight: "600px" }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex items-center space-x-2">
                {message.role === "assistant" && (
                  <img
                    src="/assets/images/chatbot1.png"
                    alt="Assistant Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div
                  className={`p-2 rounded-lg max-w-lg text-md shadow-md ${
                    message.role === "user"
                      ? "bg-steelBlue text-white"
                      : "bg-gray-300 text-gray-800"
                  }`}
                >
                  {message.content}
                  <div className="text-xs text-white mt-1 text-right">
                    {message.timestamp}
                  </div>
                </div>
                {message.role === "user" && (
                  <img
                    src={user?.photoURL || "/default-avatar.png"} // Display user photo or default
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start items-center space-x-2">
              <img
                src="/assets/images/chatbot1.png"
                alt="Assistant Typing Avatar"
                className="w-6 h-6 rounded-full"
              />
              <div className="p-3 rounded-lg max-w-xs text-sm bg-gray-300 text-gray-800 shadow-md">
                <span className="animate-pulse">...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-2 bg-gray-50 border-t flex items-center space-x-2 mx-4 mb-4 rounded-lg shadow-lg">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 text-sm"
            placeholder="Type a message or use the mic..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
            onClick={sendMessage}
          >
            Send
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              isListening
                ? "bg-red-500 text-white"
                : "bg-gray-300 text-gray-800"
            } hover:bg-gray-400 text-sm`}
            onClick={startListening}
          >
            🎤
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              isTtsEnabled
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-800"
            } hover:bg-gray-400 text-sm`}
            onClick={() => setIsTtsEnabled((prev) => !prev)}
          >
            {isTtsEnabled ? "TTS On" : "TTS Off"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
