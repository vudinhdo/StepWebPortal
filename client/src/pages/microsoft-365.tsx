import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Shield, 
  Video, 
  CheckCircle, 
  ArrowRight, 
  Globe, 
  Clock,
  Users,
  Star,
  X,
  Database,
  TrendingUp,
  Lock,
  Calendar,
  FileText,
  Zap,
  Settings,
  Monitor,
  Brain,
  Cloud,
  Building
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PerformanceBenchmark from "@/components/performance-benchmark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Microsoft365() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectDescription: "",
    package: ""
  });

  const benefits = [
    {
      icon: Video,
      title: "Teams & Real-time Collaboration",
      description: "Microsoft Teams với unlimited chat, video meeting 300 người và real-time co-authoring trong Office apps – lý tưởng cho distributed teams cần productivity breakthrough và seamless communication experience mọi lúc mọi nơi."
    },
    {
      icon: Brain,
      title: "AI Copilot Tích Hợp Sâu", 
      description: "Copilot AI trong Word, Excel, PowerPoint và Outlook tự động generate content, analyze data và optimize workflows – boost productivity 300% với intelligent assistance cho mọi business tasks mà không cần training phức tạp."
    },
    {
      icon: Shield,
      title: "Enterprise Security & Compliance",
      description: "Advanced Threat Protection, Data Loss Prevention và Azure AD Premium với conditional access policies – bảo vệ company data theo standards GDPR, ISO 27001 và enterprise-grade security cho sensitive information."
    },
    {
      icon: Cloud,
      title: "Anywhere Access & Mobile-First",
      description: "Office mobile apps với offline sync, browser-based access và device management qua Intune – cho phép work from anywhere với consistent experience và full productivity trên mọi device BYOD."
    }
  ];

  const microsoftAdvantages = [
    {
      icon: Mail,
      title: "Outlook Professional Email",
      description: "Email @yourcompany.com với 50GB mailbox, Focused Inbox AI filtering và scheduling assistant. Advanced calendar features với room booking và meeting insights để optimize communication flow."
    },
    {
      icon: FileText,
      title: "Office Apps Suite Đầy Đủ",
      description: "Word, Excel, PowerPoint desktop & web với latest features, real-time collaboration và AutoSave. Version history và comment threading cho efficient document workflows trong teams."
    },
    {
      icon: Video,
      title: "Microsoft Teams Enterprise",
      description: "Unlimited chat, video meetings 300 users, screen sharing và breakout rooms. Integration với Office apps cho seamless collaboration và webinar hosting capabilities cho external events."
    },
    {
      icon: Database,
      title: "OneDrive & SharePoint Storage",
      description: "1TB personal storage + unlimited SharePoint team sites với advanced sharing controls, version control và enterprise-grade backup. Perfect cho document management và file collaboration."
    },
    {
      icon: Calendar,
      title: "Scheduling & Booking System",
      description: "Advanced calendar với scheduling assistant, meeting rooms booking và Bookings app cho customer appointments. Shared calendars và availability tracking cho team coordination."
    },
    {
      icon: Settings,
      title: "Admin & Deployment Tools",
      description: "Microsoft 365 admin center với user management, license assignment và usage analytics. Intune device management và Windows Autopilot cho streamlined device setup."
    }
  ];

  const packages = [
    {
      name: "Business Basic",
      price: "129.000 VNĐ/user/tháng",
      storage: "Web apps + 1TB OneDrive",
      features: "Teams + SharePoint + Exchange",
      suitable: "Công ty nhỏ 1-10 nhân viên",
      color: "blue",
      specs: [
        "Outlook web và mobile",
        "Microsoft Teams unlimited",
        "Word, Excel, PowerPoint web",
        "OneDrive 1TB storage",
        "SharePoint team sites",
        "Exchange Online 50GB"
      ]
    },
    {
      name: "Business Standard",
      price: "259.000 VNĐ/user/tháng", 
      storage: "Desktop apps + 1TB OneDrive",
      features: "Full Office + Teams + Webinars",
      suitable: "SME 10-50 nhân viên",
      color: "green",
      popular: true,
      specs: [
        "All từ gói Basic",
        "Office desktop apps đầy đủ", 
        "Outlook desktop client",
        "Teams webinar hosting",
        "Customer scheduling app",
        "Attendee registration tools"
      ]
    },
    {
      name: "Business Premium",
      price: "449.000 VNĐ/user/tháng",
      storage: "Advanced security + compliance", 
      features: "Enterprise security + device mgmt",
      suitable: "Doanh nghiệp 50-300 nhân viên",
      color: "purple",
      specs: [
        "All từ gói Standard",
        "Advanced Threat Protection",
        "Intune device management",
        "Azure Information Protection",
        "Azure AD Premium P1",
        "Windows Autopilot"
      ]
    }
  ];

  const testimonial = {
    text: "Microsoft 365 đã tăng 300% productivity của team chúng tôi nhờ real-time collaboration và AI Copilot!",
    author: "Anh L., CTO tại FPT Software"
  };

  const techFeatures = [
    { name: "Teams", icon: Video },
    { name: "Outlook", icon: Mail },
    { name: "OneDrive", icon: Cloud },
    { name: "Office Apps", icon: FileText },
    { name: "SharePoint", icon: Database },
    { name: "Copilot AI", icon: Brain }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Main form data:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-slate-50/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <Building className="text-white w-6 h-6" />
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Microsoft 365 Enterprise
                </span>
              </div>
              
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Microsoft 365 & Teams – 
                <span className="text-blue-600"> Office Suite</span> 
                Tăng 300% Productivity Cho Team!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Giải pháp văn phòng toàn diện với Office apps, Teams collaboration và AI Copilot tích hợp. 
                Dành riêng cho doanh nghiệp cần digital workplace với security enterprise-grade và anywhere access.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-semibold"
                  onClick={() => {
                    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  data-testid="button-check-office-packages"
                >
                  Kiểm Tra Gói Office Phù Hợp
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg"
                  onClick={() => window.location.href = '/contact'}
                  data-testid="button-free-trial"
                >
                  Nhận 17% Giảm Giá Năm Đầu
                </Button>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Tin cậy bởi 345 triệu users worldwide!</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 text-green-400 font-mono text-sm">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 ml-4">Microsoft 365 Admin</span>
                </div>
                
                <div className="space-y-2">
                  <div><span className="text-blue-400">$</span> New-MgUser -DisplayName "User"</div>
                  <div><span className="text-blue-400">$</span> Set-MgUserLicense -UserId user</div>
                  <div><span className="text-blue-400">$</span> New-Team -DisplayName "Project"</div>
                  <div><span className="text-green-500">✓</span> Teams workspace ready!</div>
                </div>
              </div>

              {/* Tech Stack Icons */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {techFeatures.map((tech, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-4 text-center">
                    <tech.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <span className="text-sm font-medium text-gray-700">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tại Sao Chọn Microsoft 365?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những ưu thế vượt trội của Microsoft 365 cho doanh nghiệp Việt Nam
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-100"
                data-testid={`benefit-card-${index}`}
              >
                <div className="flex items-start space-x-6">
                  <div className="bg-blue-100 rounded-xl p-4 flex-shrink-0">
                    <benefit.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Microsoft 365 Advantages Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tính Năng Nổi Bật Microsoft 365
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bộ ứng dụng văn phòng hoàn chỉnh với cloud services và AI
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {microsoftAdvantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                data-testid={`advantage-card-${index}`}
              >
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-3 w-fit mb-4">
                  <advantage.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages Section */}
      <section id="packages" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Bảng Giá Microsoft 365 - 2025
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chọn gói phù hợp với quy mô doanh nghiệp. Giảm 17% năm đầu!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-xl border-2 ${
                  pkg.popular 
                    ? 'border-blue-600 transform scale-105' 
                    : 'border-gray-200'
                } p-8 hover:shadow-2xl transition-all`}
                data-testid={`package-card-${index}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Phổ biến nhất
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{pkg.price}</div>
                  <p className="text-gray-600 text-sm">{pkg.suitable}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.specs.map((spec, specIndex) => (
                    <li key={specIndex} className="flex items-start text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{spec}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full py-3 text-base font-semibold ${
                    pkg.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                  onClick={() => window.location.href = '/contact'}
                  data-testid={`button-choose-package-${index}`}
                >
                  Chọn Gói {pkg.name}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Benchmark Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              So Sánh Hiệu Suất Microsoft 365
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Benchmarks thực tế cho productivity và collaboration
            </p>
          </div>
          
          <PerformanceBenchmark />
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-8 w-8 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-2xl text-gray-900 font-medium mb-8 italic leading-relaxed">
                "{testimonial.text}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-600 text-sm">Vietnam Technology Industry</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Sẵn Sàng Chuyển Đổi Số Với Microsoft 365?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Tham gia 345 triệu users toàn cầu. Nhận 17% giảm giá năm đầu + setup support miễn phí.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              onClick={() => window.location.href = '/contact'}
              data-testid="button-start-now"
            >
              Bắt Đầu Ngay
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
              onClick={() => window.location.href = '/contact'}
              data-testid="button-contact-consultant"
            >
              Liên Hệ Tư Vấn
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}