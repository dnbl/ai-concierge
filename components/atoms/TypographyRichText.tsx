import React from 'react';
import MarkdownRenderer from '../MarkdownRenderer';

export interface TypographyRichTextProps {
  content: string;
  className?: string;
  variant?: 'default' | 'compact' | 'spacious';
}

const TypographyRichText: React.FC<TypographyRichTextProps> = ({
  content,
  className = '',
  variant = 'default'
}) => {
  const spacingClasses = {
    default: 'mb-4',
    compact: 'mb-2',
    spacious: 'mb-6'
  };

  // Process content to add proper spacing and structure
  const processContent = (text: string): string => {
    // Split content into lines and process each section
    const lines = text.split('\n');
    const processedLines: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();
      
      // Add spacing after headings
      if (trimmedLine.startsWith('## ') || trimmedLine.startsWith('### ')) {
        processedLines.push(line);
        // Add extra line break after headings for better spacing
        if (i < lines.length - 1 && lines[i + 1].trim() !== '') {
          processedLines.push('');
        }
      }
      // Add spacing before and after bullet lists
      else if (trimmedLine.startsWith('• ') || trimmedLine.startsWith('- ')) {
        // Add spacing before first bullet point
        if (i === 0 || !lines[i - 1].trim().startsWith('• ') && !lines[i - 1].trim().startsWith('- ')) {
          processedLines.push('');
        }
        processedLines.push(line);
      }
      // Add spacing after dividers
      else if (trimmedLine === '---' || trimmedLine === '***') {
        processedLines.push(line);
        processedLines.push('');
      }
      // Regular content
      else {
        processedLines.push(line);
      }
    }
    
    return processedLines.join('\n');
  };

  const processedContent = processContent(content);

  return (
    <div className={`typography-rich-text ${className}`}>
      <div className={`prose prose-invert prose-sm max-w-none ${spacingClasses[variant]}`}>
        <MarkdownRenderer content={processedContent} />
      </div>
    </div>
  );
};

export default TypographyRichText;
