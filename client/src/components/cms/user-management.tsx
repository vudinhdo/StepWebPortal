import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus, UserPlus, Edit3, Trash2, Shield, Key, Mail, User,
  Search, Filter, Eye, EyeOff, Clock, Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface CMSUser {
  id: number;
  username: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor' | 'author' | 'contributor';
  isActive: boolean;
  lastLogin?: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

interface UserPermission {
  id: string;
  name: string;
  description: string;
  category: 'content' | 'users' | 'system' | 'media';
}

const userSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6).optional(),
  role: z.enum(['super_admin', 'admin', 'editor', 'author', 'contributor']),
  permissions: z.array(z.string()).optional()
});

type UserForm = z.infer<typeof userSchema>;

export function UserManagement() {
  const [selectedUser, setSelectedUser] = useState<CMSUser | null>(null);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<UserForm>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: '',
      email: '',
      role: 'author',
      permissions: []
    }
  });

  // Mock data - replace with actual API calls
  const mockUsers: CMSUser[] = [
    {
      id: 1,
      username: "admin",
      email: "admin@step.com.vn",
      role: "super_admin",
      isActive: true,
      lastLogin: "2024-01-15T10:30:00Z",
      permissions: ["*"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      username: "editor1",
      email: "editor@step.com.vn",
      role: "editor",
      isActive: true,
      lastLogin: "2024-01-14T15:20:00Z",
      permissions: ["content.create", "content.edit", "content.delete", "media.upload"],
      createdAt: "2024-01-05T00:00:00Z",
      updatedAt: "2024-01-14T15:20:00Z"
    },
    {
      id: 3,
      username: "author1",
      email: "author@step.com.vn",
      role: "author",
      isActive: true,
      lastLogin: "2024-01-13T09:45:00Z",
      permissions: ["content.create", "content.edit_own"],
      createdAt: "2024-01-10T00:00:00Z",
      updatedAt: "2024-01-13T09:45:00Z"
    }
  ];

  const mockPermissions: UserPermission[] = [
    // Content permissions
    { id: "content.create", name: "Tạo nội dung", description: "Có thể tạo bài viết, trang mới", category: "content" },
    { id: "content.edit", name: "Sửa tất cả nội dung", description: "Có thể sửa bất kỳ nội dung nào", category: "content" },
    { id: "content.edit_own", name: "Sửa nội dung riêng", description: "Chỉ có thể sửa nội dung do mình tạo", category: "content" },
    { id: "content.delete", name: "Xóa nội dung", description: "Có thể xóa bài viết, trang", category: "content" },
    { id: "content.publish", name: "Xuất bản", description: "Có thể xuất bản nội dung", category: "content" },
    
    // Media permissions
    { id: "media.upload", name: "Tải lên media", description: "Có thể tải lên hình ảnh, video", category: "media" },
    { id: "media.delete", name: "Xóa media", description: "Có thể xóa tệp media", category: "media" },
    { id: "media.organize", name: "Tổ chức media", description: "Có thể tạo thư mục, di chuyển tệp", category: "media" },
    
    // User permissions
    { id: "users.view", name: "Xem người dùng", description: "Có thể xem danh sách người dùng", category: "users" },
    { id: "users.create", name: "Tạo người dùng", description: "Có thể tạo tài khoản mới", category: "users" },
    { id: "users.edit", name: "Sửa người dùng", description: "Có thể sửa thông tin người dùng", category: "users" },
    { id: "users.delete", name: "Xóa người dùng", description: "Có thể xóa tài khoản", category: "users" },
    
    // System permissions
    { id: "system.settings", name: "Cài đặt hệ thống", description: "Có thể thay đổi cài đặt website", category: "system" },
    { id: "system.backup", name: "Sao lưu", description: "Có thể tạo và khôi phục bản sao lưu", category: "system" },
    { id: "system.logs", name: "Xem logs", description: "Có thể xem nhật ký hệ thống", category: "system" }
  ];

  const roleDescriptions = {
    super_admin: "Toàn quyền trên hệ thống",
    admin: "Quản trị viên với đầy đủ quyền nội dung và người dùng",
    editor: "Có thể quản lý nội dung và media",
    author: "Có thể tạo và chỉnh sửa bài viết riêng",
    contributor: "Có thể tạo nội dung cần duyệt"
  };

  const defaultPermissionsByRole = {
    super_admin: ["*"],
    admin: ["content.create", "content.edit", "content.delete", "content.publish", "media.upload", "media.delete", "media.organize", "users.view", "users.create", "users.edit"],
    editor: ["content.create", "content.edit", "content.delete", "content.publish", "media.upload", "media.delete", "media.organize"],
    author: ["content.create", "content.edit_own", "content.publish", "media.upload"],
    contributor: ["content.create", "media.upload"]
  };

  const getRoleBadgeColor = (role: CMSUser['role']) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'editor': return 'bg-blue-100 text-blue-800';
      case 'author': return 'bg-green-100 text-green-800';
      case 'contributor': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = async (data: UserForm) => {
    toast({
      title: "Đang tạo người dùng...",
      description: "Vui lòng đợi trong giây lát",
    });

    // Mock API call
    setTimeout(() => {
      toast({
        title: "Tạo thành công!",
        description: `Đã tạo người dùng "${data.username}"`,
      });
      setIsCreateUserOpen(false);
      form.reset();
    }, 1000);
  };

  const handleUpdateUser = async (userId: number, data: Partial<UserForm>) => {
    toast({
      title: "Đang cập nhật...",
      description: "Vui lòng đợi trong giây lát",
    });

    // Mock API call
    setTimeout(() => {
      toast({
        title: "Cập nhật thành công!",
        description: "Thông tin người dùng đã được cập nhật",
      });
      setIsEditUserOpen(false);
    }, 1000);
  };

  const handleToggleUserStatus = async (userId: number, isActive: boolean) => {
    toast({
      title: isActive ? "Đã kích hoạt" : "Đã vô hiệu hóa",
      description: "Trạng thái người dùng đã được thay đổi",
    });
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;
    
    toast({
      title: "Đã xóa!",
      description: "Người dùng đã được xóa khỏi hệ thống",
      variant: "destructive"
    });
  };

  const groupedPermissions = mockPermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, UserPermission[]>);

  const categoryNames = {
    content: "Nội dung",
    media: "Media",
    users: "Người dùng",
    system: "Hệ thống"
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quản lý người dùng</h2>
          <p className="text-gray-600">Quản lý tài khoản và phân quyền hệ thống</p>
        </div>
        <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Thêm người dùng
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Thêm người dùng mới</DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(handleCreateUser)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">Tên đăng nhập</Label>
                  <Input
                    {...form.register("username")}
                    placeholder="username"
                  />
                  {form.formState.errors.username && (
                    <p className="text-sm text-red-600">{form.formState.errors.username.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...form.register("email")}
                    type="email"
                    placeholder="email@step.com.vn"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  {...form.register("password")}
                  type="password"
                  placeholder="Tối thiểu 6 ký tự"
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-red-600">{form.formState.errors.password.message}</p>
                )}
              </div>
              
              <div>
                <Label>Vai trò</Label>
                <Select 
                  value={form.watch("role")} 
                  onValueChange={(value) => form.setValue("role", value as CMSUser['role'])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contributor">Cộng tác viên</SelectItem>
                    <SelectItem value="author">Tác giả</SelectItem>
                    <SelectItem value="editor">Biên tập viên</SelectItem>
                    <SelectItem value="admin">Quản trị viên</SelectItem>
                    <SelectItem value="super_admin">Siêu quản trị</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-600 mt-1">
                  {roleDescriptions[form.watch("role")]}
                </p>
              </div>
              
              <div>
                <Label>Quyền hạn tùy chỉnh</Label>
                <div className="mt-2 space-y-4 max-h-60 overflow-y-auto">
                  {Object.entries(groupedPermissions).map(([category, permissions]) => (
                    <div key={category}>
                      <h4 className="font-medium text-sm text-gray-900 mb-2">
                        {categoryNames[category as keyof typeof categoryNames]}
                      </h4>
                      <div className="space-y-2 pl-4">
                        {permissions.map((permission) => (
                          <div key={permission.id} className="flex items-start gap-2">
                            <input
                              type="checkbox"
                              id={permission.id}
                              className="mt-1"
                              defaultChecked={defaultPermissionsByRole[form.watch("role")].includes(permission.id)}
                            />
                            <div className="flex-1">
                              <Label htmlFor={permission.id} className="text-sm font-normal cursor-pointer">
                                {permission.name}
                              </Label>
                              <p className="text-xs text-gray-500">{permission.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsCreateUserOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit">Tạo người dùng</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex-1 max-w-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Tìm kiếm người dùng..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Lọc theo vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả vai trò</SelectItem>
                    <SelectItem value="super_admin">Siêu quản trị</SelectItem>
                    <SelectItem value="admin">Quản trị viên</SelectItem>
                    <SelectItem value="editor">Biên tập viên</SelectItem>
                    <SelectItem value="author">Tác giả</SelectItem>
                    <SelectItem value="contributor">Cộng tác viên</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Users List */}
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{user.username}</h3>
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role.replace('_', ' ')}
                      </Badge>
                      {!user.isActive && (
                        <Badge variant="outline" className="text-red-600 border-red-200">
                          Vô hiệu hóa
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    {user.lastLogin && (
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        Đăng nhập lần cuối: {format(new Date(user.lastLogin), 'dd/MM/yyyy HH:mm')}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsEditUserOpen(true);
                    }}
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Sửa
                  </Button>
                  
                  <Switch
                    checked={user.isActive}
                    onCheckedChange={(checked) => handleToggleUserStatus(user.id, checked)}
                  />
                  
                  {user.role !== 'super_admin' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <User className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">Không tìm thấy người dùng</h3>
              <p className="text-gray-500 mb-4">Không có người dùng nào phù hợp với bộ lọc của bạn</p>
              <Button onClick={() => setIsCreateUserOpen(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Thêm người dùng đầu tiên
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Sửa thông tin người dùng</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <Tabs defaultValue="info">
              <TabsList>
                <TabsTrigger value="info">Thông tin</TabsTrigger>
                <TabsTrigger value="permissions">Quyền hạn</TabsTrigger>
                <TabsTrigger value="activity">Hoạt động</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Tên đăng nhập</Label>
                    <Input defaultValue={selectedUser.username} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input defaultValue={selectedUser.email} />
                  </div>
                </div>
                
                <div>
                  <Label>Vai trò</Label>
                  <Select defaultValue={selectedUser.role}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contributor">Cộng tác viên</SelectItem>
                      <SelectItem value="author">Tác giả</SelectItem>
                      <SelectItem value="editor">Biên tập viên</SelectItem>
                      <SelectItem value="admin">Quản trị viên</SelectItem>
                      <SelectItem value="super_admin">Siêu quản trị</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Mật khẩu mới</Label>
                  <Input type="password" placeholder="Để trống nếu không đổi" />
                  <p className="text-sm text-gray-600 mt-1">
                    Chỉ nhập nếu muốn thay đổi mật khẩu
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Trạng thái tài khoản</Label>
                    <p className="text-sm text-gray-600">Vô hiệu hóa sẽ ngăn người dùng đăng nhập</p>
                  </div>
                  <Switch defaultChecked={selectedUser.isActive} />
                </div>
              </TabsContent>
              
              <TabsContent value="permissions" className="mt-4">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {Object.entries(groupedPermissions).map(([category, permissions]) => (
                    <div key={category}>
                      <h4 className="font-medium text-sm text-gray-900 mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        {categoryNames[category as keyof typeof categoryNames]}
                      </h4>
                      <div className="space-y-2 pl-6">
                        {permissions.map((permission) => (
                          <div key={permission.id} className="flex items-start gap-2">
                            <input
                              type="checkbox"
                              id={`edit-${permission.id}`}
                              className="mt-1"
                              defaultChecked={selectedUser.permissions.includes(permission.id) || selectedUser.permissions.includes("*")}
                            />
                            <div className="flex-1">
                              <Label htmlFor={`edit-${permission.id}`} className="text-sm font-normal cursor-pointer">
                                {permission.name}
                              </Label>
                              <p className="text-xs text-gray-500">{permission.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="activity" className="mt-4">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Thông tin tài khoản
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>Tạo lúc: {format(new Date(selectedUser.createdAt), 'dd/MM/yyyy HH:mm')}</p>
                      <p>Cập nhật lần cuối: {format(new Date(selectedUser.updatedAt), 'dd/MM/yyyy HH:mm')}</p>
                      {selectedUser.lastLogin && (
                        <p>Đăng nhập lần cuối: {format(new Date(selectedUser.lastLogin), 'dd/MM/yyyy HH:mm')}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Hoạt động gần đây</h4>
                    <div className="space-y-2">
                      <div className="border rounded-lg p-3 text-sm">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Đăng nhập hệ thống</p>
                            <p className="text-gray-600">IP: 192.168.1.1</p>
                          </div>
                          <span className="text-xs text-gray-500">10 phút trước</span>
                        </div>
                      </div>
                      <div className="border rounded-lg p-3 text-sm">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Chỉnh sửa bài viết "Giới thiệu STEP"</p>
                            <p className="text-gray-600">Cập nhật nội dung</p>
                          </div>
                          <span className="text-xs text-gray-500">2 giờ trước</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              Hủy
            </Button>
            <Button onClick={() => selectedUser && handleUpdateUser(selectedUser.id, {})}>
              Lưu thay đổi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}