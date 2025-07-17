import { ArrowRight, Phone, Mail, MapPin, Facebook, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ContactForm from "./contact-form";

export default function Footer() {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <>
      {/* CTA Section */}
      <section className="py-20 step-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Sẵn sàng nâng cấp hạ tầng CNTT của bạn?
          </h2>
          <p className="text-xl mb-8">
            Liên hệ với chuyên gia STEP để được tư vấn miễn phí
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-[hsl(207,100%,40%)] px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all h-14"
              onClick={() => setShowContactForm(true)}
            >
              Tư vấn miễn phí
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[hsl(207,100%,40%)] transition-all h-14"
              onClick={() => setShowContactForm(true)}
            >
              Xem demo sản phẩm
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 step-gradient rounded-full flex items-center justify-center">
                  <ArrowRight className="text-white h-5 w-5 transform rotate-45" />
                </div>
                <div>
                  <div className="text-xl font-bold text-[hsl(195,100%,50%)]">STEP</div>
                  <div className="text-xs text-gray-400">STEP BY STEP</div>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-4">
                CÔNG TY CỔ PHẦN ĐẦU TƯ CÔNG NGHỆ STEP
              </h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p><strong>Mã số thuế:</strong> 0108230633</p>
                <p><strong>Địa chỉ:</strong> Xóm 9, Khu 3, Xã Quốc Oai, Thành phố Hà Nội</p>
                <p><strong>Văn phòng:</strong> Số 99 Hoàng Ngân - Phường Nhân Chính - Quận Thanh Xuân - Tp.Hà Nội</p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:0985636289" className="text-[hsl(195,100%,50%)] hover:text-white">
                    0985636289
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:info@step.com.vn" className="text-[hsl(195,100%,50%)] hover:text-white">
                    info@step.com.vn
                  </a>
                </p>
                <p>
                  <strong>Website:</strong>{" "}
                  <a href="https://step.com.vn/" className="text-[hsl(195,100%,50%)] hover:text-white">
                    https://step.com.vn/
                  </a>
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Dịch vụ</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[hsl(195,100%,50%)]">Tên miền</a></li>
                <li><a href="#" className="hover:text-[hsl(195,100%,50%)]">Cloud Server</a></li>
                <li><a href="#" className="hover:text-[hsl(195,100%,50%)]">Hosting</a></li>
                <li><a href="#" className="hover:text-[hsl(195,100%,50%)]">Máy chủ</a></li>
                <li><a href="#" className="hover:text-[hsl(195,100%,50%)]">Email</a></li>
                <li><a href="#" className="hover:text-[hsl(195,100%,50%)]">Phần mềm</a></li>
              </ul>
            </div>

            {/* Social & Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Kết nối</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Facebook className="text-[hsl(195,100%,50%)] h-5 w-5" />
                  <a 
                    href="https://www.facebook.com/profile.php?id=61564705138608" 
                    className="text-gray-400 hover:text-[hsl(195,100%,50%)] text-sm"
                  >
                    Facebook
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-[hsl(195,100%,50%)] h-5 w-5" />
                  <a 
                    href="https://maps.app.goo.gl/Tg8mLAs6qHtVpDUZ8" 
                    className="text-gray-400 hover:text-[hsl(195,100%,50%)] text-sm"
                  >
                    Bản đồ
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="text-[hsl(195,100%,50%)] h-5 w-5" />
                  <a 
                    href="https://zalo.me/93171011934970677" 
                    className="text-gray-400 hover:text-[hsl(195,100%,50%)] text-sm"
                  >
                    Zalo OA
                  </a>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-2">Thông tin ngân hàng</h4>
                <div className="text-xs text-gray-400">
                  <p>STK: 19132608991888</p>
                  <p>Techcombank - CN Hoàng Quốc Việt</p>
                  <p>PGD Trần Thái Tông</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              © 2025 STEP. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-[hsl(195,100%,50%)]">
                Chính sách bảo mật
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-[hsl(195,100%,50%)]">
                Điều khoản sử dụng
              </a>
            </div>
          </div>
        </div>
      </footer>

      <ContactForm open={showContactForm} onOpenChange={setShowContactForm} />
    </>
  );
}
