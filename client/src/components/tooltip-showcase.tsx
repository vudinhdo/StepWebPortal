import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import InteractiveTooltip from "@/components/interactive-tooltip";
import { 
  Cloud, 
  Server, 
  Shield, 
  Mail, 
  Globe, 
  Zap,
  HelpCircle,
  Info,
  Star,
  Settings
} from "lucide-react";

export default function TooltipShowcase() {
  const cloudTooltip = {
    title: "Cloud Computing Giải Pháp Toàn Diện",
    description: "Hạ tầng cloud hiệu suất cao với khả năng mở rộng linh hoạt, bảo mật cấp doanh nghiệp và hỗ trợ 24/7.",
    type: 'feature' as const,
    features: [
      "Auto-scaling theo nhu cầu",
      "SSD NVMe tốc độ cao",
      "Backup tự động hàng ngày",
      "CDN toàn cầu",
      "API management"
    ],
    benefits: ["99.9% Uptime", "Tiết kiệm 40% chi phí", "Deploy nhanh"],
    tips: [
      "Sử dụng load balancer để tối ưu hiệu suất",
      "Thiết lập monitoring để theo dõi tài nguyên",
      "Backup định kỳ trước khi update"
    ],
    cta: {
      text: "Khám phá Cloud Services",
      action: () => window.location.href = '/cloud'
    }
  };

  const serverTooltip = {
    title: "Dedicated Server Chuyên Nghiệp",
    description: "Máy chủ vật lý độc quyền với cấu hình mạnh mẽ, phù hợp cho các ứng dụng yêu cầu hiệu suất cao.",
    type: 'info' as const,
    features: [
      "CPU Intel Xeon mới nhất",
      "RAM DDR4 ECC",
      "Storage RAID 10",
      "Kết nối 1Gbps",
      "IPMI remote management"
    ],
    benefits: ["Hiệu suất tối đa", "Bảo mật cao", "Kiểm soát hoàn toàn"],
    cta: {
      text: "Xem cấu hình Server",
      action: () => alert('Liên hệ để tư vấn cấu hình phù hợp')
    }
  };

  const securityTooltip = {
    title: "Giải Pháp Bảo Mật Tích Hợp",
    description: "Hệ thống bảo mật đa lớp với firewall, antivirus, và monitoring real-time bảo vệ toàn diện.",
    type: 'benefit' as const,
    features: [
      "Firewall thế hệ mới",
      "DDoS protection",
      "SSL/TLS encryption",
      "Vulnerability scanning",
      "Security monitoring 24/7"
    ],
    benefits: ["Bảo vệ toàn diện", "Tuân thủ tiêu chuẩn", "An tâm vận hành"],
    tips: [
      "Cập nhật security patches định kỳ",
      "Thiết lập 2FA cho tất cả tài khoản",
      "Thực hiện security audit hàng quý"
    ]
  };

  const emailTooltip = {
    title: "Email Business Professional",
    description: "Giải pháp email doanh nghiệp với Google Workspace và Microsoft 365, tích hợp đầy đủ office suite.",
    type: 'tip' as const,
    features: [
      "Domain email riêng",
      "Office apps online",
      "Calendar và meeting",
      "File sharing bảo mật",
      "Mobile sync"
    ],
    benefits: ["Chuyên nghiệp", "Productivity cao", "Collaboration tốt"],
    tips: [
      "Sử dụng shared calendar cho team",
      "Backup email định kỳ",
      "Thiết lập email forwarding"
    ]
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[hsl(207,100%,40%)] mb-4">
            Tìm hiểu chi tiết về dịch vụ
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hover hoặc click vào các biểu tượng để xem thông tin chi tiết về từng dịch vụ
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Cloud Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <InteractiveTooltip
                  content={cloudTooltip}
                  trigger="hover"
                  position="auto"
                >
                  <div className="relative inline-block">
                    <Cloud className="text-[hsl(207,100%,40%)] mx-auto mb-4 cursor-help" size={48} />
                    <div className="absolute -top-1 -right-1">
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <Info className="text-white" size={10} />
                      </div>
                    </div>
                  </div>
                </InteractiveTooltip>
                <h3 className="font-semibold text-lg mb-2">Cloud Services</h3>
                <p className="text-gray-600 text-sm">
                  Hover để xem chi tiết về dịch vụ cloud
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Dedicated Servers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <InteractiveTooltip
                  content={serverTooltip}
                  trigger="click"
                  position="auto"
                >
                  <div className="relative inline-block">
                    <Server className="text-[hsl(207,100%,40%)] mx-auto mb-4 cursor-pointer" size={48} />
                    <div className="absolute -top-1 -right-1">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <HelpCircle className="text-white" size={10} />
                      </div>
                    </div>
                  </div>
                </InteractiveTooltip>
                <h3 className="font-semibold text-lg mb-2">Dedicated Servers</h3>
                <p className="text-gray-600 text-sm">
                  Click để xem thông tin máy chủ
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <InteractiveTooltip
                  content={securityTooltip}
                  trigger="hover"
                  position="auto"
                >
                  <div className="relative inline-block">
                    <Shield className="text-[hsl(207,100%,40%)] mx-auto mb-4 cursor-help" size={48} />
                    <div className="absolute -top-1 -right-1">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <Shield className="text-white" size={10} />
                      </div>
                    </div>
                  </div>
                </InteractiveTooltip>
                <h3 className="font-semibold text-lg mb-2">Security Solutions</h3>
                <p className="text-gray-600 text-sm">
                  Hover để xem giải pháp bảo mật
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Email Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <InteractiveTooltip
                  content={emailTooltip}
                  trigger="hover"
                  position="auto"
                >
                  <div className="relative inline-block">
                    <Mail className="text-[hsl(207,100%,40%)] mx-auto mb-4 cursor-help" size={48} />
                    <div className="absolute -top-1 -right-1">
                      <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                        <Star className="text-white" size={10} />
                      </div>
                    </div>
                  </div>
                </InteractiveTooltip>
                <h3 className="font-semibold text-lg mb-2">Email Solutions</h3>
                <p className="text-gray-600 text-sm">
                  Hover để xem dịch vụ email
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Interactive Features Demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 border-[hsl(207,100%,40%)]">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-[hsl(207,100%,40%)] mb-4">
                Khám phá tính năng tương tác
              </h3>
              <p className="text-gray-700 mb-6">
                Hệ thống tooltip thông minh giúp bạn hiểu rõ hơn về các dịch vụ và tính năng của STEP
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <InteractiveTooltip
                  content={{
                    title: "Hover Tooltip",
                    description: "Tooltip xuất hiện khi hover chuột, phù hợp cho desktop",
                    type: 'info',
                    tips: ["Hover để xem thông tin", "Tự động ẩn khi rời chuột"]
                  }}
                  trigger="hover"
                >
                  <Badge className="cursor-help bg-blue-100 text-blue-800">
                    Hover me 🖱️
                  </Badge>
                </InteractiveTooltip>

                <InteractiveTooltip
                  content={{
                    title: "Click Tooltip", 
                    description: "Tooltip xuất hiện khi click, phù hợp cho mobile",
                    type: 'feature',
                    tips: ["Click để mở/đóng", "Có nút X để đóng"]
                  }}
                  trigger="click"
                >
                  <Badge className="cursor-pointer bg-green-100 text-green-800">
                    Click me 👆
                  </Badge>
                </InteractiveTooltip>

                <InteractiveTooltip
                  content={{
                    title: "Auto Position",
                    description: "Tooltip tự động điều chỉnh vị trí để luôn hiển thị trong viewport",
                    type: 'tip',
                    benefits: ["Smart positioning", "Responsive", "Always visible"]
                  }}
                  trigger="hover"
                  position="auto"
                >
                  <Badge className="cursor-help bg-purple-100 text-purple-800">
                    Auto position 🎯
                  </Badge>
                </InteractiveTooltip>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}