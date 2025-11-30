import { useState, useMemo, useCallback, useRef, useEffect } from "react";
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
  CheckCircle,
  Zap,
  Shield,
  Network,
  X,
  ChevronDown,
  ChevronUp,
  Database,
  MemoryStick,
  RotateCcw,
  Cable,
  Wrench,
  Scale,
  Box,
  Layers,
  ArrowUpDown,
  Home,
  Eye,
  MessageCircle,
  Flame,
  Clock
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import type { ServerEquipment, EquipmentCategory } from "@shared/schema";

const ZALO_OA_LINK = 'https://zalo.me/93171011934970677';

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

const formatPriceCompact = (price: number) => {
  if (price >= 1000000000) {
    return `${(price / 1000000000).toFixed(1)}B`;
  }
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(0)}tr`;
  }
  return formatPrice(price);
};

const getConditionInfo = (condition: string | null) => {
  switch(condition?.toLowerCase()) {
    case "new":
      return { label: "Mới 100%", color: "bg-emerald-500", textColor: "text-emerald-600" };
    case "refurbished":
      return { label: "Like New", color: "bg-blue-500", textColor: "text-blue-600" };
    case "used":
      return { label: "Đã qua SD", color: "bg-amber-500", textColor: "text-amber-600" };
    default:
      return { label: condition || "N/A", color: "bg-gray-500", textColor: "text-gray-600" };
  }
};

const getCategoryIcon = (categorySlug: string) => {
  switch(categorySlug) {
    case "may-chu-dell":
    case "may-chu-hpe":
    case "may-chu-h3c":
    case "may-chu-asus":
      return Server;
    case "he-thong-luu-tru":
      return Database;
    case "linh-kien-dell":
    case "linh-kien-hpe":
      return Cpu;
    case "card-mang-gpu":
      return Network;
    case "switch-mang":
      return Layers;
    case "module-quang":
      return Cable;
    case "vat-tu-mang":
      return Wrench;
    case "can-bang-tai":
      return Scale;
    default:
      return Box;
  }
};

const PRICE_RANGES = [
  { label: "Tất cả mức giá", min: 0, max: Infinity },
  { label: "Dưới 50 triệu", min: 0, max: 50000000 },
  { label: "50 - 100 triệu", min: 50000000, max: 100000000 },
  { label: "100 - 300 triệu", min: 100000000, max: 300000000 },
  { label: "300 - 500 triệu", min: 300000000, max: 500000000 },
  { label: "Trên 500 triệu", min: 500000000, max: Infinity },
];

const CONDITIONS = [
  { label: "Tất cả", value: "all" },
  { label: "Mới 100%", value: "new" },
  { label: "Like New", value: "refurbished" },
  { label: "Đã qua SD", value: "used" },
];

const getSpecs = (equipment: ServerEquipment): EquipmentSpecs => {
  if (!equipment.specs) return {};
  if (typeof equipment.specs === 'object') {
    return equipment.specs as EquipmentSpecs;
  }
  return {};
};

// Category structure for sidebar
const CATEGORY_STRUCTURE = [
  {
    id: "servers",
    name: "Máy Chủ",
    icon: Server,
    children: [
      { slug: "may-chu-dell", name: "Máy Chủ Dell" },
      { slug: "may-chu-hpe", name: "Máy Chủ HPE" },
      { slug: "may-chu-h3c", name: "Máy Chủ H3C" },
      { slug: "may-chu-asus", name: "Máy Chủ ASUS" },
    ]
  },
  {
    id: "storage",
    name: "Lưu Trữ",
    icon: Database,
    children: [
      { slug: "he-thong-luu-tru", name: "Hệ Thống Lưu Trữ" },
    ]
  },
  {
    id: "components",
    name: "Linh Kiện",
    icon: Cpu,
    children: [
      { slug: "linh-kien-dell", name: "Linh Kiện Dell" },
      { slug: "linh-kien-hpe", name: "Linh Kiện HPE" },
      { slug: "card-mang-gpu", name: "Card Mạng & GPU" },
    ]
  },
  {
    id: "network",
    name: "Thiết Bị Mạng",
    icon: Network,
    children: [
      { slug: "switch-mang", name: "Switch Mạng" },
      { slug: "module-quang", name: "Module Quang & Dây Quang" },
      { slug: "vat-tu-mang", name: "Vật Tư Mạng" },
      { slug: "can-bang-tai", name: "Cân Bằng Tải" },
    ]
  },
  {
    id: "other",
    name: "Khác",
    icon: Box,
    children: [
      { slug: "thiet-bi-khac", name: "Thiết Bị Khác" },
    ]
  }
];

// Product Card Component
interface ProductCardProps {
  equipment: ServerEquipment;
  viewMode: "grid" | "list";
  onAddToCart: (equipment: ServerEquipment) => void;
}

function ProductCard({ equipment, viewMode, onAddToCart }: ProductCardProps) {
  const conditionInfo = getConditionInfo(equipment.condition);
  const specs = getSpecs(equipment);
  const discount = equipment.priceEndUser && equipment.priceDealer 
    ? Math.round((1 - equipment.priceDealer / equipment.priceEndUser) * 100)
    : 0;
  
  const CategoryIcon = getCategoryIcon(equipment.category);
  
  const handleContact = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(ZALO_OA_LINK, '_blank');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(equipment);
  };

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-gray-300 transition-all duration-200"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-40 h-28 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 overflow-hidden border border-gray-100">
            {equipment.isFeatured && (
              <div className="absolute top-2 left-2 z-10">
                <Badge className="bg-red-500 text-white text-[10px] px-1.5 py-0.5">
                  <Flame className="w-3 h-3 mr-0.5" />
                  Hot
                </Badge>
              </div>
            )}
            {discount > 0 && (
              <Badge className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] px-1.5 py-0.5">
                -{discount}%
              </Badge>
            )}
            <CategoryIcon className="w-12 h-12 text-gray-300 group-hover:text-gray-400 transition-colors" />
          </div>
          
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <Badge variant="outline" className={`${conditionInfo.textColor} border-current text-[10px] px-1.5 py-0`}>
                    {conditionInfo.label}
                  </Badge>
                  <span className="text-xs text-gray-500">{equipment.brand}</span>
                  {equipment.stockCount !== null && equipment.stockCount > 0 ? (
                    <span className="text-emerald-600 text-xs flex items-center gap-0.5">
                      <CheckCircle className="w-3 h-3" />
                      Còn {equipment.stockCount}
                    </span>
                  ) : (
                    <span className="text-red-500 text-xs">Hết hàng</span>
                  )}
                </div>
                <Link href={`/thiet-bi-may-chu/${equipment.id}`}>
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 hover:text-blue-600 transition-colors cursor-pointer" data-testid={`equipment-name-${equipment.id}`}>
                    {equipment.name}
                  </h3>
                </Link>
                <p className="text-xs text-gray-400 mt-0.5">{equipment.partNumber}</p>
              </div>
              
              <div className="text-right shrink-0">
                {discount > 0 && (
                  <span className="text-xs text-gray-400 line-through block">{formatPriceCompact(equipment.priceEndUser!)}</span>
                )}
                <div className="text-lg font-bold text-gray-900" data-testid={`equipment-price-${equipment.id}`}>
                  {formatPriceCompact(equipment.priceDealer || 0)}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-500 mb-3 flex-1">
              {specs.cpu && (
                <span className="flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-gray-400" />
                  <span className="truncate max-w-[150px]">{specs.cpu}</span>
                </span>
              )}
              {specs.ram && (
                <span className="flex items-center gap-1">
                  <MemoryStick className="w-3 h-3 text-gray-400" />
                  {specs.ram}
                </span>
              )}
              {specs.storage && (
                <span className="flex items-center gap-1">
                  <HardDrive className="w-3 h-3 text-gray-400" />
                  <span className="truncate max-w-[120px]">{specs.storage}</span>
                </span>
              )}
              {specs.networkCard && (
                <span className="flex items-center gap-1">
                  <Network className="w-3 h-3 text-gray-400" />
                  <span className="truncate max-w-[150px]">{specs.networkCard}</span>
                </span>
              )}
            </div>
            
            <div className="flex items-center justify-end gap-2 mt-auto">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleContact}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-xs h-8 border-gray-300"
                data-testid={`contact-${equipment.id}`}
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1" />
                Liên hệ
              </Button>
              <Link href={`/thiet-bi-may-chu/${equipment.id}`}>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs h-8 border-gray-300"
                  data-testid={`view-details-${equipment.id}`}
                >
                  <Eye className="w-3.5 h-3.5 mr-1" />
                  Chi tiết
                </Button>
              </Link>
              <Button 
                size="sm" 
                className="bg-gray-900 hover:bg-gray-800 text-white text-xs h-8"
                onClick={handleAddToCart}
                disabled={!equipment.stockCount || equipment.stockCount <= 0}
                data-testid={`add-cart-${equipment.id}`}
              >
                <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                Thêm giỏ
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid View
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-200"
    >
      <div className="relative">
        <div className="w-full h-32 bg-gray-50 flex items-center justify-center border-b border-gray-100">
          <CategoryIcon className="w-12 h-12 text-gray-300 group-hover:text-gray-400 transition-colors" />
        </div>
        
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {equipment.isFeatured && (
            <Badge className="bg-red-500 text-white text-[10px] px-1.5 py-0.5">
              <Flame className="w-3 h-3 mr-0.5" />
              Hot
            </Badge>
          )}
        </div>
        
        <Badge variant="outline" className={`absolute top-2 right-2 ${conditionInfo.textColor} border-current bg-white text-[10px] px-1.5 py-0`}>
          {conditionInfo.label}
        </Badge>
        
        {discount > 0 && (
          <Badge className="absolute bottom-2 right-2 bg-orange-500 text-white text-[10px] px-1.5 py-0.5">
            -{discount}%
          </Badge>
        )}
      </div>
      
      <div className="p-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-medium text-gray-500">{equipment.brand}</span>
          {equipment.stockCount !== null && equipment.stockCount > 0 ? (
            <span className="text-emerald-600 text-[10px] flex items-center gap-0.5">
              <CheckCircle className="w-3 h-3" />
              Còn {equipment.stockCount}
            </span>
          ) : (
            <span className="text-red-500 text-[10px]">Hết hàng</span>
          )}
        </div>
        
        <Link href={`/thiet-bi-may-chu/${equipment.id}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-2 h-10 text-sm hover:text-blue-600 transition-colors cursor-pointer" data-testid={`equipment-name-${equipment.id}`}>
            {equipment.name}
          </h3>
        </Link>
        
        <div className="space-y-1 mt-2 mb-2">
          {specs.cpu && (
            <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
              <Cpu className="w-3 h-3 text-gray-400 shrink-0" />
              <span className="truncate">{specs.cpu}</span>
            </div>
          )}
          {specs.ram && (
            <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
              <MemoryStick className="w-3 h-3 text-gray-400 shrink-0" />
              <span className="truncate">{specs.ram}</span>
            </div>
          )}
          {(specs.storage || specs.networkCard) && (
            <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
              {specs.storage ? (
                <>
                  <HardDrive className="w-3 h-3 text-gray-400 shrink-0" />
                  <span className="truncate">{specs.storage}</span>
                </>
              ) : (
                <>
                  <Network className="w-3 h-3 text-gray-400 shrink-0" />
                  <span className="truncate">{specs.networkCard}</span>
                </>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-end justify-between mb-3">
          <div>
            {discount > 0 && (
              <span className="text-xs text-gray-400 line-through block">{formatPriceCompact(equipment.priceEndUser!)}</span>
            )}
            <div className="text-base font-bold text-gray-900" data-testid={`equipment-price-${equipment.id}`}>
              {formatPriceCompact(equipment.priceDealer || 0)}
            </div>
          </div>
          {specs.warranty && (
            <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
              <Shield className="w-3 h-3" />
              {specs.warranty}
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-1">
          <Button 
            variant="outline" 
            size="sm"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-[10px] px-1.5 h-7 border-gray-300"
            onClick={handleContact}
            data-testid={`contact-${equipment.id}`}
          >
            <MessageCircle className="w-3 h-3 mr-0.5" />
            Liên hệ
          </Button>
          <Link href={`/thiet-bi-may-chu/${equipment.id}`} className="contents">
            <Button 
              variant="outline" 
              size="sm"
              className="text-[10px] px-1.5 h-7 border-gray-300"
              data-testid={`view-details-${equipment.id}`}
            >
              <Eye className="w-3 h-3 mr-0.5" />
              Chi tiết
            </Button>
          </Link>
          <Button 
            size="sm" 
            className="bg-gray-900 hover:bg-gray-800 text-white text-[10px] px-1.5 h-7"
            onClick={handleAddToCart}
            disabled={!equipment.stockCount || equipment.stockCount <= 0}
            data-testid={`add-cart-${equipment.id}`}
          >
            <ShoppingCart className="w-3 h-3 mr-0.5" />
            Giỏ hàng
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Category Sidebar Component
interface CategorySidebarProps {
  selectedCategory: string;
  onCategoryChange: (slug: string) => void;
  categoryCounts: Record<string, number>;
}

function CategorySidebar({ selectedCategory, onCategoryChange, categoryCounts }: CategorySidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["servers", "network", "storage", "components"]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const getTotalCount = (children: { slug: string }[]) => {
    return children.reduce((sum, child) => sum + (categoryCounts[child.slug] || 0), 0);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-3 border-b border-gray-100 bg-gray-50">
        <h3 className="font-semibold text-sm text-gray-900 flex items-center gap-2">
          <Package className="w-4 h-4" />
          Danh mục sản phẩm
        </h3>
      </div>
      
      <div className="p-2">
        <button
          onClick={() => onCategoryChange("all")}
          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between ${
            selectedCategory === "all" 
              ? "bg-gray-900 text-white" 
              : "text-gray-700 hover:bg-gray-100"
          }`}
          data-testid="category-all"
        >
          <span className="font-medium">Tất cả sản phẩm</span>
          <Badge variant={selectedCategory === "all" ? "secondary" : "outline"} className="text-[10px] h-5">
            {Object.values(categoryCounts).reduce((a, b) => a + b, 0)}
          </Badge>
        </button>
        
        <div className="mt-2 space-y-1">
          {CATEGORY_STRUCTURE.map(group => {
            const isExpanded = expandedGroups.includes(group.id);
            const totalCount = getTotalCount(group.children);
            const Icon = group.icon;
            const hasActiveChild = group.children.some(child => selectedCategory === child.slug);
            
            if (totalCount === 0) return null;
            
            return (
              <div key={group.id} className="border-t border-gray-100 pt-1 first:border-t-0 first:pt-0">
                <button
                  onClick={() => toggleGroup(group.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between ${
                    hasActiveChild ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  <span className="flex items-center gap-2 font-medium text-gray-900">
                    <Icon className="w-4 h-4 text-gray-500" />
                    {group.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] h-5 text-gray-500">
                      {totalCount}
                    </Badge>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-6 pr-2 py-1 space-y-0.5">
                        {group.children.map(child => {
                          const count = categoryCounts[child.slug] || 0;
                          if (count === 0) return null;
                          
                          return (
                            <button
                              key={child.slug}
                              onClick={() => onCategoryChange(child.slug)}
                              className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors flex items-center justify-between ${
                                selectedCategory === child.slug 
                                  ? "bg-gray-900 text-white" 
                                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                              }`}
                              data-testid={`category-${child.slug}`}
                            >
                              <span>{child.name}</span>
                              <Badge 
                                variant={selectedCategory === child.slug ? "secondary" : "outline"} 
                                className="text-[10px] h-4 px-1.5"
                              >
                                {count}
                              </Badge>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function EquipmentCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = useCallback((equipment: ServerEquipment) => {
    addToCart(equipment);
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: equipment.name,
    });
  }, [addToCart, toast]);

  const { data: equipment = [], isLoading: equipmentLoading } = useQuery<ServerEquipment[]>({
    queryKey: ['/api/equipment'],
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<EquipmentCategory[]>({
    queryKey: ['/api/equipment-categories'],
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const brands = useMemo(() => {
    const brandSet = new Set(equipment.map(e => e.brand).filter(Boolean));
    return Array.from(brandSet).sort() as string[];
  }, [equipment]);

  const searchSuggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase();
    const suggestions: Array<{ type: 'brand' | 'product' | 'category'; label: string; value: string }> = [];
    
    brands.filter(b => b.toLowerCase().includes(query)).slice(0, 3).forEach(b => {
      suggestions.push({ type: 'brand', label: b, value: b });
    });
    
    equipment.filter(e => e.name.toLowerCase().includes(query) || e.partNumber.toLowerCase().includes(query))
      .slice(0, 5).forEach(e => {
        suggestions.push({ type: 'product', label: e.name, value: e.name });
      });
    
    return suggestions.slice(0, 8);
  }, [searchQuery, brands, equipment]);

  const handleSuggestionClick = (suggestion: { type: string; label: string; value: string }) => {
    if (suggestion.type === 'brand') {
      setSelectedBrand(suggestion.value);
      setSearchQuery("");
    } else {
      setSearchQuery(suggestion.value);
    }
    setShowSearchSuggestions(false);
  };

  const filteredEquipment = useMemo(() => {
    let result = [...equipment];

    if (selectedCategory !== "all") {
      result = result.filter(e => e.category === selectedCategory);
    }

    if (selectedBrand !== "all") {
      result = result.filter(e => e.brand === selectedBrand);
    }

    if (selectedCondition !== "all") {
      result = result.filter(e => e.condition?.toLowerCase() === selectedCondition);
    }

    if (selectedPriceRange > 0) {
      const range = PRICE_RANGES[selectedPriceRange];
      result = result.filter(e => {
        const price = e.priceDealer || e.priceEndUser || 0;
        return price >= range.min && price < range.max;
      });
    }

    if (inStockOnly) {
      result = result.filter(e => e.stockCount && e.stockCount > 0);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(e => 
        e.name.toLowerCase().includes(query) ||
        e.partNumber.toLowerCase().includes(query) ||
        e.brand?.toLowerCase().includes(query) ||
        e.description?.toLowerCase().includes(query)
      );
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => (a.priceDealer || 0) - (b.priceDealer || 0));
        break;
      case "price-desc":
        result.sort((a, b) => (b.priceDealer || 0) - (a.priceDealer || 0));
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        result.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
      case "stock":
        result.sort((a, b) => (b.stockCount || 0) - (a.stockCount || 0));
        break;
      case "featured":
      default:
        result.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return (a.displayOrder || 0) - (b.displayOrder || 0);
        });
    }

    return result;
  }, [equipment, selectedCategory, selectedBrand, selectedCondition, selectedPriceRange, inStockOnly, searchQuery, sortBy]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedBrand !== "all") count++;
    if (selectedCondition !== "all") count++;
    if (selectedPriceRange > 0) count++;
    if (inStockOnly) count++;
    if (searchQuery) count++;
    return count;
  }, [selectedBrand, selectedCondition, selectedPriceRange, inStockOnly, searchQuery]);

  const clearAllFilters = () => {
    setSelectedBrand("all");
    setSelectedCondition("all");
    setSelectedPriceRange(0);
    setInStockOnly(false);
    setSearchQuery("");
  };

  const isLoading = equipmentLoading || categoriesLoading;

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    equipment.forEach(e => {
      counts[e.category] = (counts[e.category] || 0) + 1;
    });
    return counts;
  }, [equipment]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="border-b border-gray-200 bg-gray-50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/">
                <span className="hover:text-gray-900 cursor-pointer flex items-center gap-1">
                  <Home className="w-3.5 h-3.5" />
                  Trang chủ
                </span>
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">Thiết bị máy chủ & mạng</span>
            </div>
          </div>
        </section>

        {/* Page Header */}
        <section className="border-b border-gray-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900" data-testid="page-title">
                  Thiết Bị Máy Chủ & Mạng
                </h1>
                <p className="text-gray-500 mt-1">
                  Máy chủ Dell, HPE, H3C • Switch Cisco, Juniper, Huawei • Module quang • Load Balancer
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <Package className="w-4 h-4" />
                  <span><strong className="text-gray-900">{equipment.length}</strong> sản phẩm</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span><strong className="text-gray-900">{equipment.filter(e => e.stockCount && e.stockCount > 0).length}</strong> còn hàng</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Horizontal Filter Bar */}
        <section className="border-b border-gray-200 bg-white sticky top-0 z-40 shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px] max-w-md" ref={searchRef}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchSuggestions(true);
                  }}
                  onFocus={() => setShowSearchSuggestions(true)}
                  className="pl-10 pr-10 h-9 bg-white border-gray-300 rounded-md text-sm"
                  data-testid="search-input"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                
                <AnimatePresence>
                  {showSearchSuggestions && searchSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden"
                    >
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors text-gray-700"
                          data-testid={`search-suggestion-${index}`}
                        >
                          {suggestion.type === 'brand' && <Tag className="w-4 h-4 text-gray-400" />}
                          {suggestion.type === 'product' && <Server className="w-4 h-4 text-gray-400" />}
                          <span className="truncate">{suggestion.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <Separator orientation="vertical" className="h-8 hidden sm:block" />
              
              {/* Brand Filter */}
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="w-36 h-9 bg-white border-gray-300 text-sm">
                  <SelectValue placeholder="Thương hiệu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả hãng</SelectItem>
                  {brands.map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Price Filter */}
              <Select value={selectedPriceRange.toString()} onValueChange={(v) => setSelectedPriceRange(parseInt(v))}>
                <SelectTrigger className="w-40 h-9 bg-white border-gray-300 text-sm">
                  <SelectValue placeholder="Mức giá" />
                </SelectTrigger>
                <SelectContent>
                  {PRICE_RANGES.map((range, index) => (
                    <SelectItem key={index} value={index.toString()}>{range.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Condition Filter */}
              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger className="w-32 h-9 bg-white border-gray-300 text-sm">
                  <SelectValue placeholder="Tình trạng" />
                </SelectTrigger>
                <SelectContent>
                  {CONDITIONS.map(cond => (
                    <SelectItem key={cond.value} value={cond.value}>{cond.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* In Stock Toggle */}
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="in-stock"
                  checked={inStockOnly}
                  onCheckedChange={(checked) => setInStockOnly(checked === true)}
                />
                <Label htmlFor="in-stock" className="text-sm text-gray-600 cursor-pointer whitespace-nowrap">
                  Còn hàng
                </Label>
              </div>
              
              <div className="flex-1"></div>
              
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36 h-9 bg-white border-gray-300 text-sm" data-testid="sort-select">
                  <ArrowUpDown className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                  <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Nổi bật</SelectItem>
                  <SelectItem value="price-asc">Giá thấp → cao</SelectItem>
                  <SelectItem value="price-desc">Giá cao → thấp</SelectItem>
                  <SelectItem value="name">Tên A-Z</SelectItem>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="stock">Còn hàng nhiều</SelectItem>
                </SelectContent>
              </Select>
              
              {/* View Toggle */}
              <div className="hidden sm:flex items-center border border-gray-300 rounded-md overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-none h-9 px-3 ${viewMode === "grid" ? "bg-gray-900 text-white" : "text-gray-600"}`}
                  data-testid="grid-view-button"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`rounded-none h-9 px-3 ${viewMode === "list" ? "bg-gray-900 text-white" : "text-gray-600"}`}
                  data-testid="list-view-button"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Active Filters & Results Count */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-500">
                  Hiển thị <strong className="text-gray-900">{filteredEquipment.length}</strong> sản phẩm
                </span>
                
                {activeFiltersCount > 0 && (
                  <>
                    <Separator orientation="vertical" className="h-4" />
                    {selectedBrand !== "all" && (
                      <Badge variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-0.5 bg-gray-100 text-gray-700">
                        {selectedBrand}
                        <button onClick={() => setSelectedBrand("all")} className="ml-1 hover:text-red-500 p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    {selectedCondition !== "all" && (
                      <Badge variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-0.5 bg-gray-100 text-gray-700">
                        {CONDITIONS.find(c => c.value === selectedCondition)?.label}
                        <button onClick={() => setSelectedCondition("all")} className="ml-1 hover:text-red-500 p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    {selectedPriceRange > 0 && (
                      <Badge variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-0.5 bg-gray-100 text-gray-700">
                        {PRICE_RANGES[selectedPriceRange].label}
                        <button onClick={() => setSelectedPriceRange(0)} className="ml-1 hover:text-red-500 p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    {inStockOnly && (
                      <Badge variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-0.5 bg-gray-100 text-gray-700">
                        Còn hàng
                        <button onClick={() => setInStockOnly(false)} className="ml-1 hover:text-red-500 p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    {searchQuery && (
                      <Badge variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-0.5 bg-gray-100 text-gray-700">
                        "{searchQuery}"
                        <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-red-500 p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                  </>
                )}
              </div>
              
              {activeFiltersCount > 0 && (
                <button 
                  onClick={clearAllFilters}
                  className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Xóa bộ lọc
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="flex gap-6">
              {/* Category Sidebar */}
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-32">
                  <CategorySidebar
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    categoryCounts={categoryCounts}
                  />
                  
                  {/* Contact CTA */}
                  <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Cần tư vấn?</p>
                        <p className="text-xs text-gray-500">Liên hệ ngay</p>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm"
                      onClick={() => window.open(ZALO_OA_LINK, '_blank')}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat Zalo
                    </Button>
                  </div>
                </div>
              </aside>

              {/* Products Area */}
              <div className="flex-1 min-w-0">
                {/* Mobile Category Pills */}
                <div className="lg:hidden mb-4 overflow-x-auto pb-2">
                  <div className="flex gap-2 min-w-max">
                    <Button
                      variant={selectedCategory === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory("all")}
                      className={`h-8 px-3 text-xs shrink-0 ${selectedCategory === "all" ? "bg-gray-900 text-white" : "border-gray-300 text-gray-700"}`}
                    >
                      Tất cả
                    </Button>
                    {CATEGORY_STRUCTURE.flatMap(group => group.children).map(cat => {
                      const count = categoryCounts[cat.slug] || 0;
                      if (count === 0) return null;
                      return (
                        <Button
                          key={cat.slug}
                          variant={selectedCategory === cat.slug ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(cat.slug)}
                          className={`h-8 px-3 text-xs shrink-0 ${selectedCategory === cat.slug ? "bg-gray-900 text-white" : "border-gray-300 text-gray-700"}`}
                        >
                          {cat.name}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {isLoading ? (
                  <div className={viewMode === "grid" 
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
                    : "space-y-4"
                  }>
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
                        <div className="w-full h-32 bg-gray-100"></div>
                        <div className="p-3 space-y-2">
                          <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                          <div className="h-5 bg-gray-100 rounded w-1/3"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredEquipment.length === 0 ? (
                  <div className="text-center py-16 bg-gray-50 border border-gray-200 rounded-lg">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      Không tìm thấy sản phẩm
                    </h3>
                    <p className="text-gray-500 mb-4 text-sm">
                      Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                    </p>
                    <Button variant="outline" onClick={clearAllFilters} className="border-gray-300">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Xóa bộ lọc
                    </Button>
                  </div>
                ) : viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4" data-testid="products-grid">
                    {filteredEquipment.map(item => (
                      <ProductCard
                        key={item.id}
                        equipment={item}
                        viewMode="grid"
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3" data-testid="products-list">
                    {filteredEquipment.map(item => (
                      <ProductCard
                        key={item.id}
                        equipment={item}
                        viewMode="list"
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
