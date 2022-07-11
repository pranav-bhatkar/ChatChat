import React from "react";
import CallsItem from '../../../components/chatstab/CallsItem';

const CallsTab = () => {
  const calls = [
   {"id": 0, "avatar": "images/profile-1.jpg", "name": "Pranav Bhatkar", "type":"recived", "callType":"voice", "time": "10:34"},
   {"id": 1, "avatar": "images/profile-2.jpg", "name": "Priti Bhatkar", "type":"missed", "callType":"voice", "time": "10:34"},
   {"id": 2, "avatar": "images/profile-3.jpg", "name": "Roshan Shah", "type":"called", "callType":"video", "time": "10:34"},
   {"id": 3, "avatar": "images/profile-4.jpg", "name": "r", "type":"recived", "callType":"voice", "time": "10:34"},
   {"id": 4, "avatar": "images/profile-5.jpg", "name": "gjj Bhatkar", "type":"called", "callType":"video", "time": "10:34"},
   {"id": 5, "avatar": "images/profile-6.jpg", "name": "nel Bhatkar", "type":"missed", "callType":"video", "time": "10:34"},
   {"id": 6, "avatar": "images/profile-1.jpg", "name": "been Bhatkar", "type":"recived", "callType":"voice", "time": "10:34"},
   {"id": 7, "avatar": "images/profile-3.jpg", "name": "jonne deep", "type":"called",  "callType":"video","time": "10:34"},
   {"id": 8, "avatar": "images/profile-5.jpg", "name": "full HD", "type":"recived", "callType":"voice", "time": "10:34"},
   {"id": 9, "avatar": "images/profile-2.jpg", "name": "Pranav Bhatkar", "type":"called", "callType":"video", "time": "10:34"},
   {"id": 10, "avatar": "images/profile-6.jpg", "name": "Pranav Bhatkar", "type":"missed", "callType":"video", "time": "10:34"},
   {"id": 11, "avatar": "images/profile-4.jpg", "name": "Pranav Bhatkar", "type":"called", "callType":"voice", "time": "10:34"},
   {"id": 12, "avatar": "images/profile-1.jpg", "name": "Pranav Bhatkar", "type":"recived", "callType":"video", "time": "10:34"},
  ];
  return (
    <>
    {calls.map((call)=>(
     <CallsItem call={call} />
     ))}
    </>
  );
};

export default CallsTab;