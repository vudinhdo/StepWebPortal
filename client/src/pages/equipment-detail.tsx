import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ShoppingCart, 
  MessageCircle, 
  Cpu, 
  MemoryStick, 
  HardDrive,
  Server,
  Network,
  Shield,
  Zap,
  Package,
  Check,
  Star,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/cart-context';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/header';
import Footer from '@/components/footer';
import type { ServerEquipment } from '@shared/schema';

const ZALO_OA_LINK = 'https://zalo.me/93171011934970677';

function formatPrice(price: number | null | undefined): string {
  if (!price) return 'Liên hệ';
  return new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
}

function getSpecs(equipment: ServerEquipment) {
  const specs = equipment.specs as Record<string, unknown> | null;
  if (!specs) return {};
  return {
    cpu: specs.cpu as string | undefined,
    ram: specs.ram as string | undefined,
    storage: specs.storage as string | undefined,
    network: specs.network as string | undefined,
    raid: specs.raid as string | undefined,
    psu: specs.psu as string | undefined,
    formFactor: specs.formFactor as string | undefined,
    warranty: specs.warranty as string | undefined,
  };
}

export default function EquipmentDetail() {
  const [, params] = useRoute('/thiet-bi-may-chu/:id');
  const equipmentId = params?.id ? parseInt(params.id) : null;
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const { data: allEquipment = [], isLoading } = useQuery<ServerEquipment[]>({
    queryKey: ['/api/equipment'],
  });

  const equipment = useMemo(() => {
    return allEquipment.find(e => e.id === equipmentId);
  }, [allEquipment, equipmentId]);

  const relatedProducts = useMemo(() => {
    if (!equipment) return [];
    return allEquipment
      .filter(e => 
        e.id !== equipment.id && 
        (e.category === equipment.category || e.brand === equipment.brand)
      )
      .slice(0, 4);
  }, [allEquipment, equipment]);

  const handleAddToCart = () => {
    if (!equipment) return;
    addToCart(equipment, quantity);
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${equipment.name} x ${quantity}`,
    });
  };

  const handleZaloContact = () => {
    window.open(ZALO_OA_LINK, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!equipment) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
            <Link href="/dich-vu/may-chu/thiet-bi-may-chu">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại danh sách
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const specs = getSpecs(equipment);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary">Trang chủ</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/dich-vu/may-chu/thiet-bi-may-chu" className="hover:text-primary">Thiết bị máy chủ</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white truncate max-w-[200px]">{equipment.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg"
            >
              <div className="relative aspect-video bg-gray-100 dark:bg-slate-700 rounded-xl flex items-center justify-center mb-4">
                {equipment.imageUrl ? (
                  <img 
                    src={equipment.imageUrl} 
                    alt={equipment.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <Server className="w-32 h-32 text-gray-400" />
                )}
                {equipment.isFeatured && (
                  <Badge className="absolute top-4 left-4 bg-amber-500">
                    <Star className="w-3 h-3 mr-1" /> Nổi bật
                  </Badge>
                )}
                {equipment.condition && (
                  <Badge 
                    className={`absolute top-4 right-4 ${
                      equipment.condition === 'new' ? 'bg-green-500' : 
                      equipment.condition === 'refurbished' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}
                  >
                    {equipment.condition === 'new' ? 'Mới 100%' : 
                     equipment.condition === 'refurbished' ? 'Đã qua sử dụng' : 'Cũ'}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>SKU: {equipment.partNumber || 'N/A'}</span>
                <span>•</span>
                <span className={equipment.stockCount && equipment.stockCount > 0 ? 'text-green-600' : 'text-red-500'}>
                  {equipment.stockCount && equipment.stockCount > 0 ? `Còn ${equipment.stockCount} sản phẩm` : 'Hết hàng'}
                </span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <Badge variant="outline" className="mb-2">{equipment.brand}</Badge>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {equipment.name}
                </h1>
                {equipment.model && (
                  <p className="text-gray-500">Model: {equipment.model}</p>
                )}
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Giá End User:</span>
                    <span className="text-xl font-bold text-primary">{formatPrice(equipment.priceEndUser)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Giá Dealer:</span>
                    <span className="text-lg font-semibold text-green-600">{formatPrice(equipment.priceDealer)}</span>
                  </div>
                  {equipment.priceMD && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Giá MD:</span>
                      <span className="text-lg font-semibold text-blue-600">{formatPrice(equipment.priceMD)}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-gray-500">Số lượng:</span>
                  <div className="flex items-center border rounded-lg">
                    <button 
                      className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-700"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      data-testid="decrease-quantity"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-semibold" data-testid="quantity-display">{quantity}</span>
                    <button 
                      className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-700"
                      onClick={() => setQuantity(quantity + 1)}
                      data-testid="increase-quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Button 
                    onClick={handleZaloContact}
                    variant="outline"
                    className="w-full h-12 text-blue-600 border-blue-600 hover:bg-blue-50"
                    data-testid="btn-zalo-quote"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Báo giá qua Zalo
                  </Button>
                  
                  <Button 
                    onClick={handleAddToCart}
                    className="w-full h-12 bg-primary hover:bg-primary/90"
                    disabled={!equipment.stockCount || equipment.stockCount <= 0}
                    data-testid="btn-add-to-cart"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Thêm vào giỏ hàng
                  </Button>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-800 dark:text-green-400">Cam kết chất lượng</p>
                    <p className="text-sm text-green-700 dark:text-green-500">Bảo hành chính hãng, hỗ trợ kỹ thuật 24/7</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <Tabs defaultValue="specs" className="mb-12">
            <TabsList className="w-full justify-start bg-white dark:bg-slate-800 rounded-xl p-1 mb-6">
              <TabsTrigger value="specs" className="flex-1 md:flex-none">Thông số kỹ thuật</TabsTrigger>
              <TabsTrigger value="description" className="flex-1 md:flex-none">Mô tả</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specs">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {specs.cpu && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <Cpu className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">CPU / Bộ xử lý</p>
                          <p className="font-semibold">{specs.cpu}</p>
                        </div>
                      </div>
                    )}
                    {specs.ram && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                          <MemoryStick className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">RAM / Bộ nhớ</p>
                          <p className="font-semibold">{specs.ram}</p>
                        </div>
                      </div>
                    )}
                    {specs.storage && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <HardDrive className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Ổ cứng / Storage</p>
                          <p className="font-semibold">{specs.storage}</p>
                        </div>
                      </div>
                    )}
                    {specs.network && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                          <Network className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Network</p>
                          <p className="font-semibold">{specs.network}</p>
                        </div>
                      </div>
                    )}
                    {specs.raid && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                          <Server className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">RAID Controller</p>
                          <p className="font-semibold">{specs.raid}</p>
                        </div>
                      </div>
                    )}
                    {specs.psu && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                          <Zap className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Nguồn / PSU</p>
                          <p className="font-semibold">{specs.psu}</p>
                        </div>
                      </div>
                    )}
                    {specs.formFactor && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                          <Package className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Form Factor</p>
                          <p className="font-semibold">{specs.formFactor}</p>
                        </div>
                      </div>
                    )}
                    {specs.warranty && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                          <Check className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Bảo hành</p>
                          <p className="font-semibold">{specs.warranty}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="description">
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {equipment.description || 'Chưa có mô tả chi tiết cho sản phẩm này.'}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {relatedProducts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(product => {
                  const productSpecs = getSpecs(product);
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -4 }}
                      className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg group"
                    >
                      <Link href={`/thiet-bi-may-chu/${product.id}`}>
                        <div className="aspect-video bg-gray-100 dark:bg-slate-700 flex items-center justify-center p-4">
                          {product.imageUrl ? (
                            <img 
                              src={product.imageUrl} 
                              alt={product.name}
                              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                            />
                          ) : (
                            <Server className="w-16 h-16 text-gray-400" />
                          )}
                        </div>
                        <div className="p-4">
                          <Badge variant="outline" className="mb-2 text-xs">{product.brand}</Badge>
                          <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          {productSpecs.cpu && (
                            <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                              <Cpu className="w-3 h-3" />
                              <span className="truncate">{productSpecs.cpu}</span>
                            </p>
                          )}
                          <p className="text-primary font-bold mt-2">
                            {formatPrice(product.priceDealer)}
                          </p>
                        </div>
                      </Link>
                      <div className="p-4 pt-0 flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 text-xs"
                          onClick={() => window.open(ZALO_OA_LINK, '_blank')}
                          data-testid={`related-zalo-${product.id}`}
                        >
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Báo giá
                        </Button>
                        <Button 
                          size="sm"
                          className="flex-1 text-xs"
                          onClick={() => {
                            addToCart(product);
                            toast({
                              title: "Đã thêm vào giỏ hàng",
                              description: product.name,
                            });
                          }}
                          data-testid={`related-cart-${product.id}`}
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Giỏ hàng
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
