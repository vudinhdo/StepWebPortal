import { useState } from "react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, 
  Server, 
  Cpu, 
  Zap, 
  Shield, 
  DollarSign, 
  Users, 
  CheckCircle,
  ArrowRight,
  Star
} from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";
import CloudContactForm from "../components/cloud-contact-form";
import CloudPopup from "../components/cloud-popup";
import QuoteBuilder from "../components/quote-builder";

export default function CloudPage() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);

  // Show popup after 10 seconds or 50% scroll
  React.useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 10000);
    
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent >= 50) {
        setShowPopup(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const benefits = [
    {
      icon: <Zap className="h-8 w-8 text-[hsl(207,100%,40%)]" />,
      title: "Hiệu Suất Cao & Linh Hoạt",
      description: "Cloud GPU/AMD xử lý AI và dữ liệu lớn nhanh chóng; Cloud Server hỗ trợ K8s cho DevOps; Cloud N8N tự động hóa workflow – phù hợp SMEs cần scale nhanh mà không đầu tư hạ tầng đắt đỏ."
    },
    {
      icon: <DollarSign className="h-8 w-8 text-[hsl(207,100%,40%)]" />,
      title: "Tiết Kiệm Chi Phí",
      description: "Pay-as-you-go, chỉ trả phí sử dụng thực tế. Tiết kiệm lên đến 50% so với máy chủ vật lý, với tích hợp dễ dàng vào Hosting hoặc Email."
    },
    {
      icon: <Shield className="h-8 w-8 text-[hsl(207,100%,40%)]" />,
      title: "An Toàn & Đáng Tin Cậy",
      description: "Bảo mật dữ liệu cao cấp (SOC 2 compliant), sao lưu tự động, uptime 99.99%. Hỗ trợ 24/7 từ đội ngũ chuyên gia tại Hà Nội."
    },
    {
      icon: <Users className="h-8 w-8 text-[hsl(207,100%,40%)]" />,
      title: "Ứng Dụng Thực Tế",
      description: "Lý tưởng cho IT Manager xử lý machine learning, SysOps quản lý workflow, hoặc doanh nghiệp cần Cloud Odoo cho ERP."
    }
  ];

  const plans = [
    {
      name: "Gói Cơ Bản",
      price: "500.000",
      period: "/tháng",
      description: "Cloud Server cơ bản",
      features: [
        "Cloud Server cơ bản",
        "Hỗ trợ K8s",
        "Backup tự động",
        "Support 24/7"
      ],
      target: "Phù hợp: Startup thử nghiệm",
      popular: false
    },
    {
      name: "Gói Nâng Cao",
      price: "1.500.000",
      period: "/tháng",
      description: "Cloud GPU/AMD + Automation",
      features: [
        "Cloud GPU/AMD",
        "Workflow automation (N8N)",
        "Advanced monitoring",
        "Priority support",
        "API access"
      ],
      target: "Phù hợp: SMEs cần hiệu suất cao",
      popular: true
    },
    {
      name: "Gói Doanh Nghiệp",
      price: "3.000.000",
      period: "/tháng",
      description: "Cloud Odoo toàn diện",
      features: [
        "Cloud Odoo toàn diện",
        "Tích hợp AI & bảo mật nâng cao",
        "Custom workflow",
        "Dedicated support",
        "SLA 99.99%"
      ],
      target: "Phù hợp: Doanh nghiệp lớn với dữ liệu phức tạp",
      popular: false
    }
  ];

  const whyChooseUs = [
    {
      title: "Tích Hợp Mượt Mà",
      description: "Kết nối liền mạch với các dịch vụ khác như Hosting Laravel hoặc Email Google Workspace, giúp doanh nghiệp của bạn hoạt động không gián đoạn."
    },
    {
      title: "Đánh Giá Từ Khách Hàng",
      description: "\"Cloud GPU của STEP đã giúp chúng tôi xử lý AI nhanh gấp đôi, hỗ trợ tuyệt vời!\" – Chị B., IT Manager tại SMEs Hà Nội.",
      testimonial: true
    },
    {
      title: "Cam Kết",
      description: "Dùng thử miễn phí 7 ngày, hoàn tiền nếu không hài lòng. Chúng tôi cam kết hạ tầng Việt Nam, an toàn và tối ưu cho doanh nghiệp địa phương."
    }
  ];

  return (
    <>
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Giải Pháp Cloud Linh Hoạt –{" "}
                <span className="text-[hsl(207,100%,40%)]">
                  Xây Dựng Hạ Tầng Mạnh Mẽ
                </span>{" "}
                Cho Doanh Nghiệp SMEs!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Cung cấp Cloud GPU, Cloud Server, Cloud Odoo, Cloud AMD và Cloud N8N với hỗ trợ K8s & workflow automation. 
                Tối ưu hiệu suất, tiết kiệm chi phí, dễ dàng mở rộng. Bắt đầu ngay để trải nghiệm đám mây đáng tin cậy!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={scrollToPricing}
                  className="bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)] text-white text-lg px-8 py-4"
                >
                  Khám Phá Gói Cloud Phù Hợp
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/contact'}
                  className="border-[hsl(207,100%,40%)] text-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,40%)] hover:text-white text-lg px-8 py-4"
                >
                  Tư Vấn Miễn Phí
                </Button>
              </div>
              
              <div className="flex items-center justify-center mt-8 space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Dùng thử 7 ngày miễn phí
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Uptime 99.99%
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Hỗ trợ 24/7
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Lợi Ích Của Dịch Vụ Cloud Từ STEP
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tận dụng sức mạnh của cloud computing để đẩy nhanh quá trình phát triển doanh nghiệp của bạn
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Bảng Gói Dịch Vụ Cloud
              </h2>
              <p className="text-xl text-gray-600">
                Chọn gói phù hợp với nhu cầu và quy mô doanh nghiệp của bạn
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-[hsl(207,100%,40%)] border-2 shadow-xl' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-[hsl(207,100%,40%)] text-white px-4 py-1">
                        Phổ Biến Nhất
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {plan.name}
                    </CardTitle>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-[hsl(207,100%,40%)]">
                        {plan.price.toLocaleString()}
                      </span>
                      <span className="text-gray-600 ml-1">{plan.period}</span>
                    </div>
                    <p className="text-gray-600 mt-2">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <p className="text-sm text-gray-500 mb-6 italic">
                      {plan.target}
                    </p>
                    
                    <Button 
                      className={`w-full ${plan.popular 
                        ? 'bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)] text-white' 
                        : 'bg-white border border-[hsl(207,100%,40%)] text-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,40%)] hover:text-white'
                      }`}
                      onClick={() => window.location.href = '/contact'}
                    >
                      Chọn Gói & Tư Vấn
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Tại Sao Chọn Dịch Vụ Cloud Từ STEP?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {whyChooseUs.map((item, index) => (
                <Card key={index} className={`p-6 ${item.testimonial ? 'bg-blue-50 border-[hsl(207,100%,40%)]' : ''}`}>
                  <CardContent className="p-0">
                    {item.testimonial && (
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className={`text-gray-600 ${item.testimonial ? 'italic' : ''}`}>
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Builder Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Tạo Biên Bản Báo Giá Tùy Chỉnh
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Cấu hình server theo nhu cầu của bạn và nhận báo giá chi tiết ngay lập tức
              </p>
              
              {!showQuoteBuilder && (
                <Button 
                  onClick={() => setShowQuoteBuilder(true)}
                  className="bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)] text-white text-lg px-8 py-4"
                >
                  Tạo Báo Giá Ngay
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>

            {showQuoteBuilder && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    Trình Báo Giá Tùy Chỉnh
                  </h3>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowQuoteBuilder(false)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Ẩn
                  </Button>
                </div>
                <QuoteBuilder />
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[hsl(207,100%,40%)] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sẵn Sàng Nâng Cấp Hạ Tầng Cloud Của Bạn?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Nhận báo giá cá nhân hóa và ưu đãi 20% cho tháng đầu tiên!
            </p>
            <Button 
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-[hsl(207,100%,40%)] hover:bg-gray-100 text-lg px-8 py-4"
            >
              Gửi Yêu Cầu & Nhận Báo Giá
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <CloudPopup open={showPopup} onOpenChange={setShowPopup} />
    </>
  );
}