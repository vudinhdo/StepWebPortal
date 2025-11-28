import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Router, 
  Shield, 
  Network, 
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
  Cable,
  Zap,
  Settings,
  Monitor,
  Award,
  Gauge
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PerformanceBenchmark from "@/components/performance-benchmark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NetworkEquipment() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectDescription: "",
    package: ""
  });

  const benefits = [
    {
      icon: Router,
      title: "Enterprise Network Infrastructure",
      description: "Cisco, Juniper và Aruba enterprise routers/switches với high-throughput performance và advanced routing protocols – lý tưởng cho large-scale networks cần reliability và scalability cho critical business operations."
    },
    {
      icon: Shield,
      title: "Network Security Appliances", 
      description: "Next-generation firewalls, IPS/IDS systems và VPN concentrators với threat intelligence và automated response capabilities – comprehensive protection cho network perimeter và internal security."
    },
    {
      icon: Monitor,
      title: "Network Management & Monitoring",
      description: "Professional installation, configuration và 24/7 monitoring services với proactive maintenance và performance optimization – complete lifecycle support cho network infrastructure investments."
    },
    {
      icon: Zap,
      title: "High-Performance Networking",
      description: "10Gbps+ switches, fiber optic infrastructure và low-latency solutions với bandwidth optimization – designed cho demanding applications và high-throughput environments."
    }
  ];

  const equipmentAdvantages = [
    {
      icon: Router,
      title: "Enterprise Routers & Switches",
      description: "Cisco Catalyst series, Juniper EX/QFX switches với advanced Layer 3 routing, VLAN management và QoS policies. Scalable solutions cho campus và data center networks."
    },
    {
      icon: Shield,
      title: "Firewall & Security Devices",
      description: "Next-gen firewalls từ Palo Alto, Fortinet với application control, SSL inspection và threat prevention. Comprehensive security cho network perimeter protection."
    },
    {
      icon: Cable,
      title: "Wireless Infrastructure",
      description: "Enterprise Wi-Fi 6/6E access points, wireless controllers và mesh networking solutions. High-density deployments với seamless roaming và advanced security."
    },
    {
      icon: Monitor,
      title: "Network Monitoring Tools",
      description: "SNMP monitoring, network analyzers và performance management platforms. Real-time visibility và analytics cho network optimization và troubleshooting."
    },
    {
      icon: Database,
      title: "Fiber Optic Solutions",
      description: "Single/multi-mode fiber infrastructure, SFP+ transceivers và fiber switches. High-bandwidth connectivity cho data center interconnects và backbone networks."
    },
    {
      icon: Settings,
      title: "Network Configuration Services",
      description: "Professional setup, VLAN configuration và routing optimization. Expert deployment với best practices và documentation cho network administration."
    }
  ];

  const packages = [
    {
      name: "Network Starter",
      price: "25.000.000 VNĐ",
      storage: "SMB network setup",
      features: "Basic router + switch + firewall",
      suitable: "Small business 10-50 users",
      color: "blue",
      specs: [
        "Cisco SG350 managed switch",
        "Cisco ISR4331 router",
        "SonicWall TZ firewall",
        "Basic configuration included",
        "1 year warranty",
        "Email support"
      ]
    },
    {
      name: "Network Professional",
      price: "85.000.000 VNĐ", 
      storage: "Enterprise-grade infrastructure",
      features: "Advanced routing + security",
      suitable: "Growing enterprises",
      color: "green",
      popular: true,
      specs: [
        "All từ gói Starter",
        "Cisco Catalyst 9300 series", 
        "Palo Alto firewall",
        "Wireless controller + APs",
        "Professional configuration",
        "24/7 phone support"
      ]
    },
    {
      name: "Network Enterprise",
      price: "200.000.000 VNĐ",
      storage: "Full data center setup", 
      features: "Redundant + high-availability",
      suitable: "Large enterprises",
      color: "purple",
      specs: [
        "All từ gói Professional",
        "Cisco Nexus data center switches",
        "Redundant core infrastructure",
        "Fiber backbone installation",
        "Dedicated account manager",
        "SLA guarantees"
      ]
    }
  ];

  const testimonial = {
    text: "Network infrastructure từ STEP đã tăng 300% throughput và giảm 90% network downtime!",
    author: "Anh H., Network Admin tại Techcombank"
  };

  const techFeatures = [
    { name: "Cisco Catalyst", icon: Router },
    { name: "Palo Alto FW", icon: Shield },
    { name: "Aruba WiFi", icon: Network },
    { name: "Fiber Backbone", icon: Cable },
    { name: "SNMP Monitor", icon: Monitor },
    { name: "24/7 Support", icon: Settings }
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
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mr-4">
                  <Network className="text-white w-6 h-6" />
                </div>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  Enterprise Network Equipment
                </span>
              </div>
              
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Network Equipment – 
                <span className="text-orange-600"> Enterprise Infrastructure</span> 
                Tăng 300% Network Performance!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Thiết bị mạng enterprise-grade từ Cisco, Juniper và Palo Alto với professional installation và 24/7 support. 
                Dành riêng cho doanh nghiệp cần network infrastructure với high-availability và security tối đa.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 px-8 py-4 text-lg font-semibold"
                  onClick={() => {
                    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  data-testid="button-check-network-packages"
                >
                  Kiểm Tra Gói Network Phù Hợp
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-4 text-lg"
                  onClick={() => window.location.href = '/contact'}
                  data-testid="button-network-consultation"
                >
                  Tư Vấn Network Design
                </Button>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Triển khai 1000+ network infrastructures tại Việt Nam!</span>
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
                  <span className="text-gray-400 ml-4">Network Management</span>
                </div>
                
                <div className="space-y-2">
                  <div><span className="text-blue-400">$</span> show interface status</div>
                  <div><span className="text-blue-400">$</span> show vlan brief</div>
                  <div><span className="text-blue-400">$</span> show ip route summary</div>
                  <div><span className="text-green-500">✓</span> Network topology healthy!</div>
                </div>
              </div>

              {/* Tech Stack Icons */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {techFeatures.map((tech, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-4 text-center">
                    <tech.icon className="h-8 w-8 text-orange-600 mx-auto mb-2" />
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
              Tại Sao Chọn Network Equipment Enterprise?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những ưu thế vượt trội của network infrastructure enterprise-grade
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
                  <div className="bg-orange-100 rounded-xl p-4 flex-shrink-0">
                    <benefit.icon className="h-8 w-8 text-orange-600" />
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

      {/* Equipment Advantages Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Các Loại Thiết Bị Mạng Enterprise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive network solutions từ access đến core layer
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {equipmentAdvantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                data-testid={`advantage-card-${index}`}
              >
                <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg p-3 w-fit mb-4">
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
              Gói Thiết Bị Mạng Enterprise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Network infrastructure packages cho mọi quy mô doanh nghiệp
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
                    ? 'border-orange-600 transform scale-105' 
                    : 'border-gray-200'
                } p-8 hover:shadow-2xl transition-all`}
                data-testid={`package-card-${index}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Phổ biến nhất
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-orange-600 mb-2">{pkg.price}</div>
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
                      ? 'bg-orange-600 hover:bg-orange-700 text-white'
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
      <section className="py-20 bg-gradient-to-br from-orange-50 to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              So Sánh Hiệu Suất Network Infrastructure
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Benchmarks thực tế cho network performance và throughput
            </p>
          </div>
          
          <PerformanceBenchmark />
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-orange-50 to-gray-50 rounded-3xl p-12">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-8 w-8 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-2xl text-gray-900 font-medium mb-8 italic leading-relaxed">
                "{testimonial.text}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
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
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Sẵn Sàng Upgrade Network Infrastructure?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Tăng 300% network performance và giảm 90% downtime. Nhận network assessment miễn phí từ certified engineers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              onClick={() => window.location.href = '/contact'}
              data-testid="button-network-assessment"
            >
              Network Assessment Miễn Phí
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg"
              onClick={() => window.location.href = '/contact'}
              data-testid="button-contact-network-expert"
            >
              Liên Hệ Network Expert
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}