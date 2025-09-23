"use client"
import Image from "next/image";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <main className="max-w-screen min-h-screen py-4 bg-gradient-to-b from-blue-700 to-blue-300 relative overflow-hidden">
      <Navbar/>
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse blur-xl"></div>
        <div className="absolute top-1/4 right-20 w-24 h-24 bg-blue-300/20 rounded-full animate-bounce blur-lg"></div>
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-blue-500/15 rounded-full animate-pulse blur-2xl"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-white/15 rounded-full animate-ping blur-md"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-blue-400/20 rounded-full animate-bounce blur-xl"></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 gap-4 h-full animate-pulse">
          {Array.from({length: 144}).map((_, i) => (
            <div key={i} className="bg-white/10 rounded-sm transform rotate-45" 
                 style={{animationDelay: `${i * 0.1}s`}}></div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight">
            <span className="inline-block animate-bounce" style={{animationDelay: '0s'}}>C</span>
            <span className="inline-block animate-bounce" style={{animationDelay: '0.1s'}}>o</span>
            <span className="inline-block animate-bounce" style={{animationDelay: '0.2s'}}>n</span>
            <span className="inline-block animate-bounce" style={{animationDelay: '0.3s'}}>n</span>
            <span className="inline-block animate-bounce" style={{animationDelay: '0.4s'}}>e</span>
            <span className="inline-block animate-bounce" style={{animationDelay: '0.5s'}}>c</span>
            <span className="inline-block animate-bounce" style={{animationDelay: '0.6s'}}>t</span>
            <span className="mx-4"></span>
            <span className="inline-block animate-bounce" style={{animationDelay: '0.7s'}}>t</span>
            <span className="inline-block animate-bounce" style={{animationDelay: '0.8s'}}>h</span>
            <span className="inline-block animate-bounce" style={{animationDelay: '0.9s'}}>e</span>
            <span className="mx-4"></span>
            <span className="inline-block animate-bounce" style={{animationDelay: '1s'}}>W</span>
            <span className="inline-block animate-bounce" style={{animationDelay: '1.1s'}}>o</span>
            <span className="inline-block animate-bounce" style={{animationDelay: '1.2s'}}>r</span>
            <span className="inline-block animate-bounce" style={{animationDelay: '1.3s'}}>l</span>
            <span className="inline-block animate-bounce" style={{animationDelay: '1.4s'}}>d</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Break barriers, build bridges. Experience seamless conversations with people from every corner of the globe in real-time.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <button onClick={()=>router.push("/chats")} className="group cursor-pointer relative px-8 py-4 bg-white text-blue-700 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
              <span className="relative z-10">Start Chatting Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button onClick={()=>router.push("/chats")} className="group cursor-pointer px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-blue-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 group-hover:animate-spin" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
                Watch Demo
              </span>
            </button>
          </div>
        </div>

        {/* Interactive Globe Animation */}
        <div className="flex justify-center mb-16">
          <div className="relative">
            <div className="w-80 h-80 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-2xl animate-spin-slow relative overflow-hidden">
              {/* Globe continents */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-green-400/30 to-green-600/30"></div>
              <div className="absolute top-12 left-16 w-16 h-12 bg-green-500/40 rounded-full transform rotate-12"></div>
              <div className="absolute top-20 right-20 w-12 h-8 bg-green-500/40 rounded-full transform -rotate-12"></div>
              <div className="absolute bottom-16 left-20 w-20 h-16 bg-green-500/40 rounded-full transform rotate-45"></div>
              <div className="absolute bottom-20 right-16 w-14 h-10 bg-green-500/40 rounded-full transform -rotate-30"></div>
              
              {/* Connection lines */}
              <div className="absolute inset-0 animate-pulse">
                <div className="absolute top-1/4 left-1/4 w-1 h-32 bg-white/50 transform rotate-45 origin-bottom"></div>
                <div className="absolute top-1/3 right-1/4 w-1 h-24 bg-white/50 transform -rotate-45 origin-bottom"></div>
                <div className="absolute bottom-1/4 left-1/3 w-1 h-28 bg-white/50 transform rotate-12 origin-bottom"></div>
              </div>
            </div>
            
            {/* Floating chat bubbles around globe */}
            <div className="absolute -top-8 -left-8 animate-float">
              <div className="bg-white rounded-2xl p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-400 rounded-full"></div>
                  <div className="text-sm text-gray-700">Hello! 🇺🇸</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-12 animate-float" style={{animationDelay: '0.5s'}}>
              <div className="bg-white rounded-2xl p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-400 rounded-full"></div>
                  <div className="text-sm text-gray-700">Bonjour! 🇫🇷</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-8 -left-12 animate-float" style={{animationDelay: '1s'}}>
              <div className="bg-white rounded-2xl p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
                  <div className="text-sm text-gray-700">こんにちは! 🇯🇵</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-8 animate-float" style={{animationDelay: '1.5s'}}>
              <div className="bg-white rounded-2xl p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-purple-400 rounded-full"></div>
                  <div className="text-sm text-gray-700">Hola! 🇪🇸</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mb-6 flex items-center justify-center group-hover:animate-pulse">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Instant Messaging</h3>
            <p className="text-blue-100">Lightning-fast message delivery with real-time synchronization across all devices.</p>
          </div>

          <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2" style={{animationDelay: '0.2s'}}>
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl mb-6 flex items-center justify-center group-hover:animate-pulse">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Smart Translation</h3>
            <p className="text-blue-100">Break language barriers with AI-powered real-time translation in 100+ languages.</p>
          </div>

          <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2" style={{animationDelay: '0.4s'}}>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl mb-6 flex items-center justify-center group-hover:animate-pulse">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Global Community</h3>
            <p className="text-blue-100">Connect with millions of users worldwide and discover new cultures and perspectives.</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 mb-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl md:text-6xl font-bold text-white mb-2 group-hover:animate-pulse">10M+</div>
              <div className="text-blue-100 text-lg">Active Users</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-6xl font-bold text-white mb-2 group-hover:animate-pulse">195</div>
              <div className="text-blue-100 text-lg">Countries</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-6xl font-bold text-white mb-2 group-hover:animate-pulse">100+</div>
              <div className="text-blue-100 text-lg">Languages</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-6xl font-bold text-white mb-2 group-hover:animate-pulse">99.9%</div>
              <div className="text-blue-100 text-lg">Uptime</div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center pb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to Connect?</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join millions of people already having amazing conversations around the world.
          </p>
          <button onClick={()=>router.push("/chats")} className="group cursor-pointer relative px-12 py-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2">
            <span className="relative z-10 flex items-center gap-3">
              Get Started Free
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0px); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </main>
  );
}