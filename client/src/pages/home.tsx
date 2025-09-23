import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Cloud, 
  Shield, 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  Server, 
  Globe, 
  Database,
  Cpu,
  Lock,
  TrendingUp,
  Users,
  Clock,
  Award,
  Star,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PersonalizedContent from "@/components/personalized-content";
import PersonalizationSettings from "@/components/personalization-settings";
import ContactForm from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface UserInfo {
  name: string;
  company: string;
  role: string;
  interests: string[];
}

export default function Home() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isPersonalized, setIsPersonalized] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already completed personalization
    const savedUserInfo = localStorage.getItem('stepUserInfo');
    
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
      setIsPersonalized(true);
    }
  }, []);


  const handleResetPersonalization = () => {
    localStorage.removeItem('stepUserInfo');
    setUserInfo(null);
    setIsPersonalized(false);
    toast({
      title: "Đã xóa cá nhân hóa",
      description: "Dữ liệu cá nhân hóa đã được xóa",
    });
  };



  const [showContactForm, setShowContactForm] = useState(false);

  // Cloud data and statistics
  const cloudMetrics = [
    { label: "Uptime Guarantee", value: "99.99%", icon: Clock },
    { label: "Active Clients", value: "10,000+", icon: Users },
    { label: "Data Centers", value: "12", icon: Server },
    { label: "Support Response", value: "< 5min", icon: Zap }
  ];

  const cloudServices = [
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "Scalable cloud solutions with GPU support, Kubernetes, and auto-scaling for modern enterprises.",
      features: ["GPU Computing", "Kubernetes", "Auto-scaling", "Load Balancing"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Server,
      title: "Dedicated Servers",
      description: "High-performance dedicated servers with enterprise-grade hardware and 24/7 monitoring.",
      features: ["Enterprise Hardware", "24/7 Monitoring", "Custom Config", "SLA 99.9%"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Security Solutions",
      description: "Comprehensive security with DDoS protection, SSL certificates, and compliance management.",
      features: ["DDoS Protection", "SSL Certificates", "Compliance", "Security Audit"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Globe,
      title: "Global CDN",
      description: "Lightning-fast content delivery with edge servers worldwide for optimal performance.",
      features: ["Edge Servers", "Global Network", "Cache Optimization", "Real-time Analytics"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const testimonials = [
    {
      name: "Nguyễn Văn A",
      company: "TechStart Vietnam",
      role: "CTO",
      content: "STEP đã giúp chúng tôi scale infrastructure từ 100 users lên 100,000 users mà không có downtime nào.",
      rating: 5
    },
    {
      name: "Trần Thị B", 
      company: "E-commerce Plus",
      role: "CEO",
      content: "Chi phí cloud giảm 40% sau khi chuyển sang STEP. Performance tăng gấp 3 lần, support cực kỳ professional.",
      rating: 5
    },
    {
      name: "Lê Minh C",
      company: "Digital Agency",
      role: "Tech Lead", 
      content: "API integration dễ dàng, documentation chi tiết. Team STEP như partner thực sự cho startup.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main>
        {isPersonalized && userInfo ? (
          <div className="pt-20 pb-8 bg-gradient-to-br from-blue-50 to-indigo-100">
            <PersonalizedContent userInfo={userInfo} />
          </div>
        ) : (
          /* Modern Hero Section */
          <section className="relative pt-20 pb-32 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10"></div>
              
              {/* Floating Cloud Particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 bg-blue-400/20 rounded-full"
                  initial={{ 
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200), 
                    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800) 
                  }}
                  animate={{
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  }}
                  transition={{
                    duration: 20 + Math.random() * 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                  }}
                />
              ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Badge className="mb-6 px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors" data-testid="badge-enterprise">
                    🚀 Enterprise Cloud Solutions
                  </Badge>
                  
                  <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6" data-testid="text-hero-title">
                    Điện Toán Đám Mây
                    <br />
                    <span className="text-slate-800">Thế Hệ Mới</span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed" data-testid="text-hero-description">
                    Xây dựng, triển khai và mở rộng ứng dụng với hạ tầng cloud hiện đại. 
                    <span className="font-semibold text-blue-600">GPU Computing</span>, 
                    <span className="font-semibold text-purple-600"> Kubernetes</span>, và
                    <span className="font-semibold text-cyan-600"> AI/ML Platform</span> sẵn sàng sử dụng.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                        onClick={() => setShowContactForm(true)}
                        data-testid="button-start-free"
                      >
                        Bắt Đầu Miễn Phí
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300"
                        onClick={() => setShowContactForm(true)}
                        data-testid="button-contact-expert"
                      >
                        Tư Vấn Miễn Phí
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Cloud Metrics Dashboard */}
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                >
                  {cloudMetrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50"
                      data-testid={`metric-card-${index}`}
                    >
                      <metric.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-slate-800 mb-1">{metric.value}</div>
                      <div className="text-sm text-slate-600">{metric.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Cloud Services Section */}
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
                ☁️ Cloud Services
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="text-services-title">
                Giải Pháp Cloud Toàn Diện
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Từ infrastructure cơ bản đến AI/ML platform tiên tiến, chúng tôi cung cấp mọi thứ doanh nghiệp cần để thành công trong kỷ nguyên số.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {cloudServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                  data-testid={`service-card-${index}`}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-gradient-to-br from-white to-slate-50">
                    <CardContent className="p-8">
                      <div className="relative">
                        {/* Glow Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                        
                        <div className="relative">
                          <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${service.color} text-white mb-6`}>
                            <service.icon className="h-8 w-8" />
                          </div>
                          
                          <h3 className="text-2xl font-bold text-slate-800 mb-4">{service.title}</h3>
                          <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                          
                          <div className="space-y-3">
                            {service.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <span className="text-slate-700 font-medium">{feature}</span>
                              </div>
                            ))}
                          </div>
                          
                          <Button 
                            className="mt-6 w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 transition-all duration-300"
                            onClick={() => setShowContactForm(true)}
                            data-testid={`button-learn-more-${index}`}
                          >
                            Tìm Hiểu Thêm
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200" data-testid="badge-testimonials">
                ⭐ Success Stories
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="text-testimonials-title">
                Khách Hàng Nói Về Chúng Tôi
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Hơn 10,000+ doanh nghiệp tin tưởng STEP cho hạ tầng cloud của họ.
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

        {/* Contact CTA Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 relative overflow-hidden">
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
                Sẵn Sàng Chuyển Đổi Số Với STEP?
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Liên hệ ngay để được tư vấn miễn phí về giải pháp cloud phù hợp với doanh nghiệp của bạn.
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
                    data-testid="button-free-consultation"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Tư Vấn Miễn Phí
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
                  <span>hello@step.vn</span>
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
      />
      
      {/* Only show personalization settings if user has completed welcome */}
      {isPersonalized && userInfo && (
        <PersonalizationSettings 
          userInfo={userInfo}
          onReset={handleResetPersonalization}
        />
      )}
    </div>
  );
}