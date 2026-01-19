"use client"
import { useUser } from "@clerk/nextjs";
import {Userchatcompo} from "@/components/userchatcompo";

const Chat = () => {
  const { user , isLoaded} = useUser();
  const readystate = (isLoaded && user?.id && user?.publicMetadata?.usertoken) ? true: false
  if(!readystate || !user) return <div className="w-screen h-screen bg-[#121214] gap-4 flex absolute flex-col justify-center items-center">
        <div className="bunnyhop w-32 -mb-2 "><img src="/imgs/discord.gif" alt="notfound" /></div>
        <div className="flex flex-col gap-2 w-[317px]">

        <h1 className="text-white font-bold text-center uppercase font-sans">
        Did you know?
        </h1>
        <p className="text-[#EFEFF0] text-[15px] text-center">Over 100 billion messages are sent daily on chat platforms worldwide.</p>
        </div>
  </div>;
  
  return <Userchatcompo currentUser={user} />;
};

export default Chat;
