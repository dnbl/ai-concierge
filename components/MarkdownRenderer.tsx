import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [sanitizedContent, setSanitizedContent] = useState('');

  useEffect(() => {
    const renderMarkdown = async () => {
      if (content) {
        try {
          // Configure marked options
          marked.setOptions({
            gfm: true,
            breaks: true
          });
          
          const rawHtml = await marked.parse(content);
          const sanitized = DOMPurify.sanitize(rawHtml);
          setSanitizedContent(sanitized);
        } catch (error) {
          console.error('Markdown parsing error:', error);
          setSanitizedContent(content); // Fallback to raw content
        }
      } else {
        setSanitizedContent('');
      }
    };
    renderMarkdown();
  }, [content]);

  return (
    <div
      className="prose prose-invert prose-sm md:prose-base max-w-none 
                 prose-headings:text-cyan-300 prose-a:text-cyan-400 prose-strong:text-white"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default MarkdownRenderer;
