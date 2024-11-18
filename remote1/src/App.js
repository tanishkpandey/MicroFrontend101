import React from "react";
import Remote1Page from "./Remote1Page";

const Remote1App = () => {

  return (
    <div style={{ padding: "20px", border: "2px solid blue", margin: "10px" }}>
      <h2>Remote 1 App</h2>
      <p>This is a component exposed by Remote 1.</p>
      <div>
        <Remote1Page />
      </div>
    </div>
  );
};

export default Remote1App;
