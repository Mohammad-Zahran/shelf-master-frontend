import React from "react";

const ChatBody = () => {
  return (
    <div className="flex flex-col gap-4">

      {/* Client message */}
      <div className="border-[#999999] break-words border-2 rounded-xl self-end px-3 py-3 max-w-[80%]">
        <pre className="whitespaces-pre-wrap">
          <span>Hi Chat GPT, Can you help me? </span>
        </pre>
      </div>

      {/* ai message */}
      <div>
        <pre>
            <span>Yeah, I can help you with anything</span>
        </pre>
      </div>
    </div>
  );
};

export default ChatBody;
