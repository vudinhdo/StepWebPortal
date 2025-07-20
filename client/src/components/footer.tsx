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
              className="bg-white text-[hsl(207,100%,40%)] px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all h-14 step-pulse-animation transform hover:scale-105"
              onClick={() => setShowContactForm(true)}
            >
              Tư vấn miễn phí
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[hsl(207,100%,40%)] transition-all h-14 transform hover:scale-105"
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/attached_assets/logo step_1752797244359.png" 
                  alt="STEP Logo" 
                  className="h-12 w-auto filter brightness-0 invert" 
                />
              </div>
              <h3 className="text-lg font-semibold mb-4">
                CÔNG TY CỔ PHẦN ĐẦU TƯ CÔNG NGHỆ STEP
              </h3>
              <div className="space-y-3 text-sm text-gray-400">
                <p><strong className="text-white">Mã số thuế:</strong> 0108230633</p>
                <p><strong className="text-white">Địa chỉ:</strong> Xóm 9, Khu 3, Xã Quốc Oai, Thành phố Hà Nội</p>
                <p><strong className="text-white">Văn phòng:</strong> Số 99 Hoàng Ngân - Phường Nhân Chính - Quận Thanh Xuân - Tp.Hà Nội</p>
                
                {/* Contact Information */}
                <div className="mt-6 space-y-3">
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[hsl(195,100%,50%)]" />
                    <span className="text-white font-medium">Hotline:</span>
                    <a href="tel:0985636289" className="text-[hsl(195,100%,50%)] hover:text-white transition-colors">
                      0985.636.289
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[hsl(195,100%,50%)]" />
                    <span className="text-white font-medium">Email:</span>
                    <a href="mailto:info@step.com.vn" className="text-[hsl(195,100%,50%)] hover:text-white transition-colors">
                      info@step.com.vn
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[hsl(195,100%,50%)]" />
                    <span className="text-white font-medium">Website:</span>
                    <a href="https://step.com.vn/" target="_blank" rel="noopener noreferrer" className="text-[hsl(195,100%,50%)] hover:text-white transition-colors">
                      step.com.vn
                    </a>
                  </p>
                </div>

                {/* Banking Information */}
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <h4 className="text-white font-semibold mb-3">Thông tin ngân hàng</h4>
                  <div className="space-y-2 text-xs">
                    <p><strong className="text-white">Ngân hàng:</strong> Vietcombank - Chi nhánh Hà Nội</p>
                    <p><strong className="text-white">Số tài khoản:</strong> 0021000374467</p>
                    <p><strong className="text-white">Chủ tài khoản:</strong> CÔNG TY CỔ PHẦN ĐẦU TƯ CÔNG NGHỆ STEP</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Dịch vụ chính</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="/domain" className="hover:text-[hsl(195,100%,50%)] transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Tên miền
                </a></li>
                <li><a href="#" className="hover:text-[hsl(195,100%,50%)] transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Cloud Server
                </a></li>
                <li><a href="#" className="hover:text-[hsl(195,100%,50%)] transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Web Hosting
                </a></li>
                <li><a href="#" className="hover:text-[hsl(195,100%,50%)] transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Máy chủ vật lý
                </a></li>
                <li><a href="#" className="hover:text-[hsl(195,100%,50%)] transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Email doanh nghiệp
                </a></li>
                <li><a href="#" className="hover:text-[hsl(195,100%,50%)] transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Phần mềm bản quyền
                </a></li>
              </ul>
              
              <div className="mt-6 pt-4 border-t border-gray-700">
                <h4 className="text-sm font-semibold text-white mb-3">Tài nguyên</h4>
                <ul className="space-y-2 text-xs text-gray-400">
                  <li><a href="/blog" className="hover:text-[hsl(195,100%,50%)] transition-colors">Blog & Tin tức</a></li>
                  <li><a href="#" className="hover:text-[hsl(195,100%,50%)] transition-colors">Hướng dẫn sử dụng</a></li>
                  <li><a href="#" className="hover:text-[hsl(195,100%,50%)] transition-colors">Tài liệu kỹ thuật</a></li>
                  <li><a href="#" className="hover:text-[hsl(195,100%,50%)] transition-colors">Báo giá dịch vụ</a></li>
                </ul>
              </div>
            </div>

            {/* Social & QR Codes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Kết nối với STEP</h3>
              
              {/* Social Links */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <Facebook className="text-[hsl(195,100%,50%)] h-5 w-5" />
                  <a 
                    href="https://www.facebook.com/profile.php?id=61564705138608" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[hsl(195,100%,50%)] text-sm transition-colors"
                  >
                    Facebook STEP
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="text-[hsl(195,100%,50%)] h-5 w-5" />
                  <a 
                    href="https://zalo.me/93171011934970677" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[hsl(195,100%,50%)] text-sm transition-colors"
                  >
                    Zalo OA STEP
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-[hsl(195,100%,50%)] h-5 w-5" />
                  <a 
                    href="https://maps.app.goo.gl/Tg8mLAs6qHtVpDUZ8" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[hsl(195,100%,50%)] text-sm transition-colors"
                  >
                    Xem bản đồ
                  </a>
                </div>
              </div>

              {/* QR Codes */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-white">Quét mã QR để kết nối</h4>
                <div className="grid grid-cols-2 gap-4">
                  {/* Facebook QR */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white rounded-lg p-2 mx-auto mb-2">
                      <div className="w-full h-full bg-gray-800 rounded flex items-center justify-center">
                        <Facebook className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">Facebook</p>
                  </div>
                  
                  {/* Zalo QR */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white rounded-lg p-2 mx-auto mb-2">
                      <div className="w-full h-full bg-blue-500 rounded flex items-center justify-center">
                        <MessageCircle className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">Zalo OA</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Quét mã để nhận hỗ trợ 24/7
                </p>
              </div>
            </div>

            {/* Map & Additional Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Vị trí văn phòng</h3>
              
              {/* Embedded Map */}
              <div className="mb-6">
                <div className="w-full h-48 bg-gray-800 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6969676037893!2d105.80730731476297!3d21.006388893654447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac76ccbcb26d%3A0x55755dad65ce6fd8!2zOTkgSG_DoG5nIE5nw6JuLCBOaOG6rW4gQ2jDrW5oLCBUaGFuaCBYdcOibiwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1654321234567!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  ></iframe>
                </div>
                <a 
                  href="https://maps.app.goo.gl/Tg8mLAs6qHtVpDUZ8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[hsl(195,100%,50%)] hover:text-white transition-colors"
                >
                  Mở trong Google Maps →
                </a>
              </div>

              {/* Business Hours */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-white">Giờ làm việc</h4>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>Thứ 2 - Thứ 6: 8:00 - 17:30</p>
                  <p>Thứ 7: 8:00 - 12:00</p>
                  <p>Chủ nhật: Nghỉ</p>
                  <p className="text-[hsl(195,100%,50%)] font-medium">Hotline 24/7: 0985.636.289</p>
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
