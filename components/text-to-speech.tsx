'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { SendHorizontalIcon } from 'lucide-react';
import Wavesurfer from './ui/wavesurfer/wavesurfer';
import { Input, SelectAudio, SelectModel, SelectVoice } from '@/components/ui';

export default function Speech() {
  const [input, setInput] = useState<string>('');
  const [audio, setAudio] = useState<any>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [voice, setVoice] = useState<string>('alloy');
  const [model, setModel] = useState<string>('tts-1');
  const [downloadAudio, setDownloadAudio] = useState<string>('false');
  const [pause, setPause] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);

  const standardClass =
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 absolute right-1 top-1 h-9 w-12 bg-custom-purple-100 text-secondary-foreground h-10 w-10';

  const hoverClass =
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 absolute right-1 top-1 h-9 w-12 bg-custom-teal-100 text-secondary-foreground h-10 w-10';

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setInput(newValue);
  };

  const handleSubmitDownload = async (e: any) => {
    e.preventDefault();
    setAudio('');

    try {
      setIsLoading(true);

      const response = await fetch('/api/textToSpeech', {
        body: JSON.stringify({ input, voice, model }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Error generating audio');

      toast.success('Audio generated successfully!');

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'vision.mp3');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAudio = async (e: any) => {
    e.preventDefault();
    setAudio('');
    try {
      setIsLoading(true);

      const response = await fetch('/api/textToSpeech', {
        body: JSON.stringify({ input, voice, model }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Error generating audio');

      toast.success('Audio generated successfully!');

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      setAudio(downloadUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className=" container flex w-screen flex-col items-center justify-around">
        <div className="flex flex-row ">
          <motion.p
            className="bg-gradient-to-r from-custom-purple-600 to-custom-magenta-300 inline-block text-transparent bg-clip-text text-4xl lg:text-5xl font-customBlack  text-center mt-16 3xl:mt-20 mb-16"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.7 }}
          >
            {'Text '}
          </motion.p>

          <motion.p
            className="bg-gradient-to-r from-custom-magenta-300 to-custom-magenta-300 inline-block text-transparent bg-clip-text text-4xl lg:text-5xl font-customBlack text-center mt-16 3xl:mt-20 mb-16 mr-4 ml-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ delay: 0.5, type: 'spring', bounce: 0.7 }}
          >
            {' '}
            to
          </motion.p>
          <motion.p
            className="bg-gradient-to-r from-custom-magenta-300 to-custom-purple-500 inline-block text-transparent bg-clip-text text-4xl lg:text-5xl font-customBlack text-center mt-16 3xl:mt-20 mb-16"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ delay: 1, type: 'spring', bounce: 0.7 }}
          >
            {' '}
            Speech
          </motion.p>
        </div>
        <div className="w-full max-w-lg ">
          {audio ? (
            <div className="mt-24">
              <Wavesurfer
                className="lg:mt-16"
                audio={audio}
                pause={pause}
                setPause={setPause}
              />
            </div>
          ) : (
            <div className="h-44 mt-24" />
          )}

          <motion.form
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ delay: 3.5, duration: 1, type: 'spring', bounce: 0.7 }}
            onSubmit={
              downloadAudio === 'true' ? handleSubmitDownload : handleSubmitAudio
            }
            className="relative rounded-md w-full max-w-lg mt-32 shadow-2xl"
          >
            <Input
              name="message"
              onChange={onChange}
              placeholder="What would you like me to say?..."
            />
            <motion.button
              type="submit"
              disabled={isLoading || input.length === 0}
              className={hover ? hoverClass : standardClass}
              whileHover={{ scale: 1.4 }}
              transition={{ tpe: 'spring', stiffness: 300 }}
              whileTap={{ scale: 1.7 }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <SendHorizontalIcon
                className={
                  hover
                    ? 'h-5 w-5 text-custom-purple-500'
                    : 'h-5 w-5 text-custom-teal-500'
                }
              />
            </motion.button>
          </motion.form>
          <div className=" flex flex-row justify-between mt-8 mb-8">
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{ delay: 2, duration: 0.5, type: 'tween' }}
            >
              <SelectVoice setVoice={setVoice} />
            </motion.div>
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{ delay: 2.5, duration: 0.5, type: 'tween' }}
            >
              <SelectModel setModel={setModel} />
            </motion.div>
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{ delay: 3, duration: 0.5, type: 'tween' }}
            >
              <SelectAudio setDownloadAudio={setDownloadAudio} />
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
