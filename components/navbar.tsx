"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'


const Navbar = () => {
  const {user} = useUser()
  const pathname = usePathname();
  useEffect(() => {
    console.log(user)
  }, [user])
  if(pathname.startsWith('/forms/') || pathname.startsWith("/chat"))return
  return (
    <nav className='flex fixed z-[100] p-3 px-3 w-[90%] ml-[5%] translate-y-4 justify-between items-center rounded-full  bg-white/30 shadow-md backdrop-blur-lg'>
      <div className='w-14 flex items-center justify-center cursor-pointer relative'>
        <img src="/svgs/logo.svg" alt="Amazon" />
        <h1 className='absolute font-bold text-2xl font-serif text-slate-900 left-17'>Amazon</h1>
      </div>
      <ul className='flex gap-6 items-center justify-center font-medium text-[#333333]'>
        <li className='navallies'><Link href={"/"}>Home</Link></li>
        <li className='navallies'><Link href={"/"}>About us</Link></li>
        <li className='navallies'><Link href={"/chat"}>User Chat</Link></li>
        <li className='navallies'><Link href={"/forms"}>Global Chats</Link></li>
        <li className='navallies'><Link href={"/"}>Discover</Link></li>
      </ul>
<div className="bigb flex gap-3 items-center justify-center">

<div className='flex malabar items-center active:border-0 active:scale-y-90 active:scale-x-90 select-none border-r-4 border-b-4 hover:border-r-2 hover:border-b-2 origin-bottom-right hover:scale-x-95 hover:scale-y-95 transition-all justify-center relative right-4 cursor-pointer bg-amber-400 w-11 h-11 shadow-lg shadow-black/40 rounded-xl'>
  <Image width="30" height="30" src="/imgs/Hamburger.png" alt="hamburger" />
  <div className="absolute tooltip opacity-0 transition-all duration-500 w-39 bg-white rounded-full p-2 px-4 bottom-[-60px] right-10">
    <div className="circle1 absolute -top-2 -right-2 bg-white w-[20px] h-[20px] rounded-full shadow-xl"></div>
    <div className="circle2 absolute -top-3.5 -right-3.5 bg-white z-10 w-[10px] h-[10px] rounded-full shadow-xl"></div>
    <p>
      <span className='word-red'>Buy </span>
      <span className='word-orange'>me </span>
      <span className='word-green'>a </span>
      <span className='word-blue'>Burger!</span>
    </p>
  </div>
</div>

<div className="scale-140 flex items-center relative right-2 justify-center">
  {user && <UserButton />}
  {!user && <div className='bg-[#333333c5] rounded-full w-7 h-7 text-white flex items-center justify-center'><p>A</p></div>}
</div>
</div>
    </nav>
  )
}

export default Navbar
