import { 
  Server, 
  Cloud, 
  HardDrive,
  Zap,
  Shield,
  Settings,
  CheckCircle,
  ArrowRight,
  Phone
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ServerServices() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-muted-foreground mb-8">
            <span>Danh mục</span>
            <span className="mx-2">›</span>
            <span>Máy chủ</span>
            <span className="mx-2">›</span>
            <span className="text-foreground font-medium">Dịch Vụ Máy Chủ</span>
          </nav>

          {/* Main Title */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Dịch Vụ Máy Chủ 
              <span className="text-primary"> Chuyên Nghiệp</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Giải pháp máy chủ toàn diện từ vật lý đến đám mây, đáp ứng mọi nhu cầu từ startup đến doanh nghiệp lớn. 
              Với hạ tầng hiện đại và dịch vụ hỗ trợ 24/7, chúng tôi đảm bảo hiệu suất tối ưu và độ tin cậy cao cho hệ thống của bạn.
            </p>
          </div>

          {/* Server Types */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Các Loại Máy Chủ
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Dedicated Servers */}
              <Card className="p-8 hover:shadow-xl transition-shadow duration-300 border-border">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 mx-auto">
                  <Server className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">
                  Máy chủ vật lý
                  <div className="text-lg font-normal text-muted-foreground">(Dedicated Servers)</div>
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  Tối ưu hóa hiệu suất cho các ứng dụng nặng. Hoàn toàn kiểm soát tài nguyên, 
                  bảo mật tuyệt đối và hiệu suất ổn định cho các hệ thống mission-critical.
                </p>
              </Card>

              {/* VPS */}
              <Card className="p-8 hover:shadow-xl transition-shadow duration-300 border-border">
                <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6 mx-auto">
                  <HardDrive className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">
                  Máy chủ ảo
                  <div className="text-lg font-normal text-muted-foreground">(VPS)</div>
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  Linh hoạt, tiết kiệm chi phí cho các dự án vừa và nhỏ. 
                  Cung cấp sự cân bằng hoàn hảo giữa hiệu suất và giá cả, dễ dàng nâng cấp khi cần.
                </p>
              </Card>

              {/* Cloud Servers */}
              <Card className="p-8 hover:shadow-xl transition-shadow duration-300 border-border">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto">
                  <Cloud className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">
                  Máy chủ đám mây
                  <div className="text-lg font-normal text-muted-foreground">(Cloud Servers)</div>
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  Khả năng mở rộng cao, đáng tin cậy. Auto-scaling, backup tự động 
                  và khả năng phục hồi nhanh chóng, phù hợp cho mọi quy mô doanh nghiệp.
                </p>
              </Card>
            </div>
          </div>

          {/* Feature Comparison Table */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Bảng So Sánh Tính Năng
            </h2>
            
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left p-6 font-semibold text-foreground">Tính năng</th>
                      <th className="text-center p-6 font-semibold text-foreground">Máy chủ vật lý</th>
                      <th className="text-center p-6 font-semibold text-foreground">Máy chủ ảo (VPS)</th>
                      <th className="text-center p-6 font-semibold text-foreground">Máy chủ đám mây</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border hover:bg-muted/25 transition-colors">
                      <td className="p-6 font-medium text-foreground flex items-center">
                        <Zap className="h-5 w-5 mr-3 text-primary" />
                        Hiệu suất
                      </td>
                      <td className="text-center p-6">
                        <div className="text-green-600 font-semibold">Cao nhất</div>
                        <div className="text-sm text-muted-foreground">100% tài nguyên</div>
                      </td>
                      <td className="text-center p-6">
                        <div className="text-orange-600 font-semibold">Trung bình</div>
                        <div className="text-sm text-muted-foreground">Chia sẻ tài nguyên</div>
                      </td>
                      <td className="text-center p-6">
                        <div className="text-blue-600 font-semibold">Linh hoạt</div>
                        <div className="text-sm text-muted-foreground">Auto-scaling</div>
                      </td>
                    </tr>
                    
                    <tr className="border-b border-border hover:bg-muted/25 transition-colors">
                      <td className="p-6 font-medium text-foreground flex items-center">
                        <Settings className="h-5 w-5 mr-3 text-primary" />
                        Mức độ kiểm soát
                      </td>
                      <td className="text-center p-6">
                        <div className="text-green-600 font-semibold">Toàn quyền</div>
                        <div className="text-sm text-muted-foreground">Root access</div>
                      </td>
                      <td className="text-center p-6">
                        <div className="text-green-600 font-semibold">Cao</div>
                        <div className="text-sm text-muted-foreground">Admin access</div>
                      </td>
                      <td className="text-center p-6">
                        <div className="text-orange-600 font-semibold">Trung bình</div>
                        <div className="text-sm text-muted-foreground">Managed service</div>
                      </td>
                    </tr>

                    <tr className="border-b border-border hover:bg-muted/25 transition-colors">
                      <td className="p-6 font-medium text-foreground flex items-center">
                        <ArrowRight className="h-5 w-5 mr-3 text-primary" />
                        Khả năng mở rộng
                      </td>
                      <td className="text-center p-6">
                        <div className="text-red-600 font-semibold">Hạn chế</div>
                        <div className="text-sm text-muted-foreground">Hardware cố định</div>
                      </td>
                      <td className="text-center p-6">
                        <div className="text-orange-600 font-semibold">Trung bình</div>
                        <div className="text-sm text-muted-foreground">Nâng cấp có hạn</div>
                      </td>
                      <td className="text-center p-6">
                        <div className="text-green-600 font-semibold">Rất cao</div>
                        <div className="text-sm text-muted-foreground">Instant scaling</div>
                      </td>
                    </tr>

                    <tr className="border-b border-border hover:bg-muted/25 transition-colors">
                      <td className="p-6 font-medium text-foreground flex items-center">
                        <Shield className="h-5 w-5 mr-3 text-primary" />
                        Bảo mật
                      </td>
                      <td className="text-center p-6">
                        <div className="text-green-600 font-semibold">Tối ưu</div>
                        <div className="text-sm text-muted-foreground">Isolation hoàn toàn</div>
                      </td>
                      <td className="text-center p-6">
                        <div className="text-orange-600 font-semibold">Tốt</div>
                        <div className="text-sm text-muted-foreground">Virtual isolation</div>
                      </td>
                      <td className="text-center p-6">
                        <div className="text-green-600 font-semibold">Cao</div>
                        <div className="text-sm text-muted-foreground">Enterprise security</div>
                      </td>
                    </tr>

                    <tr className="hover:bg-muted/25 transition-colors">
                      <td className="p-6 font-medium text-foreground flex items-center">
                        <span className="text-lg mr-3">💰</span>
                        Chi phí
                      </td>
                      <td className="text-center p-6">
                        <div className="text-red-600 font-semibold">Cao nhất</div>
                        <div className="text-sm text-muted-foreground">Từ 50M VND/tháng</div>
                      </td>
                      <td className="text-center p-6">
                        <div className="text-green-600 font-semibold">Tiết kiệm</div>
                        <div className="text-sm text-muted-foreground">Từ 500K VND/tháng</div>
                      </td>
                      <td className="text-center p-6">
                        <div className="text-orange-600 font-semibold">Linh hoạt</div>
                        <div className="text-sm text-muted-foreground">Pay-as-you-use</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="p-12 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Sẵn sàng tìm giải pháp máy chủ phù hợp?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Đội ngũ chuyên gia của chúng tôi sẽ tư vấn và thiết kế giải pháp máy chủ tối ưu 
                  cho nhu cầu cụ thể của doanh nghiệp bạn. Liên hệ ngay để được hỗ trợ miễn phí!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
                    data-testid="button-contact-consultation"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Liên hệ tư vấn miễn phí
                  </Button>
                  
                  <div className="flex items-center text-muted-foreground">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                    <span className="text-sm">Tư vấn 24/7 - Báo giá trong 30 phút</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}