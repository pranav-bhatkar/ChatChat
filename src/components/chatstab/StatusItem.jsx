import React from "react";

const ListItemStyled = ({ chat }) => {
  
  return (
    <>
         <div className="w-full h-[75px] px-5 py-3 flex justify-between">
          <div className="flex">
            <div className="">
              <img className="w-14 h-14 overflow-hidden rounded-full object-cover" src={chat.avatar} alt="avtar" />
            </div>
            <div className="ml-4">
              <h4 className="text-slate-700 text-lg">{chat.name}</h4>
              {/*<p className="text-green-500">online</p>*/}
              <p className="text-gray-500 text-xs mt-1 truncate w-48 text-ellipsis">{chat.lastmessage}</p>
              {/*<div className="flex items-center mt-1">
                <i className="fas fa-check text-sm text-gray-400 mr-1"></i>
                <i className="fas fa-video text-sm text-gray-400 mr-1"></i>
                <p className="text-slate-500 text-sm">Image</p>
              </div>*/}
            </div>
          </div>
          <div>
            <div className="flex justify-end">
              <p className="text-xs mb-2 text-slate-500">{chat.time}</p>
            </div>
            <div className="flex justify-end">
              <div className="w-5 h-5 rounded-full bg-slate-900 flex justify-center items-center">
                <p className="text-xs text-white text-end">1</p>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default ListItemStyled;