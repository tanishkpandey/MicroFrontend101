import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to="/remote1">Go to Remote 1</Link>
      </li>
      <li>
        <Link to="/remote2">Go to Remote 2</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
