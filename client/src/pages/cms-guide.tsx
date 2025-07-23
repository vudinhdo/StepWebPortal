import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Edit3, Save, User, Home, Settings } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function CMSGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[hsl(207,100%,40%)] mb-4">
                Hướng dẫn sử dụng CMS STEP
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Hướng dẫn chi tiết cách chỉnh sửa nội dung website một cách dễ dàng
              </p>
            </div>

            {/* Thông tin đăng nhập */}
            <Alert className="mb-8 border-green-200 bg-green-50">
              <User className="h-4 w-4" />
              <AlertDescription className="text-green-800">
                <strong>Thông tin đăng nhập CMS:</strong><br/>
                <span className="font-mono bg-white px-2 py-1 rounded">Tài khoản: admin</span> | 
                <span className="font-mono bg-white px-2 py-1 rounded ml-2">Mật khẩu: admin123</span>
              </AlertDescription>
            </Alert>

            {/* Các bước thực hiện */}
            <div className="grid gap-6 mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Các bước thực hiện</h2>
              
              {/* Bước 1 */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-500 text-white p-3 rounded-lg">
                      <User className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">Bước 1: Đăng nhập CMS</CardTitle>
                      <CardDescription>Truy cập trang quản lý để có quyền chỉnh sửa</CardDescription>
                    </div>
                    <Badge>1</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p>• Truy cập: <code className="bg-gray-100 px-2 py-1 rounded">/admin-cms-complete</code></p>
                    <p>• Nhập tài khoản: <code className="bg-gray-100 px-2 py-1 rounded">admin</code></p>
                    <p>• Nhập mật khẩu: <code className="bg-gray-100 px-2 py-1 rounded">admin123</code></p>
                    <p>• Nhấn "Đăng nhập" để vào dashboard</p>
                    <Button asChild className="mt-3">
                      <a href="/admin-cms-complete" target="_blank">
                        Đi đến trang đăng nhập CMS
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Bước 2 */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-green-500 text-white p-3 rounded-lg">
                      <Home className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">Bước 2: Quay về trang chủ</CardTitle>
                      <CardDescription>Sau khi đăng nhập, trở về trang chủ để chỉnh sửa</CardDescription>
                    </div>
                    <Badge>2</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p>• Click vào logo STEP ở góc trái trên</p>
                    <p>• Hoặc truy cập trực tiếp: <code className="bg-gray-100 px-2 py-1 rounded">/</code></p>
                    <p>• Bạn sẽ thấy trang chủ với khả năng chỉnh sửa</p>
                    <Button variant="outline" asChild className="mt-3">
                      <a href="/" target="_blank">
                        Mở trang chủ
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Bước 3 */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-500 text-white p-3 rounded-lg">
                      <Edit3 className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">Bước 3: Chỉnh sửa nội dung</CardTitle>
                      <CardDescription>Nhấp vào các phần tử để chỉnh sửa trực tiếp</CardDescription>
                    </div>
                    <Badge>3</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p>• <strong>Tiêu đề chính:</strong> Nhấp vào tiêu đề lớn ở đầu trang</p>
                    <p>• <strong>Mô tả:</strong> Nhấp vào đoạn văn dưới tiêu đề</p>
                    <p>• Khi nhấp, sẽ xuất hiện hộp thoại chỉnh sửa</p>
                    <p>• Thay đổi nội dung theo ý muốn</p>
                    <Alert className="mt-3 border-blue-200 bg-blue-50">
                      <AlertDescription className="text-blue-800">
                        <strong>Mẹo:</strong> Chỉ những phần tử có thể chỉnh sửa mới hiển thị hiệu ứng hover khi bạn di chuột qua
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>

              {/* Bước 4 */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-500 text-white p-3 rounded-lg">
                      <Save className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">Bước 4: Lưu thay đổi</CardTitle>
                      <CardDescription>Lưu các thay đổi vào cơ sở dữ liệu</CardDescription>
                    </div>
                    <Badge>4</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p>• Nhấn nút <strong className="text-green-600">"✓ Lưu"</strong> để lưu thay đổi</p>
                    <p>• Hoặc nhấn <strong className="text-gray-600">"✕ Hủy"</strong> để bỏ qua</p>
                    <p>• Thay đổi sẽ hiển thị ngay lập tức</p>
                    <p>• Tất cả thay đổi được lưu vào database</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quản lý từ Dashboard */}
            <Card className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-indigo-700">
                  <Settings className="w-5 h-5" />
                  Quản lý từ Dashboard CMS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Ngoài chỉnh sửa trực tiếp, bạn có thể quản lý toàn bộ nội dung từ dashboard:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-lg border">
                    <h3 className="font-semibold text-blue-600 mb-2">📝 Quản lý bài viết</h3>
                    <p className="text-sm text-gray-600">Thêm, sửa, xóa bài viết blog và tin tức</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <h3 className="font-semibold text-green-600 mb-2">📄 Quản lý trang</h3>
                    <p className="text-sm text-gray-600">Chỉnh sửa nội dung từng trang website</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <h3 className="font-semibold text-purple-600 mb-2">🔗 Quản lý menu</h3>
                    <p className="text-sm text-gray-600">Cập nhật cấu trúc menu và liên kết</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bắt đầu ngay */}
            <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Sẵn sàng bắt đầu?</h2>
                <p className="text-blue-100 mb-6">
                  Hãy thử chỉnh sửa nội dung ngay bây giờ với 4 bước đơn giản
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    <a href="/admin-cms-complete" target="_blank">
                      <User className="w-4 h-4 mr-2" />
                      Đăng nhập CMS
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                    <a href="/" target="_blank">
                      <Home className="w-4 h-4 mr-2" />
                      Về trang chủ
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}