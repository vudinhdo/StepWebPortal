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
  Star,
  Zap,
  Shield,
  Network,
  X,
  ChevronDown,
  ChevronUp,
  Database,
  TrendingUp,
  Sparkles,
  MemoryStick,
  RotateCcw,
  Cable,
  Wrench,
  Scale,
  Box,
  Layers,
  ArrowUpDown,
  SlidersHorizontal,
  Home,
  Eye,
  MessageCircle,
  Flame,
  Award,
  Clock
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
  { label: "Tất cả", min: 0, max: Infinity },
  { label: "< 50tr", min: 0, max: 50000000 },
  { label: "50 - 100tr", min: 50000000, max: 100000000 },
  { label: "100 - 300tr", min: 100000000, max: 300000000 },
  { label: "300 - 500tr", min: 300000000, max: 500000000 },
  { label: "> 500tr", min: 500000000, max: Infinity },
];

const getSpecs = (equipment: ServerEquipment): EquipmentSpecs => {
  if (!equipment.specs) return {};
  if (typeof equipment.specs === 'object') {
    return equipment.specs as EquipmentSpecs;
  }
  return {};
};

// Modern Product Card Component
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
  
  const handleZaloQuote = (e: React.MouseEvent) => {
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
        className="group bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-4 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Image/Icon Area */}
          <div className="relative w-full md:w-44 h-32 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
            {equipment.isFeatured && (
              <div className="absolute top-2 left-2 z-10">
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] px-2 py-0.5 shadow-lg">
                  <Flame className="w-3 h-3 mr-1" />
                  Hot
                </Badge>
              </div>
            )}
            {discount > 0 && (
              <Badge className="absolute top-2 right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5">
                -{discount}%
              </Badge>
            )}
            <CategoryIcon className="w-14 h-14 text-slate-300 dark:text-slate-500 group-hover:scale-110 transition-transform" />
          </div>
          
          {/* Content Area */}
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <Badge className={`${conditionInfo.color} text-white text-[10px] px-2 py-0.5`}>
                    {conditionInfo.label}
                  </Badge>
                  <span className="text-xs text-gray-400">{equipment.brand}</span>
                  {equipment.stockCount !== null && equipment.stockCount > 0 ? (
                    <span className="text-emerald-600 text-xs flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Còn {equipment.stockCount}
                    </span>
                  ) : (
                    <span className="text-red-500 text-xs">Hết hàng</span>
                  )}
                </div>
                <Link href={`/thiet-bi-may-chu/${equipment.id}`}>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1 hover:text-primary transition-colors cursor-pointer" data-testid={`equipment-name-${equipment.id}`}>
                    {equipment.name}
                  </h3>
                </Link>
                <p className="text-xs text-gray-400 mt-0.5">{equipment.partNumber}</p>
              </div>
              
              {/* Price */}
              <div className="text-right shrink-0">
                {discount > 0 && (
                  <span className="text-xs text-gray-400 line-through block">{formatPriceCompact(equipment.priceEndUser!)}</span>
                )}
                <div className="text-lg font-bold text-primary" data-testid={`equipment-price-${equipment.id}`}>
                  {formatPriceCompact(equipment.priceDealer || 0)}
                </div>
              </div>
            </div>
            
            {/* Specs */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-500 dark:text-gray-400 mb-3 flex-1">
              {specs.cpu && (
                <span className="flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-blue-500" />
                  <span className="truncate max-w-[150px]">{specs.cpu}</span>
                </span>
              )}
              {specs.ram && (
                <span className="flex items-center gap-1">
                  <MemoryStick className="w-3 h-3 text-green-500" />
                  {specs.ram}
                </span>
              )}
              {specs.storage && (
                <span className="flex items-center gap-1">
                  <HardDrive className="w-3 h-3 text-orange-500" />
                  <span className="truncate max-w-[120px]">{specs.storage}</span>
                </span>
              )}
              {specs.networkCard && (
                <span className="flex items-center gap-1">
                  <Network className="w-3 h-3 text-purple-500" />
                  <span className="truncate max-w-[150px]">{specs.networkCard}</span>
                </span>
              )}
            </div>
            
            {/* Actions */}
            <div className="flex items-center justify-end gap-2 mt-auto">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleZaloQuote}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs h-8"
                data-testid={`zalo-quote-${equipment.id}`}
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1" />
                Báo giá
              </Button>
              <Link href={`/thiet-bi-may-chu/${equipment.id}`}>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs h-8"
                  data-testid={`view-details-${equipment.id}`}
                >
                  <Eye className="w-3.5 h-3.5 mr-1" />
                  Chi tiết
                </Button>
              </Link>
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-xs h-8"
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
      whileHover={{ y: -4 }}
      className="group bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300"
    >
      {/* Image Area */}
      <div className="relative">
        <div className="w-full h-36 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
          <CategoryIcon className="w-14 h-14 text-slate-300 dark:text-slate-500 group-hover:scale-110 transition-transform" />
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {equipment.isFeatured && (
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] px-2 py-0.5 shadow-lg">
              <Flame className="w-3 h-3 mr-1" />
              Hot
            </Badge>
          )}
          <Badge className={`${conditionInfo.color} text-white text-[10px] px-2 py-0.5`}>
            {conditionInfo.label}
          </Badge>
        </div>
        
        {discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 font-bold">
            -{discount}%
          </Badge>
        )}
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Link href={`/thiet-bi-may-chu/${equipment.id}`}>
            <Button size="sm" variant="secondary" className="shadow-lg text-xs">
              <Eye className="w-3.5 h-3.5 mr-1" />
              Xem chi tiết
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Brand & Stock */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">{equipment.brand}</span>
          {equipment.stockCount !== null && equipment.stockCount > 0 ? (
            <span className="text-emerald-600 text-[11px] flex items-center gap-0.5">
              <CheckCircle className="w-3 h-3" />
              Còn {equipment.stockCount}
            </span>
          ) : (
            <span className="text-red-500 text-[11px]">Hết hàng</span>
          )}
        </div>
        
        {/* Name */}
        <Link href={`/thiet-bi-may-chu/${equipment.id}`}>
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 h-11 text-sm hover:text-primary transition-colors cursor-pointer" data-testid={`equipment-name-${equipment.id}`}>
            {equipment.name}
          </h3>
        </Link>
        
        {/* Specs */}
        <div className="space-y-1.5 mt-3 mb-3">
          {specs.cpu && (
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
              <Cpu className="w-3 h-3 text-blue-500 shrink-0" />
              <span className="truncate">{specs.cpu}</span>
            </div>
          )}
          {specs.ram && (
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
              <MemoryStick className="w-3 h-3 text-green-500 shrink-0" />
              <span className="truncate">{specs.ram}</span>
            </div>
          )}
          {(specs.storage || specs.networkCard) && (
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
              {specs.storage ? (
                <>
                  <HardDrive className="w-3 h-3 text-orange-500 shrink-0" />
                  <span className="truncate">{specs.storage}</span>
                </>
              ) : (
                <>
                  <Network className="w-3 h-3 text-purple-500 shrink-0" />
                  <span className="truncate">{specs.networkCard}</span>
                </>
              )}
            </div>
          )}
        </div>
        
        {/* Price */}
        <div className="flex items-end justify-between mb-3">
          <div>
            {discount > 0 && (
              <span className="text-xs text-gray-400 line-through block">{formatPriceCompact(equipment.priceEndUser!)}</span>
            )}
            <div className="text-lg font-bold text-primary" data-testid={`equipment-price-${equipment.id}`}>
              {formatPriceCompact(equipment.priceDealer || 0)}
            </div>
          </div>
          {specs.warranty && (
            <span className="text-[10px] text-gray-400 flex items-center gap-1">
              <Shield className="w-3 h-3" />
              {specs.warranty}
            </span>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-1.5">
          <Button 
            variant="outline" 
            size="sm"
            className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-[11px] px-2 h-8"
            onClick={handleZaloQuote}
            data-testid={`zalo-quote-${equipment.id}`}
          >
            <MessageCircle className="w-3 h-3 mr-0.5" />
            Báo giá
          </Button>
          <Link href={`/thiet-bi-may-chu/${equipment.id}`} className="contents">
            <Button 
              variant="outline" 
              size="sm"
              className="text-[11px] px-2 h-8"
              data-testid={`view-details-${equipment.id}`}
            >
              <Eye className="w-3 h-3 mr-0.5" />
              Chi tiết
            </Button>
          </Link>
          <Button 
            size="sm" 
            className="bg-primary hover:bg-primary/90 text-[11px] px-2 h-8"
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

// Filter Section Component
interface FilterSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: number;
}

function FilterSection({ title, icon: Icon, children, defaultOpen = true, badge }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-b border-gray-100 dark:border-slate-700 pb-4">
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:text-primary transition-colors group">
        <div className="flex items-center gap-2 font-medium text-sm">
          <Icon className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
          {title}
          {badge !== undefined && badge > 0 && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary">
              {badge}
            </Badge>
          )}
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
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
  const [showFilters, setShowFilters] = useState(false);
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

  // Search suggestions
  const searchSuggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase();
    const suggestions: Array<{ type: 'brand' | 'product' | 'category'; label: string; value: string }> = [];
    
    // Brand suggestions
    brands.filter(b => b.toLowerCase().includes(query)).slice(0, 3).forEach(b => {
      suggestions.push({ type: 'brand', label: b, value: b });
    });
    
    // Product suggestions
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

  // Filter and sort equipment
  const filteredEquipment = useMemo(() => {
    let result = [...equipment];

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter(e => e.category === selectedCategory);
    }

    // Brand filter
    if (selectedBrand !== "all") {
      result = result.filter(e => e.brand === selectedBrand);
    }

    // Condition filter
    if (selectedCondition !== "all") {
      result = result.filter(e => e.condition?.toLowerCase() === selectedCondition);
    }

    // Price range filter
    if (selectedPriceRange > 0) {
      const range = PRICE_RANGES[selectedPriceRange];
      result = result.filter(e => {
        const price = e.priceDealer || e.priceEndUser || 0;
        return price >= range.min && price < range.max;
      });
    }

    // In stock filter
    if (inStockOnly) {
      result = result.filter(e => e.stockCount && e.stockCount > 0);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(e => 
        e.name.toLowerCase().includes(query) ||
        e.partNumber.toLowerCase().includes(query) ||
        e.brand?.toLowerCase().includes(query) ||
        e.description?.toLowerCase().includes(query)
      );
    }

    // Sorting
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

  // Stats
  const stats = useMemo(() => ({
    total: equipment.length,
    inStock: equipment.filter(e => e.stockCount && e.stockCount > 0).length,
    featured: equipment.filter(e => e.isFeatured).length,
  }), [equipment]);

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== "all") count++;
    if (selectedBrand !== "all") count++;
    if (selectedCondition !== "all") count++;
    if (selectedPriceRange > 0) count++;
    if (inStockOnly) count++;
    if (searchQuery) count++;
    return count;
  }, [selectedCategory, selectedBrand, selectedCondition, selectedPriceRange, inStockOnly, searchQuery]);

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedBrand("all");
    setSelectedCondition("all");
    setSelectedPriceRange(0);
    setInStockOnly(false);
    setSearchQuery("");
  };

  const isLoading = equipmentLoading || categoriesLoading;

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    equipment.forEach(e => {
      counts[e.category] = (counts[e.category] || 0) + 1;
    });
    return counts;
  }, [equipment]);

  // Filter Sidebar Content
  const FilterSidebar = () => (
    <div className="space-y-4">
      {/* Quick Filters */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Checkbox 
            id="in-stock-filter"
            checked={inStockOnly}
            onCheckedChange={(checked) => setInStockOnly(checked === true)}
          />
          <Label htmlFor="in-stock-filter" className="text-sm cursor-pointer flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            Chỉ hiện hàng còn
          </Label>
        </div>
      </div>
      
      <Separator />
      
      {/* Brands */}
      <FilterSection title="Thương hiệu" icon={Award} badge={selectedBrand !== "all" ? 1 : undefined}>
        <ScrollArea className="h-48">
          <div className="space-y-2 pr-3">
            <div 
              className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${selectedBrand === "all" ? "bg-primary/10 text-primary" : "hover:bg-gray-100 dark:hover:bg-slate-700"}`}
              onClick={() => setSelectedBrand("all")}
            >
              <span className="text-sm">Tất cả thương hiệu</span>
            </div>
            {brands.map(brand => (
              <div 
                key={brand}
                className={`flex items-center justify-between px-2 py-1.5 rounded cursor-pointer transition-colors ${selectedBrand === brand ? "bg-primary/10 text-primary" : "hover:bg-gray-100 dark:hover:bg-slate-700"}`}
                onClick={() => setSelectedBrand(brand)}
              >
                <span className="text-sm">{brand}</span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                  {equipment.filter(e => e.brand === brand).length}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </FilterSection>
      
      {/* Price Range */}
      <FilterSection title="Mức giá" icon={Tag} badge={selectedPriceRange > 0 ? 1 : undefined}>
        <div className="space-y-2">
          {PRICE_RANGES.map((range, index) => (
            <div 
              key={index}
              className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${selectedPriceRange === index ? "bg-primary/10 text-primary" : "hover:bg-gray-100 dark:hover:bg-slate-700"}`}
              onClick={() => setSelectedPriceRange(index)}
            >
              <span className="text-sm">{range.label}</span>
            </div>
          ))}
        </div>
      </FilterSection>
      
      {/* Condition */}
      <FilterSection title="Tình trạng" icon={Sparkles} badge={selectedCondition !== "all" ? 1 : undefined}>
        <div className="space-y-2">
          <div 
            className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${selectedCondition === "all" ? "bg-primary/10 text-primary" : "hover:bg-gray-100 dark:hover:bg-slate-700"}`}
            onClick={() => setSelectedCondition("all")}
          >
            <span className="text-sm">Tất cả</span>
          </div>
          <div 
            className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${selectedCondition === "new" ? "bg-primary/10 text-primary" : "hover:bg-gray-100 dark:hover:bg-slate-700"}`}
            onClick={() => setSelectedCondition("new")}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-sm">Mới 100%</span>
          </div>
          <div 
            className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${selectedCondition === "refurbished" ? "bg-primary/10 text-primary" : "hover:bg-gray-100 dark:hover:bg-slate-700"}`}
            onClick={() => setSelectedCondition("refurbished")}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="text-sm">Like New (Refurbished)</span>
          </div>
          <div 
            className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition-colors ${selectedCondition === "used" ? "bg-primary/10 text-primary" : "hover:bg-gray-100 dark:hover:bg-slate-700"}`}
            onClick={() => setSelectedCondition("used")}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="text-sm">Đã qua sử dụng</span>
          </div>
        </div>
      </FilterSection>

      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Xóa tất cả bộ lọc
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-10 lg:py-14">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <Link href="/">
                <span className="hover:text-white cursor-pointer flex items-center gap-1">
                  <Home className="w-3.5 h-3.5" />
                  Trang chủ
                </span>
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">Thiết bị máy chủ & mạng</span>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-3" data-testid="page-title">
                  Thiết Bị Máy Chủ & Mạng
                </h1>
                <p className="text-slate-300 text-lg max-w-2xl">
                  Máy chủ Dell, HPE, H3C, ASUS • Switch Cisco, Juniper, Huawei • Module quang • Load Balancer
                </p>
              </div>
              
              {/* Stats */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{stats.total}</div>
                  <div className="text-xs text-slate-400">Sản phẩm</div>
                </div>
                <div className="w-px h-10 bg-slate-700"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">{stats.inStock}</div>
                  <div className="text-xs text-slate-400">Còn hàng</div>
                </div>
                <div className="w-px h-10 bg-slate-700"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-400">{stats.featured}</div>
                  <div className="text-xs text-slate-400">Nổi bật</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Bar */}
        <section className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-40 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="py-3 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-2 min-w-max">
                <Button
                  variant={selectedCategory === "all" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                  className="h-9 px-4 text-sm shrink-0 rounded-full"
                  data-testid="category-all"
                >
                  <Package className="w-4 h-4 mr-1.5" />
                  Tất cả
                  <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5 py-0 h-5 bg-white/20">{equipment.length}</Badge>
                </Button>
                {categories.map(cat => {
                  const IconComponent = getCategoryIcon(cat.slug);
                  const count = categoryCounts[cat.slug] || 0;
                  if (count === 0) return null;
                  return (
                    <Button
                      key={cat.id}
                      variant={selectedCategory === cat.slug ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedCategory(cat.slug)}
                      className="h-9 px-4 text-sm shrink-0 rounded-full"
                      data-testid={`category-${cat.slug}`}
                    >
                      <IconComponent className="w-4 h-4 mr-1.5" />
                      {cat.name}
                      <Badge variant="secondary" className="ml-1.5 text-[10px] px-1.5 py-0 h-5">{count}</Badge>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Search and Controls */}
        <section className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
              {/* Search */}
              <div className="relative flex-1 lg:max-w-lg" ref={searchRef}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm theo tên, mã sản phẩm, thương hiệu..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchSuggestions(true);
                  }}
                  onFocus={() => setShowSearchSuggestions(true)}
                  className="pl-10 pr-10 h-11 bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-slate-600 rounded-lg"
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
                      className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-50 overflow-hidden"
                    >
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-3 transition-colors"
                          data-testid={`search-suggestion-${index}`}
                        >
                          {suggestion.type === 'brand' && <Tag className="w-4 h-4 text-blue-500" />}
                          {suggestion.type === 'product' && <Server className="w-4 h-4 text-gray-400" />}
                          <span className="truncate">{suggestion.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Controls */}
              <div className="flex items-center gap-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-44 h-11 bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-slate-600 rounded-lg" data-testid="sort-select">
                    <ArrowUpDown className="w-4 h-4 mr-2 text-gray-400" />
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
                
                <div className="hidden sm:flex items-center border border-gray-200 dark:border-slate-600 rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none h-11 px-3"
                    data-testid="grid-view-button"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-none h-11 px-3"
                    data-testid="list-view-button"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden h-11 px-4 relative"
                  data-testid="mobile-filter-toggle"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Bộ lọc
                  {activeFiltersCount > 0 && (
                    <Badge className="absolute -top-1.5 -right-1.5 w-5 h-5 p-0 flex items-center justify-center bg-primary text-white text-[10px]">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
            
            {/* Results Count */}
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
              <span>
                Hiển thị <strong className="text-gray-900 dark:text-white">{filteredEquipment.length}</strong> trong tổng số {equipment.length} sản phẩm
              </span>
              {activeFiltersCount > 0 && (
                <button 
                  onClick={clearAllFilters}
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Xóa bộ lọc ({activeFiltersCount})
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Mobile Filters Slide Panel */}
        <AnimatePresence>
          {showFilters && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                onClick={() => setShowFilters(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-slate-800 z-50 lg:hidden shadow-xl"
              >
                <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 p-4 flex items-center justify-between">
                  <h2 className="font-bold text-lg flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Bộ lọc
                  </h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <ScrollArea className="h-[calc(100vh-60px)]">
                  <div className="p-4">
                    <FilterSidebar />
                  </div>
                </ScrollArea>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="flex gap-6">
              {/* Desktop Filter Sidebar */}
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-28 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 shadow-sm">
                  <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Bộ lọc
                  </h3>
                  <FilterSidebar />
                </div>
              </aside>

              {/* Products Area */}
              <div className="flex-1 min-w-0">
                {/* Active Filters */}
                {activeFiltersCount > 0 && (
                  <div className="flex items-center gap-2 flex-wrap mb-4 p-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
                    <span className="text-sm text-gray-500">Đang lọc:</span>
                    {selectedCategory !== "all" && (
                      <Badge variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1">
                        {categories.find(c => c.slug === selectedCategory)?.name}
                        <button onClick={() => setSelectedCategory("all")} className="ml-1 hover:text-red-500 p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    {selectedBrand !== "all" && (
                      <Badge variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1">
                        {selectedBrand}
                        <button onClick={() => setSelectedBrand("all")} className="ml-1 hover:text-red-500 p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    {selectedCondition !== "all" && (
                      <Badge variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1">
                        {selectedCondition === "new" ? "Mới 100%" : selectedCondition === "refurbished" ? "Like New" : "Đã qua SD"}
                        <button onClick={() => setSelectedCondition("all")} className="ml-1 hover:text-red-500 p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    {selectedPriceRange > 0 && (
                      <Badge variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1">
                        {PRICE_RANGES[selectedPriceRange].label}
                        <button onClick={() => setSelectedPriceRange(0)} className="ml-1 hover:text-red-500 p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    {inStockOnly && (
                      <Badge variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1">
                        Còn hàng
                        <button onClick={() => setInStockOnly(false)} className="ml-1 hover:text-red-500 p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    {searchQuery && (
                      <Badge variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1">
                        "{searchQuery}"
                        <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-red-500 p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                  </div>
                )}

                {isLoading ? (
                  <div className={viewMode === "grid" 
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                    : "space-y-4"
                  }>
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden animate-pulse">
                        <div className="w-full h-36 bg-gray-200 dark:bg-slate-700"></div>
                        <div className="p-4 space-y-3">
                          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
                          <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-1/3"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredEquipment.length === 0 ? (
                  <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
                    <Package className="w-16 h-16 text-gray-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                      Không tìm thấy sản phẩm
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                    </p>
                    <Button variant="outline" onClick={clearAllFilters}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Xóa bộ lọc
                    </Button>
                  </div>
                ) : viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" data-testid="products-grid">
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
                  <div className="space-y-4" data-testid="products-list">
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

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Cần tư vấn sản phẩm?</h3>
                  <p className="text-sm text-gray-500">Liên hệ hotline hoặc Zalo để được hỗ trợ nhanh nhất</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.open(ZALO_OA_LINK, '_blank')}
                  className="border-blue-500 text-blue-600 hover:bg-blue-50"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat Zalo
                </Button>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Phone className="w-5 h-5 mr-2" />
                  1900 1234
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
