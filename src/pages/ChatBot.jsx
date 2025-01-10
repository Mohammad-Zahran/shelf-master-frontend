import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ChatBody from "../components/chatbot/ChatBody";
import ChatInput from "../components/chatbot/ChatInput";

const ChatBot = () => {
  const axiosPublic = useAxiosPublic();
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const chatContainerRef = useRef(null);
  const recognitionRef = useRef(null);

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
    <div className="h-screen py-6 relative sm:px-16 px-18 overflow-hidden flex flex-col justify-between align-middle">
      {/* gradients */}
      <div className="gradient-01 z-0 absolute"></div>
      <div className="gradient-02 z-0 absolute"></div>

      {/* header */}
      <div className="font-bold text-2xl text-center mb-3">
        Start Talking with Shelfie
      </div>

      {/* body */}
      <div className="h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center">
        <ChatBody messages={messages} chatContainerRef={chatContainerRef} />
      </div>

      {/* input */}
      <div className="w-full max-w-4xl min-w-[20rem] self-center">
        <ChatInput
          userMessage={userMessage}
          setUserMessage={setUserMessage}
          sendMessage={sendMessage}
          startListening={startListening}
          isListening={isListening}
        />
      </div>
    </div>
  );
};

export default ChatBot;
