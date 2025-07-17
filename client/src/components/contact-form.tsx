import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema, type InsertContact } from "@shared/schema";

interface ContactFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactForm({ open, onOpenChange }: ContactFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[hsl(207,100%,40%)]">
            Liên hệ với chuyên gia STEP
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Họ và tên *</Label>
              <Input
                id="name"
                {...form.register("name")}
                placeholder="Nhập họ và tên"
                className="mt-1"
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
              />
            </div>
            <div>
              <Label htmlFor="company">Công ty</Label>
              <Input
                id="company"
                {...form.register("company")}
                placeholder="Nhập tên công ty"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="service">Dịch vụ quan tâm</Label>
            <Select onValueChange={(value) => form.setValue("service", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Chọn dịch vụ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="domain">Tên miền</SelectItem>
                <SelectItem value="cloud">Cloud</SelectItem>
                <SelectItem value="hosting">Hosting</SelectItem>
                <SelectItem value="server">Máy chủ</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="software">Phần mềm</SelectItem>
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
              placeholder="Mô tả nhu cầu của bạn..."
              className="mt-1 min-h-[100px]"
            />
            {form.formState.errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.message.message}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)]"
            >
              {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
