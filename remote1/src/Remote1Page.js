import React, { useState } from "react";

const Remote1Page = ({ text, setText }) => {
  // const [text, setText] = useState("Welcome to Remote1!");

  return (
    <div>
      <h1>Remote 1 Page</h1>
      <p>{text}</p>
      <button
        onClick={() => {
          setText("button clicked in Remote 1");
        }}
      >
        Change Text
      </button>
    </div>
  );
};

export default Remote1Page;
