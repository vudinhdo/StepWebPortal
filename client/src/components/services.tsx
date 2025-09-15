import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Settings, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import InteractiveTooltip from "@/components/interactive-tooltip";
import { 
  DomainIcon, 
  CloudIcon, 
  HostingIcon, 
  ServerIcon, 
  EmailIcon, 
  SoftwareIcon,
  ConsultingIcon,
  DeploymentIcon,
  SupportIcon
} from "./icons/custom-icons";

export default function Services() {
  // Enhanced tooltip content for services
  const serviceTooltips = {
    domain: {
      title: "Quản lý Tên miền Chuyên nghiệp",
      description: "Dịch vụ tên miền toàn diện với DNS management, domain protection và auto-renewal.",
      type: 'feature' as const,
      features: [
        "Đăng ký tên miền quốc tế (.com, .net, .org)",
        "Tên miền Việt Nam (.vn, .com.vn)",
        "DNS management với giao diện dễ sử dụng",
        "Domain forwarding và redirection",
        "WHOIS privacy protection"
      ],
      benefits: ["99.9% Uptime", "Bảo mật cao", "Hỗ trợ 24/7"],
      tips: [
        "Đăng ký nhiều năm để có giá tốt hơn",
        "Sử dụng WHOIS privacy để bảo vệ thông tin",
        "Thiết lập auto-renewal để không bị mất domain"
      ],
      cta: {
        text: "Tìm hiểu Domain Services",
        action: () => window.location.href = '/domain'
      }
    },
    cloud: {
      title: "Cloud Infrastructure Mạnh mẽ",
      description: "Giải pháp cloud computing với GPU, Kubernetes và workflow automation cho doanh nghiệp hiện đại.",
      type: 'feature' as const,
      features: [
        "Cloud GPU cho AI/ML workloads",
        "Kubernetes cluster management",
        "Auto-scaling theo nhu cầu",
        "Load balancer và CDN",
        "Backup tự động và disaster recovery"
      ],
      benefits: ["Hiệu suất cao", "Tiết kiệm chi phí", "Scalable"],
      tips: [
        "Sử dụng monitoring để tối ưu resource",
        "Thiết lập alerts cho critical metrics",
        "Backup trước khi deploy"
      ],
      cta: {
        text: "Khám phá Cloud Solutions",
        action: () => window.location.href = '/cloud'
      }
    },
    hosting: {
      title: "Web Hosting Tối ưu",
      description: "Hosting chuyên biệt cho WordPress, Laravel với SSD NVMe và caching tối ưu.",
      type: 'info' as const,
      features: [
        "WordPress hosting tối ưu",
        "Laravel hosting với Composer",
        "SSD NVMe storage",
        "Free SSL certificates",
        "Daily backups"
      ],
      benefits: ["Tốc độ nhanh", "Bảo mật cao", "Easy management"],
      tips: [
        "Sử dụng caching để tăng tốc website",
        "Cập nhật CMS thường xuyên",
        "Monitor uptime và performance"
      ]
    }
  };

  const services = [
    {
      icon: DomainIcon,
      title: "Tên miền",
      description: "Cung cấp và quản lý tên miền cho doanh nghiệp, dễ dàng tích hợp với các dịch vụ khác.",
      href: "#domain",
      tooltip: serviceTooltips.domain
    },
    {
      icon: CloudIcon,
      title: "Cloud",
      description: "Cloud GPU, Cloud Server, Cloud Odoo, Cloud AMD, Cloud N8N (hỗ trợ K8s và workflow automation) – Giải pháp đám mây linh hoạt cho DevOps và SysOps.",
      href: "#cloud",
      tooltip: serviceTooltips.cloud
    },
    {
      icon: HostingIcon,
      title: "Hosting",
      description: "Hosting WordPress, Hosting Laravel, Hosting NVME, Reseller Hosting – Tối ưu tốc độ và bảo mật cho website doanh nghiệp.",
      href: "#hosting",
      tooltip: serviceTooltips.hosting
    },
    {
      icon: ServerIcon,
      title: "Máy chủ",
      description: "Thiết bị máy chủ, thiết bị mạng, thuê máy chủ vật lý, chỗ đặt máy chủ, thuê thiết bị mạng – Hạ tầng mạnh mẽ cho IT Manager.",
      href: "#servers"
    },
    {
      icon: EmailIcon,
      title: "Email",
      description: "Email server cho doanh nghiệp, Google Workspace, Microsoft 365, Hybrid Email, dịch vụ vận hành Email server – Giải pháp email an toàn và chuyên nghiệp.",
      href: "#email"
    },
    {
      icon: SoftwareIcon,
      title: "Phần mềm",
      description: "Microsoft, Google, VMware, Sangfor, phần mềm bản quyền, phần mềm AI, phần mềm khác – Cung cấp license và hỗ trợ tích hợp.",
      href: "#software"
    }
  ];

  const additionalServices = [
    {
      icon: ConsultingIcon,
      title: "Tư vấn & Thiết kế",
      description: "Tư vấn hạ tầng, thiết kế hạ tầng phù hợp với doanh nghiệp"
    },
    {
      icon: DeploymentIcon,
      title: "Triển khai",
      description: "Triển khai hạ tầng chuyên nghiệp và đáng tin cậy"
    },
    {
      icon: SupportIcon,
      title: "Vận hành & Hỗ trợ",
      description: "Vận hành hạ tầng, IT Support, Manage Service 24/7"
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-20 bg-white" data-onboarding="services-section">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="h2 text-[hsl(207,100%,40%)] mb-4">
            Giải pháp CNTT toàn diện từ STEP
          </h2>
          <p className="lead prose-constraint mx-auto">
            Tối ưu hóa hạ tầng công nghệ cho doanh nghiệp của bạn
          </p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-[hsl(207,100%,40%)]">
                <CardContent className="p-6 sm:p-8 h-full flex flex-col">
                  {service.tooltip ? (
                    <InteractiveTooltip
                      content={service.tooltip}
                      trigger="hover"
                      position="auto"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="w-12 h-12 step-gradient rounded-lg flex items-center justify-center mb-6 cursor-help relative"
                      >
                        <service.icon className="text-white h-6 w-6" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Lightbulb className="text-white" size={10} />
                        </div>
                      </motion.div>
                    </InteractiveTooltip>
                  ) : (
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="w-12 h-12 step-gradient rounded-lg flex items-center justify-center mb-6"
                    >
                      <service.icon className="text-white h-6 w-6" />
                    </motion.div>
                  )}
                  <h3 className="h3 text-[hsl(207,100%,40%)] mb-4">
                    {service.title}
                  </h3>
                  <p className="body text-gray-600 mb-4 flex-grow">
                    {service.description}
                  </p>
                  <motion.a 
                    href={service.href} 
                    className="text-[hsl(207,100%,40%)] hover:text-[hsl(207,100%,35%)] font-semibold body inline-flex items-center group nowrap"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    Tìm hiểu thêm 
                    <motion.span 
                      className="ml-1"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Services */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 sm:mt-16 bg-[hsl(210,17%,96%)] rounded-2xl p-6 sm:p-8"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="h3 text-[hsl(207,100%,40%)] mb-4">
              Dịch vụ chuyên nghiệp
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Hỗ trợ toàn diện từ CTO đến Help Desk
            </p>
          </div>
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
                  delayChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {additionalServices.map((service, index) => (
              <motion.div 
                key={index} 
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.05, backgroundColor: "#ffffff" }}
                transition={{ duration: 0.3 }}
                className="text-center p-4 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <service.icon className="text-[hsl(207,100%,40%)] h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-4" />
                </motion.div>
                <h4 className="font-semibold text-[hsl(207,100%,40%)] mb-2 text-sm sm:text-base">
                  {service.title}
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
