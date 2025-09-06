import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  Cloud,
  Server,
  Mail,
  Globe,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Users
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "../components/header";
import Footer from "../components/footer";
import QuoteBuilder from "@/components/quote-builder";
import HostingQuoteCalculator from "@/components/hosting-quote-calculator";
import EmailQuoteCalculator from "@/components/email-quote-calculator";
import DomainQuoteCalculator from "@/components/domain-quote-calculator";

export default function QuotePage() {
  const [activeTab, setActiveTab] = useState("cloud");

  const features = [
    {
      icon: <Calculator className="h-8 w-8 text-[hsl(207,100%,40%)]" />,
      title: "Báo Giá Tự Động",
      description: "Tính toán chi phí chính xác ngay lập tức với công cụ báo giá thông minh"
    },
    {
      icon: <Zap className="h-8 w-8 text-[hsl(207,100%,40%)]" />,
      title: "Cấu Hình Linh Hoạt",
      description: "Tùy chỉnh cấu hình theo nhu cầu với slider kéo thả trực quan"
    },
    {
      icon: <Shield className="h-8 w-8 text-[hsl(207,100%,40%)]" />,
      title: "Giá Cả Minh Bạch",
      description: "Không có phí ẩn, tất cả chi phí được hiển thị rõ ràng"
    },
    {
      icon: <Users className="h-8 w-8 text-[hsl(207,100%,40%)]" />,
      title: "Hỗ Trợ 24/7",
      description: "Đội ngũ chuyên gia sẵn sàng tư vấn và hỗ trợ bạn"
    }
  ];

  const serviceCategories = [
    {
      id: "cloud",
      title: "Cloud Services",
      icon: <Cloud className="h-6 w-6" />,
      description: "Cloud Server, Cloud GPU, Cloud Odoo",
      color: "bg-blue-500"
    },
    {
      id: "hosting",
      title: "Hosting Services",
      icon: <Server className="h-6 w-6" />,
      description: "WordPress, Laravel, NVME, Reseller",
      color: "bg-green-500"
    },
    {
      id: "email",
      title: "Email Services",
      icon: <Mail className="h-6 w-6" />,
      description: "Email Enterprise, Email Server riêng",
      color: "bg-purple-500"
    },
    {
      id: "domain",
      title: "Domain Services",
      icon: <Globe className="h-6 w-6" />,
      description: "Đăng ký, chuyển đổi, quản lý domain",
      color: "bg-orange-500"
    }
  ];

  return (
    <>
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                  Trung Tâm{" "}
                  <span className="text-[hsl(207,100%,40%)]">
                    Báo Giá Trực Tuyến
                  </span>{" "}
                  Chuyên Nghiệp
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Nhận báo giá chính xác cho tất cả dịch vụ IT của chúng tôi. 
                  Chỉ cần kéo thả hoặc điền thông số, hệ thống sẽ tự động tính toán chi phí phù hợp.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => document.getElementById('quote-calculator')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)] text-white text-lg px-8 py-4"
                  >
                    Bắt Đầu Báo Giá
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-[hsl(207,100%,40%)] text-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,40%)] hover:text-white text-lg px-8 py-4"
                  >
                    Tư Vấn Miễn Phí
                  </Button>
                </div>
                
                <div className="flex items-center justify-center mt-8 space-x-8 text-sm text-gray-500">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Báo giá tức thì
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Giá cả minh bạch
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Hỗ trợ 24/7
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Tại Sao Chọn Công Cụ Báo Giá Của STEP?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Được thiết kế để mang lại trải nghiệm báo giá nhanh chóng, chính xác và thuận tiện nhất
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex justify-center mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Calculator Section */}
        <section id="quote-calculator" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Công Cụ Báo Giá Tự Động
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Chọn danh mục dịch vụ và tùy chỉnh cấu hình để nhận báo giá chi tiết
              </p>
            </div>

            {/* Service Categories Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {serviceCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`p-6 rounded-lg text-white cursor-pointer transition-transform hover:scale-105 ${category.color} ${
                    activeTab === category.id ? 'ring-4 ring-white' : ''
                  }`}
                  onClick={() => setActiveTab(category.id)}
                >
                  <div className="flex items-center mb-3">
                    {category.icon}
                    <h3 className="text-lg font-semibold ml-2">{category.title}</h3>
                  </div>
                  <p className="text-sm opacity-90">{category.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Quote Calculator Tabs */}
            <div className="bg-white rounded-lg shadow-lg">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="cloud" className="flex items-center gap-2">
                    <Cloud className="h-4 w-4" />
                    Cloud
                  </TabsTrigger>
                  <TabsTrigger value="hosting" className="flex items-center gap-2">
                    <Server className="h-4 w-4" />
                    Hosting
                  </TabsTrigger>
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="domain" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Domain
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="cloud" className="p-0">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Cloud Services</h3>
                    <p className="text-gray-600 mb-6">
                      Cấu hình Cloud Server, Cloud GPU và Cloud Odoo theo nhu cầu cụ thể
                    </p>
                    <QuoteBuilder />
                  </div>
                </TabsContent>

                <TabsContent value="hosting" className="p-0">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Hosting Services</h3>
                    <p className="text-gray-600 mb-6">
                      Báo giá cho WordPress, Laravel, NVME và Reseller Hosting
                    </p>
                    <HostingQuoteCalculator />
                  </div>
                </TabsContent>

                <TabsContent value="email" className="p-0">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Email Services</h3>
                    <p className="text-gray-600 mb-6">
                      Tính toán chi phí cho Email Enterprise và Email Server riêng
                    </p>
                    <EmailQuoteCalculator />
                  </div>
                </TabsContent>

                <TabsContent value="domain" className="p-0">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Domain Services</h3>
                    <p className="text-gray-600 mb-6">
                      Báo giá đăng ký, chuyển đổi và dịch vụ domain
                    </p>
                    <DomainQuoteCalculator />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[hsl(207,100%,40%)] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Có Câu Hỏi Về Báo Giá?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn chi tiết và hỗ trợ bạn chọn gói phù hợp nhất
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-[hsl(207,100%,40%)] hover:bg-gray-100 text-lg px-8 py-4"
              >
                Liên Hệ Ngay
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[hsl(207,100%,40%)] text-lg px-8 py-4"
              >
                Hotline: 1900-xxxx
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}