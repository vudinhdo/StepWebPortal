import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Edit3, Save, X, Image, Plus, Trash2, Eye, EyeOff,
  Type, ImageIcon, Layout, Settings, Palette
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EditableSection {
  id: string;
  type: 'text' | 'heading' | 'image' | 'button' | 'section';
  content: string;
  metadata?: Record<string, any>;
}

interface LiveEditorProps {
  isEditMode: boolean;
  onToggleEditMode: () => void;
  sections: EditableSection[];
  onUpdateSection: (id: string, content: string, metadata?: Record<string, any>) => void;
}

export function LiveEditor({ isEditMode, onToggleEditMode, sections, onUpdateSection }: LiveEditorProps) {
  const [selectedSection, setSelectedSection] = useState<EditableSection | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editMetadata, setEditMetadata] = useState<Record<string, any>>({});
  const { toast } = useToast();

  const handleEditSection = (section: EditableSection) => {
    setSelectedSection(section);
    setEditContent(section.content);
    setEditMetadata(section.metadata || {});
    setIsEditDialogOpen(true);
  };

  const handleSaveSection = () => {
    if (!selectedSection) return;
    
    onUpdateSection(selectedSection.id, editContent, editMetadata);
    setIsEditDialogOpen(false);
    setSelectedSection(null);
    
    toast({
      title: "Đã lưu thay đổi",
      description: "Nội dung đã được cập nhật",
    });
  };

  const renderEditableElement = (section: EditableSection) => {
    if (!isEditMode) return null;

    return (
      <div
        className="absolute inset-0 bg-blue-500/10 border-2 border-blue-500 border-dashed rounded cursor-pointer opacity-0 hover:opacity-100 transition-opacity group"
        onClick={() => handleEditSection(section)}
      >
        <div className="absolute top-2 right-2 flex gap-1">
          <Badge variant="secondary" className="text-xs">
            {section.type}
          </Badge>
          <Button
            size="sm"
            variant="secondary"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              handleEditSection(section);
            }}
          >
            <Edit3 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Edit Mode Toggle */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={onToggleEditMode}
          variant={isEditMode ? "destructive" : "default"}
          className="h-12 w-12 rounded-full shadow-lg"
        >
          {isEditMode ? (
            <EyeOff className="w-6 h-6" />
          ) : (
            <Edit3 className="w-6 h-6" />
          )}
        </Button>
      </div>

      {/* Edit Mode Indicator */}
      {isEditMode && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <Card className="bg-blue-600 text-white">
            <CardContent className="px-4 py-2">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                <span className="font-medium">Chế độ chỉnh sửa</span>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={onToggleEditMode}
                  className="h-6 px-2"
                >
                  Thoát
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Editable Elements Overlay */}
      {isEditMode && sections.map((section) => (
        <div key={section.id} className="relative">
          {renderEditableElement(section)}
        </div>
      ))}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit3 className="w-5 h-5" />
              Chỉnh sửa {selectedSection?.type}
            </DialogTitle>
          </DialogHeader>
          
          {selectedSection && (
            <div className="space-y-6">
              {/* Content Editor */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nội dung
                </label>
                {selectedSection.type === 'heading' || selectedSection.type === 'button' ? (
                  <Input
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="Nhập nội dung..."
                  />
                ) : selectedSection.type === 'image' ? (
                  <div className="space-y-3">
                    <Input
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      placeholder="URL hình ảnh..."
                    />
                    {editContent && (
                      <div className="border rounded-lg p-4">
                        <img 
                          src={editContent} 
                          alt="Preview" 
                          className="max-w-full h-48 object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder-image.jpg";
                          }}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="Nhập nội dung..."
                    rows={6}
                  />
                )}
              </div>

              {/* Metadata Editor */}
              {selectedSection.type === 'button' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Link URL
                    </label>
                    <Input
                      value={editMetadata.url || ""}
                      onChange={(e) => setEditMetadata(prev => ({ ...prev, url: e.target.value }))}
                      placeholder="/page-url hoặc https://example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Kiểu button
                    </label>
                    <select 
                      value={editMetadata.variant || "default"}
                      onChange={(e) => setEditMetadata(prev => ({ ...prev, variant: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="default">Mặc định</option>
                      <option value="outline">Viền</option>
                      <option value="ghost">Trong suốt</option>
                      <option value="destructive">Đỏ</option>
                    </select>
                  </div>
                </div>
              )}

              {selectedSection.type === 'heading' && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Cấp độ tiêu đề
                  </label>
                  <select 
                    value={editMetadata.level || "h2"}
                    onChange={(e) => setEditMetadata(prev => ({ ...prev, level: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="h1">H1 - Tiêu đề chính</option>
                    <option value="h2">H2 - Tiêu đề phụ</option>
                    <option value="h3">H3 - Tiêu đề nhỏ</option>
                    <option value="h4">H4 - Tiêu đề chi tiết</option>
                  </select>
                </div>
              )}

              {selectedSection.type === 'section' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Màu nền
                    </label>
                    <div className="flex gap-2">
                      {['bg-white', 'bg-gray-50', 'bg-blue-50', 'bg-green-50', 'bg-yellow-50'].map(bg => (
                        <button
                          key={bg}
                          onClick={() => setEditMetadata(prev => ({ ...prev, background: bg }))}
                          className={`w-8 h-8 rounded border-2 ${bg} ${
                            editMetadata.background === bg ? 'border-blue-500' : 'border-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Padding
                    </label>
                    <select 
                      value={editMetadata.padding || "py-12"}
                      onChange={(e) => setEditMetadata(prev => ({ ...prev, padding: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="py-4">Nhỏ</option>
                      <option value="py-8">Vừa</option>
                      <option value="py-12">Lớn</option>
                      <option value="py-16">Rất lớn</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Preview */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Xem trước
                </label>
                <div className="border rounded-lg p-4 bg-gray-50">
                  {selectedSection.type === 'heading' ? (
                    <div className={`font-bold ${
                      editMetadata.level === 'h1' ? 'text-4xl' :
                      editMetadata.level === 'h2' ? 'text-3xl' :
                      editMetadata.level === 'h3' ? 'text-2xl' : 'text-xl'
                    }`}>
                      {editContent || "Tiêu đề mẫu"}
                    </div>
                  ) : selectedSection.type === 'button' ? (
                    <button className={`px-4 py-2 rounded-md ${
                      editMetadata.variant === 'outline' ? 'border border-blue-600 text-blue-600' :
                      editMetadata.variant === 'ghost' ? 'text-blue-600 hover:bg-blue-50' :
                      editMetadata.variant === 'destructive' ? 'bg-red-600 text-white' :
                      'bg-blue-600 text-white'
                    }`}>
                      {editContent || "Button mẫu"}
                    </button>
                  ) : selectedSection.type === 'image' ? (
                    <img 
                      src={editContent || "/placeholder-image.jpg"} 
                      alt="Preview" 
                      className="max-w-full h-32 object-cover rounded"
                    />
                  ) : (
                    <p>{editContent || "Nội dung mẫu"}</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Hủy
                </Button>
                <Button onClick={handleSaveSection}>
                  <Save className="w-4 h-4 mr-2" />
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

// Hook để sử dụng Live Editor
export function useLiveEditor() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [sections, setSections] = useState<EditableSection[]>([]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const updateSection = (id: string, content: string, metadata?: Record<string, any>) => {
    setSections(prev => prev.map(section => 
      section.id === id 
        ? { ...section, content, metadata: metadata || section.metadata }
        : section
    ));
  };

  const registerSection = (section: EditableSection) => {
    setSections(prev => {
      const existing = prev.find(s => s.id === section.id);
      if (existing) {
        return prev.map(s => s.id === section.id ? section : s);
      }
      return [...prev, section];
    });
  };

  return {
    isEditMode,
    sections,
    toggleEditMode,
    updateSection,
    registerSection
  };
}