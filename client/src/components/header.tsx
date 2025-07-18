import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown, ArrowRight } from "lucide-react";
import MegaMenu from "./mega-menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 transition-all duration-300 hover:bg-white/98 hover:shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/attached_assets/logo step_1752797244359.png" 
              alt="STEP Logo" 
              className="h-12 w-auto" 
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-[hsl(207,100%,40%)] transition-colors">
              Trang chủ
            </a>
            <div className="relative group">
              <button className="text-gray-700 hover:text-[hsl(207,100%,40%)] transition-colors flex items-center">
                Sản Phẩm & Dịch Vụ
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <MegaMenu />
            </div>
            <a href="#pricing" className="text-gray-700 hover:text-[hsl(207,100%,40%)] transition-colors">
              Giá cả
            </a>
            <a href="#resources" className="text-gray-700 hover:text-[hsl(207,100%,40%)] transition-colors">
              Tài nguyên
            </a>
            <a href="#contact" className="text-gray-700 hover:text-[hsl(207,100%,40%)] transition-colors">
              Liên hệ
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-700 hover:text-[hsl(207,100%,40%)]">
              Đăng nhập
            </Button>
            <Button className="bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)] text-white">
              Đăng ký
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                <a href="#" className="text-gray-700 hover:text-[hsl(207,100%,40%)] transition-colors">
                  Trang chủ
                </a>
                <a href="#services" className="text-gray-700 hover:text-[hsl(207,100%,40%)] transition-colors">
                  Sản Phẩm & Dịch Vụ
                </a>
                <a href="#pricing" className="text-gray-700 hover:text-[hsl(207,100%,40%)] transition-colors">
                  Giá cả
                </a>
                <a href="#resources" className="text-gray-700 hover:text-[hsl(207,100%,40%)] transition-colors">
                  Tài nguyên
                </a>
                <a href="#contact" className="text-gray-700 hover:text-[hsl(207,100%,40%)] transition-colors">
                  Liên hệ
                </a>
                <div className="pt-4 border-t">
                  <Button variant="ghost" className="w-full justify-start mb-2">
                    Đăng nhập
                  </Button>
                  <Button className="w-full bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)]">
                    Đăng ký
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
