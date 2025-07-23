import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Edit3, Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditableContentProps {
  id: string;
  type: "text" | "heading" | "paragraph" | "image" | "link";
  content: string;
  isEditMode?: boolean;
  onUpdate?: (content: string, metadata?: Record<string, any>) => void;
  className?: string;
  placeholder?: string;
  metadata?: Record<string, any>;
}

export function EditableContent({
  id,
  type,
  content,
  isEditMode = false,
  onUpdate,
  className = "",
  placeholder = "Click để chỉnh sửa...",
  metadata = {}
}: EditableContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(content);
  const [editMetadata, setEditMetadata] = useState(metadata);

  const handleClick = () => {
    if (isEditMode) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    onUpdate?.(editValue, editMetadata);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(content);
    setEditMetadata(metadata);
    setIsEditing(false);
  };

  const renderContent = () => {
    switch (type) {
      case "heading":
        return (
          <h1 className={cn("text-4xl font-bold", className)}>
            {content || placeholder}
          </h1>
        );
      case "paragraph":
        return (
          <p className={cn("text-base", className)}>
            {content || placeholder}
          </p>
        );
      case "text":
        return (
          <span className={cn("", className)}>
            {content || placeholder}
          </span>
        );
      case "image":
        return (
          <img 
            src={content || "/placeholder.jpg"} 
            alt={metadata.alt || ""}
            className={cn("max-w-full h-auto", className)}
          />
        );
      case "link":
        return (
          <a 
            href={metadata.url || "#"} 
            className={cn("text-blue-600 hover:underline", className)}
          >
            {content || placeholder}
          </a>
        );
      default:
        return content || placeholder;
    }
  };

  const renderEditor = () => {
    switch (type) {
      case "heading":
      case "text":
        return (
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder={placeholder}
            className="mb-4"
          />
        );
      case "paragraph":
        return (
          <Textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder={placeholder}
            rows={4}
            className="mb-4"
          />
        );
      case "image":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">URL hình ảnh</label>
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Alt text</label>
              <Input
                value={editMetadata.alt || ""}
                onChange={(e) => setEditMetadata(prev => ({ ...prev, alt: e.target.value }))}
                placeholder="Mô tả hình ảnh"
              />
            </div>
            {editValue && (
              <div>
                <label className="block text-sm font-medium mb-2">Xem trước</label>
                <img src={editValue} alt="Preview" className="max-w-64 h-auto border rounded" />
              </div>
            )}
          </div>
        );
      case "link":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Văn bản hiển thị</label>
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder="Văn bản link"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">URL</label>
              <Input
                value={editMetadata.url || ""}
                onChange={(e) => setEditMetadata(prev => ({ ...prev, url: e.target.value }))}
                placeholder="https://example.com"
              />
            </div>
          </div>
        );
      default:
        return (
          <Textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder={placeholder}
            rows={3}
            className="mb-4"
          />
        );
    }
  };

  if (!isEditMode) {
    return <div className={className}>{renderContent()}</div>;
  }

  return (
    <>
      <div 
        onClick={handleClick}
        className={cn(
          "relative cursor-pointer group hover:bg-blue-50/50 rounded p-1 transition-colors",
          className
        )}
      >
        {renderContent()}
        <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
          >
            <Edit3 className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa {type === "heading" ? "tiêu đề" : type === "paragraph" ? "đoạn văn" : "nội dung"}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {renderEditor()}

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
              >
                Hủy
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Lưu
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}