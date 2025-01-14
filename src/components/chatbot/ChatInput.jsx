import React from "react";
import { FaMicrophone } from "react-icons/fa";

const ChatInput = ({ userMessage, setUserMessage, sendMessage, startListening, isListening }) => {
  return (
    <div className="w-full bg-steelBlue bg-opacity-30 max-h-40 rounded-lg px-4 py-4 overflow-auto relative flex items-center space-x-3">
      <textarea
        rows={1}
        className="border-0 bg-transparent outline-none w-11/12"
        placeholder="Type a message..."
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
      />

      <button
        onClick={startListening}
        className={`px-4 py-2 rounded-lg ${
          isListening ? "bg-red-500 text-white" : "bg-gray-300 text-gray-800"
        }`}
      >
        <FaMicrophone />

      </button>

      <img
        width={20}
        src="./assets/images/send.png"
        className="hover:cursor-pointer ease-in duration-100 hover:scale-125"
        alt="send-button"
        onClick={sendMessage}
      />
    </div>
  );
};

export default ChatInput;
