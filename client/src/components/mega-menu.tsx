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
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[95vw] max-w-6xl bg-white border border-gray-200 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-1 z-50">
      <div className="flex">
        {/* Left Main Content */}
        <div className="flex-1 p-8 pr-4">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xs font-semibold text-[hsl(207,100%,40%)] uppercase tracking-wide mb-3">SẢN PHẨM</h2>
          </div>

          {/* Products Grid - Cloudflare Style */}
          <div className="grid grid-cols-4 gap-8">
            
            {/* Column 1 */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                <a href="/domain" className="hover:text-[hsl(207,100%,40%)] transition-colors">
                  {categories[0].name}
                </a>
              </h3>
              <ul className="space-y-3">
                {categories[0].items.map((item, index) => (
                  <li key={index}>
                    <a href="/domain" className="block text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                <a href="/cloud" className="hover:text-[hsl(207,100%,40%)] transition-colors">
                  Cloud Computing
                </a>
              </h3>
              <ul className="space-y-3">
                <li><a href="/cloud" className="block text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors">Cloud GPU</a></li>
                <li><a href="/cloud" className="block text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors">Cloud Server</a></li>
                <li><a href="/cloud" className="block text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors">Cloud Odoo</a></li>
                <li><a href="/cloud" className="block text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors">Cloud AMD</a></li>
                <li><a href="/cloud" className="block text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors">Cloud N8N</a></li>
              </ul>
              
              <h3 className="text-sm font-semibold text-gray-900 mb-4 mt-8">{categories[1].name}</h3>
              <ul className="space-y-3">
                {categories[1].items.map((item, index) => (
                  <li key={index}>
                    <a href="#" className="block text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-sm font-semibold text-gray-900 mb-4 mt-8">{categories[2].name}</h3>
              <ul className="space-y-3">
                {categories[2].items.map((item, index) => (
                  <li key={index}>
                    <a href="#" className="block text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">{categories[3].name}</h3>
              <ul className="space-y-3">
                {categories[3].items.map((item, index) => (
                  <li key={index}>
                    <a href="#" className="block text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-sm font-semibold text-gray-900 mb-4 mt-8">{categories[4].name}</h3>
              <ul className="space-y-3">
                {categories[4].items.map((item, index) => (
                  <li key={index}>
                    <a href="#" className="block text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">{categories[5].name}</h3>
              <ul className="space-y-3">
                {categories[5].items.map((item, index) => (
                  <li key={index}>
                    <a href="#" className="block text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Plans & Pricing Section */}
          <div className="mt-10 pt-6 border-t border-gray-100">
            <h2 className="text-xs font-semibold text-[hsl(207,100%,40%)] uppercase tracking-wide mb-4">GÓI DỊCH VỤ</h2>
            <div className="grid grid-cols-4 gap-6">
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