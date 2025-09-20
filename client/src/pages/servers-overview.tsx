import { 
  Server, 
  Cloud, 
  HardDrive,
  Shield,
  Clock,
  Headphones,
  CheckCircle,
  ArrowRight,
  Phone,
  Zap,
  Settings,
  TrendingUp,
  Lock,
  Search,
  Users,
  Award,
  Star,
  Plus,
  Minus,
  Mail,
  User,
  MessageSquare
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ServersOverview() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Giải Pháp Máy Chủ 
                <span className="text-primary"> Toàn Diện</span>
                <br />
                cho Mọi Doanh Nghiệp
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
                Khám phá các lựa chọn máy chủ mạnh mẽ và đáng tin cậy. Chúng tôi cung cấp giải pháp phù hợp với mọi quy mô 
                và nhu cầu kinh doanh, từ máy chủ vật lý, ảo hóa đến đám mây.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
                  data-testid="button-explore-solutions"
                >
                  Khám Phá Giải Pháp
                  <Search className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg"
                  data-testid="button-request-consultation"
                >
                  Yêu Cầu Tư Vấn
                  <Phone className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Server Comparison Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Lựa Chọn Máy Chủ Phù Hợp với Nhu Cầu
                </h2>
                <p className="text-xl text-muted-foreground">
                  So sánh và tìm giải pháp máy chủ tốt nhất cho doanh nghiệp của bạn
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Physical Server */}
                <Card className="p-8 hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/20 group">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                      <Server className="h-8 w-8 text-primary" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      Máy Chủ Vật Lý
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Hiệu suất cao nhất, toàn quyền kiểm soát, phù hợp cho ứng dụng lớn 
                      và các hệ thống đòi hỏi tài nguyên mạnh mẽ.
                    </p>
                    
                    <ul className="space-y-3 text-left">
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        Tối đa hiệu suất với 100% tài nguyên
                      </li>
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        Toàn quyền kiểm soát và tùy chỉnh
                      </li>
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        Bảo mật tuyệt đối với isolation hoàn toàn
                      </li>
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        Phù hợp cho ứng dụng mission-critical
                      </li>
                    </ul>
                  </div>
                </Card>

                {/* VPS */}
                <Card className="p-8 hover:shadow-2xl transition-all duration-300 border-2 hover:border-orange-500/20 group">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6 mx-auto group-hover:bg-orange-200 transition-colors">
                      <HardDrive className="h-8 w-8 text-orange-600" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      Máy Chủ Ảo (VPS)
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Cân bằng hoàn hảo giữa hiệu suất và chi phí, dễ dàng nâng cấp 
                      khi doanh nghiệp phát triển.
                    </p>
                    
                    <ul className="space-y-3 text-left">
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        Linh hoạt và tiết kiệm chi phí
                      </li>
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        Dễ dàng nâng cấp tài nguyên
                      </li>
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        Quản lý đơn giản với control panel
                      </li>
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        Phù hợp cho dự án vừa và nhỏ
                      </li>
                    </ul>
                  </div>
                </Card>

                {/* Cloud Server */}
                <Card className="p-8 hover:shadow-2xl transition-all duration-300 border-2 hover:border-green-500/20 group">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto group-hover:bg-green-200 transition-colors">
                      <Cloud className="h-8 w-8 text-green-600" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      Máy Chủ Đám Mây
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Khả năng mở rộng vô hạn, auto-scaling và backup tự động 
                      cho mọi quy mô doanh nghiệp.
                    </p>
                    
                    <ul className="space-y-3 text-left">
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        Khả năng mở rộng không giới hạn
                      </li>
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        Auto-scaling theo nhu cầu thực tế
                      </li>
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        Backup tự động và disaster recovery
                      </li>
                      <li className="flex items-center text-foreground">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        Thanh toán theo mức sử dụng
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
                  Lợi Ích Khi Sử Dụng Dịch Vụ Máy Chủ Của Chúng Tôi
                </h2>
                <p className="text-xl text-muted-foreground">
                  Những lợi ích nổi bật khi bạn chọn STEP làm đối tác công nghệ
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6 mx-auto">
                    <Zap className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Hiệu Suất Tối Đa</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    SSD NVMe, CPU Intel Xeon và băng thông không giới hạn đảm bảo tốc độ tối ưu
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 mx-auto">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Bảo Mật Tuyệt Đối</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    DDoS protection, firewall tích hợp, SSL miễn phí và monitoring 24/7
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto">
                    <Headphones className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Hỗ Trợ 24/7</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Đội ngũ kỹ thuật chuyên nghiệp hỗ trợ tiếng Việt mọi lúc, mọi nơi
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Khả Năng Mở Rộng</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Nâng cấp tài nguyên linh hoạt trong vài phút, không downtime
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose STEP Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Tại Sao Lại Chọn STEP?
                </h2>
                <p className="text-xl text-muted-foreground">
                  Những lý do khiến hàng nghìn doanh nghiệp tin tựa STEP
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 mx-auto">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">15+ Năm Kinh Nghiệm</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Với hơn 15 năm trong lĩnh vực IT, chúng tôi hiểu rõ nhu cầu và thách thức 
                    của doanh nghiệp Việt Nam.
                  </p>
                </Card>

                <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">5000+ Khách Hàng</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Phục vụ thành công hơn 5000 khách hàng từ doanh nghiệp nhỏ đến 
                    tập đoàn lớn trên toàn quốc.
                  </p>
                </Card>

                <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6 mx-auto">
                    <Star className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">99.9% Uptime</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Cam kết uptime 99.9% với hạ tầng hiện đại, datacenter chuẩn quốc tế 
                    và giải pháp dự phòng toàn diện.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Câu Hỏi Thường Gặp
                </h2>
                <p className="text-xl text-muted-foreground">
                  Những câu hỏi phổ biến về dịch vụ máy chủ của chúng tôi
                </p>
              </div>
              
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                    Máy chủ là gì và tại sao doanh nghiệp cần máy chủ?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Máy chủ là hệ thống máy tính chuyên dụng để lưu trữ, xử lý và cung cấp dữ liệu, ứng dụng 
                    cho nhiều người dùng cùng lúc. Doanh nghiệp cần máy chủ để đảm bảo dữ liệu an toàn, 
                    hiệu suất ổn định và khả năng truy cập 24/7 cho nhân viên và khách hàng.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                    Khi nào nên sử dụng máy chủ vật lý thay vì máy chủ ảo?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Nên chọn máy chủ vật lý khi: doanh nghiệp có ứng dụng đòi hỏi hiệu suất cao, cần 
                    toàn quyền kiểm soát phần cứng, xử lý dữ liệu nhạy cảm hoặc có lưu lượng truy cập 
                    ổn định lớn. Máy chủ ảo phù hợp hơn cho startup và doanh nghiệp vừa nhỏ với nhu cầu linh hoạt.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                    Chi phí dịch vụ máy chủ được tính như thế nào?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Chi phí phụ thuộc vào loại máy chủ, cấu hình (CPU, RAM, ổ cứng), băng thông và các 
                    dịch vụ bổ sung. Máy chủ vật lý tính theo tháng, VPS linh hoạt theo gói, còn máy chủ 
                    đám mây có thể tính theo giờ sử dụng. Chúng tôi có gói ưu đãi cho khách hàng dài hạn.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                    STEP cung cấp những hỗ trợ gì sau khi triển khai máy chủ?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Chúng tôi cung cấp hỗ trợ 24/7 qua hotline, email và chat. Bao gồm: giám sát hệ thống, 
                    sao lưu dữ liệu, bảo trì định kỳ, cập nhật bảo mật, khắc phục sự cố và tư vấn kỹ thuật. 
                    Đội ngũ kỹ thuật sẵn sàng hỗ trợ setup và migration từ hệ thống cũ.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <MessageSquare className="h-16 w-16 mx-auto mb-6 text-primary" />
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Sẵn Sàng Bắt Đầu?
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Để lại thông tin, chúng tôi sẽ tư vấn giải pháp tối ưu nhất cho bạn.
                </p>
              </div>
              
              <Card className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground font-medium">
                        Họ và tên *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Nhập họ và tên của bạn"
                        className="w-full"
                        data-testid="input-name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-foreground font-medium">
                        Tên công ty
                      </Label>
                      <Input
                        id="company"
                        placeholder="Tên công ty/tổ chức"
                        className="w-full"
                        data-testid="input-company"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground font-medium">
                        Số điện thoại *
                      </Label>
                      <Input
                        id="phone"
                        placeholder="0123 456 789"
                        className="w-full"
                        data-testid="input-phone"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground font-medium">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@company.com"
                        className="w-full"
                        data-testid="input-email"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground font-medium">
                      Nhu cầu cụ thể
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Mô tả chi tiết nhu cầu về máy chủ của bạn..."
                      className="w-full min-h-[120px]"
                      data-testid="textarea-message"
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
                      data-testid="button-submit-contact"
                    >
                      <Mail className="mr-2 h-5 w-5" />
                      Gửi Yêu Cầu Tư Vấn
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg"
                      data-testid="button-call-direct"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Gọi Trực Tiếp: 1900 6680
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}