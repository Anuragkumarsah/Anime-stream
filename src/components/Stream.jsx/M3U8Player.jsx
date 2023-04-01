import React, { useRef, useEffect } from "react";

const M3U8Player = ({ videoUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoUrl;
    }
  }, [videoUrl]);

  return (
    <div style={{height:"400px", width:"400px"}}>
      <video style={{height:"400px", width:"400px"}} onPlay={videoRef.current && console.log(videoRef.current.src)} controls >
        <source ref={videoRef} type="application/x-mpegURL" />
      </video>
    </div>
  );
};

export default M3U8Player;