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
    description: "Giải pháp email hybrid tối ưu, kết hợp ưu điểm của cloud và on-premise",
    features: [
      "Email hosting tại Việt Nam",
      "Tích hợp Microsoft Exchange",
      "Backup tự động hàng ngày",
      "Anti-spam & Anti-virus",
      "Mobile sync (iOS/Android)",
      "Webmail responsive",
      "IMAP/POP3/SMTP",
      "Hỗ trợ tiếng Việt"
    ],
    storage: "50GB/user",
    users: "Không giới hạn",
    support: "24/7 tại Việt Nam",
    security: ["SSL/TLS", "Two-factor authentication", "Advanced threat protection"],
    advantages: [
      "Chi phí thấp nhất",
      "Hỗ trợ tiếng Việt",
      "Server tại Việt Nam (tốc độ cao)",
      "Backup tự động",
      "Không phụ thuộc nhà cung cấp nước ngoài"
    ],
    disadvantages: [
      "Ít tính năng collaboration",
      "Giao diện đơn giản hơn",
      "Không có Office online"
    ],
    recommended: true
  },
  {
    name: "Microsoft 365",
    icon: Globe,
    price: "550.000 VNĐ/tháng",
    description: "Bộ công cụ văn phòng toàn diện với email, Office apps và collaboration",
    features: [
      "Outlook email",
      "Word, Excel, PowerPoint online",
      "Microsoft Teams",
      "OneDrive cloud storage",
      "SharePoint",
      "Advanced security",
      "AI-powered features",
      "Multi-platform support"
    ],
    storage: "1TB/user",
    users: "1-300 users",
    support: "24/7 global",
    security: ["Advanced Threat Protection", "DLP", "Compliance center"],
    advantages: [
      "Bộ Office đầy đủ",
      "Tích hợp Teams",
      "AI features mạnh mẽ",
      "Bảo mật enterprise",
      "Cập nhật thường xuyên"
    ],
    disadvantages: [
      "Chi phí cao",
      "Phức tạp cho SME",
      "Phụ thuộc internet",
      "Hỗ trợ tiếng Việt hạn chế"
    ],
    recommended: false
  },
  {
    name: "Google Workspace",
    icon: Cloud,
    price: "450.000 VNĐ/tháng",
    description: "Giải pháp cloud-first với Gmail, Google Drive và G Suite applications",
    features: [
      "Gmail business",
      "Google Drive",
      "Google Docs, Sheets, Slides",
      "Google Meet",
      "Calendar & Contacts",
      "Admin console",
      "Mobile device management",
      "Third-party integrations"
    ],
    storage: "30GB/user",
    users: "Không giới hạn",
    support: "24/7 global",
    security: ["2-step verification", "Single sign-on", "Endpoint management"],
    advantages: [
      "Giao diện thân thiện",
      "Collaboration tốt",
      "Tích hợp Google services",
      "Reliable uptime",
      "Mobile-friendly"
    ],
    disadvantages: [
      "Chi phí trung bình",
      "Hạn chế offline",
      "Privacy concerns",
      "Ít tính năng enterprise"
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
                          <p className="text-3xl font-bold text-[hsl(207,100%,40%)] mb-2">
                            {service.price}
                          </p>
                          <p className="text-gray-600">
                            {service.description}
                          </p>
                        </div>

                        <div className="space-y-4 mb-8">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Dung lượng:</span>
                            <span className="font-semibold">{service.storage}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Số users:</span>
                            <span className="font-semibold">{service.users}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Hỗ trợ:</span>
                            <span className="font-semibold">{service.support}</span>
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
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-4 px-4">Tiêu chí</th>
                            {emailServices.map((service) => (
                              <th key={service.name} className="text-center py-4 px-4 min-w-[200px]">
                                {service.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-4 px-4 font-semibold">Giá cả</td>
                            {emailServices.map((service) => (
                              <td key={service.name} className="py-4 px-4 text-center">
                                <span className={`font-bold ${
                                  service.recommended ? 'text-[hsl(207,100%,40%)]' : ''
                                }`}>
                                  {service.price}
                                </span>
                              </td>
                            ))}
                          </tr>
                          
                          <tr className="border-b">
                            <td className="py-4 px-4 font-semibold">Ưu điểm</td>
                            {emailServices.map((service) => (
                              <td key={service.name} className="py-4 px-4">
                                <ul className="text-sm space-y-1">
                                  {service.advantages.map((advantage, idx) => (
                                    <li key={idx} className="flex items-start">
                                      <CheckCircle className="text-green-500 mr-1 mt-0.5 flex-shrink-0" size={12} />
                                      {advantage}
                                    </li>
                                  ))}
                                </ul>
                              </td>
                            ))}
                          </tr>
                          
                          <tr className="border-b">
                            <td className="py-4 px-4 font-semibold">Nhược điểm</td>
                            {emailServices.map((service) => (
                              <td key={service.name} className="py-4 px-4">
                                <ul className="text-sm space-y-1">
                                  {service.disadvantages.map((disadvantage, idx) => (
                                    <li key={idx} className="flex items-start">
                                      <XCircle className="text-red-500 mr-1 mt-0.5 flex-shrink-0" size={12} />
                                      {disadvantage}
                                    </li>
                                  ))}
                                </ul>
                              </td>
                            ))}
                          </tr>
                          
                          <tr>
                            <td className="py-4 px-4 font-semibold">Bảo mật</td>
                            {emailServices.map((service) => (
                              <td key={service.name} className="py-4 px-4">
                                <ul className="text-sm space-y-1">
                                  {service.security.map((security, idx) => (
                                    <li key={idx} className="flex items-center">
                                      <Shield className="text-blue-500 mr-1" size={12} />
                                      {security}
                                    </li>
                                  ))}
                                </ul>
                              </td>
                            ))}
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