
// import { useRouter } from "next/navigation";
import type { userobject } from "@/app/definedtypes";
import { capitalizeWords } from "@/app/action/utilityfunctions";

export default function UserChannelHeader({
  isdark,
  importantdata
}: {
  isdark: boolean
  importantdata:userobject | undefined
  
}) {
  
  return (
    <div
      style={{
        backgroundColor: isdark ? "#161717" : "white",
        color: isdark ? "#72767e" : "white",
      }}
      className="flex relative z-10 items-center justify-between px-4 py-[11px]  border-t border-[#2d2e2e]"
    >
        

      <div className="maincontent flex items-center justify-center ">
        <div className="majorimage rounded-full bg-cover bg-center mr-3.5 " style={{backgroundImage:`url(${importantdata?.profilepic})`}}>
          
        </div>
        <div className="flex flex-col gap-0.5">
          <h2
            style={{ color: isdark ? "white" : "black" }}
            className="text-base font-semibold"
          >
            {capitalizeWords(importantdata?.name?.toLowerCase() || "") || "Chat Room"}
          </h2>
          <p className="text-[#ababab] text-xs font-semibold -mt-0.5">
            Last active : {importantdata?.lastactive} ago
          </p>
        </div>
      </div>

      {/* Optional actions */}
      <div className="flex items-center space-x-3">
        <button
                className="p-2 cursor-pointer transition-colors rounded-full px-2.5 hover:bg-[#2d2d2d] w-fit"
              >
                <img
                  className="w-6.5 min-h-6.5"
                  src="/svgs/menu-dots.svg"
                  alt="newchat"
                />
              </button>
      </div>
    </div>
  );
}
