
import { ReactNode } from 'react';

export interface Lesson {
  id: string;
  title: string;
  content: string;
  challenge: string;
  codeExample?: string;
  expectedAnswer: string; // The correct code or keyword to unlock next lesson
  placeholder?: string;   // Input placeholder
  hint?: string;          // Helpful tip if the user is stuck
}

export interface PathContent {
  description: string;
  learnings: string[];
  process: string[];
  outcome: string;
  lessons: Lesson[];
}

export interface ModuleItem {
  id: string;
  label: string;
  icon: ReactNode;
  offset: string;
  delay: number;
  content: PathContent;
}
