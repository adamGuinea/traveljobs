import React, { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Navbar />
        <Landing />
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
