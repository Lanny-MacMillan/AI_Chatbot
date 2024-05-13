'use client';

import React, { useEffect, useState, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import {
  BsFillStopFill,
  BsFillPlayFill,
  BsFillPauseFill,
  BsSkipForward,
  BsSkipBackward,
} from 'react-icons/bs';

const Wavesurfer = ({ audio, pause, setPause }: any) => {
  const waveformRef = useRef(null);
  let wavesurfer: any;

  useEffect(() => {
    wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#6e56cf',
      progressColor: '#141c3a30',
      url: audio,
      dragToSeek: true,
      width: '50vw',
      hideScrollbar: true,
      normalize: true,
      barGap: 1,
      height: 60,
      barHeight: 20,
      barRadius: 20,
      barWidth: 5,
    });

    wavesurfer.on('finish', () => {
      console.log('audio complete');
    });

    wavesurfer.on('ready', () => {
      console.log('Waveform is ready');
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
        <div ref={waveformRef} id="waveform" className="wavesurfer-container" />
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
