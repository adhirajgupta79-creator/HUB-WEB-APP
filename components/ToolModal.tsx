import React, { useState, useEffect } from 'react';
import { Tool, ToolType } from '../types';
import { X, Upload, Download, CheckCircle, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToolModalProps {
  tool: Tool | null;
  onClose: () => void;
}

const ToolModal: React.FC<ToolModalProps> = ({ tool, onClose }) => {
  const [step, setStep] = useState<'input' | 'processing' | 'result'>('input');
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  
  useEffect(() => {
    setStep('input');
    setInputValue('');
    setResult('');
    setFile(null);
  }, [tool]);

  if (!tool) return null;

  const handleProcess = () => {
    setStep('processing');
    
    // SPECIAL CASE: Text to PDF (Simulated generation)
    if (tool.id === 'text-to-pdf') {
      setTimeout(() => {
        setResult('document.pdf');
        setStep('result');
      }, 2000);
      return;
    }

    // SPECIAL CASE: Image OCR (Simulated extraction)
    if (tool.id === 'image-ocr') {
      setTimeout(() => {
        setResult("Extracted Text Content:\n\nThis is a simulated extraction of text from the image you uploaded. In a real server-side environment, an OCR engine would process the image bytes and identify the characters.\n\nConfidence: 99%\nLanguage: English");
        setStep('result');
      }, 2500);
      return;
    }

    // Standard File Processor (Returns a file download)
    if (tool.type === ToolType.FILE_PROCESSOR) {
      setTimeout(() => {
        let filename = 'processed_file';
        let extension = 'pdf'; // Default fallback

        switch (tool.id) {
            // PDF -> Office
            case 'pdf-to-word':
            case 'pdf-to-docx':
                extension = 'docx';
                break;
            case 'pdf-to-excel':
                extension = 'xlsx';
                break;
            case 'pdf-to-ppt':
                extension = 'pptx';
                break;
            case 'pdf-to-text':
                extension = 'txt';
                break;
            
            // Image -> Office/PDF
            case 'image-to-doc':
                extension = 'docx';
                break;
            case 'image-to-ppt':
                extension = 'pptx';
                break;
            case 'image-to-pdf':
                extension = 'pdf';
                break;

            // Office -> PDF
            case 'word-to-pdf':
            case 'excel-to-pdf':
            case 'ppt-to-pdf':
                extension = 'pdf';
                break;

            // Image Ops
            case 'image-compressor':
                filename = 'optimized_images';
                extension = 'zip';
                break;
            case 'image-converter':
                extension = 'png'; // Simulating conversion to PNG
                break;
            case 'doc-to-image':
                filename = 'converted_pages';
                extension = 'zip';
                break;
            case 'pdf-to-jpg':
                filename = 'extracted_pages';
                extension = 'zip';
                break;

            // PDF Ops
            case 'split-pdf':
                filename = 'split_documents';
                extension = 'zip';
                break;
            case 'merge-pdf':
                filename = 'merged_document';
                extension = 'pdf';
                break;
            case 'compress-pdf':
                filename = 'compressed_document';
                extension = 'pdf';
                break;
            case 'unlock-pdf':
                filename = 'unlocked_document';
                extension = 'pdf';
                break;
            case 'protect-pdf':
                filename = 'protected_document';
                extension = 'pdf';
                break;
            case 'rotate-pdf':
                filename = 'rotated_document';
                extension = 'pdf';
                break;
            
            default:
                extension = 'pdf';
        }
        
        setResult(`${filename}.${extension}`);
        setStep('result');
      }, 2000);
      return;
    }

    try {
      let calcResult = "Action Completed";
      setResult(calcResult);
      setTimeout(() => setStep('result'), 600);
    } catch (e) {
      setStep('input');
      alert("Error processing request");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const renderInputArea = () => {
    // Handle File Inputs (File Processor)
    if (tool.type === ToolType.FILE_PROCESSOR) {
      return (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center bg-gray-50 hover:bg-white hover:border-black transition-all cursor-pointer group"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <input 
            type="file" 
            id="file-upload" 
            className="hidden" 
            onChange={(e) => e.target.files && setFile(e.target.files[0])} 
            accept={tool.accepts}
          />
          <div className="p-4 bg-white rounded-full w-fit mx-auto mb-4 border border-gray-200 group-hover:scale-110 transition-transform">
             <Upload className="text-gray-900" size={32} strokeWidth={1.5} />
          </div>
          {file ? (
            <p className="text-black font-semibold">{file.name}</p>
          ) : (
            <>
              <p className="text-lg text-gray-900 font-medium mb-1">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">Supports {tool.accepts}</p>
            </>
          )}
        </div>
      );
    }

    // Text Area Inputs (Text Editor or Text-to-PDF)
    if (tool.type === ToolType.TEXT_EDITOR || tool.id === 'text-to-pdf') {
      return (
        <textarea 
          className="w-full h-48 bg-gray-50 border border-gray-300 p-4 rounded-lg text-black font-mono focus:border-black focus:ring-1 focus:ring-black focus:outline-none resize-none transition-all"
          placeholder='Paste your text content here...'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      );
    }

    // Simple Inputs
    return (
      <input 
        type="text"
        className="w-full bg-gray-50 border border-gray-300 p-4 rounded-lg text-black focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition-all"
        placeholder="Enter value..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    );
  };

  const renderResult = () => {
    // Handle File Download Results (including Text-to-PDF)
    const isFileDownload = (tool.type === ToolType.FILE_PROCESSOR && tool.id !== 'image-ocr') || tool.id === 'text-to-pdf';

    if (isFileDownload) {
      return (
        <div className="text-center py-8">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-black" size={40} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl text-black font-bold mb-2">Processing Complete</h3>
            <p className="text-gray-500 mb-8">Your file is ready for download.</p>
            <button 
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-black text-white font-bold py-4 px-10 rounded-lg hover:bg-gray-800 transition-all"
            >
                <Download size={20} strokeWidth={2} /> Download {result}
            </button>
        </div>
      );
    }

    // Text Output (OCR etc.)
    return (
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-inner">
        <div className="flex justify-between items-start gap-4">
            <pre className="text-black font-mono text-sm md:text-sm whitespace-pre-wrap break-all w-full leading-relaxed">{result}</pre>
            <button 
                onClick={() => navigator.clipboard.writeText(result)}
                className="text-gray-400 hover:text-black transition-colors shrink-0"
                title="Copy to clipboard"
            >
                <Copy size={20} strokeWidth={1.5} />
            </button>
        </div>
      </div>
    );
  };

  // Determine if main action button should be disabled
  const isActionDisabled = () => {
      // If tool requires a file
      if (tool.type === ToolType.FILE_PROCESSOR && !file) return true;
      
      // If tool requires text input
      if (tool.type === ToolType.TEXT_EDITOR && !inputValue && tool.id !== 'text-to-pdf') return true;
      
      return false;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
                <tool.icon className="text-black" size={20} strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{tool.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition-all">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
            <AnimatePresence mode="wait">
                {step === 'input' && (
                    <motion.div 
                        key="input"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-6"
                    >
                        <p className="text-gray-600 leading-relaxed">{tool.description}</p>
                        {renderInputArea()}
                        
                        <button 
                            onClick={handleProcess}
                            disabled={isActionDisabled()}
                            className={`w-full py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all
                            ${isActionDisabled()
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                : 'bg-black text-white hover:bg-gray-800 shadow-md hover:shadow-lg'}`}
                        >
                            {tool.actionButtonText || 'Process Data'}
                        </button>
                    </motion.div>
                )}

                {step === 'processing' && (
                    <motion.div 
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-16"
                    >
                        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-6"></div>
                        <p className="text-gray-900 font-medium tracking-wide">
                            PROCESSING...
                        </p>
                    </motion.div>
                )}

                {step === 'result' && (
                    <motion.div 
                        key="result"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                    >
                        {renderResult()}
                        <button 
                            onClick={() => {
                                setStep('input');
                                setFile(null);
                                setInputValue('');
                            }}
                            className="w-full py-3 border border-gray-300 rounded-lg text-gray-600 font-medium hover:text-black hover:border-black transition-all"
                        >
                            Reset & Process Another
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ToolModal;