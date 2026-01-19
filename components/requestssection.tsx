"use client"
import React, { useEffect, useState } from 'react'
import { userobject } from '@/app/definedtypes'
import { useUser } from '@clerk/nextjs'

const Requestssection = ({allusers}:{allusers:userobject[]}) => {
    const [requiredresults, setrequiredresults] = useState<userobject[]>([])
    const [loadstate, setloadstate] = useState(true)
    const [currtab, setcurrtab] = useState("received")
    const {user} = useUser()
    const Tab_toggle = (e:React.MouseEvent<HTMLDivElement>,tabinfo:string)=>{
        const element = e.target as HTMLDivElement
        element.classList.add("activatedtab")
        setcurrtab(tabinfo)
        const siblings = element.parentElement?.children
        if(!siblings) return;

        for(let i=0;i<siblings.length;i++){
            if(siblings[i] !== element){
                siblings[i].classList.remove("activatedtab")
            }
        }
    }
    
    const createConnection = async(commonrequests: string[] | undefined)=>{
        if(!commonrequests || commonrequests.length < 1) return
        await Promise.all(commonrequests.map(async request=>{
          await fetch('/api/friendrequest', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userkiid: user?.id, friendid:request }),
})
        }))
    }

    const acceptRequest = async(userid:string)=>{
await fetch('/api/friendrequest', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userkiid: user?.id, friendid:userid }),
})
setrequiredresults(prev=>prev.filter(item=>item.id !== userid))
    }
    const rejectRequest = async(userid:string)=>{
await fetch('/api/friendrequest', {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userkiid: user?.id, friendid:userid }),
})
setrequiredresults(prev=>prev.filter(item=>item.id !== userid))
    }

useEffect(() => {
    if(allusers.length < 1) return;
    setloadstate(true)
const {
    acceptpendingrequests: requests,
    pendingrequests,
    rejectedrequests,
  } = user?.publicMetadata as {
    acceptpendingrequests?: string[];
    pendingrequests?: string[];
    rejectedrequests?: string[];
  };

const setA = new Set(requests)
const setB = new Set(pendingrequests)

const filteredrequests = requests?.filter(item => !setB.has(item)) || []
const filteredpendingrequests = pendingrequests?.filter(item => !setA.has(item)) || []
const filteredrejectedrequests = rejectedrequests?.filter(item => !setA.has(item) && !setB.has(item)) || []

const commonrequests = requests?.filter(item => setB.has(item))
createConnection(commonrequests)

const mapUsers = (ids: string[], status: string) =>
    allusers
      .filter(u => ids.includes(u.id))
      .map(u => ({ ...u, status }));
setloadstate(false)
  setrequiredresults([
    ...mapUsers(filteredrequests, "received"),
    ...mapUsers(filteredpendingrequests, "pending"),
    ...mapUsers(filteredrejectedrequests, "rejected"),
  ].filter((item)=>item.status == currtab))

}, [allusers])

  return (
   <div className="requestsection transition-all duration-300 w-[30%] absolute top-0 left-0 z-50 bg-[#161717] border border-[#343535] panel max-h-full h-screen rounded-tl-lg hider">
          <div className="information">
            <div className="option flex justify-between px-5 py-3 items-center">
              <h1 className="text-2xl font-semibold">Friend Requests</h1>
              <button onClick={()=>{
                const obja = document.querySelector(".search") as HTMLDivElement
                const inputa = obja.children[1] as HTMLInputElement
              if(!obja) return;
              inputa.focus()
                obja.click()
                }} className="p-2 cursor-pointer transition-colors rounded-full px-2.5 hover:bg-[#2d2d2d] w-fit">
                <img
                  className="w-6.5 min-h-6.5"
                  src="/svgs/newchat.svg"
                  alt="newchat"
                />
              </button>
            </div>

          </div>

          <div className="inbox-tabs text-[#a8a8a8] text-sm flex border-b border-[#343535]">
  <div onClick={(e)=>Tab_toggle(e ,"received")} className="received w-full flex justify-center items-center py-3 cursor-pointer active:text-[#727272] font-semibold select-none">Requests</div>
  <div onClick={(e)=>Tab_toggle(e ,"pending")} className="pending w-full flex justify-center items-center py-3 cursor-pointer active:text-[#727272] font-semibold select-none">Pending</div>
  <div onClick={(e)=>Tab_toggle(e ,"rejected")} className="rejected w-full flex justify-center items-center py-3 cursor-pointer active:text-[#727272] font-semibold select-none activatedtab">Rejected</div>
          </div>

                <div className="maindata my-4">
                    {requiredresults.length > 0 && (
            <div className="px-3 flex gap-1 flex-col max-h-[calc(100vh-183px)] overflow-y-scroll">
              {requiredresults.map((result, index) => {
                return (
                  <div
                  onClick={()=>console.log(result.id)}
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
                        <div className="action-group">
  {result.status === "received" && (
    <div className='flex gap-2 items-center justify-end cursor-pointer'>
      <button onClick={()=>{acceptRequest(result.id)}} className="acceptbutton cursor-pointer" title="Accept">
        <img className='w-9' src="/svgs/accept.svg" alt="Accept request" />
      </button>

      <button onClick={()=>{rejectRequest(result.id)}} className="rejectbutton cursor-pointer" title="Reject">
        <img className='w-9' src="/svgs/no.svg" alt="Reject request" />
      </button>
    </div>
  )}

  {result.status === "pending" && (
    <div className='flex gap-2 items-center justify-end cursor-pointer'>
      

      <button className="rejectbutton cursor-pointer" title="Reject">
        <img className='w-5.5' src="/svgs/no.svg" alt="Reject request" />
      </button>
    </div>
  )}

  {result.status === "rejected" && (
    <div className='flex gap-2 items-center justify-end cursor-pointer'>
      <button className="acceptbutton cursor-pointer" title="Accept">
        <img className='w-5.5' src="/svgs/accept.svg" alt="Accept request" />
      </button>
    </div>
  )}
</div>

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
      Looking for matching users. This won’t take long.
    </p>
  </div>
)}
{requiredresults.length == 0 && <div className="nochats flex flex-col gap-3 justify-center items-center h-[calc(100vh-183px)]">
              <img className="w-22" src="/svgs/nocontact.svg" alt="nocontact" />
              <h1 className="text-lg">No Requests {currtab} yet</h1>
              <p className="text-center text-sm text-[#ababab] w-[70%]">
                Your {currtab} requests will appear here. Send request by clicking
                the new chat button in chats section.
              </p>
            </div>}


                </div>
          </div>
  )
}

export default Requestssection
