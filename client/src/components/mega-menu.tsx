import { 
  DomainIcon, 
  CloudIcon, 
  HostingIcon, 
  ServerIcon, 
  EmailIcon, 
  SoftwareIcon 
} from "./icons/custom-icons";
import { 
  Globe,
  Shield,
  ArrowRightLeft,
  Settings,
  Cpu,
  Zap,
  Database,
  Monitor,
  Smartphone,
  HardDrive,
  Network,
  Building,
  Mail,
  Users,
  MessageSquare,
  Briefcase,
  Chrome,
  CloudDownload,
  Brain,
  Lock
} from "lucide-react";

export default function MegaMenu() {
  const categories = [
    {
      id: 'domain',
      name: 'Tên Miền',
      icon: DomainIcon,
      items: [
        { name: 'Đăng ký tên miền', desc: '.com, .vn, .net, .org', icon: Globe },
        { name: 'Chuyển tên miền', desc: 'Transfer domain dễ dàng', icon: ArrowRightLeft },
        { name: 'Quản lý DNS', desc: 'Cấu hình DNS chuyên nghiệp', icon: Settings },
        { name: 'Bảo vệ tên miền', desc: 'Domain protection & privacy', icon: Shield }
      ]
    },
    {
      id: 'cloud',
      name: 'Cloud',
      icon: CloudIcon,
      items: [
        { name: 'Cloud GPU', desc: 'GPU mạnh mẽ cho AI/ML', icon: Cpu },
        { name: 'Cloud Server', desc: 'Máy chủ đám mây linh hoạt', icon: Monitor },
        { name: 'Cloud Odoo', desc: 'ERP trên nền tảng cloud', icon: Briefcase },
        { name: 'Cloud AMD', desc: 'Hiệu năng cao với AMD', icon: Zap }
      ]
    },
    {
      id: 'hosting',
      name: 'Hosting',
      icon: HostingIcon,
      items: [
        { name: 'Hosting WordPress', desc: 'Tối ưu cho WordPress', icon: Chrome },
        { name: 'Hosting Laravel', desc: 'PHP framework hosting', icon: Settings },
        { name: 'Hosting NVME', desc: 'Tốc độ siêu nhanh', icon: Zap },
        { name: 'Reseller Hosting', desc: 'Kinh doanh hosting', icon: Users }
      ]
    },
    {
      id: 'server',
      name: 'Máy Chủ',
      icon: ServerIcon,
      items: [
        { name: 'Thiết bị máy chủ', desc: 'Server hardware', icon: HardDrive },
        { name: 'Thiết bị mạng', desc: 'Network equipment', icon: Network },
        { name: 'Thuê máy chủ vật lý', desc: 'Physical server rental', icon: Database },
        { name: 'Chỗ đặt máy chủ', desc: 'Colocation services', icon: Building }
      ]
    },
    {
      id: 'email',
      name: 'Email',
      icon: EmailIcon,
      items: [
        { name: 'Email server doanh nghiệp', desc: 'Enterprise email', icon: Mail },
        { name: 'Google Workspace', desc: 'G Suite for business', icon: Chrome },
        { name: 'Microsoft 365', desc: 'Office 365 & email', icon: Briefcase },
        { name: 'Hybrid Email', desc: 'Giải pháp email lai', icon: MessageSquare }
      ]
    },
    {
      id: 'software',
      name: 'Phần Mềm',
      icon: SoftwareIcon,
      items: [
        { name: 'Microsoft', desc: 'Windows, Office licenses', icon: Briefcase },
        { name: 'Google', desc: 'Google Cloud Platform', icon: CloudDownload },
        { name: 'VMware', desc: 'Virtualization solutions', icon: Monitor },
        { name: 'Phần mềm AI', desc: 'AI & Machine Learning', icon: Brain }
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
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[95vw] max-w-6xl bg-white border border-gray-200 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-1 z-50">
      <div className="flex">
        {/* Left Main Content */}
        <div className="flex-1 p-8 pr-4">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xs font-semibold text-[hsl(207,100%,40%)] uppercase tracking-wide mb-3">SẢN PHẨM</h2>
          </div>

          {/* Products Grid - Balanced Layout */}
          <div className="grid grid-cols-3 gap-12">
            
            {/* Column 1: Domain & Cloud */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                <a href="/domain" className="hover:text-[hsl(207,100%,40%)] transition-colors">
                  {categories[0].name}
                </a>
              </h3>
              <ul className="space-y-3 mb-8">
                {categories[0].items.map((item, index) => (
                  <li key={index}>
                    <a href="/domain" className="flex items-center text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors group">
                      <item.icon className="w-4 h-4 mr-3 text-gray-400 group-hover:text-[hsl(207,100%,40%)] transition-colors" />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.desc}</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                <a href="/cloud" className="hover:text-[hsl(207,100%,40%)] transition-colors">
                  {categories[1].name}
                </a>
              </h3>
              <ul className="space-y-3">
                {categories[1].items.map((item, index) => (
                  <li key={index}>
                    <a href="/cloud" className="flex items-center text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors group">
                      <item.icon className="w-4 h-4 mr-3 text-gray-400 group-hover:text-[hsl(207,100%,40%)] transition-colors" />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.desc}</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Hosting & Server */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                <a href="/hosting" className="hover:text-[hsl(207,100%,40%)] transition-colors">
                  {categories[2].name}
                </a>
              </h3>
              <ul className="space-y-3 mb-8">
                {categories[2].items.map((item, index) => (
                  <li key={index}>
                    <a href={
                      item.name === 'Hosting WordPress' ? '/Sản Phẩm & Dịch Vụ/Hosting/Hosting WordPress' :
                      item.name === 'Hosting Laravel' ? '/Sản Phẩm & Dịch Vụ/Hosting/Hosting Laravel' :
                      item.name === 'Hosting NVME' ? '/Sản Phẩm & Dịch Vụ/Hosting/Hosting NVME' :
                      item.name === 'Reseller Hosting' ? '/Sản Phẩm & Dịch Vụ/Hosting/Reseller Hosting' :
                      '/hosting'
                    } className="flex items-center text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors group">
                      <item.icon className="w-4 h-4 mr-3 text-gray-400 group-hover:text-[hsl(207,100%,40%)] transition-colors" />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.desc}</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-sm font-semibold text-gray-900 mb-4">{categories[3].name}</h3>
              <ul className="space-y-3">
                {categories[3].items.map((item, index) => (
                  <li key={index}>
                    <a href="#" className="flex items-center text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors group">
                      <item.icon className="w-4 h-4 mr-3 text-gray-400 group-hover:text-[hsl(207,100%,40%)] transition-colors" />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.desc}</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Email & Software */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">{categories[4].name}</h3>
              <ul className="space-y-3 mb-8">
                {categories[4].items.map((item, index) => (
                  <li key={index}>
                    <a href={
                      item.name === 'Hybrid Email' ? '/Dịch vụ/Email' :
                      '#'
                    } className="flex items-center text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors group">
                      <item.icon className="w-4 h-4 mr-3 text-gray-400 group-hover:text-[hsl(207,100%,40%)] transition-colors" />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.desc}</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-sm font-semibold text-gray-900 mb-4">{categories[5].name}</h3>
              <ul className="space-y-3">
                {categories[5].items.map((item, index) => (
                  <li key={index}>
                    <a href="#" className="flex items-center text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors group">
                      <item.icon className="w-4 h-4 mr-3 text-gray-400 group-hover:text-[hsl(207,100%,40%)] transition-colors" />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.desc}</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Plans & Pricing Section */}
          <div className="mt-10 pt-6 border-t border-gray-100">
            <h2 className="text-xs font-semibold text-[hsl(207,100%,40%)] uppercase tracking-wide mb-4">GÓI DỊCH VỤ</h2>
            <div className="grid grid-cols-3 gap-8">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Gói Cơ Bản</div>
                  <div className="text-xs text-gray-500">Phù hợp startup</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <div className="w-4 h-4 bg-[hsl(207,100%,40%)] rounded-full"></div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Gói Doanh Nghiệp</div>
                  <div className="text-xs text-gray-500">Giải pháp toàn diện</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Gói Premium</div>
                  <div className="text-xs text-gray-500">Hiệu năng cao</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Tùy Chỉnh</div>
                  <div className="text-xs text-gray-500">Theo yêu cầu</div>
                </div>
              </div>
            </div>
          </div>

          {/* Global Services Section */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h2 className="text-xs font-semibold text-[hsl(207,100%,40%)] uppercase tracking-wide mb-4">DỊCH VỤ CHUYÊN NGHIỆP</h2>
            <div className="grid grid-cols-4 gap-6">
              <div>
                <div className="text-sm font-medium text-gray-900 mb-2">Tư vấn & Hỗ trợ</div>
                <div className="text-xs text-gray-500 leading-relaxed">Tối ưu trải nghiệm Cloudflare</div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-900 mb-2">Dịch vụ chuyên nghiệp</div>
                <div className="text-xs text-gray-500 leading-relaxed">Triển khai chuyên gia</div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-900 mb-2">Quản lý tài khoản kỹ thuật</div>
                <div className="text-xs text-gray-500 leading-relaxed">Quản lý kỹ thuật tập trung</div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-900 mb-2">Dịch vụ vận hành bảo mật</div>
                <div className="text-xs text-gray-500 leading-relaxed">Phản hồi bảo mật Cloudflare</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-gray-50 border-l border-gray-200 p-8">
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              <a href="/domain" className="hover:text-[hsl(207,100%,40%)] transition-colors">
                Đăng ký tên miền
              </a>
            </h3>
            <p className="text-xs text-gray-600 mb-4">Mua và quản lý tên miền</p>
            
            <h3 className="text-sm font-semibold text-gray-900 mb-3 mt-6">DNS resolver miễn phí</h3>
            <p className="text-xs text-gray-600 mb-4">Duyệt web nhanh, riêng tư</p>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Tài nguyên</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors">Hướng dẫn sản phẩm</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors">Kiến trúc tham khảo</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors">Báo cáo phân tích</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors">Demo và tour sản phẩm</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}