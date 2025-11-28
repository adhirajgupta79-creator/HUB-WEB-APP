import { LucideIcon } from 'lucide-react';

export enum ToolCategory {
  PDF = 'PDF Tools',
  IMAGE = 'Image Tools',
  TEXT = 'Text Tools',
  UTILITY = 'Utility Tools',
}

export enum ToolType {
  FILE_PROCESSOR = 'file_processor', // Upload -> Process -> Download
  GENERATOR = 'generator', // Input -> Result
  CALCULATOR = 'calculator', // Input -> Result
  CONVERTER = 'converter', // Input -> Result
  TEXT_EDITOR = 'text_editor', // Textarea -> Textarea
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  category: ToolCategory;
  icon: LucideIcon;
  type: ToolType;
  actionButtonText?: string;
  // For UI simulation specifics
  accepts?: string; // e.g. "application/pdf"
  outputType?: string; // e.g. "image/jpeg"
}