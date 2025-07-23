import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Edit3, Save, X, Info, CheckCircle, Play } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function InlineEditingGuide() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Bước 1: Đăng nhập CMS",
      description: "Trước tiên, bạn cần đăng nhập vào hệ thống CMS",
      details: [
        "Truy cập /admin-cms-complete",
        "Sử dụng tài khoản: admin / admin123",
        "Sau khi đăng nhập, bạn sẽ thấy dashboard quản lý"
      ],
      icon: <Edit3 className="w-6 h-6" />,
      color: "bg-blue-500"
    },
    {
      title: "Bước 2: Quay về trang chủ",
      description: "Sau khi đăng nhập, trở về trang chủ để chỉnh sửa",
      details: [
        "Click vào logo STEP hoặc truy cập /",
        "Bạn sẽ thấy trang chủ bình thường",
        "Khi đã login, các phần tử có thể chỉnh sửa sẽ xuất hiện"
      ],
      icon: <ArrowRight className="w-6 h-6" />,
      color: "bg-green-500"
    },
    {
      title: "Bước 3: Chỉnh sửa nội dung",
      description: "Nhấp vào các phần tử để chỉnh sửa trực tiếp",
      details: [
        "Nhấp vào tiêu đề hoặc đoạn văn để chỉnh sửa",
        "Một hộp thoại sẽ xuất hiện với nội dung hiện tại",
        "Chỉnh sửa nội dung theo ý muốn"
      ],
      icon: <Edit3 className="w-6 h-6" />,
      color: "bg-orange-500"
    },
    {
      title: "Bước 4: Lưu thay đổi",
      description: "Lưu các thay đổi vào cơ sở dữ liệu",
      details: [
        "Nhấp nút 'Lưu' để lưu thay đổi",
        "Hoặc nhấp 'Hủy' để bỏ qua thay đổi",
        "Thay đổi sẽ hiển thị ngay lập tức"
      ],
      icon: <Save className="w-6 h-6" />,
      color: "bg-purple-500"
    }
  ];

  const editableElements = [
    {
      name: "Tiêu đề chính",
      location: "Phần Hero - Trang chủ",
      description: "Tiêu đề lớn ở đầu trang chủ",
      elementId: "main-title"
    },
    {
      name: "Mô tả phụ",
      location: "Phần Hero - Trang chủ", 
      description: "Đoạn mô tả dưới tiêu đề chính",
      elementId: "subtitle"
    },
    {
      name: "Nội dung dịch vụ",
      location: "Các trang dịch vụ",
      description: "Mô tả và thông tin về từng dịch vụ",
      elementId: "service-content"
    }
  ];

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
                Hướng dẫn chỉnh sửa nội dung trực tiếp
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Học cách chỉnh sửa nội dung trên website STEP một cách đơn giản và nhanh chóng
              </p>
            </div>

            {/* Alert quan trọng */}
            <Alert className="mb-8 border-blue-200 bg-blue-50">
              <Info className="h-4 w-4" />
              <AlertDescription className="text-blue-800">
                <strong>Lưu ý quan trọng:</strong> Bạn cần đăng nhập CMS trước khi có thể chỉnh sửa nội dung. 
                Chỉ những người có quyền admin mới có thể thực hiện chỉnh sửa.
              </AlertDescription>
            </Alert>

            {/* Các bước thực hiện */}
            <div className="grid gap-6 mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Các bước thực hiện</h2>
              
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`transition-all duration-300 ${
                    currentStep === index ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
                  }`}>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className={`${step.color} text-white p-3 rounded-lg`}>
                          {step.icon}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                          <CardDescription>{step.description}</CardDescription>
                        </div>
                        <Badge variant={currentStep === index ? "default" : "secondary"}>
                          {index + 1}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    {currentStep === index && (
                      <CardContent>
                        <ul className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-gray-700">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Điều khiển bước */}
            <div className="flex justify-center gap-4 mb-12">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Bước trước
              </Button>
              <Button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep === steps.length - 1}
              >
                Bước tiếp theo
              </Button>
            </div>

            {/* Các phần tử có thể chỉnh sửa */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Các phần tử có thể chỉnh sửa</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {editableElements.map((element, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg text-[hsl(207,100%,40%)]">
                          {element.name}
                        </CardTitle>
                        <CardDescription>
                          <Badge variant="secondary" className="mb-2">
                            {element.location}
                          </Badge>
                          <br />
                          {element.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Hướng dẫn nhanh */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Play className="w-5 h-5" />
                  Bắt đầu ngay
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">1. Đăng nhập CMS</h3>
                    <Button asChild className="w-full">
                      <a href="/admin-cms-complete">
                        Đi đến trang đăng nhập CMS
                      </a>
                    </Button>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">2. Trở về trang chủ</h3>
                    <Button variant="outline" asChild className="w-full">
                      <a href="/">
                        Về trang chủ để chỉnh sửa
                      </a>
                    </Button>
                  </div>
                </div>
                
                <Alert className="mt-4 border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription className="text-green-800">
                    Sau khi đăng nhập, bạn có thể nhấp vào bất kỳ tiêu đề hoặc đoạn văn nào để chỉnh sửa trực tiếp!
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}