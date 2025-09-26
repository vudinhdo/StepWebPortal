import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { Cloud, Globe, Server, Shield, Mail, Building2, X, Send, Phone } from "lucide-react";

interface ContactFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialService?: string;
  intent?: "demo" | "quote" | "general";
  defaultMessage?: string;
}

export default function ContactForm({ 
  open, 
  onOpenChange, 
  initialService = "",
  intent = "general",
  defaultMessage = ""
}: ContactFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: initialService,
      message: defaultMessage,
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
      onOpenChange(false);
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
    setIsSubmitting(true);
    try {
      await submitContact.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] w-[95vw] max-h-[95vh] overflow-y-auto p-0 gap-0 rounded-2xl shadow-2xl border-0 bg-white">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-[hsl(207,100%,40%)] to-[hsl(207,100%,50%)] p-8 text-white relative">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            data-testid="button-close-contact"
          >
            <X className="h-5 w-5" />
          </button>
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <Phone className="h-6 w-6" />
              {intent === "demo" ? "Yêu cầu demo sản phẩm" : "Liên hệ với chuyên gia STEP"}
            </DialogTitle>
            <DialogDescription className="text-blue-100 text-base leading-relaxed">
              {intent === "demo" 
                ? "Điền thông tin bên dưới để nhận demo trực tiếp và tư vấn chi tiết về sản phẩm phù hợp với doanh nghiệp của bạn."
                : "Điền thông tin bên dưới để nhận tư vấn miễn phí về giải pháp CNTT phù hợp với doanh nghiệp của bạn."
              }
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="p-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-gray-700 font-medium">Họ và tên *</Label>
              <Input
                id="name"
                {...form.register("name")}
                placeholder="Nguyễn Văn A"
                className="mt-2 h-12 border-gray-300 focus:border-[hsl(207,100%,40%)] focus:ring-2 focus:ring-[hsl(207,100%,40%)]/20 rounded-lg"
                data-testid="input-name"
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium">Email *</Label>
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                placeholder="name@company.com"
                className="mt-2 h-12 border-gray-300 focus:border-[hsl(207,100%,40%)] focus:ring-2 focus:ring-[hsl(207,100%,40%)]/20 rounded-lg"
                data-testid="input-email"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="phone" className="text-gray-700 font-medium">Số điện thoại</Label>
              <Input
                id="phone"
                {...form.register("phone")}
                placeholder="0901 234 567"
                className="mt-2 h-12 border-gray-300 focus:border-[hsl(207,100%,40%)] focus:ring-2 focus:ring-[hsl(207,100%,40%)]/20 rounded-lg"
                data-testid="input-phone"
              />
            </div>
            <div>
              <Label htmlFor="company" className="text-gray-700 font-medium">Công ty</Label>
              <Input
                id="company"
                {...form.register("company")}
                placeholder="Công ty ABC"
                className="mt-2 h-12 border-gray-300 focus:border-[hsl(207,100%,40%)] focus:ring-2 focus:ring-[hsl(207,100%,40%)]/20 rounded-lg"
                data-testid="input-company"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="service" className="text-gray-700 font-medium">Dịch vụ quan tâm</Label>
            <Select 
              value={form.watch("service") || ""} 
              onValueChange={(value) => form.setValue("service", value)}
            >
              <SelectTrigger className="mt-2 h-12 border-gray-300 focus:border-[hsl(207,100%,40%)] focus:ring-2 focus:ring-[hsl(207,100%,40%)]/20 rounded-lg" data-testid="select-service">
                <SelectValue placeholder="💡 Chọn dịch vụ bạn quan tâm" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-0 shadow-xl">
                <SelectItem value="cloud" className="py-3 px-4 cursor-pointer hover:bg-blue-50">
                  <div className="flex items-center gap-3">
                    <Cloud className="h-5 w-5 text-[hsl(207,100%,40%)]" />
                    <div>
                      <div className="font-medium">Cloud Server</div>
                      <div className="text-xs text-gray-500">Máy chủ đám mây linh hoạt</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="hosting" className="py-3 px-4 cursor-pointer hover:bg-green-50">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-[hsl(142,76%,36%)]" />
                    <div>
                      <div className="font-medium">Web Hosting</div>
                      <div className="text-xs text-gray-500">Hosting website chuyên nghiệp</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="server" className="py-3 px-4 cursor-pointer hover:bg-purple-50">
                  <div className="flex items-center gap-3">
                    <Server className="h-5 w-5 text-[hsl(339,82%,52%)]" />
                    <div>
                      <div className="font-medium">Dedicated Server</div>
                      <div className="text-xs text-gray-500">Máy chủ riêng hiệu năng cao</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="colocation" className="py-3 px-4 cursor-pointer hover:bg-orange-50">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-orange-600" />
                    <div>
                      <div className="font-medium">Colocation</div>
                      <div className="text-xs text-gray-500">Thuê chỗ đặt máy chủ</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="email" className="py-3 px-4 cursor-pointer hover:bg-blue-50">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Email Hybrid</div>
                      <div className="text-xs text-gray-500">Hệ thống email doanh nghiệp</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="DLP" className="py-3 px-4 cursor-pointer hover:bg-red-50">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-red-600" />
                    <div>
                      <div className="font-medium">DLP</div>
                      <div className="text-xs text-gray-500">Data Loss Prevention</div>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message" className="text-gray-700 font-medium">Tin nhắn *</Label>
            <Textarea
              id="message"
              {...form.register("message")}
              placeholder="Vui lòng mô tả chi tiết nhu cầu và yêu cầu kỹ thuật của doanh nghiệp để chúng tôi có thể tư vấn phù hợp nhất..."
              className="mt-2 min-h-[120px] border-gray-300 focus:border-[hsl(207,100%,40%)] focus:ring-2 focus:ring-[hsl(207,100%,40%)]/20 rounded-lg resize-none"
              data-testid="textarea-message"
            />
            {form.formState.errors.message && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                {form.formState.errors.message.message}
              </p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-12 rounded-lg border-gray-300 hover:bg-gray-50 transition-all duration-200"
              data-testid="button-cancel"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-12 bg-gradient-to-r from-[hsl(207,100%,40%)] to-[hsl(207,100%,50%)] hover:from-[hsl(207,100%,35%)] hover:to-[hsl(207,100%,45%)] text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-70"
              data-testid="button-submit"
            >
              <Send className="mr-2 h-5 w-5" />
              {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
            </Button>
          </div>
        </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
