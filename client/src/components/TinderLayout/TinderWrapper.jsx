import React from "react";
import PropTypes from "prop-types";
import Header from "../Home/Header";
function TinderWrapper({ children }) {
  return (
    <>
      <div className=" w-full ">
        <Header />
        {children}
      </div>
    </>
  );
}

TinderWrapper.propTypes = {};

export default TinderWrapper;
