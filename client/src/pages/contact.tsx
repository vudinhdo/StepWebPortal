import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Building,
  User,
  FileText,
  CheckCircle,
  Calendar,
  Users,
  Shield,
  Headphones,
  Server,
  Database,
  Download,
  Award,
  Star,
  Target,
  Heart,
  TrendingUp,
  Zap,
  Globe,
  Lock,
  Settings,
  Monitor,
  Wifi,
  HardDrive,
  Cpu
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import companyProfilePdf from "@assets/Profile step solution_1758643957915.pdf";

export default function Contact() {
  const [showContactModal, setShowContactModal] = useState(false);
  const { toast } = useToast();

  // SEO Meta Tags
  useEffect(() => {
    // Page Title
    document.title = "Liên Hệ - STEP Technology | Giải Pháp Hạ Tầng CNTT Toàn Diện";
    
    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Liên hệ STEP Technology - Đối tác CNTT tin cậy từ 2018. Giải pháp hạ tầng toàn diện: Cloud Server, Hosting, Dedicated Server, Colocation, Email Hybrid, DLP. Tư vấn miễn phí.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Liên hệ STEP Technology - Đối tác CNTT tin cậy từ 2018. Giải pháp hạ tầng toàn diện: Cloud Server, Hosting, Dedicated Server, Colocation, Email Hybrid, DLP. Tư vấn miễn phí.';
      document.head.appendChild(meta);
    }

    // Open Graph Tags
    const ogTags = [
      { property: 'og:title', content: 'Liên Hệ - STEP Technology | Giải Pháp Hạ Tầng CNTT Toàn Diện' },
      { property: 'og:description', content: 'Liên hệ STEP Technology - Đối tác CNTT tin cậy từ 2018. Tư vấn miễn phí về giải pháp hạ tầng CNTT toàn diện cho doanh nghiệp.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://step.com.vn/contact' },
      { property: 'og:site_name', content: 'STEP Technology' },
      { property: 'og:locale', content: 'vi_VN' },
    ];

    ogTags.forEach(tag => {
      let ogTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (ogTag) {
        ogTag.setAttribute('content', tag.content);
      } else {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', tag.property);
        ogTag.setAttribute('content', tag.content);
        document.head.appendChild(ogTag);
      }
    });

    // JSON-LD Structured Data
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://step.com.vn/#organization",
          "name": "Công ty Cổ phần Đầu tư Công nghệ STEP",
          "alternateName": "STEP Technology",
          "url": "https://step.com.vn",
          "logo": "https://step.com.vn/logo.png",
          "foundingDate": "2018-04",
          "email": "info@step.com.vn",
          "telephone": "+84985636289",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Số 99 Hoàng Ngân, Phường Nhân Chính",
            "addressLocality": "Quận Thanh Xuân",
            "addressRegion": "Hà Nội",
            "addressCountry": "VN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+84985636289",
            "contactType": "customer service",
            "availableLanguage": "Vietnamese",
            "hoursAvailable": "Mo-Su 00:00-23:59"
          },
          "sameAs": [
            "https://step.com.vn"
          ]
        },
        {
          "@type": "Person",
          "@id": "https://step.com.vn/#founder",
          "name": "Nguyễn Duy Đại",
          "jobTitle": "Founder & CEO",
          "worksFor": {
            "@id": "https://step.com.vn/#organization"
          },
          "description": "Kỹ sư sáng lập công ty STEP Technology, chuyên gia về giải pháp hạ tầng CNTT"
        },
        {
          "@type": "Service",
          "@id": "https://step.com.vn/#services",
          "provider": {
            "@id": "https://step.com.vn/#organization"
          },
          "name": "Giải pháp hạ tầng CNTT",
          "description": "Cung cấp giải pháp hạ tầng công nghệ thông tin toàn diện cho doanh nghiệp",
          "serviceType": ["Cloud Server", "Web Hosting", "Dedicated Server", "Colocation", "Email Hybrid", "Data Loss Prevention"],
          "areaServed": "Vietnam"
        }
      ]
    };

    let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    if (jsonLdScript) {
      jsonLdScript.textContent = JSON.stringify(structuredData);
    } else {
      jsonLdScript = document.createElement('script');
      jsonLdScript.type = 'application/ld+json';
      jsonLdScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(jsonLdScript);
    }

    // Cleanup function
    return () => {
      // Note: We don't remove meta tags on cleanup as they should persist
    };
  }, []);

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    },
  });

  const submitContact = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Thành công!",
        description: "Chúng tôi đã nhận được yêu cầu của bạn và sẽ liên hệ trong vòng 2 giờ.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi!",
        description: error.message || "Có lỗi xảy ra. Vui lòng thử lại.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: InsertContact) => {
    await submitContact.mutateAsync(data);
  };

  const certifications = [
    { name: "MCT", fullName: "Microsoft Certificate Windows Server", icon: Monitor },
    { name: "VCP5", fullName: "VMware Certified Professional", icon: Server },
    { name: "Linux LPI", fullName: "Linux Professional Institute", icon: Settings },
    { name: "Cisco CCNA", fullName: "Cisco Certified Network Associate", icon: Wifi },
    { name: "DLP Safetica", fullName: "Data Loss Prevention", icon: Lock },
    { name: "CEH", fullName: "Certified Ethical Hacker", icon: Shield }
  ];

  const coreServices = [
    {
      icon: Server,
      name: "Cloud Server",
      description: "Máy chủ đám mây linh hoạt, mở rộng theo nhu cầu",
      features: ["Triển khai nhanh", "Backup tự động", "24/7 monitoring"]
    },
    {
      icon: Globe,
      name: "Web Hosting",
      description: "Hosting chuyên nghiệp cho WordPress, Laravel",
      features: ["SSL miễn phí", "CDN toàn cầu", "99.9% uptime"]
    },
    {
      icon: Database,
      name: "Dedicated Server",
      description: "Máy chủ riêng biệt hiệu năng cao",
      features: ["Cấu hình tùy chọn", "Độc quyền tài nguyên", "Support 24/7"]
    },
    {
      icon: Building,
      name: "Colocation",
      description: "Đặt máy chủ tại datacenter chuyên nghiệp",
      features: ["Hạ tầng Tier III", "Bảo mật cao", "Kết nối tốc độ cao"]
    },
    {
      icon: Mail,
      name: "Email Hybrid",
      description: "Email doanh nghiệp an toàn, chuyên nghiệp",
      features: ["Anti-spam", "Backup email", "Mobile sync"]
    },
    {
      icon: Shield,
      name: "DLP - Data Loss Prevention",
      description: "Bảo vệ dữ liệu khỏi rò rỉ và mất mát",
      features: ["Giám sát real-time", "Policy linh hoạt", "Báo cáo chi tiết"]
    }
  ];

  const products = [
    { icon: Monitor, name: "PC, Laptop, All-in-One", category: "Hardware" },
    { icon: Server, name: "Máy chủ Dell, HPE, IBM", category: "Server" },
    { icon: Wifi, name: "Router, Switch, Firewall", category: "Network" },
    { icon: HardDrive, name: "Windows, SQL Server, VMware", category: "Software" }
  ];

  const companyStats = [
    { number: "2018", label: "Năm thành lập", icon: Calendar },
    { number: "500+", label: "Khách hàng tin dùng", icon: Users },
    { number: "24/7", label: "Hỗ trợ kỹ thuật", icon: Headphones },
    { number: "99.9%", label: "Uptime đảm bảo", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 overflow-hidden">
          <div className="absolute inset-0" style={{backgroundImage: `linear-gradient(135deg, hsl(var(--step-blue)), hsl(var(--step-light-blue)))`}}>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge className="mb-6 px-4 py-2 bg-white/20 text-white hover:bg-white/30" data-testid="badge-contact">
                  🏆 Đối tác CNTT tin cậy từ 2018
                </Badge>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="text-hero-title">
                  Giải Pháp Hạ Tầng CNTT
                  <br />
                  <span className="text-blue-200">Trọn Bộ Cho Doanh Nghiệp</span>
                </h1>
                
                <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto leading-relaxed" data-testid="text-hero-description">
                  Được thành lập bởi Kỹ sư Nguyễn Duy Đại, STEP mang đến giải pháp CNTT toàn diện 
                  với đội ngũ chuyên gia giàu kinh nghiệm và chứng chỉ quốc tế.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      size="lg" 
                      className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                      onClick={() => setShowContactModal(true)}
                      data-testid="button-contact-expert"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Tư Vấn Ngay
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300"
                      onClick={() => window.open(companyProfilePdf, '_blank')}
                      data-testid="button-download-profile"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Tải Hồ Sơ Công Ty
                    </Button>
                  </motion.div>
                </div>

                {/* Trust Preview */}
                <div className="flex flex-wrap justify-center gap-4 opacity-80">
                  {certifications.slice(0, 3).map((cert, index) => (
                    <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30">
                      <cert.icon className="w-4 h-4 mr-1" />
                      {cert.name}
                    </Badge>
                  ))}
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    +3 chứng chỉ khác
                  </Badge>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-8">Chứng Chỉ & Chuyên Môn</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto mb-12">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    data-testid={`cert-${index}`}
                  >
                    <Card className="text-center p-4 h-full border hover:border-blue-200 transition-all duration-300">
                      <CardContent className="p-2">
                        <div className="inline-flex p-2 rounded-lg mb-2" style={{backgroundColor: `hsl(var(--step-light-blue))`}}>
                          <cert.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-bold text-sm text-slate-800">{cert.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">{cert.fullName}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 text-slate-600">
                <Award className="h-5 w-5 text-blue-600" />
                <span className="text-lg font-medium">Được tin dùng bởi:</span>
                <Badge variant="outline" className="px-4 py-2 text-lg border-blue-200 text-blue-700">
                  <Building className="w-4 h-4 mr-2" />
                  Sở Văn Hóa Hà Nội
                </Badge>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About & Founder */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200" data-testid="badge-about">
                🏢 Về Chúng Tôi
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Câu Chuyện STEP</h2>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Company Info */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-0 shadow-xl bg-white p-8">
                    <CardHeader className="p-0 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="inline-flex p-3 rounded-xl text-white" style={{backgroundColor: `hsl(var(--step-blue))`}}>
                          <Building className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">Công Ty Cổ Phần STEP</CardTitle>
                          <p className="text-slate-500">Thành lập tháng 4/2018</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 space-y-6">
                      <div>
                        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <Target className="h-5 w-5 text-blue-600" />
                          Tầm Nhìn
                        </h4>
                        <p className="text-slate-600 leading-relaxed">
                          Trở thành doanh nghiệp hàng đầu về giải pháp hạ tầng công nghệ thông tin trọn bộ cho Doanh Nghiệp
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <Heart className="h-5 w-5 text-red-500" />
                          Sứ Mệnh
                        </h4>
                        <ul className="space-y-2 text-slate-600">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                            Sản phẩm - giải pháp công nghệ hợp lý và tiết kiệm nhất
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                            Hệ thống CNTT hoạt động hiệu quả - an tâm kinh doanh
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                            Xây dựng - Đồng hành cùng khách hàng
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Founder Info */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-0 shadow-xl bg-white p-8">
                    <CardHeader className="p-0 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="inline-flex p-3 rounded-xl text-white" style={{backgroundColor: `hsl(var(--step-light-blue))`}}>
                          <User className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">Người Sáng Lập</CardTitle>
                          <p className="text-slate-500">Kỹ sư Nguyễn Duy Đại</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 space-y-6">
                      <blockquote className="text-slate-600 italic text-lg leading-relaxed border-l-4 border-blue-200 pl-4">
                        "Với sự quyết tâm cho mục tiêu top 1 thị trường và luôn mãi một tinh thần khởi nghiệp. 
                        Chúng tôi cam kết đem tới giải pháp trọn bộ công nghệ thông tin tới khách hàng - Cùng nhau thành công!"
                      </blockquote>
                      
                      <div className="space-y-3">
                        <h4 className="font-bold text-slate-800 mb-3">Phương Châm Hoạt Động</h4>
                        <ul className="space-y-2 text-slate-600">
                          <li className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-yellow-500" />
                            Chúng tôi là công ty dịch vụ
                          </li>
                          <li className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-yellow-500" />
                            Yếu tố con người là cốt lõi
                          </li>
                          <li className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-yellow-500" />
                            Học tập không ngừng nghỉ
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Company Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
              >
                {companyStats.map((stat, index) => (
                  <Card key={index} className="text-center p-6 border-0 shadow-lg bg-white">
                    <CardContent className="p-0">
                      <div className="inline-flex p-3 rounded-xl text-white mb-4" style={{backgroundColor: `hsl(var(--step-blue))`}}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-3xl font-bold text-slate-800 mb-2">{stat.number}</h3>
                      <p className="text-slate-600 font-medium">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services & Products */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200" data-testid="badge-services">
                🚀 Dịch Vụ & Sản Phẩm
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Giải Pháp Toàn Diện</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                6 dịch vụ core và đa dạng sản phẩm đáp ứng mọi nhu cầu hạ tầng IT của doanh nghiệp.
              </p>
            </motion.div>

            {/* Core Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
              {coreServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  data-testid={`service-card-${index}`}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`inline-flex p-3 rounded-lg text-white`} style={{backgroundColor: `hsl(var(--step-blue))`}}>
                          <service.icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">{service.name}</h3>
                      </div>
                      <p className="text-slate-600 mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-slate-500">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Products */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-slate-800 text-center mb-8">Sản Phẩm Công Nghệ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <Card key={index} className="text-center p-4 border-0 shadow-md bg-white">
                    <CardContent className="p-0">
                      <div className="inline-flex p-3 rounded-lg mb-3" style={{backgroundColor: `hsl(var(--step-light-blue))`}}>
                        <product.icon className="h-5 w-5 text-white" />
                      </div>
                      <Badge variant="outline" className="mb-2">{product.category}</Badge>
                      <p className="text-sm font-medium text-slate-700">{product.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Case Highlight - Sở Văn Hóa Hà Nội */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Badge className="mb-4 px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200 block w-fit mx-auto">
                📈 Case Study
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 text-center">
                Thành Công Cùng Khách Hàng
              </h2>
              
              <Card className="border-0 shadow-xl bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="inline-flex p-4 rounded-xl text-white" style={{backgroundColor: `hsl(var(--step-blue))`}}>
                      <Building className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800">Sở Văn Hóa Hà Nội</h3>
                      <p className="text-slate-500">Khách hàng tiêu biểu</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="inline-flex p-3 rounded-lg mb-3" style={{backgroundColor: `hsl(var(--step-light-blue))`}}>
                        <Target className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-bold text-slate-800 mb-2">Mục Tiêu</h4>
                      <p className="text-slate-600 text-sm">Xây dựng hệ thống CNTT ổn định, bảo mật cho hoạt động văn hóa</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="inline-flex p-3 rounded-lg mb-3" style={{backgroundColor: `hsl(var(--step-blue))`}}>
                        <Settings className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-bold text-slate-800 mb-2">Giải Pháp</h4>
                      <p className="text-slate-600 text-sm">Triển khai hạ tầng mạng, server và giải pháp bảo mật toàn diện</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="inline-flex p-3 rounded-lg mb-3 bg-green-500">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-bold text-slate-800 mb-2">Kết Quả</h4>
                      <p className="text-slate-600 text-sm">Hoạt động ổn định, an toàn. Nâng cao hiệu quả công việc</p>
                    </div>
                  </div>
                  
                  <div className="text-center mt-8 pt-6 border-t border-gray-100">
                    <blockquote className="text-slate-600 italic">
                      "STEP đã đem lại giải pháp CNTT hiệu quả, giúp chúng tôi vận hành hoạt động văn hóa một cách chuyên nghiệp và an toàn."
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 px-4 py-2 bg-orange-100 text-orange-700 hover:bg-orange-200">
                📚 Tài Liệu
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Tìm Hiểu Thêm</h2>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex p-4 rounded-xl text-white mb-6" style={{backgroundColor: `hsl(var(--step-blue))`}}>
                      <FileText className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Hồ Sơ Năng Lực STEP</h3>
                    <p className="text-slate-600 mb-6">
                      Tài liệu chi tiết về năng lực, dịch vụ và thành tựu của STEP Solution. 
                      Tìm hiểu đầy đủ về giải pháp CNTT của chúng tôi.
                    </p>
                    <div className="flex items-center justify-center gap-4 mb-6 text-sm text-slate-500">
                      <span>📄 PDF Format</span>
                      <span>•</span>
                      <span>📊 13 trang</span>
                      <span>•</span>
                      <span>📅 Cập nhật 2024</span>
                    </div>
                    <Button 
                      size="lg"
                      className="font-semibold text-lg px-8 py-4"
                      style={{backgroundColor: `hsl(var(--step-blue))`, color: 'white'}}
                      onClick={() => window.open(companyProfilePdf, '_blank')}
                      data-testid="button-download-pdf"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Tải Xuống Miễn Phí
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <Badge className="mb-4 px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200" data-testid="badge-form">
                  📞 Liên Hệ
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="text-form-title">
                  Bắt Đầu Hành Trình CNTT
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Để lại thông tin hoặc gọi trực tiếp. Chúng tôi cam kết phản hồi trong vòng 2 giờ.
                </p>
              </motion.div>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="inline-flex p-3 rounded-xl text-white mb-4" style={{backgroundColor: `hsl(var(--step-blue))`}}>
                        <Phone className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold text-slate-800 mb-2">Hotline</h3>
                      <p className="text-blue-600 font-semibold text-lg">0985.636.289</p>
                      <p className="text-slate-500 text-sm mt-1">Hỗ trợ 24/7</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="inline-flex p-3 rounded-xl text-white mb-4" style={{backgroundColor: `hsl(var(--step-blue))`}}>
                        <Mail className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold text-slate-800 mb-2">Email</h3>
                      <p className="text-blue-600 font-semibold">info@step.com.vn</p>
                      <p className="text-slate-500 text-sm mt-1">Phản hồi trong 2 giờ</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="inline-flex p-3 rounded-xl text-white mb-4" style={{backgroundColor: `hsl(var(--step-blue))`}}>
                        <MapPin className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold text-slate-800 mb-2">Văn Phòng</h3>
                      <p className="text-slate-700 font-medium">Hà Nội</p>
                      <p className="text-slate-500 text-sm mt-1">Số 99 Hoàng Ngân</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-xl bg-white">
                  <CardContent className="p-8">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Họ và tên *</Label>
                          <Input
                            id="name"
                            {...form.register("name")}
                            placeholder="Nhập họ và tên"
                            className="mt-1"
                            data-testid="input-name"
                          />
                          {form.formState.errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                              {form.formState.errors.name.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            {...form.register("email")}
                            placeholder="Nhập email"
                            className="mt-1"
                            data-testid="input-email"
                          />
                          {form.formState.errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                              {form.formState.errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Số điện thoại</Label>
                          <Input
                            id="phone"
                            {...form.register("phone")}
                            placeholder="Nhập số điện thoại"
                            className="mt-1"
                            data-testid="input-phone"
                          />
                        </div>
                        <div>
                          <Label htmlFor="company">Công ty</Label>
                          <Input
                            id="company"
                            {...form.register("company")}
                            placeholder="Nhập tên công ty"
                            className="mt-1"
                            data-testid="input-company"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="service">Dịch vụ quan tâm</Label>
                        <Select 
                          value={form.watch("service") || ""} 
                          onValueChange={(value) => form.setValue("service", value)}
                        >
                          <SelectTrigger className="mt-1" data-testid="select-service">
                            <SelectValue placeholder="Chọn dịch vụ" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cloud">Cloud Server</SelectItem>
                            <SelectItem value="hosting">Web Hosting</SelectItem>
                            <SelectItem value="server">Dedicated Server</SelectItem>
                            <SelectItem value="colocation">Colocation</SelectItem>
                            <SelectItem value="email">Email Hybrid</SelectItem>
                            <SelectItem value="DLP">DLP - Data Loss Prevention</SelectItem>
                            <SelectItem value="consulting">Tư vấn tổng thể</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="message">Tin nhắn *</Label>
                        <Textarea
                          id="message"
                          {...form.register("message")}
                          placeholder="Mô tả chi tiết nhu cầu của bạn..."
                          className="mt-1 min-h-[120px]"
                          data-testid="textarea-message"
                        />
                        {form.formState.errors.message && (
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.message.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={submitContact.isPending}
                        className="w-full font-semibold py-4 text-lg transition-all duration-300"
                        style={{
                          backgroundColor: `hsl(var(--step-blue))`,
                          color: 'white'
                        }}
                        data-testid="button-submit"
                      >
                        {submitContact.isPending ? (
                          "Đang gửi..."
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Gửi Yêu Cầu Tư Vấn
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 relative overflow-hidden" style={{backgroundImage: `linear-gradient(to right, hsl(var(--step-blue)), hsl(var(--step-light-blue)))`}}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center text-white"
            >
              <Badge className="mb-6 px-4 py-2 bg-white/20 text-white hover:bg-white/30">
                🚀 Bắt Đầu Ngay
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-final-cta-title">
                Đồng Hành Cùng STEP
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Hơn 500 doanh nghiệp đã tin tưởng. Hãy để STEP giúp bạn xây dựng hạ tầng CNTT vững chắc 
                để tập trung vào phát triển kinh doanh.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                    onClick={() => window.location.href = 'tel:0985636289'}
                    data-testid="button-final-call"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Gọi Ngay: 0985.636.289
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300"
                    onClick={() => setShowContactModal(true)}
                    data-testid="button-final-contact"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Nhận Tư Vấn Miễn Phí
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Contact Form Modal */}
      <ContactForm 
        open={showContactModal} 
        onOpenChange={setShowContactModal}
        intent="general"
      />
    </div>
  );
}