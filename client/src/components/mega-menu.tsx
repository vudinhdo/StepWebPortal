import { Settings } from "lucide-react";
import { 
  DomainIcon, 
  CloudIcon, 
  HostingIcon, 
  ServerIcon, 
  EmailIcon, 
  SoftwareIcon 
} from "./icons/custom-icons";

export default function MegaMenu() {
  return (
    <div className="mega-menu absolute top-full left-1/2 transform -translate-x-1/2 w-[90vw] max-w-6xl bg-white border border-gray-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 mt-2 step-gradient-border z-50">
      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Domain */}
          <div>
            <h3 className="text-[hsl(207,100%,40%)] font-semibold mb-4 flex items-center">
              <DomainIcon className="mr-2 h-5 w-5" />
              Tên Miền
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Đăng ký tên miền</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Chuyển tên miền</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Quản lý DNS</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Bảo vệ tên miền</a></li>
            </ul>
          </div>

          {/* Cloud */}
          <div>
            <h3 className="text-[hsl(207,100%,40%)] font-semibold mb-4 flex items-center">
              <CloudIcon className="mr-2 h-5 w-5" />
              Cloud
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Cloud GPU</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Cloud Server</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Cloud Odoo</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Cloud AMD</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Cloud N8N</a></li>
            </ul>
          </div>

          {/* Hosting */}
          <div>
            <h3 className="text-[hsl(207,100%,40%)] font-semibold mb-4 flex items-center">
              <HostingIcon className="mr-2 h-5 w-5" />
              Hosting
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Hosting WordPress</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Hosting Laravel</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Hosting NVME</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Reseller Hosting</a></li>
            </ul>
          </div>

          {/* Máy Chủ */}
          <div>
            <h3 className="text-[hsl(207,100%,40%)] font-semibold mb-4 flex items-center">
              <ServerIcon className="mr-2 h-5 w-5" />
              Máy Chủ
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Thiết bị máy chủ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Thiết bị mạng</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Thuê máy chủ vật lý</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Chỗ đặt máy chủ</a></li>
            </ul>
          </div>

          {/* Email */}
          <div>
            <h3 className="text-[hsl(207,100%,40%)] font-semibold mb-4 flex items-center">
              <EmailIcon className="mr-2 h-5 w-5" />
              Email
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Email server doanh nghiệp</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Google Workspace</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Microsoft 365</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Hybrid Email</a></li>
            </ul>
          </div>

          {/* Phần Mềm */}
          <div>
            <h3 className="text-[hsl(207,100%,40%)] font-semibold mb-4 flex items-center">
              <SoftwareIcon className="mr-2 h-5 w-5" />
              Phần Mềm
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Microsoft</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Google</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">VMware</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Sangfor</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Phần mềm AI</a></li>
            </ul>
          </div>
        </div>

        {/* Dịch Vụ Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-[hsl(207,100%,40%)] font-semibold mb-4 flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Dịch Vụ
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Tư vấn hạ tầng</a>
            <a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Thiết kế hạ tầng</a>
            <a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Triển khai hạ tầng</a>
            <a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Vận hành hạ tầng</a>
            <a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">IT Support</a>
            <a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)]">Manage Service</a>
          </div>
        </div>
      </div>
    </div>
  );
}