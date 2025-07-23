import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Edit, Trash2, Eye, EyeOff, Star, Calendar, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { format } from "date-fns";

const articleSchema = z.object({
  title: z.string().min(1, "Tiêu đề là bắt buộc"),
  slug: z.string().min(1, "Slug là bắt buộc"),
  excerpt: z.string().min(1, "Tóm tắt là bắt buộc"),
  content: z.string().min(1, "Nội dung là bắt buộc"),
  category: z.string().min(1, "Danh mục là bắt buộc"),
  tags: z.string().optional(),
  imageUrl: z.string().optional(),
  author: z.string().default("STEP Team"),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
});

type ArticleFormData = z.infer<typeof articleSchema>;

const categories = [
  "Công nghệ",
  "Cloud Computing", 
  "Hosting",
  "Bảo mật",
  "DevOps",
  "Tin tức",
  "Hướng dẫn"
];

export function LiveArticleManager() {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["/api/articles"],
  });

  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
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
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: ArticleFormData) => apiRequest("/api/articles", "POST", {
      ...data,
      tags: data.tags ? data.tags.split(",").map(tag => tag.trim()) : []
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/articles/published"] });
      setIsDialogOpen(false);
      form.reset();
      toast({
        title: "Thành công",
        description: "Bài viết đã được tạo thành công",
      });
    },
    onError: () => {
      toast({
        title: "Lỗi",
        description: "Không thể tạo bài viết",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ArticleFormData }) =>
      apiRequest(`/api/articles/${id}`, "PATCH", {
        ...data,
        tags: data.tags ? data.tags.split(",").map(tag => tag.trim()) : []
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/articles/published"] });
      setIsDialogOpen(false);
      setSelectedArticle(null);
      form.reset();
      toast({
        title: "Thành công",
        description: "Bài viết đã được cập nhật",
      });
    },
    onError: () => {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật bài viết",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/articles/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/articles/published"] });
      toast({
        title: "Thành công",
        description: "Bài viết đã được xóa",
      });
    },
    onError: () => {
      toast({
        title: "Lỗi",
        description: "Không thể xóa bài viết",
        variant: "destructive",
      });
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: ({ id, isPublished }: { id: number; isPublished: boolean }) =>
      apiRequest(`/api/articles/${id}`, "PATCH", { isPublished }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/articles/published"] });
      toast({
        title: "Thành công",
        description: "Trạng thái bài viết đã được cập nhật",
      });
    },
  });

  const toggleFeaturedMutation = useMutation({
    mutationFn: ({ id, isFeatured }: { id: number; isFeatured: boolean }) =>
      apiRequest(`/api/articles/${id}`, "PATCH", { isFeatured }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/articles/published"] });
      toast({
        title: "Thành công",
        description: "Trạng thái nổi bật đã được cập nhật",
      });
    },
  });

  const openEditDialog = (article: any) => {
    setSelectedArticle(article);
    form.reset({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      tags: Array.isArray(article.tags) ? article.tags.join(", ") : "",
      imageUrl: article.imageUrl || "",
      author: article.author || "STEP Team",
      isPublished: article.isPublished,
      isFeatured: article.isFeatured,
    });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setSelectedArticle(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const onSubmit = (data: ArticleFormData) => {
    if (selectedArticle) {
      updateMutation.mutate({ id: selectedArticle.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  if (isLoading) {
    return <div className="p-4">Đang tải...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quản lý bài viết</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Tạo bài viết mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedArticle ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
              </DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tiêu đề</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            onChange={(e) => {
                              field.onChange(e);
                              if (!selectedArticle) {
                                form.setValue("slug", generateSlug(e.target.value));
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tóm tắt</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nội dung</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={10} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Danh mục</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn danh mục" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (phân cách bằng dấu phẩy)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="cloud, hosting, security" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL hình ảnh</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tác giả</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                        </FormControl>
                        <FormLabel>Xuất bản</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isFeatured"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                        </FormControl>
                        <FormLabel>Nổi bật</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Hủy
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending || updateMutation.isPending}
                  >
                    {selectedArticle ? "Cập nhật" : "Tạo bài viết"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {articles.map((article: any) => (
          <Card key={article.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{article.title}</h3>
                    <div className="flex gap-1">
                      {article.isPublished ? (
                        <Badge variant="default">
                          <Eye className="w-3 h-3 mr-1" />
                          Đã xuất bản
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <EyeOff className="w-3 h-3 mr-1" />
                          Bản nháp
                        </Badge>
                      )}
                      {article.isFeatured && (
                        <Badge variant="outline">
                          <Star className="w-3 h-3 mr-1" />
                          Nổi bật
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-2">{article.excerpt}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(article.createdAt), "dd/MM/yyyy")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      {article.category}
                    </span>
                    <span>Tác giả: {article.author}</span>
                  </div>
                  
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {article.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditDialog(article)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant={article.isPublished ? "secondary" : "default"}
                    onClick={() => togglePublishMutation.mutate({
                      id: article.id,
                      isPublished: !article.isPublished
                    })}
                  >
                    {article.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant={article.isFeatured ? "default" : "outline"}
                    onClick={() => toggleFeaturedMutation.mutate({
                      id: article.id,
                      isFeatured: !article.isFeatured
                    })}
                  >
                    <Star className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
                        deleteMutation.mutate(article.id);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}