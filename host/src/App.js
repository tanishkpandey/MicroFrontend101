import React, { useState, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Navigation from "./navigation";

const Remote1App = React.lazy(() => import("remote1/App"));
const Remote2Widget = React.lazy(() => import("remote2/Widget"));
const Remote1Page = React.lazy(() => import("remote1/Page"));
const Remote2Page = React.lazy(() => import("remote2/Page"));

const App = () => {
  const [text, setText] = useState("This is comming from the Host application");
  return (
    <>
      <Router>
        <div style={{ textAlign: "center" }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route
                path="/remote1"
                element={<Remote1Page text={text} setText={setText} />}
              />
              <Route path="/remote2" element={<Remote2Page />} />
              <Route path="/home" element={<Home />} />
              <Route
                path="/"
                element={
                  <>
                    <h1>Welcome to the Host Application</h1>
                    <p>{text}</p>
                    <Navigation />
                  </>
                }
              />
            </Routes>
          </Suspense>

          <Suspense fallback={<div>Loading Remote 1...</div>}>
            <Remote1App />
          </Suspense>
          <Suspense fallback={<div>Loading Remote 2...</div>}>
            <Remote2Widget />
          </Suspense>
        </div>
      </Router>
    </>
  );
};

export default App;
