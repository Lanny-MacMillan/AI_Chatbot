'use client'
import { useEffect, useRef, useState } from 'react'
import { Input, Button } from '@/components/ui'
import { useChat } from 'ai/react';
// import { ScrollArea } from '@/components/ui/scroll-area'
import CopyToClipboard from '@/components/copy-to-clipboard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SendHorizontalIcon } from 'lucide-react'
import PropagateLoader from "react-spinners/PropagateLoader";


export default function Chat() {
  const ref = useRef<HTMLDivElement>(null)
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


  useEffect(() => {
    if (ref.current === null) return
    ref.current.scrollTo(0, ref.current.scrollHeight)
  }, [messages])

  return (
    <section className='text-zinc-700'>
      <div className="container flex h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-600">
            Text Generation
        </h1>
        <div className="mt-4 w-full max-w-lg shadow-2xl">
          <div
            className=' h-[500px] whitespace-nowrap rounded-md border overflow-auto p-4 bg-[#ffffff] '
            ref={ref}
          >
            {messages.map(m => (
              isLoading ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <PropagateLoader color="#36d7b7" />
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
                      <div className='mt-1.5 text-sm text-zinc-500'>
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
                      <div className='mt-2 text-sm text-zinc-500'>
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
        <form onSubmit={handleSubmit} className='relative rounded-md w-full max-w-lg mt-10 shadow-2xl'>
            <Input
              name='message'
              value={input}
              onChange={handleInputChange}
              placeholder='Ask me anything...'
              className='pr-12 placeholder:italic placeholder:text-zinc-600/75 focus-visible:ring-zinc-500'
            />
            <Button
              size='icon'
              type='submit'
              variant='secondary'
              disabled={isLoading}
              className='absolute right-1 top-1 h-8 w-10'
            >
              <SendHorizontalIcon className='h-5 w-5 text-emerald-500' />
            </Button>
          </form>
      </div>
    </section>
  )
}