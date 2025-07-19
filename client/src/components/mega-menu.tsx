import { 
  DomainIcon, 
  CloudIcon, 
  HostingIcon, 
  ServerIcon, 
  EmailIcon, 
  SoftwareIcon 
} from "./icons/custom-icons";

export default function MegaMenu() {
  const categories = [
    {
      id: 'domain',
      name: 'Tên Miền',
      icon: DomainIcon,
      items: [
        { name: 'Đăng ký tên miền', desc: '.com, .vn, .net, .org' },
        { name: 'Chuyển tên miền', desc: 'Transfer domain dễ dàng' },
        { name: 'Quản lý DNS', desc: 'Cấu hình DNS chuyên nghiệp' },
        { name: 'Bảo vệ tên miền', desc: 'Domain protection & privacy' }
      ]
    },
    {
      id: 'cloud',
      name: 'Cloud',
      icon: CloudIcon,
      items: [
        { name: 'Cloud GPU', desc: 'GPU mạnh mẽ cho AI/ML' },
        { name: 'Cloud Server', desc: 'Máy chủ đám mây linh hoạt' },
        { name: 'Cloud Odoo', desc: 'ERP trên nền tảng cloud' },
        { name: 'Cloud AMD', desc: 'Hiệu năng cao với AMD' }
      ]
    },
    {
      id: 'hosting',
      name: 'Hosting',
      icon: HostingIcon,
      items: [
        { name: 'Hosting WordPress', desc: 'Tối ưu cho WordPress' },
        { name: 'Hosting Laravel', desc: 'PHP framework hosting' },
        { name: 'Hosting NVME', desc: 'Tốc độ siêu nhanh' },
        { name: 'Reseller Hosting', desc: 'Hosting cho đại lý' }
      ]
    },
    {
      id: 'server',
      name: 'Máy Chủ',
      icon: ServerIcon,
      items: [
        { name: 'Thiết bị máy chủ', desc: 'Server hardware' },
        { name: 'Thiết bị mạng', desc: 'Network equipment' },
        { name: 'Thuê máy chủ vật lý', desc: 'Physical server rental' },
        { name: 'Chỗ đặt máy chủ', desc: 'Colocation services' }
      ]
    },
    {
      id: 'email',
      name: 'Email',
      icon: EmailIcon,
      items: [
        { name: 'Email server doanh nghiệp', desc: 'Enterprise email' },
        { name: 'Google Workspace', desc: 'G Suite for business' },
        { name: 'Microsoft 365', desc: 'Office 365 & email' },
        { name: 'Hybrid Email', desc: 'Giải pháp email lai' }
      ]
    },
    {
      id: 'software',
      name: 'Phần Mềm',
      icon: SoftwareIcon,
      items: [
        { name: 'Microsoft', desc: 'Windows, Office licenses' },
        { name: 'Google', desc: 'Google Cloud Platform' },
        { name: 'VMware', desc: 'Virtualization solutions' },
        { name: 'Phần mềm AI', desc: 'AI & Machine Learning' }
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
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[95vw] max-w-7xl bg-white border border-gray-200 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-1 z-50">
      <div className="p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Sản Phẩm & Dịch Vụ</h2>
          <p className="text-sm text-gray-600">Giải pháp công nghệ toàn diện cho doanh nghiệp</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Product Categories */}
          {categories.map((category) => (
            <div key={category.id}>
              <h3 className="text-sm font-semibold text-[hsl(207,100%,40%)] uppercase tracking-wide mb-4 flex items-center">
                <category.icon className="mr-2 h-4 w-4" />
                {category.name}
              </h3>
              <ul className="space-y-3">
                {category.items.map((item, index) => (
                  <li key={index}>
                    <a href="#" className="flex items-start group/item">
                      <div className="mr-3 mt-0.5">
                        <div className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full"></div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 group-hover/item:text-[hsl(207,100%,40%)]">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.desc}</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Services Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-[hsl(207,100%,40%)] uppercase tracking-wide mb-4">Dịch Vụ</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.map((service, index) => (
              <a
                key={index}
                href="#"
                className="text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors"
              >
                {service}
              </a>
            ))}
          </div>
        </div>

        {/* CTA Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Cần tư vấn giải pháp?</h4>
              <p className="text-sm text-gray-600">Đội ngũ chuyên gia STEP sẵn sàng hỗ trợ 24/7</p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button className="px-4 py-2 bg-[hsl(207,100%,40%)] text-white text-sm font-medium rounded-lg hover:bg-[hsl(207,100%,35%)] transition-colors">
                Liên hệ ngay
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Xem báo giá
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}