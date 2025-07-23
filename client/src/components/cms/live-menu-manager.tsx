import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Edit, Trash2, Menu, Link, ArrowUp, ArrowDown, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const menuItemSchema = z.object({
  title: z.string().min(1, "Tiêu đề là bắt buộc"),
  url: z.string().min(1, "URL là bắt buộc"),
  type: z.enum(["page", "external", "dropdown"]),
  parentId: z.number().optional(),
  order: z.number().default(0),
  isVisible: z.boolean().default(true),
  icon: z.string().optional(),
  description: z.string().optional(),
});

type MenuItemFormData = z.infer<typeof menuItemSchema>;

// Mock data for demonstration
const initialMenuItems = [
  {
    id: 1,
    title: "Trang chủ",
    url: "/",
    type: "page" as const,
    order: 1,
    isVisible: true,
    icon: "Home",
  },
  {
    id: 2,
    title: "Sản Phẩm & Dịch Vụ",
    url: "/services",
    type: "dropdown" as const,
    order: 2,
    isVisible: true,
    icon: "Grid",
    children: [
      {
        id: 21,
        title: "Cloud Services",
        url: "/cloud",
        type: "page" as const,
        parentId: 2,
        order: 1,
        isVisible: true,
      },
      {
        id: 22,
        title: "Hosting",
        url: "/hosting",
        type: "dropdown" as const,
        parentId: 2,
        order: 2,
        isVisible: true,
        children: [
          {
            id: 221,
            title: "WordPress Hosting",
            url: "/Sản Phẩm & Dịch Vụ/Hosting/Hosting WordPress",
            type: "page" as const,
            parentId: 22,
            order: 1,
            isVisible: true,
          },
          {
            id: 222,
            title: "Laravel Hosting",
            url: "/Sản Phẩm & Dịch Vụ/Hosting/Hosting Laravel",
            type: "page" as const,
            parentId: 22,
            order: 2,
            isVisible: true,
          },
          {
            id: 223,
            title: "NVME Hosting",
            url: "/Sản Phẩm & Dịch Vụ/Hosting/Hosting NVME",
            type: "page" as const,
            parentId: 22,
            order: 3,
            isVisible: true,
          },
          {
            id: 224,
            title: "Reseller Hosting",
            url: "/Sản Phẩm & Dịch Vụ/Hosting/Reseller Hosting",
            type: "page" as const,
            parentId: 22,
            order: 4,
            isVisible: true,
          },
        ],
      },
      {
        id: 23,
        title: "Domain",
        url: "/domain",
        type: "page" as const,
        parentId: 2,
        order: 3,
        isVisible: true,
      },
    ],
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
    type: "page" as const,
    order: 3,
    isVisible: true,
    icon: "FileText",
  },
  {
    id: 4,
    title: "Performance Benchmark",
    url: "/performance-benchmark",
    type: "page" as const,
    order: 4,
    isVisible: true,
    icon: "BarChart",
  },
  {
    id: 5,
    title: "Liên hệ",
    url: "/contact",
    type: "page" as const,
    order: 5,
    isVisible: true,
    icon: "Contact",
  },
];

export function LiveMenuManager() {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<number[]>([2, 22]);
  const { toast } = useToast();

  const form = useForm<MenuItemFormData>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      title: "",
      url: "",
      type: "page",
      order: 0,
      isVisible: true,
      icon: "",
      description: "",
    },
  });

  const openEditDialog = (item: any) => {
    setSelectedItem(item);
    form.reset({
      title: item.title,
      url: item.url,
      type: item.type,
      parentId: item.parentId,
      order: item.order,
      isVisible: item.isVisible,
      icon: item.icon || "",
      description: item.description || "",
    });
    setIsDialogOpen(true);
  };

  const openCreateDialog = (parentId?: number) => {
    setSelectedItem(null);
    form.reset({
      parentId,
      order: menuItems.length + 1,
    });
    setIsDialogOpen(true);
  };

  const onSubmit = (data: MenuItemFormData) => {
    if (selectedItem) {
      // Update existing item
      const updateMenuItem = (items: any[]): any[] => {
        return items.map(item => {
          if (item.id === selectedItem.id) {
            return { ...item, ...data };
          }
          if (item.children) {
            return { ...item, children: updateMenuItem(item.children) };
          }
          return item;
        });
      };
      
      setMenuItems(updateMenuItem(menuItems));
      toast({
        title: "Thành công",
        description: "Menu đã được cập nhật",
      });
    } else {
      // Create new item
      const newItem: any = {
        id: Date.now(),
        ...data,
        children: data.type === "dropdown" ? [] : undefined,
      };

      if (data.parentId) {
        // Add as child
        const addToParent = (items: any[]): any[] => {
          return items.map(item => {
            if (item.id === data.parentId) {
              return {
                ...item,
                children: [...(item.children || []), newItem],
              };
            }
            if (item.children) {
              return { ...item, children: addToParent(item.children) };
            }
            return item;
          });
        };
        
        setMenuItems(addToParent(menuItems));
      } else {
        // Add as top-level item
        setMenuItems([...menuItems, newItem]);
      }

      toast({
        title: "Thành công",
        description: "Menu mới đã được tạo",
      });
    }
    
    setIsDialogOpen(false);
    form.reset();
  };

  const deleteMenuItem = (id: number) => {
    const deleteFromItems = (items: any[]): any[] => {
      return items.filter(item => item.id !== id).map(item => {
        if (item.children) {
          return { ...item, children: deleteFromItems(item.children) };
        }
        return item;
      });
    };

    setMenuItems(deleteFromItems(menuItems));
    toast({
      title: "Thành công",
      description: "Menu đã được xóa",
    });
  };

  const toggleVisibility = (id: number) => {
    const toggleInItems = (items: any[]): any[] => {
      return items.map(item => {
        if (item.id === id) {
          return { ...item, isVisible: !item.isVisible };
        }
        if (item.children) {
          return { ...item, children: toggleInItems(item.children) };
        }
        return item;
      });
    };

    setMenuItems(toggleInItems(menuItems));
  };

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const renderMenuItem = (item: any, level: number = 0) => (
    <div key={item.id} className={`border rounded-lg ${level > 0 ? 'ml-6 mt-2' : 'mb-2'}`}>
      <div className="flex items-center justify-between p-3 bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {item.children && item.children.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleExpanded(item.id)}
                className="p-1 h-6 w-6"
              >
                {expandedItems.includes(item.id) ? (
                  <ArrowUp className="w-3 h-3" />
                ) : (
                  <ArrowDown className="w-3 h-3" />
                )}
              </Button>
            )}
            <span className="font-medium">{item.title}</span>
          </div>
          
          <div className="flex gap-1">
            <Badge variant={item.type === "dropdown" ? "default" : "secondary"}>
              {item.type}
            </Badge>
            {!item.isVisible && (
              <Badge variant="outline">Ẩn</Badge>
            )}
          </div>
        </div>

        <div className="flex gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => toggleVisibility(item.id)}
            title={item.isVisible ? "Ẩn menu" : "Hiện menu"}
          >
            {item.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => openEditDialog(item)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          
          {item.type === "dropdown" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => openCreateDialog(item.id)}
              title="Thêm menu con"
            >
              <Plus className="w-4 h-4" />
            </Button>
          )}
          
          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              if (confirm("Bạn có chắc chắn muốn xóa menu này?")) {
                deleteMenuItem(item.id);
              }
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="px-3 pb-2">
        <p className="text-sm text-gray-600">URL: {item.url}</p>
        {item.description && (
          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
        )}
      </div>

      {item.children && expandedItems.includes(item.id) && (
        <div className="px-3 pb-3">
          {item.children.map((child: any) => renderMenuItem(child, level + 1))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quản lý Menu</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openCreateDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm menu mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {selectedItem ? "Chỉnh sửa menu" : "Tạo menu mới"}
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
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="/trang-chu hoặc https://example.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loại menu</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="page">Trang nội bộ</SelectItem>
                            <SelectItem value="external">Link ngoài</SelectItem>
                            <SelectItem value="dropdown">Dropdown</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon (tùy chọn)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Home, FileText, Settings..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả (tùy chọn)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center space-x-2">
                  <FormField
                    control={form.control}
                    name="isVisible"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                        </FormControl>
                        <FormLabel>Hiển thị menu</FormLabel>
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
                  <Button type="submit">
                    {selectedItem ? "Cập nhật" : "Tạo menu"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Menu className="w-5 h-5" />
            Cấu trúc Menu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {menuItems.map((item) => renderMenuItem(item))}
            
            {menuItems.length === 0 && (
              <div className="text-center py-8">
                <Menu className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Chưa có menu nào
                </h3>
                <p className="text-gray-500 mb-4">
                  Bắt đầu bằng cách tạo menu đầu tiên
                </p>
                <Button onClick={() => openCreateDialog()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Tạo menu đầu tiên
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hướng dẫn</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-600">
          <p>• <strong>Trang nội bộ:</strong> Link đến các trang trong website (bắt đầu bằng /)</p>
          <p>• <strong>Link ngoài:</strong> Link đến website khác (bắt đầu bằng http:// hoặc https://)</p>
          <p>• <strong>Dropdown:</strong> Menu có thể chứa các menu con</p>
          <p>• Sử dụng nút <Eye className="w-3 h-3 inline" /> để ẩn/hiện menu</p>
          <p>• Click <ArrowDown className="w-3 h-3 inline" /> để mở rộng menu có submenu</p>
        </CardContent>
      </Card>
    </div>
  );
}