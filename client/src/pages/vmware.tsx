import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Server, 
  Shield, 
  Monitor, 
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
  Network,
  Cloud,
  Zap,
  Settings,
  Award
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PerformanceBenchmark from "@/components/performance-benchmark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function VMwarePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectDescription: "",
    package: ""
  });

  const benefits = [
    {
      icon: Server,
      title: "Ảo Hóa & Consolidation Mạnh Mẽ",
      description: "vSphere với vMotion cho phép di chuyển VM không downtime, server consolidation giảm 60% hardware costs và High Availability tự động failover – lý tưởng cho datacenter enterprise cần uptime 99.99% mà không muốn đầu tư phức tạp."
    },
    {
      icon: Shield,
      title: "Bảo Mật NSX Micro-Segmentation", 
      description: "NSX tạo ra firewall phân tán với micro-segmentation, Zero Trust Network Access và automated security policies – bảo vệ khỏi lateral movement attacks và đảm bảo compliance cho dữ liệu nhạy cảm."
    },
    {
      icon: Cloud,
      title: "Hybrid & Multi-Cloud Linh Hoạt",
      description: "VMware Cloud Foundation với consistent operations across on-premises, AWS, Azure và Google Cloud. Avoid vendor lock-in với workload portability và unified management – perfect cho enterprise transformation strategy."
    },
    {
      icon: Monitor,
      title: "VDI & Remote Work Enterprise",
      description: "Horizon VDI hỗ trợ 15K+ concurrent users, instant clone technology và rich multimedia experience. Tanzu platform cho modern apps với Kubernetes-native development – boost developer productivity 300%."
    }
  ];

  const vmwareAdvantages = [
    {
      icon: Database,
      title: "vSphere High Availability",
      description: "Automatic failover trong 30 giây, vMotion live migration không downtime và Distributed Resource Scheduler (DRS) tự động balance workloads. Uptime 99.99% đảm bảo cho mission-critical applications."
    },
    {
      icon: Network,
      title: "NSX Network Virtualization",
      description: "Software-defined networking với distributed firewall, load balancing và VPN services. Micro-segmentation bảo vệ east-west traffic, lý tưởng cho zero trust architecture và compliance requirements."
    },
    {
      icon: Monitor,
      title: "Horizon Virtual Desktop",
      description: "VDI solution cho remote work với instant clone, App Volumes và User Environment Manager. Support 15,000+ concurrent sessions với performance như local desktop, perfect cho distributed workforce."
    },
    {
      icon: Cloud,
      title: "Tanzu Kubernetes Platform",
      description: "Enterprise-grade Kubernetes với integrated CI/CD, service mesh và application catalog. Developer self-service với governance controls, accelerate cloud-native development cycles."
    },
    {
      icon: Settings,
      title: "vCenter Centralized Management",
      description: "Single pane of glass cho toàn bộ virtual infrastructure, automated provisioning và policy-based governance. Reduce administrative overhead 70% với intelligent automation workflows."
    },
    {
      icon: TrendingUp,
      title: "vSAN Hyper-Converged Storage",
      description: "Software-defined storage tích hợp trong vSphere, dedupe/compression và all-flash performance. Scale-out architecture với predictive analytics cho optimal storage utilization và cost efficiency."
    }
  ];

  const packages = [
    {
      name: "Gói vSphere Essentials",
      price: "15.000.000 VNĐ/tháng",
      storage: "3 hosts, vCenter Server",
      features: "Basic virtualization, vMotion",
      suitable: "Small business/startup virtualization",
      color: "gray",
      specs: [
        "vSphere Hypervisor",
        "vCenter Server Essential",
        "vMotion Live Migration",
        "High Availability (HA)",
        "Up to 3 Physical Hosts",
        "Basic Support"
      ]
    },
    {
      name: "Gói vSphere Standard",
      price: "35.000.000 VNĐ/tháng", 
      storage: "vSphere + vCenter + DRS",
      features: "Advanced features, unlimited hosts",
      suitable: "Enterprise datacenter operations",
      color: "blue",
      popular: true,
      specs: [
        "All từ gói Essentials",
        "Distributed Resource Scheduler",
        "vSphere API Integration", 
        "vSphere Update Manager",
        "Unlimited Physical Hosts",
        "24/7 Premium Support"
      ]
    },
    {
      name: "Gói Cloud Foundation",
      price: "85.000.000 VNĐ/tháng",
      storage: "Full Stack: vSphere + NSX + vSAN", 
      features: "Complete SDDC, Hybrid Cloud",
      suitable: "Digital transformation enterprises",
      color: "purple",
      specs: [
        "All từ gói Standard",
        "NSX Network Virtualization",
        "vSAN Hyper-Converged Storage",
        "Horizon VDI Platform",
        "Tanzu Kubernetes Grid",
        "Dedicated Account Manager"
      ]
    }
  ];

  const testimonial = {
    text: "VMware vSphere giúp chúng tôi đạt 99.99% uptime cho core banking và tiết kiệm 60% chi phí infrastructure!",
    author: "Anh M., CTO tại Vietcombank"
  };

  const techFeatures = [
    { name: "vSphere", icon: Server },
    { name: "NSX", icon: Network },
    { name: "Horizon VDI", icon: Monitor },
    { name: "Tanzu", icon: Cloud },
    { name: "vSAN", icon: Database },
    { name: "vCenter", icon: Settings }
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
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mr-4">
                  <Server className="text-white w-6 h-6" />
                </div>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  VMware Enterprise Virtualization
                </span>
              </div>
              
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                VMware vSphere & NSX – 
                <span className="text-gray-700"> Ảo Hóa Enterprise</span> 
                Với 99.99% Uptime Guaranteed!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Giải pháp ảo hóa toàn diện với vSphere high availability, NSX micro-segmentation và Horizon VDI. 
                Dành riêng cho enterprise cần infrastructure mission-critical với performance cao và bảo mật tối ưu.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg"
                  className="bg-gray-700 hover:bg-gray-800 px-8 py-4 text-lg font-semibold"
                  onClick={() => {
                    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  data-testid="button-check-vmware-packages"
                >
                  Kiểm Tra Gói VMware Phù Hợp
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white px-8 py-4 text-lg"
                  onClick={() => window.location.href = '/contact'}
                  data-testid="button-request-demo"
                >
                  Yêu Cầu Demo Enterprise
                </Button>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Tin cậy bởi 500,000+ organizations toàn cầu!</span>
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
                  <span className="text-gray-400 ml-4">vCenter Management</span>
                </div>
                
                <div className="space-y-2">
                  <div><span className="text-blue-400">$</span> esxcli system maintenanceMode set</div>
                  <div><span className="text-blue-400">$</span> vim-cmd vmsvc/power.on vmid</div>
                  <div><span className="text-blue-400">$</span> vmotion migrate --hot vm1 host2</div>
                  <div><span className="text-green-500">✓</span> HA cluster ready: 99.99% uptime!</div>
                </div>
              </div>

              {/* Tech Stack Icons */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {techFeatures.map((tech, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-4 text-center">
                    <tech.icon className="h-8 w-8 text-gray-700 mx-auto mb-2" />
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
              Tại Sao Chọn VMware Enterprise?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những ưu thế vượt trội của VMware cho doanh nghiệp lớn
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
                  <div className="bg-gray-100 rounded-xl p-4 flex-shrink-0">
                    <benefit.icon className="h-8 w-8 text-gray-700" />
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

      {/* VMware Advantages Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tính Năng Cốt Lõi VMware
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bộ công cụ enterprise toàn diện cho virtualization và cloud
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {vmwareAdvantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                data-testid={`advantage-card-${index}`}
              >
                <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-3 w-fit mb-4">
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
              Gói Dịch Vụ VMware Enterprise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Lựa chọn giải pháp phù hợp với quy mô và nhu cầu doanh nghiệp
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
                    ? 'border-gray-700 transform scale-105' 
                    : 'border-gray-200'
                } p-8 hover:shadow-2xl transition-all`}
                data-testid={`package-card-${index}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Phổ biến nhất
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-gray-700 mb-2">{pkg.price}</div>
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
                      ? 'bg-gray-700 hover:bg-gray-800 text-white'
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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              So Sánh Hiệu Suất VMware Enterprise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Benchmarks thực tế cho virtualization và enterprise workloads
            </p>
          </div>
          
          <PerformanceBenchmark />
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-3xl p-12">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-8 w-8 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-2xl text-gray-900 font-medium mb-8 italic leading-relaxed">
                "{testimonial.text}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-600 text-sm">Vietnam Banking Industry</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-slate-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Sẵn Sàng Triển Khai VMware Enterprise?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Tham gia 500,000+ organizations toàn cầu tin tưởng VMware. Nhận demo và tư vấn từ certified specialists.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-gray-800 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              onClick={() => window.location.href = '/contact'}
              data-testid="button-request-demo-cta"
            >
              Yêu Cầu Demo Enterprise
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-4 text-lg"
              onClick={() => window.location.href = '/contact'}
              data-testid="button-contact-specialist"
            >
              Liên Hệ Chuyên Gia
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}