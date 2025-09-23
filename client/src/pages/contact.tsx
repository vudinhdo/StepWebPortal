import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Building,
  User,
  FileText,
  CheckCircle,
  Calendar,
  Users,
  Shield,
  Headphones,
  Server,
  Database
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/schema";

export default function Contact() {
  const [showContactModal, setShowContactModal] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    },
  });

  const submitContact = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Thành công!",
        description: "Chúng tôi đã nhận được yêu cầu của bạn và sẽ liên hệ sớm nhất có thể.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi!",
        description: error.message || "Có lỗi xảy ra. Vui lòng thử lại.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: InsertContact) => {
    await submitContact.mutateAsync(data);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Điện thoại",
      details: ["0985.636.289", "028.3911.0039"],
      description: "Hỗ trợ 24/7"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@step.com.vn", "support@step.com.vn"],
      description: "Phản hồi trong 2 giờ"
    },
    {
      icon: MapPin,
      title: "Văn phòng",
      details: ["Hà Nội", "TP. Hồ Chí Minh"],
      description: "2 văn phòng chính"
    },
    {
      icon: Clock,
      title: "Giờ làm việc",
      details: ["T2-T6: 8:00-18:00", "T7: 8:00-12:00"],
      description: "Support 24/7"
    }
  ];

  const services = [
    { icon: Shield, name: "Cloud Server", desc: "Máy chủ đám mây linh hoạt" },
    { icon: Building, name: "Web Hosting", desc: "Hosting WordPress, Laravel" },
    { icon: Server, name: "Dedicated Server", desc: "Máy chủ riêng biệt" },
    { icon: Database, name: "Colocation", desc: "Đặt máy chủ tại datacenter" },
    { icon: Mail, name: "Email Hybrid", desc: "Email doanh nghiệp" },
    { icon: Shield, name: "DLP", desc: "Data Loss Prevention" }
  ];

  const reasons = [
    {
      icon: Users,
      title: "Đội Ngũ Chuyên Nghiệp",
      description: "15+ năm kinh nghiệm trong lĩnh vực IT"
    },
    {
      icon: Headphones,
      title: "Hỗ Trợ 24/7",
      description: "Đội ngũ kỹ thuật sẵn sàng hỗ trợ mọi lúc"
    },
    {
      icon: CheckCircle,
      title: "Giải Pháp Toàn Diện",
      description: "Từ tư vấn đến triển khai và vận hành"
    },
    {
      icon: Shield,
      title: "Bảo Mật Cao",
      description: "Tuân thủ các tiêu chuẩn bảo mật quốc tế"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 overflow-hidden">
          <div className="absolute inset-0" style={{backgroundImage: `linear-gradient(135deg, hsl(var(--step-blue)), hsl(var(--step-light-blue)))`}}>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge className="mb-6 px-4 py-2 bg-white/20 text-white hover:bg-white/30" data-testid="badge-contact">
                  💬 Liên Hệ Với Chúng Tôi
                </Badge>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="text-hero-title">
                  Kết Nối Với Chuyên Gia
                  <br />
                  <span className="text-blue-200">STEP Technology</span>
                </h1>
                
                <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-description">
                  Tư vấn miễn phí về giải pháp hạ tầng IT toàn diện. 
                  Đội ngũ chuyên gia sẵn sàng hỗ trợ 24/7 cho doanh nghiệp của bạn.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      size="lg" 
                      className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                      onClick={() => setShowContactModal(true)}
                      data-testid="button-contact-expert"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Tư Vấn Ngay
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300"
                      onClick={() => window.location.href = 'tel:0985636289'}
                      data-testid="button-call-now"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Gọi Ngay
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200" data-testid="badge-info">
                📞 Thông Tin Liên Hệ
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="text-info-title">
                Nhiều Cách Để Kết Nối
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Lựa chọn cách thức liên hệ phù hợp nhất với bạn. Chúng tôi luôn sẵn sàng hỗ trợ.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  data-testid={`contact-info-${index}`}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                    <CardContent className="p-8">
                      <div className="relative">
                        <div className={`inline-flex p-4 rounded-xl text-white mb-6`} style={{backgroundColor: `hsl(var(--step-blue))`}}>
                          <info.icon className="h-8 w-8" />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">{info.title}</h3>
                        
                        <div className="space-y-2 mb-4">
                          {info.details.map((detail, idx) => (
                            <div key={idx} className="text-slate-700 font-medium">
                              {detail}
                            </div>
                          ))}
                        </div>
                        
                        <p className="text-slate-500 text-sm">{info.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <Badge className="mb-4 px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200" data-testid="badge-form">
                  📝 Gửi Yêu Cầu
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="text-form-title">
                  Để Lại Thông Tin
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Điền form bên dưới và chúng tôi sẽ liên hệ trong vòng 2 giờ để tư vấn chi tiết.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-xl bg-white">
                  <CardContent className="p-8">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Họ và tên *</Label>
                          <Input
                            id="name"
                            {...form.register("name")}
                            placeholder="Nhập họ và tên"
                            className="mt-1"
                            data-testid="input-name"
                          />
                          {form.formState.errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                              {form.formState.errors.name.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            {...form.register("email")}
                            placeholder="Nhập email"
                            className="mt-1"
                            data-testid="input-email"
                          />
                          {form.formState.errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                              {form.formState.errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Số điện thoại</Label>
                          <Input
                            id="phone"
                            {...form.register("phone")}
                            placeholder="Nhập số điện thoại"
                            className="mt-1"
                            data-testid="input-phone"
                          />
                        </div>
                        <div>
                          <Label htmlFor="company">Công ty</Label>
                          <Input
                            id="company"
                            {...form.register("company")}
                            placeholder="Nhập tên công ty"
                            className="mt-1"
                            data-testid="input-company"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="service">Dịch vụ quan tâm</Label>
                        <Select 
                          value={form.watch("service") || ""} 
                          onValueChange={(value) => form.setValue("service", value)}
                        >
                          <SelectTrigger className="mt-1" data-testid="select-service">
                            <SelectValue placeholder="Chọn dịch vụ" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cloud">Cloud Server</SelectItem>
                            <SelectItem value="hosting">Web Hosting</SelectItem>
                            <SelectItem value="server">Dedicated Server</SelectItem>
                            <SelectItem value="colocation">Colocation</SelectItem>
                            <SelectItem value="email">Email Hybrid</SelectItem>
                            <SelectItem value="DLP">DLP - Data Loss Prevention</SelectItem>
                            <SelectItem value="consulting">Tư vấn</SelectItem>
                            <SelectItem value="support">Hỗ trợ</SelectItem>
                            <SelectItem value="other">Khác</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="message">Tin nhắn *</Label>
                        <Textarea
                          id="message"
                          {...form.register("message")}
                          placeholder="Mô tả chi tiết nhu cầu của bạn..."
                          className="mt-1 min-h-[120px]"
                          data-testid="textarea-message"
                        />
                        {form.formState.errors.message && (
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.message.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={submitContact.isPending}
                        className="w-full font-semibold py-4 text-lg transition-all duration-300"
                        style={{
                          backgroundColor: `hsl(var(--step-blue))`,
                          color: 'white'
                        }}
                        data-testid="button-submit"
                      >
                        {submitContact.isPending ? (
                          "Đang gửi..."
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Gửi Yêu Cầu
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
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
                🚀 Dịch Vụ Của Chúng Tôi
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="text-services-title">
                Giải Pháp Toàn Diện
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                6 dịch vụ core đáp ứng mọi nhu cầu hạ tầng IT của doanh nghiệp.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  data-testid={`service-card-${index}`}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                    <CardContent className="p-6">
                      <div className={`inline-flex p-3 rounded-lg text-white mb-4`} style={{backgroundColor: `hsl(var(--step-blue))`}}>
                        <service.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-2">{service.name}</h3>
                      <p className="text-slate-600 text-sm">{service.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 px-4 py-2 bg-yellow-100 text-yellow-700 hover:bg-yellow-200" data-testid="badge-reasons">
                ⭐ Vì Sao Chọn STEP
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6" data-testid="text-reasons-title">
                Đối Tác Tin Cậy
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                5,000+ doanh nghiệp đã tin tưởng STEP cho giải pháp hạ tầng IT.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  data-testid={`reason-card-${index}`}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                    <CardContent className="p-6">
                      <div className={`inline-flex p-3 rounded-lg text-white mb-4`} style={{backgroundColor: `hsl(var(--step-light-blue))`}}>
                        <reason.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-2">{reason.title}</h3>
                      <p className="text-slate-600 text-sm">{reason.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden" style={{backgroundImage: `linear-gradient(to right, hsl(var(--step-blue)), hsl(var(--step-light-blue)))`}}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center text-white"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-final-cta-title">
                Bắt Đầu Ngay Hôm Nay
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Đừng để hạ tầng IT lỗi thời cản trở sự phát triển của doanh nghiệp.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                    onClick={() => setShowContactModal(true)}
                    data-testid="button-final-contact"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Liên Hệ Tư Vấn
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-300"
                    onClick={() => window.location.href = '/bao-gia'}
                    data-testid="button-final-quote"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Xây Dựng Báo Giá
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Contact Form Modal */}
      <ContactForm 
        open={showContactModal} 
        onOpenChange={setShowContactModal}
        intent="general"
      />
    </div>
  );
}