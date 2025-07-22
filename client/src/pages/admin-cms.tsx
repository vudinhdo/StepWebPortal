import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Star,
  MessageSquare,
  Wrench,
  User,
  Plus,
  Edit,
  Trash2,
  BarChart3,
  TrendingUp,
  Users,
  Mail,
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { 
  Article, InsertArticle, UpdateArticle,
  Service, InsertService, UpdateService,
  Testimonial, InsertTestimonial, UpdateTestimonial,
  PageContent, InsertPageContent, UpdatePageContent,
  SiteSetting, InsertSiteSetting,
  Contact, DomainContact, EmailPopupLead
} from "@shared/schema";
import { CmsForms } from "@/components/cms-forms";

export default function AdminCMS() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: 'article' | 'service' | 'testimonial' | 'pageContent' | 'setting';
    editingItem: any;
  }>({
    isOpen: false,
    type: 'article',
    editingItem: null,
  });
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Data fetching queries
  const { data: articles = [], isLoading: articlesLoading } = useQuery({
    queryKey: ["/api/articles"],
  });

  const { data: services = [], isLoading: servicesLoading } = useQuery({
    queryKey: ["/api/services"],
  });

  const { data: testimonials = [], isLoading: testimonialsLoading } = useQuery({
    queryKey: ["/api/testimonials"],
  });

  const { data: pageContents = [], isLoading: pageContentsLoading } = useQuery({
    queryKey: ["/api/page-contents"],
  });

  const { data: siteSettings = [], isLoading: siteSettingsLoading } = useQuery({
    queryKey: ["/api/site-settings"],
  });

  const { data: contacts = [], isLoading: contactsLoading } = useQuery({
    queryKey: ["/api/contacts"],
  });

  const { data: domainContacts = [], isLoading: domainContactsLoading } = useQuery({
    queryKey: ["/api/domain-contacts"],
  });

  const { data: emailLeads = [], isLoading: emailLeadsLoading } = useQuery({
    queryKey: ["/api/email-leads"],
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async ({ type, id }: { type: string; id: number }) => {
      const endpoint = getEndpointName(type);
      return await apiRequest("DELETE", `${endpoint}/${id}`, {});
    },
    onSuccess: () => {
      toast({ title: "Thành công!", description: "Đã xóa thành công." });
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast({
        title: "Lỗi!",
        description: "Không thể xóa item.",
        variant: "destructive",
      });
    },
  });

  const getEndpointName = (type: string) => {
    switch (type) {
      case 'article': return '/api/articles';
      case 'service': return '/api/services';
      case 'testimonial': return '/api/testimonials';
      case 'pageContent': return '/api/page-contents';
      case 'setting': return '/api/site-settings';
      default: return `/${type}`;
    }
  };

  const openModal = (type: 'article' | 'service' | 'testimonial' | 'pageContent' | 'setting', editingItem: any = null) => {
    setModalConfig({
      isOpen: true,
      type,
      editingItem,
    });
  };

  const closeModal = () => {
    setModalConfig({
      isOpen: false,
      type: 'article',
      editingItem: null,
    });
  };

  const handleModalSuccess = () => {
    queryClient.invalidateQueries();
  };

  const handleDelete = (type: string, id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa item này?")) {
      deleteMutation.mutate({ type, id });
    }
  };

  // Dashboard Component
  const Dashboard = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng bài viết</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{articles.length}</div>
          <p className="text-xs text-muted-foreground">
            {articles.filter((a: Article) => a.isPublished).length} đã xuất bản
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dịch vụ</CardTitle>
          <Settings className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{services.length}</div>
          <p className="text-xs text-muted-foreground">
            {services.filter((s: Service) => s.isActive).length} đang hoạt động
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Liên hệ</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{contacts.length + domainContacts.length}</div>
          <p className="text-xs text-muted-foreground">
            {contacts.filter((c: Contact) => !c.isRead).length + domainContacts.filter((c: DomainContact) => !c.isRead).length} chưa đọc
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Email Leads</CardTitle>
          <Mail className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{emailLeads.length}</div>
          <p className="text-xs text-muted-foreground">
            {emailLeads.filter((e: EmailPopupLead) => !e.isProcessed).length} chưa xử lý
          </p>
        </CardContent>
      </Card>
    </div>
  );

  // Articles Manager
  const ArticlesManager = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quản lý Bài viết</h2>
        <Button onClick={() => openModal('article')}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm bài viết
        </Button>
      </div>
      
      <div className="grid gap-4">
        {articles.map((article: Article) => (
          <Card key={article.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{article.title}</h3>
                  <p className="text-gray-600 mb-2">{article.excerpt}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{article.category}</Badge>
                    <Badge variant={article.isPublished ? "default" : "secondary"}>
                      {article.isPublished ? "Đã xuất bản" : "Bản nháp"}
                    </Badge>
                    {article.isFeatured && (
                      <Badge variant="destructive">Nổi bật</Badge>
                    )}
                    <span className="text-sm text-gray-500">
                      {format(new Date(article.createdAt!), "dd/MM/yyyy")}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openModal('article', article)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete('article', article.id)}
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

  // Services Manager
  const ServicesManager = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quản lý Dịch vụ</h2>
        <Button onClick={() => openModal('service')}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm dịch vụ
        </Button>
      </div>
      
      <div className="grid gap-4">
        {services.map((service: Service) => (
          <Card key={service.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{service.name}</h3>
                  <p className="text-gray-600 mb-2">{service.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{service.category}</Badge>
                    <Badge variant={service.isActive ? "default" : "secondary"}>
                      {service.isActive ? "Hoạt động" : "Tạm dừng"}
                    </Badge>
                    <span className="text-sm text-gray-500">Thứ tự: {service.order}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openModal('service', service)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete('service', service.id)}
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

  // Testimonials Manager
  const TestimonialsManager = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quản lý Testimonials</h2>
        <Button onClick={() => openModal('testimonial')}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm testimonial
        </Button>
      </div>
      
      <div className="grid gap-4">
        {testimonials.map((testimonial: Testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{testimonial.clientName}</h3>
                  <p className="text-gray-600">{testimonial.clientTitle} - {testimonial.company}</p>
                  <p className="text-gray-700 mt-2">{testimonial.content}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{testimonial.rating} ⭐</Badge>
                    <Badge variant={testimonial.isActive ? "default" : "secondary"}>
                      {testimonial.isActive ? "Hiển thị" : "Ẩn"}
                    </Badge>
                    <span className="text-sm text-gray-500">Thứ tự: {testimonial.order}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openModal('testimonial', testimonial)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete('testimonial', testimonial.id)}
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

  // Contacts Manager
  const ContactsManager = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Quản lý Liên hệ</h2>
      
      <Tabs defaultValue="contacts" className="w-full">
        <TabsList>
          <TabsTrigger value="contacts">Liên hệ chung</TabsTrigger>
          <TabsTrigger value="domain">Liên hệ Domain</TabsTrigger>
          <TabsTrigger value="email">Email Leads</TabsTrigger>
        </TabsList>
        
        <TabsContent value="contacts" className="space-y-4">
          {contacts.map((contact: Contact) => (
            <Card key={contact.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{contact.name}</h3>
                    <p className="text-gray-600">{contact.email} • {contact.phone}</p>
                    {contact.company && <p className="text-gray-600">Công ty: {contact.company}</p>}
                    {contact.service && <p className="text-gray-600">Dịch vụ: {contact.service}</p>}
                    <p className="text-gray-700 mt-2">{contact.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={contact.isRead ? "default" : "destructive"}>
                        {contact.isRead ? "Đã đọc" : "Chưa đọc"}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {format(new Date(contact.createdAt!), "dd/MM/yyyy HH:mm")}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="domain" className="space-y-4">
          {domainContacts.map((contact: DomainContact) => (
            <Card key={contact.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{contact.name}</h3>
                    <p className="text-gray-600">{contact.email} • {contact.phone}</p>
                    <p className="text-gray-600">Domain mong muốn: {contact.desiredDomain}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={contact.isRead ? "default" : "destructive"}>
                        {contact.isRead ? "Đã đọc" : "Chưa đọc"}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {format(new Date(contact.createdAt!), "dd/MM/yyyy HH:mm")}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="email" className="space-y-4">
          {emailLeads.map((lead: EmailPopupLead) => (
            <Card key={lead.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{lead.name || "Không có tên"}</h3>
                    <p className="text-gray-600">{lead.email}</p>
                    {lead.phone && <p className="text-gray-600">SĐT: {lead.phone}</p>}
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{lead.source}</Badge>
                      <Badge variant={lead.isProcessed ? "default" : "destructive"}>
                        {lead.isProcessed ? "Đã xử lý" : "Chưa xử lý"}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {format(new Date(lead.createdAt!), "dd/MM/yyyy HH:mm")}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">STEP CMS Admin</h1>
            <Badge variant="outline" className="text-sm">
              <User className="w-4 h-4 mr-1" />
              Admin User
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="articles">
              <FileText className="w-4 h-4 mr-2" />
              Bài viết
            </TabsTrigger>
            <TabsTrigger value="services">
              <Settings className="w-4 h-4 mr-2" />
              Dịch vụ
            </TabsTrigger>
            <TabsTrigger value="testimonials">
              <Star className="w-4 h-4 mr-2" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="contacts">
              <MessageSquare className="w-4 h-4 mr-2" />
              Liên hệ
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Wrench className="w-4 h-4 mr-2" />
              Cài đặt
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <Dashboard />
          </TabsContent>

          <TabsContent value="articles" className="mt-6">
            <ArticlesManager />
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <ServicesManager />
          </TabsContent>

          <TabsContent value="testimonials" className="mt-6">
            <TestimonialsManager />
          </TabsContent>

          <TabsContent value="contacts" className="mt-6">
            <ContactsManager />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="text-center py-8">
              <p className="text-gray-500">Trang cài đặt sẽ được phát triển trong các phiên bản tiếp theo.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <CmsForms
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        type={modalConfig.type}
        editingItem={modalConfig.editingItem}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}