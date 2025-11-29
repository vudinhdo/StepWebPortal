import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Plus, Edit3, Trash2, Save, Server, Cpu, HardDrive, 
  Search, Filter, Package, Eye, EyeOff, Download, Upload,
  Star, AlertCircle, CheckCircle2, X, Tag, DollarSign, MoreVertical
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { ServerEquipment, EquipmentCategory } from "@shared/schema";

interface EquipmentSpecs {
  cpu?: string;
  ram?: string;
  storage?: string;
  networkCard?: string;
  raidController?: string;
  powerSupply?: string;
  formFactor?: string;
  warranty?: string;
  [key: string]: string | undefined;
}

interface EquipmentFormData {
  name: string;
  partNumber: string;
  category: string;
  subCategory: string;
  brand: string;
  model: string;
  description: string;
  specs: EquipmentSpecs;
  condition: string;
  priceEndUser: number | null;
  priceDealer: number | null;
  priceMD: number | null;
  stockCount: number;
  isActive: boolean;
  isFeatured: boolean;
  displayOrder: number;
  tags: string[];
  imageUrl: string;
  note: string;
}

const defaultFormData: EquipmentFormData = {
  name: "",
  partNumber: "",
  category: "",
  subCategory: "",
  brand: "",
  model: "",
  description: "",
  specs: {},
  condition: "new",
  priceEndUser: null,
  priceDealer: null,
  priceMD: null,
  stockCount: 0,
  isActive: true,
  isFeatured: false,
  displayOrder: 0,
  tags: [],
  imageUrl: "",
  note: ""
};

const formatPrice = (price: number | null) => {
  if (!price) return "-";
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(price);
};

const getConditionLabel = (condition: string | null) => {
  switch(condition?.toLowerCase()) {
    case "new": return "Mới 100%";
    case "refurbished": return "Refurbished";
    case "used": return "Đã qua sử dụng";
    default: return condition || "N/A";
  }
};

const getSpecs = (equipment: ServerEquipment): EquipmentSpecs => {
  if (!equipment.specs) return {};
  if (typeof equipment.specs === 'object') {
    return equipment.specs as EquipmentSpecs;
  }
  return {};
};

export function EquipmentManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServerEquipment | null>(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<ServerEquipment | null>(null);
  const [formData, setFormData] = useState<EquipmentFormData>(defaultFormData);
  const [tagsInput, setTagsInput] = useState("");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: equipment = [], isLoading } = useQuery<ServerEquipment[]>({
    queryKey: ['/api/equipment'],
  });

  const { data: categories = [] } = useQuery<EquipmentCategory[]>({
    queryKey: ['/api/equipment-categories'],
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<ServerEquipment>) => {
      return await apiRequest("POST", "/api/equipment", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/equipment'] });
      setIsCreateOpen(false);
      resetForm();
      toast({
        title: "Thành công",
        description: "Đã thêm thiết bị mới",
      });
    },
    onError: (error) => {
      toast({
        title: "Lỗi",
        description: "Không thể thêm thiết bị. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<ServerEquipment> }) => {
      return await apiRequest("PATCH", `/api/equipment/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/equipment'] });
      setEditingItem(null);
      resetForm();
      toast({
        title: "Đã cập nhật",
        description: "Thông tin thiết bị đã được lưu",
      });
    },
    onError: (error) => {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật thiết bị. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("DELETE", `/api/equipment/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/equipment'] });
      setDeleteConfirmItem(null);
      toast({
        title: "Đã xóa",
        description: "Thiết bị đã được xóa khỏi danh sách",
      });
    },
    onError: (error) => {
      toast({
        title: "Lỗi", 
        description: "Không thể xóa thiết bị. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  });

  const resetForm = () => {
    setFormData(defaultFormData);
    setTagsInput("");
  };

  const loadEquipmentToForm = (item: ServerEquipment) => {
    const specs = getSpecs(item);
    setFormData({
      name: item.name,
      partNumber: item.partNumber,
      category: item.category,
      subCategory: item.subCategory || "",
      brand: item.brand || "",
      model: item.model || "",
      description: item.description || "",
      specs: specs,
      condition: item.condition || "new",
      priceEndUser: item.priceEndUser,
      priceDealer: item.priceDealer,
      priceMD: item.priceMD,
      stockCount: item.stockCount || 0,
      isActive: item.isActive ?? true,
      isFeatured: item.isFeatured ?? false,
      displayOrder: item.displayOrder || 0,
      tags: item.tags || [],
      imageUrl: item.imageUrl || "",
      note: item.note || ""
    });
    setTagsInput((item.tags || []).join(", "));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.partNumber || !formData.category) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng điền đầy đủ tên, part number và danh mục",
        variant: "destructive",
      });
      return;
    }

    const tags = tagsInput.split(",").map(t => t.trim()).filter(t => t);
    
    const submitData: Partial<ServerEquipment> = {
      name: formData.name,
      partNumber: formData.partNumber,
      category: formData.category,
      subCategory: formData.subCategory || null,
      brand: formData.brand || null,
      model: formData.model || null,
      description: formData.description || null,
      specs: formData.specs,
      condition: formData.condition,
      priceEndUser: formData.priceEndUser,
      priceDealer: formData.priceDealer,
      priceMD: formData.priceMD,
      stockCount: formData.stockCount,
      isActive: formData.isActive,
      isFeatured: formData.isFeatured,
      displayOrder: formData.displayOrder,
      tags: tags,
      imageUrl: formData.imageUrl || null,
      note: formData.note || null,
    };

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleEdit = (item: ServerEquipment) => {
    setEditingItem(item);
    loadEquipmentToForm(item);
    setIsCreateOpen(true);
  };

  const handleToggleActive = (item: ServerEquipment) => {
    updateMutation.mutate({
      id: item.id,
      data: { isActive: !item.isActive }
    });
  };

  const handleToggleFeatured = (item: ServerEquipment) => {
    updateMutation.mutate({
      id: item.id,
      data: { isFeatured: !item.isFeatured }
    });
  };

  const handleDuplicate = (item: ServerEquipment) => {
    loadEquipmentToForm(item);
    setFormData(prev => ({
      ...prev,
      name: `${item.name} (Copy)`,
      partNumber: `${item.partNumber}-COPY`
    }));
    setEditingItem(null);
    setIsCreateOpen(true);
  };

  const handleSpecChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      specs: {
        ...prev.specs,
        [key]: value
      }
    }));
  };

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = searchQuery === "" || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: equipment.length,
    active: equipment.filter(e => e.isActive).length,
    featured: equipment.filter(e => e.isFeatured).length,
    inStock: equipment.filter(e => (e.stockCount || 0) > 0).length,
    outOfStock: equipment.filter(e => (e.stockCount || 0) === 0).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Server className="w-6 h-6" />
            Quản lý Kho Thiết Bị
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Thêm, sửa, xóa thiết bị máy chủ và linh kiện
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Nhập Excel
          </Button>
          <Button 
            onClick={() => {
              resetForm();
              setEditingItem(null);
              setIsCreateOpen(true);
            }}
            data-testid="add-equipment-button"
          >
            <Plus className="w-4 h-4 mr-2" />
            Thêm thiết bị
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <div className="text-sm text-gray-500">Tổng thiết bị</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <div className="text-sm text-gray-500">Đang bán</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-amber-500">{stats.featured}</div>
            <div className="text-sm text-gray-500">Nổi bật</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-blue-600">{stats.inStock}</div>
            <div className="text-sm text-gray-500">Còn hàng</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-red-500">{stats.outOfStock}</div>
            <div className="text-sm text-gray-500">Hết hàng</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo tên, part number, thương hiệu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="equipment-search"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48" data-testid="equipment-category-filter">
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.slug}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Equipment Table */}
      <Card>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader className="sticky top-0 bg-white dark:bg-slate-900">
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Thiết bị</TableHead>
                  <TableHead>Part Number</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead className="text-right">Giá Dealer</TableHead>
                  <TableHead className="text-center">Kho</TableHead>
                  <TableHead className="text-center">Trạng thái</TableHead>
                  <TableHead className="w-20"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10">
                      <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                      <p className="mt-2 text-gray-500">Đang tải...</p>
                    </TableCell>
                  </TableRow>
                ) : filteredEquipment.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10">
                      <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500">Không tìm thấy thiết bị nào</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEquipment.map((item) => {
                    const specs = getSpecs(item);
                    return (
                      <TableRow key={item.id} className="group" data-testid={`equipment-row-${item.id}`}>
                        <TableCell>
                          {item.isFeatured && (
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                              <Server className="w-6 h-6 text-slate-400" />
                            </div>
                            <div>
                              <div className="font-medium" data-testid={`equipment-name-${item.id}`}>{item.name}</div>
                              <div className="text-sm text-gray-500">
                                {item.brand} {item.model && `• ${item.model}`}
                              </div>
                              {specs.cpu && (
                                <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                  <Cpu className="w-3 h-3" />
                                  {specs.cpu}
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                            {item.partNumber}
                          </code>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {categories.find(c => c.slug === item.category)?.name || item.category}
                          </Badge>
                          {item.subCategory && (
                            <div className="text-xs text-gray-500 mt-1">{item.subCategory}</div>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatPrice(item.priceDealer)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant={item.stockCount && item.stockCount > 0 ? "default" : "destructive"}
                            className={item.stockCount && item.stockCount > 0 ? "bg-green-500" : ""}
                          >
                            {item.stockCount || 0}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            {item.isActive ? (
                              <Badge className="bg-green-500">Đang bán</Badge>
                            ) : (
                              <Badge variant="secondary">Ẩn</Badge>
                            )}
                            <Badge variant="outline">
                              {getConditionLabel(item.condition)}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" data-testid={`equipment-menu-${item.id}`}>
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(item)}>
                                <Edit3 className="w-4 h-4 mr-2" />
                                Chỉnh sửa
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDuplicate(item)}>
                                <Package className="w-4 h-4 mr-2" />
                                Nhân bản
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleToggleFeatured(item)}>
                                <Star className={`w-4 h-4 mr-2 ${item.isFeatured ? 'fill-amber-500 text-amber-500' : ''}`} />
                                {item.isFeatured ? 'Bỏ nổi bật' : 'Đánh dấu nổi bật'}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleActive(item)}>
                                {item.isActive ? (
                                  <>
                                    <EyeOff className="w-4 h-4 mr-2" />
                                    Ẩn khỏi danh mục
                                  </>
                                ) : (
                                  <>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Hiện trong danh mục
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => setDeleteConfirmItem(item)}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Xóa thiết bị
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={(open) => {
        setIsCreateOpen(open);
        if (!open) {
          setEditingItem(null);
          resetForm();
        }
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Chỉnh sửa thiết bị' : 'Thêm thiết bị mới'}
            </DialogTitle>
            <DialogDescription>
              Điền đầy đủ thông tin thiết bị để thêm vào kho
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
              <TabsTrigger value="specs">Thông số kỹ thuật</TabsTrigger>
              <TabsTrigger value="pricing">Giá & Kho</TabsTrigger>
              <TabsTrigger value="meta">Phân loại</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên thiết bị *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Dell PowerEdge R640"
                    data-testid="input-equipment-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partNumber">Part Number *</Label>
                  <Input
                    id="partNumber"
                    value={formData.partNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, partNumber: e.target.value }))}
                    placeholder="R640-BASE"
                    data-testid="input-part-number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Thương hiệu</Label>
                  <Select 
                    value={formData.brand} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, brand: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn thương hiệu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dell">Dell</SelectItem>
                      <SelectItem value="HPE">HPE</SelectItem>
                      <SelectItem value="Intel">Intel</SelectItem>
                      <SelectItem value="NVIDIA">NVIDIA</SelectItem>
                      <SelectItem value="Samsung">Samsung</SelectItem>
                      <SelectItem value="Seagate">Seagate</SelectItem>
                      <SelectItem value="Other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                    placeholder="PowerEdge R640"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Mô tả chi tiết về thiết bị..."
                  rows={3}
                  data-testid="input-description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL hình ảnh</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">Ghi chú nội bộ</Label>
                <Textarea
                  id="note"
                  value={formData.note}
                  onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                  placeholder="Ghi chú cho nhân viên..."
                  rows={2}
                />
              </div>
            </TabsContent>

            <TabsContent value="specs" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>CPU</Label>
                  <Input
                    value={formData.specs.cpu || ""}
                    onChange={(e) => handleSpecChange("cpu", e.target.value)}
                    placeholder="2x Intel Xeon Gold 6130"
                  />
                </div>
                <div className="space-y-2">
                  <Label>RAM</Label>
                  <Input
                    value={formData.specs.ram || ""}
                    onChange={(e) => handleSpecChange("ram", e.target.value)}
                    placeholder="128GB DDR4 ECC"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Storage</Label>
                  <Input
                    value={formData.specs.storage || ""}
                    onChange={(e) => handleSpecChange("storage", e.target.value)}
                    placeholder="8x 1.2TB SAS 10K"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Network Card</Label>
                  <Input
                    value={formData.specs.networkCard || ""}
                    onChange={(e) => handleSpecChange("networkCard", e.target.value)}
                    placeholder="4x 10GbE"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>RAID Controller</Label>
                  <Input
                    value={formData.specs.raidController || ""}
                    onChange={(e) => handleSpecChange("raidController", e.target.value)}
                    placeholder="PERC H740P"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Power Supply</Label>
                  <Input
                    value={formData.specs.powerSupply || ""}
                    onChange={(e) => handleSpecChange("powerSupply", e.target.value)}
                    placeholder="2x 750W"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Form Factor</Label>
                  <Input
                    value={formData.specs.formFactor || ""}
                    onChange={(e) => handleSpecChange("formFactor", e.target.value)}
                    placeholder="1U Rack"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Warranty</Label>
                  <Input
                    value={formData.specs.warranty || ""}
                    onChange={(e) => handleSpecChange("warranty", e.target.value)}
                    placeholder="3 năm"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4 mt-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Giá End User (VND)</Label>
                  <Input
                    type="number"
                    value={formData.priceEndUser || ""}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      priceEndUser: e.target.value ? parseInt(e.target.value) : null 
                    }))}
                    placeholder="0"
                    data-testid="input-price-enduser"
                  />
                  <p className="text-xs text-gray-500">Giá niêm yết cho khách hàng</p>
                </div>
                <div className="space-y-2">
                  <Label>Giá Dealer (VND)</Label>
                  <Input
                    type="number"
                    value={formData.priceDealer || ""}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      priceDealer: e.target.value ? parseInt(e.target.value) : null 
                    }))}
                    placeholder="0"
                    data-testid="input-price-dealer"
                  />
                  <p className="text-xs text-gray-500">Giá bán cho đại lý</p>
                </div>
                <div className="space-y-2">
                  <Label>Giá MD (VND)</Label>
                  <Input
                    type="number"
                    value={formData.priceMD || ""}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      priceMD: e.target.value ? parseInt(e.target.value) : null 
                    }))}
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-500">Giá gốc (nội bộ)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Số lượng trong kho</Label>
                  <Input
                    type="number"
                    value={formData.stockCount}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      stockCount: parseInt(e.target.value) || 0 
                    }))}
                    placeholder="0"
                    data-testid="input-stock-count"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tình trạng</Label>
                  <Select 
                    value={formData.condition} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, condition: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn tình trạng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Mới 100%</SelectItem>
                      <SelectItem value="refurbished">Refurbished</SelectItem>
                      <SelectItem value="used">Đã qua sử dụng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="meta" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Danh mục *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger data-testid="select-category">
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.slug}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Sub-category</Label>
                  <Input
                    value={formData.subCategory}
                    onChange={(e) => setFormData(prev => ({ ...prev, subCategory: e.target.value }))}
                    placeholder="Rack Server, Tower Server, GPU..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tags (phân cách bằng dấu phẩy)</Label>
                <Input
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="dell, rack, 1u, enterprise"
                />
                <div className="flex flex-wrap gap-1 mt-2">
                  {tagsInput.split(",").map((tag, i) => tag.trim() && (
                    <Badge key={i} variant="secondary">{tag.trim()}</Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Thứ tự hiển thị</Label>
                  <Input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      displayOrder: parseInt(e.target.value) || 0 
                    }))}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                  />
                  <Label htmlFor="isActive">Hiển thị trên website</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isFeatured: checked }))}
                  />
                  <Label htmlFor="isFeatured">Đánh dấu nổi bật</Label>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsCreateOpen(false);
                setEditingItem(null);
                resetForm();
              }}
            >
              Hủy
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={createMutation.isPending || updateMutation.isPending}
              data-testid="save-equipment-button"
            >
              {(createMutation.isPending || updateMutation.isPending) ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {editingItem ? 'Cập nhật' : 'Thêm thiết bị'}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmItem} onOpenChange={() => setDeleteConfirmItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              Xác nhận xóa
            </DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa thiết bị "{deleteConfirmItem?.name}"? 
              Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmItem(null)}>
              Hủy
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => deleteConfirmItem && deleteMutation.mutate(deleteConfirmItem.id)}
              disabled={deleteMutation.isPending}
              data-testid="confirm-delete-button"
            >
              {deleteMutation.isPending ? "Đang xóa..." : "Xóa thiết bị"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
