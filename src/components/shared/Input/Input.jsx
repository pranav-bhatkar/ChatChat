import React from "react";

const Input = ({ labeltxt, ...props }) => {
  
  return (
    <>
     <div className="flex justify-center item-center my-8">
          <div className="relative sm:max-w-[250px]">
            <p className="absolute top-[-55%] left-1 font-medium transition-[0.5s] text-sm text-left">{labeltxt}</p>
            <input className="w-full text-[18px] transition-[0.5s] px-3 pl-5 py-2 rounded-md outline-none text-md bg-white shadow-md focus:outline-blue-500" {...props} />
          </div>
        </div>
    </>
  );
};

export default Input;