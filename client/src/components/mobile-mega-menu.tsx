import { useState } from "react";
import { ChevronDown, ChevronRight, Globe, Cloud, Server, Mail, Code, HardDrive, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'domain',
      name: 'Tên Miền',
      icon: Globe,
      items: [
        'Đăng ký tên miền',
        'DNS resolver miễn phí',
        'Quản lý DNS',
        'Bảo vệ tên miền'
      ]
    },
    {
      id: 'cloud',
      name: 'Cloud Computing',
      icon: Cloud,
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
      icon: HardDrive,
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
      icon: Server,
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
      icon: Mail,
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
      icon: Code,
      items: [
        'Microsoft',
        'Google',
        'VMware',
        'Phần mềm AI'
      ]
    }
  ];

  const toggleCategory = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="py-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-3 text-gray-700 hover:text-[hsl(207,100%,40%)] transition-colors font-medium"
      >
        <div className="flex items-center">
          <Settings className="mr-2" size={16} />
          Dịch vụ
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-gray-50 rounded-lg mt-2"
          >
            <div className="p-3 space-y-2">
              {categories.map((category) => (
                <div key={category.id}>
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="flex items-center justify-between w-full py-2 px-3 text-sm text-gray-700 hover:text-[hsl(207,100%,40%)] hover:bg-white rounded-lg transition-all"
                  >
                    <div className="flex items-center">
                      <category.icon className="mr-3 text-[hsl(207,100%,40%)]" size={16} />
                      {category.name}
                    </div>
                    <motion.div
                      animate={{ rotate: activeCategory === category.id ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight size={14} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {activeCategory === category.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden ml-4"
                      >
                        <div className="py-2 space-y-1">
                          {category.items.map((item, index) => (
                            <motion.a
                              key={index}
                              href="#"
                              className="block py-2 px-3 text-sm text-gray-600 hover:text-[hsl(207,100%,40%)] hover:bg-white rounded-lg transition-all"
                              whileHover={{ x: 4 }}
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                              {item}
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}