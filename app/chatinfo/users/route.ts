import { NextResponse } from 'next/server';
import { createClerkClient } from '@clerk/nextjs/server';
import { StreamChat } from 'stream-chat';
import { currentUser } from '@clerk/nextjs/server';


export async function GET() {
  const clerkclient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
  const api_key = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
  const api_secret = process.env.STREAM_SECRET as string;
  if (!api_key || !api_secret) {
    return NextResponse.json({ error: "Missing keys" }, { status: 500 });
  }
  const serverClient = StreamChat.getInstance(api_key, api_secret);
  const sevenDaysAgo = new Date(
    Date.now() - 7 * 24 * 60 * 60 * 1000
  ).toISOString();

  const response = await serverClient.queryUsers(
    { last_active: { $gte: sevenDaysAgo } },
    { last_active: -1 },
    { limit: 100 }
  );
const currentclerkuser = await currentUser()
const userid1st = currentclerkuser?.id || "userA"
  
console.log("Users by response:", response);
  const userswithActivity = response.users.map(user => (
    {
      id: user.id, name: user.name || "Unknown",
      Lastactive: user.last_active ? new Date(user.last_active).toISOString() : "N/A",
    }
  ))
  console.log("Users with activity:", userswithActivity);
  const clerkusers = await clerkclient.users.getUserList({ limit: 100 })
  const pendingrequests = (currentclerkuser?.publicMetadata?.pendingrequests as string[]) || [];

  const combinedusers = await Promise.all(clerkusers.data.map(async(clerkuser) => {
    const match = userswithActivity.find((user) => user.id === clerkuser.id)
    let puttustatus = "anonymous"
    if(userid1st === clerkuser.id){
      puttustatus = "self"
    }
    const channels = await serverClient.queryChannels({
      members: { $eq: [userid1st, clerkuser.id] }
    })
    if(channels.length > 8){
      puttustatus = "friend"
    }
    if(pendingrequests.includes(clerkuser.id)){
      puttustatus = "pending"
    }

    return {
      id: clerkuser.id,
      name: match?.name || "unknown",
      profilepic: clerkuser.imageUrl || "/defaultprofile.png",
      lastactive: match ? match.Lastactive : "N/A",
      email: clerkuser.emailAddresses[0]?.emailAddress || "N/A",
      status:puttustatus
    }
  }))


  return NextResponse.json({ alldata: combinedusers });
}