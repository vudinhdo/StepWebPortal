import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Cloud, 
  Globe, 
  Server, 
  ShieldCheck, 
  Mail,
  ArrowRight,
  Zap,
  Lock,
  Database,
  Wifi
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CloudServicesBlock() {
  const cloudServices = [
    {
      id: "cloud-server",
      title: "Cloud Server",
      description: "Máy chủ đám mây linh hoạt với khả năng mở rộng tự động, tối ưu cho AI/ML và ứng dụng hiện đại",
      icon: Cloud,
      href: "/cloud",
      color: "hsl(207, 100%, 40%)", // STEP Blue
      bgColor: "hsl(207, 100%, 96%)",
      borderColor: "hsl(207, 100%, 80%)",
      textColor: "hsl(207, 100%, 30%)",
      features: ["Auto-scaling", "GPU Support", "K8s Ready", "99.9% Uptime"],
      popular: true
    },
    {
      id: "web-hosting", 
      title: "Web Hosting",
      description: "Hosting tối ưu cho WordPress, Laravel với SSD NVMe và tốc độ vượt trội, SSL miễn phí",
      icon: Globe,
      href: "/hosting", 
      color: "hsl(142, 76%, 36%)", // STEP Green
      bgColor: "hsl(142, 76%, 96%)",
      borderColor: "hsl(142, 76%, 70%)",
      textColor: "hsl(142, 76%, 25%)",
      features: ["NVMe SSD", "Free SSL", "1-Click Install", "CDN Tích hợp"],
      popular: false
    },
    {
      id: "dedicated-server",
      title: "Dedicated Server", 
      description: "Máy chủ vật lý cao cấp với hiệu suất tối đa, bảo mật tuyệt đối và dịch vụ colocation",
      icon: Server,
      href: "/colocation",
      color: "hsl(271, 91%, 65%)", // STEP Purple
      bgColor: "hsl(271, 91%, 96%)",
      borderColor: "hsl(271, 91%, 75%)",
      textColor: "hsl(271, 91%, 35%)",
      features: ["Intel Xeon", "Root Access", "DDoS Protection", "24/7 Support"],
      popular: false
    },
    {
      id: "dlp",
      title: "DLP - Data Loss Prevention",
      description: "Giải pháp bảo vệ dữ liệu tiên tiến với AI monitoring, mã hóa end-to-end và tuân thủ GDPR",
      icon: ShieldCheck,
      href: "/dlp",
      color: "hsl(339, 82%, 52%)", // STEP Pink
      bgColor: "hsl(339, 82%, 96%)",
      borderColor: "hsl(339, 82%, 75%)",
      textColor: "hsl(339, 82%, 35%)",
      features: ["AI Detection", "Real-time Monitor", "GDPR Comply", "Auto Encrypt"],
      popular: false
    },
    {
      id: "email-hybrid",
      title: "Email Hybrid",
      description: "Giải pháp email lai kết hợp tính linh hoạt cloud và kiểm soát on-premise, Office 365 tích hợp",
      icon: Mail,
      href: "/hybrid-email",
      color: "hsl(263, 70%, 50%)", // STEP Indigo
      bgColor: "hsl(263, 70%, 96%)",
      borderColor: "hsl(263, 70%, 75%)",
      textColor: "hsl(263, 70%, 35%)",
      features: ["Office 365", "Hybrid Deploy", "Migration Support", "Security Plus"],
      popular: false
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mb-6 mx-auto shadow-lg"
          >
            <Cloud className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Cloud Services
            </span>
            <br />
            <span className="text-gray-700 dark:text-gray-300 text-2xl md:text-3xl lg:text-4xl">
              Dịch vụ điện toán đám mây
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Giải pháp cloud computing toàn diện từ STEP - Nâng tầm doanh nghiệp với công nghệ tiên tiến, 
            bảo mật tuyệt đối và hiệu suất vượt trội
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {cloudServices.map((service, index) => (
            <motion.div
              key={service.id}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1 }
              }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                delay: index * 0.1
              }}
              whileHover={{ 
                y: -8, 
                transition: { duration: 0.3 } 
              }}
              className="relative group"
              data-testid={`card-${service.id}`}
            >
              {service.popular && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="absolute -top-3 -right-3 z-10"
                >
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 shadow-lg">
                    Phổ Biến
                  </Badge>
                </motion.div>
              )}
              
              <Link href={service.href} data-testid={`link-${service.id}`}>
                <Card 
                  className="h-full transition-all duration-300 cursor-pointer group-hover:shadow-2xl border-2 overflow-hidden relative backdrop-blur-sm"
                  style={{
                    backgroundColor: service.bgColor,
                    borderColor: service.borderColor
                  }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <CardContent className="p-6 sm:p-8 h-full flex flex-col relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.4 }
                      }}
                      className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br from-white to-gray-50 shadow-lg border-2 group-hover:shadow-xl transition-shadow duration-300"
                      style={{ borderColor: service.borderColor }}
                    >
                      <service.icon className="w-7 h-7" style={{ color: service.textColor }} />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-opacity-90 transition-colors" style={{ color: service.textColor }}>
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 + idx * 0.1 }}
                            className="flex items-center text-xs text-gray-500 dark:text-gray-400"
                          >
                            <div 
                              className="w-1.5 h-1.5 rounded-full mr-2" 
                              style={{ backgroundColor: service.color }}
                            />
                            {feature}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <motion.div 
                      className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700 font-semibold text-sm group-hover:text-opacity-80 transition-colors"
                      style={{ color: service.textColor }}
                      whileHover={{ x: 3 }}
                    >
                      <span>Tìm hiểu thêm</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-8 sm:p-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Cần tư vấn giải pháp phù hợp?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Đội ngũ chuyên gia STEP sẵn sàng hỗ trợ bạn lựa chọn và triển khai giải pháp cloud tối ưu nhất
            </p>
            <Link href="/contact">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
                data-testid="button-contact-consultant"
              >
                Tư vấn miễn phí
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}