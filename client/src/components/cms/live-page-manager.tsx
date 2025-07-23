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
import { Plus, Edit, Trash2, Globe, Layout, FileText, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const pageContentSchema = z.object({
  page: z.string().min(1, "Tên trang là bắt buộc"),
  section: z.string().min(1, "Phần là bắt buộc"),
  elementId: z.string().min(1, "Element ID là bắt buộc"),
  content: z.string().min(1, "Nội dung là bắt buộc"),
  contentType: z.enum(["text", "html", "json"]).default("text"),
});

type PageContentFormData = z.infer<typeof pageContentSchema>;

const predefinedPages = [
  { value: "home", label: "Trang chủ" },
  { value: "services", label: "Dịch vụ" },
  { value: "about", label: "Giới thiệu" },
  { value: "contact", label: "Liên hệ" },
  { value: "blog", label: "Blog" },
  { value: "hosting", label: "Hosting" },
  { value: "cloud", label: "Cloud Services" },
  { value: "domain", label: "Domain" },
];

const commonSections = [
  { value: "hero", label: "Hero Section" },
  { value: "services", label: "Services Section" },
  { value: "testimonials", label: "Testimonials" },
  { value: "footer", label: "Footer" },
  { value: "header", label: "Header" },
  { value: "features", label: "Features" },
  { value: "pricing", label: "Pricing" },
  { value: "cta", label: "Call to Action" },
];

export function LivePageManager() {
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterPage, setFilterPage] = useState<string>("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: pageContents = [], isLoading } = useQuery({
    queryKey: ["/api/page-contents"],
  });

  const form = useForm<PageContentFormData>({
    resolver: zodResolver(pageContentSchema),
    defaultValues: {
      page: "",
      section: "",
      elementId: "",
      content: "",
      contentType: "text",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: PageContentFormData) => apiRequest("/api/page-contents", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/page-contents"] });
      setIsDialogOpen(false);
      form.reset();
      toast({
        title: "Thành công",
        description: "Nội dung trang đã được tạo thành công",
      });
    },
    onError: () => {
      toast({
        title: "Lỗi",
        description: "Không thể tạo nội dung trang",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: PageContentFormData }) =>
      apiRequest(`/api/page-contents/${id}`, "PATCH", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/page-contents"] });
      setIsDialogOpen(false);
      setSelectedContent(null);
      form.reset();
      toast({
        title: "Thành công",
        description: "Nội dung trang đã được cập nhật",
      });
    },
    onError: () => {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật nội dung trang",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/page-contents/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/page-contents"] });
      toast({
        title: "Thành công",
        description: "Nội dung trang đã được xóa",
      });
    },
    onError: () => {
      toast({
        title: "Lỗi",
        description: "Không thể xóa nội dung trang",
        variant: "destructive",
      });
    },
  });

  const openEditDialog = (content: any) => {
    setSelectedContent(content);
    form.reset({
      page: content.page,
      section: content.section,
      elementId: content.elementId,
      content: content.content,
      contentType: content.contentType || "text",
    });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setSelectedContent(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const onSubmit = (data: PageContentFormData) => {
    if (selectedContent) {
      updateMutation.mutate({ id: selectedContent.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const filteredContents = filterPage === "all" 
    ? (pageContents as any[]) 
    : (pageContents as any[]).filter((content: any) => content.page === filterPage);

  const groupedContents = filteredContents.reduce((acc: any, content: any) => {
    const key = `${content.page}-${content.section}`;
    if (!acc[key]) {
      acc[key] = {
        page: content.page,
        section: content.section,
        contents: []
      };
    }
    acc[key].contents.push(content);
    return acc;
  }, {});

  if (isLoading) {
    return <div className="p-4">Đang tải...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quản lý nội dung trang</h2>
        <div className="flex gap-2">
          <Select value={filterPage} onValueChange={setFilterPage}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Lọc theo trang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trang</SelectItem>
              {predefinedPages.map((page) => (
                <SelectItem key={page.value} value={page.value}>
                  {page.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Thêm nội dung
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {selectedContent ? "Chỉnh sửa nội dung" : "Thêm nội dung mới"}
                </DialogTitle>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="page"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Trang</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn trang" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {predefinedPages.map((page) => (
                                <SelectItem key={page.value} value={page.value}>
                                  {page.label}
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
                      name="section"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phần</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn phần" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {commonSections.map((section) => (
                                <SelectItem key={section.value} value={section.value}>
                                  {section.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="elementId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Element ID</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="vd: hero-title, service-1-description" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Loại nội dung</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="html">HTML</SelectItem>
                              <SelectItem value="json">JSON</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nội dung</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={8} className="font-mono text-sm" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                      {selectedContent ? "Cập nhật" : "Tạo nội dung"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6">
        {Object.values(groupedContents).map((group: any) => (
          <Card key={`${group.page}-${group.section}`}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <CardTitle className="text-lg">
                  {predefinedPages.find(p => p.value === group.page)?.label || group.page} 
                  {" - "}
                  {commonSections.find(s => s.value === group.section)?.label || group.section}
                </CardTitle>
                <Badge variant="outline">
                  {group.contents.length} element{group.contents.length !== 1 ? 's' : ''}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {group.contents.map((content: any) => (
                  <div key={content.id} className="flex items-start justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {content.elementId}
                        </code>
                        <Badge variant="secondary" className="text-xs">
                          {content.contentType}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 truncate max-w-md">
                        {content.content}
                      </p>
                    </div>
                    
                    <div className="flex gap-1 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(content)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (confirm("Bạn có chắc chắn muốn xóa nội dung này?")) {
                            deleteMutation.mutate(content.id);
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {Object.keys(groupedContents).length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Chưa có nội dung nào
            </h3>
            <p className="text-gray-500 mb-4">
              Bắt đầu bằng cách thêm nội dung cho trang web của bạn
            </p>
            <Button onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm nội dung đầu tiên
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}