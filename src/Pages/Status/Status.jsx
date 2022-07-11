import * as React from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const Status = () => {
  const topNavRef = React.useRef();
  const videoref = React.useRef(null);
  const handle = useFullScreenHandle();
  const [height, setHeight] = React.useState();
 const getHeight = () => {
     const newHeight = topNavRef.current.clientHeight;
     setHeight(newHeight);
       };
     React.useEffect(() => {
       getHeight();
       }, []);
    // React.useEffect(() => {
    //   const playvid = () =>{
    //   let video = videoref.current;
    //   video.play();
    //   }
    //   playvid()
    //   }, [height]);
  return (
    <>
      <div>

      <FullScreen handle={handle}>
          <div className="h-screen w-full bg-slate-300">
    <div ref={topNavRef} className={`flex justify-between items-center px-5 py-3 mb-[5px] bg-slate-200 rounded-b-[25px] shadow shadow-slate-400 transition-[1s]`}>
      <div className="flex items-center text-2xl">
        <ion-icon name="arrow-back-outline" ></ion-icon>
        <img className="w-8 h-8 ml-2 rounded-full object-cover shadow shadow-slate-400" src="../../images/profile-1.jpg" alt="avatar"/>
      </div>
      <h1 className="text-xl text-black font-bold transition-[0.5s]">Status</h1>
      <div className="text-xl flex">
        <ion-icon name="ellipsis-vertical"></ion-icon>
      </div>
    </div>
    <div className={`w-full h-[calc(100vh-${height}px)] px-4 py-2 overflow-y-scroll`}>
      <video autoPlay muted controls loop fullScreen className="" src="../../images/status-1.mp4" ref={videoref}></video>
    </div>
   </div>
      </FullScreen>
    </div>
    </>
  );
};

export default Status;