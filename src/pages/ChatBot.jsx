import React from "react";
import ChatBody from "../components/chatbot/ChatBody";

const ChatBot = () => {
  return (
    <div className="h-screen py-6 relative sm:px-28 overflow-hidden flex flex-col justify-between align-middle">
      {/* gradients */}
      <div className="gradient-01 z-0 absolute"></div>
      <div className="gradient-02 z-0 absolute"></div>

      {/* header */}
      <div className="font-bold text-2xl text-center mb-3">
        Start Talking with Shelfie
      </div>

      {/* body */}
      <div className="h-[90%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center">
        <ChatBody />
      </div>

      {/* input */}
      <div>input</div>
    </div>
  );
};

export default ChatBot;
