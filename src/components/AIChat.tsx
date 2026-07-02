import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Loader2, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX,
  ChevronRight,
  Maximize2,
  Terminal,
  Zap
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    className="flex gap-4 max-w-[85%] mr-auto"
  >
    <div className="w-10 h-10 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/20">
      <Bot className="h-5 w-5" />
    </div>
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-md opacity-50 animate-pulse" />
      <div className="relative p-5 rounded-[1.8rem] bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/10 flex flex-col gap-3 min-w-[200px]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -6, 0],
                  scale: [1, 1.2, 1],
                  backgroundColor: ['#60a5fa', '#9333ea', '#60a5fa']
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className="w-2 h-2 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.6)]"
              />
            ))}
          </div>
          <span className="text-[10px] font-bold font-mono text-blue-400 tracking-[0.2em] uppercase">
            Kishore AI is typing
          </span>
        </div>
        <div className="h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="h-full w-1/3 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          />
        </div>
      </div>
    </div>
  </motion.div>
);

const StreamingMessage = ({ content, onComplete }: { content: string, onComplete: () => void }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const words = content.split(' ');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentIdx = 0;
    let timeoutId: NodeJS.Timeout;

    const stream = () => {
      if (currentIdx < words.length) {
        const word = words[currentIdx];
        setDisplayedContent(prev => prev + (prev ? ' ' : '') + word);
        
        // Punctuation check for natural rhythm
        let delay = 40 + Math.random() * 60;
        if (word.endsWith('.') || word.endsWith('?') || word.endsWith('!')) delay += 400;
        else if (word.endsWith(',')) delay += 200;

        currentIdx++;
        timeoutId = setTimeout(stream, delay);
      } else {
        setIsTyping(false);
        onComplete();
      }
    };

    stream();
    return () => clearTimeout(timeoutId);
  }, [content, onComplete]);

  return (
    <div className="relative min-h-[1.5rem]" ref={scrollRef}>
      <div className="prose prose-invert prose-sm max-w-none leading-relaxed prose-p:my-0 prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-code:text-blue-300">
        <ReactMarkdown>{displayedContent}</ReactMarkdown>
      </div>
      {isTyping && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-2 h-5 ml-1 bg-blue-500 align-middle shadow-[0_0_12px_rgba(59,130,246,0.8)]"
        />
      )}
    </div>
  );
};

// Portfolio context moved back to client constants for the Gemini prompt
const PORTFOLIO_CONTEXT = `
You are "Ask Kishore AI", the personal AI companion and digital representative for M. Kishore Kanitkan. 
Your mission is to provide accurate, insightful information about Kishore's technical expertise, projects, and also help visitors understand his personality, mindset, values, and the way he sees life. 
Respond naturally, as if you're speaking on his behalf. Be warm, thoughtful, genuine, and conversational.

---

### Kishore's Resume Summary (Technical & Academic)
- Name: M. Kishore Kanitkan
- Role: 3rd-year B.Tech Student in CSBS at V.S.B. College of Engineering, Tamil Nadu.
- Focus: AI, Machine Learning, and Full Stack Development.
- Core Skills: Python, Java, React, TypeScript, Node.js, TensorFlow, NLP.
- Key Projects: Smart Rescue Coordination Platform (AI/IoT), Paz AI Anxiety Assistant (NLP/GenAI), Sinérgia (Upcoming AI Startup).
- Certifications: Java (Coursera), Gen AI in HR (Coursera), Big Data (NASSCOM).

---

### Who Kishore Is (Personality & Mindset)
He believes that every day is an opportunity to become a better version of himself. Growth is not about competing with others—it's about improving who he was yesterday.
He enjoys meaningful conversations, learning from different perspectives, and constantly discovering new ways to grow as a person. He doesn't claim to know everything, and is comfortable admitting when he doesn't. Curiosity, humility, and honesty matter more to him than pretending to have all the answers.
He's someone who naturally looks for ways to improve situations instead of complaining about them. He believes every challenge carries a lesson, and every experience helps shape who we become.
Although he enjoys achieving goals, he values the journey just as much as the destination.

**Personality Traits:**
Curious, Ambitious, Calm, Practical, Thoughtful, Observant, Open-minded, Independent, Adaptable, Respectful, Genuine, Self-aware, Loyal, Optimistic, Consistent, Emotionally mature, Friendly, Reliable.

**Mindset:**
- Growth never stops.
- Consistency beats motivation.
- Discipline creates freedom.
- Character matters more than reputation.
- Kindness is never a weakness.
- Respect should be given before it's expected.
- Success is built through patience and persistence.
- Small improvements every day create extraordinary results over time.
- Challenges exist to help us grow stronger, wiser, and more resilient.

**How He Thinks & Communicates:**
Whenever facing a situation, he naturally asks: "What can I learn from this?", "Is there a better way?", "Why does this happen?", "How can this be improved?"
He enjoys understanding the reasoning behind things instead of simply accepting answers. He appreciates logic, but believes empathy is equally important.
He prefers conversations that are Honest, Respectful, Friendly, Thoughtful, and Meaningful. He enjoys listening as much as speaking and doesn't like unnecessary negativity.

**Core Values:**
Honesty, Integrity, Respect, Kindness, Loyalty, Humility, Gratitude, Accountability, Discipline, Compassion, Continuous self-improvement. He believes actions speak louder than words.

**Views on Relationships & Life:**
- Friendship: Built on trust, honesty, respect, understanding, and loyalty. Quality matters more than quantity. A good friend tells the truth even when uncomfortable.
- Love: Built on trust, respect, communication, patience, understanding, and mutual growth.
- Treating People: Doesn't judge based on appearance, status, or money. Everyone deserves respect until proven otherwise.
- Challenges: When life becomes difficult, he tries to remain calm, focuses on finding practical solutions, and knows failure is temporary but lessons last forever.
- Motivation: Motivated by learning, improving, solving problems, helping others, making progress, creating value, and stepping outside his comfort zone. Progress over perfection.
- Life Philosophy: Life is about becoming a better human being. Success without kindness has little meaning. Knowledge without humility is incomplete. Growth without gratitude feels empty.

---

### Important Rules for "Ask Kishore AI":
- Refer to yourself as "Ask Kishore AI", representing Kishore.
- Never invent personal stories or experiences.
- Never exaggerate his personality.
- Never assume facts about his private life.
- If something isn't known, respond honestly instead of making it up.
- Keep responses warm, authentic, and thoughtful.
- Use light humor when appropriate, but never at someone else's expense.
- Encourage meaningful conversations that reflect curiosity, empathy, and respect.
- Represent him as someone who values growth, authenticity, kindness, strong relationships, and lifelong learning.
- If asked for a resume, mention he can be contacted via email at kanith770@gmail.com.
- Keep responses concise, helpful, and formatted with Markdown.
- Be enthusiastic about Kishore's future startup "Sinérgia".
`;

const SUGGESTIONS = [
  "What AI projects has Kishore built?",
  "Explain the Sinérgia vision",
  "What technologies does Kishore know?",
  "How can I contact Kishore?",
  "Show me his AI Mental Health project"
];

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "Hi! I'm **Ask Kishore AI**, a digital representative of Kishore Kanitkan. How can I help you explore his work and vision today?",
      timestamp: new Date(),
      isStreaming: false
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<GoogleGenAI | null>(null);

  useEffect(() => {
    if (!aiRef.current && process.env.GEMINI_API_KEY) {
      aiRef.current = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const target = scrollRef.current;
      target.scrollTo({
        top: target.scrollHeight,
        behavior: messages[messages.length - 1]?.isStreaming ? 'auto' : 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      if (!aiRef.current) throw new Error("AI engine not initialized. Please ensure GEMINI_API_KEY is set in Secrets.");

      const historyItems = messages
        .filter(m => m.content !== messages[0].content)
        .map(msg => ({
          role: msg.role,
          parts: [{ text: msg.content }]
        }));

      // Using the correct pattern from @google/genai skill
      const response = await aiRef.current.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...historyItems, { role: 'user', parts: [{ text: text }] }],
        config: {
          systemInstruction: PORTFOLIO_CONTEXT,
          temperature: 0.7,
        }
      });

      const replyText = response.text;
      
      if (replyText) {
        setIsTyping(false);
        setMessages(prev => [...prev, { 
          role: 'model', 
          content: replyText, 
          timestamp: new Date(),
          isStreaming: true 
        }]);
      } else {
        throw new Error("Empty response from AI");
      }
    } catch (error: any) {
      console.error("AI Chat Error:", error);
      setIsTyping(false);
      
      let errorMessage = "I'm having a bit of trouble connecting to my neural network.";
      
      if (error.message?.includes("API_KEY_INVALID") || error.message?.includes("400")) {
        errorMessage = "**System Error:** API Key invalid or missing. Please check the **Settings > Secrets** panel in AI Studio.";
      } else if (error.message?.includes("PERMISSION_DENIED")) {
        errorMessage = "**System Error:** Permission denied. Check API access.";
      } else if (error.message?.includes("RESOURCE_EXHAUSTED")) {
        errorMessage = "**System Error:** Quota exceeded. Please try again soon.";
      }

      setMessages(prev => [...prev, { 
        role: 'model', 
        content: errorMessage, 
        timestamp: new Date(),
        isStreaming: false
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStreamingComplete = (index: number) => {
    setMessages(prev => prev.map((msg, i) => 
      i === index ? { ...msg, isStreaming: false } : msg
    ));
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      >
        <AnimatePresence>
          {isOpen === false && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="px-4 py-2 bg-blue-600/10 backdrop-blur-md border border-blue-500/30 rounded-2xl text-[10px] text-blue-400 font-mono tracking-wider uppercase animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.1)]"
            >
              System Online: Ask Kishore AI
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center gap-3 px-6 py-4 bg-[#0a0a0c] border border-white/10 rounded-full text-white font-bold shadow-[0_0_50px_rgba(37,99,235,0.15)] overflow-hidden transition-all hover:border-blue-500/50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
          <div className="relative flex items-center gap-2">
            <Zap className="h-5 w-5 fill-current animate-pulse text-blue-400" />
            <span className="tracking-tight font-sans">Chat with AI</span>
          </div>
        </button>
      </motion.div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl h-[85vh] flex flex-col bg-[#07070a]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 pointer-events-none" />
              
              {/* Header */}
              <div className="flex items-center justify-between p-7 border-b border-white/5 relative z-10">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <motion.div 
                      animate={{ 
                        boxShadow: ["0 0 15px rgba(59,130,246,0.1)", "0 0 25px rgba(59,130,246,0.2)", "0 0 15px rgba(59,130,246,0.1)"]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 flex items-center justify-center shadow-inner"
                    >
                      <Bot className="h-7 w-7 text-blue-400" />
                    </motion.div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-4 border-[#07070a] animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-2xl tracking-tight bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">Ask Kishore AI</h3>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 text-[10px] text-blue-400 font-mono tracking-widest uppercase opacity-80">
                        <Terminal className="h-3 w-3" /> System Core v2.1.0
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-800" />
                      <span className="text-[10px] text-slate-600 font-mono tracking-tighter uppercase whitespace-nowrap">Neuralink Status: Nominal</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                   <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-3 text-slate-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/5"
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-3 text-slate-500 hover:text-white bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all shadow-lg"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Chat Content */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth scrollbar-thin scrollbar-thumb-blue-500/10 hover:scrollbar-thumb-blue-500/20 scrollbar-track-transparent"
              >
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={cn(
                      "flex gap-5 max-w-[92%]",
                      msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center border transition-all duration-500 shadow-sm",
                      msg.role === 'user' 
                        ? "bg-purple-600/10 border-purple-500/30 text-purple-400" 
                        : "bg-blue-600/10 border-blue-500/20 text-blue-400 shadow-blue-500/5 shadow-inner"
                    )}>
                      {msg.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                    </div>
                    
                    <div className="space-y-3">
                      <div className={cn(
                        "p-6 rounded-[1.8rem] relative group border shadow-2xl",
                        msg.role === 'user'
                          ? "bg-purple-600/10 border-purple-500/20 text-white rounded-tr-none"
                          : "bg-white/5 border-white/10 text-slate-50 rounded-tl-none shadow-black/20"
                      )}>
                        {msg.isStreaming ? (
                          <StreamingMessage 
                            content={msg.content} 
                            onComplete={() => handleStreamingComplete(i)} 
                          />
                        ) : (
                          <div className="prose prose-invert prose-sm max-w-none leading-relaxed prose-headings:text-white prose-strong:text-blue-400">
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          </div>
                        )}
                        
                        {!msg.isStreaming && msg.role === 'model' && (
                          <button
                            onClick={() => copyToClipboard(msg.content, i)}
                            className="absolute -top-1 -right-1 p-2.5 rounded-xl bg-[#0a0a0c] border border-white/10 text-slate-500 opacity-0 group-hover:opacity-100 transition-all hover:text-white hover:border-blue-500/50 shadow-xl"
                          >
                            {copiedId === i ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                          </button>
                        )}
                      </div>
                      <div className={cn(
                        "flex items-center gap-3 px-3",
                        msg.role === 'user' ? "justify-end" : "justify-start"
                      )}>
                        <span className="text-[10px] text-slate-700 font-mono font-medium">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {msg.role === 'model' && !msg.isStreaming && (
                          <div className="flex items-center gap-1.5 opacity-30 group">
                             <Check className="h-3 w-3 text-blue-500" />
                             <span className="text-[8px] text-slate-600 font-mono tracking-widest uppercase">Verified Response</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && <TypingIndicator />}
              </div>

              {/* Bottom Area */}
              <div className="p-8 bg-gradient-to-t from-black/60 via-black/20 to-transparent border-t border-white/5 space-y-6 relative z-10">
                {messages.length < 3 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap gap-2.5"
                  >
                    {SUGGESTIONS.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(s)}
                        className="text-xs px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-slate-500 hover:border-blue-500/40 hover:text-blue-400 hover:bg-blue-500/5 transition-all duration-300 backdrop-blur-md shadow-sm"
                      >
                        {s}
                      </button>
                    ))}
                  </motion.div>
                )}

                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-15 group-focus-within:opacity-40 transition-opacity duration-700" />
                  <div className="relative flex items-center bg-[#07070a]/80 backdrop-blur-xl border border-white/10 rounded-[1.8rem] p-3 focus-within:border-blue-500/40 transition-all duration-500">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask Ask Kishore AI anything..."
                      disabled={isLoading}
                      className="flex-1 bg-transparent border-none outline-none text-white px-5 py-3 placeholder:text-slate-700 text-base"
                    />
                    <button
                      onClick={() => handleSend()}
                      disabled={isLoading || !input.trim()}
                      className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white disabled:opacity-20 disabled:grayscale transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] active:scale-95 shrink-0"
                    >
                      {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between px-3">
                   <div className="flex items-center gap-7 text-[9px] text-slate-700 font-mono tracking-[0.2em] relative">
                    <div className="flex items-center gap-2 group transition-colors hover:text-blue-500">
                      <Sparkles className="h-3 w-3 text-blue-600 group-hover:animate-pulse" /> 
                      <span>CORE:GEMINI-3-FLASH</span>
                    </div>
                    <div className="flex items-center gap-2 group transition-colors hover:text-purple-500">
                      <Zap className="h-3 w-3 text-purple-600" /> 
                      <span>ENCRYPTED_LINK_TLS_1.3</span>
                    </div>
                  </div>
                  <div className="text-[9px] text-slate-800 font-mono tracking-widest hidden sm:block font-bold">
                     KISHORE_KANITKAN / PORTFOLIO / 2024.v1
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
