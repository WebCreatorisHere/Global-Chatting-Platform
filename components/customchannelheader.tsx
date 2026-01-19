import {
  
  useChannelStateContext,
} from "stream-chat-react";
import { useRouter } from "next/navigation";

export default function CustomChannelHeader({
  isdark,
  setisdark,
  slug
}: {
  isdark: boolean;
  setisdark?: (value: boolean) => void;
  slug?:string;
}) {
  // Access current channel info
  const { channel, members, watchers } = useChannelStateContext();
  const router = useRouter();
  return (
    <div
      style={{
        backgroundColor: isdark ? "#17191C" : "white",
        color: isdark ? "#72767e" : "white",
      }}
      className="flex relative z-20 items-center justify-between p-2 border-b border-gray-700"
    >
      {/* Channel Name */}

      <div className="flex items-center space-x-3">
        <button
          onClick={() => router.back()}
          className={`px-4 cursor-pointer py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
            isdark
              ? "bg-gray-800 hover:bg-gray-700 text-white"
              : "bg-gray-300 hover:bg-gray-400 text-black"
          }`}
        >
          Back
        </button>
      </div>

      <div className="maincontent flex items-center justify-center ">
        {slug && <div className="majorimage bg-cover bg-center mr-3 " style={{backgroundImage:`url(/imgs/${slug?slug:"dummy"}.png)`}}>
          
        </div>}
        <div className="flex flex-col">
          <h2
            style={{ color: isdark ? "white" : "black" }}
            className="text-lg font-semibold"
          >
            {channel?.data?.name || "Chat Room"}
          </h2>
          <p className="text-[#72767e] -mt-0.5">
            {Object.keys(members || {}).length} members,{" "}
            {Object.keys(watchers || {}).length} online
          </p>
        </div>
      </div>

      {/* Optional actions */}
      <div className="flex items-center space-x-3">
        {setisdark && <button
          onClick={() => setisdark(!isdark)}
          className={`px-4 cursor-pointer py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
            isdark
              ? "bg-gray-800 hover:bg-gray-700 text-white"
              : "bg-gray-300 hover:bg-gray-400 text-black"
          }`}
        >
          {isdark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>}
      </div>
    </div>
  );
}
