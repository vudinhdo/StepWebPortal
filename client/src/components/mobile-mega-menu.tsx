import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
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
        'Đăng ký tên miền',
        'Chuyển tên miền',
        'Quản lý DNS',
        'Bảo vệ tên miền'
      ]
    },
    {
      id: 'cloud',
      name: 'Cloud',
      icon: CloudIcon,
      items: [
        'Cloud GPU',
        'Cloud Server',
        'Cloud Odoo',
        'Cloud AMD',
        'Cloud N8N'
      ]
    },
    {
      id: 'hosting',
      name: 'Hosting',
      icon: HostingIcon,
      items: [
        'Hosting WordPress',
        'Hosting Laravel',
        'Hosting NVME',
        'Reseller Hosting'
      ]
    },
    {
      id: 'server',
      name: 'Máy Chủ',
      icon: ServerIcon,
      items: [
        'Thiết bị máy chủ',
        'Thiết bị mạng',
        'Thuê máy chủ vật lý',
        'Chỗ đặt máy chủ'
      ]
    },
    {
      id: 'email',
      name: 'Email',
      icon: EmailIcon,
      items: [
        'Email server doanh nghiệp',
        'Google Workspace',
        'Microsoft 365',
        'Hybrid Email'
      ]
    },
    {
      id: 'software',
      name: 'Phần Mềm',
      icon: SoftwareIcon,
      items: [
        'Microsoft',
        'Google',
        'VMware',
        'Sangfor',
        'Phần mềm AI'
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
                      href="#"
                      className="block py-1 text-sm text-gray-500 hover:text-[hsl(207,100%,40%)] transition-colors"
                    >
                      {item}
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