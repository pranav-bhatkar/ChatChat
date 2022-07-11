import React from "react";
import icall from "./incoming-call.png"
import ocall from "./outgoing-call.png"
import mcall from "./missed-call.png"
const CallsItem = ({ call }) => {
  
  return (
    <>
         <div className="w-full h-[75px] px-5 py-3 flex justify-between items-center">
          <div className="flex">
            <div className="">
              <img className="w-14 h-14 overflow-hidden rounded-full object-cover" src={call.avatar} alt="avtar" />
            </div>
            <div className="ml-4">
              <h4 className="text-slate-700 text-lg">{call.name}</h4>
             <div className="flex items-center mt-1">
                <img className="w-[15px] h-[15px] mr-2" src={ call.type==="recived" ? icall : call.type==="called"? ocall : call.type==="missed"? mcall : '' } alt="call-type"/>
                <p className="text-slate-500 text-sm">{call.time}</p>
              </div>
            </div>
          </div>
          <div className="text-xl mr-">
            {call.callType==="voice" ? <ion-icon name="call"></ion-icon> : call.callType==="video" ? <ion-icon name="videocam"></ion-icon> : null}
          </div>
        </div>
    </>
  );
};

export default CallsItem;