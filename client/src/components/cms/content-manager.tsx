import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, Edit3, Trash2, Save, Image, FileText, Layout, 
  Settings, Eye, EyeOff, Upload, Download, Copy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ContentItem {
  id: number;
  pageName: string;
  section: string;
  title?: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  metadata?: Record<string, any>;
  isActive: boolean;
  order: number;
}

export function ContentManager() {
  const [selectedPage, setSelectedPage] = useState("home");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch page contents
  const { data: contents = [], isLoading } = useQuery({
    queryKey: ["/api/page-contents", selectedPage],
  });

  // Create content mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<ContentItem>) => {
      return await apiRequest("/api/page-contents", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/page-contents"] });
      setIsCreateOpen(false);
      toast({
        title: "Thành công",
        description: "Đã tạo nội dung mới",
      });
    },
  });

  // Update content mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<ContentItem> }) => {
      return await apiRequest(`/api/page-contents/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/page-contents"] });
      setEditingItem(null);
      toast({
        title: "Đã cập nhật",
        description: "Nội dung đã được lưu",
      });
    },
  });

  // Delete content mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest(`/api/page-contents/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/page-contents"] });
      toast({
        title: "Đã xóa",
        description: "Nội dung đã được xóa",
        variant: "destructive",
      });
    },
  });

  const pages = [
    { id: "home", name: "Trang chủ" },
    { id: "about", name: "Giới thiệu" },
    { id: "services", name: "Dịch vụ" },
    { id: "contact", name: "Liên hệ" },
    { id: "blog", name: "Blog" }
  ];

  const sectionTypes = [
    { id: "hero", name: "Hero Section", icon: Layout },
    { id: "services", name: "Dịch vụ", icon: Settings },
    { id: "testimonials", name: "Testimonials", icon: FileText },
    { id: "cta", name: "Call to Action", icon: Plus },
    { id: "content", name: "Nội dung", icon: FileText },
    { id: "gallery", name: "Gallery", icon: Image }
  ];

  const handleCreateContent = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    createMutation.mutate({
      pageName: selectedPage,
      section: data.section as string,
      title: data.title as string,
      subtitle: data.subtitle as string,
      content: data.content as string,
      imageUrl: data.imageUrl as string,
      ctaText: data.ctaText as string,
      ctaUrl: data.ctaUrl as string,
      isActive: true,
      order: contents.length + 1,
    });
  };

  const handleUpdateContent = (item: ContentItem, formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    updateMutation.mutate({
      id: item.id,
      data: {
        title: data.title as string,
        subtitle: data.subtitle as string,
        content: data.content as string,
        imageUrl: data.imageUrl as string,
        ctaText: data.ctaText as string,
        ctaUrl: data.ctaUrl as string,
        isActive: data.isActive === "true",
      },
    });
  };

  const handleToggleActive = (item: ContentItem) => {
    updateMutation.mutate({
      id: item.id,
      data: { isActive: !item.isActive },
    });
  };

  const handleDuplicate = (item: ContentItem) => {
    createMutation.mutate({
      ...item,
      id: undefined,
      title: `${item.title} (Copy)`,
      order: contents.length + 1,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quản lý nội dung</h2>
          <p className="text-gray-600">Chỉnh sửa nội dung trực tiếp trên website</p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => window.open("/", "_blank")}
          >
            <Eye className="w-4 h-4 mr-2" />
            Xem website
          </Button>
          
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Thêm nội dung
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Thêm nội dung mới</DialogTitle>
              </DialogHeader>
              <ContentForm
                onSubmit={handleCreateContent}
                isLoading={createMutation.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Page Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Chọn trang</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {pages.map((page) => (
              <Button
                key={page.id}
                variant={selectedPage === page.id ? "default" : "outline"}
                onClick={() => setSelectedPage(page.id)}
              >
                {page.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content List */}
      <Card>
        <CardHeader>
          <CardTitle>Nội dung trang: {pages.find(p => p.id === selectedPage)?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Đang tải...</div>
          ) : contents.length === 0 ? (
            <div className="text-center py-12">
              <Layout className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">Chưa có nội dung</h3>
              <p className="text-gray-500 mb-4">Thêm phần nội dung đầu tiên cho trang này</p>
              <Button onClick={() => setIsCreateOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Thêm nội dung
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {contents.map((item: ContentItem) => (
                <div
                  key={item.id}
                  className={`border rounded-lg p-4 ${!item.isActive ? 'opacity-60 bg-gray-50' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{item.section}</Badge>
                        {!item.isActive && (
                          <Badge variant="outline" className="text-red-600">
                            Ẩn
                          </Badge>
                        )}
                        <span className="text-sm text-gray-500">#{item.order}</span>
                      </div>
                      
                      {item.title && (
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                      )}
                      
                      {item.subtitle && (
                        <p className="text-gray-600 mb-2">{item.subtitle}</p>
                      )}
                      
                      {item.content && (
                        <p className="text-sm text-gray-700 line-clamp-3">
                          {item.content}
                        </p>
                      )}
                      
                      {item.imageUrl && (
                        <div className="mt-2">
                          <img
                            src={item.imageUrl}
                            alt={item.title || "Content image"}
                            className="w-24 h-16 object-cover rounded border"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder-image.jpg";
                            }}
                          />
                        </div>
                      )}
                      
                      {item.ctaText && (
                        <div className="mt-2">
                          <Button variant="outline" size="sm">
                            {item.ctaText}
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleActive(item)}
                      >
                        {item.isActive ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDuplicate(item)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingItem(item)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (confirm("Bạn có chắc chắn muốn xóa?")) {
                            deleteMutation.mutate(item.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa nội dung</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <ContentForm
              initialData={editingItem}
              onSubmit={(formData) => handleUpdateContent(editingItem, formData)}
              isLoading={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Content Form Component
function ContentForm({ 
  initialData, 
  onSubmit, 
  isLoading = false 
}: { 
  initialData?: ContentItem; 
  onSubmit: (formData: FormData) => void;
  isLoading?: boolean;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  const sectionTypes = [
    { value: "hero", label: "Hero Section" },
    { value: "services", label: "Dịch vụ" },
    { value: "testimonials", label: "Testimonials" },
    { value: "cta", label: "Call to Action" },
    { value: "content", label: "Nội dung" },
    { value: "gallery", label: "Gallery" }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!initialData && (
        <div>
          <label className="block text-sm font-medium mb-2">Loại section</label>
          <select
            name="section"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Chọn loại section</option>
            {sectionTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Tiêu đề</label>
        <Input
          name="title"
          defaultValue={initialData?.title || ""}
          placeholder="Tiêu đề chính..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tiêu đề phụ</label>
        <Input
          name="subtitle"
          defaultValue={initialData?.subtitle || ""}
          placeholder="Tiêu đề phụ..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Nội dung</label>
        <Textarea
          name="content"
          defaultValue={initialData?.content || ""}
          placeholder="Nội dung chi tiết..."
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">URL hình ảnh</label>
        <Input
          name="imageUrl"
          defaultValue={initialData?.imageUrl || ""}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Text CTA</label>
          <Input
            name="ctaText"
            defaultValue={initialData?.ctaText || ""}
            placeholder="Xem thêm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">URL CTA</label>
          <Input
            name="ctaUrl"
            defaultValue={initialData?.ctaUrl || ""}
            placeholder="/page hoặc https://..."
          />
        </div>
      </div>

      {initialData && (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            value="true"
            defaultChecked={initialData.isActive}
            className="rounded"
          />
          <label className="text-sm font-medium">Hiển thị trên website</label>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>Đang lưu...</>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Lưu
            </>
          )}
        </Button>
      </div>
    </form>
  );
}