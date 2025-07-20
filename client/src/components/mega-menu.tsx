import { motion } from "framer-motion";
import { 
  Globe, 
  Cloud, 
  Server, 
  Mail, 
  Shield, 
  Code, 
  Users, 
  Settings,
  Lightbulb,
  Rocket,
  HeartHandshake,
  HardDrive,
  Palette,
  Wrench,
  Monitor,
  MousePointer,
  Cpu,
  Database,
  FileText,
  Zap,
  Building2,
  Star
} from "lucide-react";

export default function MegaMenu() {
  const menuSections = [
    {
      title: "Tên Miền",
      icon: Globe,
      items: [
        { name: "Đăng ký tên miền", desc: "Mua và quản lý tên miền", icon: MousePointer },
        { name: "DNS resolver miễn phí", desc: "Duyệt web nhanh, riêng tư", icon: Zap },
        { name: "Tài nguyên", desc: "", icon: FileText },
        { name: "Hướng dẫn sản phẩm", desc: "", icon: Lightbulb },
        { name: "Kiến trúc tham khảo", desc: "", icon: Settings },
        { name: "Báo cáo phân tích", desc: "", icon: Database },
        { name: "Demo và tour sản phẩm", desc: "", icon: Monitor }
      ]
    },
    {
      title: "Cloud Computing", 
      icon: Cloud,
      items: [
        { name: "Cloud GPU", desc: "", icon: Cpu },
        { name: "Cloud Server", desc: "", icon: Server },
        { name: "Cloud Odoo", desc: "", icon: Building2 },
        { name: "Cloud AMD", desc: "", icon: Rocket },
        { name: "Cloud N8N", desc: "", icon: Settings }
      ]
    },
    {
      title: "Hosting",
      icon: HardDrive,
      items: [
        { name: "Hosting WordPress", desc: "", icon: Palette },
        { name: "Hosting Laravel", desc: "", icon: Code },
        { name: "Hosting NVME", desc: "", icon: Zap },
        { name: "Reseller Hosting", desc: "", icon: Users }
      ]
    },
    {
      title: "Máy Chủ",
      icon: Server,
      items: [
        { name: "Thiết bị máy chủ", desc: "", icon: Server },
        { name: "Thiết bị mạng", desc: "", icon: Settings },
        { name: "Thuê máy chủ vật lý", desc: "", icon: HardDrive },
        { name: "Chỗ đặt máy chủ", desc: "", icon: Building2 }
      ]
    },
    {
      title: "Phần Mềm",
      icon: Code,
      items: [
        { name: "Microsoft", desc: "", icon: Monitor },
        { name: "Google", desc: "", icon: Palette },
        { name: "VMware", desc: "", icon: Settings },
        { name: "Phần mềm AI", desc: "", icon: Lightbulb }
      ]
    },
    {
      title: "Email",
      icon: Mail,
      items: [
        { name: "Email server doanh nghiệp", desc: "", icon: Building2 },
        { name: "Google Workspace", desc: "", icon: Palette },
        { name: "Microsoft 365", desc: "", icon: Monitor },
        { name: "Hybrid Email", desc: "", icon: Settings }
      ]
    }
  ];

  const packages = [
    { name: "Gói Cơ Bản", desc: "Phù hợp startup", icon: Star, color: "blue" },
    { name: "Gói Doanh Nghiệp", desc: "Giải pháp toàn diện", icon: Building2, color: "purple" },
    { name: "Gói Premium", desc: "Hiệu năng cao", icon: Rocket, color: "orange" },
    { name: "Tùy Chỉnh", desc: "Theo yêu cầu", icon: Settings, color: "green" }
  ];

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: -10,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  return (
    <motion.div 
      className="absolute top-full left-1/2 transform -translate-x-1/2 w-[95vw] max-w-7xl bg-white border border-gray-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 mt-2 z-50 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
    >
      <div className="flex">
        {/* Main Services Grid */}
        <div className="flex-1 p-8">
          <motion.div variants={itemVariants}>
            <h2 className="text-xs font-semibold text-[hsl(207,100%,40%)] uppercase tracking-wide mb-6 flex items-center">
              <Settings className="mr-2" size={14} />
              SẢN PHẨM & DỊCH VỤ
            </h2>
          </motion.div>

          <div className="grid grid-cols-3 gap-8">
            {menuSections.map((section, sectionIndex) => (
              <motion.div key={section.title} variants={itemVariants}>
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center hover:text-[hsl(207,100%,40%)] transition-colors cursor-pointer">
                    <section.icon className="mr-2 text-[hsl(207,100%,40%)]" size={16} />
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.items.map((item, index) => (
                      <motion.li 
                        key={index}
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <a 
                          href="#" 
                          className="flex items-center text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] transition-colors group/item py-1"
                        >
                          <item.icon className="mr-2 text-gray-400 group-hover/item:text-[hsl(207,100%,40%)] transition-colors" size={14} />
                          <span>{item.name}</span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Packages */}
        <div className="w-80 bg-gradient-to-br from-gray-50 to-blue-50 p-8 border-l border-gray-100">
          <motion.div variants={itemVariants}>
            <h2 className="text-xs font-semibold text-[hsl(207,100%,40%)] uppercase tracking-wide mb-6 flex items-center">
              <Rocket className="mr-2" size={14} />
              GÓI DỊCH VỤ
            </h2>
          </motion.div>

          <div className="space-y-4">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-[hsl(207,100%,40%)] transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-md">
                  <div className="flex items-center mb-2">
                    <div className={`p-2 rounded-lg bg-${pkg.color}-100 mr-3 group-hover:bg-[hsl(207,100%,40%)] transition-colors`}>
                      <pkg.icon className={`text-${pkg.color}-600 group-hover:text-white transition-colors`} size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 group-hover:text-[hsl(207,100%,40%)] transition-colors">
                        {pkg.name}
                      </h4>
                      <p className="text-xs text-gray-500">{pkg.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-8">
            <div className="bg-gradient-to-r from-[hsl(207,100%,40%)] to-[hsl(207,100%,30%)] rounded-lg p-4 text-white">
              <div className="flex items-center mb-3">
                <HeartHandshake className="mr-2" size={20} />
                <h3 className="font-semibold">Tư vấn miễn phí</h3>
              </div>
              <p className="text-sm text-blue-100 mb-4">
                Để lại thông tin để được tư vấn giải pháp phù hợp nhất
              </p>
              <motion.button 
                className="w-full bg-white text-[hsl(207,100%,40%)] font-semibold py-2 px-4 rounded-lg text-sm hover:bg-blue-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Liên hệ ngay
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}