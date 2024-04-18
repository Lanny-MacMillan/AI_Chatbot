"use client";
// import audiomp3 from '../../../public/0I'
import audio from '@/public/audio/audio.mp3'
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import {
  BsFillStopFill,
  BsFillPlayFill,
  BsSkipForward,
  BsSkipBackward,
} from "react-icons/bs";

const Wavesurfer = ({audio}: any) => {
  const waveformRef = useRef(null);
  
  let wavesurfer: any;

  // const [playPause, setPlayPause] = useState();
  
  useEffect(() => {
    wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: "#34374B",
      progressColor: "#F90",
      url: audio,
      dragToSeek: true,
      width: "35vw",
      hideScrollbar: true,
      normalize: true,
      barGap: 1,
      height: 60,
      barHeight: 20,
      barRadius: 20,
      barWidth: 5,
    });


    wavesurfer.on("finish", () => {
      console.log("song finished");
    });

    wavesurfer.on("ready", () => {
      console.log("Waveform is ready");
    });
    return () => {
      wavesurfer.destroy();
    };
  }, [audio]);

  const handleStop = () => {
    if (wavesurfer) {
      wavesurfer.stop();
    }
  };
  const handlePause = () => {
    if (wavesurfer) {
      wavesurfer.playPause();
    }
  };

  const handleSkipForward = () => {
    if (wavesurfer) {
      wavesurfer.skip(2);
    }
  };
  const handleSkipBack = () => {
    if (wavesurfer) {
      wavesurfer.skip(-2);
    }
  };

  return (
    <div className="container">
      <div className="sub-container">
        <div ref={waveformRef}  id="waveform" className="wavesurfer-container" />
        <div className="wavesurfer-controls">
          <button onClick={handleSkipBack}>
            <BsSkipBackward />
          </button>
          <button onClick={handlePause}>
            <BsFillPlayFill />
          </button>
          <button onClick={handleStop}>
            <BsFillStopFill />
          </button>
          <button onClick={handleSkipForward}>
            <BsSkipForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wavesurfer;