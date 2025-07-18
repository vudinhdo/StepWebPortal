import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Settings, Headphones } from "lucide-react";
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
  const services = [
    {
      icon: DomainIcon,
      title: "Tên miền",
      description: "Cung cấp và quản lý tên miền cho doanh nghiệp, dễ dàng tích hợp với các dịch vụ khác.",
      href: "#domain"
    },
    {
      icon: CloudIcon,
      title: "Cloud",
      description: "Cloud GPU, Cloud Server, Cloud Odoo, Cloud AMD, Cloud N8N (hỗ trợ K8s và workflow automation) – Giải pháp đám mây linh hoạt cho DevOps và SysOps.",
      href: "#cloud"
    },
    {
      icon: HostingIcon,
      title: "Hosting",
      description: "Hosting WordPress, Hosting Laravel, Hosting NVME, Reseller Hosting – Tối ưu tốc độ và bảo mật cho website doanh nghiệp.",
      href: "#hosting"
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
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[hsl(207,100%,40%)] mb-4">
            Giải pháp CNTT toàn diện từ STEP
          </h2>
          <p className="text-xl text-gray-600">
            Tối ưu hóa hạ tầng công nghệ cho doanh nghiệp của bạn
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="step-card-hover border-gray-200 step-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-8">
                <div className="w-12 h-12 step-gradient rounded-lg flex items-center justify-center mb-6 step-pulse-animation">
                  <service.icon className="text-white h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-[hsl(207,100%,40%)] mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <a 
                  href={service.href} 
                  className="text-[hsl(207,100%,40%)] hover:text-[hsl(207,100%,35%)] font-semibold"
                >
                  Tìm hiểu thêm →
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mt-16 bg-[hsl(210,17%,96%)] rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[hsl(207,100%,40%)] mb-4">
              Dịch vụ chuyên nghiệp
            </h3>
            <p className="text-gray-600">
              Hỗ trợ toàn diện từ CTO đến Help Desk
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="text-center">
                <service.icon className="text-[hsl(207,100%,40%)] h-12 w-12 mx-auto mb-4" />
                <h4 className="font-semibold text-[hsl(207,100%,40%)] mb-2">
                  {service.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
