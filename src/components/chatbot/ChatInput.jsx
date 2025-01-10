import React from "react";
import { GoPaperAirplane } from "react-icons/go";

const ChatInput = () => {
  return (
    <div className="w-full bg-steelBlue max-h-40 rounded-lg px-4 py-4 overflow-auto relative">
      <textarea
        rows={1}
        className="border-0 bg-transparent outline-none w-11/12"
      />

      <img
        width={20}
        src="./assets/images/send.png"
        className="absolute top-4 right-3 hover:cursor-pointer ease-in duration-100 hover:scale-125"
        alt="send-button"
      />
    </div>
  );
};

export default ChatInput;
