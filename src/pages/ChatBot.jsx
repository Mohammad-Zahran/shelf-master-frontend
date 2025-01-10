import React from "react";
import ChatBody from "../components/ChatBody";

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

      {/* input */}
      <div>
        <ChatBody />
      </div>

      {/* body */}
      <div>body</div>
    </div>
  );
};

export default ChatBot;
