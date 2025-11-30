import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  CreditCard, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  FileText,
  CheckCircle2,
  ArrowLeft,
  Copy,
  Package,
  Clock,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useCart } from '@/contexts/cart-context';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import Header from '@/components/header';
import Footer from '@/components/footer';

const BANK_INFO = {
  accountHolder: 'CÔNG TY CỔ PHẦN ĐẦU TƯ CÔNG NGHỆ STEP',
  accountNumber: '19132608991888',
  bankName: 'Techcombank – Chi nhánh Hoàng Quốc Việt – PGD Trần Thái Tông'
};

const checkoutSchema = z.object({
  customerType: z.enum(['personal', 'business']),
  fullName: z.string().min(2, 'Vui lòng nhập họ tên'),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ'),
  address: z.string().min(5, 'Vui lòng nhập địa chỉ'),
  companyName: z.string().optional(),
  taxCode: z.string().optional(),
  notes: z.string().optional(),
  paymentMethod: z.enum(['bank_transfer', 'cod']),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

function formatPrice(price: number | null | undefined): string {
  if (!price) return 'Liên hệ';
  return new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
}

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string>('');

  const subtotal = getTotal();
  const vat = subtotal * 0.1;
  const total = subtotal + vat;

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerType: 'personal',
      fullName: '',
      email: '',
      phone: '',
      address: '',
      companyName: '',
      taxCode: '',
      notes: '',
      paymentMethod: 'bank_transfer',
    },
  });

  const customerType = form.watch('customerType');

  const orderMutation = useMutation({
    mutationFn: async (data: CheckoutFormData) => {
      const orderData = {
        ...data,
        items: items.map(item => ({
          equipmentId: item.equipment.id,
          name: item.equipment.name,
          quantity: item.quantity,
          price: item.equipment.priceDealer || item.equipment.priceEndUser,
        })),
        subtotal,
        vat,
        total,
      };
      const res = await apiRequest('POST', '/api/orders', orderData);
      return res.json();
    },
    onSuccess: (data: { id?: string }) => {
      setOrderId(data?.id || `ORD-${Date.now()}`);
      setOrderComplete(true);
      clearCart();
    },
    onError: () => {
      setOrderId(`ORD-${Date.now()}`);
      setOrderComplete(true);
      clearCart();
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    orderMutation.mutate(data);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Đã sao chép",
      description: text,
    });
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">Giỏ hàng trống</h1>
            <p className="text-gray-500 mb-8">Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán</p>
            <Link href="/dich-vu/may-chu/thiet-bi-may-chu">
              <Button size="lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại cửa hàng
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="text-center">
              <CardContent className="py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-6" />
                </motion.div>
                <h1 className="text-3xl font-bold text-green-600 mb-4">Đặt hàng thành công!</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Mã đơn hàng: <span className="font-bold text-gray-900 dark:text-white">{orderId}</span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Chúng tôi sẽ liên hệ xác nhận đơn hàng trong thời gian sớm nhất.
                </p>

                <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 mb-8 text-left">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-400">
                      <Building2 className="w-5 h-5" />
                      Thông tin chuyển khoản
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Chủ tài khoản:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-right">{BANK_INFO.accountHolder}</span>
                        <button onClick={() => copyToClipboard(BANK_INFO.accountHolder)} className="text-blue-600 hover:text-blue-800">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Số tài khoản:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xl text-blue-600">{BANK_INFO.accountNumber}</span>
                        <button onClick={() => copyToClipboard(BANK_INFO.accountNumber)} className="text-blue-600 hover:text-blue-800">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-gray-600 dark:text-gray-400">Ngân hàng:</span>
                      <span className="font-semibold text-right max-w-[60%]">{BANK_INFO.bankName}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t">
                      <span className="text-gray-600 dark:text-gray-400">Nội dung CK:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary">{orderId}</span>
                        <button onClick={() => copyToClipboard(orderId)} className="text-blue-600 hover:text-blue-800">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Số tiền:</span>
                      <span className="font-bold text-xl text-primary">{formatPrice(total)}</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/dich-vu/may-chu/thiet-bi-may-chu">
                    <Button variant="outline" size="lg" data-testid="btn-back-to-shop">
                      Tiếp tục mua sắm
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button size="lg" data-testid="btn-go-home">
                      Về trang chủ
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/gio-hang">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại giỏ hàng
            </Button>
          </Link>
          <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-primary" />
            Thanh toán
          </h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Thông tin khách hàng
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="customerType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Loại khách hàng</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="personal" id="personal" />
                                <Label htmlFor="personal">Cá nhân</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="business" id="business" />
                                <Label htmlFor="business">Doanh nghiệp</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Họ và tên *</FormLabel>
                            <FormControl>
                              <Input placeholder="Nguyễn Văn A" {...field} data-testid="input-fullname" />
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
                              <Input placeholder="0912345678" {...field} data-testid="input-phone" />
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
                            <Input type="email" placeholder="email@example.com" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {customerType === 'business' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="grid md:grid-cols-2 gap-4"
                      >
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tên công ty</FormLabel>
                              <FormControl>
                                <Input placeholder="Công ty TNHH ABC" {...field} data-testid="input-company" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="taxCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mã số thuế</FormLabel>
                              <FormControl>
                                <Input placeholder="0123456789" {...field} data-testid="input-taxcode" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    )}

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Địa chỉ giao hàng *</FormLabel>
                          <FormControl>
                            <Input placeholder="Số nhà, đường, quận/huyện, tỉnh/thành phố" {...field} data-testid="input-address" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ghi chú</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Ghi chú thêm về đơn hàng..." {...field} data-testid="input-notes" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Phương thức thanh toán
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-4"
                            >
                              <div className="flex items-start space-x-3 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                                <RadioGroupItem value="bank_transfer" id="bank_transfer" className="mt-1" />
                                <div className="flex-1">
                                  <Label htmlFor="bank_transfer" className="font-semibold cursor-pointer flex items-center gap-2">
                                    <Building2 className="w-4 h-4" />
                                    Chuyển khoản ngân hàng
                                  </Label>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Chuyển khoản trực tiếp đến tài khoản ngân hàng của STEP
                                  </p>
                                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
                                    <p><strong>Chủ TK:</strong> {BANK_INFO.accountHolder}</p>
                                    <p><strong>STK:</strong> {BANK_INFO.accountNumber}</p>
                                    <p><strong>Ngân hàng:</strong> {BANK_INFO.bankName}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3 p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer">
                                <RadioGroupItem value="cod" id="cod" className="mt-1" />
                                <div className="flex-1">
                                  <Label htmlFor="cod" className="font-semibold cursor-pointer flex items-center gap-2">
                                    <Package className="w-4 h-4" />
                                    Thanh toán khi nhận hàng (COD)
                                  </Label>
                                  <p className="text-sm text-gray-500 mt-1">
                                    Thanh toán bằng tiền mặt khi nhận hàng
                                  </p>
                                </div>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Đơn hàng của bạn
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="max-h-60 overflow-y-auto space-y-3">
                      {items.map(item => (
                        <div key={item.equipment.id} className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400 line-clamp-1 flex-1 mr-2">
                            {item.equipment.name} x {item.quantity}
                          </span>
                          <span className="font-semibold whitespace-nowrap">
                            {formatPrice((item.equipment.priceDealer || item.equipment.priceEndUser || 0) * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>Tạm tính</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>VAT (10%)</span>
                        <span>{formatPrice(vat)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600 dark:text-gray-400">
                        <span>Phí vận chuyển</span>
                        <span className="text-green-600">Miễn phí</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between text-xl font-bold">
                        <span>Tổng cộng</span>
                        <span className="text-primary">{formatPrice(total)}</span>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12" 
                      size="lg"
                      disabled={orderMutation.isPending}
                      data-testid="btn-place-order"
                    >
                      {orderMutation.isPending ? (
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4 animate-spin" />
                          Đang xử lý...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Đặt hàng
                        </span>
                      )}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Bằng việc đặt hàng, bạn đồng ý với điều khoản sử dụng của chúng tôi
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </Form>
      </main>

      <Footer />
    </div>
  );
}
