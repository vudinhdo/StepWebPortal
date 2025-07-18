import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Eye, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Article, InsertArticle, UpdateArticle } from "@shared/schema";
import SeedBlogData from "@/components/seed-blog-data";

const categories = [
  "Tin tức công nghệ",
  "Hướng dẫn kỹ thuật", 
  "Xu hướng Cloud",
  "Bảo mật mạng",
  "Phát triển web",
  "DevOps",
  "AI & Machine Learning"
];

interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  imageUrl: string;
  author: string;
  isPublished: boolean;
  isFeatured: boolean;
}

const initialFormData: ArticleFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  tags: "",
  imageUrl: "",
  author: "STEP Team",
  isPublished: false,
  isFeatured: false,
};

export default function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState<ArticleFormData>(initialFormData);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  const createArticleMutation = useMutation({
    mutationFn: async (data: InsertArticle) => {
      const response = await apiRequest("POST", "/api/articles", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Thành công!",
        description: "Bài viết đã được tạo thành công.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/articles/published"] });
      queryClient.invalidateQueries({ queryKey: ["/api/articles/featured"] });
      setIsModalOpen(false);
      setFormData(initialFormData);
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi!",
        description: error.message || "Có lỗi xảy ra khi tạo bài viết.",
        variant: "destructive",
      });
    },
  });

  const updateArticleMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateArticle }) => {
      const response = await apiRequest("PATCH", `/api/articles/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Thành công!",
        description: "Bài viết đã được cập nhật thành công.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/articles/published"] });
      queryClient.invalidateQueries({ queryKey: ["/api/articles/featured"] });
      setIsModalOpen(false);
      setEditingArticle(null);
      setFormData(initialFormData);
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi!",
        description: error.message || "Có lỗi xảy ra khi cập nhật bài viết.",
        variant: "destructive",
      });
    },
  });

  const deleteArticleMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/articles/${id}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Thành công!",
        description: "Bài viết đã được xóa thành công.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/articles/published"] });
      queryClient.invalidateQueries({ queryKey: ["/api/articles/featured"] });
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi!",
        description: error.message || "Có lỗi xảy ra khi xóa bài viết.",
        variant: "destructive",
      });
    },
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleInputChange = (field: keyof ArticleFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === "title" && { slug: generateSlug(value as string) })
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const articleData = {
      ...formData,
      tags: formData.tags ? formData.tags.split(",").map(tag => tag.trim()) : [],
      imageUrl: formData.imageUrl || null,
    };

    if (editingArticle) {
      updateArticleMutation.mutate({ id: editingArticle.id, data: articleData });
    } else {
      createArticleMutation.mutate(articleData);
    }
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      tags: article.tags?.join(", ") || "",
      imageUrl: article.imageUrl || "",
      author: article.author,
      isPublished: article.isPublished,
      isFeatured: article.isFeatured,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      deleteArticleMutation.mutate(id);
    }
  };

  const resetModal = () => {
    setEditingArticle(null);
    setFormData(initialFormData);
    setIsModalOpen(false);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return format(new Date(dateString), "dd/MM/yyyy HH:mm");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quản lý Blog</h1>
            <p className="text-gray-600 mt-2">Tạo và quản lý các bài viết blog cho website STEP</p>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)]"
                onClick={() => resetModal()}
              >
                <Plus className="h-4 w-4 mr-2" />
                Tạo bài viết mới
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingArticle ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Tiêu đề *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Nhập tiêu đề bài viết"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleInputChange("slug", e.target.value)}
                      placeholder="url-bai-viet"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="excerpt">Tóm tắt *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange("excerpt", e.target.value)}
                    placeholder="Tóm tắt ngắn gọn về bài viết"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="content">Nội dung *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    placeholder="Nội dung chi tiết của bài viết"
                    rows={10}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Danh mục *</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleInputChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="author">Tác giả</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => handleInputChange("author", e.target.value)}
                      placeholder="Tên tác giả"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tags">Tags (phân cách bằng dấu phẩy)</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => handleInputChange("tags", e.target.value)}
                      placeholder="cloud, hosting, security"
                    />
                  </div>
                  <div>
                    <Label htmlFor="imageUrl">URL hình ảnh</Label>
                    <Input
                      id="imageUrl"
                      value={formData.imageUrl}
                      onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isPublished"
                      checked={formData.isPublished}
                      onCheckedChange={(checked) => handleInputChange("isPublished", checked)}
                    />
                    <Label htmlFor="isPublished">Xuất bản</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onCheckedChange={(checked) => handleInputChange("isFeatured", checked)}
                    />
                    <Label htmlFor="isFeatured">Bài viết nổi bật</Label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    type="submit" 
                    className="bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)]"
                    disabled={createArticleMutation.isPending || updateArticleMutation.isPending}
                  >
                    {editingArticle ? "Cập nhật" : "Tạo bài viết"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetModal}>
                    Hủy
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Seed Data Component */}
        <SeedBlogData />

        {/* Articles List */}
        <div className="grid gap-6">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Chưa có bài viết nào
                </h3>
                <p className="text-gray-600 mb-4">
                  Tạo bài viết đầu tiên để bắt đầu xây dựng blog cho STEP.
                </p>
                <Button onClick={() => setIsModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Tạo bài viết đầu tiên
                </Button>
              </CardContent>
            </Card>
          ) : (
            articles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {article.title}
                        </h3>
                        <div className="flex gap-1">
                          {article.isPublished && (
                            <Badge className="bg-green-100 text-green-800">
                              Đã xuất bản
                            </Badge>
                          )}
                          {article.isFeatured && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              Nổi bật
                            </Badge>
                          )}
                          {!article.isPublished && (
                            <Badge variant="secondary">
                              Nháp
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {article.author}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(article.createdAt)}
                        </span>
                        <Badge variant="outline">{article.category}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(article)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(article.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}