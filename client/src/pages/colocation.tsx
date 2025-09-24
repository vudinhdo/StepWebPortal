import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building, 
  Shield, 
  Zap, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Cpu,
  HardDrive,
  Wifi,
  Clock,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Colocation() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const benefits = [
    {
      icon: Building,
      title: "Datacenter Đẳng Cấp",
      description: "Cơ sở hạ tầng datacenter hiện đại với tiêu chuẩn Tier III, đảm bảo uptime 99.982%."
    },
    {
      icon: Shield,
      title: "Bảo Mật Tuyệt Đối",
      description: "Hệ thống bảo mật vật lý 24/7, camera giám sát, kiểm soát ra vào bằng thẻ từ và sinh trắc học."
    },
    {
      icon: Zap,
      title: "Nguồn Điện Dự Phòng",
      description: "Hệ thống UPS và máy phát điện dự phòng đảm bảo không gián đoạn nguồn điện."
    },
    {
      icon: Wifi,
      title: "Kết Nối Cao Cấp",
      description: "Kết nối internet tốc độ cao với multiple ISP, băng thông lên đến 10Gbps."
    }
  ];

  const pricingPlans = [
    {
      name: "1U Colocation",
      price: "1,500,000",
      popular: false,
      specs: {
        space: "1U Rack Space",
        power: "Tối đa 300W",
        bandwidth: "100Mbps shared",
        ip: "1 IP public"
      },
      features: [
        "1U rack space",
        "300W power allocation",
        "100Mbps shared bandwidth",
        "1 IP public miễn phí",
        "Remote hands hỗ trợ"
      ]
    },
    {
      name: "Quarter Rack",
      price: "8,500,000",
      popular: true,
      specs: {
        space: "10U Rack Space",
        power: "Tối đa 2KW",
        bandwidth: "1Gbps dedicated",
        ip: "/29 subnet (6 IPs)"
      },
      features: [
        "10U rack space",
        "2KW power allocation",
        "1Gbps dedicated bandwidth",
        "/29 subnet (6 IPs)",
        "24/7 remote hands",
        "Cross connects miễn phí"
      ]
    },
    {
      name: "Half Rack",
      price: "15,000,000",
      popular: false,
      specs: {
        space: "21U Rack Space",
        power: "Tối đa 4KW",
        bandwidth: "2Gbps dedicated",
        ip: "/28 subnet (14 IPs)"
      },
      features: [
        "21U rack space",
        "4KW power allocation",
        "2Gbps dedicated bandwidth",
        "/28 subnet (14 IPs)",
        "24/7 remote hands",
        "Unlimited cross connects",
        "Private cage option"
      ]
    }
  ];

  const faqs = [
    {
      question: "Colocation là gì?",
      answer: "Colocation là dịch vụ cho thuê không gian tại datacenter để đặt server và thiết bị IT của khách hàng. STEP cung cấp điện, làm mát, bảo mật và kết nối internet."
    },
    {
      question: "Có hỗ trợ remote hands không?",
      answer: "Có, chúng tôi cung cấp dịch vụ remote hands 24/7 để hỗ trợ khách hàng thực hiện các tác vụ vật lý tại datacenter như restart server, thay ổ cứng, etc."
    },
    {
      question: "Làm thế nào để setup colocation?",
      answer: "Quy trình setup bao gồm: (1) Tư vấn nhu cầu, (2) Ký hợp đồng, (3) Chuẩn bị rack space, (4) Vận chuyển thiết bị, (5) Cài đặt và testing, (6) Go-live."
    },
    {
      question: "Có SLA như thế nào?",
      answer: "Chúng tôi cam kết 99.982% uptime cho power và cooling, 99.9% cho network connectivity. Nếu không đạt SLA, khách hàng sẽ được credit theo thỏa thuận."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="text-hero-title">
                Colocation Services
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-indigo-100" data-testid="text-hero-description">
                Hạ tầng datacenter đẳng cấp thế giới với hệ sinh thái đa dạng và dịch vụ hỗ trợ toàn diện
              </p>
              <Button 
                size="lg" 
                className="bg-white text-indigo-900 hover:bg-indigo-50 px-8 py-4"
                data-testid="button-hero-cta"
              >
                Tư Vấn Miễn Phí
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-benefits-title">
              Tại Sao Chọn Colocation STEP?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Datacenter hiện đại với công nghệ tiên tiến và dịch vụ hỗ trợ chuyên nghiệp
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                data-testid={`benefit-card-${index}`}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <benefit.icon className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-pricing-title">
              Gói Dịch Vụ Colocation
            </h2>
            <p className="text-lg text-gray-600">
              Lựa chọn gói phù hợp với nhu cầu của doanh nghiệp
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                data-testid={`pricing-card-${index}`}
              >
                <Card className={`h-full relative ${plan.popular ? 'border-indigo-500 border-2' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Phổ Biến
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-indigo-600">
                      {plan.price.toLocaleString()}đ
                      <span className="text-lg font-normal text-gray-500">/tháng</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Không gian:</span>
                        <span className="font-medium">{plan.specs.space}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Điện:</span>
                        <span className="font-medium">{plan.specs.power}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Băng thông:</span>
                        <span className="font-medium">{plan.specs.bandwidth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">IP:</span>
                        <span className="font-medium">{plan.specs.ip}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                      data-testid={`button-select-plan-${index}`}
                    >
                      Chọn Gói Này
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-faq-title">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="text-lg text-gray-600">
              Những thắc mắc phổ biến về dịch vụ Colocation
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-4"
                data-testid={`faq-item-${index}`}
              >
                <Card>
                  <CardContent className="p-0">
                    <button
                      className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      data-testid={`button-faq-${index}`}
                    >
                      <span className="font-semibold">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-cta-title">
              Sẵn Sàng Bắt Đầu?
            </h2>
            <p className="text-xl mb-8">
              Liên hệ với chúng tôi để được tư vấn giải pháp Colocation phù hợp nhất
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-indigo-600 hover:bg-gray-100"
                data-testid="button-contact-sales"
              >
                <Phone className="mr-2 h-5 w-5" />
                Gọi Sales: 1900 6680
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-indigo-600"
                data-testid="button-request-quote"
              >
                <Mail className="mr-2 h-5 w-5" />
                Yêu Cầu Báo Giá
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}