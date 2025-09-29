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
import QuoteBuilder from './quote-builder';

// Pricing configuration based on the Cloud Server page
const componentPricing = {
  cpu: { unit: 'Core', basePrice: 60000, minQty: 1, maxQty: 64 },
  ram: { unit: 'GB', basePrice: 60000, minQty: 1, maxQty: 512 },
  ssd: { unit: 'GB', basePrice: 3000, minQty: 1, maxQty: 10000 },
  hdd: { unit: 'GB', basePrice: 1000, minQty: 1, maxQty: 10000 },
  ipAddress: { unit: 'IP tĩnh', basePrice: 100000, minQty: 1, maxQty: 10 },
  bandwidth: { unit: '100Mbps', basePrice: 100000, minQty: 1, maxQty: 100, step: 1 },
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
    const ipCost = server.ipAddress * componentPricing.ipAddress.basePrice;
    const bandwidthCost = server.bandwidth * componentPricing.bandwidth.basePrice;
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

      {/* Quote Builder */}
      <QuoteBuilder />

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
                  <div className="space-y-8">
                    {/* CPU Slider Configuration */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-5 h-5 text-blue-500" />
                          <label className="font-semibold text-gray-700">CPU</label>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {server.cpu}
                          </span>
                          <span className="text-right text-gray-500 text-sm min-w-[60px]">24</span>
                        </div>
                      </div>
                      <div className="relative">
                        <Slider
                          value={[server.cpu]}
                          onValueChange={(value) => updateServer(server.id, 'cpu', value[0])}
                          max={24}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>0</span>
                          <span>6</span>
                          <span>12</span>
                          <span>18</span>
                          <span>24</span>
                        </div>
                      </div>
                    </div>

                    {/* RAM Slider Configuration */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <HardDrive className="w-5 h-5 text-green-500" />
                          <label className="font-semibold text-gray-700">RAM</label>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {server.ram}
                          </span>
                          <span className="text-right text-gray-500 text-sm min-w-[60px]">48</span>
                        </div>
                      </div>
                      <div className="relative">
                        <Slider
                          value={[server.ram]}
                          onValueChange={(value) => updateServer(server.id, 'ram', value[0])}
                          max={48}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>0</span>
                          <span>12</span>
                          <span>24</span>
                          <span>36</span>
                          <span>48</span>
                        </div>
                      </div>
                    </div>

                    {/* SSD Slider Configuration */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <HardDrive className="w-5 h-5 text-purple-500" />
                          <label className="font-semibold text-gray-700">+{server.ssd}GB SSD</label>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                            {server.ssd}
                          </span>
                          <span className="text-right text-gray-500 text-sm min-w-[60px]">100</span>
                        </div>
                      </div>
                      <div className="relative">
                        <Slider
                          value={[server.ssd]}
                          onValueChange={(value) => updateServer(server.id, 'ssd', value[0])}
                          max={100}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>0</span>
                          <span>25</span>
                          <span>50</span>
                          <span>75</span>
                          <span>100</span>
                        </div>
                      </div>
                    </div>

                    {/* OS Selection */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Server className="w-5 h-5 text-gray-500" />
                        <label className="font-semibold text-gray-700">OS</label>
                      </div>
                      <Select
                        value={server.os}
                        onValueChange={(value) => updateServer(server.id, 'os', value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CentOS 7">CentOS 7</SelectItem>
                          <SelectItem value="CentOS 8">CentOS 8</SelectItem>
                          <SelectItem value="Ubuntu 20.04">Ubuntu 20.04</SelectItem>
                          <SelectItem value="Ubuntu 22.04">Ubuntu 22.04</SelectItem>
                          <SelectItem value="Windows Server 2019">Windows Server 2019</SelectItem>
                          <SelectItem value="Windows Server 2022">Windows Server 2022</SelectItem>
                          <SelectItem value="Debian 11">Debian 11</SelectItem>
                          <SelectItem value="Debian 12">Debian 12</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Bandwidth Slider Configuration */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Network className="w-5 h-5 text-cyan-500" />
                          <label className="font-semibold text-gray-700">BỔ SUNG BĂNG THÔNG</label>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium">
                            {server.bandwidth}
                          </span>
                          <span className="text-right text-gray-500 text-sm min-w-[60px]">10</span>
                        </div>
                      </div>
                      <div className="relative">
                        <Slider
                          value={[server.bandwidth]}
                          onValueChange={(value) => updateServer(server.id, 'bandwidth', value[0])}
                          max={10}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>0</span>
                          <span>2</span>
                          <span>4</span>
                          <span>6</span>
                          <span>8</span>
                          <span>10</span>
                        </div>
                      </div>
                    </div>

                    {/* Real-time Cost Display */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-gray-800">Tổng Chi Phí Tháng</h4>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>CPU: {server.cpu} Core × {formatCurrency(componentPricing.cpu.basePrice)} = {formatCurrency(server.cpu * componentPricing.cpu.basePrice)}</div>
                            <div>RAM: {server.ram} GB × {formatCurrency(componentPricing.ram.basePrice)} = {formatCurrency(server.ram * componentPricing.ram.basePrice)}</div>
                            <div>SSD: +{server.ssd} GB × {formatCurrency(componentPricing.ssd.basePrice)} = {formatCurrency(server.ssd * componentPricing.ssd.basePrice)}</div>
                            <div>Bandwidth: +{server.bandwidth} Mbps × {formatCurrency(componentPricing.bandwidth.basePrice)} = {formatCurrency(server.bandwidth * componentPricing.bandwidth.basePrice)}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {formatCurrency(calculateServerCost(server))}
                          </div>
                          <div className="text-sm text-gray-500">VND/tháng</div>
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

                  {/* SSD Component */}
                  <motion.div
                    drag
                    dragSnapToOrigin
                    whileDrag={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                    className="bg-white rounded-lg p-3 border border-purple-200 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <HardDrive className="w-4 h-4 text-purple-500" />
                      <span className="font-semibold text-sm">SSD</span>
                    </div>
                    <p className="text-sm text-gray-600">{server.ssd} GB</p>
                    <p className="text-xs text-green-600 font-medium">
                      {formatCurrency(server.ssd * componentPricing.ssd.basePrice)}
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
                    <p className="text-sm text-gray-600">{server.ipAddress} IP</p>
                    <p className="text-xs text-green-600 font-medium">
                      {formatCurrency(server.ipAddress * componentPricing.ipAddress.basePrice)}
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
                    <p className="text-sm text-gray-600">{server.bandwidth} Mbps</p>
                    <p className="text-xs text-green-600 font-medium">
                      {formatCurrency(server.bandwidth * componentPricing.bandwidth.basePrice)}
                    </p>
                  </motion.div>

                  {/* GPU Component */}
                  {server.gpu > 0 && (
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
                      <p className="text-sm text-gray-600">{server.gpu} RTX A5000</p>
                      <p className="text-xs text-green-600 font-medium">
                        {formatCurrency(server.gpu * componentPricing.gpu.basePrice)}
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