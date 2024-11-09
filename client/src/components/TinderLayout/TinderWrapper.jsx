/* eslint-disable react/prop-types */

import Header from "../Home/Header";
function TinderWrapper({ children }) {
  return (
    <>
      <div className=" w-full h-full ">
        <Header />
        {children}
      </div>
    </>
  );
}

TinderWrapper.propTypes = {};

export default TinderWrapper;
