import * as React from "react";

const CameraTab = ({ camera }) => {
  const videoref = React.useRef(null);
    
  React.useEffect(() => {
    const getVideo = () => {
  navigator.mediaDevices
    .getUserMedia({
      video: {
        width: {
          min: 1280,
          ideal: 1920,
          max: 2560,
        },
        height: {
          min: 720,
          ideal: 1080,
          max: 1440
        },
        facingMode: camera
      }
    })
    .then(stream => {
      let video = videoref.current;
      video.pause();
      console.log(video)
      video.srcObject = null;
      video.srcObject = stream;
      video.play();
    })
    .catch(err => {
      console.error(err)
    })
}
getVideo();
  }, [videoref, camera]);
  return (
    <>
      <div className="flex h-screen w-full justify-center items-center">
        <video className="fixed top-0 left-0 h-screen w-full" ref={videoref}></video>
      </div>
    </>
  );
};

export default CameraTab;