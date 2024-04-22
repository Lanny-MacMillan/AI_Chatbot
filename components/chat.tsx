'use client'
import { useEffect, useRef, useState } from 'react'
import { Input, Button } from '@/components/ui'
import { useChat } from 'ai/react';
import { motion, AnimatePresence } from 'framer-motion'
import CopyToClipboard from '@/components/copy-to-clipboard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SendHorizontalIcon } from 'lucide-react'
import PropagateLoader from "react-spinners/PropagateLoader";


export default function Chat() {
  const ref = useRef<HTMLDivElement>(null)
  const [ aiActive, setAiActive ] = useState<boolean>(true);
  const [ hover, setHover ] = useState<boolean>(false);
  // const [aiMood, setaiMood] = useState<string>({});

  // option to have chat spoken by Ai or text
  //  -pass in voices to be chosen by user if Ai spoken
  // pass in Ai model to be used


  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    initialMessages: [
      {
        id: Date.now().toString(),
        role: 'system',
        content: 'You are an assistant that gives detailed answers.'
      }
    ]
  });
  const onSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit(e);
    setAiActive(false)
  }

  useEffect(() => {
    if (ref.current === null) return
    ref.current.scrollTo(0, ref.current.scrollHeight)
  }, [messages])

  const standardClass = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 absolute right-1 top-1 h-9 w-12 bg-custom-purple-100 text-secondary-foreground h-10 w-10'

  const hoverClass = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 absolute right-1 top-1 h-9 w-12 bg-custom-teal-100 text-secondary-foreground h-10 w-10' 

  return (
    <div className="container flex flex-col items-center justify-center">
      <motion.h1
        className="bg-gradient-to-r from-custom-purple-600 to-custom-magenta-300 inline-block text-transparent bg-clip-text text-5xl font-customBlack  text-center xl:mt-4 xl:mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0}}
        transition={{ type: "spring", bounce: .7 }}
      >
            Text Generation
        </motion.h1>
        <div className="w-full max-w-lg shadow-2xl">
          <div
            className='lg:h-[24rem] 2xl:h-[70vh] whitespace-nowrap rounded-md border overflow-auto p-4 bg-mauve3'
            ref={ref}
          >
            {messages.map(m => (
              aiActive ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <PropagateLoader color="#5be9b9" />
                </div>
            ) : (
                <div key={m.id} className='mr-6 whitespace-pre-wrap'>
                {m.role === 'user' && (
                  <div className='mb-6 flex gap-3'>
                    <Avatar>
                      <AvatarImage src='' />
                      <AvatarFallback className='text-sm'>U</AvatarFallback>
                    </Avatar>
                    <div className='mt-1.5'>
                      <p className='font-semibold'>You</p>
                      <div className='mt-1.5 text-sm text-violet11'>
                        {m.content}
                      </div>
                    </div>
                  </div>
                )}

                {m.role === 'assistant' && (
                  <div className='mb-6 flex gap-3 '>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback className='bg-emerald-500 text-white'>
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className='mt-1.5 w-full'>
                      <div className='flex justify-between'>
                        <p className='font-semibold'>Bot</p>
                        <CopyToClipboard message={m} className='-mt-1' />
                      </div>
                      <div className='mt-2 text-sm text-violet11'>
                        {m.content}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              )
            ))}
          </div>


        </div>
        <form onSubmit={onSubmit} className='relative rounded-md w-full max-w-lg lg:mt-4 shadow-2xl'>
            <Input
              name='message'
              value={input}
              onChange={handleInputChange}
              placeholder='Ask me anything...'
              />
        <motion.button
          type='submit'
          disabled={isLoading}
          className={ hover ? hoverClass : standardClass }
          whileHover={{ scale: 1.4 }}
          transition={{ tpe: "spring", stiffness: 300 }}
          whileTap={{ scale: 1.7 }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          >
              <SendHorizontalIcon className={ hover ? 'h-5 w-5 text-custom-purple-500'  : 'h-5 w-5 text-custom-teal-500'}/>
            </motion.button>
          </form>
      </div>
  )
}