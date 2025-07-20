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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, Gift, X } from "lucide-react";

const popupSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  name: z.string().optional(),
  phone: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "Bạn cần đồng ý để nhận khuyến nghị bảo mật & ưu đãi"
  }),
});

type PopupFormData = z.infer<typeof popupSchema>;

interface CloudPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CloudPopup({ open, onOpenChange }: CloudPopupProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<PopupFormData>({
    resolver: zodResolver(popupSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      agreeToTerms: false,
    },
  });

  const submitPopupMutation = useMutation({
    mutationFn: async (data: PopupFormData) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          service: "Cloud Marketing Popup",
          message: `Đăng ký nhận khuyến mãi đặc biệt Cloud. Email: ${data.email}, Name: ${data.name || 'Chưa cung cấp'}, Phone: ${data.phone || 'Chưa cung cấp'}`,
          company: "Popup Subscriber",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit popup form");
      }
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Đăng ký thành công!",
        description: "Mã giảm giá và e-book bảo mật sẽ được gửi đến email của bạn.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
      
      // Auto close after 4 seconds
      setTimeout(() => {
        onOpenChange(false);
        setIsSubmitted(false);
        form.reset();
      }, 4000);
    },
    onError: (error) => {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau.",
        variant: "destructive",
      });
      console.error("Error submitting popup form:", error);
    },
  });

  const onSubmit = (data: PopupFormData) => {
    submitPopupMutation.mutate(data);
  };

  const handleClose = () => {
    if (!submitPopupMutation.isPending) {
      onOpenChange(false);
      setIsSubmitted(false);
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[450px] bg-gradient-to-br from-blue-50 to-white border-[hsl(207,100%,40%)] border-2">
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-4 top-4 h-6 w-6 p-0"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[hsl(207,100%,40%)] rounded-full p-3">
              <Gift className="h-8 w-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-[hsl(207,100%,40%)]">
            {isSubmitted ? "Cảm ơn bạn!" : "Nhận Khuyến Mãi Đặc Biệt!"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {isSubmitted 
              ? "Mã giảm giá và e-book bảo mật sẽ được gửi đến email của bạn trong 5 phút."
              : "Giảm 30% Cloud Server đầu tiên + E-book bảo mật miễn phí!"
            }
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="flex flex-col items-center py-6">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Đăng ký thành công!
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 w-full">
              <p className="text-sm text-gray-700 text-center">
                <strong>Bạn sẽ nhận được:</strong><br/>
                • Mã giảm 30% cho Cloud Server đầu tiên<br/>
                • E-book "Bảo mật dữ liệu Cloud cho SMEs"<br/>
                • Hướng dẫn setup cloud an toàn
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Gift className="h-5 w-5 text-[hsl(207,100%,40%)] mr-2" />
                <span className="font-semibold text-gray-900">Ưu đãi đặc biệt:</span>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>Giảm 30%</strong> cho Cloud Server đầu tiên</li>
                <li>• <strong>E-book miễn phí:</strong> "Bảo mật dữ liệu Cloud cho SMEs"</li>
                <li>• <strong>Tư vấn setup</strong> cloud an toàn</li>
              </ul>
              <p className="text-xs text-red-600 font-medium mt-2">
                ⏰ Chỉ trong 7 ngày!
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="example@company.com" 
                          className="border-[hsl(207,100%,40%)] focus:ring-[hsl(207,100%,40%)]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên (tùy chọn)</FormLabel>
                        <FormControl>
                          <Input placeholder="Họ tên" {...field} />
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
                        <FormLabel>SĐT (tùy chọn)</FormLabel>
                        <FormControl>
                          <Input placeholder="09xxxxxxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm">
                          Tôi đồng ý nhận khuyến nghị bảo mật & ưu đãi từ STEP
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={submitPopupMutation.isPending}
                  className="w-full bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)] text-white py-3 font-semibold"
                >
                  {submitPopupMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    "Nhận Ngay - Miễn Phí!"
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Chỉ mất 1 phút! Dữ liệu của bạn được bảo mật tuyệt đối.
                </p>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}