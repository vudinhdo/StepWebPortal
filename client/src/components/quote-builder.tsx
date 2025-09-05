import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Network, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

// Pricing configuration
const componentPricing = {
  cpu: { basePrice: 60000 },
  ram: { basePrice: 60000 },
  ssd: { basePrice: 3000 },
  bandwidth: { basePrice: 50000 }, // Giá cho mỗi GB băng thông
  gpu: { basePrice: 6000000 },
  cloudGpuA: { basePrice: 460000 }
};

interface QuoteConfig {
  productType: string;
  cpu: number;
  ram: number;
  ssd: number;
  gpu: string;
  os: string;
  bandwidth: number;
  hostname: string;
  rootPassword: string;
}

const productTemplates = {
  'CLOUD': {
    cpu: 2,
    ram: 4,
    ssd: 50,
    gpu: 'RTX A5000',
    os: 'Ubuntu 20.04',
    bandwidth: 1,
    basePrice: 460000,
    description: 'Cloud Server với GPU'
  }
};

export default function QuoteBuilder() {
  const [selectedProduct, setSelectedProduct] = useState('CLOUD');
  const [config, setConfig] = useState<QuoteConfig>({
    productType: 'CLOUD',
    cpu: 1,
    ram: 1,
    ssd: 1,
    gpu: 'RTX A5000',
    os: 'Ubuntu 20.04',
    bandwidth: 1,
    hostname: 'servername.example.com',
    rootPassword: ''
  });

  const updateConfig = (field: keyof QuoteConfig, value: string | number) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const calculateCost = () => {
    const template = productTemplates[selectedProduct as keyof typeof productTemplates];
    const baseCost = template.basePrice;
    
    const cpuCost = config.cpu * componentPricing.cpu.basePrice;
    const ramCost = config.ram * componentPricing.ram.basePrice;
    const ssdCost = config.ssd * componentPricing.ssd.basePrice;
    const bandwidthCost = config.bandwidth * componentPricing.bandwidth.basePrice;
    
    const subtotal = baseCost + cpuCost + ramCost + ssdCost + bandwidthCost;
    const vat = subtotal * 0.08;
    const total = subtotal + vat;
    
    return { baseCost, cpuCost, ramCost, ssdCost, bandwidthCost, subtotal, vat, total };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VND';
  };

  const costs = calculateCost();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Product Selection */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Tùy chọn đơn hàng</h2>
            <p className="text-gray-600 text-sm">Tùy chỉnh các lựa chọn của bạn trước khi thanh toán.</p>
          </div>

          {/* Product Cards */}
          <div className="space-y-4">
            {Object.entries(productTemplates).map(([key, template]) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.02 }}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedProduct === key 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => {
                  setSelectedProduct(key);
                  setConfig(prev => ({ ...prev, productType: key }));
                }}
              >
                <h3 className="font-semibold text-gray-800">{key}</h3>
                <div className="text-sm text-gray-600 mt-1 space-y-1">
                  <div>CPU: {template.cpu} CORE</div>
                  <div>RAM: {template.ram} GB</div>
                  <div>DISK: {template.ssd}GB</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Payment Period */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Chọn chu kỳ thanh toán</label>
            <Select defaultValue="monthly">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">{formatCurrency(costs.total)} Hàng tháng</SelectItem>
                <SelectItem value="quarterly">{formatCurrency(costs.total * 3)} Hàng quý</SelectItem>
                <SelectItem value="yearly">{formatCurrency(costs.total * 12)} Hàng năm</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Middle Column - Configuration */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Cấu Hình Server</h3>
            
            {/* Server Details */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Hostname</label>
                  <Input
                    value={config.hostname}
                    onChange={(e) => updateConfig('hostname', e.target.value)}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Root Password</label>
                  <Input
                    type="password"
                    value={config.rootPassword}
                    onChange={(e) => updateConfig('rootPassword', e.target.value)}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>

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
                max={24}
                min={1}
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
                max={48}
                min={1}
                step={1}
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
                max={100}
                min={1}
                step={1}
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
                    {config.bandwidth}
                  </span>
                  <span className="text-gray-500 text-sm">10</span>
                </div>
              </div>
              <Slider
                value={[config.bandwidth]}
                onValueChange={(value) => updateConfig('bandwidth', value[0])}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>1GB</span>
                <span>2GB</span>
                <span>4GB</span>
                <span>6GB</span>
                <span>8GB</span>
                <span>10GB</span>
              </div>
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
                <h4 className="font-semibold text-gray-800">{selectedProduct}</h4>
                <p className="text-sm text-gray-600 italic">
                  {productTemplates[selectedProduct as keyof typeof productTemplates].description}
                </p>
                <div className="text-right">
                  <span className="font-semibold text-blue-600">
                    {formatCurrency(productTemplates[selectedProduct as keyof typeof productTemplates].basePrice)}
                  </span>
                </div>
              </div>

              {/* Configuration Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>» CPU: {config.cpu}</span>
                  <span>{formatCurrency(costs.cpuCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>» RAM: {config.ram}</span>
                  <span>{formatCurrency(costs.ramCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>» +10GB SSD: {config.ssd}</span>
                  <span>{formatCurrency(costs.ssdCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>» Loại GPU: {config.gpu}</span>
                  <span>{formatCurrency(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>» OS: {config.os}</span>
                  <span>{formatCurrency(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>» Băng thông: {config.bandwidth} GB/tháng</span>
                  <span>{formatCurrency(costs.bandwidthCost)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 space-y-2">
                <div className="flex justify-between">
                  <span>Phí khởi tạo:</span>
                  <span>{formatCurrency(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hàng tháng:</span>
                  <span>{formatCurrency(costs.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT @ 8.00%:</span>
                  <span>{formatCurrency(costs.vat)}</span>
                </div>
              </div>

              <div className="border-t-2 border-gray-300 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">{formatCurrency(costs.total)}</span>
                </div>
                <div className="text-right text-sm text-gray-600">
                  Tổng phí dịch vụ
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4">
                <span>Tiếp tục</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}