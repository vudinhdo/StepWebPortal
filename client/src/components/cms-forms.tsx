import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { 
  Article, InsertArticle, UpdateArticle,
  Service, InsertService, UpdateService,
  Testimonial, InsertTestimonial, UpdateTestimonial,
  PageContent, InsertPageContent, UpdatePageContent,
  SiteSetting, InsertSiteSetting
} from "@shared/schema";

const articleCategories = [
  "Tin tức công nghệ",
  "Hướng dẫn kỹ thuật", 
  "Xu hướng Cloud",
  "Bảo mật mạng",
  "Phát triển web",
  "DevOps",
  "AI & Machine Learning"
];

const serviceCategories = ["hosting", "cloud", "domain", "server", "email", "software"];
const pageNames = ["home", "about", "contact", "blog", "hosting", "cloud", "domain"];
const settingCategories = ["general", "seo", "contact", "social", "appearance"];

interface CmsFormsProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'article' | 'service' | 'testimonial' | 'pageContent' | 'setting';
  editingItem: any;
  onSuccess: () => void;
}

export function CmsForms({ isOpen, onClose, type, editingItem, onSuccess }: CmsFormsProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const generateSlugFromTitle = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      const endpoint = editingItem ? 
        `/api/${getEndpointName(type)}/${editingItem.id}` : 
        `/api/${getEndpointName(type)}`;
      
      const method = editingItem ? "PATCH" : "POST";
      
      // Auto-generate slug for articles if not provided
      if (type === 'article' && formData.title && !formData.slug) {
        formData.slug = generateSlugFromTitle(formData.title);
      }
      
      const response = await apiRequest(method, endpoint, formData);
      
      if (response.ok) {
        toast({
          title: "Thành công!",
          description: `${getTypeName(type)} đã được ${editingItem ? 'cập nhật' : 'tạo'} thành công.`,
        });
        onSuccess();
        onClose();
      }
    } catch (error) {
      toast({
        title: "Lỗi!",
        description: `Không thể ${editingItem ? 'cập nhật' : 'tạo'} ${getTypeName(type)}.`,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const getEndpointName = (type: string) => {
    switch (type) {
      case 'article': return 'articles';
      case 'service': return 'services';
      case 'testimonial': return 'testimonials';
      case 'pageContent': return 'page-contents';
      case 'setting': return 'site-settings';
      default: return type;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'article': return 'bài viết';
      case 'service': return 'dịch vụ';
      case 'testimonial': return 'testimonial';
      case 'pageContent': return 'nội dung trang';
      case 'setting': return 'cài đặt';
      default: return type;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? 'Chỉnh sửa' : 'Thêm mới'} {getTypeName(type)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {type === 'article' && (
            <ArticleForm 
              editingItem={editingItem} 
              onSubmit={handleSubmit} 
              isLoading={isLoading} 
            />
          )}
          {type === 'service' && (
            <ServiceForm 
              editingItem={editingItem} 
              onSubmit={handleSubmit} 
              isLoading={isLoading} 
            />
          )}
          {type === 'testimonial' && (
            <TestimonialForm 
              editingItem={editingItem} 
              onSubmit={handleSubmit} 
              isLoading={isLoading} 
            />
          )}
          {type === 'pageContent' && (
            <PageContentForm 
              editingItem={editingItem} 
              onSubmit={handleSubmit} 
              isLoading={isLoading} 
            />
          )}
          {type === 'setting' && (
            <SettingForm 
              editingItem={editingItem} 
              onSubmit={handleSubmit} 
              isLoading={isLoading} 
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Article Form Component
function ArticleForm({ editingItem, onSubmit, isLoading }: any) {
  const [formData, setFormData] = useState({
    title: editingItem?.title || "",
    slug: editingItem?.slug || "",
    excerpt: editingItem?.excerpt || "",
    content: editingItem?.content || "",
    category: editingItem?.category || "",
    tags: editingItem?.tags?.join(', ') || "",
    imageUrl: editingItem?.imageUrl || "",
    author: editingItem?.author || "STEP Team",
    isPublished: editingItem?.isPublished || false,
    isFeatured: editingItem?.isFeatured || false,
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      tags: formData.tags ? formData.tags.split(',').map((tag: string) => tag.trim()) : [],
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Tiêu đề</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="slug">Slug (URL thân thiện)</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => handleChange('slug', e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="excerpt">Mô tả ngắn</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => handleChange('excerpt', e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="content">Nội dung</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => handleChange('content', e.target.value)}
          rows={8}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Danh mục</Label>
          <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
              {articleCategories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="author">Tác giả</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => handleChange('author', e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="tags">Tags (phân cách bằng dấu phẩy)</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => handleChange('tags', e.target.value)}
          placeholder="react, nextjs, typescript"
        />
      </div>

      <div>
        <Label htmlFor="imageUrl">URL hình ảnh</Label>
        <Input
          id="imageUrl"
          value={formData.imageUrl}
          onChange={(e) => handleChange('imageUrl', e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="isPublished"
            checked={formData.isPublished}
            onCheckedChange={(checked) => handleChange('isPublished', checked)}
          />
          <Label htmlFor="isPublished">Đã xuất bản</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isFeatured"
            checked={formData.isFeatured}
            onCheckedChange={(checked) => handleChange('isFeatured', checked)}
          />
          <Label htmlFor="isFeatured">Bài viết nổi bật</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : (editingItem ? "Cập nhật" : "Tạo mới")}
        </Button>
      </div>
    </form>
  );
}

// Service Form Component
function ServiceForm({ editingItem, onSubmit, isLoading }: any) {
  const [formData, setFormData] = useState({
    name: editingItem?.name || "",
    description: editingItem?.description || "",
    icon: editingItem?.icon || "",
    category: editingItem?.category || "",
    features: editingItem?.features?.join('\n') || "",
    pricing: editingItem?.pricing ? JSON.stringify(editingItem.pricing, null, 2) : "",
    isActive: editingItem?.isActive !== false,
    order: editingItem?.order || 0,
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      features: formData.features ? formData.features.split('\n').map((f: string) => f.trim()).filter((f: string) => f) : [],
      pricing: formData.pricing ? JSON.parse(formData.pricing) : null,
      order: parseInt(formData.order.toString()) || 0,
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Tên dịch vụ</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Danh mục</Label>
          <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
              {serviceCategories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Mô tả</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="features">Tính năng (mỗi dòng một tính năng)</Label>
        <Textarea
          id="features"
          value={formData.features}
          onChange={(e) => handleChange('features', e.target.value)}
          rows={5}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="icon">Icon</Label>
          <Input
            id="icon"
            value={formData.icon}
            onChange={(e) => handleChange('icon', e.target.value)}
            placeholder="server, cloud, shield..."
          />
        </div>
        <div>
          <Label htmlFor="order">Thứ tự hiển thị</Label>
          <Input
            id="order"
            type="number"
            value={formData.order}
            onChange={(e) => handleChange('order', parseInt(e.target.value))}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="pricing">Giá (JSON format)</Label>
        <Textarea
          id="pricing"
          value={formData.pricing}
          onChange={(e) => handleChange('pricing', e.target.value)}
          rows={4}
          placeholder='{"basic": 100000, "pro": 200000, "enterprise": 500000}'
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => handleChange('isActive', checked)}
        />
        <Label htmlFor="isActive">Đang hoạt động</Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : (editingItem ? "Cập nhật" : "Tạo mới")}
        </Button>
      </div>
    </form>
  );
}

// Testimonial Form Component
function TestimonialForm({ editingItem, onSubmit, isLoading }: any) {
  const [formData, setFormData] = useState({
    clientName: editingItem?.clientName || "",
    clientTitle: editingItem?.clientTitle || "",
    company: editingItem?.company || "",
    content: editingItem?.content || "",
    rating: editingItem?.rating || 5,
    imageUrl: editingItem?.imageUrl || "",
    isActive: editingItem?.isActive !== false,
    order: editingItem?.order || 0,
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      rating: parseInt(formData.rating.toString()) || 5,
      order: parseInt(formData.order.toString()) || 0,
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="clientName">Tên khách hàng</Label>
          <Input
            id="clientName"
            value={formData.clientName}
            onChange={(e) => handleChange('clientName', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="clientTitle">Chức vụ</Label>
          <Input
            id="clientTitle"
            value={formData.clientTitle}
            onChange={(e) => handleChange('clientTitle', e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="company">Công ty</Label>
        <Input
          id="company"
          value={formData.company}
          onChange={(e) => handleChange('company', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="content">Nội dung testimonial</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => handleChange('content', e.target.value)}
          required
          rows={4}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="rating">Đánh giá (1-5 sao)</Label>
          <Input
            id="rating"
            type="number"
            min="1"
            max="5"
            value={formData.rating}
            onChange={(e) => handleChange('rating', parseInt(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="order">Thứ tự hiển thị</Label>
          <Input
            id="order"
            type="number"
            value={formData.order}
            onChange={(e) => handleChange('order', parseInt(e.target.value))}
          />
        </div>
        <div className="flex items-center space-x-2 pt-6">
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) => handleChange('isActive', checked)}
          />
          <Label htmlFor="isActive">Hiển thị</Label>
        </div>
      </div>

      <div>
        <Label htmlFor="imageUrl">URL ảnh đại diện</Label>
        <Input
          id="imageUrl"
          value={formData.imageUrl}
          onChange={(e) => handleChange('imageUrl', e.target.value)}
          placeholder="https://example.com/avatar.jpg"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : (editingItem ? "Cập nhật" : "Tạo mới")}
        </Button>
      </div>
    </form>
  );
}

// Page Content Form Component
function PageContentForm({ editingItem, onSubmit, isLoading }: any) {
  const [formData, setFormData] = useState({
    pageName: editingItem?.pageName || "",
    section: editingItem?.section || "",
    title: editingItem?.title || "",
    subtitle: editingItem?.subtitle || "",
    content: editingItem?.content || "",
    imageUrl: editingItem?.imageUrl || "",
    ctaText: editingItem?.ctaText || "",
    ctaUrl: editingItem?.ctaUrl || "",
    metadata: editingItem?.metadata ? JSON.stringify(editingItem.metadata, null, 2) : "",
    isActive: editingItem?.isActive !== false,
    order: editingItem?.order || 0,
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      metadata: formData.metadata ? JSON.parse(formData.metadata) : null,
      order: parseInt(formData.order.toString()) || 0,
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="pageName">Tên trang</Label>
          <Select value={formData.pageName} onValueChange={(value) => handleChange('pageName', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn trang" />
            </SelectTrigger>
            <SelectContent>
              {pageNames.map((page) => (
                <SelectItem key={page} value={page}>{page}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="section">Phần</Label>
          <Input
            id="section"
            value={formData.section}
            onChange={(e) => handleChange('section', e.target.value)}
            required
            placeholder="hero, services, testimonials..."
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Tiêu đề</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="subtitle">Phụ đề</Label>
          <Input
            id="subtitle"
            value={formData.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="content">Nội dung</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => handleChange('content', e.target.value)}
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ctaText">Nút hành động</Label>
          <Input
            id="ctaText"
            value={formData.ctaText}
            onChange={(e) => handleChange('ctaText', e.target.value)}
            placeholder="Liên hệ ngay"
          />
        </div>
        <div>
          <Label htmlFor="ctaUrl">Link hành động</Label>
          <Input
            id="ctaUrl"
            value={formData.ctaUrl}
            onChange={(e) => handleChange('ctaUrl', e.target.value)}
            placeholder="/contact"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="imageUrl">URL hình ảnh</Label>
        <Input
          id="imageUrl"
          value={formData.imageUrl}
          onChange={(e) => handleChange('imageUrl', e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <Label htmlFor="metadata">Metadata (JSON)</Label>
        <Textarea
          id="metadata"
          value={formData.metadata}
          onChange={(e) => handleChange('metadata', e.target.value)}
          rows={3}
          placeholder='{"colors": ["blue", "white"], "animation": "fade"}'
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) => handleChange('isActive', checked)}
          />
          <Label htmlFor="isActive">Kích hoạt</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Label htmlFor="order">Thứ tự:</Label>
          <Input
            id="order"
            type="number"
            className="w-20"
            value={formData.order}
            onChange={(e) => handleChange('order', parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : (editingItem ? "Cập nhật" : "Tạo mới")}
        </Button>
      </div>
    </form>
  );
}

// Setting Form Component
function SettingForm({ editingItem, onSubmit, isLoading }: any) {
  const [formData, setFormData] = useState({
    key: editingItem?.key || "",
    value: editingItem?.value || "",
    description: editingItem?.description || "",
    category: editingItem?.category || "",
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="key">Key</Label>
          <Input
            id="key"
            value={formData.key}
            onChange={(e) => handleChange('key', e.target.value)}
            required
            disabled={editingItem} // Don't allow changing key when editing
          />
        </div>
        <div>
          <Label htmlFor="category">Danh mục</Label>
          <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
              {settingCategories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="value">Giá trị</Label>
        <Textarea
          id="value"
          value={formData.value}
          onChange={(e) => handleChange('value', e.target.value)}
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="description">Mô tả</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={2}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : (editingItem ? "Cập nhật" : "Tạo mới")}
        </Button>
      </div>
    </form>
  );
}