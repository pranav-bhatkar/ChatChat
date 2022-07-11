import React from "react";

const Button = ({ children, onClick }) => {
  
  return (
    <>
     <button onClick={onClick} className="px-3 py-2 bg-blue-500 text-md text-white font-bold rounded-md hover:bg-blue-700 focus:bg-blue-700 transition-[0.5s] opacity-1" >{children}</button>
    </>
  );
};

export default Button;