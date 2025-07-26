import { useState } from "react";
import { 
  ChevronDown, 
  ChevronRight,
  Globe,
  Shield,
  ArrowRightLeft,
  Settings,
  Cpu,
  Zap,
  Database,
  Monitor,
  HardDrive,
  Network,
  Building,
  Mail,
  Users,
  MessageSquare,
  Briefcase,
  Chrome,
  CloudDownload,
  Brain
} from "lucide-react";
import { 
  DomainIcon, 
  CloudIcon, 
  HostingIcon, 
  ServerIcon, 
  EmailIcon, 
  SoftwareIcon 
} from "./icons/custom-icons";

export default function MobileMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'domain',
      name: 'Tên Miền',
      icon: DomainIcon,
      items: [
        { name: 'Đăng ký tên miền', icon: Globe },
        { name: 'Chuyển tên miền', icon: ArrowRightLeft },
        { name: 'Quản lý DNS', icon: Settings },
        { name: 'Bảo vệ tên miền', icon: Shield }
      ]
    },
    {
      id: 'cloud',
      name: 'Cloud',
      icon: CloudIcon,
      items: [
        { name: 'Cloud GPU', icon: Cpu },
        { name: 'Cloud Server', icon: Monitor },
        { name: 'Cloud Odoo', icon: Briefcase },
        { name: 'Cloud AMD', icon: Zap },
        { name: 'Cloud N8N', icon: Settings }
      ]
    },
    {
      id: 'hosting',
      name: 'Hosting',
      icon: HostingIcon,
      items: [
        { name: 'Hosting WordPress', icon: Chrome },
        { name: 'Hosting Laravel', icon: Settings },
        { name: 'Hosting NVME', icon: Zap },
        { name: 'Reseller Hosting', icon: Users }
      ]
    },
    {
      id: 'server',
      name: 'Máy Chủ',
      icon: ServerIcon,
      items: [
        { name: 'Thiết bị máy chủ', icon: HardDrive },
        { name: 'Thiết bị mạng', icon: Network },
        { name: 'Thuê máy chủ vật lý', icon: Database },
        { name: 'Chỗ đặt máy chủ', icon: Building }
      ]
    },
    {
      id: 'email',
      name: 'Email',
      icon: EmailIcon,
      items: [
        { name: 'Email server doanh nghiệp', icon: Mail },
        { name: 'Google Workspace', icon: Chrome },
        { name: 'Microsoft 365', icon: Briefcase },
        { name: 'Hybrid Email', icon: MessageSquare }
      ]
    },
    {
      id: 'software',
      name: 'Phần Mềm',
      icon: SoftwareIcon,
      items: [
        { name: 'Microsoft', icon: Briefcase },
        { name: 'Google', icon: CloudDownload },
        { name: 'VMware', icon: Monitor },
        { name: 'Sangfor', icon: Shield },
        { name: 'Phần mềm AI', icon: Brain }
      ]
    }
  ];

  const services = [
    'Tư vấn hạ tầng',
    'Thiết kế hạ tầng',
    'Triển khai hạ tầng',
    'Vận hành hạ tầng',
    'IT Support',
    'Manage Service'
  ];

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-3 text-gray-700 hover:text-[hsl(207,100%,40%)] transition-colors font-medium"
      >
        Sản Phẩm & Dịch Vụ
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="pb-2 space-y-1">
          {categories.map((category) => (
            <div key={category.id} className="border-l-2 border-gray-100 ml-2">
              <button
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                className="flex items-center justify-between w-full pl-4 pr-2 py-2 text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors"
              >
                <div className="flex items-center">
                  <category.icon className="h-4 w-4 mr-2" />
                  {category.name}
                </div>
                <ChevronRight className={`h-3 w-3 transition-transform ${activeCategory === category.id ? 'rotate-90' : ''}`} />
              </button>
              
              {activeCategory === category.id && (
                <div className="pl-10 pr-2 pb-2 space-y-1">
                  {category.items.map((item, index) => (
                    <a
                      key={index}
                      href={
                        category.id === 'hosting' && item.name === 'Hosting WordPress' ? '/Sản Phẩm & Dịch Vụ/Hosting/Hosting WordPress' :
                        category.id === 'hosting' && item.name === 'Hosting Laravel' ? '/Sản Phẩm & Dịch Vụ/Hosting/Hosting Laravel' :
                        category.id === 'hosting' && item.name === 'Hosting NVME' ? '/Sản Phẩm & Dịch Vụ/Hosting/Hosting NVME' :
                        category.id === 'hosting' && item.name === 'Reseller Hosting' ? '/Sản Phẩm & Dịch Vụ/Hosting/Reseller Hosting' :
                        category.id === 'email' && item.name === 'Hybrid Email' ? '/Dịch vụ/Email' :
                        category.id === 'hosting' ? '/hosting' : '#'
                      }
                      className="flex items-center py-1 text-sm text-gray-500 hover:text-[hsl(207,100%,40%)] transition-colors group"
                    >
                      <item.icon className="w-3 h-3 mr-2 text-gray-400 group-hover:text-[hsl(207,100%,40%)] transition-colors" />
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* Services */}
          <div className="border-l-2 border-gray-100 ml-2">
            <div className="pl-4 pr-2 py-2">
              <h4 className="text-sm font-medium text-[hsl(207,100%,40%)] mb-2">Dịch Vụ</h4>
              <div className="space-y-1">
                {services.map((service, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block py-1 text-sm text-gray-500 hover:text-[hsl(207,100%,40%)] transition-colors"
                  >
                    {service}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}