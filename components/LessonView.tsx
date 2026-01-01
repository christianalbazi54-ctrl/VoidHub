import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ArrowRight, Terminal, Lightbulb, AlertCircle, Loader2 } from 'lucide-react';
import { Lesson } from '../types';
import { GoogleGenAI } from "@google/genai";

interface LessonViewProps {
  lesson: Lesson;
  onBack: () => void;
  onNext?: () => void;
  parentIcon: React.ReactNode;
}

const LessonView: React.FC<LessonViewProps> = ({ lesson, onBack, onNext, parentIcon }) => {
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'error'>('idle');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setUserInput('');
    setStatus('idle');
    setFeedback(null);
    setShowHint(false);
  }, [lesson.id]);

  const getFeedbackFromAI = async (input: string) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `The user is trying to solve a Roblox development challenge.
        Challenge: "${lesson.challenge}"
        Context: "${lesson.content}"
        Expected Answer: "${lesson.expectedAnswer}"
        User's Input: "${input}"
        
        Explain what is wrong with the user's input compared to the expected answer. 
        Be encouraging but brief (max 2 sentences). Don't just give the answer away immediately, guide them to fix their mistake.`,
        config: {
          temperature: 0.7,
        },
      });
      return response.text;
    } catch (error) {
      console.error("AI Feedback error:", error);
      return "Incorrect protocol. Review the challenge and try again.";
    }
  };

  const handleVerify = async () => {
    setIsChecking(true);
    setFeedback(null);
    
    const normalizedInput = userInput.trim().replace(/\s+/g, ' ');
    const normalizedExpected = lesson.expectedAnswer.trim().replace(/\s+/g, ' ');
    
    // Case-insensitive comparison for text, but Luau code is case-sensitive usually.
    // However, for these simple lessons, we'll allow some flexibility.
    const isCorrect = normalizedInput.toLowerCase() === normalizedExpected.toLowerCase();

    if (isCorrect) {
      setStatus('correct');
      setIsChecking(false);
    } else {
      const aiFeedback = await getFeedbackFromAI(userInput);
      setStatus('error');
      setFeedback(aiFeedback || null);
      setIsChecking(false);
    }
  };

  const highlightCode = (code: string) => {
    if (!code) return '';
    let html = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

    html = html.replace(/(&quot;.*?&quot;)/g, '<span class="syntax-string">$1</span>');
    html = html.replace(/(&#039;.*?&#039;)/g, '<span class="syntax-string">$1</span>');
    
    const parts = html.split(/(<span class="syntax-string">.*?<\/span>)/g);
    html = parts.map(part => {
      if (part.startsWith('<span class="syntax-string"')) return part;
      part = part.replace(/\b(local|function|end|if|then|else|while|do|for|in|return|true|false)\b/g, '<span class="syntax-keyword">$1</span>');
      part = part.replace(/\b(print|wait|warn|error|pairs|ipairs|task|spawn|delay|game|workspace|script)\b/g, '<span class="syntax-builtin">$1</span>');
      part = part.replace(/\b(\d+)\b/g, '<span class="syntax-number">$1</span>');
      return part;
    }).join('');

    html = html.replace(/(--.*)/g, '<span class="syntax-comment">$1</span>');
    return html;
  };

  const lineCount = userInput.split('\n').length;
  const lines = Array.from({ length: Math.max(lineCount, 6) }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 bg-black z-[60] overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="max-w-3xl mx-auto px-5 py-6 md:py-12 min-h-screen flex flex-col">
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white/30 hover:text-white transition-colors mb-6 md:mb-8 group w-fit py-1"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Return</span>
        </button>

        {/* Header */}
        <div className="mb-6 md:mb-10">
          <div className="text-white/20 mb-2 flex items-center gap-2">
             <span className="p-1 rounded-md bg-white/5 flex items-center justify-center scale-75 origin-left">{parentIcon}</span>
             <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold">Node {lesson.id.toUpperCase()}</span>
          </div>
          <h1 className="text-xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            {lesson.title}
          </h1>
          <p className="mt-3 md:mt-4 text-white/60 text-sm md:text-lg leading-relaxed whitespace-pre-wrap">
            {lesson.content}
          </p>
        </div>

        {/* Editor */}
        <div className="flex-grow flex flex-col">
          <div className="flex items-center justify-between px-3 md:px-4 py-2 bg-[#141414] border-x border-t border-white/10 rounded-t-xl md:rounded-t-2xl">
             <div className="flex items-center gap-2">
               <Terminal size={10} className="text-white/30" />
               <span className="text-[8px] md:text-[10px] uppercase font-bold text-white/30 tracking-widest">Compiler</span>
             </div>
             <div className="flex gap-1">
               <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/5"></div>
               <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/5"></div>
               <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/5"></div>
             </div>
          </div>

          <div className={`relative flex flex-grow min-h-[220px] md:min-h-[350px] bg-[#0A0A0A] border-x border-b transition-all duration-300 overflow-hidden ${
            status === 'correct' ? 'border-green-500/30 rounded-b-xl md:rounded-b-2xl' : 
            status === 'error' ? 'border-red-500/30 animate-shake rounded-b-xl md:rounded-b-2xl' : 'border-white/10 rounded-b-xl md:rounded-b-2xl'
          }`}>
            <div className="w-8 md:w-12 bg-white/[0.02] border-r border-white/5 flex flex-col items-center py-3 md:py-4 font-mono text-[10px] md:text-[12px] text-white/10 select-none">
              {lines.map(n => <div key={n} className="leading-[20px] md:leading-[24px]">{n}</div>)}
            </div>

            <div className="relative flex-grow font-mono text-[13px] md:text-[14px] leading-[20px] md:leading-[24px]">
              <pre 
                className="absolute inset-0 p-3 md:p-4 m-0 pointer-events-none whitespace-pre-wrap break-all text-white/80"
                dangerouslySetInnerHTML={{ __html: highlightCode(userInput) + '<span class="animate-pulse border-l border-white/50 ml-[1px]"></span>' }}
              />
              <textarea
                ref={textareaRef}
                value={userInput}
                onChange={(e) => {
                  setUserInput(e.target.value);
                  if (status === 'error') {
                    setStatus('idle');
                    setFeedback(null);
                  }
                }}
                disabled={status === 'correct' || isChecking}
                spellCheck={false}
                autoFocus
                placeholder={lesson.placeholder || "-- Input Protocol..."}
                className="absolute inset-0 w-full h-full p-3 md:p-4 bg-transparent text-transparent caret-white outline-none resize-none m-0 whitespace-pre-wrap break-all font-mono text-[13px] md:text-[14px] leading-[20px] md:leading-[24px]"
              />
            </div>

            {status === 'correct' && (
              <div className="absolute top-3 right-3 bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest animate-in zoom-in">
                Success
              </div>
            )}
            {status === 'error' && (
              <div className="absolute top-3 right-3 bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest animate-in zoom-in">
                Error
              </div>
            )}
            {isChecking && (
              <div className="absolute top-3 right-3 flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-white/40">
                <Loader2 size={10} className="animate-spin" />
                Validating
              </div>
            )}
          </div>

          <div className="mt-6 mb-8 flex flex-col items-stretch gap-4">
            <div className="px-1 relative">
              <div className="flex items-center justify-between mb-1.5">
                <h4 className="text-white/30 text-[8px] font-black uppercase tracking-[0.2em]">Objective</h4>
                {lesson.hint && (
                  <button 
                    onClick={() => setShowHint(!showHint)}
                    className={`flex items-center gap-1.5 transition-all duration-300 ${showHint ? 'text-white' : 'text-white/20 hover:text-white/50'}`}
                  >
                    <span className="text-[8px] font-black uppercase tracking-widest">Protocol Hint</span>
                    <Lightbulb size={12} className={showHint ? 'animate-pulse text-yellow-400' : ''} />
                  </button>
                )}
              </div>
              <p className="text-white/90 font-medium text-base md:text-lg leading-relaxed mb-3">
                {lesson.challenge}
              </p>
              
              <div className="space-y-3">
                {showHint && (
                  <div className="animate-in slide-in-from-top-2 fade-in duration-300 bg-white/[0.03] border border-white/5 p-4 rounded-xl">
                    <p className="text-white/50 text-xs md:text-sm italic leading-relaxed">
                      <span className="text-white/80 font-bold not-italic uppercase tracking-tighter mr-2 text-[10px]">Uplink Tip:</span>
                      {lesson.hint}
                    </p>
                  </div>
                )}

                {status === 'error' && feedback && (
                  <div className="animate-in slide-in-from-top-2 fade-in duration-300 bg-red-500/5 border border-red-500/20 p-4 rounded-xl flex items-start gap-3">
                    <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-red-400 text-[8px] font-black uppercase tracking-widest mb-1">Analysis Report</h5>
                      <p className="text-red-200/70 text-xs md:text-sm leading-relaxed">
                        {feedback}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="shrink-0 pt-2">
              {status !== 'correct' ? (
                <button 
                  onClick={handleVerify}
                  disabled={isChecking || !userInput.trim()}
                  className="w-full py-5 bg-white text-black rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em] active:scale-[0.97] transition-all disabled:opacity-10 flex items-center justify-center gap-2 shadow-xl shadow-white/5"
                >
                  {isChecking ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Analyzing...
                    </>
                  ) : 'Initialize Logic'}
                </button>
              ) : (
                <button 
                  onClick={onNext}
                  className="w-full py-5 bg-green-600 text-white rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em] active:scale-[0.97] transition-all animate-in slide-in-from-bottom-2 flex items-center justify-center gap-2 shadow-xl shadow-green-600/20"
                >
                  {onNext ? 'Next Protocol' : 'Finish Path'}
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.2s cubic-bezier(.36,.07,.19,.97) both;
        }
        textarea::placeholder {
          color: rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
};

export default LessonView;