import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Layout, Mail, Home } from "lucide-react";
import { SiGoogle, SiFacebook, SiGithub } from "react-icons/si";
import { Link } from "wouter";

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Layout className="w-8 h-8 text-gray-900" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">STEP CMS</h1>
          <p className="text-gray-400">Hệ thống quản trị nội dung</p>
        </div>

        <Card className="bg-white/95 backdrop-blur shadow-2xl border-0">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl">Đăng nhập</CardTitle>
            <CardDescription>
              Sử dụng tài khoản để truy cập hệ thống quản trị
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <a href="/api/login" className="block w-full">
              <Button 
                className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm"
                variant="outline"
                data-testid="login-google"
              >
                <SiGoogle className="w-5 h-5 mr-3 text-red-500" />
                Đăng nhập bằng Google
              </Button>
            </a>
            
            <a href="/api/login" className="block w-full">
              <Button 
                className="w-full h-12 bg-[#4267B2] hover:bg-[#365899] text-white"
                data-testid="login-facebook"
              >
                <SiFacebook className="w-5 h-5 mr-3" />
                Đăng nhập bằng Facebook
              </Button>
            </a>

            <a href="/api/login" className="block w-full">
              <Button 
                className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white"
                data-testid="login-github"
              >
                <SiGithub className="w-5 h-5 mr-3" />
                Đăng nhập bằng GitHub
              </Button>
            </a>

            <div className="relative my-6">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-500">
                hoặc
              </span>
            </div>

            <a href="/api/login" className="block w-full">
              <Button 
                className="w-full h-12"
                variant="outline"
                data-testid="login-email"
              >
                <Mail className="w-5 h-5 mr-3" />
                Đăng nhập bằng Email
              </Button>
            </a>

            <div className="pt-4">
              <Link href="/">
                <Button 
                  variant="ghost" 
                  className="w-full text-gray-500 hover:text-gray-700"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Quay về trang chủ
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-gray-500 text-sm mt-6">
          Bằng việc đăng nhập, bạn đồng ý với{" "}
          <a href="#" className="text-gray-300 hover:text-white underline">
            Điều khoản sử dụng
          </a>
        </p>
      </div>
    </div>
  );
}
