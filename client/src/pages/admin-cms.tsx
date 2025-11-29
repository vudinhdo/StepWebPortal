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
  LogOut,
  Server,
} from "lucide-react";
import { EquipmentManager } from "@/components/cms/equipment-manager";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import CMSLogin from "./cms-login";

interface AuthResponse {
  success: boolean;
  authenticated?: boolean;
}

export default function AdminCMS() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check localStorage first for faster loading
        const localAuth = localStorage.getItem("cms_authenticated");
        if (localAuth === "true") {
          console.log("Found local auth, checking server");
          const response = await fetch("/api/auth/status");
          const data: AuthResponse = await response.json();
          console.log("Server auth status:", data);
          if (data.success && data.authenticated) {
            console.log("Setting authenticated to true");
            setIsAuthenticated(true);
          } else {
            console.log("Server auth failed, removing local auth");
            localStorage.removeItem("cms_authenticated");
            setIsAuthenticated(false);
          }
        } else {
          console.log("No local auth found");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        localStorage.removeItem("cms_authenticated");
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLoginSuccess = () => {
    console.log("handleLoginSuccess called");
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("cms_authenticated");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("cms_authenticated");
      setIsAuthenticated(false);
    }
  };

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <CMSLogin onLoginSuccess={handleLoginSuccess} />;
  }

  // Main CMS Interface - only rendered when authenticated
  return <AdminCMSContent onLogout={handleLogout} />;
}

// Separate component for authenticated CMS content
function AdminCMSContent({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Data fetching queries - now safely inside authenticated component
  const { data: articles = [] } = useQuery({
    queryKey: ["/api/articles"],
  });

  const { data: services = [] } = useQuery({
    queryKey: ["/api/services"],
  });

  const { data: testimonials = [] } = useQuery({
    queryKey: ["/api/testimonials"],
  });

  const { data: contacts = [] } = useQuery({
    queryKey: ["/api/contacts"],
  });

  const { data: domainContacts = [] } = useQuery({
    queryKey: ["/api/domain-contacts"],
  });

  const { data: emailLeads = [] } = useQuery({
    queryKey: ["/api/email-leads"],
  });

  // Dashboard Component
  const Dashboard = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng bài viết</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Array.isArray(articles) ? articles.length : 0}</div>
          <p className="text-xs text-muted-foreground">
            {Array.isArray(articles) ? articles.filter((a: any) => a.isPublished).length : 0} đã xuất bản
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dịch vụ</CardTitle>
          <Settings className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Array.isArray(services) ? services.length : 0}</div>
          <p className="text-xs text-muted-foreground">
            {Array.isArray(services) ? services.filter((s: any) => s.isActive).length : 0} đang hoạt động
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Liên hệ</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(Array.isArray(contacts) ? contacts.length : 0) + (Array.isArray(domainContacts) ? domainContacts.length : 0)}
          </div>
          <p className="text-xs text-muted-foreground">
            {(Array.isArray(contacts) ? contacts.filter((c: any) => !c.isRead).length : 0) + 
             (Array.isArray(domainContacts) ? domainContacts.filter((c: any) => !c.isRead).length : 0)} chưa đọc
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Email Leads</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Array.isArray(emailLeads) ? emailLeads.length : 0}</div>
          <p className="text-xs text-muted-foreground">
            {Array.isArray(emailLeads) ? emailLeads.filter((e: any) => !e.isProcessed).length : 0} chưa xử lý
          </p>
        </CardContent>
      </Card>
    </div>
  );

  // Simple lists for other content types
  const ArticlesList = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Quản lý Bài viết</h2>
      <div className="text-gray-600">
        {Array.isArray(articles) ? `${articles.length} bài viết` : "Đang tải..."}
      </div>
    </div>
  );

  const ServicesList = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Quản lý Dịch vụ</h2>
      <div className="text-gray-600">
        {Array.isArray(services) ? `${services.length} dịch vụ` : "Đang tải..."}
      </div>
    </div>
  );

  const TestimonialsList = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Quản lý Testimonials</h2>
      <div className="text-gray-600">
        {Array.isArray(testimonials) ? `${testimonials.length} testimonials` : "Đang tải..."}
      </div>
    </div>
  );

  const ContactsList = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Quản lý Liên hệ</h2>
      
      <Tabs defaultValue="contacts" className="w-full">
        <TabsList>
          <TabsTrigger value="contacts">Liên hệ chung ({Array.isArray(contacts) ? contacts.length : 0})</TabsTrigger>
          <TabsTrigger value="domain">Domain ({Array.isArray(domainContacts) ? domainContacts.length : 0})</TabsTrigger>
          <TabsTrigger value="email">Email Leads ({Array.isArray(emailLeads) ? emailLeads.length : 0})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="contacts" className="space-y-4">
          {Array.isArray(contacts) && contacts.map((contact: any) => (
            <Card key={contact.id}>
              <CardContent className="pt-6">
                <h3 className="font-semibold">{contact.name}</h3>
                <p className="text-gray-600">{contact.email}</p>
                <p className="text-sm text-gray-500">
                  {format(new Date(contact.createdAt), "dd/MM/yyyy HH:mm")}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="domain" className="space-y-4">
          {Array.isArray(domainContacts) && domainContacts.map((contact: any) => (
            <Card key={contact.id}>
              <CardContent className="pt-6">
                <h3 className="font-semibold">{contact.name}</h3>
                <p className="text-gray-600">{contact.email}</p>
                <p className="text-gray-600">Domain: {contact.desiredDomain}</p>
                <p className="text-sm text-gray-500">
                  {format(new Date(contact.createdAt), "dd/MM/yyyy HH:mm")}
                </p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="email" className="space-y-4">
          {Array.isArray(emailLeads) && emailLeads.map((lead: any) => (
            <Card key={lead.id}>
              <CardContent className="pt-6">
                <h3 className="font-semibold">{lead.name || "Không có tên"}</h3>
                <p className="text-gray-600">{lead.email}</p>
                <Badge variant="outline">{lead.source}</Badge>
                <p className="text-sm text-gray-500">
                  {format(new Date(lead.createdAt), "dd/MM/yyyy HH:mm")}
                </p>
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
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-sm">
                <User className="w-4 h-4 mr-1" />
                Admin User
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Đăng xuất
              </Button>
            </div>
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
            <TabsTrigger value="equipment" data-testid="equipment-tab">
              <Server className="w-4 h-4 mr-2" />
              Kho Thiết Bị
            </TabsTrigger>
            <TabsTrigger value="testimonials">
              <Star className="w-4 h-4 mr-2" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="contacts">
              <MessageSquare className="w-4 h-4 mr-2" />
              Liên hệ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <Dashboard />
          </TabsContent>

          <TabsContent value="articles" className="mt-6">
            <ArticlesList />
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <ServicesList />
          </TabsContent>

          <TabsContent value="equipment" className="mt-6">
            <EquipmentManager />
          </TabsContent>

          <TabsContent value="testimonials" className="mt-6">
            <TestimonialsList />
          </TabsContent>

          <TabsContent value="contacts" className="mt-6">
            <ContactsList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}