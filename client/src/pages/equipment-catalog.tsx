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
  ChevronUp,
  Info,
  Database,
  TrendingUp,
  Sparkles,
  AlertCircle,
  PackageCheck,
  MemoryStick,
  CircuitBoard,
  Disc3,
  Settings2,
  SlidersHorizontal,
  RotateCcw
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
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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

const formatPriceShort = (price: number) => {
  if (price >= 1000000000) {
    return `${(price / 1000000000).toFixed(1)}B`;
  }
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(0)}M`;
  }
  return formatPrice(price);
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
    default:
      return Package;
  }
};

const PRICE_RANGES = [
  { label: "Tất cả mức giá", min: 0, max: Infinity },
  { label: "Dưới 50 triệu", min: 0, max: 50000000 },
  { label: "50 - 100 triệu", min: 50000000, max: 100000000 },
  { label: "100 - 200 triệu", min: 100000000, max: 200000000 },
  { label: "200 - 500 triệu", min: 200000000, max: 500000000 },
  { label: "Trên 500 triệu", min: 500000000, max: Infinity },
];

const CPU_OPTIONS = [
  "Intel Xeon Silver 4310",
  "Intel Xeon Silver 4314",
  "Intel Xeon Gold 5317",
  "Intel Xeon Gold 5318Y",
  "Intel Xeon Gold 6330",
  "Intel Xeon Platinum 8380",
  "AMD EPYC 7302",
  "AMD EPYC 7543",
  "AMD EPYC 9354",
];

const RAM_OPTIONS = [
  "16GB DDR4",
  "32GB DDR4",
  "64GB DDR4",
  "128GB DDR4",
  "256GB DDR4",
  "512GB DDR4",
  "16GB DDR5",
  "32GB DDR5",
  "64GB DDR5",
  "128GB DDR5",
];

const STORAGE_OPTIONS = [
  "480GB SSD SATA",
  "960GB SSD SATA",
  "1.92TB SSD SATA",
  "480GB SSD NVMe",
  "960GB SSD NVMe",
  "1.92TB SSD NVMe",
  "3.84TB SSD NVMe",
  "1.2TB HDD SAS",
  "2.4TB HDD SAS",
  "4TB HDD SAS",
];

const FORM_FACTOR_OPTIONS = [
  "Rack Server 1U",
  "Rack Server 2U",
  "Rack Server 4U",
  "Tower Server",
  "Blade Server",
];

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
        className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 hover:shadow-lg hover:border-primary/30 transition-all"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-40 h-28 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden">
            {equipment.isFeatured && (
              <div className="absolute top-2 left-2 z-10">
                <Badge className="bg-amber-500 text-white text-xs px-1.5 py-0.5">
                  <Star className="w-3 h-3" />
                </Badge>
              </div>
            )}
            <Server className="w-12 h-12 text-slate-400 dark:text-slate-500" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <Badge className={`${conditionBadge.color} text-white text-xs`}>
                    {conditionBadge.label}
                  </Badge>
                  {equipment.stockCount !== null && equipment.stockCount > 0 ? (
                    <span className="text-green-600 text-xs flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Còn hàng
                    </span>
                  ) : (
                    <span className="text-red-500 text-xs">Hết hàng</span>
                  )}
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1" data-testid={`equipment-name-${equipment.id}`}>
                  {equipment.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {equipment.brand} • {equipment.partNumber}
                </p>
              </div>
              
              <div className="text-right shrink-0">
                {discount > 0 && (
                  <span className="text-xs text-gray-400 line-through block">{formatPrice(equipment.priceEndUser)}</span>
                )}
                <div className="text-lg font-bold text-primary" data-testid={`equipment-price-${equipment.id}`}>
                  {formatPrice(equipment.priceDealer)}
                </div>
                {discount > 0 && (
                  <Badge className="bg-red-500 text-white text-xs">-{discount}%</Badge>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400 mb-3">
              {specs.cpu && <span className="flex items-center gap-1"><Cpu className="w-3 h-3 text-blue-500" />{specs.cpu}</span>}
              {specs.ram && <span className="flex items-center gap-1"><MemoryStick className="w-3 h-3 text-green-500" />{specs.ram}</span>}
              {specs.storage && <span className="flex items-center gap-1"><HardDrive className="w-3 h-3 text-orange-500" />{specs.storage}</span>}
            </div>
            
            <div className="flex items-center justify-end gap-2">
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
                <Phone className="w-3 h-3 mr-1" />
                Báo giá
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all group"
    >
      <div className="relative">
        <div className="w-full h-40 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
          <Server className="w-16 h-16 text-slate-400 dark:text-slate-500 group-hover:scale-110 transition-transform" />
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
          <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
            -{discount}%
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{equipment.brand}</p>
          <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 h-12 text-sm" data-testid={`equipment-name-${equipment.id}`}>
            {equipment.name}
          </h3>
        </div>
        
        <div className="space-y-1 mb-3 text-xs text-gray-500 dark:text-gray-400">
          {specs.cpu && (
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-blue-500 shrink-0" />
              <span className="truncate">{specs.cpu}</span>
            </div>
          )}
          {specs.ram && (
            <div className="flex items-center gap-1.5">
              <MemoryStick className="w-3 h-3 text-green-500 shrink-0" />
              <span className="truncate">{specs.ram}</span>
            </div>
          )}
          {specs.storage && (
            <div className="flex items-center gap-1.5">
              <HardDrive className="w-3 h-3 text-orange-500 shrink-0" />
              <span className="truncate">{specs.storage}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            {discount > 0 && (
              <span className="text-xs text-gray-400 line-through block">{formatPrice(equipment.priceEndUser)}</span>
            )}
            <div className="text-lg font-bold text-primary" data-testid={`equipment-price-${equipment.id}`}>
              {formatPrice(equipment.priceDealer)}
            </div>
          </div>
          {equipment.stockCount !== null && equipment.stockCount > 0 ? (
            <span className="text-green-600 text-xs flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Còn {equipment.stockCount}
            </span>
          ) : (
            <span className="text-red-500 text-xs">Hết hàng</span>
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
            <Phone className="w-3 h-3 mr-1" />
            Báo giá
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function EquipmentDetailModal({ equipment, onClose }: { equipment: ServerEquipment | null; onClose: () => void }) {
  if (!equipment) return null;
  
  const specs = getSpecs(equipment);
  const conditionBadge = getConditionBadge(equipment.condition);
  
  const specsList = [
    { icon: Cpu, label: "CPU", value: specs.cpu, color: "text-blue-500" },
    { icon: MemoryStick, label: "RAM", value: specs.ram, color: "text-green-500" },
    { icon: HardDrive, label: "Storage", value: specs.storage, color: "text-orange-500" },
    { icon: Network, label: "Network", value: specs.networkCard, color: "text-purple-500" },
    { icon: CircuitBoard, label: "RAID", value: specs.raidController, color: "text-cyan-500" },
    { icon: Zap, label: "PSU", value: specs.powerSupply, color: "text-yellow-500" },
    { icon: Server, label: "Form Factor", value: specs.formFactor, color: "text-gray-500" },
    { icon: Shield, label: "Warranty", value: specs.warranty, color: "text-emerald-500" },
  ].filter(s => s.value);

  return (
    <Dialog open={!!equipment} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge className={`${conditionBadge.color} text-white`}>{conditionBadge.label}</Badge>
            {equipment.isFeatured && (
              <Badge className="bg-amber-500 text-white">
                <Star className="w-3 h-3 mr-1" />
                Nổi bật
              </Badge>
            )}
          </div>
          <DialogTitle className="text-xl" data-testid="equipment-detail-title">{equipment.name}</DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-sm">
            <span>{equipment.brand}</span>
            <span>•</span>
            <span>{equipment.partNumber}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Giá bán</p>
              <p className="text-2xl font-bold text-primary">{formatPrice(equipment.priceDealer)}</p>
            </div>
            <div className="text-right">
              {equipment.stockCount !== null && equipment.stockCount > 0 ? (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Còn {equipment.stockCount} sản phẩm
                </Badge>
              ) : (
                <Badge variant="outline" className="text-red-500 border-red-500">
                  Hết hàng
                </Badge>
              )}
            </div>
          </div>
          
          {equipment.description && (
            <div>
              <h4 className="font-semibold mb-2">Mô tả</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{equipment.description}</p>
            </div>
          )}
          
          {specsList.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">Thông số kỹ thuật</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {specsList.map((spec, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                    <spec.icon className={`w-5 h-5 ${spec.color} shrink-0`} />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">{spec.label}</p>
                      <p className="text-sm font-medium truncate">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
            <div className="flex-1">
              <p className="text-sm text-gray-500">Liên hệ tư vấn</p>
              <p className="font-semibold">Hotline: 1900 1234</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90" data-testid="request-quote-button">
              <Phone className="w-4 h-4 mr-2" />
              Yêu cầu báo giá
            </Button>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface FilterSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({ title, icon: Icon, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-b border-gray-200 dark:border-slate-700 pb-4">
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:text-primary transition-colors">
        <div className="flex items-center gap-2 font-medium text-sm">
          <Icon className="w-4 h-4" />
          {title}
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
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
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<ServerEquipment | null>(null);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const [selectedCPUs, setSelectedCPUs] = useState<string[]>([]);
  const [selectedRAMs, setSelectedRAMs] = useState<string[]>([]);
  const [selectedStorages, setSelectedStorages] = useState<string[]>([]);
  const [selectedFormFactors, setSelectedFormFactors] = useState<string[]>([]);

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

  const subCategories = useMemo(() => {
    const subCatSet = new Set(equipment.map(e => e.subCategory).filter(Boolean));
    return Array.from(subCatSet).sort() as string[];
  }, [equipment]);

  const availableCPUs = useMemo(() => {
    const cpuSet = new Set<string>();
    equipment.forEach(e => {
      const specs = getSpecs(e);
      if (specs.cpu) cpuSet.add(specs.cpu);
    });
    return Array.from(cpuSet).sort();
  }, [equipment]);

  const availableRAMs = useMemo(() => {
    const ramSet = new Set<string>();
    equipment.forEach(e => {
      const specs = getSpecs(e);
      if (specs.ram) ramSet.add(specs.ram);
    });
    return Array.from(ramSet).sort();
  }, [equipment]);

  const availableStorages = useMemo(() => {
    const storageSet = new Set<string>();
    equipment.forEach(e => {
      const specs = getSpecs(e);
      if (specs.storage) storageSet.add(specs.storage);
    });
    return Array.from(storageSet).sort();
  }, [equipment]);

  const availableFormFactors = useMemo(() => {
    const ffSet = new Set<string>();
    equipment.forEach(e => {
      const specs = getSpecs(e);
      if (specs.formFactor) ffSet.add(specs.formFactor);
    });
    return Array.from(ffSet).sort();
  }, [equipment]);

  const searchSuggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    
    const suggestions: { type: string; label: string; value: string }[] = [];
    const query = searchQuery.toLowerCase();
    
    brands.filter(b => b.toLowerCase().includes(query)).slice(0, 3).forEach(brand => {
      suggestions.push({ type: 'brand', label: `Thương hiệu: ${brand}`, value: brand });
    });
    
    subCategories.filter(s => s.toLowerCase().includes(query)).slice(0, 3).forEach(subCat => {
      suggestions.push({ type: 'subCategory', label: `Loại: ${subCat}`, value: subCat });
    });
    
    equipment.filter(e => 
      e.name.toLowerCase().includes(query) || 
      e.partNumber?.toLowerCase().includes(query)
    ).slice(0, 5).forEach(item => {
      suggestions.push({ type: 'product', label: item.name, value: item.name });
    });
    
    return suggestions.slice(0, 8);
  }, [searchQuery, brands, subCategories, equipment]);

  const handleSuggestionClick = useCallback((suggestion: { type: string; value: string }) => {
    if (suggestion.type === 'brand') {
      setSelectedBrand(suggestion.value);
    } else if (suggestion.type === 'subCategory') {
      setSelectedSubCategory(suggestion.value);
    } else {
      setSearchQuery(suggestion.value);
    }
    setShowSearchSuggestions(false);
  }, []);

  const filteredEquipment = useMemo(() => {
    let result = [...equipment];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(e => 
        e.name.toLowerCase().includes(query) ||
        e.brand?.toLowerCase().includes(query) ||
        e.partNumber?.toLowerCase().includes(query) ||
        e.description?.toLowerCase().includes(query) ||
        e.model?.toLowerCase().includes(query) ||
        e.tags?.some(tag => tag.toLowerCase().includes(query))
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

    if (selectedSubCategory !== "all") {
      result = result.filter(e => e.subCategory === selectedSubCategory);
    }

    if (selectedPriceRange > 0) {
      const range = PRICE_RANGES[selectedPriceRange];
      result = result.filter(e => {
        const price = e.priceDealer || 0;
        return price >= range.min && price < range.max;
      });
    }

    if (inStockOnly) {
      result = result.filter(e => (e.stockCount || 0) > 0);
    }

    if (selectedCPUs.length > 0) {
      result = result.filter(e => {
        const specs = getSpecs(e);
        if (!specs.cpu) return false;
        const cpuLower = specs.cpu.toLowerCase();
        return selectedCPUs.some(cpu => {
          const cpuKeywords = cpu.toLowerCase().split(/[\s,x-]+/).filter(k => k.length > 2);
          return cpuKeywords.every(keyword => cpuLower.includes(keyword));
        });
      });
    }

    if (selectedRAMs.length > 0) {
      result = result.filter(e => {
        const specs = getSpecs(e);
        if (!specs.ram) return false;
        const ramLower = specs.ram.toLowerCase();
        return selectedRAMs.some(ram => {
          const ramKeywords = ram.toLowerCase().split(/[\s,]+/).filter(k => k.length > 1);
          return ramKeywords.some(keyword => ramLower.includes(keyword));
        });
      });
    }

    if (selectedStorages.length > 0) {
      result = result.filter(e => {
        const specs = getSpecs(e);
        if (!specs.storage) return false;
        const storageLower = specs.storage.toLowerCase();
        return selectedStorages.some(storage => {
          const storageKeywords = storage.toLowerCase().split(/[\s,x]+/).filter(k => k.length > 1);
          return storageKeywords.some(keyword => storageLower.includes(keyword));
        });
      });
    }

    if (selectedFormFactors.length > 0) {
      result = result.filter(e => {
        const specs = getSpecs(e);
        if (!specs.formFactor) return false;
        const ffLower = specs.formFactor.toLowerCase();
        return selectedFormFactors.some(ff => ffLower.includes(ff.toLowerCase()) || ff.toLowerCase().includes(ffLower));
      });
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
      case "newest":
        result.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
      case "stock":
        result.sort((a, b) => (b.stockCount || 0) - (a.stockCount || 0));
        break;
    }

    return result;
  }, [equipment, searchQuery, selectedCategory, selectedBrand, selectedCondition, selectedSubCategory, selectedPriceRange, inStockOnly, sortBy, selectedCPUs, selectedRAMs, selectedStorages, selectedFormFactors]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== "all") count++;
    if (selectedBrand !== "all") count++;
    if (selectedCondition !== "all") count++;
    if (selectedSubCategory !== "all") count++;
    if (selectedPriceRange > 0) count++;
    if (inStockOnly) count++;
    if (searchQuery) count++;
    if (selectedCPUs.length > 0) count++;
    if (selectedRAMs.length > 0) count++;
    if (selectedStorages.length > 0) count++;
    if (selectedFormFactors.length > 0) count++;
    return count;
  }, [selectedCategory, selectedBrand, selectedCondition, selectedSubCategory, selectedPriceRange, inStockOnly, searchQuery, selectedCPUs, selectedRAMs, selectedStorages, selectedFormFactors]);

  const clearAllFilters = useCallback(() => {
    setSelectedCategory("all");
    setSelectedBrand("all");
    setSelectedCondition("all");
    setSelectedSubCategory("all");
    setSelectedPriceRange(0);
    setInStockOnly(false);
    setSearchQuery("");
    setSelectedCPUs([]);
    setSelectedRAMs([]);
    setSelectedStorages([]);
    setSelectedFormFactors([]);
  }, []);

  const stats = useMemo(() => ({
    total: equipment.length,
    inStock: equipment.filter(e => (e.stockCount || 0) > 0).length,
    featured: equipment.filter(e => e.isFeatured).length,
    brands: brands.length
  }), [equipment, brands]);

  const isLoading = equipmentLoading || categoriesLoading;

  const FilterSidebar = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Bộ lọc nâng cao
        </h3>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-red-500 hover:text-red-600 h-8 px-2">
            <RotateCcw className="w-3 h-3 mr-1" />
            Xóa ({activeFiltersCount})
          </Button>
        )}
      </div>

      <FilterSection title="Thương hiệu" icon={Tag}>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map(brand => (
            <div key={brand} className="flex items-center gap-2">
              <Checkbox 
                id={`brand-${brand}`}
                checked={selectedBrand === brand}
                onCheckedChange={(checked) => setSelectedBrand(checked ? brand : "all")}
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer flex-1">{brand}</Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="CPU / Bộ xử lý" icon={Cpu}>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {availableCPUs.map(cpu => (
            <div key={cpu} className="flex items-center gap-2">
              <Checkbox 
                id={`cpu-${cpu}`}
                checked={selectedCPUs.includes(cpu)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCPUs([...selectedCPUs, cpu]);
                  } else {
                    setSelectedCPUs(selectedCPUs.filter(c => c !== cpu));
                  }
                }}
              />
              <Label htmlFor={`cpu-${cpu}`} className="text-xs cursor-pointer flex-1 truncate">{cpu}</Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="RAM / Bộ nhớ" icon={MemoryStick}>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {availableRAMs.map(ram => (
            <div key={ram} className="flex items-center gap-2">
              <Checkbox 
                id={`ram-${ram}`}
                checked={selectedRAMs.includes(ram)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedRAMs([...selectedRAMs, ram]);
                  } else {
                    setSelectedRAMs(selectedRAMs.filter(r => r !== ram));
                  }
                }}
              />
              <Label htmlFor={`ram-${ram}`} className="text-xs cursor-pointer flex-1">{ram}</Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Ổ cứng / Storage" icon={HardDrive}>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {availableStorages.map(storage => (
            <div key={storage} className="flex items-center gap-2">
              <Checkbox 
                id={`storage-${storage}`}
                checked={selectedStorages.includes(storage)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedStorages([...selectedStorages, storage]);
                  } else {
                    setSelectedStorages(selectedStorages.filter(s => s !== storage));
                  }
                }}
              />
              <Label htmlFor={`storage-${storage}`} className="text-xs cursor-pointer flex-1 truncate">{storage}</Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Form Factor" icon={Server}>
        <div className="space-y-2">
          {availableFormFactors.map(ff => (
            <div key={ff} className="flex items-center gap-2">
              <Checkbox 
                id={`ff-${ff}`}
                checked={selectedFormFactors.includes(ff)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedFormFactors([...selectedFormFactors, ff]);
                  } else {
                    setSelectedFormFactors(selectedFormFactors.filter(f => f !== ff));
                  }
                }}
              />
              <Label htmlFor={`ff-${ff}`} className="text-sm cursor-pointer flex-1">{ff}</Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Mức giá" icon={Tag}>
        <div className="space-y-2">
          {PRICE_RANGES.map((range, index) => (
            <div key={index} className="flex items-center gap-2">
              <Checkbox 
                id={`price-${index}`}
                checked={selectedPriceRange === index}
                onCheckedChange={(checked) => setSelectedPriceRange(checked ? index : 0)}
              />
              <Label htmlFor={`price-${index}`} className="text-sm cursor-pointer flex-1">{range.label}</Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Tình trạng" icon={PackageCheck}>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox 
              id="condition-new"
              checked={selectedCondition === "new"}
              onCheckedChange={(checked) => setSelectedCondition(checked ? "new" : "all")}
            />
            <Label htmlFor="condition-new" className="text-sm cursor-pointer flex-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Mới 100%
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox 
              id="condition-refurbished"
              checked={selectedCondition === "refurbished"}
              onCheckedChange={(checked) => setSelectedCondition(checked ? "refurbished" : "all")}
            />
            <Label htmlFor="condition-refurbished" className="text-sm cursor-pointer flex-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Đã qua sử dụng
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox 
              id="condition-used"
              checked={selectedCondition === "used"}
              onCheckedChange={(checked) => setSelectedCondition(checked ? "used" : "all")}
            />
            <Label htmlFor="condition-used" className="text-sm cursor-pointer flex-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              Cũ
            </Label>
          </div>
        </div>
      </FilterSection>

      <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <Checkbox 
            id="in-stock-filter"
            checked={inStockOnly}
            onCheckedChange={(checked) => setInStockOnly(checked === true)}
          />
          <Label htmlFor="in-stock-filter" className="text-sm cursor-pointer flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Chỉ hiện hàng còn
          </Label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900">
      <Header />
      
      <main className="flex-1">
        {/* Compact Header with Horizontal Category Menu */}
        <section className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-40">
          <div className="container mx-auto px-4">
            {/* Top bar with search and actions */}
            <div className="py-3 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap hidden sm:block" data-testid="page-title">
                  Thiết bị máy chủ
                </h1>
                <span className="hidden sm:block text-gray-300 dark:text-slate-600">|</span>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="font-medium text-primary">{filteredEquipment.length}</span> sản phẩm
                  {stats.inStock > 0 && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span className="text-green-600">{stats.inStock} còn hàng</span>
                    </>
                  )}
                </div>
              </div>
              
              {/* Search */}
              <div className="relative flex-1 lg:max-w-md" ref={searchRef}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm sản phẩm, mã, thương hiệu..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchSuggestions(true);
                  }}
                  onFocus={() => setShowSearchSuggestions(true)}
                  className="pl-9 pr-9 h-9"
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
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors"
                          data-testid={`search-suggestion-${index}`}
                        >
                          {suggestion.type === 'brand' && <Tag className="w-4 h-4 text-blue-500" />}
                          {suggestion.type === 'subCategory' && <Package className="w-4 h-4 text-green-500" />}
                          {suggestion.type === 'product' && <Server className="w-4 h-4 text-gray-400" />}
                          <span className="truncate">{suggestion.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-36 h-9" data-testid="sort-select">
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
                
                <div className="hidden sm:flex items-center border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none h-9"
                    data-testid="grid-view-button"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none h-9"
                    data-testid="list-view-button"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden h-9 relative"
                  data-testid="mobile-filter-toggle"
                >
                  <Filter className="w-4 h-4" />
                  {activeFiltersCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-primary text-white text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
            
            {/* Horizontal Category Menu */}
            <div className="pb-3 -mx-4 px-4 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-2 min-w-max">
                <Button
                  variant={selectedCategory === "all" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                  className="h-8 px-3 text-sm shrink-0"
                  data-testid="category-all"
                >
                  Tất cả
                  <Badge variant="secondary" className="ml-1.5 text-xs px-1.5 py-0">{equipment.length}</Badge>
                </Button>
                {categories.map(cat => {
                  const IconComponent = getCategoryIcon(cat.slug);
                  const count = equipment.filter(e => e.category === cat.slug).length;
                  return (
                    <Button
                      key={cat.id}
                      variant={selectedCategory === cat.slug ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedCategory(cat.slug)}
                      className="h-8 px-3 text-sm shrink-0"
                      data-testid={`category-${cat.slug}`}
                    >
                      <IconComponent className="w-3.5 h-3.5 mr-1.5" />
                      {cat.name}
                      <Badge variant="secondary" className="ml-1.5 text-xs px-1.5 py-0">{count}</Badge>
                    </Button>
                  );
                })}
              </div>
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
                className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-slate-800 z-50 lg:hidden shadow-xl overflow-y-auto"
              >
                <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 p-4 flex items-center justify-between">
                  <h2 className="font-bold text-lg">Bộ lọc</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <div className="p-4">
                  <FilterSidebar />
                </div>
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
                <div className="sticky top-32 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4">
                  <FilterSidebar />
                </div>
              </aside>

              {/* Products Area */}
              <div className="flex-1 min-w-0">
                {/* Active Filters */}
                {activeFiltersCount > 0 && (
                  <div className="flex items-center gap-2 flex-wrap mb-4 p-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                    <span className="text-sm text-gray-500">Đang lọc:</span>
                    {selectedCategory !== "all" && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {categories.find(c => c.slug === selectedCategory)?.name}
                        <button onClick={() => setSelectedCategory("all")} className="ml-1 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    {selectedBrand !== "all" && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {selectedBrand}
                        <button onClick={() => setSelectedBrand("all")} className="ml-1 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    {selectedCPUs.map(cpu => (
                      <Badge key={cpu} variant="secondary" className="flex items-center gap-1">
                        <Cpu className="w-3 h-3" />
                        {cpu.substring(0, 20)}...
                        <button onClick={() => setSelectedCPUs(selectedCPUs.filter(c => c !== cpu))} className="ml-1 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                    {selectedRAMs.map(ram => (
                      <Badge key={ram} variant="secondary" className="flex items-center gap-1">
                        <MemoryStick className="w-3 h-3" />
                        {ram}
                        <button onClick={() => setSelectedRAMs(selectedRAMs.filter(r => r !== ram))} className="ml-1 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                    {selectedStorages.map(storage => (
                      <Badge key={storage} variant="secondary" className="flex items-center gap-1">
                        <HardDrive className="w-3 h-3" />
                        {storage.substring(0, 15)}...
                        <button onClick={() => setSelectedStorages(selectedStorages.filter(s => s !== storage))} className="ml-1 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                    {selectedFormFactors.map(ff => (
                      <Badge key={ff} variant="secondary" className="flex items-center gap-1">
                        {ff}
                        <button onClick={() => setSelectedFormFactors(selectedFormFactors.filter(f => f !== ff))} className="ml-1 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                    {selectedCondition !== "all" && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {selectedCondition === "new" ? "Mới 100%" : selectedCondition === "refurbished" ? "Đã qua sử dụng" : "Cũ"}
                        <button onClick={() => setSelectedCondition("all")} className="ml-1 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    {selectedPriceRange > 0 && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {PRICE_RANGES[selectedPriceRange].label}
                        <button onClick={() => setSelectedPriceRange(0)} className="ml-1 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    {inStockOnly && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Còn hàng
                        <button onClick={() => setInStockOnly(false)} className="ml-1 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    {searchQuery && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        "{searchQuery}"
                        <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-red-500 hover:text-red-600 ml-auto"
                      data-testid="clear-filters"
                    >
                      Xóa tất cả
                    </Button>
                  </div>
                )}

                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden animate-pulse">
                        <div className="w-full h-40 bg-gray-200 dark:bg-slate-700"></div>
                        <div className="p-4 space-y-3">
                          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
                          <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-1/3"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredEquipment.length === 0 ? (
                  <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
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
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <EquipmentDetailModal
        equipment={selectedEquipment}
        onClose={() => setSelectedEquipment(null)}
      />
    </div>
  );
}
