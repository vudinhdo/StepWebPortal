import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Users, 
  HardDrive, 
  Shield, 
  ArrowRight,
  Server
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

// Email packages with predefined pricing
const emailPackages = {
  'Cơ Bản': {
    price: 199000,
    users: 5,
    storagePerUser: 5,
    customDomains: 1,
    backup: false,
    antispam: false,
    features: ['5GB/user', 'IMAP/POP3', 'Webmail', 'Mobile sync', 'Basic support'],
    description: 'Phù hợp cho cá nhân và team nhỏ',
    popular: false
  },
  'Doanh Nghiệp': {
    price: 599000,
    users: 25,
    storagePerUser: 25,
    customDomains: 3,
    backup: true,
    antispam: true,
    features: ['25GB/user', 'Exchange ActiveSync', 'Calendar & Contacts', 'Advanced Security', 'Priority Support'],
    description: 'Tối ưu cho doanh nghiệp vừa và nhỏ',
    popular: true
  },
  'Enterprise': {
    price: 1499000,
    users: 100,
    storagePerUser: 50,
    customDomains: 10,
    backup: true,
    antispam: true,
    features: ['50GB/user', 'Dedicated IP', 'Advanced Compliance', 'API Access', '24/7 Premium Support'],
    description: 'Giải pháp toàn diện cho doanh nghiệp lớn',
    popular: false
  }
};

// Additional pricing for customization
const emailPricing = {
  storage: { basePrice: 12000 }, // per GB per month
  backup: { basePrice: 80000 }, // per month
  antispam: { basePrice: 50000 }, // per month
  customDomain: { basePrice: 80000 } // per domain per month
};

interface EmailConfig {
  selectedPackage: string;
  emailType: string;
  users: number;
  storagePerUser: number;
  customDomains: number;
  backup: boolean;
  antispam: boolean;
  period: string;
}


export default function EmailQuoteCalculator() {
  const [config, setConfig] = useState<EmailConfig>({
    selectedPackage: 'Doanh Nghiệp',
    emailType: 'Email Cơ Bản',
    users: 25,
    storagePerUser: 25,
    customDomains: 3,
    backup: true,
    antispam: true,
    period: 'monthly'
  });

  const updateConfig = (field: keyof EmailConfig, value: string | number | boolean) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const calculateCost = () => {
    const selectedPkg = emailPackages[config.selectedPackage as keyof typeof emailPackages];
    const baseCost = selectedPkg.price;
    
    const additionalUsers = Math.max(0, config.users - selectedPkg.users);
    const userCost = additionalUsers * 50000; // 50k per additional user
    
    const additionalStoragePerUser = Math.max(0, config.storagePerUser - selectedPkg.storagePerUser);
    const storageCost = additionalStoragePerUser * config.users * emailPricing.storage.basePrice;
    
    const additionalDomains = Math.max(0, config.customDomains - selectedPkg.customDomains);
    const domainCost = additionalDomains * emailPricing.customDomain.basePrice;
    
    const backupCost = (config.backup && !selectedPkg.backup) ? emailPricing.backup.basePrice : 0;
    const antispamCost = (config.antispam && !selectedPkg.antispam) ? emailPricing.antispam.basePrice : 0;
    
    const subtotal = baseCost + userCost + storageCost + domainCost + backupCost + antispamCost;
    const vat = subtotal * 0.08;
    const total = subtotal + vat;
    
    const multiplier = config.period === 'yearly' ? 10 : config.period === 'quarterly' ? 2.5 : 1;
    
    return { 
      baseCost, userCost, storageCost, domainCost, backupCost, antispamCost,
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
        {/* Left Column - Email Package Selection */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Chọn Gói Email</h3>
          </div>

          {/* Email Package Cards */}
          <div className="space-y-4">
            {Object.entries(emailPackages).map(([key, pkg]) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.02 }}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all relative ${
                  config.selectedPackage === key 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => {
                  setConfig(prev => ({ 
                    ...prev, 
                    selectedPackage: key,
                    users: pkg.users,
                    storagePerUser: pkg.storagePerUser,
                    customDomains: pkg.customDomains,
                    backup: pkg.backup,
                    antispam: pkg.antispam
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
                  <span className="text-purple-600 font-bold">
                    {new Intl.NumberFormat('vi-VN').format(pkg.price)} VND/tháng
                  </span>
                </h4>
                <p className="text-sm text-gray-600 mt-1 italic">{pkg.description}</p>
                <div className="text-sm text-gray-600 mt-2 space-y-1">
                  <div>• Users: {pkg.users}</div>
                  <div>• Storage: {pkg.storagePerUser}GB/user</div>
                  <div>• Domains: {pkg.customDomains}</div>
                  <div>• Backup: {pkg.backup ? 'Có' : 'Không'}</div>
                  <div>• Anti-spam: {pkg.antispam ? 'Có' : 'Không'}</div>
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Cấu Hình Email</h3>
            
            {/* Users Slider */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Số Người Dùng</label>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm font-medium">
                    {config.users} users
                  </span>
                </div>
              </div>
              <Slider
                value={[config.users]}
                onValueChange={(value) => updateConfig('users', value[0])}
                max={500}
                min={emailPackages[config.selectedPackage as keyof typeof emailPackages].users}
                step={1}
                className="w-full"
              />
            </div>

            {/* Storage Slider */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Dung Lượng/User (GB)</label>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm font-medium">
                    {config.storagePerUser} GB
                  </span>
                </div>
              </div>
              <Slider
                value={[config.storagePerUser]}
                onValueChange={(value) => updateConfig('storagePerUser', value[0])}
                max={200}
                min={emailPackages[config.selectedPackage as keyof typeof emailPackages].storagePerUser}
                step={5}
                className="w-full"
              />
            </div>

            {/* Custom Domains Slider */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Tên Miền Tùy Chỉnh</label>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm font-medium">
                    {config.customDomains}
                  </span>
                </div>
              </div>
              <Slider
                value={[config.customDomains]}
                onValueChange={(value) => updateConfig('customDomains', value[0])}
                max={50}
                min={emailPackages[config.selectedPackage as keyof typeof emailPackages].customDomains}
                step={1}
                className="w-full"
              />
            </div>

            {/* Additional Services */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-gray-800">Dịch Vụ Bổ Sung</h4>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-700">Email Backup</span>
                  <p className="text-xs text-gray-500">Sao lưu tự động hàng ngày</p>
                </div>
                <Button
                  variant={config.backup ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateConfig('backup', !config.backup)}
                >
                  {config.backup ? 'Đã chọn' : 'Thêm'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-700">Anti-spam Advanced</span>
                  <p className="text-xs text-gray-500">Bảo vệ chống spam nâng cao</p>
                </div>
                <Button
                  variant={config.antispam ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateConfig('antispam', !config.antispam)}
                >
                  {config.antispam ? 'Đã chọn' : 'Thêm'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Pricing Summary */}
        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-1">Chi Tiết Báo Giá Email</h3>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="space-y-3">
              <div className="border-b border-gray-200 pb-3">
                <h4 className="font-semibold text-gray-800">Gói {config.selectedPackage}</h4>
                <p className="text-sm text-gray-600 italic">
                  {emailPackages[config.selectedPackage as keyof typeof emailPackages].description}
                </p>
                <div className="text-right">
                  <span className="font-semibold text-purple-600">
                    {formatCurrency(costs.baseCost)}
                  </span>
                </div>
              </div>

              {/* Configuration Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>» Người dùng thêm: {Math.max(0, config.users - emailPackages[config.selectedPackage as keyof typeof emailPackages].users)}</span>
                  <span>{formatCurrency(costs.userCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>» Dung lượng bổ sung</span>
                  <span>{formatCurrency(costs.storageCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>» Tên miền thêm: {Math.max(0, config.customDomains - emailPackages[config.selectedPackage as keyof typeof emailPackages].customDomains)}</span>
                  <span>{formatCurrency(costs.domainCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>» Email Backup thêm</span>
                  <span>{formatCurrency(costs.backupCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>» Anti-spam thêm</span>
                  <span>{formatCurrency(costs.antispamCost)}</span>
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

              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-4">
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