import { useState, useRef, useEffect } from "react";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { Edit3, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditableTextProps {
  id: string;
  type: 'page-content' | 'article' | 'service' | 'testimonial';
  field: string;
  value: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  multiline?: boolean;
  placeholder?: string;
}

export function EditableText({
  id,
  type,
  field,
  value,
  as: Component = 'p',
  className,
  multiline = false,
  placeholder = "Nhấp để chỉnh sửa...",
}: EditableTextProps) {
  const { isEditMode, canEdit, updatePendingChange, registerEditable, pendingChanges } = useInlineEdit();
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const key = `${type}-${id}-${field}`;

  useEffect(() => {
    registerEditable(key, { id, type, field, originalValue: value });
  }, [id, type, field, value, key, registerEditable]);

  useEffect(() => {
    const item = pendingChanges.get(key);
    if (item) {
      setLocalValue(item.currentValue);
    } else {
      setLocalValue(value);
    }
  }, [pendingChanges, key, value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    if (!isEditMode || !canEdit) return;
    setIsEditing(true);
  };

  const handleSave = () => {
    updatePendingChange(key, localValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    const item = pendingChanges.get(key);
    setLocalValue(item?.originalValue || value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const item = pendingChanges.get(key);
  const isDirty = item?.isDirty || false;

  if (!isEditMode) {
    return <Component className={className}>{value || placeholder}</Component>;
  }

  if (isEditing) {
    return (
      <div className="relative inline-flex items-center gap-2 w-full">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className={cn(
              "w-full min-h-[100px] p-2 border-2 border-blue-500 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300",
              className
            )}
            placeholder={placeholder}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className={cn(
              "w-full p-2 border-2 border-blue-500 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300",
              className
            )}
            placeholder={placeholder}
          />
        )}
        <div className="flex gap-1 shrink-0">
          <button
            onClick={handleSave}
            className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            title="Lưu (Enter)"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1.5 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            title="Hủy (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleStartEdit}
      className={cn(
        "relative group cursor-pointer rounded transition-all",
        "hover:bg-blue-50 hover:ring-2 hover:ring-blue-300",
        isDirty && "bg-yellow-50 ring-2 ring-yellow-400",
        className
      )}
      title="Nhấp để chỉnh sửa"
    >
      <Component className={cn("inline", className)}>
        {localValue || placeholder}
      </Component>
      <span className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Edit3 className="w-4 h-4 text-blue-500 bg-white rounded-full p-0.5 shadow" />
      </span>
      {isDirty && (
        <span className="absolute -left-1 top-0 w-1 h-full bg-yellow-400 rounded-l" />
      )}
    </div>
  );
}
