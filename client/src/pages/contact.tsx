import { useEffect, useState } from "react";
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
  CheckCircle,
  Calendar,
  Users,
  Shield,
  Headphones,
  Server,
  Database,
  Globe,
  HardDrive,
  Wifi
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/schema";

export default function Contact() {
  const { toast } = useToast();

  // SEO Meta Tags
  useEffect(() => {
    document.title = "Liên Hệ - STEP Technology | Tư Vấn Giải Pháp CNTT Miễn Phí";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Liên hệ STEP Technology để được tư vấn miễn phí về giải pháp CNTT. Hotline 24/7: 0985.636.289 | Email: info@step.com.vn | Địa chỉ: 99 Hoàng Ngân, Hà Nội');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Liên hệ STEP Technology để được tư vấn miễn phí về giải pháp CNTT. Hotline 24/7: 0985.636.289 | Email: info@step.com.vn | Địa chỉ: 99 Hoàng Ngân, Hà Nội';
      document.head.appendChild(meta);
    }

    return () => {
      // Cleanup
    };
  }, []);

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
        description: "Chúng tôi đã nhận được yêu cầu của bạn và sẽ liên hệ trong vòng 2 giờ.",
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

  const services = [
    { value: "cloud-server", label: "🌐 Cloud Server", icon: Server },
    { value: "web-hosting", label: "🌍 Web Hosting", icon: Globe },
    { value: "dedicated-server", label: "🖥️ Dedicated Server", icon: Database },
    { value: "colocation", label: "🏢 Colocation", icon: Building },
    { value: "email-hybrid", label: "📧 Email Hybrid", icon: Mail },
    { value: "dlp", label: "🛡️ DLP - Data Loss Prevention", icon: Shield },
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: "Hotline 24/7",
      value: "0985.636.289",
      description: "Hỗ trợ kỹ thuật không giới hạn",
      link: "tel:+84985636289"
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@step.com.vn",
      description: "Phản hồi trong vòng 2 giờ",
      link: "mailto:info@step.com.vn"
    },
    {
      icon: MapPin,
      title: "Địa chỉ",
      value: "Số 99 Hoàng Ngân",
      description: "P. Nhân Chính, Q. Thanh Xuân, Hà Nội",
      link: "https://maps.app.goo.gl/Tg8mLAs6qHtVpDUZ8"
    },
    {
      icon: Clock,
      title: "Giờ làm việc",
      value: "Thứ 2 - Thứ 6: 8:00 - 17:30",
      description: "Thứ 7: 8:00 - 12:00 | CN: Nghỉ",
      link: null
    }
  ];

  const whyChooseUs = [
    { icon: Calendar, title: "7+ Năm Kinh Nghiệm", description: "Thành lập từ 2018, phục vụ 500+ khách hàng" },
    { icon: Users, title: "Đội Ngũ Chuyên Nghiệp", description: "Kỹ sư có chứng chỉ quốc tế MCT, VCP, CCNA" },
    { icon: Headphones, title: "Hỗ Trợ 24/7", description: "Hotline không giới hạn, phản hồi nhanh chóng" },
    { icon: CheckCircle, title: "Cam Kết 99.9% Uptime", description: "Đảm bảo hệ thống hoạt động ổn định" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section - Blue Background with White Text */}
        <section className="relative pt-20 pb-24 overflow-hidden" style={{background: 'linear-gradient(to bottom right, #2563eb, #1d4ed8, #1e40af)'}}>
          <div className="absolute inset-0" style={{backgroundColor: '#2563eb'}}></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-white"
              >
                <Badge className="mb-8 px-5 py-2 bg-white/15 text-white hover:bg-white/25 border-white/20 text-sm font-medium" data-testid="badge-contact">
                  💬 Tư Vấn Miễn Phí
                </Badge>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight" data-testid="text-hero-title">
                  <span className="block text-white">Liên Hệ Với</span>
                  <span className="block text-blue-200 mt-2">Chuyên Gia STEP</span>
                </h1>
                
                <p className="text-xl md:text-2xl lg:text-3xl mb-10 text-white/90 max-w-4xl mx-auto leading-relaxed font-light" data-testid="text-hero-description">
                  Để được tư vấn giải pháp CNTT phù hợp nhất cho doanh nghiệp
                  <br className="hidden md:block" />
                  của bạn. Chúng tôi cam kết phản hồi trong vòng 2 giờ.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a href="#contact-form" className="inline-block">
                      <Button 
                        size="lg" 
                        className="bg-white text-blue-600 hover:bg-gray-50 px-10 py-5 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-xl border-0"
                        data-testid="button-contact-now"
                      >
                        <MessageCircle className="mr-3 h-6 w-6" />
                        Gửi Yêu Cầu Ngay
                      </Button>
                    </a>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a href="tel:+84985636289">
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="border-3 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-5 text-xl font-bold transition-all duration-300 rounded-xl bg-transparent"
                        data-testid="button-call-hotline"
                      >
                        <Phone className="mr-3 h-6 w-6" />
                        Gọi Hotline: 0985.636.289
                      </Button>
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Thông Tin Liên Hệ</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Chúng tôi luôn sẵn sàng hỗ trợ bạn bất cứ lúc nào
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  data-testid={`contact-info-${index}`}
                >
                  <Card className="text-center h-full p-6 border hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="inline-flex p-3 rounded-xl text-white mb-4" style={{backgroundColor: `hsl(var(--step-blue))`}}>
                        <info.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold text-lg text-slate-800 mb-2">{info.title}</h3>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-slate-800 font-semibold">{info.value}</p>
                      )}
                      <p className="text-sm text-slate-500 mt-2">{info.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Form */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-0 shadow-xl bg-white p-8">
                    <CardHeader className="p-0 mb-8">
                      <CardTitle className="text-3xl font-bold text-slate-800 mb-2">
                        Gửi Yêu Cầu Tư Vấn
                      </CardTitle>
                      <p className="text-slate-600">
                        Điền thông tin dưới đây, chúng tôi sẽ liên hệ trong vòng 2 giờ
                      </p>
                    </CardHeader>
                    
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Họ và tên */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-base font-medium text-slate-700">
                            Họ và tên <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="name"
                            placeholder="Nhập họ và tên"
                            {...form.register("name")}
                            className="mt-2 h-12 text-base"
                            data-testid="input-name"
                          />
                          {form.formState.errors.name && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="email" className="text-base font-medium text-slate-700">
                            Email <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Nhập email"
                            {...form.register("email")}
                            className="mt-2 h-12 text-base"
                            data-testid="input-email"
                          />
                          {form.formState.errors.email && (
                            <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Số điện thoại và Công ty */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone" className="text-base font-medium text-slate-700">
                            Số điện thoại
                          </Label>
                          <Input
                            id="phone"
                            placeholder="Nhập số điện thoại"
                            {...form.register("phone")}
                            className="mt-2 h-12 text-base"
                            data-testid="input-phone"
                          />
                        </div>

                        <div>
                          <Label htmlFor="company" className="text-base font-medium text-slate-700">
                            Công ty
                          </Label>
                          <Input
                            id="company"
                            placeholder="Nhập tên công ty"
                            {...form.register("company")}
                            className="mt-2 h-12 text-base"
                            data-testid="input-company"
                          />
                        </div>
                      </div>

                      {/* Dịch vụ quan tâm */}
                      <div>
                        <Label className="text-base font-medium text-slate-700">
                          Dịch vụ quan tâm
                        </Label>
                        <Controller
                          name="service"
                          control={form.control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value || undefined}>
                              <SelectTrigger className="mt-2 h-12 text-base" data-testid="select-service">
                                <SelectValue placeholder="Chọn dịch vụ" />
                              </SelectTrigger>
                              <SelectContent>
                                {services.map((service) => (
                                  <SelectItem key={service.value} value={service.value}>
                                    {service.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      {/* Tin nhắn */}
                      <div>
                        <Label htmlFor="message" className="text-base font-medium text-slate-700">
                          Tin nhắn <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Mô tả chi tiết nhu cầu của bạn..."
                          {...form.register("message")}
                          className="mt-2 min-h-[120px] text-base resize-y"
                          data-testid="textarea-message"
                        />
                        {form.formState.errors.message && (
                          <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={submitContact.isPending}
                        className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        style={{backgroundColor: `hsl(var(--step-blue))`, color: 'white'}}
                        data-testid="button-submit-contact"
                      >
                        {submitContact.isPending ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Đang gửi...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Gửi Yêu Cầu
                          </>
                        )}
                      </Button>
                    </form>
                  </Card>
                </motion.div>

                {/* Why Choose Us & Map */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  {/* Why Choose Us */}
                  <Card className="border-0 shadow-xl bg-white p-8">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-2xl font-bold text-slate-800">
                        Tại Sao Chọn STEP?
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4">
                      {whyChooseUs.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="inline-flex p-2 rounded-lg text-white flex-shrink-0" style={{backgroundColor: `hsl(var(--step-light-blue))`}}>
                            <item.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800">{item.title}</h4>
                            <p className="text-slate-600 text-sm">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Map */}
                  <Card className="border-0 shadow-xl bg-white p-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <MapPin className="h-5 w-5" style={{color: `hsl(var(--step-blue))`}} />
                        Văn Phòng STEP
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="w-full h-64 bg-gray-800 rounded-lg overflow-hidden mb-3">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6969676037893!2d105.80730731476297!3d21.006388893654447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac76ccbcb26d%3A0x55755dad65ce6fd8!2zOTkgSG_DoG5nIE5nw6JuLCBOaOG6rW4gQ2jDrW5oLCBUaGFuaCBYdcOibiwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1654321234567!5m2!1svi!2s"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen={true}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="rounded-lg"
                        ></iframe>
                      </div>
                      <a 
                        href="https://maps.app.goo.gl/Tg8mLAs6qHtVpDUZ8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:underline transition-colors"
                        style={{color: `hsl(var(--step-blue))`}}
                      >
                        📍 Số 99 Hoàng Ngân, P. Nhân Chính, Q. Thanh Xuân, Hà Nội →
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}