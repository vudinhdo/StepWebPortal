import { useState } from "react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Server, 
  Database, 
  BarChart3, 
  Cpu, 
  Zap, 
  Shield, 
  DollarSign, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Cloud,
  Users,
  Award,
  Target
} from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";

export default function GCPPage() {
  const [showContactForm, setShowContactForm] = useState(false);

  // Featured GCP Services
  const gcpServices = [
    {
      icon: <Server className="h-12 w-12 text-[hsl(207,100%,40%)]" />,
      title: "Compute Engine",
      description: "Máy ảo có hiệu suất cao với khả năng tùy chỉnh linh hoạt. Hỗ trợ nhiều hệ điều hành, tự động mở rộng theo nhu cầu và thanh toán theo sử dụng thực tế.",
      features: ["Auto-scaling", "Load balancing", "Custom machine types", "Preemptible VMs"]
    },
    {
      icon: <Database className="h-12 w-12 text-[hsl(207,100%,40%)]" />,
      title: "Cloud Storage",
      description: "Lưu trữ dữ liệu an toàn với độ bền 99.999999999% (11 chín). Hỗ trợ nhiều lớp lưu trữ từ hot data đến cold archive với chi phí tối ưu.",
      features: ["Multi-regional storage", "Lifecycle management", "Object versioning", "IAM security"]
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-[hsl(207,100%,40%)]" />,
      title: "BigQuery",
      description: "Data warehouse serverless cho phân tích dữ liệu lớn với tốc độ petabyte/giây. Tích hợp ML và AI để khai thác insight từ dữ liệu doanh nghiệp.",
      features: ["Serverless analytics", "Real-time insights", "Built-in ML", "Cost optimization"]
    },
    {
      icon: <Cpu className="h-12 w-12 text-[hsl(207,100%,40%)]" />,
      title: "Kubernetes Engine",
      description: "Quản lý container tự động với Google Kubernetes Engine (GKE). Triển khai, quản lý và mở rộng ứng dụng container một cách dễ dàng và hiệu quả.",
      features: ["Auto-upgrade", "Auto-repair", "Cluster autoscaling", "Workload identity"]
    }
  ];

  // GCP vs Competitors Comparison Data
  const comparisonData = [
    {
      metric: "Chi phí",
      gcp: 85,
      aws: 100,
      azure: 95,
      description: "GCP tiết kiệm 15% so với AWS"
    },
    {
      metric: "Hiệu suất",
      gcp: 95,
      aws: 85,
      azure: 80,
      description: "Nhanh hơn 12% nhờ network backbone"
    },
    {
      metric: "Bảo mật",
      gcp: 98,
      aws: 90,
      azure: 88,
      description: "Zero Trust và BeyondCorp security"
    },
    {
      metric: "AI/ML",
      gcp: 95,
      aws: 75,
      azure: 70,
      description: "TensorFlow và AutoML tích hợp sẵn"
    }
  ];

  // Case Studies
  const caseStudies = [
    {
      company: "VinGroup",
      industry: "Bất động sản & Retail",
      logo: "🏢",
      challenge: "Xử lý dữ liệu khách hàng từ hàng triệu giao dịch",
      solution: "BigQuery + Cloud Storage + Compute Engine",
      results: [
        "Giảm 40% thời gian phân tích dữ liệu",
        "Tăng 25% hiệu quả marketing nhờ AI insights",
        "Tiết kiệm 30% chi phí IT infrastructure"
      ],
      testimonial: "GCP đã giúp chúng tôi xử lý dữ liệu nhanh hơn và đưa ra quyết định kinh doanh chính xác hơn."
    },
    {
      company: "Tiki",
      industry: "E-commerce",
      logo: "🛒",
      challenge: "Scale hệ thống trong các đợt sale lớn",
      solution: "Kubernetes Engine + Load Balancer + Cloud SQL",
      results: [
        "Xử lý được 10x traffic trong ngày 11/11",
        "Uptime 99.99% trong peak hours",
        "Giảm 50% thời gian deploy ứng dụng mới"
      ],
      testimonial: "Kubernetes Engine giúp chúng tôi tự tin scale trong các sự kiện lớn mà không lo về downtime."
    },
    {
      company: "FPT Software",
      industry: "Công nghệ phần mềm",
      logo: "💻",
      challenge: "Phát triển AI solutions cho khách hàng quốc tế",
      solution: "AI Platform + TPUs + Cloud Run",
      results: [
        "Rút ngắn 60% thời gian training ML models",
        "Deploy AI services trong vài phút",
        "Hỗ trợ 50+ dự án AI đồng thời"
      ],
      testimonial: "TPUs và AI Platform của Google giúp chúng tôi deliver AI solutions nhanh hơn bao giờ hết."
    }
  ];

  return (
    <>
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              {/* Left Column - Content */}
              <div className="">
                {/* Badge */}
                <div className="inline-flex items-center bg-[hsl(207,100%,40%)] text-white px-4 py-2 rounded-lg text-sm font-medium mb-6">
                  <Cloud className="mr-2 h-5 w-5" />
                  Google Cloud Platform
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  <span className="text-[hsl(207,100%,40%)]">Sức mạnh Điện toán Đám mây</span>{" "}
                  <span className="text-gray-800">– Nâng Tầm</span>{" "}
                  <span className="text-[hsl(32,95%,55%)]">AI & Machine Learning</span>{" "}
                  <span className="text-gray-800">Của Bạn Chỉ Trong Phút Chốc!</span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Google Cloud Platform với BigQuery xử lý petabyte data, AI Platform training models nhanh gấp 10 lần, 
                  và auto-scaling global infrastructure. Dành riêng cho doanh nghiệp SMEs cần breakthrough công nghệ!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    className="bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)] text-white text-lg px-8 py-4"
                    data-testid="button-explore-services"
                  >
                    Kiểm Tra Cloud Phù Hợp
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-2 border-[hsl(32,95%,55%)] text-[hsl(32,95%,55%)] hover:bg-[hsl(32,95%,55%)] hover:text-white text-lg px-8 py-4"
                    data-testid="button-free-consultation"
                  >
                    Tư Vấn Miễn Phí
                  </Button>
                </div>
                
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Nhận $300 credit miễn phí để trải nghiệm ngay hôm nay!</span>
                </div>
              </div>
              
              {/* Right Column - Performance Metrics Card */}
              <div className="lg:flex justify-center">
                <Card className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-sm border-0">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-6">Google Cloud Performance</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">AI/ML Processing</span>
                        <span className="text-sm font-bold text-[hsl(207,100%,40%)]">&lt; 1s</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-[hsl(207,100%,40%)] to-[hsl(207,100%,50%)] h-2 rounded-full" style={{width: "95%"}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">Global Availability</span>
                        <span className="text-sm font-bold text-green-600">99.95%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{width: "99%"}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">Auto-scaling Speed</span>
                        <span className="text-sm font-bold text-[hsl(32,95%,55%)]">A+</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-[hsl(32,95%,55%)] to-orange-500 h-2 rounded-full" style={{width: "98%"}}></div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Services Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Các Dịch Vụ <span className="text-[hsl(207,100%,40%)]">Nổi Bật</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Bộ công cụ cloud toàn diện từ Google để xây dựng, triển khai và mở rộng ứng dụng
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
              {gcpServices.map((service, index) => (
                <Card key={index} className="hover:shadow-2xl transition-all duration-300 border-0 shadow-lg rounded-2xl overflow-hidden" data-testid={`card-service-${index}`}>
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="bg-blue-50 rounded-2xl p-4 flex-shrink-0">
                        {service.icon}
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {service.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                              <CheckCircle className="h-4 w-4 text-[hsl(207,100%,40%)] mr-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Chart Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                <span className="text-[hsl(207,100%,40%)]">So Sánh</span> GCP với Đối Thủ
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tại sao Google Cloud Platform là lựa chọn tối ưu cho doanh nghiệp Việt Nam
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <Card className="rounded-2xl shadow-2xl border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-[hsl(207,100%,40%)] to-[hsl(207,100%,50%)] text-white p-8">
                    <h3 className="text-2xl font-bold text-center">Biểu Đồ So Sánh Chi Phí & Hiệu Suất</h3>
                  </div>
                  
                  <div className="p-8">
                    <div className="space-y-8">
                      {comparisonData.map((data, index) => (
                        <div key={index} className="space-y-4" data-testid={`comparison-metric-${index}`}>
                          <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold text-gray-900">{data.metric}</h4>
                            <p className="text-sm text-gray-600">{data.description}</p>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4">
                            {/* GCP */}
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium text-[hsl(207,100%,40%)]">Google Cloud</span>
                                <span className="text-sm font-bold text-[hsl(207,100%,40%)]">{data.gcp}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div 
                                  className="bg-gradient-to-r from-[hsl(207,100%,40%)] to-[hsl(207,100%,50%)] h-3 rounded-full transition-all duration-1000"
                                  style={{ width: `${data.gcp}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            {/* AWS */}
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-600">AWS</span>
                                <span className="text-sm font-bold text-gray-600">{data.aws}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div 
                                  className="bg-gray-400 h-3 rounded-full transition-all duration-1000"
                                  style={{ width: `${data.aws}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            {/* Azure */}
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-600">Azure</span>
                                <span className="text-sm font-bold text-gray-600">{data.azure}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div 
                                  className="bg-gray-400 h-3 rounded-full transition-all duration-1000"
                                  style={{ width: `${data.azure}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-12 p-6 bg-blue-50 rounded-xl">
                      <div className="flex items-center justify-center space-x-8 text-center">
                        <div>
                          <div className="text-3xl font-bold text-[hsl(207,100%,40%)]">15%</div>
                          <div className="text-sm text-gray-600">Tiết kiệm chi phí</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-[hsl(32,95%,55%)]">12%</div>
                          <div className="text-sm text-gray-600">Nhanh hơn</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-green-600">99.95%</div>
                          <div className="text-sm text-gray-600">Uptime SLA</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Câu Chuyện <span className="text-[hsl(32,95%,55%)]">Thành Công</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Khám phá cách các doanh nghiệp hàng đầu Việt Nam đã thành công với Google Cloud Platform
              </p>
            </div>
            
            <div className="space-y-16 max-w-6xl mx-auto">
              {caseStudies.map((study, index) => (
                <Card key={index} className="rounded-3xl shadow-2xl border-0 overflow-hidden hover:shadow-3xl transition-all duration-500" data-testid={`case-study-${index}`}>
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      {/* Left side - Company info */}
                      <div className="p-10 bg-gradient-to-br from-blue-50 to-indigo-50">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="text-4xl">{study.logo}</div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{study.company}</h3>
                            <p className="text-gray-600">{study.industry}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Thách thức:</h4>
                            <p className="text-gray-700">{study.challenge}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Giải pháp:</h4>
                            <Badge className="bg-[hsl(207,100%,40%)] text-white px-3 py-1">
                              {study.solution}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right side - Results */}
                      <div className="p-10">
                        <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                          <Award className="h-6 w-6 text-[hsl(32,95%,55%)] mr-2" />
                          Kết quả đạt được:
                        </h4>
                        
                        <ul className="space-y-4 mb-8">
                          {study.results.map((result, resultIndex) => (
                            <li key={resultIndex} className="flex items-start">
                              <Target className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{result}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="bg-gray-50 rounded-xl p-6">
                          <div className="flex items-center mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <blockquote className="text-gray-700 italic">
                            "{study.testimonial}"
                          </blockquote>
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
        <section className="py-24 bg-gradient-to-r from-[hsl(207,100%,40%)] via-[hsl(207,100%,45%)] to-[hsl(32,95%,55%)] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Sẵn Sàng Chuyển Đổi Số Với Google Cloud?
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
              Nhận $300 credit miễn phí để trải nghiệm sức mạnh Google Cloud Platform. 
              Đội ngũ chuyên gia sẽ hỗ trợ bạn 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                className="bg-white text-[hsl(207,100%,40%)] hover:bg-gray-100 text-lg px-10 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                data-testid="button-start-trial"
              >
                Bắt Đầu Dùng Thử Ngay
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[hsl(207,100%,40%)] text-lg px-10 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                data-testid="button-contact-expert"
              >
                Liên Hệ Chuyên Gia
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}