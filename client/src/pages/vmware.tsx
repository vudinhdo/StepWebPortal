import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Server, 
  Monitor, 
  Network, 
  Cloud, 
  DollarSign, 
  Settings,
  CheckCircle,
  ArrowRight,
  Star,
  TrendingUp,
  Award
} from "lucide-react";

export default function VMwarePage() {
  // VMware Products and Solutions
  const vmwareProducts = [
    {
      icon: <Server className="h-14 w-14 text-blue-600" />,
      title: "VMware vSphere",
      subtitle: "Nền tảng Ảo hóa Compute",
      description: "Giải pháp ảo hóa server hàng đầu thế giới, cho phép tối ưu hóa tài nguyên phần cứng và đơn giản hóa quản lý datacenter. Hỗ trợ high availability, load balancing và disaster recovery tự động.",
      features: [
        "vMotion - Di chuyển VM không downtime",
        "High Availability (HA) tự động",
        "Distributed Resource Scheduler (DRS)",
        "vSAN - Storage ảo hóa tích hợp",
        "Fault Tolerance cho ứng dụng quan trọng"
      ],
      useCases: "Lý tưởng cho datacenter doanh nghiệp, private cloud, và môi trường production quan trọng."
    },
    {
      icon: <Monitor className="h-14 w-14 text-blue-600" />,
      title: "VMware Horizon",
      subtitle: "Virtual Desktop Infrastructure",
      description: "Giải pháp VDI và DaaS cho phép cung cấp desktop ảo và ứng dụng từ xa một cách an toàn và linh hoạt. Hỗ trợ remote work và BYOD với trải nghiệm người dùng tối ưu.",
      features: [
        "Virtual Desktop Infrastructure (VDI)",
        "Remote Application Publishing",
        "Multi-cloud deployment",
        "Advanced security policies",
        "Instant Clone technology"
      ],
      useCases: "Phù hợp cho remote work, education, call center, và môi trường cần bảo mật cao."
    },
    {
      icon: <Network className="h-14 w-14 text-blue-600" />,
      title: "VMware NSX",
      subtitle: "Network Virtualization Platform",
      description: "Nền tảng ảo hóa mạng và bảo mật tiên tiến, cung cấp micro-segmentation, firewall phân tán và load balancing software-defined. Tạo ra mạng ảo linh hoạt và an toàn.",
      features: [
        "Micro-segmentation bảo mật",
        "Distributed Firewall",
        "Load Balancer tích hợp",
        "VPN và NAT ảo hóa",
        "Zero Trust Network Access"
      ],
      useCases: "Essential cho multi-cloud networking, security compliance, và modern application architecture."
    },
    {
      icon: <Cloud className="h-14 w-14 text-blue-600" />,
      title: "VMware Tanzu",
      subtitle: "Modern Application Platform",
      description: "Platform toàn diện cho việc build, run và manage modern applications trên Kubernetes. Tích hợp DevOps, container orchestration và application services cho cloud-native development.",
      features: [
        "Kubernetes cluster management",
        "DevOps pipeline automation",
        "Application catalog và marketplace",
        "Multi-cloud application deployment",
        "Developer-friendly tools"
      ],
      useCases: "Dành cho digital transformation, microservices architecture, và cloud-native application development."
    }
  ];

  // Benefits
  const benefits = [
    {
      icon: <DollarSign className="h-12 w-12 text-gray-700" />,
      title: "Tối Ưu Hóa Chi Phí",
      description: "Giảm 50-70% chi phí infrastructure thông qua server consolidation và resource pooling. Tối ưu hóa license, điện năng và không gian datacenter.",
      metrics: [
        "Giảm 60% số lượng physical server",
        "Tiết kiệm 40% chi phí vận hành",
        "ROI đạt 300% trong 18 tháng"
      ]
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-gray-700" />,
      title: "Tăng Hiệu Suất",
      description: "Cải thiện performance và uptime thông qua load balancing thông minh, automatic failover và resource optimization real-time.",
      metrics: [
        "Uptime 99.9% với HA clustering",
        "Giảm 80% thời gian deployment",
        "Tăng 200% resource utilization"
      ]
    },
    {
      icon: <Settings className="h-12 w-12 text-gray-700" />,
      title: "Đơn Giản Hóa Quản Lý",
      description: "Centralized management console, automation workflows và policy-based governance giúp IT team quản lý infrastructure hiệu quả hơn.",
      metrics: [
        "Giảm 70% thời gian admin tasks",
        "Tự động hóa 90% routine operations",
        "Single pane of glass management"
      ]
    }
  ];

  // Customer Testimonials
  const testimonials = [
    {
      company: "Vietcombank",
      industry: "Ngân hàng",
      logo: "🏦",
      position: "CTO",
      name: "Nguyễn Văn A",
      quote: "VMware vSphere đã giúp chúng tôi tối ưu hóa datacenter và đảm bảo tính sẵn sàng cao cho các hệ thống ngân hàng quan trọng. Uptime 99.99% trong 3 năm qua.",
      results: [
        "99.99% uptime cho core banking",
        "Giảm 60% chi phí infrastructure",
        "Zero downtime maintenance"
      ]
    },
    {
      company: "FPT Corporation",
      industry: "Công nghệ",
      logo: "💻",
      position: "Head of Infrastructure",
      name: "Trần Thị B",
      quote: "VMware Horizon cho phép 15,000 nhân viên làm việc từ xa hiệu quả. Tanzu platform giúp team DevOps deploy applications nhanh gấp 5 lần so với trước đây.",
      results: [
        "Hỗ trợ 15K remote users",
        "Deploy time giảm 80%",
        "Developer productivity tăng 300%"
      ]
    },
    {
      company: "Vinamilk",
      industry: "Thực phẩm & Đồ uống",
      logo: "🥛",
      position: "IT Director",
      name: "Lê Văn C",
      quote: "NSX micro-segmentation bảo vệ hệ thống ERP và production line khỏi cyber threats. Compliance audit được thực hiện dễ dàng nhờ automated security policies.",
      results: [
        "Zero security incidents trong 2 năm",
        "Compliance audit pass 100%",
        "Network setup time giảm 70%"
      ]
    }
  ];

  return (
    <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-8 leading-tight">
                <span className="text-gray-700">Tương lai của</span>{" "}
                <span className="text-blue-600">Điện toán Đám mây</span>{" "}
                <span className="text-gray-700">và</span>{" "}
                <span className="text-blue-600">Ảo hóa</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto">
                Khám phá giải pháp ảo hóa và cloud computing enterprise-grade từ VMware. 
                Từ datacenter virtualization đến modern application platform - 
                công nghệ đáng tin cậy cho doanh nghiệp Việt Nam.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  data-testid="button-explore-solutions"
                >
                  Khám Phá Giải Pháp VMware
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white text-lg px-10 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  data-testid="button-contact-specialist"
                >
                  Liên Hệ Chuyên Gia
                </Button>
              </div>
              
              <div className="flex items-center justify-center mt-12 space-x-8 text-lg text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  Trusted by 500K+ organizations
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  99.9% uptime SLA
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  24/7 enterprise support
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VMware Products and Solutions Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Các Sản Phẩm và <span className="text-blue-600">Giải Pháp</span> VMware
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Bộ giải pháp toàn diện từ server virtualization đến modern application platform
              </p>
            </div>
            
            <div className="space-y-16 max-w-7xl mx-auto">
              {vmwareProducts.map((product, index) => (
                <Card key={index} className="shadow-xl border-0 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300" data-testid={`card-product-${index}`}>
                  <CardContent className="p-0">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                      {/* Product Info */}
                      <div className={`p-10 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="bg-blue-50 rounded-2xl p-4">
                            {product.icon}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-800">
                              {product.title}
                            </h3>
                            <p className="text-blue-600 font-semibold">
                              {product.subtitle}
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                          {product.description}
                        </p>
                        
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-800 mb-3">Tính năng chính:</h4>
                          <ul className="space-y-2">
                            {product.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-sm text-gray-600 italic">
                            <strong>Use Cases:</strong> {product.useCases}
                          </p>
                        </div>
                      </div>
                      
                      {/* Visual/Stats Side */}
                      <div className={`bg-gradient-to-br from-blue-50 to-gray-100 p-10 flex items-center justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                        <div className="text-center">
                          <div className="bg-white rounded-full p-8 shadow-lg mb-6 inline-block">
                            {React.cloneElement(product.icon, { className: "h-20 w-20 text-blue-600" })}
                          </div>
                          <h4 className="text-xl font-bold text-gray-800 mb-4">
                            Enterprise Ready
                          </h4>
                          <div className="grid grid-cols-1 gap-4 text-center">
                            <div className="bg-white rounded-lg p-4 shadow-sm">
                              <div className="text-2xl font-bold text-blue-600">99.9%</div>
                              <div className="text-sm text-gray-600">Uptime SLA</div>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow-sm">
                              <div className="text-2xl font-bold text-blue-600">24/7</div>
                              <div className="text-sm text-gray-600">Support</div>
                            </div>
                            <div className="bg-white rounded-lg p-4 shadow-sm">
                              <div className="text-2xl font-bold text-blue-600">500K+</div>
                              <div className="text-sm text-gray-600">Customers</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Lợi Ích <span className="text-blue-600">Cốt Lõi</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tại sao các doanh nghiệp hàng đầu thế giới tin tưởng VMware
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center shadow-xl border-0 rounded-2xl bg-white hover:shadow-2xl transition-all duration-300" data-testid={`card-benefit-${index}`}>
                  <CardContent className="p-10">
                    <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-8 flex items-center justify-center">
                      {benefit.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                      {benefit.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      {benefit.description}
                    </p>
                    
                    <div className="space-y-4">
                      {benefit.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="bg-blue-50 rounded-lg p-4">
                          <div className="flex items-center justify-center">
                            <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                            <span className="font-semibold text-gray-800">{metric}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Nhận Xét Từ <span className="text-blue-600">Khách Hàng</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Lắng nghe từ các doanh nghiệp hàng đầu Việt Nam đã thành công với VMware
              </p>
            </div>
            
            <div className="space-y-12 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="shadow-2xl border-0 rounded-3xl overflow-hidden" data-testid={`testimonial-${index}`}>
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                      {/* Company Info */}
                      <div className="bg-gradient-to-br from-gray-800 to-gray-700 text-white p-10">
                        <div className="text-center">
                          <div className="text-6xl mb-4">{testimonial.logo}</div>
                          <h3 className="text-2xl font-bold mb-2">
                            {testimonial.company}
                          </h3>
                          <p className="text-gray-300 mb-6">
                            {testimonial.industry}
                          </p>
                          
                          <div className="border-t border-gray-600 pt-6">
                            <p className="font-semibold text-lg">
                              {testimonial.name}
                            </p>
                            <p className="text-gray-300 text-sm">
                              {testimonial.position}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Testimonial Content */}
                      <div className="lg:col-span-2 p-10">
                        <div className="flex items-center mb-6">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        
                        <blockquote className="text-lg text-gray-700 mb-8 leading-relaxed italic">
                          "{testimonial.quote}"
                        </blockquote>
                        
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                            <Award className="h-5 w-5 text-blue-600 mr-2" />
                            Kết quả đạt được:
                          </h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {testimonial.results.map((result, resultIndex) => (
                              <div key={resultIndex} className="bg-blue-50 rounded-lg p-4 text-center">
                                <CheckCircle className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                                <p className="text-sm font-semibold text-gray-800">
                                  {result}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-gray-800 via-gray-700 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Sẵn Sàng Chuyển Đổi Infrastructure?
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-4xl mx-auto">
              Tham gia cùng hàng triệu doanh nghiệp toàn cầu đã tin tưởng VMware. 
              Nhận tư vấn miễn phí từ certified VMware specialists.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                data-testid="button-request-demo"
              >
                Yêu Cầu Demo & Báo Giá
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-800 text-lg px-10 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                data-testid="button-download-guide"
              >
                Tải Tài Liệu Kỹ Thuật
              </Button>
            </div>
          </div>
        </section>
      </main>
  );
}