import Navbar from "./Navbar";
import React, { useState } from 'react';
import { Docker , CodeBracket , WebSocket  }  from "../components/Icons" ; 

import {useNavigate} from "react-router-dom";
const Home = () => {
  const [activeTab, setActiveTab] = useState<string>('java');
  const navigate = useNavigate() ; 
  const codeSnippets = {
    java: `public class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`
  };
  return (
    <div className = "">
     
        <Navbar />
      
      <div className ="bg-dark h-screen text-white ">
      <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500 selection:text-black">


      {/* Hero Section */}
      <section className="relative pt-10 pb-16 px-6 max-w-7xl mx-auto text-center md:text-left">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Isolated Docker Remote Code Execution
            </div>
            {/* to have shade use bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text */}
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Master Algorithms with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Sub-Second</span> Feedback.
            </h1>
            <p className="mt-6 text-zinc-400 text-lg leading-relaxed">
              Compile, execute, and judge code across multiple languages inside sandboxed micro-VMs. Built with WebSockets for real-time terminal output.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                onClick = {()=>navigate("/ide")}
                className="px-6 py-3 animate-pulse bg-emerald-500 cursor-pointer hover:bg-emerald-400 text-zinc-950 font-semibold rounded-lg shadow-lg hover:shadow-emerald-500/25 transition-all text-center"
              >
                Start Coding
              </a>
              <a
                
                className="px-6 py-3 bg-zinc-900 cursor-pointer hover:bg-zinc-800 text-zinc-300 border border-zinc-800 font-semibold rounded-lg transition-all text-center"
              >
                View Benchmark
              </a>
            </div>

            {/* Metrics */}
            <div className="mt-12 pt-8 border-t border-zinc-900 grid grid-cols-3 gap-4 text-center md:text-left">
              <div>
                <div className="text-2xl font-bold text-white">&lt;100ms</div>
                <div className="text-xs text-zinc-500">Sandbox Latency</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-xs text-zinc-500">Resource Isolation</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">1s</div>
                <div className="text-xs text-zinc-500">Code Execution Limit</div>
              </div>
            </div>
          </div>

          
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="bg-zinc-950 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="ml-2 text-xs font-mono text-zinc-500">Main.java</span>
              </div>
              <div className="flex bg-zinc-900 p-1 rounded-md border border-zinc-800">
                
                  <button
                    key={"java"}
                    onClick={() => setActiveTab("java")}
                    className={`px-2.5 py-1 text-xs font-mono rounded capitalize transition-all ${
                      activeTab === "java"
                        ? 'bg-zinc-800 text-emerald-400 font-semibold'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {"java"}
                  </button>
                
              </div>
            </div>

            {/* Code Body */}
            <div className="p-4 bg-zinc-950 font-mono text-xs leading-relaxed overflow-x-auto text-zinc-300 h-72">
              <pre>
                <code>{codeSnippets[activeTab]}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto border-t border-zinc-900">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white">Engineered for High-Performance Judging</h2>
          <p className="mt-3 text-zinc-400 text-sm">
            Powered by modern cloud-native primitives to give you immediate feedback without server hangs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-zinc-900/50 border border-zinc-800/80 p-6 rounded-xl hover:border-zinc-700 transition-all">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                      <Docker/>
            </div>
            <h3 className="text-lg font-bold text-white">Docker Sandboxing</h3>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
              Every code execution runs inside isolated, read-only container micro-VMs with zero network access and strict memory caps.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-zinc-900/50 border border-zinc-800/80 p-6 rounded-xl hover:border-zinc-700 transition-all">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                      <WebSocket/>
            </div>
            <h3 className="text-lg font-bold text-white">Real-Time WebSockets</h3>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
              Submissions stream instantly over dedicated WebSocket connections powered by Redis Pub/Sub backplanes.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-zinc-900/50 border border-zinc-800/80 p-6 rounded-xl hover:border-zinc-700 transition-all">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
              <CodeBracket/>
            </div>
            <h3 className="text-lg font-bold text-white">Monaco Editor Integration</h3>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
              Full VS Code editing experience right in your browser, featuring syntax highlighting, multi-cursors, and auto-indent.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 px-6 text-center text-xs text-zinc-600">
        <p>Created by Adityaraj Dangi</p>
      </footer>
    </div>
      </div>
    </div>
  );
};

export default Home;
