import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Search,
  Filter,
  Grid3X3,
  List,
  ChevronRight,
  Package,
  Tag,
  ShoppingCart,
  Phone,
  Mail,
  CheckCircle,
  Star,
  Zap,
  Shield,
  Clock,
  Award,
  Network,
  X,
  ChevronDown,
  Info
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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

const formatPrice = (price: number | null) => {
  if (!price) return "Liên hệ";
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(price);
};

const getConditionBadge = (condition: string | null) => {
  switch(condition?.toLowerCase()) {
    case "new":
      return { label: "Mới 100%", color: "bg-green-500" };
    case "refurbished":
      return { label: "Đã qua sử dụng", color: "bg-blue-500" };
    case "used":
      return { label: "Cũ", color: "bg-yellow-500" };
    default:
      return { label: condition || "N/A", color: "bg-gray-500" };
  }
};

const getCategoryIcon = (categorySlug: string) => {
  switch(categorySlug) {
    case "may-chu-dell":
    case "may-chu-hpe":
      return Server;
    case "linh-kien-dell":
    case "linh-kien-hpe":
      return Cpu;
    case "card-mang-gpu":
      return Network;
    default:
      return Package;
  }
};

const getSpecs = (equipment: ServerEquipment): EquipmentSpecs => {
  if (!equipment.specs) return {};
  if (typeof equipment.specs === 'object') {
    return equipment.specs as EquipmentSpecs;
  }
  return {};
};

interface EquipmentCardProps {
  equipment: ServerEquipment;
  viewMode: "grid" | "list";
  onViewDetails: (equipment: ServerEquipment) => void;
}

function EquipmentCard({ equipment, viewMode, onViewDetails }: EquipmentCardProps) {
  const conditionBadge = getConditionBadge(equipment.condition);
  const specs = getSpecs(equipment);
  const discount = equipment.priceEndUser && equipment.priceDealer 
    ? Math.round((1 - equipment.priceDealer / equipment.priceEndUser) * 100)
    : 0;

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 hover:shadow-lg transition-shadow"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-48 h-32 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-lg flex items-center justify-center shrink-0">
            <Server className="w-16 h-16 text-slate-400 dark:text-slate-500" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {equipment.isFeatured && (
                    <Badge className="bg-amber-500 text-white text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      Nổi bật
                    </Badge>
                  )}
                  <Badge className={`${conditionBadge.color} text-white text-xs`}>
                    {conditionBadge.label}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate" data-testid={`equipment-name-${equipment.id}`}>
                  {equipment.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {equipment.brand} • {equipment.partNumber}
                </p>
              </div>
              
              <div className="text-right shrink-0">
                {discount > 0 && (
                  <span className="text-sm text-gray-400 line-through">{formatPrice(equipment.priceEndUser)}</span>
                )}
                <div className="text-xl font-bold text-primary" data-testid={`equipment-price-${equipment.id}`}>
                  {formatPrice(equipment.priceDealer)}
                </div>
                {discount > 0 && (
                  <Badge className="bg-red-500 text-white text-xs">-{discount}%</Badge>
                )}
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
              {equipment.description}
            </p>
            
            <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
              {specs.cpu && <span className="flex items-center gap-1"><Cpu className="w-3 h-3" />{specs.cpu}</span>}
              {specs.ram && <span className="flex items-center gap-1"><HardDrive className="w-3 h-3" />{specs.ram}</span>}
              {specs.storage && <span className="flex items-center gap-1"><HardDrive className="w-3 h-3" />{specs.storage}</span>}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {equipment.stockCount !== null && equipment.stockCount > 0 ? (
                  <span className="text-green-600 text-sm flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Còn {equipment.stockCount} sản phẩm
                  </span>
                ) : (
                  <span className="text-red-500 text-sm">Hết hàng</span>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onViewDetails(equipment)}
                  data-testid={`view-details-${equipment.id}`}
                >
                  Chi tiết
                </Button>
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90"
                  data-testid={`contact-quote-${equipment.id}`}
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Báo giá
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow group"
    >
      <div className="relative">
        <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
          <Server className="w-20 h-20 text-slate-400 dark:text-slate-500 group-hover:scale-110 transition-transform" />
        </div>
        
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {equipment.isFeatured && (
            <Badge className="bg-amber-500 text-white text-xs">
              <Star className="w-3 h-3 mr-1" />
              Nổi bật
            </Badge>
          )}
          <Badge className={`${conditionBadge.color} text-white text-xs`}>
            {conditionBadge.label}
          </Badge>
        </div>
        
        {discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-white">
            -{discount}%
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {equipment.brand} • {equipment.partNumber}
          </p>
          <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 min-h-[48px]" data-testid={`equipment-name-${equipment.id}`}>
            {equipment.name}
          </h3>
        </div>
        
        <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400 mb-3">
          {specs.cpu && (
            <p className="flex items-center gap-1 truncate">
              <Cpu className="w-3 h-3 shrink-0" />
              <span className="truncate">{specs.cpu}</span>
            </p>
          )}
          {specs.ram && (
            <p className="flex items-center gap-1">
              <HardDrive className="w-3 h-3 shrink-0" />
              RAM: {specs.ram}
            </p>
          )}
        </div>
        
        <div className="border-t border-gray-100 dark:border-slate-700 pt-3 mb-3">
          {equipment.priceEndUser && equipment.priceEndUser !== equipment.priceDealer && (
            <p className="text-sm text-gray-400 line-through">{formatPrice(equipment.priceEndUser)}</p>
          )}
          <p className="text-xl font-bold text-primary" data-testid={`equipment-price-${equipment.id}`}>
            {formatPrice(equipment.priceDealer)}
          </p>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          {equipment.stockCount !== null && equipment.stockCount > 0 ? (
            <span className="text-green-600 text-xs flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Còn hàng
            </span>
          ) : (
            <span className="text-red-500 text-xs">Hết hàng</span>
          )}
          {specs.warranty && (
            <span className="text-xs text-gray-500">BH: {specs.warranty}</span>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails(equipment)}
            data-testid={`view-details-${equipment.id}`}
          >
            Chi tiết
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-primary hover:bg-primary/90"
            data-testid={`contact-quote-${equipment.id}`}
          >
            Báo giá
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function EquipmentDetailModal({ equipment, open, onClose }: { equipment: ServerEquipment | null, open: boolean, onClose: () => void }) {
  if (!equipment) return null;
  
  const conditionBadge = getConditionBadge(equipment.condition);
  const specs = getSpecs(equipment);
  const discount = equipment.priceEndUser && equipment.priceDealer 
    ? Math.round((1 - equipment.priceDealer / equipment.priceEndUser) * 100)
    : 0;

  const specsList = [
    { label: "CPU", value: specs.cpu, icon: Cpu },
    { label: "RAM", value: specs.ram, icon: HardDrive },
    { label: "Storage", value: specs.storage, icon: HardDrive },
    { label: "Network", value: specs.networkCard, icon: Network },
    { label: "RAID Controller", value: specs.raidController, icon: Shield },
    { label: "Power Supply", value: specs.powerSupply, icon: Zap },
    { label: "Form Factor", value: specs.formFactor, icon: Package },
    { label: "Warranty", value: specs.warranty, icon: Clock },
  ].filter(spec => spec.value);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            {equipment.isFeatured && (
              <Badge className="bg-amber-500 text-white">
                <Star className="w-3 h-3 mr-1" />
                Nổi bật
              </Badge>
            )}
            <Badge className={`${conditionBadge.color} text-white`}>
              {conditionBadge.label}
            </Badge>
          </div>
          <DialogTitle className="text-2xl" data-testid="equipment-detail-title">
            {equipment.name}
          </DialogTitle>
          <DialogDescription>
            {equipment.brand} • Part Number: {equipment.partNumber}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 py-4">
          <div>
            <div className="w-full h-64 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-lg flex items-center justify-center mb-4">
              <Server className="w-24 h-24 text-slate-400" />
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Giá bán
              </h4>
              
              <div className="space-y-2">
                {equipment.priceEndUser && equipment.priceEndUser !== equipment.priceDealer && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Giá niêm yết:</span>
                    <span className="line-through text-gray-400">{formatPrice(equipment.priceEndUser)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Giá bán:</span>
                  <span className="text-2xl font-bold text-primary">{formatPrice(equipment.priceDealer)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tiết kiệm:</span>
                    <span className="text-green-600 font-semibold">
                      {formatPrice((equipment.priceEndUser || 0) - (equipment.priceDealer || 0))} (-{discount}%)
                    </span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                {equipment.stockCount !== null && equipment.stockCount > 0 ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span>Còn {equipment.stockCount} sản phẩm trong kho</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-500">
                    <X className="w-5 h-5" />
                    <span>Tạm hết hàng</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Mô tả sản phẩm
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {equipment.description}
            </p>
            
            {equipment.note && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Ghi chú:</strong> {equipment.note}
                </p>
              </div>
            )}
            
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Thông số kỹ thuật
            </h4>
            <div className="space-y-2">
              {specsList.map((spec, index) => (
                <div key={index} className="flex items-start gap-2 py-2 border-b border-gray-100 dark:border-slate-700 last:border-0">
                  <spec.icon className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{spec.label}:</span>
                    <span className="text-sm ml-2 text-gray-900 dark:text-white">{spec.value}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {equipment.tags && equipment.tags.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {equipment.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
          <Button className="bg-primary hover:bg-primary/90" data-testid="request-quote-button">
            <Phone className="w-4 h-4 mr-2" />
            Liên hệ báo giá: 028 6681 8968
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function EquipmentCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedCondition, setSelectedCondition] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedEquipment, setSelectedEquipment] = useState<ServerEquipment | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const { data: equipment = [], isLoading: equipmentLoading } = useQuery<ServerEquipment[]>({
    queryKey: ['/api/equipment'],
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<EquipmentCategory[]>({
    queryKey: ['/api/equipment-categories'],
  });

  const brands = useMemo(() => {
    const brandSet = new Set(equipment.map(e => e.brand).filter(Boolean));
    return Array.from(brandSet) as string[];
  }, [equipment]);

  const filteredEquipment = useMemo(() => {
    let result = [...equipment];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(e => 
        e.name.toLowerCase().includes(query) ||
        e.partNumber.toLowerCase().includes(query) ||
        e.description?.toLowerCase().includes(query) ||
        e.brand?.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter(e => e.category === selectedCategory);
    }

    if (selectedBrand !== "all") {
      result = result.filter(e => e.brand === selectedBrand);
    }

    if (selectedCondition !== "all") {
      result = result.filter(e => e.condition?.toLowerCase() === selectedCondition.toLowerCase());
    }

    switch (sortBy) {
      case "featured":
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
      case "price-asc":
        result.sort((a, b) => (a.priceDealer || 0) - (b.priceDealer || 0));
        break;
      case "price-desc":
        result.sort((a, b) => (b.priceDealer || 0) - (a.priceDealer || 0));
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [equipment, searchQuery, selectedCategory, selectedBrand, selectedCondition, sortBy]);

  const stats = useMemo(() => ({
    total: equipment.length,
    inStock: equipment.filter(e => (e.stockCount || 0) > 0).length,
    featured: equipment.filter(e => e.isFeatured).length,
    brands: brands.length
  }), [equipment, brands]);

  const isLoading = equipmentLoading || categoriesLoading;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/server-pattern.png')] opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-4 py-2 rounded-full text-sm mb-6">
                <Server className="w-4 h-4" />
                <span>Kho Thiết Bị Máy Chủ STEP</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="page-title">
                Thiết Bị & Linh Kiện
                <span className="block text-primary mt-2">Máy Chủ Chính Hãng</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Phân phối máy chủ Dell, HPE và linh kiện chính hãng với giá cạnh tranh. 
                Bảo hành uy tín, hỗ trợ kỹ thuật chuyên nghiệp 24/7.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-primary">{stats.total}+</div>
                  <div className="text-sm text-gray-300">Sản phẩm</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-400">{stats.inStock}</div>
                  <div className="text-sm text-gray-300">Còn hàng</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-amber-400">{stats.featured}</div>
                  <div className="text-sm text-gray-300">Nổi bật</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-400">{stats.brands}</div>
                  <div className="text-sm text-gray-300">Thương hiệu</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters & Search Section */}
        <section className="sticky top-0 z-40 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm thiết bị, part number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="search-input"
                />
              </div>

              {/* Desktop Filters */}
              <div className="hidden lg:flex items-center gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-44" data-testid="category-filter">
                    <SelectValue placeholder="Danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả danh mục</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.slug}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger className="w-36" data-testid="brand-filter">
                    <SelectValue placeholder="Thương hiệu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    {brands.map(brand => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                  <SelectTrigger className="w-36" data-testid="condition-filter">
                    <SelectValue placeholder="Tình trạng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="new">Mới 100%</SelectItem>
                    <SelectItem value="refurbished">Đã qua sử dụng</SelectItem>
                    <SelectItem value="used">Cũ</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40" data-testid="sort-select">
                    <SelectValue placeholder="Sắp xếp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Nổi bật</SelectItem>
                    <SelectItem value="price-asc">Giá thấp → cao</SelectItem>
                    <SelectItem value="price-desc">Giá cao → thấp</SelectItem>
                    <SelectItem value="name">Tên A-Z</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                    data-testid="grid-view-button"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                    data-testid="list-view-button"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Mobile Filter Toggle */}
              <div className="flex lg:hidden items-center gap-2 w-full">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex-1"
                  data-testid="mobile-filter-toggle"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Bộ lọc
                  <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="lg:hidden overflow-hidden"
                >
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả danh mục</SelectItem>
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.slug}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                      <SelectTrigger>
                        <SelectValue placeholder="Thương hiệu" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        {brands.map(brand => (
                          <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tình trạng" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="new">Mới 100%</SelectItem>
                        <SelectItem value="refurbished">Đã qua sử dụng</SelectItem>
                        <SelectItem value="used">Cũ</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sắp xếp" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Nổi bật</SelectItem>
                        <SelectItem value="price-asc">Giá thấp → cao</SelectItem>
                        <SelectItem value="price-desc">Giá cao → thấp</SelectItem>
                        <SelectItem value="name">Tên A-Z</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="bg-gray-100 dark:bg-slate-800/50 py-4 border-b border-gray-200 dark:border-slate-700">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className="shrink-0"
                data-testid="category-all"
              >
                <Package className="w-4 h-4 mr-2" />
                Tất cả
              </Button>
              {categories.map(cat => {
                const IconComponent = getCategoryIcon(cat.slug);
                return (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.slug ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className="shrink-0"
                    data-testid={`category-${cat.slug}`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {cat.name}
                  </Button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4">
            {/* Results Summary */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600 dark:text-gray-300" data-testid="results-count">
                Tìm thấy <strong>{filteredEquipment.length}</strong> sản phẩm
              </p>
              {(selectedCategory !== "all" || selectedBrand !== "all" || selectedCondition !== "all" || searchQuery) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedBrand("all");
                    setSelectedCondition("all");
                    setSearchQuery("");
                  }}
                  data-testid="clear-filters"
                >
                  <X className="w-4 h-4 mr-1" />
                  Xóa bộ lọc
                </Button>
              )}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden animate-pulse">
                    <div className="w-full h-48 bg-gray-200 dark:bg-slate-700"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
                      <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredEquipment.length === 0 ? (
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-gray-300 dark:text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedBrand("all");
                    setSelectedCondition("all");
                    setSearchQuery("");
                  }}
                >
                  Xóa bộ lọc
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="products-grid">
                {filteredEquipment.map(item => (
                  <EquipmentCard
                    key={item.id}
                    equipment={item}
                    viewMode="grid"
                    onViewDetails={setSelectedEquipment}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4" data-testid="products-list">
                {filteredEquipment.map(item => (
                  <EquipmentCard
                    key={item.id}
                    equipment={item}
                    viewMode="list"
                    onViewDetails={setSelectedEquipment}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Tại sao chọn STEP?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Cam kết chất lượng sản phẩm và dịch vụ hàng đầu cho khách hàng doanh nghiệp
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Shield, title: "Sản phẩm chính hãng", desc: "100% thiết bị Dell, HPE chính hãng với đầy đủ giấy tờ nguồn gốc" },
                { icon: Award, title: "Bảo hành uy tín", desc: "Bảo hành dài hạn từ 1-3 năm, hỗ trợ thay thế nhanh chóng" },
                { icon: Zap, title: "Hỗ trợ kỹ thuật 24/7", desc: "Đội ngũ kỹ thuật viên chuyên nghiệp, sẵn sàng hỗ trợ mọi lúc" },
                { icon: Tag, title: "Giá cạnh tranh", desc: "Cam kết giá tốt nhất thị trường, chiết khấu cao cho dự án lớn" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 rounded-xl bg-gray-50 dark:bg-slate-700/50"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Cần tư vấn thiết bị cho dự án?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Liên hệ với chúng tôi để được tư vấn giải pháp phù hợp nhất với ngân sách và yêu cầu của bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="gap-2" data-testid="contact-hotline">
                <Phone className="w-5 h-5" />
                Hotline: 028 6681 8968
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2" data-testid="contact-email">
                <Mail className="w-5 h-5" />
                sales@step.com.vn
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Equipment Detail Modal */}
      <EquipmentDetailModal
        equipment={selectedEquipment}
        open={!!selectedEquipment}
        onClose={() => setSelectedEquipment(null)}
      />
    </div>
  );
}
