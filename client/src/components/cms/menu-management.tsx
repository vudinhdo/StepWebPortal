import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Plus, Menu, Edit3, Trash2, Move, GripVertical, ExternalLink,
  ChevronRight, ChevronDown, Eye, EyeOff, Save, ArrowUp, ArrowDown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MenuItem {
  id: string;
  title: string;
  url: string;
  target: '_self' | '_blank';
  icon?: string;
  order: number;
  isActive: boolean;
  parentId?: string;
  children?: MenuItem[];
  type: 'page' | 'category' | 'custom' | 'external';
  pageId?: number;
}

interface MenuLocation {
  id: string;
  name: string;
  description: string;
  position: 'header' | 'footer' | 'sidebar';
}

export function MenuManagement() {
  const [selectedLocation, setSelectedLocation] = useState<string>('header');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isCreateItemOpen, setIsCreateItemOpen] = useState(false);
  const [isEditItemOpen, setIsEditItemOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  
  const { toast } = useToast();

  // Mock data
  const mockMenuLocations: MenuLocation[] = [
    {
      id: 'header',
      name: 'Menu Header',
      description: 'Menu chính ở đầu trang',
      position: 'header'
    },
    {
      id: 'footer',
      name: 'Menu Footer',
      description: 'Menu phụ ở cuối trang',
      position: 'footer'
    }
  ];

  const mockMenuItems: MenuItem[] = [
    {
      id: 'home',
      title: 'Trang chủ',
      url: '/',
      target: '_self',
      order: 1,
      isActive: true,
      type: 'page'
    },
    {
      id: 'services',
      title: 'Sản phẩm & Dịch vụ',
      url: '/services',
      target: '_self',
      order: 2,
      isActive: true,
      type: 'category',
      children: [
        {
          id: 'hosting',
          title: 'Hosting',
          url: '/hosting',
          target: '_self',
          order: 1,
          isActive: true,
          parentId: 'services',
          type: 'page'
        },
        {
          id: 'domain',
          title: 'Domain',
          url: '/domain',
          target: '_self',
          order: 2,
          isActive: true,
          parentId: 'services',
          type: 'page'
        }
      ]
    },
    {
      id: 'blog',
      title: 'Blog',
      url: '/blog',
      target: '_self',
      order: 3,
      isActive: true,
      type: 'page'
    }
  ];

  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    
    const items = [...menuItems];
    [items[index], items[index - 1]] = [items[index - 1], items[index]];
    
    const updatedItems = items.map((item, idx) => ({
      ...item,
      order: idx + 1
    }));
    
    setMenuItems(updatedItems);
    
    toast({
      title: "Đã di chuyển lên",
      description: "Thứ tự menu đã được thay đổi",
    });
  };

  const handleMoveDown = (index: number) => {
    if (index === menuItems.length - 1) return;
    
    const items = [...menuItems];
    [items[index], items[index + 1]] = [items[index + 1], items[index]];
    
    const updatedItems = items.map((item, idx) => ({
      ...item,
      order: idx + 1
    }));
    
    setMenuItems(updatedItems);
    
    toast({
      title: "Đã di chuyển xuống",
      description: "Thứ tự menu đã được thay đổi",
    });
  };

  const handleCreateItem = () => {
    const newItem: MenuItem = {
      id: `item-${Date.now()}`,
      title: 'Menu mới',
      url: '/',
      target: '_self',
      order: menuItems.length + 1,
      isActive: true,
      type: 'custom'
    };

    setMenuItems(prev => [...prev, newItem]);
    setIsCreateItemOpen(false);
    
    toast({
      title: "Đã thêm mục menu!",
      description: `Đã tạo mục menu "${newItem.title}"`,
    });
  };

  const handleUpdateItem = (itemId: string) => {
    setIsEditItemOpen(false);
    
    toast({
      title: "Đã cập nhật!",
      description: "Thông tin mục menu đã được cập nhật",
    });
  };

  const handleDeleteItem = (itemId: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa mục menu này?")) return;
    
    setMenuItems(prev => prev.filter(item => item.id !== itemId));
    
    toast({
      title: "Đã xóa!",
      description: "Mục menu đã được xóa",
      variant: "destructive"
    });
  };

  const handleToggleActive = (itemId: string, isActive: boolean) => {
    setMenuItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, isActive } : item
    ));
    
    toast({
      title: isActive ? "Đã kích hoạt" : "Đã ẩn",
      description: "Trạng thái mục menu đã được thay đổi",
    });
  };

  const saveMenuStructure = () => {
    toast({
      title: "Đang lưu cấu trúc menu...",
      description: "Vui lòng đợi trong giây lát",
    });

    setTimeout(() => {
      toast({
        title: "Lưu thành công!",
        description: "Cấu trúc menu đã được lưu và áp dụng",
      });
    }, 1000);
  };

  const renderMenuItem = (item: MenuItem, level = 0, index: number) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);

    return (
      <div key={item.id} className="space-y-2">
        <div 
          className={`flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 ${level > 0 ? 'ml-8 border-l-4 border-l-blue-200' : ''}`}
        >
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => handleMoveUp(index)}
              disabled={index === 0}
            >
              <ArrowUp className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => handleMoveDown(index)}
              disabled={index === menuItems.filter(m => !m.parentId).length - 1}
            >
              <ArrowDown className="w-3 h-3" />
            </Button>
          </div>
          
          {hasChildren && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => toggleExpanded(item.id)}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          )}
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{item.title}</span>
              <Badge variant="outline" className="text-xs">
                {item.type}
              </Badge>
              {item.target === '_blank' && (
                <ExternalLink className="w-3 h-3 text-gray-400" />
              )}
            </div>
            <div className="text-sm text-gray-600 flex items-center gap-2">
              <span>{item.url}</span>
              {!item.isActive && (
                <Badge variant="outline" className="text-red-600 border-red-200">
                  Ẩn
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Switch
              checked={item.isActive}
              onCheckedChange={(checked) => handleToggleActive(item.id, checked)}
              size="sm"
            />
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedItem(item);
                setIsEditItemOpen(true);
              }}
            >
              <Edit3 className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeleteItem(item.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="space-y-2">
            {item.children && item.children.map((child, childIndex) => 
              renderMenuItem(child, level + 1, childIndex)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quản lý Menu</h2>
          <p className="text-gray-600">Tổ chức cấu trúc điều hướng website</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateItemOpen} onOpenChange={setIsCreateItemOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Thêm mục
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thêm mục menu mới</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Tiêu đề</Label>
                  <Input placeholder="Tên hiển thị của mục menu" />
                </div>
                
                <div>
                  <Label>URL</Label>
                  <Input placeholder="/page-url hoặc https://example.com" />
                </div>
                
                <div>
                  <Label>Loại</Label>
                  <Select defaultValue="custom">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="page">Trang</SelectItem>
                      <SelectItem value="category">Danh mục</SelectItem>
                      <SelectItem value="custom">Tùy chỉnh</SelectItem>
                      <SelectItem value="external">Liên kết ngoài</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateItemOpen(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleCreateItem}>
                    Thêm mục
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button onClick={saveMenuStructure}>
            <Save className="w-4 h-4 mr-2" />
            Lưu Menu
          </Button>
        </div>
      </div>

      {/* Menu Location Tabs */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap gap-2">
            {mockMenuLocations.map(location => (
              <Button
                key={location.id}
                variant={selectedLocation === location.id ? "default" : "outline"}
                onClick={() => setSelectedLocation(location.id)}
              >
                <Menu className="w-4 h-4 mr-2" />
                {location.name}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {/* Menu Structure */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Cấu trúc menu</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <GripVertical className="w-4 h-4" />
                Dùng nút mũi tên để sắp xếp
              </div>
            </div>
            
            <div className="space-y-2">
              {menuItems
                .filter(item => !item.parentId)
                .sort((a, b) => a.order - b.order)
                .map((item, index) => renderMenuItem(item, 0, index))}
            </div>

            {menuItems.filter(item => !item.parentId).length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                <Menu className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Chưa có mục menu</h3>
                <p className="text-gray-500 mb-4">Thêm mục menu đầu tiên để bắt đầu xây dựng điều hướng</p>
                <Button onClick={() => setIsCreateItemOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm mục đầu tiên
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Xem trước Menu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="bg-white shadow-sm border rounded-lg p-4">
              <nav className="flex space-x-6">
                {menuItems
                  .filter(item => !item.parentId && item.isActive)
                  .sort((a, b) => a.order - b.order)
                  .map(item => (
                    <div key={item.id} className="relative group">
                      <button className="flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                        {item.title}
                        {item.children && item.children.length > 0 && (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                      
                      {item.children && item.children.length > 0 && (
                        <div className="absolute top-full left-0 mt-1 bg-white border shadow-lg rounded-lg py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                          {item.children
                            .filter(child => child.isActive)
                            .sort((a, b) => a.order - b.order)
                            .map(child => (
                              <a
                                key={child.id}
                                href="#"
                                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                onClick={(e) => e.preventDefault()}
                              >
                                {child.title}
                              </a>
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
              </nav>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Item Dialog */}
      <Dialog open={isEditItemOpen} onOpenChange={setIsEditItemOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa mục menu</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div>
                <Label>Tiêu đề</Label>
                <Input defaultValue={selectedItem.title} />
              </div>
              
              <div>
                <Label>URL</Label>
                <Input defaultValue={selectedItem.url} />
              </div>
              
              <div>
                <Label>Loại</Label>
                <Select defaultValue={selectedItem.type}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="page">Trang</SelectItem>
                    <SelectItem value="category">Danh mục</SelectItem>
                    <SelectItem value="custom">Tùy chỉnh</SelectItem>
                    <SelectItem value="external">Liên kết ngoài</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Hiển thị</Label>
                  <p className="text-sm text-gray-600">Tắt để ẩn mục này khỏi menu</p>
                </div>
                <Switch defaultChecked={selectedItem.isActive} />
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditItemOpen(false)}>
                  Hủy
                </Button>
                <Button onClick={() => handleUpdateItem(selectedItem.id)}>
                  Cập nhật
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}