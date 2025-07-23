import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, FileText, Users, Settings, Menu, Image,
  Globe, Database, Shield, Activity, MessageSquare, LogOut,
  BarChart3, TrendingUp, Layout
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { MediaManager } from "@/components/cms/media-manager";
import { PageBuilder } from "@/components/cms/page-builder";
import { UserManagement } from "@/components/cms/user-management";
import { MenuManagement } from "@/components/cms/menu-management";
import { ContentManager } from "@/components/cms/content-manager";
import { format } from "date-fns";

interface CMSLayoutProps {
  onLogout: () => void;
}

export function CompleteCMSLayout({ onLogout }: CMSLayoutProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const menuItems = [
    { id: "dashboard", label: "Tổng quan", icon: LayoutDashboard },
    { id: "content", label: "Nội dung Website", icon: Globe },
    { id: "articles", label: "Bài viết", icon: FileText },
    { id: "pages", label: "Page Builder", icon: Layout },
    { id: "media", label: "Media Manager", icon: Image },
    { id: "menus", label: "Quản lý Menu", icon: Menu },
    { id: "users", label: "Người dùng", icon: Users },
    { id: "contacts", label: "Liên hệ", icon: MessageSquare },
    { id: "settings", label: "Cài đặt hệ thống", icon: Settings },
    { id: "system", label: "Thống kê & Logs", icon: Activity },
  ];

  // Fetch data for dashboard
  const { data: articles = [] } = useQuery({
    queryKey: ["/api/articles"],
  });

  const { data: contacts = [] } = useQuery({
    queryKey: ["/api/contacts"],
  });

  const { data: services = [] } = useQuery({
    queryKey: ["/api/services"],
  });

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent articles={articles} contacts={contacts} services={services} />;
      case "content":
        return <ContentManager />;
      case "articles":
        return <ArticlesContent />;
      case "pages":
        return <PageBuilder />;
      case "media":
        return <MediaManager />;
      case "menus":
        return <MenuManagement />;
      case "users":
        return <UserManagement />;
      case "contacts":
        return <ContactsContent contacts={contacts} />;
      case "settings":
        return <SettingsContent />;
      case "system":
        return <SystemContent />;
      default:
        return <DashboardContent articles={articles} contacts={contacts} services={services} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen fixed">
          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">STEP CMS</h1>
                <p className="text-sm text-gray-600">WordPress-like CMS</p>
              </div>
            </div>
          </div>

          <nav className="px-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.id 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 w-64 p-4">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Đăng xuất
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Content
function DashboardContent({ articles, contacts, services }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tổng quan hệ thống</h1>
        <p className="text-gray-600">Chào mừng đến với STEP CMS - Hệ thống quản lý nội dung chuyên nghiệp</p>
      </div>

      {/* Stats Cards */}
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
            <CardTitle className="text-sm font-medium">Liên hệ mới</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Array.isArray(contacts) ? contacts.length : 0}</div>
            <p className="text-xs text-muted-foreground">
              {Array.isArray(contacts) ? contacts.filter((c: any) => !c.isRead).length : 0} chưa đọc
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lượt truy cập</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,456</div>
            <p className="text-xs text-muted-foreground">+20% so với tháng trước</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hành động nhanh</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Tạo bài viết mới
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Globe className="w-4 h-4 mr-2" />
              Tạo trang mới
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Image className="w-4 h-4 mr-2" />
              Quản lý Media
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Thêm người dùng
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-600">Admin tạo bài viết "Giới thiệu STEP"</span>
                <span className="text-xs text-gray-400">2 phút trước</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-gray-600">Có liên hệ mới từ khách hàng</span>
                <span className="text-xs text-gray-400">15 phút trước</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <span className="text-gray-600">Cập nhật menu chính</span>
                <span className="text-xs text-gray-400">1 giờ trước</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="text-gray-600">Upload media mới</span>
                <span className="text-xs text-gray-400">3 giờ trước</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Articles Content
function ArticlesContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quản lý bài viết</h1>
        <p className="text-gray-600">Tạo, chỉnh sửa và quản lý nội dung blog</p>
      </div>
      
      {/* Article management would go here */}
      <Card>
        <CardContent className="p-12 text-center">
          <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Quản lý bài viết</h3>
          <p className="text-gray-600 mb-4">Tính năng này đang được phát triển. Sử dụng WYSIWYG Editor để tạo nội dung.</p>
          <Button>Tạo bài viết mới</Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Contacts Content
function ContactsContent({ contacts }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Quản lý liên hệ</h1>
        <p className="text-gray-600">Xem và xử lý các yêu cầu liên hệ từ khách hàng</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách liên hệ ({Array.isArray(contacts) ? contacts.length : 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {Array.isArray(contacts) && contacts.length > 0 ? (
            <div className="space-y-4">
              {contacts.slice(0, 10).map((contact: any) => (
                <div key={contact.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                    <p className="text-sm text-gray-500">{contact.message}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!contact.isRead && (
                      <Badge>Mới</Badge>
                    )}
                    <span className="text-xs text-gray-400">
                      {format(new Date(contact.createdAt), 'dd/MM/yyyy')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">Chưa có liên hệ</h3>
              <p className="text-gray-500">Các yêu cầu liên hệ sẽ hiển thị ở đây</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Settings Content
function SettingsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cài đặt hệ thống</h1>
        <p className="text-gray-600">Cấu hình website và các tùy chọn hệ thống</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt chung</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên website
              </label>
              <input
                type="text"
                defaultValue="STEP Technology"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả website
              </label>
              <textarea
                defaultValue="Công ty công nghệ chuyên nghiệp"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
              />
            </div>
            <Button>Lưu cài đặt</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO & Analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Analytics ID
              </label>
              <input
                type="text"
                placeholder="UA-XXXXXXXX-X"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                placeholder="Mô tả mặc định cho trang web"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
              />
            </div>
            <Button>Lưu cài đặt</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// System Content
function SystemContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hệ thống & Logs</h1>
        <p className="text-gray-600">Giám sát hoạt động và thống kê hệ thống</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Thống kê truy cập
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Biểu đồ thống kê sẽ được hiển thị ở đây</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Nhật ký hoạt động
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm p-3 bg-blue-50 rounded-lg">
                <span className="font-medium">INFO:</span> User admin logged in at {format(new Date(), 'HH:mm:ss')}
              </div>
              <div className="text-sm p-3 bg-green-50 rounded-lg">
                <span className="font-medium">SUCCESS:</span> Article "Sample Post" published successfully
              </div>
              <div className="text-sm p-3 bg-yellow-50 rounded-lg">
                <span className="font-medium">WARNING:</span> High memory usage detected (85%)
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}