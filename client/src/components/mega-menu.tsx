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
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[95vw] max-w-7xl bg-white border border-gray-200 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out mt-3 step-gradient-border z-50">
      <div className="p-8 lg:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          
          {/* Domain */}
          <div className="group/item hover:bg-gray-50 p-4 rounded-xl transition-colors">
            <h3 className="text-[hsl(207,100%,40%)] font-bold mb-4 flex items-center text-lg">
              <DomainIcon className="mr-3 h-6 w-6 text-[hsl(207,100%,40%)]" />
              Tên Miền
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Đăng ký tên miền
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Chuyển tên miền
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Quản lý DNS
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Bảo vệ tên miền
              </a></li>
            </ul>
          </div>

          {/* Cloud */}
          <div className="group/item hover:bg-gray-50 p-4 rounded-xl transition-colors">
            <h3 className="text-[hsl(207,100%,40%)] font-bold mb-4 flex items-center text-lg">
              <CloudIcon className="mr-3 h-6 w-6 text-[hsl(207,100%,40%)]" />
              Cloud
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Cloud GPU
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Cloud Server
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Cloud Odoo
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Cloud AMD
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Cloud N8N
              </a></li>
            </ul>
          </div>

          {/* Hosting */}
          <div className="group/item hover:bg-gray-50 p-4 rounded-xl transition-colors">
            <h3 className="text-[hsl(207,100%,40%)] font-bold mb-4 flex items-center text-lg">
              <HostingIcon className="mr-3 h-6 w-6 text-[hsl(207,100%,40%)]" />
              Hosting
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Hosting WordPress
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Hosting Laravel
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Hosting NVME
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Reseller Hosting
              </a></li>
            </ul>
          </div>

          {/* Server */}
          <div className="group/item hover:bg-gray-50 p-4 rounded-xl transition-colors">
            <h3 className="text-[hsl(207,100%,40%)] font-bold mb-4 flex items-center text-lg">
              <ServerIcon className="mr-3 h-6 w-6 text-[hsl(207,100%,40%)]" />
              Máy Chủ
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Thiết bị máy chủ
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Thiết bị mạng
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Thuê máy chủ vật lý
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Chỗ đặt máy chủ
              </a></li>
            </ul>
          </div>

          {/* Email */}
          <div className="group/item hover:bg-gray-50 p-4 rounded-xl transition-colors">
            <h3 className="text-[hsl(207,100%,40%)] font-bold mb-4 flex items-center text-lg">
              <EmailIcon className="mr-3 h-6 w-6 text-[hsl(207,100%,40%)]" />
              Email
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Email server doanh nghiệp
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Google Workspace
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Microsoft 365
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Hybrid Email
              </a></li>
            </ul>
          </div>

          {/* Software */}
          <div className="group/item hover:bg-gray-50 p-4 rounded-xl transition-colors">
            <h3 className="text-[hsl(207,100%,40%)] font-bold mb-4 flex items-center text-lg">
              <SoftwareIcon className="mr-3 h-6 w-6 text-[hsl(207,100%,40%)]" />
              Phần Mềm
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Microsoft
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Google
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                VMware
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Sangfor
              </a></li>
              <li><a href="#" className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-1">
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                Phần mềm AI
              </a></li>
            </ul>
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <h3 className="text-[hsl(207,100%,40%)] font-bold mb-6 flex items-center text-lg">
            <Settings className="mr-3 h-6 w-6 text-[hsl(207,100%,40%)]" />
            Dịch Vụ Chuyên Nghiệp
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Tư vấn hạ tầng',
              'Thiết kế hạ tầng',
              'Triển khai hạ tầng',
              'Vận hành hạ tầng',
              'IT Support 24/7',
              'Manage Service'
            ].map((service, index) => (
              <a 
                key={index} 
                href="#" 
                className="text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center py-2 px-3 rounded-lg hover:bg-gray-50"
              >
                <span className="w-2 h-2 bg-[hsl(207,100%,40%)] rounded-full mr-3 opacity-60"></span>
                {service}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}