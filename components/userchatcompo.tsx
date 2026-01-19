"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { User } from "stream-chat";
import { useUser } from "@clerk/nextjs";
import Requestssection from "./requestssection";
import type { userobject } from "@/app/definedtypes";
import { isoconverter } from "@/app/action/utilityfunctions";
import type { Channel as StreamChannel } from "stream-chat";
import {
  useCreateChatClient,
  Chat,
  Channel,
  MessageInput,
  MessageList,
  Thread,
  Window,
  TypingIndicator,
  
} from "stream-chat-react";


import UserChannelHeader from './userchannelheader';


type ClerkUser = NonNullable<ReturnType<typeof useUser>["user"]>;
type channaldata = {
  id: string;
  cid: string;
  type: string;
  members: string[];
  lastMessageAt: string | null;
  lastMessage: {
    text: string,
    userid: string, 
    status: string,
    attachmenttype: string | null
  } | null;
  unreadCount: number;
  created_at: string;
  updated_at: string;
  data: {
    imageurl?: string;
    username?: string;
  };
};

export const Userchatcompo = ({ currentUser }: { currentUser: ClerkUser }) => {
  const [query, setquery] = useState("");
  const [searchresults, setsearchresults] = useState<userobject[]>([]);
  const [allusers, setallusers] = useState<userobject[]>([]);
  const [chats, setchats] = useState<channaldata[]>([]);
  const [currchat, setcurrchat] = useState<StreamChannel>()
  const router = useRouter();
  const [loadstate, setloadstate] = useState(true)

  const queryhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setquery(e.target.value);
    if (allusers.length === 0) return;
    const filteredresults = allusers.filter(
      (user) =>
        (user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          user.email.toLowerCase().includes(e.target.value.toLowerCase())) &&
        user.email.toLowerCase() !==
          currentUser?.emailAddresses[0]?.emailAddress?.toLowerCase()
    );
    setsearchresults(filteredresults);
  };

  const sendrequest = async (userid: string | undefined) => {
    if (!userid) return;
    const usermatch = searchresults.find((user) => user.id === userid);
    if (usermatch?.status === "pending" || usermatch?.status === "friend")
      return;
    setsearchresults(
      searchresults.map((user) => {
        if (user.id === userid) {
          return { ...user, status: "pending" };
        } else return user;
      })
    );
    await fetch("/api/sendfriendrequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentuserid: currentUser?.id,
        frienduserid: userid,
      }),
    });
  };

  const activator = (
    e: React.MouseEvent<HTMLButtonElement>,
    locator: string
  ) => {
    const element = e.target;
    if (!element) return;
    if (element instanceof HTMLButtonElement) {
      const alleles = element.parentElement?.children;
      if (!alleles) return;
      for (let index = 0; index < alleles.length; index++) {
        const tata = alleles[index];
        if (tata == element) tata.classList.add("activated");
        else tata.classList.remove("activated");
      }
    }
    if (element instanceof HTMLImageElement) {
      const alleles = element?.parentElement?.parentElement?.children || [];
      for (let index = 0; index < alleles.length; index++) {
        const lala = alleles[index];
        if (lala == element.parentElement) lala.classList.add("activated");
        else lala.classList.remove("activated");
      }
    }

    const requiobj = document.querySelector(`.${locator}`) as HTMLDivElement;

    if (!requiobj) return;
    if (requiobj.classList.contains("hider")) requiobj.classList.remove("hider");
    if (locator != "requestsection") {
      const a = document.querySelector(`.requestsection`) as HTMLDivElement;
      if (!a) return;
      if (!a.classList.contains("hider")) a.classList.add("hider");
    }
    if (locator != "discovery") {
      const a = document.querySelector(`.discovery`) as HTMLDivElement;
      if (!a) return;
      if (!a.classList.contains("hider")) a.classList.add("hider");
    }
  };

  const channelhandler = async(utlilitychannel: channaldata)=>{
    if(!client) return
    const channel = client.channel("messaging", utlilitychannel.id, {
          image: utlilitychannel.data.imageurl,
          name: utlilitychannel.data.username,
          members: utlilitychannel.members,
        })
await channel.watch();

      setcurrchat(channel)
  }

  const user: User = {
    id: currentUser?.id as string,
    name: currentUser?.fullName as string,
    image: currentUser?.imageUrl as string,
  };

  const client = useCreateChatClient({
    apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY as string,
    tokenOrProvider: currentUser.publicMetadata.usertoken as string,
    userData: user,
  });

  useEffect(() => {
    const loadpreferences = async () => {
      await fetch("/chatinfo/users")
        .then((res) => res.json())
        .then((data) => {
          const modifiedusers = data.alldata.map((user: userobject) => {
            return {
              ...user,
              lastactive: isoconverter(user.lastactive),
            };
          });
          setallusers(modifiedusers);
        });
    };

    loadpreferences();
  }, []);

  useEffect(() => {
    if (!client) return;
    const loadchannels = async () => {
      setloadstate(true)
      const hakak = await fetch("/chatinfo/channels");
      const reska = await hakak.json();
      setloadstate(false)
      setchats(reska.channels);
    };
    loadchannels();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleNewMessage = (event: any) => {
  const { cid, message } = event;

  setchats(prevChats =>
    prevChats.map(chat => {
      if (cid === chat.cid) {
        return {
          ...chat,
          lastMessageAt: message.created_at,
          lastMessage: {
            text: message.text,
            userid: message.user.id,
            status: "delivered",
            attachmenttype:
              message.attachments?.length > 0
                ? message.attachments[0].type
                : null,
          },
        };
      }
      return chat;
    })
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleMessageRead = (event: any) => {
  const { cid, user } = event;

  setchats(prevChats =>
    prevChats.map(chat => {
      if (cid === chat.cid && chat.lastMessage) {
        return {
          ...chat,
          lastMessage: {
            ...chat.lastMessage,
            status:
              user.id !== currentUser.id
                ? "seen"
                : chat.lastMessage.status,
          },
        };
      }
      return chat;
    })
  );
};

client.on("message.new", handleNewMessage);
client.on("message.read", handleMessageRead);

  return () => {
    client.off("message.new", handleNewMessage);
    client.off("message.new", handleMessageRead);
  };
  }, [client, currentUser.id]);

  return (
    <div className="bg-[#202020] text-white pt-3 w-screen h-screen flex">
      <div className="header flex-col z-[100] justify-between items-center h-full relative flex w-[4%]">
        <div className="uppers flex flex-col gap-1 items-center">
          <button
            onClick={() => router.push("/")}
            className="select-none transition-all p-2 cursor-pointer rounded-md px-2.5 hover:bg-[#2d2d2d] w-fit mb-2"
          >
            <img className="w-5" src="/svgs/back.svg" alt="hamburger" />
          </button>
          <button
            onClick={(e) => {
              activator(e, "hamburg");
            }}
            className="select-none transition-all p-2 cursor-pointer rounded-md px-2.5 hover:bg-[#2d2d2d] w-fit"
          >
            <img className="w-5" src="/svgs/optionburger.svg" alt="hamburger" />
          </button>
          <button
            onClick={(e) => {
              activator(e, "chatting");
            }}
            className="select-none transition-all p-2 cursor-pointer rounded-md px-2.5 hover:bg-[#2d2d2d] w-fit activated"
          >
            <img className="w-5" src="/svgs/chat.svg" alt="hamburger" />
          </button>
          <button
            onClick={(e) => {
              activator(e, "discovery");
            }}
            className="select-none transition-all p-2 cursor-pointer rounded-md px-2.5 hover:bg-[#2d2d2d] w-fit"
          >
            <img className="w-5" src="/svgs/discover.svg" alt="hamburger" />
          </button>
          <button
            onClick={(e) => {
              activator(e, "requestsection");
            }}
            className="select-none transition-all p-2 cursor-pointer rounded-md px-2.5 hover:bg-[#2d2d2d] w-fit"
          >
            <img className="w-5" src="/svgs/sent.svg" alt="hamburger" />
          </button>
          <div className="seperator w-[70%] my-2.5 rounded-full mx-auto h-[1px] bg-[#313131]"></div>
        </div>

        <div className="middles">hi</div>
        <div className="lowers flex flex-col gap-1 pb-2 items-center">
          <div className="seperator w-[70%] my-2.5 rounded-full mx-auto h-[1px] bg-[#313131]"></div>
          <button className=" p-2.5 cursor-pointer rounded-md px-2.5 hover:bg-[#2d2d2d] w-fit">
            <img className="w-5" src="/svgs/settings.svg" alt="hamburger" />
          </button>
          <button className=" p-1 flex items-center justify-center cursor-pointer rounded-md px-1.5 hover:bg-[#2d2d2d] w-fit">
            <UserButton />
          </button>
        </div>
      </div>

      <div className="maincontent relative overflow-hidden bg-[#2c2c2c] w-[96%] flex rounded-tl-lg ">
        <div className="w-[30%] bg-[#161717] border border-[#343535] panel max-h-full rounded-tl-lg ">
          <div className="information">
            <div className="option flex justify-between px-5 py-3 items-center">
              <h1 className="text-2xl font-semibold">Chats</h1>
              <button
                onClick={() => {
                  const obja = document.querySelector(
                    ".search"
                  ) as HTMLDivElement;
                  const inputa = obja.children[1] as HTMLInputElement;
                  if (!obja) return;
                  inputa.focus();
                  obja.click();
                }}
                className="p-2 cursor-pointer transition-colors rounded-full px-2.5 hover:bg-[#2d2d2d] w-fit"
              >
                <img
                  className="w-6.5 min-h-6.5"
                  src="/svgs/newchat.svg"
                  alt="newchat"
                />
              </button>
            </div>

            <div
              onClick={() => {
                const element = document.body.querySelector(
                  ".search"
                ) as HTMLDivElement;
                const inputa = element.children[1] as HTMLInputElement;
                inputa.focus();
                element.style.borderColor = "#21c063";
              }}
              onBlur={() => {
                const element = document.body.querySelector(
                  ".search"
                ) as HTMLDivElement;
                element.style.borderColor = "transparent";
                const inputa = element.children[1] as HTMLInputElement;
                inputa.blur();
              }}
              className="border-[2px] border-transparent search transition-all h-fit flex items-center justify-center mx-[18px] my-1"
            >
              <button className="bg-[#2d2e2e] px-4 pr-3.5 rounded-tl-full rounded-bl-full py-3 pt-[11.3px]">
                <img className="w-5.5" src="svgs/search.svg" alt="search" />
              </button>
              <input
                onChange={queryhandler}
                value={query}
                autoComplete="off"
                id="query"
                className="bg-[#2d2e2e] py-[9px] w-full rounded-tr-full outline-0 rounded-br-full"
                placeholder="Search name or email"
                type="text"
              />
            </div>

            <div className="filters flex gap-2 my-3 mx-5 items-center justify-start">
              <button className="filter border-[1px] rounded-full p-3 py-1 text-sm activatedfilter">
                All
              </button>
              <button className="filter border-[1px] rounded-full p-3 py-1 text-sm">
                Unread
              </button>
              <button className="filter border-[1px] rounded-full p-3 py-1 text-sm">
                Favorites
              </button>
            </div>
          </div>

          {chats.length > 0 && query === "" && (
            <div className="chats px-3 flex gap-1 flex-col max-h-[calc(100vh-183px)] overflow-y-scroll">
              {chats.map((chat, index) => {
                const sameusermessage = currentUser.id == chat.lastMessage?.userid ? true : false
                return (
                  <div
                    key={index}
                    onClick={()=>channelhandler(chat)}
                    className="chat p-3 hover:bg-[#2d2e2e] cursor-pointer rounded-xl w-full flex gap-3.5"
                  >
                    <div className="profilepic w-[15%]">
                      <img
                        className="rounded-full"
                        src={chat.data.imageurl || ""}
                        alt={chat.data.username || ""}
                      />
                    </div>

                    <div className="info w-[85%]">
                      <div className="organic-info flex justify-between items-center w-full">
                        <div className="name">{chat.data.username}</div>
                        <div className="lastmessagetiming text-[#ababab] text-xs">
                          {(chat.lastMessageAt?new Date(chat.lastMessageAt).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            }):false) ||
                            new Date(chat.created_at).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                        </div>
                      </div>

                      <div className="lastmessage text-[#ababab] flex items-center justify-start gap-0.5 text-sm">
                        {(sameusermessage && chat.lastMessage?.status == "seen" ) && <img src="svgs/seen.svg" className="w-5" alt="seen" />}
                        {(sameusermessage && chat.lastMessage?.status == "delivered" ) && <img src="svgs/delivered.svg" className="w-5" alt="delivered" />}
                        {chat.lastMessage?.attachmenttype && <img src={`svgs/${chat.lastMessage.attachmenttype}.svg`} className="w-5" alt={chat.lastMessage.attachmenttype} />}
                        <p>{chat.lastMessage?.text || "No message yet"}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {loadstate && (
  <div className="searchresults flex flex-col gap-4 justify-center items-center h-[calc(100vh-183px)]">
    <div className="loader" />

    <h1 className="text-lg font-medium text-white/90">
      Searching…
    </h1>

    <p className="text-center text-sm text-[#ababab] w-[70%]">
      Looking for chats. This won’t take long.
    </p>
  </div>
)}

          {(chats.length && query === "") === 0 && (
            <div className="nochats flex flex-col gap-3 justify-center items-center h-[calc(100vh-183px)]">
              <img className="w-22" src="/svgs/nocontact.svg" alt="nocontact" />
              <h1 className="text-lg">No Chats yet</h1>
              <p className="text-center text-sm text-[#ababab] w-[70%]">
                Your recent chats will appear here. Start a new chat by clicking
                the new chat button.
              </p>
            </div>
          )}

          {query !== "" && searchresults.length === 0 && (
            <div className="searchresults flex flex-col gap-3 justify-center items-center h-[calc(100vh-183px)]">
              <img
                className="w-18"
                src="/svgs/noresult.svg"
                alt="nosearchresult"
              />
              <h1 className="text-lg">No Results Found</h1>
              <p className="text-center text-sm text-[#ababab] w-[70%]">
                We couldn&apos;t find any matches for &ldquo;{query}&ldquo;. Please try different
                keywords.
              </p>
            </div>
          )}

          {query !== "" && searchresults.length > 0 && (
            <div className="px-3 flex gap-1 flex-col max-h-[calc(100vh-183px)] overflow-y-scroll">
              {searchresults.map((result, index) => {
                return (
                  <div
                    onClick={() => sendrequest(result.id)}
                    key={index}
                    className="chat p-3 hover:bg-[#2d2e2e] cursor-pointer rounded-xl w-full flex gap-3.5"
                  >
                    <div className="profilepic w-[15%]">
                      <img
                        className="rounded-full"
                        src={result.profilepic}
                        alt={result.name}
                      />
                    </div>

                    <div className="info w-[85%] flex justify-between items-center">
                      <div className="organic-info flex flex-col justify-between items-start w-full">
                        <div className="name">{result.name}</div>
                        <div className="lastmessagetiming text-[#ababab] text-xs">
                          Last active : {result.lastactive}
                        </div>
                      </div>

                      <div className="lastmessage text-[#ababab] flex items-center justify-start gap-0.5 text-sm">
                        {result.status == "friend" && (
                          <img
                            src="svgs/friend.svg"
                            className="w-10"
                            alt="addfriend"
                          />
                        )}
                        {result.status == "pending" && (
                          <img
                            src="svgs/pending.svg"
                            className="w-10"
                            alt="addfriend"
                          />
                        )}
                        {result.status == "anonymous" && (
                          <img
                            src="svgs/add-friend.svg"
                            className="w-10"
                            alt="addfriend"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <Requestssection allusers={allusers} />
        <div className="discovery hidden relative hider">hi </div>
        {client && <div className="chatting w-[70%]">
          <Chat client={client}>
      <Channel channel={currchat}>
        <Window>
          <UserChannelHeader isdark={true} importantdata={allusers.find(user=>user.id == chats.find(chat=>chat.cid == currchat?.cid)?.members.find(id=>id!=currentUser.id))}/>
          <MessageList />
          <TypingIndicator />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
    </div>}
      </div>
    </div>
  );
};
