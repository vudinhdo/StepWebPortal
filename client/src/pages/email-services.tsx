import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Shield, 
  Cloud, 
  Users, 
  CheckCircle, 
  XCircle, 
  Star,
  Zap,
  Globe,
  Lock,
  Smartphone,
  HardDrive,
  Phone
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";

interface EmailService {
  name: string;
  icon: any;
  price: string;
  description: string;
  features: string[];
  storage: string;
  users: string;
  support: string;
  security: string[];
  advantages: string[];
  disadvantages: string[];
  recommended: boolean;
}

const emailServices: EmailService[] = [
  {
    name: "Mail Hybrid STEP",
    icon: Mail,
    price: "150.000 VNĐ/tháng",
    description: "Giải pháp Email Server Lai kết hợp giữa Google Mail và hệ thống Mail server của STEP",
    features: [
      "Tối ưu chi phí tốt nhất cho các doanh nghiệp nhỏ",
      "Các Email quan trọng từ Leader",
      "Email Google còn các phần sự còn lại",
      "Dùng Mail hybrid của step để tối ưu chi phí",
      "30GB dung lượng email",
      "15GB GDrive free login bằng Mail cộng ty",
      "Outlook (Desktop + Mobile)",
      "Webmail/Outlook"
    ],
    storage: "30GB email + 15GB Drive",
    users: "Trên 1000 Mailbox",
    support: "Outlook (Desktop + Mobile)",
    security: ["Giao diện web mail khá sử dụng", "Giao diện outlook quen thuộc"],
    advantages: [
      "Chi phí tối ưu nhất (150k/tháng)",
      "Kết hợp ưu điểm Google Mail và Mail server riêng",
      "15GB GDrive miễn phí với login công ty",
      "Giao diện Outlook quen thuộc",
      "Phù hợp doanh nghiệp nhỏ"
    ],
    disadvantages: [
      "Không hỗ trợ Google Meet miễn phí",
      "Không hỗ trợ Teams",
      "Không hỗ trợ chat tích hợp"
    ],
    recommended: true
  },
  {
    name: "Microsoft 365 Basic",
    icon: Globe,
    price: "3$ (~75.000 VNĐ/tháng)",
    description: "Microsoft 365 (Office 365 cũ) là bộ công cụ đồng bộ đến từ máy do Microsoft phát triển và cung cấp",
    features: [
      "Outlook email chuyên nghiệp",
      "50GB dung lượng email",
      "1TB OneDrive cloud storage",
      "Microsoft Teams",
      "Webmail/Outlook",
      "Tích hợp đầy đủ Office suite",
      "Lịch và liên hệ đồng bộ",
      "Bảo mật doanh nghiệp"
    ],
    storage: "50GB email + 1TB OneDrive", 
    users: "1TB",
    support: "Teams",
    security: ["Microsoft 365 được xây dựng dựa trên phần mềm mà nhiều người dùng đã biết trong nhiều năm với Windows, bộ Office và cả Outlook"],
    advantages: [
      "Bộ Office đầy đủ tích hợp",
      "1TB OneDrive storage lớn",
      "Microsoft Teams cho collaboration",
      "Tích hợp sâu với Windows",
      "Bảo mật doanh nghiệp cao cấp"
    ],
    disadvantages: [
      "Chi phí cao hơn (3$/tháng)",
      "Phụ thuộc vào hệ sinh thái Microsoft",
      "Cần internet ổn định",
      "Phức tạp với doanh nghiệp nhỏ"
    ],
    recommended: false
  },
  {
    name: "Google Workspace Starter",
    icon: Cloud,
    price: "4-6$ (~100-150.000 VNĐ/tháng)",
    description: "Google Workspace (G Suite cũ) là bộ dịch vụ điện toán đám mây do Google phát triển và cung cấp",
    features: [
      "Gmail business chuyên nghiệp",
      "30GB dung lượng email",
      "30GB Google Drive",
      "Google Meet video conference",
      "Google Chat messaging",
      "Google Docs, Sheets, Slides",
      "Calendar và Contacts",
      "Admin console quản lý"
    ],
    storage: "30GB email + 30GB Drive",
    users: "30GB (chung với Hộp thư)",
    support: "Google Meet (policy nhà trẻ free google)",
    security: ["Google Workspace có giao diện thường thuộc của Gmail", "Giao diện outlook quen thuộc"],
    advantages: [
      "Giao diện Gmail quen thuộc",
      "Tích hợp Google services mạnh mẽ",
      "Google Meet miễn phí chất lượng cao",
      "Collaboration tools tuyệt vời",
      "Reliable uptime cao"
    ],
    disadvantages: [
      "Chi phí trung bình cao (4-6$/tháng)",
      "Dung lượng giới hạn (30GB)",
      "Privacy concerns với Google",
      "Phụ thuộc internet hoàn toàn"
    ],
    recommended: false
  }
];

export default function EmailServices() {
  const [selectedService, setSelectedService] = useState<string>("Mail Hybrid STEP");
  const [showComparison, setShowComparison] = useState(false);

  const handleContactClick = (serviceName: string) => {
    // Handle contact form with pre-filled service
    console.log(`Contact for ${serviceName}`);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-6">
                  <Mail className="text-[hsl(207,100%,40%)] mr-4" size={48} />
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                    Dịch Vụ Email Doanh Nghiệp
                  </h1>
                </div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  So sánh và lựa chọn giải pháp email phù hợp nhất cho doanh nghiệp của bạn
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Badge className="bg-green-100 text-green-800 px-4 py-2">
                    <CheckCircle className="mr-2" size={16} />
                    Bảo mật cao
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                    <Zap className="mr-2" size={16} />
                    Hiệu suất tối ưu
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 px-4 py-2">
                    <Phone className="mr-2" size={16} />
                    Hỗ trợ 24/7
                  </Badge>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Service Comparison */}
          <section className="py-20">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  So Sánh Các Dịch Vụ Email
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Phân tích chi tiết các giải pháp email hàng đầu để đưa ra lựa chọn tốt nhất
                </p>
              </motion.div>

              {/* Service Cards */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {emailServices.map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Card className={`relative h-full transition-all hover:shadow-lg ${
                      service.recommended ? 'ring-2 ring-[hsl(207,100%,40%)]' : ''
                    }`}>
                      {service.recommended && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-[hsl(207,100%,40%)] text-white px-4 py-1">
                            <Star className="mr-1" size={14} />
                            Khuyến nghị
                          </Badge>
                        </div>
                      )}
                      
                      <CardContent className="p-8">
                        <div className="text-center mb-6">
                          <service.icon className="mx-auto text-[hsl(207,100%,40%)] mb-4" size={48} />
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            {service.name}
                          </h3>
                          <div className="text-center mb-2">
                            <p className="text-3xl font-bold text-[hsl(207,100%,40%)]">
                              {service.name === 'Mail Hybrid STEP' ? '1$' : 
                               service.name === 'Microsoft 365 Basic' ? '3$' : '4-6$'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {service.name === 'Mail Hybrid STEP' ? '(cho 1000+ Mailbox)' : 
                               service.name === 'Microsoft 365 Basic' ? '(~75.000 VNĐ/tháng)' : '(~100-150.000 VNĐ/tháng)'}
                            </p>
                          </div>
                          <p className="text-gray-600">
                            {service.description}
                          </p>
                        </div>

                        <div className="space-y-4 mb-8">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Dung lượng:</span>
                            <span className="font-semibold text-sm">{service.storage}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Phạm vi:</span>
                            <span className="font-semibold text-sm">{service.users}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Họp video:</span>
                            <span className="font-semibold text-sm">{service.support}</span>
                          </div>
                        </div>

                        <div className="space-y-3 mb-8">
                          {service.features.slice(0, 4).map((feature, idx) => (
                            <div key={idx} className="flex items-center">
                              <CheckCircle className="text-green-500 mr-2" size={16} />
                              <span className="text-sm text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <Button
                          onClick={() => handleContactClick(service.name)}
                          className={`w-full ${
                            service.recommended 
                              ? 'step-gradient text-white' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          Liên hệ tư vấn
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Detailed Comparison Table */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                      Bảng So Sánh Chi Tiết
                    </h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="text-left py-3 px-4 font-semibold border">TT</th>
                            <th className="text-left py-3 px-4 font-semibold border">THÔNG SỐ KỸ THUẬT DỊCH VỤ</th>
                            <th className="text-center py-3 px-4 font-semibold border bg-blue-50">MICROSOFT/OFFICE<br/>365 - BASIC</th>
                            <th className="text-center py-3 px-4 font-semibold border bg-yellow-50">GOOGLE MAIL/Google<br/>Workspace Starter</th>
                            <th className="text-center py-3 px-4 font-semibold border bg-green-50">MAIL HYBRID</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-3 px-4 text-center border">1</td>
                            <td className="py-3 px-4 font-medium border">Giới thiệu</td>
                            <td className="py-3 px-4 text-sm border bg-blue-50">Microsoft 365 (Office 365 cũ) là bộ công cụ đồng bộ đến từ máy do Microsoft phát triển và cung cấp</td>
                            <td className="py-3 px-4 text-sm border bg-yellow-50">Google Workspace (G Suite cũ) là bộ dịch vụ điện toán đám mây do Google phát triển và cung cấp</td>
                            <td className="py-3 px-4 text-sm border bg-green-50">Smail là dịch vụ Email Server Lai kết hợp giữa Google Mail và hệ thống Mail server Của Step<br/>- Là giải pháp Tối ưu chi phí tốt nhất cho các doanh nghiệp nhỏ từ Mailbox lon và chi phí sử dụng Email cao<br/>- Các Email quan trọng từ Leader trở lên vẫn gửi nguyên dụng Email Google còn các phần sự còn lại Dùng Mail hybrid của step để tối ưu chi phí</td>
                          </tr>
                          
                          <tr className="border-b">
                            <td className="py-3 px-4 text-center border">2</td>
                            <td className="py-3 px-4 font-medium border">Chi phí</td>
                            <td className="py-3 px-4 text-center border bg-blue-50"><strong>3$</strong></td>
                            <td className="py-3 px-4 text-center border bg-yellow-50"><strong>4 - 6$ (6-8$)</strong></td>
                            <td className="py-3 px-4 text-center border bg-green-50"><strong>1$ (cho số lượng trên 1000 Mailbox)</strong></td>
                          </tr>

                          <tr className="border-b">
                            <td className="py-3 px-4 text-center border">3</td>
                            <td className="py-3 px-4 font-medium border">Bộ nhớ email</td>
                            <td className="py-3 px-4 text-center border bg-blue-50">50Gb</td>
                            <td className="py-3 px-4 text-center border bg-yellow-50">30Gb</td>
                            <td className="py-3 px-4 text-center border bg-green-50">30Gb</td>
                          </tr>

                          <tr className="border-b">
                            <td className="py-3 px-4 text-center border">4</td>
                            <td className="py-3 px-4 font-medium border">Lưu trữ đám mây<br/>(Gdrive - OneDrive)</td>
                            <td className="py-3 px-4 text-center border bg-blue-50">1T</td>
                            <td className="py-3 px-4 text-center border bg-yellow-50">30Gb (chung với Hộp thư)</td>
                            <td className="py-3 px-4 text-center border bg-green-50">15Gb (dùng Gdrive free login bằng Mail cộng ty) (policy nhà free google)</td>
                          </tr>

                          <tr className="border-b">
                            <td className="py-3 px-4 text-center border">5</td>
                            <td className="py-3 px-4 font-medium border">Lịch</td>
                            <td className="py-3 px-4 text-center border bg-blue-50"><a href="https://outlook.office.com/calendar" className="text-blue-600 hover:underline">outlook.office.com/calendar</a></td>
                            <td className="py-3 px-4 text-center border bg-yellow-50"><a href="https://calendar.google.com/calendar" className="text-blue-600 hover:underline">https://calendar.google.com/calendar</a></td>
                            <td className="py-3 px-4 text-center border bg-green-50">Outlook (Desktop + Mobile)</td>
                          </tr>

                          <tr className="border-b">
                            <td className="py-3 px-4 text-center border">6</td>
                            <td className="py-3 px-4 font-medium border">Mail client</td>
                            <td className="py-3 px-4 text-center border bg-blue-50">Webmail/Outlook</td>
                            <td className="py-3 px-4 text-center border bg-yellow-50">Webmail/Outlook</td>
                            <td className="py-3 px-4 text-center border bg-green-50">Webmail/Outlook</td>
                          </tr>

                          <tr className="border-b">
                            <td className="py-3 px-4 text-center border">7</td>
                            <td className="py-3 px-4 font-medium border">Họp video</td>
                            <td className="py-3 px-4 text-center border bg-blue-50">Teams</td>
                            <td className="py-3 px-4 text-center border bg-yellow-50">Google meet</td>
                            <td className="py-3 px-4 text-center border bg-green-50">Google Meet (policy nhà trẻ free google)</td>
                          </tr>

                          <tr className="border-b">
                            <td className="py-3 px-4 text-center border">8</td>
                            <td className="py-3 px-4 font-medium border">Chat</td>
                            <td className="py-3 px-4 text-center border bg-blue-50">Teams</td>
                            <td className="py-3 px-4 text-center border bg-yellow-50">Google chat</td>
                            <td className="py-3 px-4 text-center border bg-green-50">Telegram/slack/discord...</td>
                          </tr>

                          <tr className="border-b">
                            <td className="py-3 px-4 text-center border">9</td>
                            <td className="py-3 px-4 font-medium border">Thân thiện người dùng</td>
                            <td className="py-3 px-4 text-sm border bg-blue-50">Microsoft 365 được xây dựng dựa trên phần mềm mà nhiều người dùng đã biết trong nhiều năm với Windows, bộ Office và cả Outlook.</td>
                            <td className="py-3 px-4 text-sm border bg-yellow-50">Google Workspace có giao diện thương thuộc của Gmail</td>
                            <td className="py-3 px-4 text-sm border bg-green-50">Giao diện web mail khá sử dụng<br/>Giao diện outlook quen thuộc</td>
                          </tr>

                          <tr className="border-b">
                            <td className="py-3 px-4 text-center border">10</td>
                            <td className="py-3 px-4 font-medium border">Tỷ lệ gửi mail vào inbox</td>
                            <td className="py-3 px-4 text-center border bg-blue-50">Rất cao 9 điểm</td>
                            <td className="py-3 px-4 text-center border bg-yellow-50">Rất cao 8.5 điểm</td>
                            <td className="py-3 px-4 text-center border bg-green-50">Rất cao 8 điểm</td>
                          </tr>

                          <tr className="border-b">
                            <td className="py-3 px-4 text-center border">11</td>
                            <td className="py-3 px-4 font-medium border">Hỗ trợ kỹ thuật</td>
                            <td className="py-3 px-4 text-center border bg-blue-50">Microsoft 365: 8/10</td>
                            <td className="py-3 px-4 text-center border bg-yellow-50">Workspace 7/10</td>
                            <td className="py-3 px-4 text-center border bg-green-50">7/10</td>
                          </tr>

                          <tr className="border-b">
                            <td className="py-3 px-4 text-center border">12</td>
                            <td className="py-3 px-4 font-medium border">Sở định</td>
                            <td className="py-3 px-4 text-center border bg-blue-50">10/10</td>
                            <td className="py-3 px-4 text-center border bg-yellow-50">10/10</td>
                            <td className="py-3 px-4 text-center border bg-green-50">8/10</td>
                          </tr>

                          <tr className="border-b">
                            <td className="py-3 px-4 text-center border">13</td>
                            <td className="py-3 px-4 font-medium border">Lọc thư tiện</td>
                            <td className="py-3 px-4 text-center border bg-blue-50">10/10</td>
                            <td className="py-3 px-4 text-center border bg-yellow-50">9/10</td>
                            <td className="py-3 px-4 text-center border bg-green-50">6/10</td>
                          </tr>

                          <tr className="border-b">
                            <td className="py-3 px-4 text-center border">14</td>
                            <td className="py-3 px-4 font-medium border">Duyệt email đa thiết bị</td>
                            <td className="py-3 px-4 text-center border bg-blue-50">10/10</td>
                            <td className="py-3 px-4 text-center border bg-yellow-50">10/10</td>
                            <td className="py-3 px-4 text-center border bg-green-50">8/10</td>
                          </tr>

                          <tr className="border-b">
                            <td className="py-3 px-4 text-center border">15</td>
                            <td className="py-3 px-4 font-medium border">Tương thích với Microsoft Outlook</td>
                            <td className="py-3 px-4 text-center border bg-blue-50">10/10</td>
                            <td className="py-3 px-4 text-center border bg-yellow-50">8/10</td>
                            <td className="py-3 px-4 text-center border bg-green-50">8/10</td>
                          </tr>

                          <tr className="border-b">
                            <td className="py-3 px-4 text-center border">16</td>
                            <td className="py-3 px-4 font-medium border">Khả năng phân loại email và làm sạch hộp thư đến</td>
                            <td className="py-3 px-4 text-center border bg-blue-50">9/10</td>
                            <td className="py-3 px-4 text-center border bg-yellow-50">9/10</td>
                            <td className="py-3 px-4 text-center border bg-green-50">7/10</td>
                          </tr>

                          <tr>
                            <td className="py-3 px-4 text-center border">17</td>
                            <td className="py-3 px-4 font-medium border">Quản lý và bảo mật</td>
                            <td className="py-3 px-4 text-sm border bg-blue-50">Các công cụ có sẵn bao gồm quản lý thiết bị di động, quản lý mối đe dọa, lưu trữ và kiểm tra</td>
                            <td className="py-3 px-4 text-sm border bg-yellow-50">Các công cụ có sẵn bao gồm quản lý thiết bị di động, SSO và cảnh báo bảo mật</td>
                            <td className="py-3 px-4 text-sm border bg-green-50">dịch vụ Drive tương tự google</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>

          {/* Why Choose STEP */}
          <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Tại Sao Chọn Mail Hybrid STEP?
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Giải pháp email tối ưu cho doanh nghiệp Việt Nam
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: Globe,
                    title: "Server tại Việt Nam",
                    description: "Tốc độ truy cập nhanh nhất cho người dùng Việt Nam"
                  },
                  {
                    icon: Phone,
                    title: "Hỗ trợ 24/7",
                    description: "Đội ngũ kỹ thuật Việt Nam hỗ trợ round-the-clock"
                  },
                  {
                    icon: Shield,
                    title: "Bảo mật cao",
                    description: "Tuân thủ các tiêu chuẩn bảo mật quốc tế"
                  },
                  {
                    icon: HardDrive,
                    title: "Backup tự động",
                    description: "Dữ liệu được sao lưu tự động hàng ngày"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Card className="text-center h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <item.icon className="mx-auto text-[hsl(207,100%,40%)] mb-4" size={48} />
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Sẵn sàng nâng cấp email doanh nghiệp?
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                  Liên hệ với chúng tôi để được tư vấn miễn phí và thiết kế giải pháp email phù hợp nhất
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="step-gradient text-white px-8"
                    onClick={() => handleContactClick("Mail Hybrid STEP")}
                  >
                    Tư vấn miễn phí
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="px-8"
                  >
                    Xem demo
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}