import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface MarkdownEditorProps {
    markdown: string;
    onMarkdownChange: (markdown: string) => void;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ markdown, onMarkdownChange }) => {
    const [html, setHtml] = useState<string>('');

    useEffect(() => {
        const convert = async () => {
            const rawHtml = await marked.parse(markdown, { async: true, breaks: true, gfm: true });
            const cleanHtml = DOMPurify.sanitize(rawHtml);
            setHtml(cleanHtml);
        };
        convert();
    }, [markdown]);

    return (
        <div className="flex flex-col h-full">
            {/* Editor Area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Markdown Input */}
                <div className="flex-1 flex flex-col border-r">
                    <div className="px-4 py-2 bg-gray-50 border-b text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Markdown
                    </div>
                    <textarea
                        className="flex-1 p-6 resize-none font-mono text-sm focus:outline-none"
                        value={markdown}
                        onChange={(e) => onMarkdownChange(e.target.value)}
                        placeholder="Type your markdown here..."
                        spellCheck={false}
                    />
                </div>

                {/* Preview Output */}
                <div className="flex-1 flex flex-col bg-white">
                    <div className="px-4 py-2 bg-gray-50 border-b text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Preview
                    </div>
                    <div 
                        className="flex-1 p-6 overflow-auto prose prose-slate max-w-none markdown-preview"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </div>
            </div>
        </div>
    );
};