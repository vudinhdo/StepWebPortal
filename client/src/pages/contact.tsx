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
  Headphones,
  Users,
  Settings,
  ChevronDown
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    document.title = "Liên Hệ - STEP Technology | Tư Vấn Giải Pháp CNTT";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Liên hệ STEP Technology - Công ty TNHH Công nghệ STEP. Hotline: 0985.636.289 | Email: info@step.com.vn | Địa chỉ: 99 Hoàng Ngân, Hà Nội');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Liên hệ STEP Technology - Công ty TNHH Công nghệ STEP. Hotline: 0985.636.289 | Email: info@step.com.vn | Địa chỉ: 99 Hoàng Ngân, Hà Nội';
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
        description: "Chúng tôi đã nhận được yêu cầu của bạn và sẽ liên hệ trong thời gian sớm nhất.",
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

  const departments = [
    { value: "sales", label: "Bộ phận Kinh doanh", icon: Users },
    { value: "technical", label: "Bộ phận Kỹ thuật", icon: Settings },
    { value: "support", label: "Bộ phận Hỗ trợ", icon: Headphones },
    { value: "cloud-server", label: "Cloud Server", icon: Building },
    { value: "web-hosting", label: "Web Hosting", icon: Building },
    { value: "dedicated-server", label: "Dedicated Server", icon: Building },
    { value: "colocation", label: "Colocation", icon: Building },
    { value: "email-hybrid", label: "Email Hybrid", icon: Mail },
    { value: "dlp", label: "DLP - Data Loss Prevention", icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        {/* Page Header */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4" data-testid="text-page-title">
              Liên Hệ STEP Technology
            </h1>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
              Công ty TNHH Công nghệ STEP - Chuyên cung cấp giải pháp CNTT toàn diện
            </p>
          </div>
        </section>

        {/* Company Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Thông Tin Liên Hệ
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Company Details */}
                <Card className="p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-xl text-blue-600">
                      Công ty TNHH Công nghệ STEP
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">Trụ sở chính</p>
                        <p className="text-gray-600">Số 99 Hoàng Ngân, Phường Nhân Chính</p>
                        <p className="text-gray-600">Quận Thanh Xuân, Thành phố Hà Nội</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Phone className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">Điện thoại</p>
                        <a href="tel:+84985636289" className="text-blue-600 hover:text-blue-800">
                          0985.636.289
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Mail className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">Email</p>
                        <a href="mailto:info@step.com.vn" className="text-blue-600 hover:text-blue-800">
                          info@step.com.vn
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Clock className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">Thời gian làm việc</p>
                        <p className="text-gray-600">Từ thứ Hai đến thứ Bảy</p>
                        <p className="text-gray-600">Sáng: 8h00 - 12h00, Chiều: 1h30 - 5h30</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Department Contacts */}
                <Card className="p-8">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-xl text-blue-600">
                      Liên Hệ Theo Bộ Phận
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Sales Department */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Users className="h-4 w-4 text-blue-600 mr-2" />
                        Bộ phận Kinh doanh
                      </h3>
                      <div className="pl-6 space-y-1">
                        <p className="text-gray-600">
                          Điện thoại: <a href="tel:+84985636289" className="text-blue-600">0985.636.289</a> (phím 1)
                        </p>
                        <p className="text-gray-600">
                          Email: <a href="mailto:sales@step.com.vn" className="text-blue-600">sales@step.com.vn</a>
                        </p>
                      </div>
                    </div>

                    {/* Technical Department */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Settings className="h-4 w-4 text-blue-600 mr-2" />
                        Bộ phận Kỹ thuật
                      </h3>
                      <div className="pl-6 space-y-1">
                        <p className="text-gray-600">
                          Điện thoại: <a href="tel:+84985636289" className="text-blue-600">0985.636.289</a> (phím 2)
                        </p>
                        <p className="text-gray-600">
                          Email: <a href="mailto:support@step.com.vn" className="text-blue-600">support@step.com.vn</a>
                        </p>
                      </div>
                    </div>

                    {/* Support Department */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Headphones className="h-4 w-4 text-blue-600 mr-2" />
                        Bộ phận Hỗ trợ
                      </h3>
                      <div className="pl-6 space-y-1">
                        <p className="text-gray-600">
                          Điện thoại: <a href="tel:+84985636289" className="text-blue-600">0985.636.289</a> (phím 3)
                        </p>
                        <p className="text-gray-600">
                          Email: <a href="mailto:support@step.com.vn" className="text-blue-600">support@step.com.vn</a>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-gray-50" id="contact-form">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Liên hệ STEP qua Email
              </h2>
              
              <Card className="p-8">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <p className="text-gray-600 mb-6">
                    Chọn bộ phận bạn muốn gửi yêu cầu hỗ trợ
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Họ và tên *
                      </Label>
                      <Input
                        id="name"
                        {...form.register("name")}
                        placeholder="Nhập họ và tên của bạn"
                        className="mt-1"
                        data-testid="input-name"
                      />
                      {form.formState.errors.name && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...form.register("email")}
                        placeholder="Nhập địa chỉ email"
                        className="mt-1"
                        data-testid="input-email"
                      />
                      {form.formState.errors.email && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Số điện thoại
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...form.register("phone")}
                        placeholder="Nhập số điện thoại"
                        className="mt-1"
                        data-testid="input-phone"
                      />
                    </div>

                    <div>
                      <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                        Tên công ty
                      </Label>
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
                    <Label htmlFor="service" className="text-sm font-medium text-gray-700">
                      Bộ phận / Dịch vụ quan tâm *
                    </Label>
                    <Controller
                      name="service"
                      control={form.control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <SelectTrigger className="mt-1" data-testid="select-service">
                            <SelectValue placeholder="Chọn bộ phận hoặc dịch vụ" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept.value} value={dept.value}>
                                <div className="flex items-center">
                                  <dept.icon className="h-4 w-4 mr-2" />
                                  {dept.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {form.formState.errors.service && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.service.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                      Tin nhắn *
                    </Label>
                    <Textarea
                      id="message"
                      {...form.register("message")}
                      placeholder="Mô tả chi tiết nhu cầu của bạn..."
                      rows={6}
                      className="mt-1"
                      data-testid="textarea-message"
                    />
                    {form.formState.errors.message && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={submitContact.isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                    data-testid="button-submit"
                  >
                    {submitContact.isPending ? (
                      "Đang gửi..."
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Gửi tin nhắn
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>

        {/* Map and Final Contact Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Vị Trí Văn Phòng STEP
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Map */}
                <div className="bg-gray-100 rounded-lg overflow-hidden" data-testid="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6962877587734!2d105.8014851!3d21.0058954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4cd8707cb1%3A0x8a3c2dcdc47a5ba5!2s99%20Ho%C3%A0ng%20Ng%C3%A2n%2C%20Nh%C3%A2n%20Ch%C3%ADnh%2C%20Thanh%20Xu%C3%A2n%2C%20H%C3%A0%20N%E1%BB%99i!5e0!3m2!1sen!2s!4v1642093847717!5m2!1sen!2s"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Bản đồ văn phòng STEP Technology"
                  ></iframe>
                </div>

                {/* Contact Summary */}
                <div className="space-y-6">
                  <Card className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-900">Số 99 Hoàng Ngân, P. Nhân Chính, Q. Thanh Xuân, Hà Nội</p>
                          <a 
                            href="https://maps.app.goo.gl/Tg8mLAs6qHtVpDUZ8" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Xem bản đồ lớn hơn →
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-semibold text-gray-900">Điện thoại:</p>
                          <a href="tel:+84985636289" className="text-blue-600 hover:text-blue-800">
                            0985.636.289
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-semibold text-gray-900">Mail:</p>
                          <a href="mailto:info@step.com.vn" className="text-blue-600 hover:text-blue-800">
                            info@step.com.vn
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <MessageCircle className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-semibold text-gray-900">Hỗ trợ khách hàng:</p>
                          <a href="tel:+84985636289" className="text-blue-600 hover:text-blue-800">
                            0985.636.289
                          </a>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <div className="text-center">
                    <Button 
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                      onClick={() => window.open('tel:+84985636289', '_self')}
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Gọi ngay: 0985.636.289
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}