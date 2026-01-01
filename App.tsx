import React, { useState } from 'react';
import { 
  Code2, 
  Box, 
  Layout, 
  Zap 
} from 'lucide-react';
import FloatingBox from './components/FloatingBox';
import DetailView from './components/DetailView';
import LessonView from './components/LessonView';
import { ModuleItem, Lesson } from './types';

const App: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<ModuleItem | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  const modules: ModuleItem[] = [
    {
      id: 'scripting',
      label: 'Scripting (Luau)',
      icon: <Code2 size={32} strokeWidth={1.5} />,
      offset: 'md:-translate-x-6 md:-translate-y-12 -translate-x-2 -translate-y-8',
      delay: 0,
      content: {
        description: "Master the logic behind the world's most popular experiences.",
        learnings: ["Loops & Iteration", "Event Signals", "Table Manipulation", "Instance Creation"],
        process: ["Code logic", "Debugging", "Game mechanics"],
        outcome: "You will be able to build complex game systems like currency, inventories, and NPC AI.",
        lessons: [
          {
            id: 's0',
            title: 'The Explorer',
            content: "Before you code, you need to know where scripts live. The 'Explorer' window shows every object in your game.",
            challenge: "What is the name of the window where you find all your game's parts and scripts?",
            expectedAnswer: "Explorer",
            hint: "It's the window on the right side of Studio that starts with 'E'."
          },
          {
            id: 's1',
            title: 'Hello Studio',
            content: "The 'print' command sends text to the Output window. It's the most basic way to check if your code is running.",
            challenge: "Print the text \"Scripting is fun\" to the output window.",
            expectedAnswer: "print(\"Scripting is fun\")",
            hint: "Type the word print, followed by parentheses, and put the text inside quotes."
          },
          {
            id: 's2',
            title: 'Variables',
            content: "Variables store information. We use 'local' to define them. This keeps our code efficient and organized.",
            challenge: "Create a local variable named 'score' and set it to 100.",
            expectedAnswer: "local score = 100",
            hint: "Start with 'local', then the name, an equals sign, and the number."
          },
          {
            id: 's3',
            title: 'Functions',
            content: "Functions are blocks of code that run when called. They are the building blocks of game logic.",
            challenge: "Define a function named 'OnTouch' that ends immediately.",
            expectedAnswer: "function OnTouch() end",
            hint: "Format: function Name() ... end"
          },
          {
            id: 's4',
            title: 'Conditionals',
            content: "If statements check if something is true. They allow your game to make decisions.",
            challenge: "Write an if statement that checks if 'coins' equals 10 then print \"Success\".",
            expectedAnswer: "if coins == 10 then print(\"Success\") end",
            hint: "Use '==' for comparison and remember the 'then' and 'end'."
          },
          {
            id: 's5',
            title: 'While Loops',
            content: "Loops repeat code. A 'while' loop runs as long as a condition is met.",
            challenge: "Write a loop that runs forever (while true). Use wait() inside.",
            expectedAnswer: "while true do wait() end",
            hint: "Use 'while true do', then the wait function, and finally 'end'."
          },
          {
            id: 's6',
            title: 'Tables',
            content: "Tables are like lists. They hold multiple values in one variable.",
            challenge: "Create a local table named 'items' that is empty.",
            expectedAnswer: "local items = {}",
            hint: "Tables use curly braces: {}"
          },
          {
            id: 's7',
            title: 'Vector3',
            content: "In 3D space, positions and sizes use Vector3 (X, Y, Z).",
            challenge: "Set a variable 'pos' to a new Vector3 at 0, 10, 0.",
            expectedAnswer: "local pos = Vector3.new(0, 10, 0)",
            hint: "Use Vector3.new(x, y, z)"
          }
        ]
      }
    },
    {
      id: 'building',
      label: 'Building / Modeling',
      icon: <Box size={32} strokeWidth={1.5} />,
      offset: 'md:translate-x-6 md:-translate-y-4 translate-x-2 -translate-y-2',
      delay: 0.4,
      content: {
        description: "Learn to construct immersive 3D worlds from scratch.",
        learnings: ["Lighting FX", "Solid Modeling", "Interaction Objects", "Group Hierarchy"],
        process: ["Structure", "Atmosphere", "Playability"],
        outcome: "You will build maps that look professional and run efficiently on all devices.",
        lessons: [
          { id: 'b0', title: 'The Toolbar', content: "Toolbar tools: Select, Move, Scale, Rotate.", challenge: "Which tool grabs objects without moving them?", expectedAnswer: "Select", hint: "It's the first tool on the Home tab." },
          { id: 'b1', title: 'Anchoring', content: "Anchoring stops physics.", challenge: "Property that keeps parts from falling?", expectedAnswer: "Anchored", hint: "Check the Properties window under Behavior." },
          { id: 'b2', title: 'Transparency', content: "Parts can be invisible. 0 is opaque, 1 is fully clear.", challenge: "What value makes a part half-invisible?", expectedAnswer: "0.5", hint: "It's a decimal between 0 and 1." },
          { id: 'b3', title: 'Grouping', content: "Models organize parts into single objects for easier management.", challenge: "Keyboard shortcut to group parts together?", expectedAnswer: "Ctrl+G", hint: "Hold Control and press the letter G." },
          { id: 'b4', title: 'Materials', content: "Change the look of a part from Plastic to Neon or Grass.", challenge: "Material that makes a part glow with light?", expectedAnswer: "Neon", hint: "Think of bright gas-filled tubes." },
          { id: 'b5', title: 'Unions', content: "CSG (Constructive Solid Geometry) lets you merge multiple parts into one complex shape.", challenge: "What is the name of the operation that merges parts into one?", expectedAnswer: "Union", hint: "Look in the Model tab under Solid Modeling." },
          { id: 'b6', title: 'PointLight', content: "Lights make your builds look professional. PointLights radiate in all directions.", challenge: "Object that creates a glow around a part?", expectedAnswer: "PointLight", hint: "An object you insert inside a Part to emit light." },
          { id: 'b7', title: 'ParticleEmitter', content: "Visual effects like fire, smoke, or sparkles.", challenge: "Object used to create fire effects?", expectedAnswer: "ParticleEmitter", hint: "It 'emits' particles from a surface." }
        ]
      }
    },
    {
      id: 'gui',
      label: 'GUI Design',
      icon: <Layout size={32} strokeWidth={1.5} />,
      offset: 'md:-translate-x-10 md:translate-y-6 -translate-x-4 translate-y-4',
      delay: 0.8,
      content: {
        description: "Design intuitive interfaces that players love to interact with.",
        learnings: ["Constraint Systems", "Visual Polish", "Screen Scaling", "Z-Indexing"],
        process: ["Wireframing", "Skinning", "Logic Binding"],
        outcome: "Create custom shops, health bars, and inventory menus that stand out.",
        lessons: [
          { id: 'g0', title: 'StarterGui', content: "UI folder.", challenge: "Folder for all UI?", expectedAnswer: "StarterGui", hint: "It lives in the Explorer below StarterPack." },
          { id: 'g1', title: 'ScreenGui', content: "Root container.", challenge: "Object needed before buttons?", expectedAnswer: "ScreenGui", hint: "Every 2D interface needs this top-level object." },
          { id: 'g2', title: 'UICorner', content: "Modern UI usually has rounded edges.", challenge: "Modifier that rounds corners of a frame?", expectedAnswer: "UICorner", hint: "Add this as a child to any Frame or Button." },
          { id: 'g3', title: 'ZIndex', content: "Determines which UI element is on top of others.", challenge: "Property that controls the stack order?", expectedAnswer: "ZIndex", hint: "Higher numbers appear in front." },
          { id: 'g4', title: 'UIGradient', content: "Add smooth color transitions to your buttons.", challenge: "Modifier for color transitions?", expectedAnswer: "UIGradient", hint: "Used to make a color fade from one to another." },
          { id: 'g5', title: 'UIListLayout', content: "Automatically stacks items in a list format, perfect for shops.", challenge: "Object that stacks UI elements automatically?", expectedAnswer: "UIListLayout", hint: "It starts with 'UI' and ends with 'Layout'." },
          { id: 'g6', title: 'TextScaled', content: "Ensures text fills the box regardless of device size.", challenge: "Property that scales text to fit?", expectedAnswer: "TextScaled", hint: "A boolean property found in the 'Text' section." },
          { id: 'g7', title: 'TextButton', content: "The basic element for user clicks.", challenge: "Object used for clickable text buttons?", expectedAnswer: "TextButton", hint: "It's a button that displays text." }
        ]
      }
    },
    {
      id: 'animation',
      label: 'Animation',
      icon: <Zap size={32} strokeWidth={1.5} />,
      offset: 'md:translate-x-10 md:translate-y-16 translate-x-4 translate-y-12',
      delay: 1.2,
      content: {
        description: "Bring your world to life with fluid character and object motion.",
        learnings: ["Rigging Basics", "Easing Styles", "Priority Logic", "Weighted Blending"],
        process: ["Posing", "Timing", "Polish"],
        outcome: "You'll be able to create custom emotes, combat moves, and environmental effects.",
        lessons: [
          { id: 'a0', title: 'The Rig', content: "Animatable model.", challenge: "Character model with joints?", expectedAnswer: "Rig", hint: "R15 or R6 templates are types of this." },
          { id: 'a1', title: 'Keyframes', content: "Timeline points.", challenge: "Points on a timeline?", expectedAnswer: "Keyframes", hint: "Dots that save a character's pose." },
          { id: 'a2', title: 'Easing Styles', content: "Determines if movement is smooth, bouncy, or elastic.", challenge: "Style that makes a movement bounce?", expectedAnswer: "Bounce", hint: "Check the right-click menu on a keyframe for styles." },
          { id: 'a3', title: 'Looping', content: "Set animations to play repeatedly for idle poses.", challenge: "Property to repeat animation?", expectedAnswer: "Looped", hint: "A toggle in the Animation Editor." },
          { id: 'a4', title: 'Priority', content: "Determines which animation takes control (Idle, Movement, Action).", challenge: "Property that sets animation importance?", expectedAnswer: "Priority", hint: "Can be Idle, Movement, Action, or Core." },
          { id: 'a5', title: 'AnimationTrack', content: "The object returned when you load an animation to a humanoid.", challenge: "What object is created when loading an animation?", expectedAnswer: "AnimationTrack", hint: "It represents the animation currently being played." },
          { id: 'a6', title: 'Markers', content: "Events triggered at specific moments in an animation (e.g., footstep sound).", challenge: "Points used to trigger code mid-animation?", expectedAnswer: "Markers", hint: "You can name these and listen for them in a script." },
          { id: 'a7', title: 'Weight', content: "How much an animation influences the final pose when blended.", challenge: "Property that controls blend strength?", expectedAnswer: "Weight", hint: "Determines how 'heavy' the animation influences the result." }
        ]
      }
    }
  ];

  const handleNextLesson = () => {
    if (!selectedModule || !activeLesson) return;
    const lessons = selectedModule.content.lessons;
    const currentIndex = lessons.findIndex(l => l.id === activeLesson.id);
    if (currentIndex < lessons.length - 1) {
      setActiveLesson(lessons[currentIndex + 1]);
    } else {
      setActiveLesson(null);
      setSelectedModule(null);
    }
  };

  return (
    <main className="fixed inset-0 bg-black flex items-center justify-center p-4 overflow-hidden select-none">
      {!selectedModule && (
        <div className="relative grid grid-cols-2 gap-x-4 gap-y-4 md:flex md:flex-wrap md:items-center md:justify-center md:gap-x-12 md:gap-y-16 max-w-2xl animate-in fade-in zoom-in-95 duration-700">
          {modules.map((module) => (
            <FloatingBox 
              key={module.id} 
              item={module} 
              onClick={setSelectedModule}
            />
          ))}
        </div>
      )}

      {selectedModule && !activeLesson && (
        <DetailView 
          item={selectedModule} 
          onBack={() => setSelectedModule(null)} 
          onSelectLesson={setActiveLesson}
        />
      )}

      {activeLesson && selectedModule && (
        <LessonView 
          lesson={activeLesson}
          parentIcon={selectedModule.icon}
          onBack={() => setActiveLesson(null)}
          onNext={handleNextLesson}
        />
      )}
    </main>
  );
};

export default App;