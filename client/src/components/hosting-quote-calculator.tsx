import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Network, 
  ArrowRight,
  Monitor
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

// Pricing packages for hosting
const hostingPackages = {
  'Cơ Bản': {
    price: 299000,
    storage: 10,
    bandwidth: 100,
    domains: 1,
    ssl: false,
    backup: false,
    features: ['SSD Storage', 'PHP 8.x Support', 'MySQL Database', '99.9% Uptime'],
    description: 'Phù hợp cho website cá nhân và doanh nghiệp nhỏ',
    popular: false
  },
  'Nâng Cao': {
    price: 599000,
    storage: 50,
    bandwidth: 500,
    domains: 5,
    ssl: true,
    backup: true,
    features: ['NVME SSD Storage', 'Advanced PHP', 'Premium Support', 'CDN miễn phí', 'Daily Backup'],
    description: 'Tối ưu cho doanh nghiệp vừa với lưu lượng cao',
    popular: true
  },
  'Pro': {
    price: 1299000,
    storage: 200,
    bandwidth: 2000,
    domains: 20,
    ssl: true,
    backup: true,
    features: ['NVME SSD Storage', 'Dedicated Resources', 'Priority Support', 'Advanced Security', 'Auto Scaling'],
    description: 'Giải pháp chuyên nghiệp cho doanh nghiệp lớn',
    popular: false
  }
};

// Additional pricing for customization
const hostingPricing = {
  storage: { basePrice: 15000 }, // per GB
  bandwidth: { basePrice: 8000 }, // per GB
  domain: { basePrice: 50000 }, // additional domains
  ssl: { basePrice: 150000 }, // SSL certificate
  backup: { basePrice: 100000 } // daily backup
};

interface HostingConfig {
  selectedPackage: string;
  hostingType: string;
  storage: number;
  bandwidth: number;
  domains: number;
  ssl: boolean;
  backup: boolean;
  period: string;
}

const hostingTypes = {
  'WordPress Hosting': {
    baseStorage: 10,
    baseBandwidth: 100,
    baseDomains: 1,
    basePrice: 150000,
    description: 'Tối ưu cho WordPress'
  },
  'Laravel Hosting': {
    baseStorage: 15,
    baseBandwidth: 150,
    baseDomains: 1,
    basePrice: 200000,
    description: 'Tối ưu cho PHP/Laravel'
  },
  'NVME Hosting': {
    baseStorage: 25,
    baseBandwidth: 200,
    baseDomains: 3,
    basePrice: 300000,
    description: 'Hiệu suất cao với NVME SSD'
  },
  'Reseller Hosting': {
    baseStorage: 50,
    baseBandwidth: 500,
    baseDomains: 10,
    basePrice: 500000,
    description: 'Gói dành cho đại lý'
  }
};

export default function HostingQuoteCalculator() {
  const [selectedHosting, setSelectedHosting] = useState('WordPress Hosting');
  const [config, setConfig] = useState<HostingConfig>({
    selectedPackage: 'Nâng Cao',
    hostingType: 'WordPress Hosting',
    storage: 50,
    bandwidth: 500,
    domains: 5,
    ssl: true,
    backup: true,
    period: 'monthly'
  });

  const updateConfig = (field: keyof HostingConfig, value: string | number | boolean) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const calculateCost = () => {
    const selectedPkg = hostingPackages[config.selectedPackage as keyof typeof hostingPackages];
    const baseCost = selectedPkg.price;
    
    const additionalStorage = Math.max(0, config.storage - selectedPkg.storage);
    const additionalBandwidth = Math.max(0, config.bandwidth - selectedPkg.bandwidth);
    const additionalDomains = Math.max(0, config.domains - selectedPkg.domains);
    
    const storageCost = additionalStorage * hostingPricing.storage.basePrice;
    const bandwidthCost = additionalBandwidth * hostingPricing.bandwidth.basePrice;
    const domainCost = additionalDomains * hostingPricing.domain.basePrice;
    const sslCost = (config.ssl && !selectedPkg.ssl) ? hostingPricing.ssl.basePrice : 0;
    const backupCost = (config.backup && !selectedPkg.backup) ? hostingPricing.backup.basePrice : 0;
    
    const subtotal = baseCost + storageCost + bandwidthCost + domainCost + sslCost + backupCost;
    const vat = subtotal * 0.08;
    const total = subtotal + vat;
    
    const multiplier = config.period === 'yearly' ? 10 : config.period === 'quarterly' ? 2.5 : 1;
    
    return { 
      baseCost, storageCost, bandwidthCost, domainCost, sslCost, backupCost, 
      subtotal, vat, total: total * multiplier, multiplier 
    };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VND';
  };

  const costs = calculateCost();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Package Selection */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Chọn Gói Hosting</h3>
          </div>

          {/* Package Cards */}
          <div className="space-y-4">
            {Object.entries(hostingPackages).map(([key, pkg]) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.02 }}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all relative ${
                  config.selectedPackage === key 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => {
                  setConfig(prev => ({ 
                    ...prev, 
                    selectedPackage: key,
                    storage: pkg.storage,
                    bandwidth: pkg.bandwidth,
                    domains: pkg.domains,
                    ssl: pkg.ssl,
                    backup: pkg.backup
                  }));
                }}
              >
                {pkg.popular && (
                  <div className="absolute -top-2 left-4 bg-orange-500 text-white px-2 py-1 text-xs rounded-full">
                    Phổ biến nhất
                  </div>
                )}
                <h4 className="font-semibold text-gray-800 flex items-center justify-between">
                  {key}
                  <span className="text-blue-600 font-bold">
                    {new Intl.NumberFormat('vi-VN').format(pkg.price)} VND/tháng
                  </span>
                </h4>
                <p className="text-sm text-gray-600 mt-1 italic">{pkg.description}</p>
                <div className="text-sm text-gray-600 mt-2 space-y-1">
                  <div>• Storage: {pkg.storage} GB</div>
                  <div>• Bandwidth: {pkg.bandwidth} GB/tháng</div>
                  <div>• Domains: {pkg.domains}</div>
                  <div>• SSL: {pkg.ssl ? 'Có' : 'Không'}</div>
                  <div>• Backup: {pkg.backup ? 'Có' : 'Không'}</div>
                </div>
                <div className="mt-3">
                  <div className="text-xs text-gray-500 mb-1">Tính năng:</div>
                  <div className="flex flex-wrap gap-1">
                    {pkg.features.map((feature, idx) => (
                      <span key={idx} className="inline-block bg-gray-100 text-xs px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Hosting Type Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Loại Hosting</label>
            <Select value={selectedHosting} onValueChange={setSelectedHosting}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(hostingTypes).map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Cấu Hình Hosting</h3>
            
            {/* Storage Slider */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Dung Lượng (GB)</label>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">
                    {config.storage} GB
                  </span>
                </div>
              </div>
              <Slider
                value={[config.storage]}
                onValueChange={(value) => updateConfig('storage', value[0])}
                max={500}
                min={hostingPackages[config.selectedPackage as keyof typeof hostingPackages].storage}
                step={5}
                className="w-full"
              />
            </div>

            {/* Bandwidth Slider */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Băng Thông (GB/tháng)</label>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">
                    {config.bandwidth} GB
                  </span>
                </div>
              </div>
              <Slider
                value={[config.bandwidth]}
                onValueChange={(value) => updateConfig('bandwidth', value[0])}
                max={5000}
                min={hostingPackages[config.selectedPackage as keyof typeof hostingPackages].bandwidth}
                step={50}
                className="w-full"
              />
            </div>

            {/* Domains Slider */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Số Tên Miền</label>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">
                    {config.domains}
                  </span>
                </div>
              </div>
              <Slider
                value={[config.domains]}
                onValueChange={(value) => updateConfig('domains', value[0])}
                max={50}
                min={hostingPackages[config.selectedPackage as keyof typeof hostingPackages].domains}
                step={1}
                className="w-full"
              />
            </div>

            {/* Additional Services */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-gray-800">Dịch Vụ Bổ Sung</h4>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">SSL Certificate</span>
                <Button
                  variant={config.ssl ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateConfig('ssl', !config.ssl)}
                >
                  {config.ssl ? 'Đã chọn' : 'Thêm'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Daily Backup</span>
                <Button
                  variant={config.backup ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateConfig('backup', !config.backup)}
                >
                  {config.backup ? 'Đã chọn' : 'Thêm'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Pricing Summary */}
        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-1">Chi Tiết Báo Giá</h3>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="space-y-3">
              <div className="border-b border-gray-200 pb-3">
                <h4 className="font-semibold text-gray-800">Gói {config.selectedPackage}</h4>
                <p className="text-sm text-gray-600 italic">
                  {hostingPackages[config.selectedPackage as keyof typeof hostingPackages].description}
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
                  <span>» Dung lượng thêm: {Math.max(0, config.storage - hostingPackages[config.selectedPackage as keyof typeof hostingPackages].storage)} GB</span>
                  <span>{formatCurrency(costs.storageCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>» Băng thông thêm: {Math.max(0, config.bandwidth - hostingPackages[config.selectedPackage as keyof typeof hostingPackages].bandwidth)} GB</span>
                  <span>{formatCurrency(costs.bandwidthCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>» Tên miền thêm: {Math.max(0, config.domains - hostingPackages[config.selectedPackage as keyof typeof hostingPackages].domains)}</span>
                  <span>{formatCurrency(costs.domainCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>» SSL Certificate thêm</span>
                  <span>{formatCurrency(costs.sslCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>» Daily Backup thêm</span>
                  <span>{formatCurrency(costs.backupCost)}</span>
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
                {costs.multiplier > 1 && (
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
                  {config.period === 'monthly' ? 'Hàng tháng' : 
                   config.period === 'quarterly' ? 'Hàng quý' : 'Hàng năm'}
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4">
                <span>Đặt Hàng Ngay</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}