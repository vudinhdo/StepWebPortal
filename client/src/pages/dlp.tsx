import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Eye, 
  Lock, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight, 
  FileText, 
  Mail, 
  Cloud, 
  Users,
  BarChart3,
  Settings,
  Phone,
  MessageCircle,
  Star,
  Database,
  Wifi,
  Server,
  MapPin
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function DLP() {
  const [showContactForm, setShowContactForm] = useState(false);
  const { toast } = useToast();

  const features = [
    {
      icon: Eye,
      title: "Giám Sát Thời Gian Thực",
      description: "Theo dõi và phân tích dữ liệu 24/7 với AI engine tiên tiến",
      benefits: ["Real-time monitoring", "AI detection", "Behavioral analysis"]
    },
    {
      icon: Lock,
      title: "Mã Hóa & Bảo Vệ",
      description: "Mã hóa end-to-end với chính sách bảo mật linh hoạt",
      benefits: ["AES-256 encryption", "Policy enforcement", "Access control"]
    },
    {
      icon: AlertTriangle,
      title: "Cảnh Báo Tức Thời",
      description: "Thông báo ngay lập tức khi phát hiện rò rỉ dữ liệu",
      benefits: ["Instant alerts", "SMS/Email notifications", "Dashboard alerts"]
    },
    {
      icon: FileText,
      title: "Phân Loại Dữ Liệu",
      description: "Tự động phân loại và gắn thẻ dữ liệu theo độ nhạy cảm",
      benefits: ["Auto classification", "Smart tagging", "Content analysis"]
    },
    {
      icon: BarChart3,
      title: "Báo Cáo Tuân Thủ",
      description: "Báo cáo chi tiết cho GDPR, HIPAA, SOX và các chuẩn khác",
      benefits: ["GDPR compliance", "Audit reports", "Regulatory support"]
    },
    {
      icon: Settings,
      title: "Chính Sách Linh Hoạt",
      description: "Thiết lập rules theo vai trò, phòng ban và dự án",
      benefits: ["Role-based policies", "Custom rules", "Workflow integration"]
    }
  ];

  const deploymentModels = [
    {
      title: "Cloud DLP",
      description: "Triển khai trên cloud với scalability cao",
      price: "Từ 50,000 VNĐ/user/tháng",
      features: ["Rapid deployment", "Auto scaling", "99.9% uptime", "24/7 support"],
      recommended: false
    },
    {
      title: "On-Premise DLP",
      description: "Kiểm soát hoàn toàn dữ liệu tại datacenter riêng",
      price: "Từ 200,000,000 VNĐ/năm",
      features: ["Full control", "Custom integration", "High security", "Compliance ready"],
      recommended: true
    },
    {
      title: "Hybrid DLP",
      description: "Kết hợp cloud và on-premise tối ưu",
      price: "Tùy chỉnh theo nhu cầu",
      features: ["Best of both", "Flexible deployment", "Cost optimization", "Seamless integration"],
      recommended: false
    }
  ];

  const testimonials = [
    {
      name: "Nguyễn Văn Hùng",
      company: "Vietcombank",
      role: "CISO",
      content: "DLP của STEP giúp chúng tôi ngăn chặn 99.8% các case rò rỉ dữ liệu khách hàng. Real-time monitoring rất mạnh, compliance reports chi tiết.",
      rating: 5
    },
    {
      name: "Trần Thị Mai",
      company: "FPT Corporation",
      role: "Security Manager",
      content: "Triển khai DLP trong 2 tuần, không gián đoạn workflow. AI detection engine phát hiện được cả insider threats tinh vi nhất.",
      rating: 5
    },
    {
      name: "Lê Minh Đức",
      company: "Techcombank",
      role: "IT Director",
      content: "ROI 300% sau 6 tháng triển khai. Tiết kiệm được hàng tỷ đồng từ việc tránh data breach. Support team rất chuyên nghiệp.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "DLP khác gì so với antivirus truyền thống?",
      answer: "DLP tập trung vào ngăn chặn rò rỉ dữ liệu từ bên trong tổ chức, trong khi antivirus chống malware từ bên ngoài. DLP phân tích nội dung, hành vi user và data flow."
    },
    {
      question: "Thời gian triển khai DLP mất bao lâu?",
      answer: "Cloud DLP: 1-2 tuần. On-premise DLP: 4-6 tuần. Hybrid DLP: 6-8 tuần. Thời gian phụ thuộc vào quy mô và độ phức tạp của hệ thống hiện tại."
    },
    {
      question: "DLP có tương thích với hệ thống hiện tại không?",
      answer: "Có, DLP tích hợp với 95% hệ thống phổ biến: Office 365, Google Workspace, Slack, Teams, ERP, CRM, email servers, file servers."
    },
    {
      question: "Chi phí vận hành DLP hàng năm là bao nhiêu?",
      answer: "Cloud: 15-20% license cost. On-premise: 20-25% license cost. Bao gồm updates, support, training và maintenance."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 overflow-hidden">
          <div className="absolute inset-0" style={{backgroundImage: `linear-gradient(135deg, hsl(var(--step-blue)), hsl(var(--step-dlp)))`}}>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge className="mb-6 px-4 py-2 bg-white/20 text-white hover:bg-white/30" data-testid="badge-dlp">
                  🔒 Data Loss Prevention
                </Badge>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="text-hero-title">
                  Bảo Vệ Dữ Liệu Doanh Nghiệp
                  <br />
                  <span className="text-pink-200">Khỏi Rò Rỉ</span>
                </h1>
                
                <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-description">
                  Ngăn chặn 99.8% rò rỉ dữ liệu với AI monitoring, real-time alerts và compliance automation. 
                  Bảo vệ dữ liệu nhạy cảm ở mọi endpoint, email và cloud storage.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      size="lg" 
                      className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                      onClick={() => setShowContactForm(true)}
                      data-testid="button-demo-dlp"
                    >
                      <Eye className="mr-2 h-5 w-5" />
                      Xem Demo DLP
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300"
                      onClick={() => setShowContactForm(true)}
                      data-testid="button-consultation"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Tư Vấn Miễn Phí
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200" data-testid="badge-features">
                🛡️ Tính Năng Vượt Trội
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="text-features-title">
                Công Nghệ DLP Hàng Đầu
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Tích hợp AI/ML tiên tiến với kinh nghiệm 15+ năm bảo mật dữ liệu cho 1000+ doanh nghiệp.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group"
                  data-testid={`feature-card-${index}`}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
                    <CardContent className="p-8">
                      <div className="relative">
                        <div className={`inline-flex p-4 rounded-xl text-white mb-6`} style={{backgroundColor: `hsl(var(--step-dlp))`}}>
                          <feature.icon className="h-8 w-8" />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                        <p className="text-slate-600 mb-6 leading-relaxed">{feature.description}</p>
                        
                        <div className="space-y-2">
                          {feature.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span className="text-slate-700 text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Deployment Models Section */}
        <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200" data-testid="badge-deployment">
                ☁️ Mô Hình Triển Khai
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="text-deployment-title">
                Lựa Chọn Phù Hợp Với Doanh Nghiệp
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Cloud, On-premise hoặc Hybrid - tất cả đều có SLA 99.9% và support 24/7.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {deploymentModels.map((model, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group relative"
                  data-testid={`deployment-card-${index}`}
                >
                  {model.recommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-orange-500 text-white px-3 py-1">Được đề xuất</Badge>
                    </div>
                  )}
                  
                  <Card className={`h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    model.recommended ? 'ring-2 ring-orange-500 ring-opacity-50' : ''
                  }`}>
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-slate-800 mb-4">{model.title}</h3>
                      <p className="text-slate-600 mb-6">{model.description}</p>
                      
                      <div className="text-3xl font-bold mb-6" style={{color: `hsl(var(--step-dlp))`}}>
                        {model.price}
                      </div>
                      
                      <div className="space-y-3 mb-8">
                        {model.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="text-slate-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        className="w-full font-semibold py-3 transition-all duration-300"
                        style={{
                          backgroundColor: model.recommended ? `hsl(var(--step-dlp))` : `hsl(var(--step-blue))`,
                          color: 'white'
                        }}
                        onClick={() => setShowContactForm(true)}
                        data-testid={`button-select-${index}`}
                      >
                        Chọn Gói Này
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200" data-testid="badge-testimonials">
                ⭐ Khách Hàng Tin Tưởng
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="text-testimonials-title">
                Thành Công Thực Tế
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                1000+ doanh nghiệp đã tin tưởng DLP của STEP để bảo vệ dữ liệu quan trọng.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  data-testid={`testimonial-card-${index}`}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                    <CardContent className="p-8">
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-slate-700 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                      <div className="border-t border-slate-200 pt-4">
                        <div className="font-semibold text-slate-800">{testimonial.name}</div>
                        <div className="text-sm text-slate-600">{testimonial.role} tại {testimonial.company}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-yellow-100 text-yellow-700 hover:bg-yellow-200" data-testid="badge-faq">
                ❓ Câu Hỏi Thường Gặp
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="text-faq-title">
                Giải Đáp Thắc Mắc
              </h2>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  data-testid={`faq-item-${index}`}
                >
                  <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-slate-800 mb-3">{faq.question}</h3>
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-24 relative overflow-hidden" style={{backgroundImage: `linear-gradient(to right, hsl(var(--step-blue)), hsl(var(--step-dlp)))`}}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center text-white"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-cta-title">
                Sẵn Sàng Bảo Vệ Dữ Liệu Của Bạn?
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Liên hệ ngay để nhận demo DLP miễn phí và tư vấn giải pháp phù hợp nhất.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                    onClick={() => setShowContactForm(true)}
                    data-testid="button-contact-now"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Liên Hệ Ngay
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300"
                    onClick={() => setShowContactForm(true)}
                    data-testid="button-free-demo"
                  >
                    <Eye className="mr-2 h-5 w-5" />
                    Demo Miễn Phí
                  </Button>
                </motion.div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
                <div className="flex items-center justify-center gap-3" data-testid="contact-phone">
                  <Phone className="h-5 w-5" />
                  <span>0985.636.289</span>
                </div>
                <div className="flex items-center justify-center gap-3" data-testid="contact-email">
                  <Mail className="h-5 w-5" />
                  <span>dlp@step.vn</span>
                </div>
                <div className="flex items-center justify-center gap-3" data-testid="contact-address">
                  <MapPin className="h-5 w-5" />
                  <span>TP.HCM, Việt Nam</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Contact Form Modal */}
      <ContactForm 
        open={showContactForm} 
        onOpenChange={setShowContactForm}
        initialService="DLP"
        intent="demo"
        defaultMessage="Tôi muốn xem demo DLP và tư vấn giải pháp Data Loss Prevention phù hợp với doanh nghiệp."
      />
    </div>
  );
}