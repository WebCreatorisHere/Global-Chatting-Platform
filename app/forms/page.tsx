"use client"
import React from 'react'

import { useRouter } from 'next/navigation'

type forums = {
    title: string,
    img_url: string,
    slug:string,
    description: string
}
const content: forums[] = [
  {
    "title": "Reddit",
    "slug": "reddit",
    "img_url": "/imgs/reddit.png",
    "description": "A massive network of communities where people can dive into their interests, hobbies, etc."
  },
  {
    "title": "Discord",
    "slug": "discord",
    "img_url": "/imgs/discord.png",
    "description": "Voice, video, and text chat platform designed for creating communities."
  },
  {
    "title": "Stack Overflow",
    "slug": "stack-overflow",
    "img_url": "/imgs/stack-overflow.png",
    "description": "The largest online community for programmers to share knowledge and build careers."
  },
  {
    "title": "Quora",
    "slug": "quora",
    "img_url": "/imgs/quora.png",
    "description": "Discuss about People and newly launched tech. It Covers topics from science to personal advice."
  },
  {
    "title": "4chan",
    "slug": "4chan",
    "img_url": "/imgs/4chan.png",
    "description": "it is known for its influential internet culture and meme creation."
  },
  {
    "title": "XDA Forums",
    "slug": "xda",
    "img_url": "/imgs/xda.png",
    "description": "Mobile software development community focused on Android development."
  },
  {
    "title": "Hacker News",
    "slug": "hacker-news",
    "img_url": "/imgs/hacker-news.png",
    "description": "Social news website focusing on computer science, entrepreneurship, and technology."
  },
  {
    "title": "ResetEra",
    "slug": "resetera",
    "img_url": "/imgs/resetera.png",
    "description": "Gaming and entertainment discussion forum for video games, movies, and technology."
  }
]

const Forum = () => {
  const router = useRouter()
  return (
    <div className='bg-gradient-to-br from-gray-900 via-cyan-950 to-gray-900 mx-auto  pt-28'>
      <h1 className='font-bold mx-auto text-3xl w-fit my-6 bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-transparent'>Discussion Forums</h1>
      <div className="formus flex flex-wrap gap-6 justify-center items-stretch p-4">
  {content.map((item, index) => {
    return (
      <div 
        className='group text-white h-auto min-h-[260px] rounded-2xl w-full sm:w-[45%] lg:w-[30%] flex justify-start items-center gap-4 flex-col p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 hover:bg-gray-800/80 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1' 
        key={index}
      >
        <div className="w-20 h-20 flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 group-hover:border-cyan-500/40 transition-all duration-300">
          <img 
            width={60} 
            height={60} 
            src={item.img_url} 
            alt={item.title}
            className="object-contain"
          />
        </div>
        
        <h2 className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 group-hover:from-cyan-300 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300'>
          {item.title}
        </h2>
        
        <p className='text-sm text-gray-400 text-center leading-relaxed group-hover:text-gray-300 transition-colors duration-300'>
          {item.description}
        </p>
        
        <button onClick={()=>router.push(`/forms/${item.slug}`)} className='mt-auto cursor-pointer relative overflow-hidden px-6 py-2.5 rounded-lg font-semibold text-sm bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 active:scale-95 before:absolute before:inset-0 before:bg-white/20 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700'>
          Discuss Now!
        </button>
      </div>
    )
  })}
</div>
    </div>
  )
}

export default Forum
