import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Edit3, Save, X, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface EditableSectionProps {
  sectionId: string;
  title?: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  isEditMode?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function EditableSection({
  sectionId,
  title,
  subtitle,
  content,
  imageUrl,
  ctaText,
  ctaUrl,
  isEditMode = false,
  className = "",
  children
}: EditableSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: title || "",
    subtitle: subtitle || "",
    content: content || "",
    imageUrl: imageUrl || "",
    ctaText: ctaText || "",
    ctaUrl: ctaUrl || ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Update content mutation
  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      // Find existing content or create new
      const response = await apiRequest("/api/page-contents", {
        method: "POST",
        body: JSON.stringify({
          pageName: "home",
          section: sectionId,
          ...data,
          isActive: true,
          order: 1
        }),
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/page-contents"] });
      setIsEditing(false);
      toast({
        title: "Đã lưu",
        description: "Nội dung đã được cập nhật",
      });
    },
    onError: () => {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật nội dung",
        variant: "destructive",
      });
    }
  });

  const handleSave = () => {
    updateMutation.mutate(editData);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  if (!isEditMode) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      {/* Edit Overlay */}
      <div className="absolute inset-0 bg-blue-500/10 border-2 border-blue-500 border-dashed rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10">
        <div className="absolute top-2 right-2 flex gap-1">
          <Badge variant="secondary" className="text-xs">
            {sectionId}
          </Badge>
          <Button
            size="sm"
            variant="secondary"
            className="h-6 w-6 p-0"
            onClick={handleEdit}
          >
            <Edit3 className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Original Content */}
      <div className="relative z-0">
        {children}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa {sectionId}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tiêu đề</label>
              <Input
                value={editData.title}
                onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Tiêu đề chính..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tiêu đề phụ</label>
              <Input
                value={editData.subtitle}
                onChange={(e) => setEditData(prev => ({ ...prev, subtitle: e.target.value }))}
                placeholder="Tiêu đề phụ..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nội dung</label>
              <Textarea
                value={editData.content}
                onChange={(e) => setEditData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Nội dung chi tiết..."
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">URL hình ảnh</label>
              <Input
                value={editData.imageUrl}
                onChange={(e) => setEditData(prev => ({ ...prev, imageUrl: e.target.value }))}
                placeholder="https://example.com/image.jpg"
              />
              {editData.imageUrl && (
                <div className="mt-2">
                  <img 
                    src={editData.imageUrl} 
                    alt="Preview" 
                    className="max-w-full h-32 object-cover rounded border"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-image.jpg";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Text CTA</label>
                <Input
                  value={editData.ctaText}
                  onChange={(e) => setEditData(prev => ({ ...prev, ctaText: e.target.value }))}
                  placeholder="Xem thêm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">URL CTA</label>
                <Input
                  value={editData.ctaUrl}
                  onChange={(e) => setEditData(prev => ({ ...prev, ctaUrl: e.target.value }))}
                  placeholder="/page hoặc https://..."
                />
              </div>
            </div>

            {/* Preview */}
            <div>
              <label className="block text-sm font-medium mb-2">Xem trước</label>
              <div className="border rounded-lg p-4 bg-gray-50">
                {editData.title && (
                  <h3 className="text-xl font-bold mb-2">{editData.title}</h3>
                )}
                {editData.subtitle && (
                  <p className="text-gray-600 mb-2">{editData.subtitle}</p>
                )}
                {editData.content && (
                  <p className="text-gray-700 mb-3">{editData.content}</p>
                )}
                {editData.ctaText && (
                  <Button variant="outline" size="sm">
                    {editData.ctaText}
                  </Button>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                <X className="w-4 h-4 mr-2" />
                Hủy
              </Button>
              <Button 
                onClick={handleSave}
                disabled={updateMutation.isPending}
              >
                <Save className="w-4 h-4 mr-2" />
                {updateMutation.isPending ? "Đang lưu..." : "Lưu"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}