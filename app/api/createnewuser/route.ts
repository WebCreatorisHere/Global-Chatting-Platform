import { NextResponse } from "next/server";
import { StreamChat } from "stream-chat";
import { createClerkClient } from "@clerk/nextjs/server";
import { joinAndCapitalize } from "@/app/action/utilityfunctions";

export const runtime = "nodejs"; // ensure correct runtime

export async function POST(req: Request) {
try{
        const body = await req.json(); // ✅ no error here
        const { data } = body
        const clerkclient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

        const user_id = data.id;
        const api_key = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
        const api_secret = process.env.STREAM_SECRET as string;

        if (!api_key || !api_secret) {
            return NextResponse.json({ error: "Missing keys" }, { status: 500 });
        }

        const serverClient = StreamChat.getInstance(api_key, api_secret);
        const token = serverClient.createToken(user_id);
        await serverClient.upsertUser({ id: user_id })
         await clerkclient.users.updateUserMetadata(user_id, {
            publicMetadata: {
                usertoken: token
            }
        })
        const slugs: string[] = ["reddit", "discord", "stack-overflow", "quora", "4chan", "xda", "hacker-news", "resetera"]
        slugs.forEach(async(slug) => {
            const channel = serverClient.channel("messaging", slug, {
                image: 'https://getstream.io/random_png/?name=react',
                name: joinAndCapitalize(slug.split('-')),
                created_by_id: user_id,
            })
            await channel.create();
            channel.addMembers([user_id]);
        })
        return NextResponse.json({ token, user_id });
    }
    catch (error) {

        console.error("Error in createNewUser route:", error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
