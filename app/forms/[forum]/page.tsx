import Chatcompo from '../../../components/chatcompo';
import { currentUser } from '@clerk/nextjs/server';

export default async function Page({
  params,
}: {
  params: Promise<{ forum: string }>
}) {
  const { forum } = await params
  const clerkuser = await currentUser()
  if(!clerkuser){
    console.log("no user found")
    return <div>Please log in to access the chat.</div>
  }
  else{
    console.log(typeof clerkuser.publicMetadata.usertoken)
    return <Chatcompo clerkuser={{usertoken:clerkuser.publicMetadata.usertoken as string,userid: clerkuser.id, fullname:clerkuser.fullName, img_url: clerkuser.imageUrl}} slug={forum} />
    
  }
}
