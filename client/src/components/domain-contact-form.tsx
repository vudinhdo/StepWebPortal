import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { insertDomainContactSchema, type InsertDomainContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Gift, Phone, Mail, User, Globe } from "lucide-react";

export default function DomainContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertDomainContact>({
    resolver: zodResolver(insertDomainContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      desiredDomain: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertDomainContact) => {
      const response = await apiRequest("/api/domain-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Gửi thành công!",
        description: "Chúng tôi sẽ liên hệ với bạn trong vòng 24h. Cảm ơn bạn đã quan tâm!",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error: any) => {
      toast({
        title: "Có lỗi xảy ra",
        description: error.message || "Vui lòng thử lại sau.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: InsertDomainContact) => {
    setIsSubmitting(true);
    mutation.mutate(data);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[hsl(207,100%,40%)] via-blue-600 to-indigo-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white bg-opacity-10 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white bg-opacity-10 rounded-full translate-y-32 -translate-x-32"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header with promotion */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-6 py-3 mb-6">
              <Gift className="h-5 w-5 text-yellow-300 mr-2" />
              <span className="text-white font-medium">Ưu đãi đặc biệt - Giảm 20% cho tên miền đầu tiên!</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Bạn Sẵn Sàng Sở Hữu <br />
              <span className="text-yellow-300">Tên Miền Hoàn Hảo?</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Nhận tư vấn miễn phí từ chuyên gia và ưu đãi 20% cho tên miền đầu tiên. 
              Đừng bỏ lỡ cơ hội sở hữu tên miền lý tưởng cho doanh nghiệp!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Benefits */}
            <div className="space-y-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                <h3 className="text-2xl font-bold text-white mb-6">Tại sao chọn STEP?</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-yellow-300 bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                      <Globe className="h-6 w-6 text-yellow-300" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">500+ phần mở rộng tên miền</div>
                      <div className="text-blue-100 text-sm">Lựa chọn đa dạng cho mọi nhu cầu</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-300 bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                      <Phone className="h-6 w-6 text-green-300" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Hỗ trợ 24/7</div>
                      <div className="text-blue-100 text-sm">Đội ngũ chuyên gia luôn sẵn sàng</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-300 bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                      <Mail className="h-6 w-6 text-purple-300" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Quản lý dễ dàng</div>
                      <div className="text-blue-100 text-sm">Giao diện thân thiện, trực quan</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-yellow-300">2M+</div>
                    <div className="text-blue-100 text-sm">Tên miền quản lý</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-300">10K+</div>
                    <div className="text-blue-100 text-sm">Khách hàng tin tưởng</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-300">99.9%</div>
                    <div className="text-blue-100 text-sm">Thời gian hoạt động</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <Card className="border-0 shadow-2xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl text-gray-900 mb-2">
                  Nhận tư vấn miễn phí ngay!
                </CardTitle>
                <p className="text-gray-600">
                  Điền thông tin để nhận ưu đãi đặc biệt
                </p>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Họ và tên *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                              <Input 
                                placeholder="Nhập họ và tên của bạn" 
                                className="pl-10 h-12"
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Email *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                              <Input 
                                type="email" 
                                placeholder="example@domain.com" 
                                className="pl-10 h-12"
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Số điện thoại *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                              <Input 
                                placeholder="0901 234 567" 
                                className="pl-10 h-12"
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="desiredDomain"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Tên miền mong muốn *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                              <Input 
                                placeholder="example.com" 
                                className="pl-10 h-12"
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)] h-12 text-lg font-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu ngay"}
                    </Button>
                    
                    <p className="text-xs text-gray-500 text-center mt-4">
                      Bằng cách gửi form, bạn đồng ý với{" "}
                      <a href="#" className="text-[hsl(207,100%,40%)] hover:underline">
                        Điều khoản dịch vụ
                      </a>{" "}
                      và{" "}
                      <a href="#" className="text-[hsl(207,100%,40%)] hover:underline">
                        Chính sách bảo mật
                      </a>
                    </p>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}