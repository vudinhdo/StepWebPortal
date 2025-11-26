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
  Shield,
  User,
  Mail,
  Phone,
  Building,
  FileText,
  Info,
  CheckCircle,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RobotoRegularBase64, RobotoBoldBase64 } from '@/fonts/roboto-fonts';

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

// Payment cycle discount has been removed - no automatic discount based on months

// Popular GPU options with pricing
const gpuOptions = [
  { value: 'none', label: 'Không cần GPU', price: 0 },
  { value: 'rtx3060', label: 'NVIDIA RTX 3060 (12GB)', price: 1800000 },
  { value: 'rtx3070', label: 'NVIDIA RTX 3070 (8GB)', price: 2200000 },
  { value: 'rtx3080', label: 'NVIDIA RTX 3080 (10GB)', price: 3000000 },
  { value: 'rtx3090', label: 'NVIDIA RTX 3090 (24GB)', price: 4500000 },
  { value: 'rtx4060', label: 'NVIDIA RTX 4060 (8GB)', price: 2500000 },
  { value: 'rtx4070', label: 'NVIDIA RTX 4070 (12GB)', price: 3500000 },
  { value: 'rtx4080', label: 'NVIDIA RTX 4080 (16GB)', price: 5000000 },
  { value: 'rtx4090', label: 'NVIDIA RTX 4090 (24GB)', price: 7500000 },
  { value: 'a4000', label: 'NVIDIA RTX A4000 (16GB)', price: 5000000 },
  { value: 'a5000', label: 'NVIDIA RTX A5000 (24GB)', price: 6000000 },
  { value: 'a6000', label: 'NVIDIA RTX A6000 (48GB)', price: 8500000 },
  { value: 'h100', label: 'NVIDIA H100 (80GB) - AI/ML', price: 15000000 },
  { value: 't4', label: 'NVIDIA Tesla T4 (16GB)', price: 3500000 },
  { value: 'v100', label: 'NVIDIA Tesla V100 (32GB)', price: 8000000 }
];

// Popular Operating Systems
const osOptions = [
  { value: 'ubuntu-22.04', label: 'Ubuntu 22.04 LTS', category: 'Linux', free: true },
  { value: 'ubuntu-20.04', label: 'Ubuntu 20.04 LTS', category: 'Linux', free: true },
  { value: 'centos-8', label: 'CentOS Stream 8', category: 'Linux', free: true },
  { value: 'centos-9', label: 'CentOS Stream 9', category: 'Linux', free: true },
  { value: 'rocky-8', label: 'Rocky Linux 8', category: 'Linux', free: true },
  { value: 'rocky-9', label: 'Rocky Linux 9', category: 'Linux', free: true },
  { value: 'almalinux-8', label: 'AlmaLinux 8', category: 'Linux', free: true },
  { value: 'almalinux-9', label: 'AlmaLinux 9', category: 'Linux', free: true },
  { value: 'debian-11', label: 'Debian 11 (Bullseye)', category: 'Linux', free: true },
  { value: 'debian-12', label: 'Debian 12 (Bookworm)', category: 'Linux', free: true },
  { value: 'fedora-38', label: 'Fedora 38', category: 'Linux', free: true },
  { value: 'windows-2019', label: 'Windows Server 2019', category: 'Windows', free: false, price: 500000 },
  { value: 'windows-2022', label: 'Windows Server 2022', category: 'Windows', free: false, price: 600000 },
  { value: 'windows-trial', label: 'Windows Server Trial (180 ngày)', category: 'Windows Trial', free: true },
  { value: 'custom', label: 'Khác (Tự nhập)', category: 'Custom', free: true }
];

// Additional Paid Services (can be selected per server)
const additionalServices = [
  { 
    id: 'serverManagement', 
    label: 'Server Management', 
    description: 'Quản lý server toàn diện, cài đặt phần mềm',
    price: 1000000,
    unit: '/tháng'
  },
  { 
    id: 'dbOptimization', 
    label: 'Database Optimization', 
    description: 'Tối ưu hóa MySQL, PostgreSQL, MongoDB',
    price: 3000000,
    unit: '/lần (one-time)'
  },
  { 
    id: 'migration', 
    label: 'Migration Service', 
    description: 'Chuyển đổi website/dữ liệu từ hosting khác',
    price: 1000000,
    unit: '/site (one-time)'
  },
  { 
    id: 'loadBalancer', 
    label: 'Load Balancer', 
    description: 'Cân bằng tải cho traffic cao',
    price: 2000000,
    unit: '/tháng'
  },
  { 
    id: 'aiSupport', 
    label: 'AI/ML Support', 
    description: 'Tư vấn setup TensorFlow, PyTorch, CUDA',
    price: 1500000,
    unit: '/tháng'
  },
  { 
    id: 'websiteOptimization', 
    label: 'Dịch vụ tư vấn tối ưu tốc độ website', 
    description: 'Phân tích và tối ưu hóa performance website',
    price: 500000,
    unit: '/lần (one-time)'
  }
];

// Other Services from website (can be added to quote)
const otherServices = [
  { id: 'nvmeHosting', label: 'NVME Hosting', basePrice: 200000, unit: '/tháng' },
  { id: 'wpHosting', label: 'WordPress Hosting', basePrice: 150000, unit: '/tháng' },
  { id: 'laravelHosting', label: 'Laravel Hosting', basePrice: 250000, unit: '/tháng' },
  { id: 'email365', label: 'Email 365', basePrice: 80000, unit: '/user/tháng' },
  { id: 'emailWorkspace', label: 'Email Workspace', basePrice: 150000, unit: '/user/tháng' },
  { id: 'domainReg', label: 'Đăng ký tên miền .com', basePrice: 300000, unit: '/năm' },
  { id: 'domainVn', label: 'Đăng ký tên miền .vn', basePrice: 500000, unit: '/năm' }
];

// Package Templates for quick configuration
const packageTemplates = [
  {
    name: 'Basic - Startup',
    description: 'Phù hợp cho website nhỏ, blog cá nhân',
    cpu: 2,
    ram: 4,
    disk: 40,
    diskType: 'ssd' as const,
    ipAddress: 1,
    bandwidth: 1,
    backup: 0,
    gpu: 'none',
    os: 'ubuntu-22.04'
  },
  {
    name: 'Pro - Business',
    description: 'Cho doanh nghiệp vừa, ứng dụng web',
    cpu: 4,
    ram: 8,
    disk: 100,
    diskType: 'ssd' as const,
    ipAddress: 1,
    bandwidth: 2,
    backup: 50,
    gpu: 'none',
    os: 'ubuntu-22.04'
  },
  {
    name: 'Enterprise - High Performance',
    description: 'Hệ thống lớn, nhiều traffic',
    cpu: 8,
    ram: 16,
    disk: 200,
    diskType: 'ssd' as const,
    ipAddress: 2,
    bandwidth: 5,
    backup: 100,
    gpu: 'none',
    os: 'ubuntu-22.04'
  },
  {
    name: 'AI/ML - Deep Learning',
    description: 'Huấn luyện AI, Machine Learning',
    cpu: 16,
    ram: 64,
    disk: 500,
    diskType: 'ssd' as const,
    ipAddress: 1,
    bandwidth: 3,
    backup: 200,
    gpu: 'rtx4090',
    os: 'ubuntu-22.04'
  },
  {
    name: 'Gaming Server',
    description: 'Server game online, streaming',
    cpu: 8,
    ram: 32,
    disk: 300,
    diskType: 'ssd' as const,
    ipAddress: 1,
    bandwidth: 10,
    backup: 100,
    gpu: 'rtx4070',
    os: 'windows-2022'
  },
  {
    name: 'Database Server',
    description: 'MySQL, PostgreSQL, MongoDB',
    cpu: 8,
    ram: 32,
    disk: 500,
    diskType: 'ssd' as const,
    ipAddress: 1,
    bandwidth: 3,
    backup: 500,
    gpu: 'none',
    os: 'ubuntu-22.04'
  }
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
  customOS: string; // Custom OS name when os === 'custom'
  voucherDiscount: number;
  additionalServices: string[]; // Array of selected additional service IDs
}


interface CustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  company: string;
  taxCode: string;
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
      os: 'ubuntu-22.04',
      customOS: '',
      voucherDiscount: 0,
      additionalServices: []
    }
  ]);
  const [includeVAT, setIncludeVAT] = useState(false);
  const [activeTab, setActiveTab] = useState<'customer' | 'basic' | 'advanced' | 'summary'>('customer');
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    taxCode: ''
  });

  // Helper function to get color tier for resources
  const getResourceColor = (value: number, type: 'cpu' | 'ram' | 'disk' | 'bandwidth') => {
    const thresholds = {
      cpu: { green: 4, yellow: 8 },
      ram: { green: 8, yellow: 16 },
      disk: { green: 100, yellow: 500 },
      bandwidth: { green: 2, yellow: 5 }
    };
    const threshold = thresholds[type];
    if (value <= threshold.green) return 'bg-green-50 border-green-300';
    if (value <= threshold.yellow) return 'bg-yellow-50 border-yellow-300';
    return 'bg-red-50 border-red-300';
  };

  // Helper function to get tier label
  const getTierLabel = (value: number, type: 'cpu' | 'ram' | 'disk' | 'bandwidth') => {
    const thresholds = {
      cpu: { green: 4, yellow: 8 },
      ram: { green: 8, yellow: 16 },
      disk: { green: 100, yellow: 500 },
      bandwidth: { green: 2, yellow: 5 }
    };
    const threshold = thresholds[type];
    if (value <= threshold.green) return { text: 'Cơ bản', color: 'text-green-600 bg-green-100' };
    if (value <= threshold.yellow) return { text: 'Trung bình', color: 'text-yellow-600 bg-yellow-100' };
    return { text: 'Cao cấp', color: 'text-red-600 bg-red-100' };
  };

  // Calculate template price
  const calculateTemplatePrice = (template: typeof packageTemplates[0]) => {
    const cpuCost = template.cpu * componentPricing.cpu.basePrice;
    const ramCost = template.ram * componentPricing.ram.basePrice;
    const diskPrice = template.diskType === 'ssd' ? componentPricing.ssd.basePrice : componentPricing.hdd.basePrice;
    const diskCost = template.disk * diskPrice;
    const ipCost = template.ipAddress > 1 ? (template.ipAddress - 1) * componentPricing.ipAddress.basePrice : 0;
    const bandwidthCost = template.bandwidth > 1 ? (template.bandwidth - 1) * componentPricing.bandwidth.basePrice : 0;
    const backupCost = template.backup * componentPricing.backup.basePrice;
    const gpuOption = gpuOptions.find(gpu => gpu.value === template.gpu);
    const gpuCost = gpuOption ? gpuOption.price : 0;
    return cpuCost + ramCost + diskCost + ipCost + bandwidthCost + backupCost + gpuCost;
  };

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
      os: 'ubuntu-22.04',
      customOS: '',
      voucherDiscount: 0,
      additionalServices: []
    };
    setServers([...servers, newServer]);
  };

  const applyTemplate = (serverId: string, template: typeof packageTemplates[0]) => {
    setServers(servers.map(server => 
      server.id === serverId ? {
        ...server,
        cpu: template.cpu,
        ram: template.ram,
        disk: template.disk,
        diskType: template.diskType,
        ipAddress: template.ipAddress,
        bandwidth: template.bandwidth,
        backup: template.backup,
        gpu: template.gpu,
        os: template.os,
        customOS: '' // Reset custom OS when applying template
      } : server
    ));
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

  const toggleAdditionalService = (serverId: string, serviceId: string) => {
    setServers(servers.map(server => {
      if (server.id === serverId) {
        const hasService = server.additionalServices.includes(serviceId);
        return {
          ...server,
          additionalServices: hasService
            ? server.additionalServices.filter(id => id !== serviceId)
            : [...server.additionalServices, serviceId]
        };
      }
      return server;
    }));
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
    // OS pricing: Windows Server has license cost, Linux is free
    const osOption = osOptions.find(os => os.value === server.os);
    const osCost = osOption && !osOption.free ? (osOption.price || 0) : 0;
    
    // Additional services cost (monthly recurring only)
    const additionalServicesCost = server.additionalServices.reduce((total, serviceId) => {
      const service = additionalServices.find(s => s.id === serviceId);
      // Only add monthly services to monthly cost
      if (service && service.unit.includes('/tháng')) {
        return total + service.price;
      }
      return total;
    }, 0);
    
    const subtotal = cpuCost + ramCost + diskCost + ipCost + bandwidthCost + backupCost + gpuCost + osCost + additionalServicesCost;
    
    // Apply voucher discount (before VAT)
    const afterVoucherPrice = subtotal * (1 - server.voucherDiscount / 100);
    
    // Apply VAT if enabled (10%)
    const finalPrice = includeVAT ? afterVoucherPrice * 1.1 : afterVoucherPrice;
    
    return finalPrice;
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

  const generatePDFQuote = async () => {
    // Validate customer email
    if (!customerInfo.email || !customerInfo.email.includes('@')) {
      alert('Vui lòng nhập email hợp lệ trước khi xuất báo giá!');
      return;
    }
    
    // Validate custom OS entries
    const serversWithEmptyCustomOS = servers.filter(s => s.os === 'custom' && !s.customOS.trim());
    if (serversWithEmptyCustomOS.length > 0) {
      alert('Vui lòng nhập tên hệ điều hành cho các server đã chọn "Khác (Tự nhập)"!');
      return;
    }
    
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString('vi-VN');
    
    // Add Vietnamese fonts
    doc.addFileToVFS("Roboto-Regular.ttf", RobotoRegularBase64);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    doc.addFileToVFS("Roboto-Bold.ttf", RobotoBoldBase64);
    doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");
    
    // Header - Company Info
    doc.setFontSize(16);
    doc.setFont('Roboto', 'bold');
    doc.text('CÔNG TY CỔ PHẦN ĐẦU TƯ CÔNG NGHỆ STEP', 105, 20, { align: 'center' });
    
    doc.setFontSize(9);
    doc.setFont('Roboto', 'normal');
    doc.text('Địa chỉ: Xóm 9, Khu 3, Xã Quốc Oai, Hà Nội', 105, 27, { align: 'center' });
    doc.text('Văn phòng: Số 99 Hoàng Ngân - Phường Nhân Chính - Quận Thanh Xuân - Tp. Hà Nội', 105, 32, { align: 'center' });
    doc.text('Email: info@step.com.vn | Website: http://step.com.vn/', 105, 37, { align: 'center' });
    doc.text('MST: 0108230633', 105, 42, { align: 'center' });
    
    // Divider line
    doc.setDrawColor(41, 128, 185);
    doc.setLineWidth(0.5);
    doc.line(15, 45, 195, 45);
    
    // Title
    doc.setFontSize(16);
    doc.setFont('Roboto', 'bold');
    doc.text('BÁO GIÁ CLOUD SERVER', 105, 53, { align: 'center' });
    
    // Date
    doc.setFontSize(10);
    doc.setFont('Roboto', 'normal');
    doc.text(`Ngày: ${currentDate}`, 105, 60, { align: 'center' });
    
    let yPosition = 68;
    
    // Customer Info Section
    if (customerInfo.fullName || customerInfo.email || customerInfo.company) {
      doc.setFontSize(11);
      doc.setFont('Roboto', 'bold');
      doc.text('THÔNG TIN KHÁCH HÀNG', 15, yPosition);
      yPosition += 6;
      
      doc.setFont('Roboto', 'normal');
      doc.setFontSize(10);
      
      if (customerInfo.fullName) {
        doc.text(`Họ tên: ${customerInfo.fullName}`, 15, yPosition);
        yPosition += 5;
      }
      if (customerInfo.email) {
        doc.text(`Email: ${customerInfo.email}`, 15, yPosition);
        yPosition += 5;
      }
      if (customerInfo.phone) {
        doc.text(`Điện thoại: ${customerInfo.phone}`, 15, yPosition);
        yPosition += 5;
      }
      if (customerInfo.company) {
        doc.text(`Công ty: ${customerInfo.company}`, 15, yPosition);
        yPosition += 5;
      }
      if (customerInfo.taxCode) {
        doc.text(`Mã số thuế: ${customerInfo.taxCode}`, 15, yPosition);
        yPosition += 5;
      }
      
      yPosition += 3;
    } else {
      doc.setFontSize(11);
      doc.setFont('Roboto', 'bold');
      doc.text('Kính gửi: Quý khách hàng', 15, yPosition);
      yPosition += 7;
    }
    
    doc.setFont('Roboto', 'normal');
    doc.text('STEP xin gửi tới Quý khách hàng báo giá dịch vụ Cloud Server như sau:', 15, yPosition);
    
    yPosition += 8;
    
    // Server Details
    servers.forEach((server, index) => {
      // Check if we need a new page
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFont('Roboto', 'bold');
      doc.setFontSize(12);
      doc.text(`${index + 1}. ${server.name}`, 15, yPosition);
      yPosition += 8;
      
      // Component details table
      const componentData: any[] = [];
      
      // CPU
      componentData.push([
        'CPU',
        `${server.cpu} Core`,
        formatCurrency(server.cpu * componentPricing.cpu.basePrice)
      ]);
      
      // RAM
      componentData.push([
        'RAM',
        `${server.ram} GB`,
        formatCurrency(server.ram * componentPricing.ram.basePrice)
      ]);
      
      // Disk
      componentData.push([
        `Ổ cứng ${server.diskType.toUpperCase()}`,
        `${server.disk} GB`,
        formatCurrency(server.disk * (server.diskType === 'ssd' ? componentPricing.ssd.basePrice : componentPricing.hdd.basePrice))
      ]);
      
      // IP
      const ipCost = server.ipAddress > 1 ? (server.ipAddress - 1) * componentPricing.ipAddress.basePrice : 0;
      componentData.push([
        'IP Tĩnh',
        `${server.ipAddress} IP ${server.ipAddress === 1 ? '(miễn phí)' : `(${server.ipAddress - 1} tính phí)`}`,
        formatCurrency(ipCost)
      ]);
      
      // Bandwidth
      const bandwidthCost = server.bandwidth > 1 ? (server.bandwidth - 1) * componentPricing.bandwidth.basePrice : 0;
      componentData.push([
        'Băng thông',
        `${server.bandwidth}x100Mbps ${server.bandwidth === 1 ? '(miễn phí)' : `(${server.bandwidth - 1} tính phí)`}`,
        formatCurrency(bandwidthCost)
      ]);
      
      // Backup
      if (server.backup > 0) {
        componentData.push([
          'Backup',
          `${server.backup} GB`,
          formatCurrency(server.backup * componentPricing.backup.basePrice)
        ]);
      }
      
      // Dedicated GPU
      if (server.gpu !== 'none') {
        const gpuOption = gpuOptions.find(g => g.value === server.gpu);
        componentData.push([
          'Dedicated GPU',
          gpuOption?.label || '',
          formatCurrency(gpuOption?.price || 0)
        ]);
      }
      
      // OS
      const osOptionPDF = osOptions.find(o => o.value === server.os);
      const osLabelPDF = server.os === 'custom' 
        ? (server.customOS || 'Hệ điều hành tùy chỉnh')
        : (osOptionPDF?.label || server.os);
      componentData.push([
        'Hệ điều hành',
        osLabelPDF,
        osOptionPDF && !osOptionPDF.free ? formatCurrency(osOptionPDF.price || 0) : 'Miễn phí'
      ]);
      
      // Payment cycle
      componentData.push([
        'Chu kỳ thanh toán',
        `${server.paymentCycle} tháng`,
        ''
      ]);
      
      // Voucher discount
      if (server.voucherDiscount > 0) {
        componentData.push([
          'Voucher giảm giá',
          `${server.voucherDiscount}%`,
          'Trước VAT'
        ]);
      }
      
      autoTable(doc, {
        startY: yPosition,
        head: [['Thành phần', 'Cấu hình', 'Đơn giá']],
        body: componentData,
        theme: 'grid',
        styles: { font: 'Roboto', fontSize: 9 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
        margin: { left: 15, right: 15 }
      });
      
      yPosition = (doc as any).lastAutoTable.finalY + 5;
      
      // Additional Services table (if any selected)
      if (server.additionalServices.length > 0) {
        // Check if we need a new page
        if (yPosition > 240) {
          doc.addPage();
          yPosition = 20;
        }
        
        const additionalServicesData: any[] = [];
        let oneTimeTotal = 0;
        let monthlyTotal = 0;
        
        server.additionalServices.forEach(serviceId => {
          const service = additionalServices.find(s => s.id === serviceId);
          if (service) {
            const isMonthly = service.unit.includes('/tháng');
            additionalServicesData.push([
              service.label,
              service.description,
              formatCurrency(service.price),
              service.unit
            ]);
            
            if (isMonthly) {
              monthlyTotal += service.price;
            } else {
              oneTimeTotal += service.price;
            }
          }
        });
        
        doc.setFont('Roboto', 'bold');
        doc.setFontSize(11);
        doc.text('Dịch vụ bổ sung:', 15, yPosition);
        yPosition += 5;
        
        autoTable(doc, {
          startY: yPosition,
          head: [['Dịch vụ', 'Mô tả', 'Giá', 'Đơn vị']],
          body: additionalServicesData,
          theme: 'grid',
          styles: { font: 'Roboto', fontSize: 9 },
          headStyles: { fillColor: [76, 175, 80], textColor: 255, fontStyle: 'bold' },
          margin: { left: 15, right: 15 }
        });
        
        yPosition = (doc as any).lastAutoTable.finalY + 5;
        
        // Show breakdown of one-time vs monthly
        doc.setFont('Roboto', 'normal');
        doc.setFontSize(9);
        if (oneTimeTotal > 0) {
          doc.text(`  • Phí khởi tạo (một lần): ${formatCurrency(oneTimeTotal)}`, 15, yPosition);
          yPosition += 4;
        }
        if (monthlyTotal > 0) {
          doc.text(`  • Phí hàng tháng: ${formatCurrency(monthlyTotal)}`, 15, yPosition);
          yPosition += 4;
        }
        yPosition += 3;
      }
      
      // Calculate breakdown for display
      const cpuCostPDF = server.cpu * componentPricing.cpu.basePrice;
      const ramCostPDF = server.ram * componentPricing.ram.basePrice;
      const diskCostPDF = server.disk * (server.diskType === 'ssd' ? componentPricing.ssd.basePrice : componentPricing.hdd.basePrice);
      const ipCostPDF = server.ipAddress > 1 ? (server.ipAddress - 1) * componentPricing.ipAddress.basePrice : 0;
      const bandwidthCostPDF = server.bandwidth > 1 ? (server.bandwidth - 1) * componentPricing.bandwidth.basePrice : 0;
      const backupCostPDF = server.backup * componentPricing.backup.basePrice;
      const gpuOptionPDF = gpuOptions.find(g => g.value === server.gpu);
      const gpuCostPDF = gpuOptionPDF ? gpuOptionPDF.price : 0;
      const osOptionPDF2 = osOptions.find(o => o.value === server.os);
      const osCostPDF = osOptionPDF2 && !osOptionPDF2.free ? (osOptionPDF2.price || 0) : 0;
      
      // Additional services cost (monthly recurring only)
      const additionalServicesCostPDF = server.additionalServices.reduce((total, serviceId) => {
        const service = additionalServices.find(s => s.id === serviceId);
        if (service && service.unit.includes('/tháng')) {
          return total + service.price;
        }
        return total;
      }, 0);
      
      const subtotalPDF = cpuCostPDF + ramCostPDF + diskCostPDF + ipCostPDF + bandwidthCostPDF + backupCostPDF + gpuCostPDF + osCostPDF + additionalServicesCostPDF;
      const voucherAmountPDF = subtotalPDF * server.voucherDiscount / 100;
      const afterVoucherPDF = subtotalPDF - voucherAmountPDF;
      const vatAmountPDF = includeVAT ? afterVoucherPDF * 0.1 : 0;
      const finalPricePDF = afterVoucherPDF + vatAmountPDF;
      
      // Server cost breakdown
      doc.setFont('Roboto', 'normal');
      doc.setFontSize(10);
      if (server.voucherDiscount > 0) {
        doc.text(`Voucher giảm giá (${server.voucherDiscount}%): -${formatCurrency(voucherAmountPDF)}`, 15, yPosition);
        yPosition += 5;
      }
      if (includeVAT) {
        doc.text(`VAT (10%): +${formatCurrency(vatAmountPDF)}`, 15, yPosition);
        yPosition += 5;
      }
      
      doc.setFont('Roboto', 'bold');
      doc.setFontSize(11);
      doc.text(`Thành tiền: ${formatCurrency(finalPricePDF)}/tháng ${includeVAT ? '(Đã VAT)' : '(Chưa VAT)'}`, 15, yPosition);
      yPosition += 10;
    });
    
    // Grand Total
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setDrawColor(41, 128, 185);
    doc.setLineWidth(0.5);
    doc.line(15, yPosition, 195, yPosition);
    yPosition += 8;
    
    doc.setFont('Roboto', 'bold');
    doc.setFontSize(14);
    doc.text(`TỔNG CỘNG: ${formatCurrency(calculateTotalCost())}/tháng ${includeVAT ? '(Đã VAT)' : '(Chưa VAT)'}`, 105, yPosition, { align: 'center' });
    yPosition += 12;
    
    // Terms and Notes
    doc.setFont('Roboto', 'bold');
    doc.setFontSize(11);
    doc.text('Ghi chú:', 15, yPosition);
    yPosition += 6;
    
    doc.setFont('Roboto', 'normal');
    doc.setFontSize(9);
    const notes = [
      includeVAT ? '- Giá trên đã bao gồm VAT (10%)' : '- Giá trên chưa bao gồm VAT (10%)',
      '- IP đầu tiên và 100Mbps băng thông đầu tiên được miễn phí',
      '- Miễn phí: SSL Certificate, Monitoring & Alert, 24/7 Support',
      '- Chu kỳ thanh toán linh hoạt từ 1-60 tháng',
      '- Voucher giảm giá được áp dụng trước VAT',
      '- Báo giá có hiệu lực trong 30 ngày kể từ ngày phát hành',
      '- Dịch vụ bổ sung bao gồm cả phí khởi tạo (một lần) và phí hàng tháng'
    ];
    
    notes.forEach(note => {
      doc.text(note, 15, yPosition);
      yPosition += 5;
    });
    
    // Payment Information
    yPosition += 5;
    doc.setFont('Roboto', 'bold');
    doc.setFontSize(11);
    doc.text('TÀI KHOẢN NHẬN THANH TOÁN', 15, yPosition);
    yPosition += 6;
    
    doc.setFont('Roboto', 'normal');
    doc.setFontSize(9);
    doc.text('• Chủ tài khoản : Công Ty Cổ Phần Đầu Tư Công Nghệ Step', 15, yPosition);
    yPosition += 5;
    doc.text('• Số tài khoản : 6223399', 15, yPosition);
    yPosition += 5;
    doc.text('• Ngân hàng : Ngân hàng Thương mại Cổ phần Hàng Hải Việt Nam', 15, yPosition);
    
    // Footer
    yPosition = 280;
    doc.setFont('Roboto', 'normal');
    doc.setFontSize(8);
    doc.text('Trân trọng cảm ơn Quý khách hàng đã tin tưởng và lựa chọn dịch vụ của STEP!', 105, yPosition, { align: 'center' });
    
    // Save PDF
    const fileName = `Bao-gia-Cloud-Server-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    
    if (onQuoteGenerated) {
      onQuoteGenerated(servers);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Tự Xây Dựng Cấu Hình Cloud Server
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          Tùy chỉnh cấu hình server theo nhu cầu của bạn
        </p>
      </div>

      {/* Main Layout: 2 columns on desktop, 1 column on mobile */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="w-full">
            <TabsList className="w-full grid grid-cols-4 mb-6 h-auto">
              <TabsTrigger value="customer" className="text-xs md:text-sm py-2 md:py-3 flex flex-col md:flex-row items-center gap-1">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Khách hàng</span>
                <span className="sm:hidden">KH</span>
              </TabsTrigger>
              <TabsTrigger value="basic" className="text-xs md:text-sm py-2 md:py-3 flex flex-col md:flex-row items-center gap-1">
                <Server className="w-4 h-4" />
                <span className="hidden sm:inline">Cấu hình</span>
                <span className="sm:hidden">CH</span>
              </TabsTrigger>
              <TabsTrigger value="advanced" className="text-xs md:text-sm py-2 md:py-3 flex flex-col md:flex-row items-center gap-1">
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">Nâng cao</span>
                <span className="sm:hidden">NC</span>
              </TabsTrigger>
              <TabsTrigger value="summary" className="text-xs md:text-sm py-2 md:py-3 flex flex-col md:flex-row items-center gap-1">
                <Calculator className="w-4 h-4" />
                <span className="hidden sm:inline">Tổng kết</span>
                <span className="sm:hidden">TK</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: Customer Information */}
            <TabsContent value="customer" className="space-y-6">
              {/* Quick Guide - Collapsible on mobile */}
              <details className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200">
                <summary className="p-4 cursor-pointer font-semibold text-blue-800 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Hướng Dẫn Nhanh (nhấn để mở)
                </summary>
                <div className="px-4 pb-4 space-y-2 text-sm text-gray-700">
                  <p>1. Điền thông tin khách hàng (email bắt buộc)</p>
                  <p>2. Chọn gói mẫu hoặc tùy chỉnh cấu hình</p>
                  <p>3. Thêm dịch vụ bổ sung nếu cần</p>
                  <p>4. Xuất báo giá PDF</p>
                </div>
              </details>

      {/* Customer Information Form */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-md border-2 border-green-200">
        <div className="p-6 border-b border-green-200 bg-green-100 rounded-t-lg">
          <h3 className="text-xl font-semibold flex items-center gap-2 text-green-800">
            <User className="w-6 h-6" />
            Thông Tin Khách Hàng
          </h3>
          <p className="text-sm text-green-700 mt-2">Vui lòng điền thông tin để nhận báo giá chính xác</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="customer-name" className="flex items-center gap-2 text-base font-semibold">
                <User className="w-4 h-4 text-green-600" />
                Họ và tên
              </Label>
              <Input
                id="customer-name"
                data-testid="input-customer-name"
                type="text"
                value={customerInfo.fullName}
                onChange={(e) => setCustomerInfo({ ...customerInfo, fullName: e.target.value })}
                placeholder="Nguyễn Văn A"
                className="border-green-300 focus:border-green-500"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="customer-phone" className="flex items-center gap-2 text-base font-semibold">
                <Phone className="w-4 h-4 text-green-600" />
                Số điện thoại
              </Label>
              <Input
                id="customer-phone"
                data-testid="input-customer-phone"
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                placeholder="0985.636.289"
                className="border-green-300 focus:border-green-500"
              />
            </div>

            {/* Email (Required) */}
            <div className="space-y-2">
              <Label htmlFor="customer-email" className="flex items-center gap-2 text-base font-semibold">
                <Mail className="w-4 h-4 text-red-600" />
                Email <span className="text-red-600">*</span>
              </Label>
              <Input
                id="customer-email"
                data-testid="input-customer-email"
                type="email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                placeholder="email@company.com"
                className="border-green-300 focus:border-green-500"
                required
              />
            </div>

            {/* Company */}
            <div className="space-y-2">
              <Label htmlFor="customer-company" className="flex items-center gap-2 text-base font-semibold">
                <Building className="w-4 h-4 text-green-600" />
                Công ty
              </Label>
              <Input
                id="customer-company"
                data-testid="input-customer-company"
                type="text"
                value={customerInfo.company}
                onChange={(e) => setCustomerInfo({ ...customerInfo, company: e.target.value })}
                placeholder="Công ty ABC"
                className="border-green-300 focus:border-green-500"
              />
            </div>

            {/* Tax Code */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="customer-tax-code" className="flex items-center gap-2 text-base font-semibold">
                <FileText className="w-4 h-4 text-green-600" />
                Mã số thuế
              </Label>
              <Input
                id="customer-tax-code"
                data-testid="input-customer-tax-code"
                type="text"
                value={customerInfo.taxCode}
                onChange={(e) => setCustomerInfo({ ...customerInfo, taxCode: e.target.value })}
                placeholder="0108230633"
                className="border-green-300 focus:border-green-500"
              />
              </div>
            </div>
          </div>
        </div>

              {/* Quick Presets with Pricing - Inside Customer Tab */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 md:p-6 border-2 border-purple-200">
                <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2 text-purple-800">
                  <Zap className="w-5 h-5 md:w-6 md:h-6" />
                  Chọn Nhanh Gói Mẫu
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {packageTemplates.map((template, index) => {
                    const price = calculateTemplatePrice(template);
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white rounded-lg p-3 md:p-4 border-2 border-purple-200 hover:border-purple-400 transition-all cursor-pointer"
                        onClick={() => {
                          if (servers[0]) {
                            applyTemplate(servers[0].id, template);
                            setActiveTab('basic');
                          }
                        }}
                        data-testid={`preset-${template.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-sm md:text-base text-gray-800">{template.name}</h4>
                          <span className="text-xs md:text-sm font-bold text-purple-600 whitespace-nowrap">
                            {formatCurrency(price)}/th
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{template.description}</p>
                        <div className="flex flex-wrap gap-1 text-xs">
                          <span className={`px-2 py-0.5 rounded ${getTierLabel(template.cpu, 'cpu').color}`}>
                            {template.cpu} CPU
                          </span>
                          <span className={`px-2 py-0.5 rounded ${getTierLabel(template.ram, 'ram').color}`}>
                            {template.ram}GB RAM
                          </span>
                          <span className={`px-2 py-0.5 rounded ${getTierLabel(template.disk, 'disk').color}`}>
                            {template.disk}GB {template.diskType.toUpperCase()}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Button */}
              <div className="flex justify-end">
                <Button onClick={() => setActiveTab('basic')} className="bg-blue-600 hover:bg-blue-700">
                  Tiếp tục cấu hình <span className="ml-2">→</span>
                </Button>
              </div>
            </TabsContent>

            {/* Tab 2: Basic Configuration */}
            <TabsContent value="basic" className="space-y-6">
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
                    {/* Payment Cycle Input */}
                    <div className="space-y-3 col-span-full">
                      <Label className="flex items-center gap-2 text-base font-semibold">
                        <Calendar className="w-5 h-5 text-purple-500" />
                        Chu kỳ thanh toán (tháng)
                      </Label>
                      <Input
                        type="number"
                        value={server.paymentCycle}
                        onChange={(e) => updateServer(server.id, 'paymentCycle', Math.min(60, Math.max(1, parseInt(e.target.value) || 1)))}
                        min="1"
                        max="60"
                        className="text-center text-lg font-semibold"
                        data-testid={`input-payment-cycle-${server.id}`}
                      />
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <p className="text-sm text-purple-800 font-medium">
                          📅 Chu kỳ thanh toán linh hoạt từ 1-60 tháng
                        </p>
                        <p className="text-xs text-purple-600 mt-1">
                          Chọn chu kỳ thanh toán phù hợp với nhu cầu của bạn
                        </p>
                      </div>
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
                    <div className="space-y-3 col-span-full">
                      <Label className="flex items-center gap-2 text-base font-semibold">
                        <Zap className="w-5 h-5 text-yellow-500" />
                        Dedicated GPU (Chọn 1 loại)
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-2 bg-gray-50 rounded-lg">
                        {gpuOptions.map((gpu) => {
                          const isSelected = server.gpu === gpu.value;
                          return (
                            <div
                              key={`gpu-${server.id}-${gpu.value}`}
                              onClick={() => updateServer(server.id, 'gpu', gpu.value)}
                              className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                isSelected 
                                  ? 'border-yellow-500 bg-yellow-100' 
                                  : 'border-gray-300 bg-white hover:border-yellow-400'
                              }`}
                              data-testid={`checkbox-gpu-${gpu.value}-${server.id}`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                                  isSelected ? 'border-yellow-600 bg-yellow-600' : 'border-gray-300 bg-white'
                                }`}>
                                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold text-gray-800 text-sm">{gpu.label}</div>
                                  {gpu.price > 0 && (
                                    <div className="text-xs text-yellow-700 mt-1">+{formatCurrency(gpu.price)}/tháng</div>
                                  )}
                                  {gpu.price === 0 && (
                                    <div className="text-xs text-green-600 mt-1">Miễn phí</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* OS Selection */}
                    <div className="space-y-3 col-span-full">
                      <Label className="flex items-center gap-2 text-base font-semibold">
                        <Server className="w-5 h-5 text-gray-500" />
                        Operating System (Chọn 1 loại)
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-2 bg-gray-50 rounded-lg">
                        {osOptions.map((os) => {
                          const isSelected = server.os === os.value;
                          return (
                            <div
                              key={`os-${server.id}-${os.value}`}
                              onClick={() => updateServer(server.id, 'os', os.value)}
                              className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                isSelected 
                                  ? 'border-blue-500 bg-blue-100' 
                                  : 'border-gray-300 bg-white hover:border-blue-400'
                              }`}
                              data-testid={`checkbox-os-${os.value}-${server.id}`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                                  isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'
                                }`}>
                                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold text-gray-800 text-sm">{os.label}</div>
                                  {os.free && (
                                    <div className="text-xs text-green-600 mt-1">Miễn phí</div>
                                  )}
                                  {!os.free && os.price && (
                                    <div className="text-xs text-blue-700 mt-1">+{formatCurrency(os.price)}/tháng</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Custom OS Input - Only shown when "Khác (Tự nhập)" is selected */}
                      {server.os === 'custom' && (
                        <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
                          <Label className="flex items-center gap-2 text-sm font-semibold text-blue-800 mb-2">
                            <Info className="w-4 h-4" />
                            Nhập tên hệ điều hành tùy chỉnh
                          </Label>
                          <Input
                            type="text"
                            value={server.customOS}
                            onChange={(e) => updateServer(server.id, 'customOS', e.target.value)}
                            placeholder="Ví dụ: Ubuntu 24.04, CentOS 7, Alpine Linux..."
                            className="text-sm"
                            data-testid={`input-custom-os-${server.id}`}
                          />
                          <p className="text-xs text-gray-600 mt-2">
                            Hệ điều hành tùy chỉnh luôn miễn phí
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Voucher Discount */}
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2 text-base font-semibold">
                        <Calculator className="w-5 h-5 text-pink-500" />
                        Voucher Giảm Giá (%)
                      </Label>
                      <Input
                        type="number"
                        value={server.voucherDiscount}
                        onChange={(e) => updateServer(server.id, 'voucherDiscount', Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))}
                        min="0"
                        max="100"
                        className="text-center text-lg font-semibold"
                        data-testid={`input-voucher-${server.id}`}
                      />
                      <div className="text-xs text-gray-500 text-center">
                        Giảm giá trước VAT (0-100%)
                      </div>
                    </div>
                  </div>

                  {/* Additional Services Selection */}
                  <div className="col-span-full mt-6">
                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-6 border-2 border-amber-200">
                      <h4 className="font-semibold text-amber-900 mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Dịch Vụ Bổ Sung (Tùy chọn)
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {additionalServices.map((service) => {
                          const isSelected = server.additionalServices.includes(service.id);
                          return (
                            <div
                              key={service.id}
                              onClick={() => toggleAdditionalService(server.id, service.id)}
                              className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                isSelected 
                                  ? 'border-amber-500 bg-amber-100' 
                                  : 'border-amber-200 bg-white hover:border-amber-400'
                              }`}
                              data-testid={`checkbox-service-${service.id}-${server.id}`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                                  isSelected ? 'border-amber-600 bg-amber-600' : 'border-gray-300 bg-white'
                                }`}>
                                  {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold text-gray-800 flex items-center justify-between">
                                    <span>{service.label}</span>
                                    <span className="text-sm text-amber-700">{formatCurrency(service.price)}{service.unit}</span>
                                  </div>
                                  <p className="text-xs text-gray-600 mt-1">{service.description}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Real-time Cost Display */}
                  <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Calculator className="w-5 h-5" />
                      Chi Tiết Tính Giá
                    </h4>
                    
                    {/* Server Components */}
                    <div className="mb-4">
                      <h5 className="font-semibold text-gray-700 mb-2 text-sm">Cấu hình Server:</h5>
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
                            <span>Dedicated GPU: {gpuOptions.find(g => g.value === server.gpu)?.label}</span>
                            <span>{formatCurrency(gpuOptions.find(g => g.value === server.gpu)?.price || 0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>OS: {(() => {
                              if (server.os === 'custom') {
                                return server.customOS || 'Hệ điều hành tùy chỉnh';
                              }
                              return osOptions.find(o => o.value === server.os)?.label || server.os;
                            })()}</span>
                            <span>{(() => {
                              const osOption = osOptions.find(o => o.value === server.os);
                              return osOption && !osOption.free ? formatCurrency(osOption.price || 0) : 'Miễn phí';
                            })()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Services (if any) */}
                    {server.additionalServices.length > 0 && (
                      <div className="mb-4 pt-3 border-t border-gray-300">
                        <h5 className="font-semibold text-gray-700 mb-2 text-sm">Dịch vụ bổ sung:</h5>
                        <div className="space-y-2 text-sm text-gray-600">
                          {server.additionalServices.map(serviceId => {
                            const service = additionalServices.find(s => s.id === serviceId);
                            if (!service) return null;
                            const isMonthly = service.unit.includes('/tháng');
                            return (
                              <div key={serviceId} className="flex justify-between">
                                <span className="flex items-center gap-2">
                                  <span>{service.label}</span>
                                  <span className="text-xs text-gray-500">({service.unit})</span>
                                </span>
                                <span className={isMonthly ? 'font-medium' : 'text-gray-500'}>
                                  {formatCurrency(service.price)}
                                  {!isMonthly && <span className="text-xs ml-1">(một lần)</span>}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Calculation Summary */}
                    <div className="pt-3 border-t border-gray-300">
                      {(() => {
                        const cpuCost = server.cpu * componentPricing.cpu.basePrice;
                        const ramCost = server.ram * componentPricing.ram.basePrice;
                        const diskCost = server.disk * (server.diskType === 'ssd' ? componentPricing.ssd.basePrice : componentPricing.hdd.basePrice);
                        const ipCost = server.ipAddress > 1 ? (server.ipAddress - 1) * componentPricing.ipAddress.basePrice : 0;
                        const bandwidthCost = server.bandwidth > 1 ? (server.bandwidth - 1) * componentPricing.bandwidth.basePrice : 0;
                        const backupCost = server.backup * componentPricing.backup.basePrice;
                        const gpuCost = gpuOptions.find(g => g.value === server.gpu)?.price || 0;
                        const osOption = osOptions.find(o => o.value === server.os);
                        const osCost = osOption && !osOption.free ? (osOption.price || 0) : 0;
                        
                        // Additional services cost (monthly recurring only)
                        const additionalServicesCost = server.additionalServices.reduce((total, serviceId) => {
                          const service = additionalServices.find(s => s.id === serviceId);
                          if (service && service.unit.includes('/tháng')) {
                            return total + service.price;
                          }
                          return total;
                        }, 0);
                        
                        const subtotal = cpuCost + ramCost + diskCost + ipCost + bandwidthCost + backupCost + gpuCost + osCost + additionalServicesCost;
                        const voucherAmount = subtotal * server.voucherDiscount / 100;
                        const afterVoucher = subtotal - voucherAmount;
                        const vatAmount = includeVAT ? afterVoucher * 0.1 : 0;
                        
                        return (
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-gray-700 font-medium">
                              <span>Tạm tính (Server + Dịch vụ hàng tháng):</span>
                              <span>{formatCurrency(subtotal)}</span>
                            </div>
                            {server.voucherDiscount > 0 && (
                              <div className="flex justify-between text-pink-600 font-medium">
                                <span>Voucher giảm giá ({server.voucherDiscount}%):</span>
                                <span>-{formatCurrency(voucherAmount)}</span>
                              </div>
                            )}
                            {includeVAT && (
                              <div className="flex justify-between text-orange-600 font-medium">
                                <span>VAT (10%):</span>
                                <span>+{formatCurrency(vatAmount)}</span>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>

                    <div className="border-t-2 border-blue-300 pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <div className="text-lg font-semibold text-gray-800">
                          Tổng chi phí hàng tháng
                          {!includeVAT && <span className="text-sm text-red-600 ml-2">(Chưa VAT)</span>}
                          {includeVAT && <span className="text-sm text-green-600 ml-2">(Đã VAT)</span>}
                        </div>
                        <div className="text-2xl font-bold text-blue-600" data-testid={`total-cost-${server.id}`}>
                          {formatCurrency(calculateServerCost(server))}/tháng
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Chu kỳ thanh toán: {server.paymentCycle} tháng | 
                        Tổng thanh toán: {formatCurrency(calculateServerCost(server) * server.paymentCycle)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>


      {/* Summary and Actions */}
      <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
        <div className="flex flex-col gap-4">
          {/* VAT Toggle */}
          <div className="flex justify-center sm:justify-start">
            <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg border border-gray-200">
              <Label htmlFor="vat-toggle" className="text-sm font-medium cursor-pointer">
                Bao gồm VAT (10%)
              </Label>
              <Switch
                id="vat-toggle"
                checked={includeVAT}
                onCheckedChange={setIncludeVAT}
                data-testid="switch-vat"
              />
            </div>
          </div>

          {/* Total Cost and PDF Export */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="text-center sm:text-left w-full sm:w-auto">
              <p className="text-sm text-gray-600">
                Tổng chi phí ({servers.length} server) 
                {!includeVAT && <span className="text-red-600 ml-1">(Chưa VAT)</span>}
                {includeVAT && <span className="text-green-600 ml-1">(Đã VAT)</span>}
              </p>
              <p className="text-2xl md:text-3xl font-bold text-blue-600" data-testid="total-cost-all">
                {formatCurrency(calculateTotalCost())}/tháng
              </p>
            </div>
            
            <Button
              onClick={generatePDFQuote}
              className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto text-base py-6"
              data-testid="button-export-pdf"
            >
              <Download className="w-5 h-5 mr-2" />
              Xuất Báo Giá PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Chi Tiết Báo Giá - Kéo Thả Cấu Hình */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Chi Tiết Báo Giá - Kéo Thả Cấu Hình
          </h3>
          <p className="text-sm text-gray-600 mt-2">Kéo thả các thành phần để xem cấu hình server của bạn</p>
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
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
                        <span className="font-semibold text-sm">Dedicated GPU</span>
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
                      <span className="text-sm font-semibold text-blue-600">1M VND/tháng</span>
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
                      <span className="text-sm font-semibold text-blue-600">3M - 5M VND/lần</span>
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
                <h4 className="font-semibold text-yellow-800 mb-2">Cam Kết Dịch Vụ (SLA)</h4>
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
                    <span className="text-yellow-700">Hoàn tiền 100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

              {/* Add Server Button */}
              <div className="flex justify-center">
                <Button
                  onClick={addServer}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto sm:min-w-[200px] text-base py-6"
                  data-testid="button-add-server"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Thêm Server Mới
                </Button>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab('customer')}>
                  <span className="mr-2">←</span> Quay lại
                </Button>
                <Button onClick={() => setActiveTab('advanced')} className="bg-blue-600 hover:bg-blue-700">
                  Nâng cao <span className="ml-2">→</span>
                </Button>
              </div>
            </TabsContent>

            {/* Tab 3: Advanced Options */}
            <TabsContent value="advanced" className="space-y-6">
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-6 border-2 border-amber-200">
                <h4 className="font-semibold text-amber-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Dịch Vụ Bổ Sung (Tùy chọn)
                </h4>
                <p className="text-sm text-gray-600 mb-4">Các dịch vụ hỗ trợ chuyên sâu cho server của bạn</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {additionalServices.map((service) => {
                    const isSelected = servers[0]?.additionalServices.includes(service.id);
                    return (
                      <div
                        key={service.id}
                        onClick={() => servers[0] && toggleAdditionalService(servers[0].id, service.id)}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-amber-500 bg-amber-100' 
                            : 'border-amber-200 bg-white hover:border-amber-400'
                        }`}
                        data-testid={`checkbox-service-${service.id}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                            isSelected ? 'border-amber-600 bg-amber-600' : 'border-gray-300 bg-white'
                          }`}>
                            {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800 flex items-center justify-between">
                              <span className="text-sm">{service.label}</span>
                              <span className="text-xs text-amber-700">{formatCurrency(service.price)}{service.unit}</span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">{service.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab('basic')}>
                  <span className="mr-2">←</span> Quay lại
                </Button>
                <Button onClick={() => setActiveTab('summary')} className="bg-green-600 hover:bg-green-700">
                  Xem tổng kết <span className="ml-2">→</span>
                </Button>
              </div>
            </TabsContent>

            {/* Tab 4: Summary */}
            <TabsContent value="summary" className="space-y-6">
              {/* VAT Toggle */}
              <div className="flex justify-center">
                <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg border border-gray-200">
                  <Label htmlFor="vat-toggle-tab" className="text-sm font-medium cursor-pointer">
                    Bao gồm VAT (10%)
                  </Label>
                  <Switch
                    id="vat-toggle-tab"
                    checked={includeVAT}
                    onCheckedChange={setIncludeVAT}
                    data-testid="switch-vat-summary"
                  />
                </div>
              </div>

              {/* Total Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Calculator className="w-6 h-6" />
                  Tổng Kết Báo Giá
                </h3>
                
                {servers.map((server) => (
                  <div key={server.id} className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{server.name}</span>
                      <span className="text-lg font-bold text-blue-600">
                        {formatCurrency(calculateServerCost(server))}/tháng
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className={`px-2 py-1 rounded ${getTierLabel(server.cpu, 'cpu').color}`}>
                        {server.cpu} CPU
                      </span>
                      <span className={`px-2 py-1 rounded ${getTierLabel(server.ram, 'ram').color}`}>
                        {server.ram}GB RAM
                      </span>
                      <span className={`px-2 py-1 rounded ${getTierLabel(server.disk, 'disk').color}`}>
                        {server.disk}GB {server.diskType.toUpperCase()}
                      </span>
                      {server.gpu !== 'none' && (
                        <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700">
                          GPU: {gpuOptions.find(g => g.value === server.gpu)?.label}
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                <div className="border-t-2 border-blue-300 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-semibold text-gray-800">
                      Tổng chi phí ({servers.length} server)
                      {!includeVAT && <span className="text-sm text-red-600 ml-2">(Chưa VAT)</span>}
                      {includeVAT && <span className="text-sm text-green-600 ml-2">(Đã VAT)</span>}
                    </div>
                    <div className="text-2xl font-bold text-blue-600" data-testid="total-cost-summary">
                      {formatCurrency(calculateTotalCost())}/tháng
                    </div>
                  </div>
                </div>
              </div>

              {/* Export PDF Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={() => setActiveTab('basic')}>
                  <span className="mr-2">←</span> Chỉnh sửa cấu hình
                </Button>
                <Button
                  onClick={generatePDFQuote}
                  className="bg-green-600 hover:bg-green-700 text-white text-base py-6"
                  data-testid="button-export-pdf"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Xuất Báo Giá PDF
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sticky Pricing Sidebar - Hidden on mobile */}
        <div className="hidden lg:block lg:w-80 lg:flex-shrink-0">
          <div className="lg:sticky lg:top-6 space-y-4">
            {/* Pricing Summary Card */}
            <div className="bg-white rounded-lg shadow-lg border-2 border-blue-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Tổng Chi Phí
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {servers.map((server) => (
                  <div key={server.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 truncate max-w-[120px]">{server.name}</span>
                    <span className="font-semibold text-blue-600">
                      {formatCurrency(calculateServerCost(server))}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Hàng tháng:</span>
                    <span className="text-xl font-bold text-blue-600">
                      {formatCurrency(calculateTotalCost())}
                    </span>
                  </div>
                  {!includeVAT && (
                    <p className="text-xs text-red-500 text-right mt-1">Chưa bao gồm VAT</p>
                  )}
                </div>
              </div>
            </div>

            {/* Resource Tier Legend */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
              <h4 className="font-semibold text-gray-700 mb-3 text-sm">Mức Độ Cấu Hình</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-green-400"></span>
                  <span className="text-gray-600">Cơ bản - Tiết kiệm</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-yellow-400"></span>
                  <span className="text-gray-600">Trung bình - Phổ biến</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-red-400"></span>
                  <span className="text-gray-600">Cao cấp - Hiệu năng</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
              <h4 className="font-semibold text-gray-700 mb-3 text-sm">Hành Động Nhanh</h4>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs"
                  onClick={addServer}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Thêm Server
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs"
                  onClick={generatePDFQuote}
                >
                  <Download className="w-3 h-3 mr-1" />
                  Xuất PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only: Floating Price Display */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-200 shadow-lg p-3 z-50">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div>
            <p className="text-xs text-gray-500">Tổng chi phí</p>
            <p className="text-lg font-bold text-blue-600">{formatCurrency(calculateTotalCost())}/th</p>
          </div>
          <Button 
            size="sm" 
            onClick={generatePDFQuote}
            className="bg-green-600 hover:bg-green-700"
          >
            <Download className="w-4 h-4 mr-1" />
            Xuất PDF
          </Button>
        </div>
      </div>
    </div>
  );
}