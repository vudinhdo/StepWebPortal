import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Package,
  Globe,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Save,
  X,
  GripVertical,
  ChevronRight,
  Home,
  Image,
  Link,
  Layout,
  Layers,
  Tags,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  BarChart,
  Users,
  ShoppingCart,
  TrendingUp,
  Activity,
  Box,
  Database,
  FolderOpen,
  FileEdit,
  Newspaper,
  BookOpen,
  Bookmark,
  Menu,
  PanelLeft,
  ChevronDown,
  ExternalLink,
  Copy,
  MoreHorizontal,
  ArrowUpDown
} from "lucide-react";
import { EquipmentManager } from "@/components/cms/equipment-manager";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { SiGoogle, SiFacebook, SiGithub } from "react-icons/si";

interface User {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
  isAdmin?: boolean;
}

export default function AdminCMS() {
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <CMSLoginPage />;
  }

  return <AdminCMSContent user={user as User} />;
}

function CMSLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Layout className="w-8 h-8 text-gray-900" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">STEP CMS</h1>
          <p className="text-gray-400">Hệ thống quản trị nội dung</p>
        </div>

        <Card className="bg-white/95 backdrop-blur shadow-2xl border-0">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl">Đăng nhập</CardTitle>
            <CardDescription>
              Sử dụng tài khoản để truy cập hệ thống quản trị
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <a href="/api/login" className="block w-full">
              <Button 
                className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm"
                variant="outline"
                data-testid="login-google"
              >
                <SiGoogle className="w-5 h-5 mr-3 text-red-500" />
                Đăng nhập bằng Google
              </Button>
            </a>
            
            <a href="/api/login" className="block w-full">
              <Button 
                className="w-full h-12 bg-[#4267B2] hover:bg-[#365899] text-white"
                data-testid="login-facebook"
              >
                <SiFacebook className="w-5 h-5 mr-3" />
                Đăng nhập bằng Facebook
              </Button>
            </a>

            <a href="/api/login" className="block w-full">
              <Button 
                className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white"
                data-testid="login-github"
              >
                <SiGithub className="w-5 h-5 mr-3" />
                Đăng nhập bằng GitHub
              </Button>
            </a>

            <div className="relative my-6">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-500">
                hoặc
              </span>
            </div>

            <a href="/api/login" className="block w-full">
              <Button 
                className="w-full h-12"
                variant="outline"
                data-testid="login-email"
              >
                <Mail className="w-5 h-5 mr-3" />
                Đăng nhập bằng Email
              </Button>
            </a>
          </CardContent>
        </Card>

        <p className="text-center text-gray-500 text-sm mt-6">
          Bằng việc đăng nhập, bạn đồng ý với{" "}
          <a href="#" className="text-gray-300 hover:text-white underline">
            Điều khoản sử dụng
          </a>
        </p>
      </div>
    </div>
  );
}

function AdminCMSContent({ user }: { user: User }) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { toast } = useToast();

  const { data: articles = [] } = useQuery<any[]>({
    queryKey: ["/api/articles"],
  });

  const { data: services = [] } = useQuery<any[]>({
    queryKey: ["/api/services"],
  });

  const { data: testimonials = [] } = useQuery<any[]>({
    queryKey: ["/api/testimonials"],
  });

  const { data: contacts = [] } = useQuery<any[]>({
    queryKey: ["/api/contacts"],
  });

  const { data: domainContacts = [] } = useQuery<any[]>({
    queryKey: ["/api/domain-contacts"],
  });

  const { data: emailLeads = [] } = useQuery<any[]>({
    queryKey: ["/api/email-leads"],
  });

  const { data: equipment = [] } = useQuery<any[]>({
    queryKey: ["/api/equipment"],
  });

  const { data: orders = [] } = useQuery<any[]>({
    queryKey: ["/api/orders"],
  });

  const { data: pageContents = [] } = useQuery<any[]>({
    queryKey: ["/api/page-contents"],
  });

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const { data: cmsUsers = [] } = useQuery<any[]>({
    queryKey: ["/api/users"],
    enabled: (user as any)?.role === 'admin',
  });

  const userRole = (user as any)?.role || 'viewer';

  const menuItems = [
    { id: "dashboard", label: "Tổng quan", icon: LayoutDashboard },
    { id: "articles", label: "Bài viết", icon: FileText, count: articles.length },
    { id: "pages", label: "Trang", icon: Layout, count: pageContents.length },
    { id: "equipment", label: "Sản phẩm", icon: Server, count: equipment.length },
    { id: "categories", label: "Danh mục", icon: FolderOpen },
    { id: "tags", label: "Thẻ", icon: Tags },
    { id: "services", label: "Dịch vụ", icon: Wrench, count: services.length },
    { id: "testimonials", label: "Đánh giá", icon: Star, count: testimonials.length },
    { id: "orders", label: "Đơn hàng", icon: ShoppingCart, count: orders.length },
    { id: "contacts", label: "Liên hệ", icon: MessageSquare, count: contacts.length + domainContacts.length },
    ...(userRole === 'admin' ? [{ id: "users", label: "Người dùng", icon: Users, count: cmsUsers.length }] : []),
    { id: "settings", label: "Cài đặt", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection articles={articles} services={services} equipment={equipment} orders={orders} contacts={contacts} domainContacts={domainContacts} emailLeads={emailLeads} />;
      case "articles":
        return <ArticlesSection articles={articles} />;
      case "pages":
        return <PagesSection pageContents={pageContents} />;
      case "equipment":
        return <EquipmentManager />;
      case "categories":
        return <CategoriesSection />;
      case "tags":
        return <TagsSection />;
      case "services":
        return <ServicesSection services={services} />;
      case "testimonials":
        return <TestimonialsSection testimonials={testimonials} />;
      case "orders":
        return <OrdersSection orders={orders} />;
      case "contacts":
        return <ContactsSection contacts={contacts} domainContacts={domainContacts} emailLeads={emailLeads} />;
      case "users":
        return <UsersSection users={cmsUsers} />;
      case "settings":
        return <SettingsSection />;
      default:
        return <DashboardSection articles={articles} services={services} equipment={equipment} orders={orders} contacts={contacts} domainContacts={domainContacts} emailLeads={emailLeads} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <Layout className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-900">STEP CMS</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 h-8 w-8"
          >
            <PanelLeft className="w-4 h-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 py-2">
          <nav className="px-2 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    activeSection === item.id
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  data-testid={`menu-${item.id}`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.count !== undefined && (
                        <Badge variant={activeSection === item.id ? "secondary" : "outline"} className="text-xs">
                          {item.count}
                        </Badge>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </nav>
        </ScrollArea>

        {/* User Info */}
        <div className="border-t border-gray-100 p-3">
          <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            {user?.profileImageUrl ? (
              <img 
                src={user.profileImageUrl} 
                alt="Avatar" 
                className="w-9 h-9 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-5 h-5 text-gray-500" />
              </div>
            )}
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.firstName || user?.email || 'Admin'}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            )}
          </div>
          {!sidebarCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full mt-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              data-testid="logout-button"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Đăng xuất
            </Button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

// Dashboard Section
function DashboardSection({ articles, services, equipment, orders, contacts, domainContacts, emailLeads }: any) {
  const stats = [
    { label: "Bài viết", value: articles.length, icon: FileText, color: "bg-blue-500", change: "+12%" },
    { label: "Sản phẩm", value: equipment.length, icon: Server, color: "bg-green-500", change: "+8%" },
    { label: "Đơn hàng", value: orders.length, icon: ShoppingCart, color: "bg-purple-500", change: "+24%" },
    { label: "Liên hệ", value: contacts.length + domainContacts.length, icon: MessageSquare, color: "bg-orange-500", change: "+5%" },
  ];

  const recentContacts = [...contacts, ...domainContacts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tổng quan</h1>
          <p className="text-gray-500">Chào mừng bạn trở lại với STEP CMS</p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Làm mới
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change} so với tháng trước
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Liên hệ gần đây
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentContacts.map((contact: any) => (
                <div key={contact.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{contact.name}</p>
                    <p className="text-sm text-gray-500 truncate">{contact.email}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {format(new Date(contact.createdAt), "dd/MM/yyyy HH:mm")}
                    </p>
                  </div>
                  {!contact.isRead && (
                    <Badge className="bg-red-100 text-red-700">Mới</Badge>
                  )}
                </div>
              ))}
              {recentContacts.length === 0 && (
                <p className="text-gray-500 text-center py-4">Chưa có liên hệ nào</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Thao tác nhanh
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <FileText className="w-6 h-6" />
                <span className="text-sm">Thêm bài viết</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Server className="w-6 h-6" />
                <span className="text-sm">Thêm sản phẩm</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Layout className="w-6 h-6" />
                <span className="text-sm">Chỉnh sửa trang</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Download className="w-6 h-6" />
                <span className="text-sm">Xuất báo cáo</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Articles Section
function ArticlesSection({ articles }: { articles: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingArticle, setEditingArticle] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const categories = ["all", ...Array.from(new Set(articles.map(a => a.category).filter(Boolean)))];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const deleteArticleMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/articles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({ title: "Đã xóa bài viết" });
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Bài viết</h1>
          <p className="text-gray-500">{articles.length} bài viết</p>
        </div>
        <Button onClick={() => { setEditingArticle(null); setIsDialogOpen(true); }} data-testid="add-article">
          <Plus className="w-4 h-4 mr-2" />
          Thêm bài viết
        </Button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm bài viết..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả danh mục</SelectItem>
            {categories.filter(c => c !== "all").map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Tiêu đề</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.map((article, index) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{article.title}</p>
                    <p className="text-sm text-gray-500 truncate max-w-[300px]">{article.excerpt}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{article.category}</Badge>
                </TableCell>
                <TableCell>
                  {article.isPublished ? (
                    <Badge className="bg-green-100 text-green-700">Đã xuất bản</Badge>
                  ) : (
                    <Badge className="bg-yellow-100 text-yellow-700">Bản nháp</Badge>
                  )}
                </TableCell>
                <TableCell>{format(new Date(article.createdAt), "dd/MM/yyyy")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => { setEditingArticle(article); setIsDialogOpen(true); }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Xóa bài viết?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Hành động này không thể hoàn tác. Bài viết sẽ bị xóa vĩnh viễn.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Hủy</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteArticleMutation.mutate(article.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Xóa
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <ArticleEditorDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        article={editingArticle}
      />
    </div>
  );
}

// Article Editor Dialog
function ArticleEditorDialog({ open, onOpenChange, article }: { open: boolean; onOpenChange: (open: boolean) => void; article: any }) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [] as string[],
    imageUrl: "",
    author: "STEP Team",
    isPublished: false,
    isFeatured: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || "",
        slug: article.slug || "",
        excerpt: article.excerpt || "",
        content: article.content || "",
        category: article.category || "",
        tags: article.tags || [],
        imageUrl: article.imageUrl || "",
        author: article.author || "STEP Team",
        isPublished: article.isPublished || false,
        isFeatured: article.isFeatured || false,
      });
    } else {
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category: "",
        tags: [],
        imageUrl: "",
        author: "STEP Team",
        isPublished: false,
        isFeatured: false,
      });
    }
  }, [article, open]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (article) {
        await apiRequest("PATCH", `/api/articles/${article.id}`, formData);
      } else {
        await apiRequest("POST", "/api/articles", formData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({ title: article ? "Đã cập nhật bài viết" : "Đã tạo bài viết mới" });
      onOpenChange(false);
    },
    onError: () => {
      toast({ title: "Lỗi", description: "Không thể lưu bài viết", variant: "destructive" });
    },
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{article ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <Label>Tiêu đề</Label>
              <Input
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) });
                }}
                placeholder="Nhập tiêu đề bài viết"
              />
            </div>

            <div>
              <Label>Đường dẫn (slug)</Label>
              <Input
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="duong-dan-bai-viet"
              />
            </div>

            <div>
              <Label>Tóm tắt</Label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Mô tả ngắn về bài viết"
                rows={3}
              />
            </div>

            <div>
              <Label>Nội dung</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Nội dung chi tiết bài viết..."
                rows={12}
                className="font-mono text-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Xuất bản</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Công khai</Label>
                  <Switch
                    checked={formData.isPublished}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Nổi bật</Label>
                  <Switch
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Phân loại</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Danh mục</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Công nghệ, Tin tức..."
                  />
                </div>
                <div>
                  <Label>Tác giả</Label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Ảnh đại diện</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="URL ảnh"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
          <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
            <Save className="w-4 h-4 mr-2" />
            {saveMutation.isPending ? "Đang lưu..." : "Lưu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Pages Section with drag-drop
function PagesSection({ pageContents }: { pageContents: any[] }) {
  const [selectedPage, setSelectedPage] = useState("home");
  const { toast } = useToast();

  const pages = ["home", "about", "services", "contact"];
  const currentPageContent = pageContents.filter(p => p.pageName === selectedPage);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    toast({ title: "Đã cập nhật thứ tự" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Trang</h1>
          <p className="text-gray-500">Chỉnh sửa nội dung các trang website</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Thêm section
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {pages.map(page => (
          <Button
            key={page}
            variant={selectedPage === page ? "default" : "outline"}
            onClick={() => setSelectedPage(page)}
            className="capitalize"
          >
            {page === "home" ? "Trang chủ" : page === "about" ? "Giới thiệu" : page === "services" ? "Dịch vụ" : "Liên hệ"}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GripVertical className="w-5 h-5 text-gray-400" />
            Kéo thả để sắp xếp các section
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                  {currentPageContent.map((section, index) => (
                    <Draggable key={section.id} draggableId={String(section.id)} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`p-4 bg-gray-50 rounded-lg border ${snapshot.isDragging ? 'shadow-lg border-blue-300' : 'border-gray-200'}`}
                        >
                          <div className="flex items-center gap-3">
                            <div {...provided.dragHandleProps} className="cursor-grab">
                              <GripVertical className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{section.section}</p>
                              <p className="text-sm text-gray-500">{section.title}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={section.isActive ? "default" : "secondary"}>
                                {section.isActive ? "Hiển thị" : "Ẩn"}
                              </Badge>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {currentPageContent.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Layout className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Chưa có section nào cho trang này</p>
              <Button className="mt-4" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Thêm section đầu tiên
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Services Section
function ServicesSection({ services }: { services: any[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Dịch vụ</h1>
          <p className="text-gray-500">{services.length} dịch vụ</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Thêm dịch vụ
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <Badge variant={service.isActive ? "default" : "secondary"}>
                  {service.isActive ? "Hoạt động" : "Tạm dừng"}
                </Badge>
              </div>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{service.category}</Badge>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600">
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

// Testimonials Section
function TestimonialsSection({ testimonials }: { testimonials: any[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Đánh giá</h1>
          <p className="text-gray-500">{testimonials.length} đánh giá</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Thêm đánh giá
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{testimonial.clientName}</p>
                  <p className="text-sm text-gray-500">{testimonial.clientTitle} - {testimonial.company}</p>
                  <div className="flex mt-1">
                    {Array(testimonial.rating).fill(0).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="mt-3 text-gray-600 italic">"{testimonial.content}"</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600">
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

// Orders Section
function OrdersSection({ orders }: { orders: any[] }) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending": return <Badge className="bg-yellow-100 text-yellow-700">Chờ xử lý</Badge>;
      case "processing": return <Badge className="bg-blue-100 text-blue-700">Đang xử lý</Badge>;
      case "completed": return <Badge className="bg-green-100 text-green-700">Hoàn thành</Badge>;
      case "cancelled": return <Badge className="bg-red-100 text-red-700">Đã hủy</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Đơn hàng</h1>
          <p className="text-gray-500">{orders.length} đơn hàng</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Xuất Excel
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã đơn</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(orders as any[]).map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-sm">{order.orderNumber}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-gray-500">{order.customerEmail}</p>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{formatPrice(order.totalAmount)}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>{format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

// Contacts Section
function ContactsSection({ contacts, domainContacts, emailLeads }: any) {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Liên hệ</h1>
          <p className="text-gray-500">{contacts.length + domainContacts.length + emailLeads.length} liên hệ</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Xuất Excel
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Tất cả ({contacts.length + domainContacts.length})</TabsTrigger>
          <TabsTrigger value="general">Liên hệ chung ({contacts.length})</TabsTrigger>
          <TabsTrigger value="domain">Domain ({domainContacts.length})</TabsTrigger>
          <TabsTrigger value="email">Email Leads ({emailLeads.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Điện thoại</TableHead>
                  <TableHead>Nguồn</TableHead>
                  <TableHead>Ngày gửi</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...contacts, ...domainContacts].sort((a, b) => 
                  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                ).map((contact: any) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phone || '-'}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {contact.desiredDomain ? 'Domain' : 'Liên hệ'}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(new Date(contact.createdAt), "dd/MM/yyyy HH:mm")}</TableCell>
                    <TableCell>
                      {contact.isRead ? (
                        <Badge variant="secondary">Đã đọc</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-700">Mới</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {contacts.map((contact: any) => (
                  <div key={contact.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-gray-500">{contact.email} • {contact.phone}</p>
                        <p className="mt-2 text-gray-600">{contact.message}</p>
                      </div>
                      <Badge variant={contact.isRead ? "secondary" : "default"}>
                        {contact.isRead ? "Đã đọc" : "Mới"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domain" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {domainContacts.map((contact: any) => (
                  <div key={contact.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-gray-500">{contact.email} • {contact.phone}</p>
                        <p className="mt-2">
                          <span className="text-gray-500">Domain mong muốn: </span>
                          <span className="font-medium">{contact.desiredDomain}</span>
                        </p>
                      </div>
                      <Badge variant={contact.isRead ? "secondary" : "default"}>
                        {contact.isRead ? "Đã đọc" : "Mới"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {emailLeads.map((lead: any) => (
                  <div key={lead.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{lead.name || "Không có tên"}</p>
                        <p className="text-sm text-gray-500">{lead.email}</p>
                        <Badge variant="outline" className="mt-2">{lead.source}</Badge>
                      </div>
                      <Badge variant={lead.isProcessed ? "secondary" : "default"}>
                        {lead.isProcessed ? "Đã xử lý" : "Chưa xử lý"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Settings Section
function SettingsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cài đặt</h1>
        <p className="text-gray-500">Quản lý cài đặt website</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Thông tin website
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Tên website</Label>
              <Input defaultValue="STEP - Giải pháp CNTT" />
            </div>
            <div>
              <Label>Mô tả</Label>
              <Textarea defaultValue="Công ty cổ phần đầu tư công nghệ STEP - Chuyên cung cấp giải pháp hosting, cloud, server" rows={3} />
            </div>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Lưu thay đổi
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Thông tin liên hệ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input defaultValue="info@step.com.vn" />
            </div>
            <div>
              <Label>Số điện thoại</Label>
              <Input defaultValue="1900 1234" />
            </div>
            <div>
              <Label>Địa chỉ</Label>
              <Textarea defaultValue="123 Nguyễn Văn Linh, Quận 7, TP.HCM" rows={2} />
            </div>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Lưu thay đổi
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Sao lưu dữ liệu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-500">
              Sao lưu toàn bộ dữ liệu website để phục hồi khi cần thiết.
            </p>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Tải xuống backup
              </Button>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Khôi phục
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Quản lý người dùng
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-500">
              Quản lý quyền truy cập CMS cho các thành viên trong nhóm.
            </p>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Thêm người dùng
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Users Management Section
function UsersSection({ users }: { users: any[] }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      return await apiRequest("PATCH", `/api/users/${userId}/role`, { role });
    },
    onSuccess: () => {
      toast({ title: "Thành công", description: "Đã cập nhật quyền người dùng" });
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      setSelectedUser(null);
    },
    onError: (error: any) => {
      toast({ 
        title: "Lỗi", 
        description: error.message || "Không thể cập nhật quyền người dùng", 
        variant: "destructive" 
      });
    },
  });

  const roleLabels: Record<string, { label: string; color: string }> = {
    admin: { label: "Quản trị viên", color: "bg-red-100 text-red-700" },
    editor: { label: "Biên tập viên", color: "bg-blue-100 text-blue-700" },
    writer: { label: "Người viết", color: "bg-green-100 text-green-700" },
    viewer: { label: "Người xem", color: "bg-gray-100 text-gray-700" },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h1>
          <p className="text-gray-500">Quản lý vai trò và quyền truy cập của người dùng</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Danh sách người dùng ({users.length})
          </CardTitle>
          <CardDescription>
            Quản lý phân quyền: Admin có toàn quyền, Editor có thể chỉnh sửa và xuất bản, Writer có thể tạo nội dung, Viewer chỉ xem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Người dùng</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u: any) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {u.profileImageUrl ? (
                        <img src={u.profileImageUrl} alt="" className="w-8 h-8 rounded-full" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-500" />
                        </div>
                      )}
                      <span className="font-medium">{u.firstName || u.email?.split('@')[0] || 'User'}</span>
                    </div>
                  </TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Badge className={roleLabels[u.role]?.color || roleLabels.viewer.color}>
                      {roleLabels[u.role]?.label || roleLabels.viewer.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {u.createdAt ? format(new Date(u.createdAt), "dd/MM/yyyy") : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog open={selectedUser?.id === u.id} onOpenChange={(open) => !open && setSelectedUser(null)}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedUser(u)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Thay đổi vai trò</DialogTitle>
                          <DialogDescription>
                            Chọn vai trò mới cho {selectedUser?.firstName || selectedUser?.email}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <Select 
                            defaultValue={selectedUser?.role || 'viewer'}
                            onValueChange={(role) => {
                              updateRoleMutation.mutate({ userId: selectedUser.id, role });
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Quản trị viên (Admin)</SelectItem>
                              <SelectItem value="editor">Biên tập viên (Editor)</SelectItem>
                              <SelectItem value="writer">Người viết (Writer)</SelectItem>
                              <SelectItem value="viewer">Người xem (Viewer)</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="text-sm text-gray-500 space-y-1">
                            <p><strong>Admin:</strong> Toàn quyền quản trị hệ thống</p>
                            <p><strong>Editor:</strong> Chỉnh sửa và xuất bản nội dung</p>
                            <p><strong>Writer:</strong> Tạo và chỉnh sửa nội dung của mình</p>
                            <p><strong>Viewer:</strong> Chỉ xem nội dung</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    Chưa có người dùng nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// Categories Section
function CategoriesSection() {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", slug: "", description: "", type: "post" });

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) {
      toast({ title: "Lỗi", description: "Vui lòng nhập tên danh mục", variant: "destructive" });
      return;
    }
    toast({ title: "Thành công", description: "Đã thêm danh mục mới" });
    setIsAdding(false);
    setNewCategory({ name: "", slug: "", description: "", type: "post" });
  };

  const sampleCategories = [
    { id: 1, name: "Tin tức", slug: "tin-tuc", type: "post", count: 15 },
    { id: 2, name: "Hướng dẫn", slug: "huong-dan", type: "post", count: 8 },
    { id: 3, name: "Cloud Server", slug: "cloud-server", type: "product", count: 12 },
    { id: 4, name: "Hosting", slug: "hosting", type: "product", count: 20 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Danh mục</h1>
          <p className="text-gray-500">Quản lý danh mục cho bài viết và sản phẩm</p>
        </div>
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Thêm danh mục
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm danh mục mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Tên danh mục</Label>
                <Input 
                  value={newCategory.name} 
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="VD: Tin tức công nghệ"
                />
              </div>
              <div>
                <Label>Slug (URL)</Label>
                <Input 
                  value={newCategory.slug} 
                  onChange={(e) => setNewCategory({...newCategory, slug: e.target.value})}
                  placeholder="VD: tin-tuc-cong-nghe"
                />
              </div>
              <div>
                <Label>Loại</Label>
                <Select value={newCategory.type} onValueChange={(v) => setNewCategory({...newCategory, type: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="post">Bài viết</SelectItem>
                    <SelectItem value="product">Sản phẩm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Mô tả</Label>
                <Textarea 
                  value={newCategory.description} 
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  placeholder="Mô tả ngắn về danh mục"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Hủy</Button>
              <Button onClick={handleAddCategory}>Thêm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên danh mục</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleCategories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell className="text-gray-500">{cat.slug}</TableCell>
                  <TableCell>
                    <Badge variant={cat.type === "post" ? "default" : "secondary"}>
                      {cat.type === "post" ? "Bài viết" : "Sản phẩm"}
                    </Badge>
                  </TableCell>
                  <TableCell>{cat.count}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" className="text-red-600"><Trash2 className="w-4 h-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// Tags Section
function TagsSection() {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [newTag, setNewTag] = useState({ name: "", slug: "" });

  const handleAddTag = () => {
    if (!newTag.name.trim()) {
      toast({ title: "Lỗi", description: "Vui lòng nhập tên thẻ", variant: "destructive" });
      return;
    }
    toast({ title: "Thành công", description: "Đã thêm thẻ mới" });
    setIsAdding(false);
    setNewTag({ name: "", slug: "" });
  };

  const sampleTags = [
    { id: 1, name: "Cloud", slug: "cloud", count: 25 },
    { id: 2, name: "Hosting", slug: "hosting", count: 18 },
    { id: 3, name: "Server", slug: "server", count: 32 },
    { id: 4, name: "Domain", slug: "domain", count: 12 },
    { id: 5, name: "VPS", slug: "vps", count: 15 },
    { id: 6, name: "WordPress", slug: "wordpress", count: 20 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Thẻ</h1>
          <p className="text-gray-500">Quản lý các thẻ cho bài viết và sản phẩm</p>
        </div>
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Thêm thẻ
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm thẻ mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Tên thẻ</Label>
                <Input 
                  value={newTag.name} 
                  onChange={(e) => setNewTag({...newTag, name: e.target.value})}
                  placeholder="VD: Cloud Computing"
                />
              </div>
              <div>
                <Label>Slug (URL)</Label>
                <Input 
                  value={newTag.slug} 
                  onChange={(e) => setNewTag({...newTag, slug: e.target.value})}
                  placeholder="VD: cloud-computing"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Hủy</Button>
              <Button onClick={handleAddTag}>Thêm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3">
            {sampleTags.map((tag) => (
              <div key={tag.id} className="group relative">
                <Badge variant="outline" className="px-4 py-2 text-base cursor-pointer hover:bg-gray-100">
                  <Tags className="w-4 h-4 mr-2" />
                  {tag.name}
                  <span className="ml-2 text-gray-400">({tag.count})</span>
                </Badge>
                <div className="absolute -top-2 -right-2 hidden group-hover:flex gap-1">
                  <Button variant="secondary" size="sm" className="w-6 h-6 p-0 rounded-full">
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button variant="destructive" size="sm" className="w-6 h-6 p-0 rounded-full">
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
