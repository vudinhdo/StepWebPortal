import { 
  Router, 
  Network, 
  Shield,
  Cable,
  Zap,
  Award,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Quote,
  TrendingUp,
  Lock,
  Gauge
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function NetworkEquipment() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Thiết Bị Mạng Chuyên Dụng
                <br />
                <span className="text-primary">Xây Dựng Hạ Tầng Vững Chắc</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
                Chúng tôi cung cấp các thiết bị mạng chất lượng cao từ các thương hiệu hàng đầu, 
                đảm bảo tốc độ, độ ổn định và bảo mật tối đa cho hệ thống của bạn.
              </p>
              
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
                data-testid="button-view-products"
              >
                Xem Sản Phẩm
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose STEP Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Tại Sao Lại Chọn STEP?
                </h2>
                <p className="text-xl text-muted-foreground">
                  Những giá trị cốt lõi làm nên sự khác biệt của chúng tôi
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="p-8 text-center hover:shadow-lg transition-shadow border-2">
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
                    <Award className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Chính Hãng 100%</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Tất cả sản phẩm đều chính hãng với tem bảo hành rõ ràng từ nhà sản xuất, 
                    đảm bảo chất lượng và hiệu suất tối ưu.
                  </p>
                </Card>

                <Card className="p-8 text-center hover:shadow-lg transition-shadow border-2">
                  <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Hỗ Trợ Chuyên Nghiệp</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Đội ngũ kỹ thuật giàu kinh nghiệm tư vấn và hỗ trợ cài đặt, 
                    cấu hình thiết bị 24/7.
                  </p>
                </Card>

                <Card className="p-8 text-center hover:shadow-lg transition-shadow border-2">
                  <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6 mx-auto">
                    <Star className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Giá Cạnh Tranh</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Cam kết giá tốt nhất thị trường với nhiều chương trình khuyến mãi 
                    và ưu đãi cho khách hàng doanh nghiệp.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Equipment Types Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Các Loại Thiết Bị Mạng Chúng Tôi Cung Cấp
                </h2>
                <p className="text-xl text-muted-foreground">
                  Từ thiết bị cơ bản đến enterprise, đáp ứng mọi nhu cầu của bạn
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Router */}
                <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 group">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                      <Router className="h-8 w-8 text-primary" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      Router
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      Router WiFi 6, Router doanh nghiệp, Router cân bằng tải
                    </p>
                    
                    <div className="text-2xl font-bold text-primary mb-4">
                      Từ 2.500.000đ
                    </div>
                    
                    <ul className="space-y-2 text-left text-sm">
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        Tốc độ đến 6 Gbps
                      </li>
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        Hỗ trợ WiFi 6/6E
                      </li>
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        VPN & Firewall tích hợp
                      </li>
                    </ul>
                  </div>
                </Card>

                {/* Switch */}
                <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500/20 group">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto group-hover:bg-blue-200 transition-colors">
                      <Network className="h-8 w-8 text-blue-600" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      Switch
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      Switch Layer 2/3, PoE+, Managed Switch
                    </p>
                    
                    <div className="text-2xl font-bold text-blue-600 mb-4">
                      Từ 1.200.000đ
                    </div>
                    
                    <ul className="space-y-2 text-left text-sm">
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        8-48 ports Gigabit
                      </li>
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        PoE+ 30W/port
                      </li>
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        VLAN & QoS
                      </li>
                    </ul>
                  </div>
                </Card>

                {/* Firewall */}
                <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-red-500/20 group">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6 mx-auto group-hover:bg-red-200 transition-colors">
                      <Shield className="h-8 w-8 text-red-600" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      Tường Lửa
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      Next-gen Firewall, UTM, Network Security
                    </p>
                    
                    <div className="text-2xl font-bold text-red-600 mb-4">
                      Từ 8.500.000đ
                    </div>
                    
                    <ul className="space-y-2 text-left text-sm">
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        IPS/IDS tích hợp
                      </li>
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        Anti-virus & Anti-spam
                      </li>
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        SSL VPN
                      </li>
                    </ul>
                  </div>
                </Card>

                {/* Cables & Accessories */}
                <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-green-500/20 group">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto group-hover:bg-green-200 transition-colors">
                      <Cable className="h-8 w-8 text-green-600" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      Cáp Mạng & Phụ Kiện
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      Cáp Cat6/6A, Patch panel, Rack cabinet
                    </p>
                    
                    <div className="text-2xl font-bold text-green-600 mb-4">
                      Từ 15.000đ
                    </div>
                    
                    <ul className="space-y-2 text-left text-sm">
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        Cáp Cat6A/Cat7
                      </li>
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        Patch panel 24/48 port
                      </li>
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        Rack 19 inch chuẩn
                      </li>
                    </ul>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Tại Sao Nên Chọn Thiết Bị Mạng Từ Chúng Tôi?
                </h2>
                <p className="text-xl text-muted-foreground">
                  Những lợi ích vượt trội khi lựa chọn STEP làm đối tác
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6 mx-auto">
                    <Gauge className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Hiệu Suất Cao</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Thiết bị enterprise-grade đảm bảo hiệu suất ổn định 24/7 
                    với throughput cao và độ trễ thấp.
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 mx-auto">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Độ Bền Vượt Trội</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Chế tạo từ vật liệu cao cấp, thiết kế chống nhiễu và 
                    chịu được điều kiện khắc nghiệt.
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6 mx-auto">
                    <Lock className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Bảo Mật Mạnh Mẽ</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Tích hợp các tính năng bảo mật tiên tiến như IPS/IDS, 
                    VPN và access control.
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Tương Thích Đa Nền Tảng</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Hỗ trợ đa chuẩn kết nối, tương thích với mọi hệ điều hành 
                    và ứng dụng doanh nghiệp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Khách Hàng Nói Gì Về Chúng Tôi?
                </h2>
                <p className="text-xl text-muted-foreground">
                  Những phản hồi chân thực từ khách hàng đã sử dụng dịch vụ
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="p-8 hover:shadow-lg transition-shadow relative">
                  <Quote className="h-8 w-8 text-primary/20 absolute top-6 left-6" />
                  <div className="mt-6">
                    <p className="text-muted-foreground leading-relaxed mb-6 italic">
                      "Hệ thống mạng của công ty chúng tôi hoạt động cực kỳ ổn định sau khi 
                      sử dụng thiết bị từ STEP. Đặc biệt ấn tượng với chất lượng switch và 
                      dịch vụ hỗ trợ 24/7."
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Nguyễn Minh Tuấn</p>
                        <p className="text-sm text-muted-foreground">IT Manager, FPT Software</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 hover:shadow-lg transition-shadow relative">
                  <Quote className="h-8 w-8 text-primary/20 absolute top-6 left-6" />
                  <div className="mt-6">
                    <p className="text-muted-foreground leading-relaxed mb-6 italic">
                      "Tư vấn chuyên nghiệp, thiết bị chính hãng với giá cạnh tranh. 
                      Router WiFi 6 mà chúng tôi mua có tốc độ và độ phủ sóng tuyệt vời 
                      cho toàn bộ tòa nhà 5 tầng."
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <Star className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Trần Thị Hương</p>
                        <p className="text-sm text-muted-foreground">Giám đốc IT, Vietcombank</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 hover:shadow-lg transition-shadow relative">
                  <Quote className="h-8 w-8 text-primary/20 absolute top-6 left-6" />
                  <div className="mt-6">
                    <p className="text-muted-foreground leading-relaxed mb-6 italic">
                      "Firewall của STEP đã bảo vệ hệ thống của chúng tôi rất hiệu quả. 
                      Giao diện quản lý trực quan, dễ cấu hình và báo cáo chi tiết. 
                      Đội ngũ hỗ trợ rất nhiệt tình."
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                        <Shield className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Lê Văn Hùng</p>
                        <p className="text-sm text-muted-foreground">Network Admin, VinGroup</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}