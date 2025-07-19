import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu, ChevronDown, X } from "lucide-react";
import MegaMenu from "./mega-menu";
import MobileMegaMenu from "./mobile-mega-menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/attached_assets/logo step_1752797244359.png" 
              alt="STEP Technology Investment Company" 
              className="h-10 w-auto" 
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a 
              href="/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Trang chủ
            </a>
            <div className="relative group">
              <button 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center"
              >
                Dịch vụ
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <MegaMenu />
            </div>
            <a 
              href="/blog" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Blog
            </a>
            <a 
              href="#contact" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Liên hệ
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
              Đăng nhập
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Đăng ký
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Mở menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <SheetTitle className="sr-only">Menu điều hướng</SheetTitle>
              <SheetDescription className="sr-only">
                Điều hướng trang web STEP Technology
              </SheetDescription>
              
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <img 
                    src="/attached_assets/logo step_1752797244359.png" 
                    alt="STEP Logo" 
                    className="h-8 w-auto" 
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                  <a 
                    href="/" 
                    className="block py-3 text-gray-700 hover:text-[hsl(207,100%,40%)] transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Trang chủ
                  </a>
                  
                  <MobileMegaMenu />
                  
                  <a 
                    href="/blog" 
                    className="block py-3 text-gray-700 hover:text-[hsl(207,100%,40%)] transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Blog
                  </a>
                  <a 
                    href="#contact" 
                    className="block py-3 text-gray-700 hover:text-[hsl(207,100%,40%)] transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Liên hệ
                  </a>
                </nav>

                {/* CTA Buttons */}
                <div className="p-4 border-t space-y-3">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Đăng nhập
                  </Button>
                  <Button 
                    className="w-full bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)] font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Đăng ký
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}