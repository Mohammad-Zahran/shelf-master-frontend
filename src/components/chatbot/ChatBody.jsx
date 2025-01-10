import React from "react";

const ChatBody = ({ messages, chatContainerRef }) => {
  const aiStyle = "bg-steelBlue bg-opacity-40 backdrop-blur-lg dropshadow-md mr-auto";

  return (
    <div ref={chatContainerRef} className="flex flex-col gap-4 overflow-y-auto">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`border-[#999999] break-words border-2 rounded-xl px-3 py-3 max-w-[80%] ${
            message.role === "user" ? "self-end" : aiStyle
          }`}
        >
          <pre className="whitespace-pre-wrap">
            <span>{message.content}</span>
          </pre>
        </div>
      ))}
    </div>
  );
};

export default ChatBody;
