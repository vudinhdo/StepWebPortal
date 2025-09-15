import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Globe, 
  Shield, 
  Settings, 
  CheckCircle, 
  ArrowRight, 
  Lock,
  Zap,
  Users,
  Database,
  Clock,
  Star
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import DomainContactForm from "@/components/domain-contact-form";

export default function Domain() {
  const [searchDomain, setSearchDomain] = useState("");
  const [selectedTld, setSelectedTld] = useState(".com");

  const tlds = [
    { name: ".com", price: "299,000", popular: true },
    { name: ".vn", price: "450,000", popular: true },
    { name: ".net", price: "350,000", popular: false },
    { name: ".org", price: "320,000", popular: false },
    { name: ".info", price: "280,000", popular: false },
    { name: ".biz", price: "400,000", popular: false },
  ];

  const features = [
    {
      icon: Globe,
      title: "Đăng ký tên miền",
      subtitle: "Bảo vệ thương hiệu của bạn",
      description: "Đăng ký tên miền dễ dàng với hơn 500+ phần mở rộng tên miền. Quy trình đăng ký nhanh chóng, bảo mật và được hỗ trợ 24/7.",
      benefits: [
        "Hơn 500+ phần mở rộng tên miền",
        "Đăng ký tức thời, kích hoạt ngay",
        "Hỗ trợ đa ngôn ngữ (IDN)",
        "Giá cạnh tranh, minh bạch"
      ],
      color: "blue"
    },
    {
      icon: ArrowRight,
      title: "Chuyển tên miền",
      subtitle: "Di chuyển an toàn, nhanh chóng",
      description: "Chuyển tên miền từ nhà cung cấp khác một cách an toàn và miễn phí. Không có thời gian downtime, đảm bảo dịch vụ liên tục.",
      benefits: [
        "Miễn phí chuyển tên miền",
        "Bảo đảm 0% downtime",
        "Hỗ trợ kỹ thuật chuyên nghiệp",
        "Gia hạn miễn phí 1 năm"
      ],
      color: "green"
    },
    {
      icon: Settings,
      title: "Quản lý DNS",
      subtitle: "Kiểm soát hoàn toàn DNS",
      description: "Quản lý DNS chuyên nghiệp với giao diện trực quan. Cấu hình A, CNAME, MX, TXT records một cách dễ dàng với hiệu suất cao.",
      benefits: [
        "DNS global với 99.9% uptime",
        "Quản lý records trực quan",
        "DNS secondaries miễn phí",
        "DNSSEC bảo mật nâng cao"
      ],
      color: "purple"
    },
    {
      icon: Shield,
      title: "Bảo vệ tên miền",
      subtitle: "An toàn tuyệt đối",
      description: "Bảo vệ tên miền khỏi các mối đe dọa với dịch vụ bảo mật toàn diện. Domain Lock, Privacy Protection và SSL miễn phí.",
      benefits: [
        "Domain Lock chống chuyển nhượng",
        "WHOIS Privacy Protection",
        "SSL Certificate miễn phí",
        "Monitoring 24/7"
      ],
      color: "orange"
    }
  ];

  const stats = [
    { value: "2M+", label: "Tên miền được quản lý" },
    { value: "99.9%", label: "Thời gian hoạt động" },
    { value: "24/7", label: "Hỗ trợ kỹ thuật" },
    { value: "500+", label: "Phần mở rộng tên miền" }
  ];

  const testimonials = [
    {
      name: "Nguyễn Văn A",
      company: "ABC Technology",
      content: "STEP đã giúp chúng tôi quản lý hơn 50 tên miền một cách hiệu quả. Dịch vụ DNS nhanh chóng và ổn định.",
      rating: 5
    },
    {
      name: "Trần Thị B",
      company: "XYZ Corp",
      content: "Quá trình chuyển tên miền rất mượt mà, không có downtime nào. Đội ngũ hỗ trợ rất chuyên nghiệp.",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Cơ bản",
      price: "0",
      period: "miễn phí",
      features: [
        "DNS cơ bản",
        "1 tên miền",
        "Hỗ trợ email",
        "SSL miễn phí"
      ],
      popular: false
    },
    {
      name: "Chuyên nghiệp",
      price: "199,000",
      period: "tháng",
      features: [
        "DNS nâng cao",
        "Không giới hạn tên miền",
        "Hỗ trợ 24/7",
        "DNSSEC",
        "Monitoring",
        "API access"
      ],
      popular: true
    },
    {
      name: "Doanh nghiệp",
      price: "Liên hệ",
      period: "tùy chỉnh",
      features: [
        "Tất cả tính năng Pro",
        "SLA 99.99%",
        "Dedicated support",
        "Custom DNS servers",
        "Advanced analytics"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="h1 text-gray-900 mb-6">
              Dịch vụ <span className="text-[hsl(207,100%,40%)]">Tên miền</span> chuyên nghiệp
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Đăng ký, chuyển nhượng và quản lý tên miền với độ tin cậy cao. 
              Được tin tưởng bởi hơn 10,000+ doanh nghiệp tại Việt Nam.
            </p>
            
            {/* Domain Search */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="h3 text-gray-900 mb-4">Kiểm tra tên miền khả dụng</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Nhập tên miền bạn muốn..."
                      value={searchDomain}
                      onChange={(e) => setSearchDomain(e.target.value)}
                      className="pl-10 h-12 text-lg"
                    />
                  </div>
                  <select 
                    value={selectedTld}
                    onChange={(e) => setSelectedTld(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg font-medium"
                  >
                    {tlds.map((tld) => (
                      <option key={tld.name} value={tld.name}>
                        {tld.name} - {tld.price}đ
                      </option>
                    ))}
                  </select>
                  <Button className="bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)] h-12 px-8">
                    Kiểm tra
                  </Button>
                </div>
                
                {/* Popular TLDs */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-sm text-gray-600">Phổ biến:</span>
                  {tlds.filter(tld => tld.popular).map((tld) => (
                    <Badge key={tld.name} variant="secondary" className="cursor-pointer hover:bg-blue-100">
                      {tld.name} - {tld.price}đ
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="h3 text-[hsl(207,100%,40%)] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="h2 text-gray-900 mb-4">
              Dịch vụ tên miền toàn diện
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Từ đăng ký đến quản lý, chúng tôi cung cấp giải pháp tên miền hoàn chỉnh 
              cho mọi nhu cầu doanh nghiệp
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center
                      ${feature.color === 'blue' ? 'bg-blue-100 text-blue-600' : ''}
                      ${feature.color === 'green' ? 'bg-green-100 text-green-600' : ''}
                      ${feature.color === 'purple' ? 'bg-purple-100 text-purple-600' : ''}
                      ${feature.color === 'orange' ? 'bg-orange-100 text-orange-600' : ''}
                    `}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-gray-900 mb-2">{feature.title}</CardTitle>
                      <p className="text-sm text-gray-600 font-medium">{feature.subtitle}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" className="mt-6 whitespace-nowrap text-[hsl(207,100%,40%)] hover:text-[hsl(207,100%,35%)]">
                    Tìm hiểu thêm <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="h2 text-gray-900 mb-4">Bảng giá dịch vụ</h2>
            <p className="text-xl text-gray-600">Chọn gói dịch vụ phù hợp với nhu cầu của bạn</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative border-2 ${plan.popular ? 'border-[hsl(207,100%,40%)] shadow-xl' : 'border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[hsl(207,100%,40%)] text-white px-4 py-1">Phổ biến nhất</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl text-gray-900 mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="h3 text-gray-900">{plan.price}</span>
                    {plan.price !== "Liên hệ" && plan.price !== "0" && <span className="text-gray-600">đ</span>}
                    <span className="text-gray-600 ml-1">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full whitespace-nowrap ${plan.popular 
                      ? 'bg-[hsl(207,100%,40%)] hover:bg-[hsl(207,100%,35%)] text-white' 
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.price === "Liên hệ" ? "Liên hệ tư vấn" : "Bắt đầu ngay"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="h2 text-gray-900 mb-4">Khách hàng nói gì về chúng tôi</h2>
            <p className="text-xl text-gray-600">Được tin tưởng bởi hàng nghìn doanh nghiệp</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Domain Contact Form CTA */}
      <DomainContactForm />

      <Footer />
    </div>
  );
}