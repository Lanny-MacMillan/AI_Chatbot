'use client';
import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui';
import { useChat } from 'ai/react';
import { motion } from 'framer-motion';
import CopyToClipboard from '@/components/copy-to-clipboard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SendHorizontalIcon } from 'lucide-react';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { hoverClass, standardClass } from '@/public/constants';

export default function Chat() {
  const ref = useRef<HTMLDivElement>(null);
  const [aiActive, setAiActive] = useState<boolean>(true);
  const [hover, setHover] = useState<boolean>(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      initialMessages: [
        {
          id: Date.now().toString(),
          role: 'system',
          content: 'You are an assistant that gives detailed answers.',
        },
      ],
    });
  const onSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit(e);
    setAiActive(false);
  };

  useEffect(() => {
    if (ref.current === null) return;
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);

  return (
    <div className="container flex flex-col items-center justify-center  ">
      <div className="flex flex-row ">
        <motion.p
          className="bg-gradient-to-r from-custom-purple-600 to-custom-magenta-300 inline-block text-transparent bg-clip-text text-4xl lg:text-5xl font-customBlack text-center mt-8 2xl:mt-16 3xl:mt-20 mb-8 pb-3"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.7 }}
        >
          Text
        </motion.p>

        <motion.p
          className="bg-gradient-to-r from-custom-magenta-300 to-custom-magenta-300 inline-block text-transparent bg-clip-text text-4xl lg:text-5xl font-customBlack  text-center mt-8  3xl:mt-20 mb-8 ml-4 ml-4 pb-3"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ delay: 0.5, type: 'spring', bounce: 0.7 }}
        >
          {' '}
          Generation
        </motion.p>
      </div>
      <motion.div
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 0, opacity: 0 }}
        transition={{ delay: 1.5, duration: 1, type: 'tween' }}
        className="w-full max-w-lg"
      >
        <div
          className="lg:h-[60vh] h-[60vh] whitespace-nowrap rounded-md overflow-auto p-4 bg-gradient-to-t from-mauve3 to-transparent"
          ref={ref}
        >
          {messages.map((m) =>
            aiActive ? (
              <div className="flex flex-col items-center justify-center h-full">
                <PropagateLoader color="#bc3ed3" />
              </div>
            ) : (
              <div key={m.id} className="mr-6 whitespace-pre-wrap">
                {m.role === 'user' && (
                  <div className="mb-6 flex gap-3">
                    <Avatar>
                      <object
                        className="aspect-square h-full w-full"
                        type="image/svg+xml"
                        data="/smallToolbox.svg"
                      >
                        small-logo-svg
                      </object>
                      <AvatarFallback className="text-sm">U</AvatarFallback>
                    </Avatar>
                    <div className="mt-1.5">
                      <p className="font-semibold">You</p>
                      <div className="mt-1.5 text-sm text-violet11">{m.content}</div>
                    </div>
                  </div>
                )}

                {m.role === 'assistant' && (
                  <div className="mb-6 flex gap-3 ">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback className="bg-emerald-500 text-white">
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className="mt-1.5 w-full">
                      <div className="flex justify-between">
                        <p className="font-semibold">Bot</p>
                        <CopyToClipboard message={m} className="-mt-1" />
                      </div>
                      <div className="mt-2 text-sm text-violet11">{m.content}</div>
                    </div>
                  </div>
                )}
              </div>
            ),
          )}
        </div>
      </motion.div>
      <motion.form
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ delay: 1, duration: 0.5, type: 'tween' }}
        onSubmit={onSubmit}
        className="relative rounded-md w-full max-w-lg lg:mt-4 shadow-2xl"
      >
        <Input
          name="message"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
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
    </div>
  );
}
