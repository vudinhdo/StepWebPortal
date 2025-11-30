import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft,
  Server,
  CreditCard,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/cart-context';
import Header from '@/components/header';
import Footer from '@/components/footer';

function formatPrice(price: number | null | undefined): string {
  if (!price) return 'Liên hệ';
  return new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
}

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();

  const subtotal = getTotal();
  const vat = subtotal * 0.1;
  const total = subtotal + vat;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">Giỏ hàng trống</h1>
            <p className="text-gray-500 mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
            <Link href="/dich-vu/may-chu/thiet-bi-may-chu">
              <Button size="lg" data-testid="btn-continue-shopping">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Tiếp tục mua sắm
              </Button>
            </Link>
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-primary" />
            Giỏ hàng ({items.length} sản phẩm)
          </h1>
          <Button 
            variant="outline" 
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            data-testid="btn-clear-cart"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Xóa tất cả
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.equipment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        {item.equipment.imageUrl ? (
                          <img 
                            src={item.equipment.imageUrl} 
                            alt={item.equipment.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <Server className="w-12 h-12 text-gray-400" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <Link href={`/thiet-bi-may-chu/${item.equipment.id}`}>
                          <h3 className="font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors line-clamp-2">
                            {item.equipment.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.equipment.brand} • {item.equipment.partNumber || 'N/A'}
                        </p>
                        <p className="text-primary font-bold mt-2">
                          {formatPrice(item.equipment.priceDealer || item.equipment.priceEndUser)}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <button 
                          onClick={() => removeFromCart(item.equipment.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          data-testid={`remove-item-${item.equipment.id}`}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        
                        <div className="flex items-center border rounded-lg">
                          <button 
                            className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                            onClick={() => updateQuantity(item.equipment.id, item.quantity - 1)}
                            data-testid={`decrease-${item.equipment.id}`}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-1 font-semibold min-w-[3rem] text-center" data-testid={`qty-${item.equipment.id}`}>
                            {item.quantity}
                          </span>
                          <button 
                            className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                            onClick={() => updateQuantity(item.equipment.id, item.quantity + 1)}
                            data-testid={`increase-${item.equipment.id}`}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="font-bold text-lg">
                          {formatPrice((item.equipment.priceDealer || item.equipment.priceEndUser || 0) * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Tóm tắt đơn hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tạm tính</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>VAT (10%)</span>
                  <span>{formatPrice(vat)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Tổng cộng</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">(Đã bao gồm VAT)</p>
                </div>

                <Link href="/thanh-toan">
                  <Button className="w-full h-12 mt-4" size="lg" data-testid="btn-checkout">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Tiến hành thanh toán
                  </Button>
                </Link>

                <Link href="/dich-vu/may-chu/thiet-bi-may-chu">
                  <Button variant="outline" className="w-full" data-testid="btn-continue">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Tiếp tục mua sắm
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
