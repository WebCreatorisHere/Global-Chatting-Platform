"use client";
import { useState, useEffect } from "react";
import type { User, Channel as StreamChannel } from "stream-chat";
import Image from "next/image";
import { joinAndCapitalize } from "@/app/action/utilityfunctions";
import {
  useCreateChatClient,
  Chat,
  Channel,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import CustomChannelHeader from "./customchannelheader";

type Clerkuser = {
    usertoken: string;
    userid: string;
    fullname: string | null;
    img_url: string;
  }

const Chatcompo = ({
  clerkuser,
  slug,
}: { clerkuser: Clerkuser, slug: string; }) => {
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  const userId = clerkuser.userid;
  const userName = clerkuser.fullname || "Anonymous";
  const userToken = clerkuser.usertoken;
console.log("User Token in chatcompo:", userToken);
  const user: User = {
  id: userId,
  name: userName,
  image: clerkuser.img_url,
}

const [channel, setChannel] = useState<StreamChannel>();
const [Isdark, setIsdark] = useState<boolean>(true)
  const client = useCreateChatClient({
    apiKey:apiKey as string,
    tokenOrProvider: userToken,
    userData: user,
  })

  useEffect(() => {
    if (!client) return

    const channel = client.channel('messaging', slug, {
      image: `/imgs/${slug}.png`,
      name: joinAndCapitalize(slug.split('-')) + " Chat Room",
      members: [userId],
    });

    setChannel(channel);
  }, [client,slug,userId]);


const handleisdark = (value:boolean) => {
  setIsdark(value)
}

  if(!client) return <div className="w-screen h-screen bg-[#121214] gap-4 flex absolute flex-col justify-center items-center">
        <div className="bunnyhop w-32 -mb-2 "><img src="/imgs/discord.gif" alt="notfound" /></div>
        <div className="flex flex-col gap-2 w-[317px]">

        <h1 className="text-white font-bold text-center uppercase font-sans">
        Did you know?
        </h1>
        <p className="text-[#EFEFF0] text-[15px] text-center">Over 100 billion messages are sent daily on chat platforms worldwide.</p>
        </div>
  </div>;

  return (
    
    <Chat theme={Isdark?"str-chat__theme-dark":"str-chat__theme-light"} client={client}>
      <Channel channel={channel}>
        <Window>
          <CustomChannelHeader isdark={Isdark} setisdark={handleisdark} slug={slug} />
          {/* <ChannelHeader/> */}
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default Chatcompo;
