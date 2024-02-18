import React from "react";

interface Props {
  message: {
    set: boolean;
    text: string;
    type: string;
  };
}

const Message: React.FC<Props> = ({ message }) => {
  return (
    <div>
      {message.set && (
        <div
          className="w-[375px] md:w-[475px] p-6 bg-gray-100 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">{message.type}!</strong>
          &nbsp;
          <span className="block sm:inline">{message.text}</span>
        </div>
      )}
    </div>
  );
};

export default Message;
