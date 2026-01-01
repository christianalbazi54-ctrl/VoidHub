import React from 'react';
import { ChevronLeft, Play, ArrowRight } from 'lucide-react';
import { ModuleItem, Lesson } from '../types';

interface DetailViewProps {
  item: ModuleItem;
  onBack: () => void;
  onSelectLesson: (lesson: Lesson) => void;
}

const DetailView: React.FC<DetailViewProps> = ({ item, onBack, onSelectLesson }) => {
  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-bottom-4 duration-500 scroll-smooth">
      <div className="max-w-2xl mx-auto px-5 py-8 md:py-12 min-h-screen flex flex-col">
        {/* Header */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white/30 hover:text-white transition-colors mb-8 md:mb-12 group w-fit py-2"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Exit VoidHub</span>
        </button>

        <div className="flex items-center gap-4 md:gap-6 mb-10 md:mb-16">
          <div className="p-4 md:p-5 rounded-[20px] md:rounded-[24px] bg-[#0A0A0A] border border-white/10 white-glow text-white shrink-0 scale-90 md:scale-100">
            {item.icon}
          </div>
          <div className="overflow-hidden">
            <h1 className="text-2xl md:text-5xl font-bold text-white tracking-tight mb-1 uppercase truncate">
              {item.label}
            </h1>
            <p className="text-white/30 font-bold tracking-[0.2em] text-[8px] md:text-[10px] uppercase">Specialist Protocol</p>
          </div>
        </div>

        <div className="space-y-12 md:space-y-20 pb-16">
          <section>
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h2 className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">Module Stages</h2>
              <span className="text-white/20 text-[9px] md:text-[10px] font-bold">{item.content.lessons.length} UNITS</span>
            </div>
            <div className="grid gap-3">
              {item.content.lessons.map((lesson, idx) => (
                <button
                  key={lesson.id}
                  onClick={() => onSelectLesson(lesson)}
                  className="w-full p-4 md:p-6 rounded-[24px] md:rounded-[28px] bg-[#0A0A0A] border border-white/5 hover:border-white/20 transition-all flex items-center justify-between group active:scale-[0.98] hover:bg-[#111111]"
                >
                  <div className="flex items-center gap-4 md:gap-6 overflow-hidden">
                    <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full bg-white/5 flex items-center justify-center text-white/20 font-mono text-[10px] md:text-xs group-hover:bg-white/10 group-hover:text-white/40 transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div className="text-left overflow-hidden">
                      <span className="text-white/90 font-semibold text-sm md:text-lg group-hover:text-white block truncate">
                        {lesson.title}
                      </span>
                      <span className="text-white/10 text-[8px] md:text-[10px] uppercase tracking-widest font-black">Ready for Uplink</span>
                    </div>
                  </div>
                  <Play size={16} className="text-white/0 group-hover:text-white/60 transition-all transform translate-x-2 md:translate-x-0 shrink-0" />
                </button>
              ))}
            </div>
          </section>

          <section className="p-8 md:p-10 rounded-[32px] md:rounded-[48px] bg-[#0A0A0A] border border-white/5 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.02] pointer-events-none transform scale-[2] md:scale-[2.5] origin-top-right transition-transform group-hover:scale-[2.2] md:group-hover:scale-[2.7]">
               {item.icon}
             </div>
             <h2 className="text-white/30 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-6 md:mb-10">Certification Data</h2>
             <div className="space-y-6 md:space-y-8 relative z-10">
               <p className="text-white/80 text-lg md:text-2xl font-medium leading-relaxed max-w-md">
                 {item.content.outcome}
               </p>
               <button 
                  onClick={() => onSelectLesson(item.content.lessons[0])}
                  className="w-full py-5 md:py-7 rounded-full bg-white text-black font-black text-[10px] md:text-xs uppercase tracking-[0.25em] hover:bg-white/90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl"
               >
                 Execute First Node
                 <ArrowRight size={14} />
               </button>
             </div>
          </section>
        </div>
      </div>
      
      {/* Subtle bottom gradient for depth */}
      <div className="fixed bottom-0 left-0 w-full h-32 md:h-64 bg-gradient-to-t from-white/5 to-transparent pointer-events-none opacity-20"></div>
    </div>
  );
};

export default DetailView;