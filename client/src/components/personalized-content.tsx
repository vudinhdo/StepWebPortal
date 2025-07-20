import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Building2, 
  Star, 
  ArrowRight,
  Lightbulb,
  Zap,
  Shield,
  Award
} from "lucide-react";

interface UserInfo {
  name: string;
  company: string;
  role: string;
  interests: string[];
}

interface PersonalizedContentProps {
  userInfo: UserInfo;
}

const roleRecommendations = {
  "ceo": {
    title: "Giải pháp toàn diện cho CEO",
    description: "Tối ưu hóa chi phí và hiệu quả vận hành",
    services: ["cloud", "consulting", "security"],
    benefits: ["Giảm 30% chi phí IT", "Tăng 50% hiệu suất", "Bảo mật cấp doanh nghiệp"]
  },
  "cto": {
    title: "Hạ tầng kỹ thuật cho CTO",
    description: "Công nghệ tiên tiến và khả năng mở rộng",
    services: ["cloud", "servers", "software"],
    benefits: ["Scalability cao", "Performance tối ưu", "Integration dễ dàng"]
  },
  "it-manager": {
    title: "Quản lý IT hiệu quả",
    description: "Tools và dịch vụ quản lý IT chuyên nghiệp",
    services: ["hosting", "email", "consulting"],
    benefits: ["Quản lý tập trung", "Monitoring 24/7", "Support chuyên nghiệp"]
  },
  "developer": {
    title: "Môi trường phát triển tối ưu",
    description: "Platform và tools cho developers",
    services: ["cloud", "hosting", "domain"],
    benefits: ["Deploy nhanh chóng", "DevOps tools", "API integration"]
  },
  "sysadmin": {
    title: "Quản trị hệ thống chuyên nghiệp",
    description: "Tools quản trị và monitoring hệ thống",
    services: ["servers", "security", "email"],
    benefits: ["Monitoring real-time", "Security automation", "Backup reliable"]
  },
  "business-owner": {
    title: "Giải pháp kinh doanh toàn diện",
    description: "IT solutions để phát triển kinh doanh",
    services: ["hosting", "email", "domain"],
    benefits: ["Setup nhanh chóng", "Chi phí tối ưu", "Support tận tình"]
  },
  "other": {
    title: "Giải pháp IT đa dạng",
    description: "Tư vấn và hỗ trợ theo nhu cầu riêng",
    services: ["consulting", "hosting", "cloud"],
    benefits: ["Tư vấn miễn phí", "Giải pháp tùy chỉnh", "Hỗ trợ 24/7"]
  }
};

const serviceDetails = {
  "cloud": {
    name: "Cloud Services",
    icon: "☁️",
    description: "GPU, Server, Odoo, AMD, N8N",
    price: "Từ 500k/tháng"
  },
  "hosting": {
    name: "Web Hosting",
    icon: "🌐",
    description: "WordPress, Laravel, NVME, Reseller",
    price: "Từ 50k/tháng"
  },
  "servers": {
    name: "Dedicated Servers",
    icon: "🖥️",
    description: "Máy chủ vật lý, thiết bị mạng, colocation",
    price: "Từ 2M/tháng"
  },
  "email": {
    name: "Email Solutions",
    icon: "📧",
    description: "Google Workspace, Microsoft 365, Email server",
    price: "Từ 100k/user/tháng"
  },
  "software": {
    name: "Software Licensing",
    icon: "💾",
    description: "Microsoft, Google, VMware, Sangfor",
    price: "Liên hệ báo giá"
  },
  "domain": {
    name: "Domain Management",
    icon: "🌍",
    description: "Đăng ký, chuyển đổi, DNS, bảo vệ",
    price: "Từ 200k/năm"
  },
  "consulting": {
    name: "IT Consulting",
    icon: "💡",
    description: "Tư vấn, thiết kế, triển khai hạ tầng",
    price: "Tư vấn miễn phí"
  },
  "security": {
    name: "Security Solutions",
    icon: "🔒",
    description: "Firewall, Antivirus, Backup, Monitoring",
    price: "Từ 500k/tháng"
  }
};

export default function PersonalizedContent({ userInfo }: PersonalizedContentProps) {
  const recommendation = roleRecommendations[userInfo.role as keyof typeof roleRecommendations] || roleRecommendations.other;
  const interestedServices = userInfo.interests.map(id => serviceDetails[id as keyof typeof serviceDetails]).filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Personal Greeting */}
      <Card className="border-[hsl(207,100%,40%)] bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[hsl(207,100%,40%)] mb-2">
                Xin chào {userInfo.name}! 👋
              </h2>
              <p className="text-gray-600">
                {userInfo.company ? `${userInfo.company} - ` : ""}
                {recommendation.description}
              </p>
            </div>
            <div className="text-right">
              <Badge className="bg-[hsl(207,100%,40%)] text-white">
                {roleRecommendations[userInfo.role as keyof typeof roleRecommendations]?.title || "Khách hàng đặc biệt"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Services */}
      <div>
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-semibold text-[hsl(207,100%,40%)] mb-4 flex items-center"
        >
          <Lightbulb className="mr-2" size={20} />
          Dịch vụ đề xuất cho bạn
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendation.services.map((serviceId, index) => {
            const service = serviceDetails[serviceId as keyof typeof serviceDetails];
            if (!service) return null;
            
            return (
              <motion.div
                key={serviceId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[hsl(207,100%,40%)]">
                  <CardContent className="p-4">
                    <div className="text-3xl mb-2">{service.icon}</div>
                    <h4 className="font-semibold text-[hsl(207,100%,40%)] mb-2">{service.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-xs">{service.price}</Badge>
                      <ArrowRight size={16} className="text-[hsl(207,100%,40%)]" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Your Selected Interests */}
      {interestedServices.length > 0 && (
        <div>
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl font-semibold text-[hsl(207,100%,40%)] mb-4 flex items-center"
          >
            <Star className="mr-2" size={20} />
            Dịch vụ bạn quan tâm
          </motion.h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {interestedServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:border-[hsl(207,100%,40%)] transition-colors"
              >
                <div className="text-2xl mb-1">{service.icon}</div>
                <div className="text-sm font-medium">{service.name}</div>
                <div className="text-xs text-gray-500">{service.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-xl font-semibold text-[hsl(207,100%,40%)] mb-4 flex items-center">
          <Award className="mr-2" size={20} />
          Lợi ích dành riêng cho bạn
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendation.benefits.map((benefit, index) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center space-x-3 bg-green-50 border border-green-200 rounded-lg p-4"
            >
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Zap className="text-green-600" size={16} />
              </div>
              <span className="font-medium text-green-800">{benefit}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center bg-[hsl(207,100%,40%)] text-white rounded-xl p-6"
      >
        <h3 className="text-xl font-bold mb-2">Sẵn sàng bắt đầu?</h3>
        <p className="mb-4 opacity-90">
          Hãy để chuyên gia STEP tư vấn giải pháp phù hợp với {userInfo.company || "doanh nghiệp của bạn"}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            className="bg-white text-[hsl(207,100%,40%)] hover:bg-gray-100"
            onClick={() => {
              const contactButton = document.querySelector('[data-contact-trigger]') as HTMLButtonElement;
              if (contactButton) contactButton.click();
            }}
          >
            Nhận tư vấn miễn phí
          </Button>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-[hsl(207,100%,40%)]"
            onClick={() => window.location.href = '/cloud'}
          >
            Xem dịch vụ Cloud
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}