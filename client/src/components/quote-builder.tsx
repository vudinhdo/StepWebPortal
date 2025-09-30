import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Network, 
  Zap,
  ArrowRight,
  Mail,
  Phone as PhoneIcon
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Cloud packages with predefined pricing
const cloudPackages = {
  'Cơ Bản': {
    price: 899000,
    cpu: 2,
    ram: 4,
    ssd: 50,
    bandwidth: 500,
    gpu: 'Shared GPU',
    features: ['2 CPU Cores', '4GB RAM', '50GB SSD', '500GB Bandwidth', 'Shared GPU'],
    description: 'Phù hợp cho ứng dụng web đơn giản',
    popular: false
  },
  'Chuyên Nghiệp': {
    price: 1899000,
    cpu: 4,
    ram: 8,
    ssd: 100,
    bandwidth: 1000,
    gpu: 'RTX A2000',
    features: ['4 CPU Cores', '8GB RAM', '100GB SSD', '1TB Bandwidth', 'RTX A2000 GPU'],
    description: 'Tối ưu cho AI/ML và ứng dụng đòi hỏi GPU',
    popular: true
  },
  'Enterprise': {
    price: 3999000,
    cpu: 8,
    ram: 32,
    ssd: 500,
    bandwidth: 5000,
    gpu: 'RTX A5000',
    features: ['8 CPU Cores', '32GB RAM', '500GB SSD', '5TB Bandwidth', 'RTX A5000 GPU'],
    description: 'Giải pháp toàn diện cho doanh nghiệp lớn',
    popular: false
  }
};

// Pricing for additional resources
const componentPricing = {
  cpu: { basePrice: 100000 },
  ram: { basePrice: 80000 },
  ssd: { basePrice: 5000 },
  bandwidth: { basePrice: 8000 }
};

interface QuoteConfig {
  selectedPackage: string;
  productType: string;
  cpu: number;
  ram: number;
  ssd: number;
  gpu: string;
  os: string;
  bandwidth: number;
  period: string;
}


export default function QuoteBuilder() {
  const { toast } = useToast();
  const [config, setConfig] = useState<QuoteConfig>({
    selectedPackage: 'Chuyên Nghiệp',
    productType: 'CLOUD',
    cpu: 4,
    ram: 8,
    ssd: 100,
    gpu: 'RTX A2000',
    os: 'Ubuntu 20.04',
    bandwidth: 1000,
    period: 'monthly'
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState({ email: '', phone: '' });
  const [errors, setErrors] = useState({ email: '', phone: '' });

  const updateConfig = (field: keyof QuoteConfig, value: string | number) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const calculateCost = () => {
    const selectedPkg = cloudPackages[config.selectedPackage as keyof typeof cloudPackages];
    const baseCost = selectedPkg.price;
    
    const additionalCpu = Math.max(0, config.cpu - selectedPkg.cpu);
    const additionalRam = Math.max(0, config.ram - selectedPkg.ram);
    const additionalSsd = Math.max(0, config.ssd - selectedPkg.ssd);
    const additionalBandwidth = Math.max(0, config.bandwidth - selectedPkg.bandwidth);
    
    const cpuCost = additionalCpu * componentPricing.cpu.basePrice;
    const ramCost = additionalRam * componentPricing.ram.basePrice;
    const ssdCost = additionalSsd * componentPricing.ssd.basePrice;
    const bandwidthCost = additionalBandwidth * componentPricing.bandwidth.basePrice;
    
    const subtotal = baseCost + cpuCost + ramCost + ssdCost + bandwidthCost;
    const vat = subtotal * 0.08;
    const total = subtotal + vat;
    
    const multiplier = config.period === 'yearly' ? 10 : config.period === 'quarterly' ? 2.5 : 1;
    
    return { baseCost, cpuCost, ramCost, ssdCost, bandwidthCost, subtotal, vat, total: total * multiplier, multiplier };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VND';
  };

  const validateForm = () => {
    const newErrors = { email: '', phone: '' };
    
    if (!contactInfo.email.trim()) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!contactInfo.phone.trim()) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    } else if (!/^[0-9]{10,11}$/.test(contactInfo.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    
    setErrors(newErrors);
    return !newErrors.email && !newErrors.phone;
  };

  const handleSubmitQuote = () => {
    if (validateForm()) {
      toast({
        title: "Yêu cầu báo giá đã được gửi!",
        description: "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.",
      });
      setIsDialogOpen(false);
      setContactInfo({ email: '', phone: '' });
      setErrors({ email: '', phone: '' });
    }
  };

  const costs = calculateCost();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Package Selection */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Chọn Gói Cloud</h2>
            <p className="text-gray-600 text-sm">Chọn gói phù hợp với nhu cầu của bạn.</p>
          </div>

          {/* Package Cards */}
          <div className="space-y-4">
            {Object.entries(cloudPackages).map(([key, pkg]) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.02 }}
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all relative ${
                  config.selectedPackage === key 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => {
                  setConfig(prev => ({ 
                    ...prev, 
                    selectedPackage: key,
                    cpu: pkg.cpu,
                    ram: pkg.ram,
                    ssd: pkg.ssd,
                    bandwidth: pkg.bandwidth,
                    gpu: pkg.gpu
                  }));
                }}
              >
                {pkg.popular && (
                  <div className="absolute -top-2 left-4 bg-orange-500 text-white px-2 py-1 text-xs rounded-full">
                    Phổ biến nhất
                  </div>
                )}
                <h3 className="font-semibold text-gray-800 flex items-center justify-between">
                  {key}
                  <span className="text-blue-600 font-bold">
                    {new Intl.NumberFormat('vi-VN').format(pkg.price)} VND/tháng
                  </span>
                </h3>
              </motion.div>
            ))}
          </div>

          {/* Payment Period */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Chu kỳ thanh toán</label>
            <Select value={config.period} onValueChange={(value) => updateConfig('period', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Hàng tháng</SelectItem>
                <SelectItem value="quarterly">Hàng quý (Giảm 10%)</SelectItem>
                <SelectItem value="yearly">Hàng năm (Giảm 15%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Middle Column - Configuration */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Cấu Hình Server</h3>
            

            <h4 className="text-md font-semibold text-gray-800 mb-4 text-center">Tùy Chọn Cấu Hình</h4>
            
            {/* CPU Slider */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">CPU</label>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">
                    {config.cpu}
                  </span>
                  <span className="text-gray-500 text-sm">24</span>
                </div>
              </div>
              <Slider
                value={[config.cpu]}
                onValueChange={(value) => updateConfig('cpu', value[0])}
                max={64}
                min={cloudPackages[config.selectedPackage as keyof typeof cloudPackages].cpu}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>1</span>
                <span>6</span>
                <span>12</span>
                <span>18</span>
                <span>24</span>
              </div>
            </div>

            {/* RAM Slider */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">RAM</label>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">
                    {config.ram}
                  </span>
                  <span className="text-gray-500 text-sm">48</span>
                </div>
              </div>
              <Slider
                value={[config.ram]}
                onValueChange={(value) => updateConfig('ram', value[0])}
                max={256}
                min={cloudPackages[config.selectedPackage as keyof typeof cloudPackages].ram}
                step={2}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>1</span>
                <span>12</span>
                <span>24</span>
                <span>36</span>
                <span>48</span>
              </div>
            </div>

            {/* SSD Slider */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">+10GB SSD</label>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">
                    {config.ssd}
                  </span>
                  <span className="text-gray-500 text-sm">100</span>
                </div>
              </div>
              <Slider
                value={[config.ssd]}
                onValueChange={(value) => updateConfig('ssd', value[0])}
                max={2000}
                min={cloudPackages[config.selectedPackage as keyof typeof cloudPackages].ssd}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>1</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
            </div>

            {/* GPU Selection */}
            <div className="space-y-3 mb-6">
              <label className="text-sm font-medium text-gray-700">Loại GPU</label>
              <Select
                value={config.gpu}
                onValueChange={(value) => updateConfig('gpu', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RTX A5000">RTX A5000</SelectItem>
                  <SelectItem value="RTX 4090">RTX 4090</SelectItem>
                  <SelectItem value="Tesla V100">Tesla V100</SelectItem>
                  <SelectItem value="RTX A6000">RTX A6000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* OS Selection */}
            <div className="space-y-3 mb-6">
              <label className="text-sm font-medium text-gray-700">OS</label>
              <Select
                value={config.os}
                onValueChange={(value) => updateConfig('os', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ubuntu 20.04">Ubuntu 20.04</SelectItem>
                  <SelectItem value="Ubuntu 22.04">Ubuntu 22.04</SelectItem>
                  <SelectItem value="Windows Server 2019">Windows Server 2019</SelectItem>
                  <SelectItem value="Windows Server 2022">Windows Server 2022</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bandwidth Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">BĂNG THÔNG (GB/tháng)</label>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">
                    {config.bandwidth} GB
                  </span>
                </div>
              </div>
              <Slider
                value={[config.bandwidth]}
                onValueChange={(value) => updateConfig('bandwidth', value[0])}
                max={10000}
                min={cloudPackages[config.selectedPackage as keyof typeof cloudPackages].bandwidth}
                step={100}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Pricing Summary */}
        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-1">Tóm tắt thông tin đặt hàng</h3>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="space-y-3">
              <div className="border-b border-gray-200 pb-3">
                <h4 className="font-semibold text-gray-800">Gói {config.selectedPackage}</h4>
                <p className="text-sm text-gray-600 italic">
                  {cloudPackages[config.selectedPackage as keyof typeof cloudPackages].description}
                </p>
                <div className="text-right">
                  <span className="font-semibold text-blue-600">
                    {formatCurrency(costs.baseCost)}
                  </span>
                </div>
              </div>

              {/* Configuration Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>» CPU thêm: {Math.max(0, config.cpu - cloudPackages[config.selectedPackage as keyof typeof cloudPackages].cpu)}</span>
                  <span>{formatCurrency(costs.cpuCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>» RAM thêm: {Math.max(0, config.ram - cloudPackages[config.selectedPackage as keyof typeof cloudPackages].ram)} GB</span>
                  <span>{formatCurrency(costs.ramCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>» SSD thêm: {Math.max(0, config.ssd - cloudPackages[config.selectedPackage as keyof typeof cloudPackages].ssd)} GB</span>
                  <span>{formatCurrency(costs.ssdCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>» Băng thông thêm: {Math.max(0, config.bandwidth - cloudPackages[config.selectedPackage as keyof typeof cloudPackages].bandwidth)} GB</span>
                  <span>{formatCurrency(costs.bandwidthCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>» GPU: {config.gpu}</span>
                  <span>Bao gồm</span>
                </div>
                <div className="flex justify-between">
                  <span>» OS: {config.os}</span>
                  <span>Miễn phí</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 space-y-2">
                <div className="flex justify-between">
                  <span>Tổng phí tháng:</span>
                  <span>{formatCurrency(costs.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT @ 8.00%:</span>
                  <span>{formatCurrency(costs.vat)}</span>
                </div>
                {costs.multiplier && costs.multiplier > 1 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá chu kỳ:</span>
                    <span>-{formatCurrency((costs.total / costs.multiplier) * (costs.multiplier - 1))}</span>
                  </div>
                )}
              </div>

              <div className="border-t-2 border-gray-300 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">{formatCurrency(costs.total)}</span>
                </div>
                <div className="text-right text-sm text-gray-600">
                  Tổng phí dịch vụ
                </div>
              </div>

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
                onClick={() => setIsDialogOpen(true)}
                data-testid="button-continue-quote"
              >
                <span>Tiếp tục</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Information Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thông Tin Liên Hệ</DialogTitle>
            <DialogDescription>
              Vui lòng cung cấp thông tin liên hệ để chúng tôi gửi báo giá chi tiết
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@company.com"
                value={contactInfo.email}
                onChange={(e) => {
                  setContactInfo({ ...contactInfo, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                className={errors.email ? 'border-red-500' : ''}
                data-testid="input-quote-email"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4" />
                Số điện thoại <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0987 654 321"
                value={contactInfo.phone}
                onChange={(e) => {
                  setContactInfo({ ...contactInfo, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                className={errors.phone ? 'border-red-500' : ''}
                data-testid="input-quote-phone"
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => {
                setIsDialogOpen(false);
                setErrors({ email: '', phone: '' });
              }}
              data-testid="button-cancel-quote"
            >
              Hủy
            </Button>
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={handleSubmitQuote}
              data-testid="button-submit-quote"
            >
              Gửi Yêu Cầu
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}