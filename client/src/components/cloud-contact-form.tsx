import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle } from "lucide-react";

const cloudContactSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(10, "Số điện thoại phải có ít nhất 10 ký tự"),
  service: z.string().min(1, "Vui lòng chọn dịch vụ quan tâm"),
  company: z.string().optional(),
  message: z.string().min(10, "Tin nhắn phải có ít nhất 10 ký tự"),
});

type CloudContactFormData = z.infer<typeof cloudContactSchema>;

interface CloudContactFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CloudContactForm({ open, onOpenChange }: CloudContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<CloudContactFormData>({
    resolver: zodResolver(cloudContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      company: "",
      message: "",
    },
  });

  const submitContactMutation = useMutation({
    mutationFn: async (data: CloudContactFormData) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to submit contact form");
      }
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Gửi thành công!",
        description: "Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ.",
      });
      // Invalidate contacts query to refresh admin panel
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
      
      // Auto close after 3 seconds
      setTimeout(() => {
        onOpenChange(false);
        setIsSubmitted(false);
        form.reset();
      }, 3000);
    },
    onError: (error) => {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau hoặc liên hệ trực tiếp với chúng tôi.",
        variant: "destructive",
      });
      console.error("Error submitting form:", error);
    },
  });

  const onSubmit = (data: CloudContactFormData) => {
    submitContactMutation.mutate(data);
  };

  const handleClose = () => {
    if (!submitContactMutation.isPending) {
      onOpenChange(false);
      setIsSubmitted(false);
      form.reset();
    }
  };

  const cloudServices = [
    "Cloud GPU",
    "Cloud Server", 
    "Cloud Odoo",
    "Cloud AMD",
    "Cloud N8N",
    "K8s Management",
    "Workflow Automation",
    "Tư vấn tổng thể"
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-[hsl(207,100%,40%)]">
            {isSubmitted ? "Cảm ơn bạn!" : "Đăng Ký Tư Vấn Cloud"}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            {isSubmitted 
              ? "Yêu cầu của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ sớm nhất có thể."
              : "Nhận báo giá cá nhân hóa và ưu đãi 20% cho tháng đầu tiên!"
            }
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="flex flex-col items-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Đã gửi thành công!
            </p>
            <p className="text-gray-600 text-center">
              Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ.
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ và tên *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập họ và tên" {...field} />
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
                      <FormLabel>Số điện thoại *</FormLabel>
                      <FormControl>
                        <Input placeholder="0987 654 321" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="example@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên công ty</FormLabel>
                    <FormControl>
                      <Input placeholder="Công ty ABC..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dịch vụ quan tâm *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn dịch vụ Cloud..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cloudServices.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả yêu cầu *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Mô tả chi tiết nhu cầu về cloud computing của bạn..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong className="text-[hsl(207,100%,40%)]">Ưu đãi đặc biệt:</strong> 
                  {" "}Giảm 20% phí dịch vụ tháng đầu tiên + Tư vấn miễn phí về kiến trúc cloud phù hợp
                </p>
              </div>

              <Button
                type="submit"
                disabled={submitContactMutation.isPending}
                className="w-full bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)] text-white py-3"
              >
                {submitContactMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  "Gửi Yêu Cầu & Nhận Báo Giá"
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Bằng việc gửi form, bạn đồng ý với{" "}
                <a href="#" className="text-[hsl(207,100%,40%)] hover:underline">
                  Điều khoản sử dụng
                </a>{" "}
                và{" "}
                <a href="#" className="text-[hsl(207,100%,40%)] hover:underline">
                  Chính sách bảo mật
                </a>{" "}
                của STEP.
              </p>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}