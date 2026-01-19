import { NextResponse } from "next/server";
import { StreamChat } from "stream-chat";
import { createClerkClient } from "@clerk/nextjs/server";


export async function POST(request: Request) {
    const body = await request.json()
    const {userkiid, friendid} = body
    const clerkclient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
    if(!userkiid || !friendid){
        return NextResponse.json({ error: "Missing user IDs" }, { status: 400 });
    }
    const serverclient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY as string, process.env.STREAM_SECRET as string);
    try{
        const slug = [userkiid, friendid].sort().join("_").slice(0, 48);
        console.log("Creating channel with slug:", slug);
        const channel = serverclient.channel('messaging', slug, {
            members: [userkiid, friendid],
            created_by_id: userkiid,
        })
        await channel.create();
        const userno1 = await clerkclient.users.getUser(userkiid);
        const userno1acceptrequest = userno1.publicMetadata.acceptpendingrequests as string[] | undefined;
        const userno2 = await clerkclient.users.getUser(friendid);
        const userno2pendingrequest = userno2.publicMetadata.pendingrequests as string[] | undefined;
        await clerkclient.users.updateUserMetadata(userkiid, {
            publicMetadata: {...userno1.publicMetadata, acceptpendingrequests: userno1acceptrequest ? userno1acceptrequest.filter((id)=> id !== friendid):[]}
        })
        await clerkclient.users.updateUserMetadata(friendid, {
            publicMetadata: {...userno2.publicMetadata, pendingrequests: userno2pendingrequest ? userno2pendingrequest.filter((id)=> id !== userkiid):[]}
        })
        return NextResponse.json({ message: "Channel created successfully", channelId: channel.id } );
    }
    catch(err){
        console.error("Error creating channel:", err);
        return NextResponse.json({ error: "Failed to create channel" }, { status: 500 });
    }
}

export async function DELETE(request:Request){
    const {userkiid, friendid} = await request.json()
if(!userkiid || !friendid){
        return NextResponse.json({ error: "Missing user IDs" }, { status: 400 });
    }
const clerkclient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
        const userno1 = await clerkclient.users.getUser(userkiid);
        const userno1acceptrequest = userno1.publicMetadata.acceptpendingrequests as string[] | undefined;
        const userno2 = await clerkclient.users.getUser(friendid);
        const userno2pendingrequest = userno2.publicMetadata.pendingrequests as string[] | undefined;
        const userno2rejectedrequests = userno2.publicMetadata.rejectedrequests as string[] | undefined;
        await clerkclient.users.updateUserMetadata(userkiid, {
            publicMetadata: {...userno1.publicMetadata, acceptpendingrequests: userno1acceptrequest ? userno1acceptrequest.filter((id)=> id !== friendid):[]}
        })
        await clerkclient.users.updateUserMetadata(friendid, {
            publicMetadata: {
                ...userno2.publicMetadata, 
                pendingrequests: userno2pendingrequest ? userno2pendingrequest.filter((id)=> id !== userkiid):[],
                rejectedrequests:userno2rejectedrequests? [...userno2rejectedrequests,userkiid]:[]
            }
        })

        return NextResponse.json({ message: "request deleted successfully" } );

}