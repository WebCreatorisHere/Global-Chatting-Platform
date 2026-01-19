import { NextResponse } from "next/server";
import { StreamChat } from "stream-chat";
import { currentUser } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/nextjs/server";

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string || "";
  const apiSecret = process.env.STREAM_SECRET as string || "";
  const curruser = await currentUser()
  const clerkclient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
  if (!curruser) {
    return NextResponse.json(
      { error: "userid and frienduserid are required" },
      { status: 400 }
    );
  }
  const chatClient = StreamChat.getInstance(apiKey, apiSecret);

  const channels = await chatClient.queryChannels(
    { type: "messaging", members: { $in: [curruser.id] } },
    { last_message_at: -1 },
    { limit: 50 }
  )
  const slugs: string[] = ["reddit", "discord", "stack-overflow", "quora", "4chan", "xda", "hacker-news", "resetera"]
  const orichannels = await Promise.all(channels.map(async channel => {
   
    if(!slugs.includes(channel.id || "")){
      
      const requserid = Object.keys(channel.state.members).find((id)=> id !== curruser.id)
      let oridata = {}
      let orilastMessage:{
        text?:string,
        userid?: string,
        status?: string,
        attachmenttype?:string | null
      }|null
        const requuser = await clerkclient.users.getUser(requserid||"")
         oridata = {
          imageurl: requuser.imageUrl,
          username: requuser.fullName,
          
        }

       if(channel.state.last_message_at){
         const lastmessageobj = channel.state.messages[channel.state.messages.length -1] 
        const otheruserlastactivetime = channel.state.read[requuser.id].last_read
        let stats:string
        if(otheruserlastactivetime >= channel.state.last_message_at){
          stats = "seen"
        }
        else{
          stats = "delivered"
          
        }
        orilastMessage = {
    text: lastmessageobj.text,
    userid: lastmessageobj.user?.id, 
    status: stats,
    attachmenttype: (lastmessageobj.attachments && lastmessageobj.attachments.length>0) ? lastmessageobj.attachments[0].type : null
  }
  return {
   id: channel.id,
   cid: channel.cid,
   type: channel.type,
   members: Object.keys(channel.state.members),
   lastMessageAt: channel.state.last_message_at,
   lastMessage: orilastMessage ,
   unreadCount: channel.countUnread(),
   created_at: channel?.data?.created_at,
   updated_at: channel?.data?.updated_at,
   data: oridata
 }
  
}
  
      
      return {
   id: channel.id,
   cid: channel.cid,
   type: channel.type,
   members: Object.keys(channel.state.members),
   lastMessageAt: channel.state.last_message_at,
   lastMessage: null ,
   unreadCount: channel.countUnread(),
   created_at: channel?.data?.created_at,
   updated_at: channel?.data?.updated_at,
   data: oridata
 }
    }
    else return null
  }))


  return NextResponse.json({
    channels: orichannels.filter((ch) => ch !== null)
  })
}