import React from "react";

const StatusTab = () => {
  const moments = [
   {"id": 0, "avatar": "images/profile-1.jpg", "name": "Pranav Bhatkar", "time": "10:34"},
   {"id": 1, "avatar": "images/profile-2.jpg", "name": "Priti Bhatkar", "time": "10:34"},
   {"id": 2, "avatar": "images/profile-3.jpg", "name": "Roshan Shah", "time": "10:34"},
   {"id": 3, "avatar": "images/profile-4.jpg", "name": "r", "time": "10:34"},
   {"id": 4, "avatar": "images/profile-5.jpg", "name": "gjj Bhatkar", "time": "10:34"},
   {"id": 5, "avatar": "images/profile-6.jpg", "name": "nel Bhatkar", "time": "10:34"},
   {"id": 6, "avatar": "images/profile-1.jpg", "name": "been Bhatkar", "time": "10:34"},
   {"id": 7, "avatar": "images/profile-3.jpg", "name": "jonne deep", "time": "10:34"},
   {"id": 8, "avatar": "images/profile-5.jpg", "name": "full HD", "time": "10:34"},
   {"id": 9, "avatar": "images/profile-2.jpg", "name": "Pranav Bhatkar", "time": "10:34"},
   {"id": 10, "avatar": "images/profile-6.jpg", "name": "Pranav Bhatkar", "time": "10:34"},
   {"id": 11, "avatar": "images/profile-4.jpg", "name": "Pranav Bhatkar", "time": "10:34"},
   {"id": 12, "avatar": "images/profile-1.jpg", "name": "Pranav Bhatkar", "time": "10:34"},
  ];
  return (
    <>
      <div className="w-full h-[75px] px-5 flex justify-between">
          <div className="flex items-center">
            <img className="w-16 h-16 p-[2px] object-cover rounded-full border border-2 border-slate-400" src="images/profile-1.jpg" alt="avtar"/>
            <div className="ml-4">
              <h4 className="text-slate-700 text-lg">Tejas Bro</h4>
              <p className="text-gray-500 text-xs truncate w-48 text-ellipsis">Just Now</p>
            </div>
              <div className="flex justify-end">
                <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
              </div>
          </div>
        </div>
      <div className="w-full py-2">
        <h1 className="text-slate-600 text-sm ml-5">Resent Moments</h1>
      </div>
       {moments.map((moment)=>(
      <div className="w-full h-[75px] px-5 flex justify-between">
        <div className="flex items-center">
          <img className="w-16 h-16 p-[2px] object-cover rounded-full border border-2 border-slate-400" src={moment.avatar} alt="avtar" />
          <div className="ml-4">
            <h4 className="text-slate-700 text-lg">{moment.name}</h4>
            <p className="text-gray-500 text-xs mt-1 truncate w-48 text-ellipsis">{moment.time}</p>
          </div>
        </div>
      </div>
))}
    </>
  );
};

export default StatusTab;