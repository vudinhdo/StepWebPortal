import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
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

export default function DedicatedServer() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const benefits = [
    {
      icon: Zap,
      title: "Hiệu suất cao",
      description: "CPU Intel Xeon mới nhất, RAM ECC, SSD NVMe tốc độ cao đảm bảo hiệu suất tối ưu cho ứng dụng của bạn."
    },
    {
      icon: Shield,
      title: "Bảo mật tuyệt đối",
      description: "Firewall chuyên dụng, DDoS protection, SSL miễn phí và backup tự động hàng ngày."
    },
    {
      icon: Users,
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ kỹ thuật chuyên nghiệp hỗ trợ 24/7 qua hotline, email và live chat."
    },
    {
      icon: Server,
      title: "Kiểm soát hoàn toàn",
      description: "Root access, cài đặt OS tùy chọn, restart server từ xa và monitoring real-time."
    }
  ];

  const pricingPlans = [
    {
      name: "Gói Cơ bản",
      price: "2,990,000",
      popular: false,
      specs: {
        cpu: "Intel Xeon E3-1230v6 (4 cores/8 threads)",
        ram: "16GB DDR4 ECC",
        storage: "240GB SSD NVMe",
        bandwidth: "100Mbps unlimited"
      },
      features: [
        "Root access đầy đủ",
        "1 IP public miễn phí",
        "Setup miễn phí",
        "Hỗ trợ 24/7",
        "99.9% uptime SLA"
      ]
    },
    {
      name: "Gói Nâng cao",
      price: "4,990,000",
      popular: true,
      specs: {
        cpu: "Intel Xeon E5-2630v4 (10 cores/20 threads)",
        ram: "32GB DDR4 ECC",
        storage: "500GB SSD NVMe",
        bandwidth: "1Gbps unlimited"
      },
      features: [
        "Tất cả tính năng gói Cơ bản",
        "5 IP public miễn phí",
        "Hardware RAID-1",
        "Backup tự động hàng ngày",
        "Priority support"
      ]
    },
    {
      name: "Gói Doanh nghiệp",
      price: "7,990,000",
      popular: false,
      specs: {
        cpu: "Intel Xeon E5-2690v4 (14 cores/28 threads)",
        ram: "64GB DDR4 ECC",
        storage: "1TB SSD NVMe + 2TB HDD",
        bandwidth: "10Gbps unlimited"
      },
      features: [
        "Tất cả tính năng gói Nâng cao",
        "10 IP public miễn phí",
        "Hardware RAID-10",
        "Dedicated account manager",
        "Custom configuration"
      ]
    }
  ];

  const faqs = [
    {
      question: "Thời gian setup server là bao lâu?",
      answer: "Thông thường server sẽ được setup và bàn giao trong vòng 2-4 giờ làm việc sau khi thanh toán thành công."
    },
    {
      question: "Tôi có thể cài đặt OS tùy chọn không?",
      answer: "Có, bạn có thể chọn từ các OS phổ biến như Ubuntu, CentOS, Debian, Windows Server hoặc yêu cầu cài đặt OS khác."
    },
    {
      question: "Có hỗ trợ backup dữ liệu không?",
      answer: "Có, chúng tôi cung cấp backup tự động hàng ngày cho gói Nâng cao và Doanh nghiệp. Gói Cơ bản có thể đăng ký thêm dịch vụ backup."
    },
    {
      question: "Chính sách hoàn tiền như thế nào?",
      answer: "Chúng tôi có chính sách hoàn tiền 100% trong 7 ngày đầu nếu bạn không hài lòng với dịch vụ."
    },
    {
      question: "Tôi có thể nâng cấp server sau này không?",
      answer: "Có, bạn có thể nâng cấp RAM, ổ cứng hoặc chuyển sang gói cao hơn bất kỳ lúc nào với thời gian downtime tối thiểu."
    }
  ];

  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 to-blue-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="h1 text-white mb-6">
                Dedicated Server - Máy Chủ Riêng
              </h1>
              <p className="lead prose-constraint mx-auto text-gray-200 mb-8">
                Sở hữu hoàn toàn máy chủ với hiệu suất cao, bảo mật tuyệt đối và hỗ trợ chuyên nghiệp 24/7
              </p>
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold nowrap"
                onClick={handleContactClick}
                data-testid="button-register"
              >
                Đăng ký ngay
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="h2 text-gray-800 mb-6">
                Tại Sao Chọn Chúng Tôi
              </h2>
              <p className="lead prose-constraint mx-auto text-gray-600">
                Những lý do khiến doanh nghiệp tin tưởng lựa chọn dịch vụ của chúng tôi
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                  data-testid={`benefit-${benefit.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <benefit.icon className="text-white" size={40} />
                  </div>
                  <h3 className="h3 text-gray-800 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="h2 text-gray-800 mb-6">
                Bảng Giá Dedicated Server
              </h2>
              <p className="lead prose-constraint mx-auto text-gray-600">
                Chọn gói phù hợp với nhu cầu của doanh nghiệp bạn
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative ${plan.popular ? 'transform scale-105' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Phổ biến nhất
                      </span>
                    </div>
                  )}
                  
                  <Card className={`h-full ${plan.popular ? 'border-blue-600 shadow-lg' : ''}`}>
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="h3 text-gray-800 mb-2">{plan.name}</CardTitle>
                      <div className="text-center mb-4">
                        <span className="h3 text-blue-600">{plan.price}</span>
                        <span className="text-gray-500 ml-1">VNĐ/tháng</span>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Specifications */}
                      <div className="border-b pb-4 mb-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Cpu className="text-blue-600 mr-2" size={16} />
                            <span>{plan.specs.cpu}</span>
                          </div>
                          <div className="flex items-center">
                            <HardDrive className="text-blue-600 mr-2" size={16} />
                            <span>{plan.specs.ram}</span>
                          </div>
                          <div className="flex items-center">
                            <HardDrive className="text-blue-600 mr-2" size={16} />
                            <span>{plan.specs.storage}</span>
                          </div>
                          <div className="flex items-center">
                            <Wifi className="text-blue-600 mr-2" size={16} />
                            <span>{plan.specs.bandwidth}</span>
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm">
                            <CheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={14} />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button 
                        className={`w-full nowrap ${
                          plan.popular 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                        }`}
                        onClick={handleContactClick}
                        data-testid={`button-choose-${plan.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        Chọn gói này
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="h2 text-gray-800 mb-6">
                Câu Hỏi Thường Gặp
              </h2>
              <p className="lead prose-constraint mx-auto text-gray-600">
                Những câu hỏi phổ biến về dịch vụ Dedicated Server
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-sm border"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    data-testid={`faq-question-${index}`}
                  >
                    <h3 className="h3 text-gray-800">{faq.question}</h3>
                    {openFaq === index ? (
                      <ChevronUp className="text-gray-500 flex-shrink-0 ml-4" size={20} />
                    ) : (
                      <ChevronDown className="text-gray-500 flex-shrink-0 ml-4" size={20} />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4" data-testid={`faq-answer-${index}`}>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="h2 text-white mb-6">
                Liên Hệ Với Chúng Tôi
              </h2>
              <p className="lead prose-constraint mx-auto text-blue-200">
                Sẵn sàng hỗ trợ bạn 24/7 với dịch vụ Dedicated Server chuyên nghiệp
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
                data-testid="contact-phone"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="text-white" size={24} />
                </div>
                <h3 className="h3 text-white mb-2">Hotline</h3>
                <p className="text-blue-200">1900 1234</p>
                <p className="text-blue-200">024 3333 4444</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
                data-testid="contact-email"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="text-white" size={24} />
                </div>
                <h3 className="h3 text-white mb-2">Email</h3>
                <p className="text-blue-200">sales@company.com</p>
                <p className="text-blue-200">support@company.com</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
                data-testid="contact-address"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-white" size={24} />
                </div>
                <h3 className="h3 text-white mb-2">Địa chỉ</h3>
                <p className="text-blue-200">Tầng 10, Tòa nhà ABC</p>
                <p className="text-blue-200">Hà Nội, Việt Nam</p>
              </motion.div>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex justify-center space-x-6 mb-8">
                <a 
                  href="#" 
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                  data-testid="social-facebook"
                >
                  <Facebook className="text-white" size={20} />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                  data-testid="social-twitter"
                >
                  <Twitter className="text-white" size={20} />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                  data-testid="social-linkedin"
                >
                  <Linkedin className="text-white" size={20} />
                </a>
              </div>
              
              <div className="border-t border-blue-800 pt-8">
                <p className="text-blue-200 text-sm">
                  © 2024 Dedicated Server Services. Tất cả quyền được bảo lưu.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}