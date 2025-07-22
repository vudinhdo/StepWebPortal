import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { 
  Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Quote, Link, Image, Code, Type, Palette,
  Undo, Redo, Eye, Edit3
} from "lucide-react";

interface WysiwygEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

export function WysiwygEditor({ value, onChange, placeholder = "Nhập nội dung...", height = "400px" }: WysiwygEditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

  const execCommand = useCallback((command: string, value: string = '') => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value);
      handleContentChange();
    }
  }, []);

  const handleContentChange = useCallback(() => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onChange(content);
    }
  }, [onChange]);

  const handleSelectionChange = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setSelectedText(selection.toString());
    }
  }, []);

  const insertLink = () => {
    const url = prompt('Nhập URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Nhập URL hình ảnh:');
    if (url) {
      execCommand('insertImage', url);
    }
  };

  const formatBlock = (tag: string) => {
    execCommand('formatBlock', `<${tag}>`);
  };

  const changeTextColor = () => {
    const color = prompt('Nhập mã màu (hex):');
    if (color) {
      execCommand('foreColor', color);
    }
  };

  const changeBackgroundColor = () => {
    const color = prompt('Nhập mã màu nền (hex):');
    if (color) {
      execCommand('hiliteColor', color);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-2">
        <div className="flex flex-wrap items-center gap-1">
          {/* Text Formatting */}
          <div className="flex items-center gap-1">
            <Toggle
              size="sm"
              pressed={document.queryCommandState('bold')}
              onPressedChange={() => execCommand('bold')}
              aria-label="Bold"
            >
              <Bold className="w-4 h-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={document.queryCommandState('italic')}
              onPressedChange={() => execCommand('italic')}
              aria-label="Italic"
            >
              <Italic className="w-4 h-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={document.queryCommandState('underline')}
              onPressedChange={() => execCommand('underline')}
              aria-label="Underline"
            >
              <Underline className="w-4 h-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={document.queryCommandState('strikeThrough')}
              onPressedChange={() => execCommand('strikeThrough')}
              aria-label="Strikethrough"
            >
              <Strikethrough className="w-4 h-4" />
            </Toggle>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Text Alignment */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('justifyLeft')}
            >
              <AlignLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('justifyCenter')}
            >
              <AlignCenter className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('justifyRight')}
            >
              <AlignRight className="w-4 h-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Lists */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('insertUnorderedList')}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('insertOrderedList')}
            >
              <ListOrdered className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => formatBlock('blockquote')}
            >
              <Quote className="w-4 h-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Links and Media */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={insertLink}
            >
              <Link className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={insertImage}
            >
              <Image className="w-4 h-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Text Style */}
          <div className="flex items-center gap-1">
            <select
              className="px-2 py-1 text-sm border border-gray-300 rounded"
              onChange={(e) => formatBlock(e.target.value)}
              defaultValue=""
            >
              <option value="">Kiểu văn bản</option>
              <option value="h1">Tiêu đề 1</option>
              <option value="h2">Tiêu đề 2</option>
              <option value="h3">Tiêu đề 3</option>
              <option value="h4">Tiêu đề 4</option>
              <option value="h5">Tiêu đề 5</option>
              <option value="h6">Tiêu đề 6</option>
              <option value="p">Đoạn văn</option>
            </select>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={changeTextColor}
            >
              <Type className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={changeBackgroundColor}
            >
              <Palette className="w-4 h-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Undo/Redo */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('undo')}
            >
              <Undo className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => execCommand('redo')}
            >
              <Redo className="w-4 h-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Preview Toggle */}
          <Toggle
            size="sm"
            pressed={isPreview}
            onPressedChange={setIsPreview}
            aria-label="Preview"
          >
            {isPreview ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Toggle>
        </div>
      </div>

      {/* Editor Content */}
      <div style={{ height }}>
        {isPreview ? (
          <div 
            className="p-4 prose max-w-none h-full overflow-auto"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            className="p-4 h-full overflow-auto focus:outline-none"
            style={{ minHeight: height }}
            onInput={handleContentChange}
            onMouseUp={handleSelectionChange}
            onKeyUp={handleSelectionChange}
            dangerouslySetInnerHTML={{ __html: value }}
            data-placeholder={placeholder}
          />
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 text-xs text-gray-500 flex justify-between items-center">
        <div>
          {isPreview ? "Chế độ xem trước" : "Chế độ chỉnh sửa"}
        </div>
        <div>
          Ký tự: {value.replace(/<[^>]*>/g, '').length}
        </div>
      </div>

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        
        [contenteditable] h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0;
        }
        
        [contenteditable] h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0.875rem 0;
        }
        
        [contenteditable] h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0.75rem 0;
        }
        
        [contenteditable] h4 {
          font-size: 1.125rem;
          font-weight: bold;
          margin: 0.625rem 0;
        }
        
        [contenteditable] h5 {
          font-size: 1rem;
          font-weight: bold;
          margin: 0.5rem 0;
        }
        
        [contenteditable] h6 {
          font-size: 0.875rem;
          font-weight: bold;
          margin: 0.5rem 0;
        }
        
        [contenteditable] p {
          margin: 0.5rem 0;
        }
        
        [contenteditable] blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
        }
        
        [contenteditable] ul, [contenteditable] ol {
          padding-left: 2rem;
          margin: 0.5rem 0;
        }
        
        [contenteditable] li {
          margin: 0.25rem 0;
        }
        
        [contenteditable] a {
          color: #3b82f6;
          text-decoration: underline;
        }
        
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          margin: 0.5rem 0;
        }
        
        [contenteditable] code {
          background-color: #f3f4f6;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-family: monospace;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}