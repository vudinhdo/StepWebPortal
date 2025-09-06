import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Search, 
  Shield, 
  Lock, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

// Pricing configuration for domain services
const domainPricing = {
  '.com': { registration: 350000, renewal: 350000, transfer: 350000 },
  '.net': { registration: 400000, renewal: 400000, transfer: 400000 },
  '.org': { registration: 380000, renewal: 380000, transfer: 380000 },
  '.info': { registration: 450000, renewal: 450000, transfer: 450000 },
  '.biz': { registration: 500000, renewal: 500000, transfer: 500000 },
  '.vn': { registration: 600000, renewal: 600000, transfer: 600000 },
  '.com.vn': { registration: 400000, renewal: 400000, transfer: 400000 },
  '.net.vn': { registration: 400000, renewal: 400000, transfer: 400000 },
  privacy: { basePrice: 200000 }, // per domain per year
  protection: { basePrice: 300000 }, // per domain per year
  dns: { basePrice: 100000 }, // premium DNS per year
  ssl: { basePrice: 500000 } // SSL certificate per year
};

interface DomainConfig {
  serviceType: string;
  domains: string[];
  extension: string;
  years: number;
  privacy: boolean;
  protection: boolean;
  premiumDNS: boolean;
  ssl: boolean;
}

const serviceTypes = {
  'Đăng Ký Mới': {
    description: 'Đăng ký tên miền mới',
    priceKey: 'registration'
  },
  'Gia Hạn': {
    description: 'Gia hạn tên miền hiện có',
    priceKey: 'renewal'
  },
  'Chuyển Đổi': {
    description: 'Chuyển tên miền về STEP',
    priceKey: 'transfer'
  }
};

export default function DomainQuoteCalculator() {
  const [config, setConfig] = useState<DomainConfig>({
    serviceType: 'Đăng Ký Mới',
    domains: [''],
    extension: '.com',
    years: 1,
    privacy: false,
    protection: false,
    premiumDNS: false,
    ssl: false
  });

  const [domainInput, setDomainInput] = useState('');

  const updateConfig = (field: keyof DomainConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const addDomain = () => {
    if (domainInput.trim()) {
      updateConfig('domains', [...config.domains.filter(d => d), domainInput.trim()]);
      setDomainInput('');
    }
  };

  const removeDomain = (index: number) => {
    const newDomains = config.domains.filter((_, i) => i !== index);
    updateConfig('domains', newDomains.length > 0 ? newDomains : ['']);
  };

  const calculateCost = () => {
    const validDomains = config.domains.filter(d => d.trim());
    const domainCount = Math.max(1, validDomains.length);
    
    const serviceType = serviceTypes[config.serviceType as keyof typeof serviceTypes];
    const extensionPricing = domainPricing[config.extension as keyof typeof domainPricing];
    
    const baseCost = extensionPricing[serviceType.priceKey as keyof typeof extensionPricing] * domainCount * config.years;
    const privacyCost = config.privacy ? domainPricing.privacy.basePrice * domainCount * config.years : 0;
    const protectionCost = config.protection ? domainPricing.protection.basePrice * domainCount * config.years : 0;
    const dnsCost = config.premiumDNS ? domainPricing.dns.basePrice * domainCount * config.years : 0;
    const sslCost = config.ssl ? domainPricing.ssl.basePrice * domainCount * config.years : 0;
    
    const subtotal = baseCost + privacyCost + protectionCost + dnsCost + sslCost;
    const vat = subtotal * 0.08;
    const total = subtotal + vat;
    
    return { 
      domainCount, baseCost, privacyCost, protectionCost, dnsCost, sslCost,
      subtotal, vat, total 
    };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VND';
  };

  const costs = calculateCost();

  const popularExtensions = ['.com', '.net', '.org', '.vn', '.com.vn'];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Service Type & Domain Input */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Loại Dịch Vụ</h3>
          </div>

          {/* Service Type Cards */}
          <div className="space-y-4">
            {Object.entries(serviceTypes).map(([key, type]) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.02 }}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  config.serviceType === key 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => updateConfig('serviceType', key)}
              >
                <h4 className="font-semibold text-gray-800">{key}</h4>
                <p className="text-sm text-gray-600 mt-1">{type.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Domain Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Thêm Tên Miền</label>
            <div className="flex gap-2">
              <Input
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                placeholder="example"
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && addDomain()}
              />
              <Select value={config.extension} onValueChange={(value) => updateConfig('extension', value)}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(domainPricing).filter(key => key.startsWith('.')).map(ext => (
                    <SelectItem key={ext} value={ext}>{ext}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={addDomain} size="sm">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Domain List */}
          {config.domains.filter(d => d).length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tên Miền Đã Chọn</label>
              {config.domains.filter(d => d).map((domain, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm">{domain}{config.extension}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeDomain(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Xóa
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Popular Extensions */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Phần Mở Rộng Phổ Biến</label>
            <div className="grid grid-cols-3 gap-2">
              {popularExtensions.map(ext => (
                <Button
                  key={ext}
                  variant={config.extension === ext ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateConfig('extension', ext)}
                  className="text-xs"
                >
                  {ext}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column - Configuration */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Cấu Hình Dịch Vụ</h3>
            
            {/* Years Slider */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Số Năm</label>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm font-medium">
                    {config.years} năm
                  </span>
                </div>
              </div>
              <Slider
                value={[config.years]}
                onValueChange={(value) => updateConfig('years', value[0])}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>1 năm</span>
                <span>5 năm</span>
                <span>10 năm</span>
              </div>
            </div>

            {/* Current Extension Pricing */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Giá {config.extension}</h4>
              <div className="text-sm space-y-1">
                {config.extension.startsWith('.') && (
                  <>
                    <div className="flex justify-between">
                      <span>Đăng ký:</span>
                      <span>{formatCurrency((domainPricing[config.extension as keyof typeof domainPricing] as any).registration)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gia hạn:</span>
                      <span>{formatCurrency((domainPricing[config.extension as keyof typeof domainPricing] as any).renewal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Chuyển đổi:</span>
                      <span>{formatCurrency((domainPricing[config.extension as keyof typeof domainPricing] as any).transfer)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Additional Services */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-gray-800">Dịch Vụ Bổ Sung</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-700 flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Domain Privacy
                    </span>
                    <p className="text-xs text-gray-500">Ẩn thông tin whois</p>
                  </div>
                  <Button
                    variant={config.privacy ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateConfig('privacy', !config.privacy)}
                  >
                    {config.privacy ? 'Đã chọn' : 'Thêm'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-700 flex items-center">
                      <Lock className="h-4 w-4 mr-2" />
                      Domain Protection
                    </span>
                    <p className="text-xs text-gray-500">Bảo vệ khỏi chuyển đổi trái phép</p>
                  </div>
                  <Button
                    variant={config.protection ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateConfig('protection', !config.protection)}
                  >
                    {config.protection ? 'Đã chọn' : 'Thêm'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-700">Premium DNS</span>
                    <p className="text-xs text-gray-500">DNS tốc độ cao với uptime 100%</p>
                  </div>
                  <Button
                    variant={config.premiumDNS ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateConfig('premiumDNS', !config.premiumDNS)}
                  >
                    {config.premiumDNS ? 'Đã chọn' : 'Thêm'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-700">SSL Certificate</span>
                    <p className="text-xs text-gray-500">Chứng chỉ bảo mật SSL</p>
                  </div>
                  <Button
                    variant={config.ssl ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateConfig('ssl', !config.ssl)}
                  >
                    {config.ssl ? 'Đã chọn' : 'Thêm'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Pricing Summary */}
        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-1">Chi Tiết Báo Giá Domain</h3>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="space-y-3">
              <div className="border-b border-gray-200 pb-3">
                <h4 className="font-semibold text-gray-800">{config.serviceType}</h4>
                <p className="text-sm text-gray-600 italic">
                  {serviceTypes[config.serviceType as keyof typeof serviceTypes].description}
                </p>
                <div className="text-right">
                  <span className="font-semibold text-orange-600">
                    {formatCurrency(costs.baseCost)}
                  </span>
                </div>
              </div>

              {/* Configuration Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>» Số tên miền: {costs.domainCount}</span>
                  <span>{config.extension}</span>
                </div>
                <div className="flex justify-between">
                  <span>» Thời gian: {config.years} năm</span>
                  <span>{formatCurrency(costs.baseCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>» Domain Privacy</span>
                  <span>{formatCurrency(costs.privacyCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>» Domain Protection</span>
                  <span>{formatCurrency(costs.protectionCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>» Premium DNS</span>
                  <span>{formatCurrency(costs.dnsCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>» SSL Certificate</span>
                  <span>{formatCurrency(costs.sslCost)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 space-y-2">
                <div className="flex justify-between">
                  <span>Tổng phí:</span>
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
                  Tổng cho {config.years} năm
                </div>
              </div>

              {/* Domain List Preview */}
              {config.domains.filter(d => d).length > 0 && (
                <div className="border-t border-gray-200 pt-3">
                  <h5 className="text-sm font-semibold text-gray-800 mb-2">Tên miền sẽ {config.serviceType.toLowerCase()}:</h5>
                  {config.domains.filter(d => d).map((domain, index) => (
                    <div key={index} className="flex items-center text-xs text-gray-600 mb-1">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                      {domain}{config.extension}
                    </div>
                  ))}
                </div>
              )}

              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white mt-4">
                <span>Tiến Hành Đặt Hàng</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}