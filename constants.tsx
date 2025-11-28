import { 
  FileText, Merge, Split, Scissors, FileType, Image, Type, Lock, Unlock, 
  RotateCw, Layers, Stamp, Minimize, Mic, Volume2, 
  Palette, RefreshCw, Clock, Hash, Ruler, ScanText, Presentation, FileSpreadsheet
} from 'lucide-react';
import { Tool, ToolCategory, ToolType } from './types';

export const TOOLS: Tool[] = [
  // --- TOP PRIORITY: IMAGE TOOLS ---
  {
    id: 'image-to-pdf',
    title: 'Image to PDF',
    description: 'Convert PNG, JPG, or WebP images into a single PDF.',
    category: ToolCategory.PDF,
    icon: Image,
    type: ToolType.FILE_PROCESSOR,
    accepts: 'image/*',
    actionButtonText: 'Create PDF'
  },
  {
    id: 'image-to-doc',
    title: 'Image to DOC',
    description: 'Convert images into editable Word documents.',
    category: ToolCategory.IMAGE,
    icon: FileText,
    type: ToolType.FILE_PROCESSOR,
    accepts: 'image/*',
    actionButtonText: 'Convert to DOC'
  },
  {
    id: 'image-to-ppt',
    title: 'Image to PPT',
    description: 'Convert images into editable PowerPoint presentations.',
    category: ToolCategory.IMAGE,
    icon: Presentation,
    type: ToolType.FILE_PROCESSOR,
    accepts: 'image/*',
    actionButtonText: 'Convert to PPT'
  },
  {
    id: 'image-ocr',
    title: 'Image to Text (OCR)',
    description: 'Extract text content from images using OCR.',
    category: ToolCategory.IMAGE,
    icon: ScanText,
    type: ToolType.FILE_PROCESSOR,
    accepts: 'image/*',
    actionButtonText: 'Extract Text'
  },
  {
    id: 'image-compressor',
    title: 'Image Compressor',
    description: 'Optimize images for web use.',
    category: ToolCategory.IMAGE,
    icon: Minimize,
    type: ToolType.FILE_PROCESSOR,
    accepts: 'image/*',
    actionButtonText: 'Compress Image'
  },
  {
    id: 'image-converter',
    title: 'Image Converter',
    description: 'Convert between JPG, PNG, and WEBP.',
    category: ToolCategory.IMAGE,
    icon: RefreshCw,
    type: ToolType.FILE_PROCESSOR,
    accepts: 'image/*',
    actionButtonText: 'Convert'
  },
  {
    id: 'doc-to-image',
    title: 'DOC to Image',
    description: 'Convert DOC/DOCX pages into high-quality images.',
    category: ToolCategory.IMAGE,
    icon: Image,
    type: ToolType.FILE_PROCESSOR,
    accepts: '.doc,.docx',
    actionButtonText: 'Convert to Images'
  },

  // --- PDF TOOLS ---
  {
    id: 'merge-pdf',
    title: 'Merge PDF',
    description: 'Combine multiple PDFs into one unified document.',
    category: ToolCategory.PDF,
    icon: Merge,
    type: ToolType.FILE_PROCESSOR,
    accepts: '.pdf',
    actionButtonText: 'Merge Files'
  },
  {
    id: 'split-pdf',
    title: 'Split PDF',
    description: 'Separate a single PDF into individual pages.',
    category: ToolCategory.PDF,
    icon: Split,
    type: ToolType.FILE_PROCESSOR,
    accepts: '.pdf',
    actionButtonText: 'Split Document'
  },
  {
    id: 'compress-pdf',
    title: 'Compress PDF',
    description: 'Reduce file size while maintaining quality.',
    category: ToolCategory.PDF,
    icon: Minimize,
    type: ToolType.FILE_PROCESSOR,
    accepts: '.pdf',
    actionButtonText: 'Compress'
  },
  {
    id: 'pdf-to-word',
    title: 'PDF to Word',
    description: 'Convert PDF documents to editable Word files.',
    category: ToolCategory.PDF,
    icon: FileText,
    type: ToolType.FILE_PROCESSOR,
    accepts: '.pdf',
    actionButtonText: 'Convert to Word'
  },
  {
    id: 'pdf-to-docx',
    title: 'PDF to DOCX',
    description: 'Convert PDF files specifically to DOCX format.',
    category: ToolCategory.PDF,
    icon: FileText,
    type: ToolType.FILE_PROCESSOR,
    accepts: '.pdf',
    actionButtonText: 'Convert to DOCX'
  },
  {
    id: 'pdf-to-excel',
    title: 'PDF to Excel',
    description: 'Convert PDF data into editable Excel spreadsheets.',
    category: ToolCategory.PDF,
    icon: FileSpreadsheet,
    type: ToolType.FILE_PROCESSOR,
    accepts: '.pdf',
    actionButtonText: 'Convert to Excel'
  },
  {
    id: 'excel-to-pdf',
    title: 'Excel to PDF',
    description: 'Convert Excel spreadsheets to PDF format.',
    category: ToolCategory.PDF,
    icon: FileSpreadsheet,
    type: ToolType.FILE_PROCESSOR,
    accepts: '.xls,.xlsx',
    actionButtonText: 'Convert to PDF'
  },
  {
    id: 'pdf-to-ppt',
    title: 'PDF to PowerPoint',
    description: 'Convert PDF content into editable PowerPoint slides.',
    category: ToolCategory.PDF,
    icon: Presentation,
    type: ToolType.FILE_PROCESSOR,
    accepts: '.pdf',
    actionButtonText: 'Convert to PPT'
  },
  {
    id: 'ppt-to-pdf',
    title: 'PowerPoint to PDF',
    description: 'Convert PowerPoint presentations to PDF format.',
    category: ToolCategory.PDF,
    icon: Presentation,
    type: ToolType.FILE_PROCESSOR,
    accepts: '.ppt,.pptx',
    actionButtonText: 'Convert to PDF'
  },
  {
    id: 'pdf-to-text',
    title: 'PDF to Text',
    description: 'Extract raw text from PDF files.',
    category: ToolCategory.PDF,
    icon: FileText,
    type: ToolType.FILE_PROCESSOR,
    accepts: '.pdf',
    actionButtonText: 'Extract Text'
  },
  {
    id: 'word-to-pdf',
    title: 'Word to PDF',
    description: 'Convert DOC/DOCX files to PDF format.',
    category: ToolCategory.PDF,
    icon: FileType,
    type: ToolType.FILE_PROCESSOR,
    accepts: '.doc,.docx',
    actionButtonText: 'Convert to PDF'
  },
  {
    id: 'pdf-to-jpg',
    title: 'PDF to JPG',
    description: 'Extract pages from PDF as high-quality images.',
    category: ToolCategory.PDF,
    icon: Image,
    type: ToolType.FILE_PROCESSOR,
    accepts: '.pdf',
    actionButtonText: 'Convert to JPG'
  },
  {
    id: 'text-to-pdf',
    title: 'Text to PDF',
    description: 'Convert plain text content into a PDF document.',
    category: ToolCategory.PDF,
    icon: Type,
    type: ToolType.TEXT_EDITOR,
    actionButtonText: 'Download PDF'
  },
  {
    id: 'unlock-pdf',
    title: 'Unlock PDF',
    description: 'Remove password protection from PDF files.',
    category: ToolCategory.PDF,
    icon: Unlock,
    type: ToolType.FILE_PROCESSOR,
    accepts: '.pdf',
    actionButtonText: 'Unlock'
  },
  {
    id: 'protect-pdf',
    title: 'Protect PDF',
    description: 'Encrypt your PDF with a secure password.',
    category: ToolCategory.PDF,
    icon: Lock,
    type: ToolType.FILE_PROCESSOR,
    accepts: '.pdf',
    actionButtonText: 'Encrypt'
  },
  {
    id: 'rotate-pdf',
    title: 'Rotate PDF',
    description: 'Rotate PDF pages permanently.',
    category: ToolCategory.PDF,
    icon: RotateCw,
    type: ToolType.FILE_PROCESSOR,
    accepts: '.pdf',
    actionButtonText: 'Rotate'
  }
];