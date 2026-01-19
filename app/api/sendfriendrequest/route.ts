import { NextResponse } from "next/server";
import { createClerkClient } from "@clerk/nextjs/server";

export async function POST(request: Request) {
    const body = await request.json();
    const clerkclient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
    const currentuserid = body.currentuserid as string;
    const frienduserid = body.frienduserid as string
    console.log("Received friend request from", currentuserid, "to", frienduserid);
    if (!currentuserid || !frienduserid) {
        return NextResponse.json({ error: "Missing user IDs" }, { status: 400 });
    }
    const currentuser = await clerkclient.users.getUser(currentuserid)
    const frienduser = await clerkclient.users.getUser(frienduserid)
    const pendingrequest = currentuser.publicMetadata.pendingrequests as string[] || [];
    const acceptpendingrequest = frienduser.publicMetadata.acceptpendingrequests as string[] || [];
    const match1 = pendingrequest.find((id) => id === frienduserid)
    const match2 = acceptpendingrequest.find((id) => id === currentuserid)
    if (match1 || match2) {
        return NextResponse.json({ error: "Friend request already sent or received" }, { status: 200 });
    }
    await clerkclient.users.updateUser(currentuserid, {
  publicMetadata: {
    ...currentuser.publicMetadata,
    pendingrequests : [...pendingrequest, frienduserid]
  },
});
    await clerkclient.users.updateUser(frienduserid, {
  publicMetadata: {
    ...frienduser.publicMetadata,
    acceptpendingrequests : [...acceptpendingrequest, currentuserid]
  },
});
return NextResponse.json({ message: "Friend request sent" }, { status: 200 });
}