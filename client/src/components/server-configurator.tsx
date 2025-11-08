import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Download, 
  Server, 
  Cpu, 
  HardDrive, 
  Network, 
  Globe,
  Zap,
  Copy,
  Calculator,
  Calendar,
  Shield
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Pricing configuration based on the Cloud Server page
const componentPricing = {
  cpu: { unit: 'Core', basePrice: 60000, minQty: 1, maxQty: 64 },
  ram: { unit: 'GB', basePrice: 60000, minQty: 1, maxQty: 512 },
  ssd: { unit: 'GB', basePrice: 3000, minQty: 1, maxQty: 10000 },
  hdd: { unit: 'GB', basePrice: 1000, minQty: 1, maxQty: 10000 },
  ipAddress: { unit: 'IP tĩnh', basePrice: 100000, minQty: 1, maxQty: 10 },
  bandwidth: { unit: '100Mbps', basePrice: 100000, minQty: 1, maxQty: 100, step: 1, freeUnits: 1 },
  backup: { unit: 'GB', basePrice: 2000, minQty: 0, maxQty: 1000 }
};

// Payment cycle discounts
const paymentCycles = [
  { months: 1, label: '1 tháng', discount: 0 },
  { months: 3, label: '3 tháng', discount: 3 },
  { months: 6, label: '6 tháng', discount: 6 },
  { months: 12, label: '12 tháng', discount: 12 },
  { months: 24, label: '24 tháng', discount: 24 },
  { months: 36, label: '36 tháng', discount: 36 }
];

// Popular GPU options with pricing
const gpuOptions = [
  { value: 'none', label: 'Không cần GPU', price: 0 },
  { value: 'rtx4060', label: 'NVIDIA RTX 4060', price: 2500000 },
  { value: 'rtx4070', label: 'NVIDIA RTX 4070', price: 3500000 },
  { value: 'rtx4080', label: 'NVIDIA RTX 4080', price: 5000000 },
  { value: 'rtx4090', label: 'NVIDIA RTX 4090', price: 7500000 },
  { value: 'a5000', label: 'NVIDIA RTX A5000', price: 6000000 },
  { value: 'a6000', label: 'NVIDIA RTX A6000', price: 8500000 },
  { value: 'h100', label: 'NVIDIA H100', price: 15000000 }
];

interface ServerConfig {
  id: string;
  name: string;
  cpu: number;
  ram: number;
  disk: number;
  diskType: 'ssd' | 'hdd';
  ipAddress: number;
  bandwidth: number;
  backup: number;
  gpu: string;
  paymentCycle: number;
  os: string;
}

interface ServerConfiguratorProps {
  onQuoteGenerated?: (servers: ServerConfig[]) => void;
}

export default function ServerConfigurator({ onQuoteGenerated }: ServerConfiguratorProps) {
  const [servers, setServers] = useState<ServerConfig[]>([
    {
      id: '1',
      name: 'Cloud Server',
      cpu: 2,
      ram: 4,
      disk: 40,
      diskType: 'ssd',
      ipAddress: 1,
      bandwidth: 1,
      backup: 0,
      gpu: 'none',
      paymentCycle: 1,
      os: 'Ubuntu 22.04'
    }
  ]);

  const addServer = () => {
    const newServer: ServerConfig = {
      id: Date.now().toString(),
      name: `Cloud Server ${servers.length + 1}`,
      cpu: 2,
      ram: 4,
      disk: 40,
      diskType: 'ssd',
      ipAddress: 1,
      bandwidth: 1,
      backup: 0,
      gpu: 'none',
      paymentCycle: 1,
      os: 'Ubuntu 22.04'
    };
    setServers([...servers, newServer]);
  };

  const removeServer = (id: string) => {
    setServers(servers.filter(server => server.id !== id));
  };

  const updateServer = (id: string, field: keyof ServerConfig, value: string | number) => {
    setServers(servers.map(server => 
      server.id === id ? { ...server, [field]: value } : server
    ));
  };

  const duplicateServer = (id: string) => {
    const serverToDuplicate = servers.find(s => s.id === id);
    if (serverToDuplicate) {
      const newServer = {
        ...serverToDuplicate,
        id: Date.now().toString(),
        name: `${serverToDuplicate.name} (Copy)`
      };
      setServers([...servers, newServer]);
    }
  };

  const calculateServerCost = (server: ServerConfig) => {
    const cpuCost = server.cpu * componentPricing.cpu.basePrice;
    const ramCost = server.ram * componentPricing.ram.basePrice;
    const diskPrice = server.diskType === 'ssd' ? componentPricing.ssd.basePrice : componentPricing.hdd.basePrice;
    const diskCost = server.disk * diskPrice;
    // IP pricing: First IP is free, from 2nd IP onwards: 100k/IP
    const ipCost = server.ipAddress > 1 ? (server.ipAddress - 1) * componentPricing.ipAddress.basePrice : 0;
    // Bandwidth pricing: First 100Mbps (1 unit) is free, from 200Mbps (2 units) onwards: 100k/100Mbps
    const bandwidthCost = server.bandwidth > 1 ? (server.bandwidth - 1) * componentPricing.bandwidth.basePrice : 0;
    const backupCost = server.backup * componentPricing.backup.basePrice;
    const gpuOption = gpuOptions.find(gpu => gpu.value === server.gpu);
    const gpuCost = gpuOption ? gpuOption.price : 0;
    
    const subtotal = cpuCost + ramCost + diskCost + ipCost + bandwidthCost + backupCost + gpuCost;
    
    // Apply payment cycle discount
    const cycle = paymentCycles.find(c => c.months === server.paymentCycle);
    const discount = cycle ? cycle.discount : 0;
    const discountedPrice = subtotal * (1 - discount / 100);
    
    return discountedPrice;
  };

  const calculateTotalCost = () => {
    return servers.reduce((total, server) => total + calculateServerCost(server), 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const generatePDFQuote = () => {
    const quoteData = {
      servers,
      totalCost: calculateTotalCost(),
      generatedAt: new Date().toISOString()
    };
    
    console.log('Generating PDF quote...', quoteData);
    
    if (onQuoteGenerated) {
      onQuoteGenerated(servers);
    }
    
    // Create downloadable JSON for now (would be PDF in production)
    const dataStr = JSON.stringify(quoteData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `cloud-server-quote-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          🔧 Tự Xây Dựng Cấu Hình Cloud Server
        </h2>
        <p className="text-lg text-gray-600">
          Tùy chỉnh cấu hình server theo nhu cầu, hỗ trợ nhiều server với cấu hình khác nhau
        </p>
      </div>

      {/* Server List */}
      <div className="space-y-6">
        <AnimatePresence>
          {servers.map((server) => (
            <motion.div
              key={server.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white border-2 border-blue-100 hover:border-blue-300 transition-colors rounded-lg shadow-md">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Server className="w-6 h-6 text-blue-600" />
                      <Input
                        value={server.name}
                        onChange={(e) => updateServer(server.id, 'name', e.target.value)}
                        className="text-lg font-semibold bg-transparent border-none p-0 h-auto focus-visible:ring-0"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-blue-600">
                        {formatCurrency(calculateServerCost(server))}/tháng
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => duplicateServer(server.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      {servers.length > 1 && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeServer(server.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Payment Cycle Selection */}
                    <div className="space-y-3 col-span-full">
                      <Label className="flex items-center gap-2 text-base font-semibold">
                        <Calendar className="w-5 h-5 text-purple-500" />
                        Chu kỳ thanh toán
                      </Label>
                      <Select
                        key={`payment-cycle-select-${server.id}`}
                        value={server.paymentCycle.toString()}
                        onValueChange={(value) => updateServer(server.id, 'paymentCycle', parseInt(value))}
                      >
                        <SelectTrigger className="w-full" data-testid={`select-payment-cycle-${server.id}`}>
                          <SelectValue placeholder="Chọn chu kỳ thanh toán" />
                        </SelectTrigger>
                        <SelectContent position="popper" side="bottom" align="start">
                          {paymentCycles.map((cycle) => (
                            <SelectItem key={`${server.id}-cycle-${cycle.months}`} value={cycle.months.toString()}>
                              {cycle.label} {cycle.discount > 0 && `(-${cycle.discount}%)`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* CPU Configuration */}
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 text-base font-semibold">
                        <Cpu className="w-5 h-5 text-blue-500" />
                        CPU (Cores)
                      </Label>
                      <Input
                        type="number"
                        value={server.cpu}
                        onChange={(e) => updateServer(server.id, 'cpu', Math.max(1, parseInt(e.target.value) || 1))}
                        min="1"
                        max="64"
                        className="text-center text-lg font-semibold"
                        data-testid={`input-cpu-${server.id}`}
                      />
                      <div className="text-xs text-gray-500 text-center">
                        {formatCurrency(componentPricing.cpu.basePrice)}/core/tháng
                      </div>
                    </div>

                    {/* RAM Configuration */}
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 text-base font-semibold">
                        <Zap className="w-5 h-5 text-green-500" />
                        RAM (GB)
                      </Label>
                      <Input
                        type="number"
                        value={server.ram}
                        onChange={(e) => updateServer(server.id, 'ram', Math.max(1, parseInt(e.target.value) || 1))}
                        min="1"
                        max="512"
                        className="text-center text-lg font-semibold"
                        data-testid={`input-ram-${server.id}`}
                      />
                      <div className="text-xs text-gray-500 text-center">
                        {formatCurrency(componentPricing.ram.basePrice)}/GB/tháng
                      </div>
                    </div>

                    {/* Disk Configuration */}
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 text-base font-semibold">
                        <HardDrive className="w-5 h-5 text-purple-500" />
                        Disk Storage (GB)
                      </Label>
                      <div className="flex items-center space-x-3">
                        <Label className="text-sm font-medium">SSD</Label>
                        <Switch
                          checked={server.diskType === 'hdd'}
                          onCheckedChange={(checked) => updateServer(server.id, 'diskType', checked ? 'hdd' : 'ssd')}
                          data-testid={`switch-disk-type-${server.id}`}
                        />
                        <Label className="text-sm font-medium">HDD</Label>
                      </div>
                      <Input
                        type="number"
                        value={server.disk}
                        onChange={(e) => updateServer(server.id, 'disk', Math.max(1, parseInt(e.target.value) || 1))}
                        min="1"
                        max="10000"
                        className="text-center text-lg font-semibold"
                        data-testid={`input-disk-${server.id}`}
                      />
                      <div className="text-xs text-gray-500 text-center">
                        {server.diskType === 'ssd' 
                          ? formatCurrency(componentPricing.ssd.basePrice) 
                          : formatCurrency(componentPricing.hdd.basePrice)
                        }/GB/tháng ({server.diskType.toUpperCase()})
                      </div>
                    </div>

                    {/* IP Address Configuration */}
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 text-base font-semibold">
                        <Globe className="w-5 h-5 text-orange-500" />
                        IP Address
                      </Label>
                      <Input
                        type="number"
                        value={server.ipAddress}
                        onChange={(e) => updateServer(server.id, 'ipAddress', Math.max(1, parseInt(e.target.value) || 1))}
                        min="1"
                        max="10"
                        className="text-center text-lg font-semibold"
                        data-testid={`input-ip-${server.id}`}
                      />
                      <div className="text-xs text-gray-500 text-center">
                        1 IP đầu: miễn phí, từ IP thứ 2: {formatCurrency(componentPricing.ipAddress.basePrice)}/IP/tháng
                      </div>
                    </div>

                    {/* Bandwidth Configuration */}
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 text-base font-semibold">
                        <Network className="w-5 h-5 text-cyan-500" />
                        Bandwidth (x100Mbps)
                      </Label>
                      <Input
                        type="number"
                        value={server.bandwidth}
                        onChange={(e) => updateServer(server.id, 'bandwidth', Math.max(1, parseInt(e.target.value) || 1))}
                        min="1"
                        max="100"
                        className="text-center text-lg font-semibold"
                        data-testid={`input-bandwidth-${server.id}`}
                      />
                      <div className="text-xs text-gray-500 text-center">
                        100Mbps đầu: miễn phí, từ 200Mbps: {formatCurrency(componentPricing.bandwidth.basePrice)}/100Mbps/tháng
                      </div>
                    </div>

                    {/* Backup Configuration */}
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 text-base font-semibold">
                        <Shield className="w-5 h-5 text-red-500" />
                        Backup Storage (GB)
                      </Label>
                      <Input
                        type="number"
                        value={server.backup}
                        onChange={(e) => updateServer(server.id, 'backup', Math.max(0, parseInt(e.target.value) || 0))}
                        min="0"
                        max="1000"
                        className="text-center text-lg font-semibold"
                        data-testid={`input-backup-${server.id}`}
                      />
                      <div className="text-xs text-gray-500 text-center">
                        {formatCurrency(componentPricing.backup.basePrice)}/GB/tháng
                      </div>
                    </div>

                    {/* GPU Selection */}
                    <div className="space-y-3 col-span-full md:col-span-2">
                      <Label className="flex items-center gap-2 text-base font-semibold">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        GPU
                      </Label>
                      <Select
                        key={`gpu-select-${server.id}`}
                        value={server.gpu}
                        onValueChange={(value) => updateServer(server.id, 'gpu', value)}
                      >
                        <SelectTrigger className="w-full" data-testid={`select-gpu-${server.id}`}>
                          <SelectValue placeholder="Chọn GPU" />
                        </SelectTrigger>
                        <SelectContent position="popper" side="bottom" align="start">
                          {gpuOptions.map((gpu) => (
                            <SelectItem key={`${server.id}-${gpu.value}`} value={gpu.value}>
                              {gpu.label} {gpu.price > 0 && `(+${formatCurrency(gpu.price)}/tháng)`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* OS Selection */}
                    <div className="space-y-3 col-span-full md:col-span-1">
                      <Label className="flex items-center gap-2 text-base font-semibold">
                        <Server className="w-5 h-5 text-gray-500" />
                        Operating System
                      </Label>
                      <Select
                        key={`os-select-${server.id}`}
                        value={server.os}
                        onValueChange={(value) => updateServer(server.id, 'os', value)}
                      >
                        <SelectTrigger className="w-full" data-testid={`select-os-${server.id}`}>
                          <SelectValue placeholder="Chọn hệ điều hành" />
                        </SelectTrigger>
                        <SelectContent position="popper" side="bottom" align="start">
                          <SelectItem key={`${server.id}-ubuntu-22`} value="Ubuntu 22.04">Ubuntu 22.04 LTS</SelectItem>
                          <SelectItem key={`${server.id}-ubuntu-20`} value="Ubuntu 20.04">Ubuntu 20.04 LTS</SelectItem>
                          <SelectItem key={`${server.id}-centos-8`} value="CentOS 8">CentOS 8</SelectItem>
                          <SelectItem key={`${server.id}-centos-7`} value="CentOS 7">CentOS 7</SelectItem>
                          <SelectItem key={`${server.id}-debian-12`} value="Debian 12">Debian 12</SelectItem>
                          <SelectItem key={`${server.id}-debian-11`} value="Debian 11">Debian 11</SelectItem>
                          <SelectItem key={`${server.id}-win-2022`} value="Windows Server 2022">Windows Server 2022</SelectItem>
                          <SelectItem key={`${server.id}-win-2019`} value="Windows Server 2019">Windows Server 2019</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Real-time Cost Display */}
                  <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Calculator className="w-5 h-5" />
                      Chi Tiết Tính Giá
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>CPU: {server.cpu} core</span>
                          <span>{formatCurrency(server.cpu * componentPricing.cpu.basePrice)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>RAM: {server.ram} GB</span>
                          <span>{formatCurrency(server.ram * componentPricing.ram.basePrice)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Disk: {server.disk} GB ({server.diskType.toUpperCase()})</span>
                          <span>{formatCurrency(server.disk * (server.diskType === 'ssd' ? componentPricing.ssd.basePrice : componentPricing.hdd.basePrice))}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>IP: {server.ipAddress} địa chỉ {server.ipAddress === 1 ? '(miễn phí)' : `(${server.ipAddress - 1} tính phí)`}</span>
                          <span>{formatCurrency(server.ipAddress > 1 ? (server.ipAddress - 1) * componentPricing.ipAddress.basePrice : 0)}</span>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Bandwidth: {server.bandwidth}x100Mbps {server.bandwidth === 1 ? '(miễn phí)' : `(${server.bandwidth - 1} tính phí)`}</span>
                          <span>{formatCurrency(server.bandwidth > 1 ? (server.bandwidth - 1) * componentPricing.bandwidth.basePrice : 0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Backup: {server.backup} GB</span>
                          <span>{formatCurrency(server.backup * componentPricing.backup.basePrice)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>GPU: {gpuOptions.find(g => g.value === server.gpu)?.label}</span>
                          <span>{formatCurrency(gpuOptions.find(g => g.value === server.gpu)?.price || 0)}</span>
                        </div>
                        {server.paymentCycle > 1 && (() => {
                          const cpuCost = server.cpu * componentPricing.cpu.basePrice;
                          const ramCost = server.ram * componentPricing.ram.basePrice;
                          const diskCost = server.disk * (server.diskType === 'ssd' ? componentPricing.ssd.basePrice : componentPricing.hdd.basePrice);
                          const ipCost = server.ipAddress > 1 ? (server.ipAddress - 1) * componentPricing.ipAddress.basePrice : 0;
                          const bandwidthCost = server.bandwidth > 1 ? (server.bandwidth - 1) * componentPricing.bandwidth.basePrice : 0;
                          const backupCost = server.backup * componentPricing.backup.basePrice;
                          const gpuCost = gpuOptions.find(g => g.value === server.gpu)?.price || 0;
                          const subtotal = cpuCost + ramCost + diskCost + ipCost + bandwidthCost + backupCost + gpuCost;
                          const discountPercent = paymentCycles.find(c => c.months === server.paymentCycle)?.discount || 0;
                          const discountAmount = subtotal * discountPercent / 100;
                          return (
                            <div className="flex justify-between text-green-600 font-medium">
                              <span>Giảm giá ({discountPercent}%):</span>
                              <span>-{formatCurrency(discountAmount)}</span>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <div className="text-lg font-semibold text-gray-800">
                          Tổng chi phí ({paymentCycles.find(c => c.months === server.paymentCycle)?.label})
                        </div>
                        <div className="text-2xl font-bold text-blue-600" data-testid={`total-cost-${server.id}`}>
                          {formatCurrency(calculateServerCost(server))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50 p-6 rounded-lg">
        <Button
          onClick={addServer}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm Server Mới
        </Button>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Tổng chi phí ({servers.length} server)</p>
            <p className="text-2xl font-bold text-blue-600">
              {formatCurrency(calculateTotalCost())}/tháng
            </p>
          </div>
          
          <Button
            onClick={generatePDFQuote}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Xuất Báo Giá PDF
          </Button>
        </div>
      </div>

      {/* Cost Breakdown with Drag-and-Drop Configuration */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Chi Tiết Báo Giá - Kéo Thả Cấu Hình
          </h3>
          <p className="text-sm text-gray-600 mt-2">Kéo thả các thành phần để tùy chỉnh cấu hình server của bạn</p>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {servers.map((server, serverIndex) => (
              <div key={server.id} className="border-2 border-dashed border-blue-300 rounded-lg p-4 bg-blue-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <Server className="w-5 h-5 text-blue-600" />
                    {server.name}
                  </h4>
                  <span className="text-xl font-bold text-blue-600">
                    {formatCurrency(calculateServerCost(server))}/tháng
                  </span>
                </div>
                
                {/* Draggable Configuration Components */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {/* CPU Component */}
                  <motion.div
                    drag
                    dragSnapToOrigin
                    whileDrag={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                    className="bg-white rounded-lg p-3 border border-blue-200 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold text-sm">CPU</span>
                    </div>
                    <p className="text-sm text-gray-600">{server.cpu} Core</p>
                    <p className="text-xs text-green-600 font-medium">
                      {formatCurrency(server.cpu * componentPricing.cpu.basePrice)}
                    </p>
                  </motion.div>

                  {/* RAM Component */}
                  <motion.div
                    drag
                    dragSnapToOrigin
                    whileDrag={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                    className="bg-white rounded-lg p-3 border border-green-200 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <HardDrive className="w-4 h-4 text-green-500" />
                      <span className="font-semibold text-sm">RAM</span>
                    </div>
                    <p className="text-sm text-gray-600">{server.ram} GB</p>
                    <p className="text-xs text-green-600 font-medium">
                      {formatCurrency(server.ram * componentPricing.ram.basePrice)}
                    </p>
                  </motion.div>

                  {/* Disk Component */}
                  <motion.div
                    drag
                    dragSnapToOrigin
                    whileDrag={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                    className="bg-white rounded-lg p-3 border border-purple-200 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <HardDrive className="w-4 h-4 text-purple-500" />
                      <span className="font-semibold text-sm">{server.diskType.toUpperCase()}</span>
                    </div>
                    <p className="text-sm text-gray-600">{server.disk} GB</p>
                    <p className="text-xs text-green-600 font-medium">
                      {formatCurrency(server.disk * (server.diskType === 'ssd' ? componentPricing.ssd.basePrice : componentPricing.hdd.basePrice))}
                    </p>
                  </motion.div>

                  {/* IP Component */}
                  <motion.div
                    drag
                    dragSnapToOrigin
                    whileDrag={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                    className="bg-white rounded-lg p-3 border border-orange-200 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-4 h-4 text-orange-500" />
                      <span className="font-semibold text-sm">IP Tĩnh</span>
                    </div>
                    <p className="text-sm text-gray-600">{server.ipAddress} IP {server.ipAddress === 1 ? '(miễn phí)' : ''}</p>
                    <p className="text-xs text-green-600 font-medium">
                      {formatCurrency(server.ipAddress > 1 ? (server.ipAddress - 1) * componentPricing.ipAddress.basePrice : 0)}
                    </p>
                  </motion.div>

                  {/* Bandwidth Component */}
                  <motion.div
                    drag
                    dragSnapToOrigin
                    whileDrag={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                    className="bg-white rounded-lg p-3 border border-cyan-200 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Network className="w-4 h-4 text-cyan-500" />
                      <span className="font-semibold text-sm">Băng Thông</span>
                    </div>
                    <p className="text-sm text-gray-600">{server.bandwidth}x100Mbps {server.bandwidth === 1 ? '(miễn phí)' : ''}</p>
                    <p className="text-xs text-green-600 font-medium">
                      {formatCurrency(server.bandwidth > 1 ? (server.bandwidth - 1) * componentPricing.bandwidth.basePrice : 0)}
                    </p>
                  </motion.div>

                  {/* GPU Component */}
                  {server.gpu !== 'none' && (
                    <motion.div
                      drag
                      dragSnapToOrigin
                      whileDrag={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                      className="bg-white rounded-lg p-3 border border-yellow-200 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold text-sm">GPU</span>
                      </div>
                      <p className="text-sm text-gray-600">{gpuOptions.find(g => g.value === server.gpu)?.label}</p>
                      <p className="text-xs text-green-600 font-medium">
                        {formatCurrency(gpuOptions.find(g => g.value === server.gpu)?.price || 0)}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Services Details */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md border border-blue-200">
        <div className="p-6 border-b border-blue-200 bg-blue-100 rounded-t-lg">
          <h3 className="text-xl font-semibold flex items-center gap-2 text-blue-800">
            <Server className="w-6 h-6" />
            Chi Tiết Dịch Vụ Bổ Sung
          </h3>
          <p className="text-sm text-blue-600 mt-2">Các dịch vụ đi kèm miễn phí và có tính phí</p>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Services */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-green-700 flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                Dịch Vụ Miễn Phí Đi Kèm
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h5 className="font-medium text-gray-800">Backup Tự Động Hàng Ngày</h5>
                    <p className="text-sm text-gray-600">Sao lưu dữ liệu tự động 24/7, khôi phục nhanh chóng</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h5 className="font-medium text-gray-800">SSL Certificate Miễn Phí</h5>
                    <p className="text-sm text-gray-600">Chứng chỉ SSL Let's Encrypt tự động gia hạn</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h5 className="font-medium text-gray-800">Monitoring & Alert</h5>
                    <p className="text-sm text-gray-600">Giám sát server 24/7, cảnh báo qua email/SMS</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h5 className="font-medium text-gray-800">Firewall & DDoS Protection</h5>
                    <p className="text-sm text-gray-600">Bảo vệ chống tấn công DDoS lên đến 10Gbps</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h5 className="font-medium text-gray-800">Hỗ Trợ Kỹ Thuật 24/7</h5>
                    <p className="text-sm text-gray-600">Team kỹ thuật Việt Nam hỗ trợ không giới hạn</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Paid Services */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                Dịch Vụ Bổ Sung (Có Phí)
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium text-gray-800">Server Management</h5>
                        <p className="text-sm text-gray-600">Quản lý server toàn diện, cài đặt phần mềm</p>
                      </div>
                      <span className="text-sm font-semibold text-blue-600">500K VND/tháng</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium text-gray-800">Database Optimization</h5>
                        <p className="text-sm text-gray-600">Tối ưu hóa MySQL, PostgreSQL, MongoDB</p>
                      </div>
                      <span className="text-sm font-semibold text-blue-600">300K VND/lần</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium text-gray-800">Migration Service</h5>
                        <p className="text-sm text-gray-600">Chuyển đổi website/dữ liệu từ hosting khác</p>
                      </div>
                      <span className="text-sm font-semibold text-blue-600">1M VND/site</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium text-gray-800">Load Balancer</h5>
                        <p className="text-sm text-gray-600">Cân bằng tải cho traffic cao</p>
                      </div>
                      <span className="text-sm font-semibold text-blue-600">2M VND/tháng</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium text-gray-800">AI/ML Support</h5>
                        <p className="text-sm text-gray-600">Tư vấn setup TensorFlow, PyTorch, CUDA</p>
                      </div>
                      <span className="text-sm font-semibold text-blue-600">1.5M VND/tháng</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Level Agreement */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">📋 Cam Kết Dịch Vụ (SLA)</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span className="text-yellow-700">Uptime: 99.9%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span className="text-yellow-700">Response Time: &lt; 5 phút</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span className="text-yellow-700">Hoàn tiền 100% nếu không đạt SLA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}