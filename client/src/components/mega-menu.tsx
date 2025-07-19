import { 
  Globe, 
  Server, 
  Shield, 
  Cloud, 
  Mail, 
  Settings,
  Database,
  Monitor,
  Smartphone,
  Code,
  Zap,
  Lock
} from "lucide-react";

export default function MegaMenu() {
  return (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[900px] max-w-[95vw] bg-white border border-gray-200 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-1 z-50">
      <div className="p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Dịch vụ CNTT</h2>
          <p className="text-sm text-gray-600">Giải pháp công nghệ toàn diện cho doanh nghiệp</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          {/* Column 1: Hosting & Domain */}
          <div>
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4 flex items-center">
              <Globe className="mr-2 h-4 w-4" />
              Hosting & Domain
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-start group/item">
                  <div className="mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 group-hover/item:text-blue-600">Đăng ký tên miền</div>
                    <div className="text-xs text-gray-500">.com, .vn, .net, .org</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start group/item">
                  <div className="mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 group-hover/item:text-blue-600">Web Hosting</div>
                    <div className="text-xs text-gray-500">WordPress, PHP, Laravel</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start group/item">
                  <div className="mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 group-hover/item:text-blue-600">VPS Hosting</div>
                    <div className="text-xs text-gray-500">Máy chủ ảo chuyên nghiệp</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start group/item">
                  <div className="mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 group-hover/item:text-blue-600">Dedicated Server</div>
                    <div className="text-xs text-gray-500">Máy chủ riêng hiệu năng cao</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Cloud Services */}
          <div>
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4 flex items-center">
              <Cloud className="mr-2 h-4 w-4" />
              Cloud Services
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-start group/item">
                  <div className="mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 group-hover/item:text-blue-600">Cloud Server</div>
                    <div className="text-xs text-gray-500">Máy chủ đám mây linh hoạt</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start group/item">
                  <div className="mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 group-hover/item:text-blue-600">Cloud Storage</div>
                    <div className="text-xs text-gray-500">Lưu trữ dữ liệu an toàn</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start group/item">
                  <div className="mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 group-hover/item:text-blue-600">Cloud Database</div>
                    <div className="text-xs text-gray-500">Cơ sở dữ liệu đám mây</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start group/item">
                  <div className="mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 group-hover/item:text-blue-600">CDN Service</div>
                    <div className="text-xs text-gray-500">Tăng tốc website toàn cầu</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Security & Email */}
          <div>
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4 flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              Security & Email
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-start group/item">
                  <div className="mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 group-hover/item:text-blue-600">SSL Certificate</div>
                    <div className="text-xs text-gray-500">Bảo mật website chuyên nghiệp</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start group/item">
                  <div className="mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 group-hover/item:text-blue-600">Email Hosting</div>
                    <div className="text-xs text-gray-500">Email doanh nghiệp chuyên nghiệp</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start group/item">
                  <div className="mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 group-hover/item:text-blue-600">Backup Service</div>
                    <div className="text-xs text-gray-500">Sao lưu dữ liệu tự động</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start group/item">
                  <div className="mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 group-hover/item:text-blue-600">DDoS Protection</div>
                    <div className="text-xs text-gray-500">Bảo vệ khỏi tấn công mạng</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Software & Support */}
          <div>
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4 flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Software & Support
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-start group/item">
                  <div className="mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 group-hover/item:text-blue-600">Microsoft Office 365</div>
                    <div className="text-xs text-gray-500">Bản quyền chính thức</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start group/item">
                  <div className="mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 group-hover/item:text-blue-600">Windows Server</div>
                    <div className="text-xs text-gray-500">License chính hãng Microsoft</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start group/item">
                  <div className="mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 group-hover/item:text-blue-600">Tech Support</div>
                    <div className="text-xs text-gray-500">Hỗ trợ kỹ thuật 24/7</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start group/item">
                  <div className="mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 group-hover/item:text-blue-600">Consulting</div>
                    <div className="text-xs text-gray-500">Tư vấn giải pháp IT</div>
                  </div>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer CTA */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Cần tư vấn thêm?</h4>
              <p className="text-xs text-gray-500">Liên hệ để được hỗ trợ miễn phí</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              >
                Liên hệ ngay
              </a>
              <a 
                href="/blog" 
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                Xem blog
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}