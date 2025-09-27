import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  Cloud,
  Server,
  Mail,
  Globe,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Users,
  Building,
  Monitor,
  Network,
  Database,
  Cpu,
  HardDrive,
  Phone,
  Star,
  TrendingUp
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Header from "../components/header";
import Footer from "../components/footer";

// Comprehensive pricing data based on competitive analysis
const pricingData = {
  hosting: {
    startup: [
      { name: 'Startup 1', price: 25000, storage: '2GB NVMe', bandwidth: '20GB', domains: 1, features: ['2 CPU Cores', '2GB RAM', 'MySQL DB', 'SSL Free'] },
      { name: 'Startup 2', price: 37000, storage: '3GB NVMe', bandwidth: '40GB', domains: 'Unlimited', features: ['2 CPU Cores', '2GB RAM', '2 MySQL DB', 'SSL Free'], popular: true },
      { name: 'Startup 3', price: 45000, storage: '4GB NVMe', bandwidth: '80GB', domains: 'Unlimited', features: ['2 CPU Cores', '2GB RAM', '2 MySQL DB', 'SSL Free'] }
    ],
    business: [
      { name: 'Business 1', price: 78000, storage: '5GB NVMe', bandwidth: 'Unlimited', domains: 3, features: ['2 CPU Cores', '4GB RAM', '3 MySQL DB', 'SSL Free'] },
      { name: 'Business 2', price: 132000, storage: '8GB NVMe', bandwidth: 'Unlimited', domains: 4, features: ['2 CPU Cores', '4GB RAM', '4 MySQL DB', 'SSL Free'], popular: true },
      { name: 'Business 3', price: 231000, storage: '20GB NVMe', bandwidth: 'Unlimited', domains: 20, features: ['4 CPU Cores', '6GB RAM', 'Unlimited MySQL', 'SSL Free'] }
    ],
    premium: [
      { name: 'Premium 1', price: 413000, storage: '38GB NVMe', bandwidth: 'Unlimited', domains: 3, features: ['6 CPU Cores', '10GB RAM', '3 MySQL DB', 'Priority Support'] },
      { name: 'Premium 2', price: 578000, storage: '48GB NVMe', bandwidth: 'Unlimited', domains: 4, features: ['8 CPU Cores', '12GB RAM', '4 MySQL DB', 'Priority Support'], popular: true },
      { name: 'Premium 3', price: 949000, storage: '80GB NVMe', bandwidth: 'Unlimited', domains: 20, features: ['14 CPU Cores', '18GB RAM', 'Unlimited MySQL', 'Priority Support'] }
    ]
  },
  vps: [
    { name: 'VPS A', price: 86000, cpu: '1 Core', ram: '1GB', storage: '10GB SSD', features: ['Root Access', 'KVM Virtualization', '99.9% Uptime'] },
    { name: 'VPS B', price: 200000, cpu: '1 Core', ram: '1.5GB', storage: '25GB SSD', features: ['Root Access', 'KVM Virtualization', '99.9% Uptime'], popular: true },
    { name: 'VPS C', price: 290000, cpu: '2 Cores', ram: '2.5GB', storage: '40GB SSD', features: ['Root Access', 'KVM Virtualization', '99.9% Uptime'] },
    { name: 'VPS D', price: 400000, cpu: '3 Cores', ram: '5GB', storage: '60GB SSD', features: ['Root Access', 'KVM Virtualization', '99.9% Uptime'] }
  ],
  email: [
    { name: 'Email Basic', price: 15000, storage: '5GB', features: ['Custom Domain', 'Webmail', 'IMAP/POP3', 'Anti-spam'] },
    { name: 'Email Business', price: 25000, storage: '15GB', features: ['Custom Domain', 'Webmail', 'IMAP/POP3', 'Anti-spam', 'Calendar'], popular: true },
    { name: 'Email Enterprise', price: 50000, storage: '50GB', features: ['Custom Domain', 'Webmail', 'IMAP/POP3', 'Anti-spam', 'Calendar', 'Advanced Security'] }
  ],
  domain: [
    { name: '.com', price: 139000, period: '/year', features: ['International Domain', 'DNS Management', 'Email Forwarding'] },
    { name: '.net', price: 260000, period: '/year', features: ['International Domain', 'DNS Management', 'Email Forwarding'] },
    { name: '.vn', price: 650000, period: '/year', features: ['Vietnam Domain', 'DNS Management', 'Email Forwarding'] },
    { name: '.com.vn', price: 550000, period: '/year', features: ['Vietnam Domain', 'DNS Management', 'Email Forwarding'], popular: true }
  ],
  enterprise: [
    { name: 'Microsoft 365 Basic', price: 159000, period: '/user/month', features: ['Office Apps', 'OneDrive 1TB', 'Teams', 'Email 50GB'] },
    { name: 'Microsoft 365 Business', price: 279000, period: '/user/month', features: ['Office Apps', 'OneDrive 1TB', 'Teams', 'Email 50GB', 'Advanced Security'], popular: true },
    { name: 'Google Workspace', price: 149000, period: '/user/month', features: ['Gmail', 'Drive 30GB', 'Meet', 'Calendar', 'Docs'] },
    { name: 'VMware vSphere', price: 2500000, period: '/month', features: ['Virtualization Platform', 'High Availability', 'vMotion', 'DRS'] }
  ]
};

export default function QuotePage() {
  const [activeTab, setActiveTab] = useState("hosting");
  const [selectedCategory, setSelectedCategory] = useState("startup");
  const [customConfig, setCustomConfig] = useState({
    storage: 10,
    bandwidth: 100,
    period: 'monthly'
  });

  const features = [
    {
      icon: <Calculator className="h-8 w-8 text-[hsl(207,100%,40%)]" />,
      title: "Báo Giá Tự Động",
      description: "Tính toán chi phí chính xác ngay lập tức với công cụ báo giá thông minh"
    },
    {
      icon: <Zap className="h-8 w-8 text-[hsl(207,100%,40%)]" />,
      title: "Cấu Hình Linh Hoạt",
      description: "Tùy chỉnh cấu hình theo nhu cầu với slider kéo thả trực quan"
    },
    {
      icon: <Shield className="h-8 w-8 text-[hsl(207,100%,40%)]" />,
      title: "Giá Cả Minh Bạch",
      description: "Không có phí ẩn, tất cả chi phí được hiển thị rõ ràng"
    },
    {
      icon: <Users className="h-8 w-8 text-[hsl(207,100%,40%)]" />,
      title: "Hỗ Trợ 24/7",
      description: "Đội ngũ chuyên gia sẵn sàng tư vấn và hỗ trợ bạn"
    }
  ];

  const serviceCategories = [
    {
      id: "hosting",
      title: "NVMe Hosting",
      icon: <Server className="h-6 w-6" />,
      description: "WordPress, Laravel, NVME hosting siêu tốc",
      color: "bg-blue-500"
    },
    {
      id: "vps",
      title: "Cloud VPS",
      icon: <Cloud className="h-6 w-6" />,
      description: "Máy chủ ảo, VPS performance cao",
      color: "bg-green-500"
    },
    {
      id: "email",
      title: "Email Business",
      icon: <Mail className="h-6 w-6" />,
      description: "Email doanh nghiệp chuyên nghiệp",
      color: "bg-purple-500"
    },
    {
      id: "domain",
      title: "Tên Miền",
      icon: <Globe className="h-6 w-6" />,
      description: "Đăng ký domain .com, .vn, .com.vn",
      color: "bg-orange-500"
    },
    {
      id: "enterprise",
      title: "Enterprise",
      icon: <Building className="h-6 w-6" />,
      description: "Microsoft 365, Google Workspace, VMware",
      color: "bg-red-500"
    }
  ];

  const calculatePrice = (basePrice: number, period: string) => {
    const multiplier = period === 'yearly' ? 10 : period === '6months' ? 5.5 : 1;
    return Math.round(basePrice * multiplier);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const PricingCard = ({ item, isPopular = false }: { item: any, isPopular?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative ${
        isPopular ? 'ring-2 ring-blue-500 scale-105' : ''
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Phổ Biến Nhất
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
        <div className="text-3xl font-bold text-blue-600 mb-1">
          {formatPrice(item.price)}đ
          <span className="text-sm text-gray-500 font-normal">{item.period || '/tháng'}</span>
        </div>
        {item.storage && (
          <p className="text-sm text-gray-600">{item.storage}</p>
        )}
      </div>

      <div className="space-y-3 mb-6">
        {item.features.map((feature: string, index: number) => (
          <div key={index} className="flex items-center text-sm">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <Button 
        className={`w-full ${
          isPopular 
            ? 'bg-blue-600 hover:bg-blue-700' 
            : 'bg-gray-800 hover:bg-gray-700'
        }`}
        onClick={() => window.location.href = '/contact'}
      >
        Chọn Gói Này
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  );

  return (
    <>
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                  Trung Tâm{" "}
                  <span className="text-[hsl(207,100%,40%)]">
                    Báo Giá Trực Tuyến
                  </span>{" "}
                  Chuyên Nghiệp
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Nhận báo giá chính xác cho tất cả dịch vụ IT của chúng tôi. 
                  Chỉ cần kéo thả hoặc điền thông số, hệ thống sẽ tự động tính toán chi phí phù hợp.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => document.getElementById('quote-calculator')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)] text-white text-lg px-8 py-4"
                  >
                    Bắt Đầu Báo Giá
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-[hsl(207,100%,40%)] text-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,40%)] hover:text-white text-lg px-8 py-4"
                  >
                    Tư Vấn Miễn Phí
                  </Button>
                </div>
                
                <div className="flex items-center justify-center mt-8 space-x-8 text-sm text-gray-500">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Báo giá tức thì
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Giá cả minh bạch
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Hỗ trợ 24/7
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Tại Sao Chọn Công Cụ Báo Giá Của STEP?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Được thiết kế để mang lại trải nghiệm báo giá nhanh chóng, chính xác và thuận tiện nhất
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex justify-center mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Calculator Section */}
        <section id="quote-calculator" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Công Cụ Báo Giá Tự Động
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Chọn danh mục dịch vụ và tùy chỉnh cấu hình để nhận báo giá chi tiết
              </p>
            </div>

            {/* Service Categories Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {serviceCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`p-6 rounded-lg text-white cursor-pointer transition-transform hover:scale-105 ${category.color} ${
                    activeTab === category.id ? 'ring-4 ring-white' : ''
                  }`}
                  onClick={() => setActiveTab(category.id)}
                >
                  <div className="flex items-center mb-3">
                    {category.icon}
                    <h3 className="text-lg font-semibold ml-2">{category.title}</h3>
                  </div>
                  <p className="text-sm opacity-90">{category.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Quote Calculator Tabs */}
            <div className="bg-white rounded-lg shadow-lg">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="hosting" className="flex items-center gap-2">
                    <Server className="h-4 w-4" />
                    Hosting
                  </TabsTrigger>
                  <TabsTrigger value="vps" className="flex items-center gap-2">
                    <Cloud className="h-4 w-4" />
                    VPS
                  </TabsTrigger>
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="domain" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Domain
                  </TabsTrigger>
                  <TabsTrigger value="enterprise" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Enterprise
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="hosting" className="p-0">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">NVMe Hosting Siêu Tốc</h3>
                        <p className="text-gray-600">
                          Tốc độ tăng x25 lần với ổ cứng NVMe thế hệ mới
                        </p>
                      </div>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="startup">Startup</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      {pricingData.hosting[selectedCategory as keyof typeof pricingData.hosting].map((item: any, index: number) => (
                        <PricingCard key={index} item={item} isPopular={item.popular} />
                      ))}
                    </div>
                    
                    <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Tính năng đặc biệt:</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
                        <div className="flex items-center">
                          <Zap className="h-4 w-4 mr-2" />
                          NVMe SSD x25 tốc độ
                        </div>
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-2" />
                          SSL miễn phí
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          Hỗ trợ 24/7
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="vps" className="p-0">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Cloud VPS - Máy Chủ Ảo</h3>
                    <p className="text-gray-600 mb-6">
                      Giải pháp máy chủ ảo trên nền tảng điện toán đám mây
                    </p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {pricingData.vps.map((item: any, index: number) => (
                        <PricingCard key={index} item={item} isPopular={item.popular} />
                      ))}
                    </div>
                    
                    <div className="mt-8 p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Lợi ích VPS:</h4>
                      <div className="grid md:grid-cols-4 gap-4 text-sm text-green-800">
                        <div className="flex items-center">
                          <Monitor className="h-4 w-4 mr-2" />
                          Root Access
                        </div>
                        <div className="flex items-center">
                          <Database className="h-4 w-4 mr-2" />
                          KVM Virtualization
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          99.9% Uptime
                        </div>
                        <div className="flex items-center">
                          <Network className="h-4 w-4 mr-2" />
                          SSD Storage
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="email" className="p-0">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Email Doanh Nghiệp</h3>
                    <p className="text-gray-600 mb-6">
                      Email chuyên nghiệp với tên miền riêng của doanh nghiệp
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      {pricingData.email.map((item: any, index: number) => (
                        <PricingCard key={index} item={item} isPopular={item.popular} />
                      ))}
                    </div>
                    
                    <div className="mt-8 p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">Tính năng Email:</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-purple-800">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          Custom Domain
                        </div>
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-2" />
                          Anti-spam
                        </div>
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-2" />
                          Webmail Interface
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="domain" className="p-0">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Tên Miền - Domain</h3>
                    <p className="text-gray-600 mb-6">
                      Đăng ký tên miền quốc tế và Việt Nam giá cạnh tranh
                    </p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {pricingData.domain.map((item: any, index: number) => (
                        <PricingCard key={index} item={item} isPopular={item.popular} />
                      ))}
                    </div>
                    
                    <div className="mt-8 p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-900 mb-2">Dịch vụ Domain:</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-orange-800">
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-2" />
                          DNS Management
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          Email Forwarding
                        </div>
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-2" />
                          Domain Protection
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="enterprise" className="p-0">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Giải Pháp Enterprise</h3>
                    <p className="text-gray-600 mb-6">
                      Các giải pháp doanh nghiệp chuyên nghiệp và toàn diện
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {pricingData.enterprise.map((item: any, index: number) => (
                        <PricingCard key={index} item={item} isPopular={item.popular} />
                      ))}
                    </div>
                    
                    <div className="mt-8 p-4 bg-red-50 rounded-lg">
                      <h4 className="font-semibold text-red-900 mb-2">Tính năng Enterprise:</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-red-800">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2" />
                          Business Grade
                        </div>
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-2" />
                          Advanced Security
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          Priority Support
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Competitive Comparison Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                So Sánh Với Đối Thủ
              </h2>
              <p className="text-xl text-gray-600">
                STEP cung cấp giá cả cạnh tranh với chất lượng dịch vụ vượt trội
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Giá Cả Cạnh Tranh</h3>
                <p className="text-gray-600">Tiết kiệm lên đến 15-30% so với các nhà cung cấp khác</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Hiệu Suất Vượt Trội</h3>
                <p className="text-gray-600">Tốc độ NVMe nhanh gấp 25 lần hosting thông thường</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Hỗ Trợ 24/7</h3>
                <p className="text-gray-600">Chuyên gia Việt Nam hỗ trợ trực tiếp mọi lúc</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
              STEP Trong Số
            </h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">500K+</div>
                <div className="text-gray-600">Khách hàng tin tưởng</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-green-600 mb-2">99.9%</div>
                <div className="text-gray-600">Uptime guarantee</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-purple-600 mb-2">20+</div>
                <div className="text-gray-600">Năm kinh nghiệm</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600">Hỗ trợ chuyên nghiệp</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[hsl(207,100%,40%)] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sẵn Sàng Bắt Đầu?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn chi tiết và hỗ trợ bạn chọn gói phù hợp nhất
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-[hsl(207,100%,40%)] hover:bg-gray-100 text-lg px-8 py-4"
                onClick={() => window.location.href = '/contact'}
              >
                Liên Hệ Tư Vấn Ngay
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[hsl(207,100%,40%)] text-lg px-8 py-4"
              >
                <Phone className="mr-2 h-5 w-5" />
                Hotline: 0985.636.289
              </Button>
            </div>
            
            <div className="mt-8 flex items-center justify-center space-x-8 text-sm opacity-80">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Tư vấn miễn phí
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Báo giá nhanh chóng
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Giá cả cạnh tranh
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}