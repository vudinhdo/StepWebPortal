import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, 
  Shield, 
  Zap, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Cloud,
  HardDrive,
  Database,
  Clock,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
  Package,
  Server
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function MicrosoftServices() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const submitContact = (serviceName = '') => {
    alert(`Cảm ơn bạn đã quan tâm đến ${serviceName || 'dịch vụ Microsoft'} của chúng tôi! Chúng tôi sẽ liên hệ với bạn trong 24h.`);
  };

  const services = [
    {
      icon: Monitor,
      title: "Windows Licenses",
      description: "Windows 11 bản quyền chính thức với bảo mật cao cấp, hiệu suất tối ưu và hỗ trợ cập nhật liên tục từ Microsoft.",
      features: [
        "Bảo mật nâng cao với Windows Defender tích hợp",
        "Hiệu suất được cải thiện đến 20% so với phiên bản cũ",
        "Giao diện hiện đại với thiết kế Fluent Design",
        "Tương thích hoàn hảo với phần cứng mới nhất",
        "Microsoft Teams và Xbox Game Pass tích hợp",
        "Hỗ trợ đa màn hình và làm việc từ xa"
      ],
      pricing: [
        { name: "Home", price: "2,890,000₫" },
        { name: "Pro", price: "4,490,000₫" },
        { name: "Enterprise", price: "6,990,000₫" }
      ],
      buttonText: "Mua Windows"
    },
    {
      icon: Package,
      title: "Office 365 Licenses", 
      description: "Gói ứng dụng văn phòng hoàn chỉnh với Word, Excel, PowerPoint, Outlook và OneDrive cloud storage dung lượng lớn.",
      features: [
        "Word, Excel, PowerPoint, Outlook phiên bản mới nhất",
        "1TB OneDrive cloud storage cho mỗi người dùng",
        "Microsoft Teams với tính năng họp online cao cấp",
        "Cập nhật tự động và các tính năng mới liên tục",
        "Hỗ trợ đa nền tảng (PC, Mac, Mobile, Web)",
        "Chia sẻ và cộng tác thời gian thực"
      ],
      pricing: [
        { name: "Personal/tháng", price: "159,000₫" },
        { name: "Family/tháng", price: "219,000₫" },
        { name: "Business/tháng", price: "279,000₫" }
      ],
      buttonText: "Mua Office 365"
    },
    {
      icon: Cloud,
      title: "Dịch Vụ Microsoft Khác",
      description: "Các giải pháp Microsoft nâng cao cho doanh nghiệp và tổ chức với nhu cầu đặc biệt và quy mô lớn.",
      features: [
        "Microsoft Azure Cloud Platform - Infrastructure as a Service",
        "Microsoft 365 Enterprise với bảo mật nâng cao",
        "Windows Server Licenses cho datacenter",
        "SQL Server Licenses với hiệu suất cao",
        "Exchange Server cho email doanh nghiệp",
        "Power Platform (Power BI, Power Apps, Power Automate)"
      ],
      pricing: [
        { name: "Azure Cloud", price: "Liên hệ" },
        { name: "Server Licenses", price: "Liên hệ" },
        { name: "Enterprise", price: "Liên hệ" }
      ],
      buttonText: "Tư vấn chi tiết"
    }
  ];

  const faqs = [
    {
      question: "Bản quyền Microsoft có khác gì với bản crack không?",
      answer: "Bản quyền Microsoft đảm bảo tính pháp lý hoàn toàn, bảo mật cao với cập nhật định kỳ, hỗ trợ chính thức từ Microsoft và không có nguy cơ virus/malware. Bản crack có nhiều rủi ro bảo mật, không được cập nhật và vi phạm pháp luật về bản quyền."
    },
    {
      question: "Tôi có thể cài đặt Office 365 trên bao nhiêu thiết bị?",
      answer: "Office 365 Personal cho phép cài đặt trên tối đa 5 thiết bị (PC, Mac, tablet, smartphone). Office 365 Family cho phép mỗi thành viên trong gia đình (tối đa 6 người) cài đặt trên 5 thiết bị riêng của họ, tổng cộng lên đến 30 thiết bị."
    },
    {
      question: "Office 365 có thể sử dụng offline hoàn toàn không?",
      answer: "Có, sau khi cài đặt và kích hoạt, bạn hoàn toàn có thể sử dụng Word, Excel, PowerPoint offline. Tuy nhiên, các tính năng đồng bộ đám mây, OneDrive, và một số template online cần kết nối internet để hoạt động tối ưu."
    },
    {
      question: "Chính sách hoàn tiền và bảo hành như thế nào?",
      answer: "Chúng tôi có chính sách hoàn tiền 100% trong 30 ngày đầu nếu sản phẩm không hoạt động đúng như mô tả. Bản quyền Microsoft được bảo hành trọn đời với hỗ trợ kỹ thuật miễn phí và cập nhật bảo mật thường xuyên."
    },
    {
      question: "Làm thế nào để migrate từ Office cũ sang Office 365?",
      answer: "Chúng tôi hỗ trợ miễn phí toàn bộ quá trình chuyển đổi: gỡ bỏ Office cũ, cài đặt Office 365 mới, và di chuyển dữ liệu. Tất cả file, email, và cài đặt cá nhân của bạn sẽ được bảo toàn và chuyển đổi một cách an toàn."
    },
    {
      question: "Có thể sử dụng cùng lúc trên nhiều hệ điều hành khác nhau không?",
      answer: "Hoàn toàn có thể! Office 365 hỗ trợ đa nền tảng: Windows, macOS, iOS, Android và thậm chí có thể sử dụng qua web browser. Dữ liệu được đồng bộ tự động giữa tất cả các thiết bị thông qua OneDrive."
    }
  ];

  const comparisonData = [
    {
      feature: "Số người dùng",
      personal: "1 người",
      family: "Tối đa 6 người",
      business: "Không giới hạn"
    },
    {
      feature: "Ứng dụng Desktop đầy đủ",
      personal: true,
      family: true,
      business: true
    },
    {
      feature: "OneDrive Cloud Storage",
      personal: "1TB",
      family: "6TB (1TB/người)",
      business: "1TB/người"
    },
    {
      feature: "Microsoft Teams",
      personal: false,
      family: true,
      business: true
    },
    {
      feature: "Outlook Email",
      personal: true,
      family: true,
      business: true
    },
    {
      feature: "Email doanh nghiệp",
      personal: false,
      family: false,
      business: true
    },
    {
      feature: "SharePoint",
      personal: false,
      family: false,
      business: true
    },
    {
      feature: "Admin Console",
      personal: false,
      family: false,
      business: true
    },
    {
      feature: "Hỗ trợ 24/7",
      personal: false,
      family: true,
      business: true
    }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="step-gradient relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 container mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="h1 mb-6 text-white" data-testid="main-title">
              Giải pháp Microsoft cho Doanh nghiệp và Cá nhân
            </h1>
            <p className="lead text-blue-100 max-w-3xl mx-auto" data-testid="hero-description">
              Tối ưu hóa hiệu suất làm việc với các sản phẩm Microsoft bản quyền. 
              Từ Windows đến Office 365, chúng tôi cung cấp giải pháp toàn diện với giá cả cạnh tranh.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-background" data-testid="services-section">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="h2 mb-4 text-foreground" data-testid="services-title">Các Dịch Vụ Chính</h2>
            <p className="lead max-w-3xl mx-auto" data-testid="services-subtitle">
              Lựa chọn sản phẩm Microsoft phù hợp với nhu cầu của bạn với chất lượng bảo đảm và hỗ trợ chuyên nghiệp
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="h3" data-testid={`${service.title.toLowerCase().replace(/\s/g, '-')}-title`}>
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6 text-center" data-testid={`${service.title.toLowerCase().replace(/\s/g, '-')}-description`}>
                      {service.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-muted p-4 rounded-lg mb-6">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        {service.pricing.map((pricing, pricingIndex) => (
                          <div key={pricingIndex}>
                            <div className="font-bold text-primary text-lg" data-testid={`${service.title.toLowerCase().replace(/\s/g, '-')}-price-${pricingIndex}`}>
                              {pricing.price}
                            </div>
                            <div className="text-sm text-muted-foreground">{pricing.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Button 
                        className="w-full"
                        onClick={() => submitContact(service.title)}
                        data-testid={`${service.title.toLowerCase().replace(/\s/g, '-')}-cta`}
                      >
                        {service.buttonText}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section bg-muted" data-testid="comparison-section">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="h2 mb-4" data-testid="comparison-title">Bảng So Sánh Office 365</h2>
            <p className="lead max-w-3xl mx-auto" data-testid="comparison-subtitle">
              So sánh chi tiết các gói Office 365 để lựa chọn phù hợp với nhu cầu sử dụng của bạn
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-primary text-primary-foreground">
                      <th className="text-left p-4 font-bold" data-testid="comparison-feature-header">Tính năng</th>
                      <th className="text-left p-4 font-bold" data-testid="comparison-personal-header">Personal</th>
                      <th className="text-left p-4 font-bold" data-testid="comparison-family-header">Family</th>
                      <th className="text-left p-4 font-bold" data-testid="comparison-business-header">Business</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/50'}>
                        <td className="p-4 font-semibold text-foreground">{row.feature}</td>
                        <td className="p-4" data-testid={`personal-${row.feature.toLowerCase().replace(/\s/g, '-')}`}>
                          {typeof row.personal === 'boolean' ? (
                            row.personal ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <span className="text-red-500 font-bold">✗</span>
                            )
                          ) : (
                            row.personal
                          )}
                        </td>
                        <td className="p-4" data-testid={`family-${row.feature.toLowerCase().replace(/\s/g, '-')}`}>
                          {typeof row.family === 'boolean' ? (
                            row.family ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <span className="text-red-500 font-bold">✗</span>
                            )
                          ) : (
                            row.family
                          )}
                        </td>
                        <td className="p-4" data-testid={`business-${row.feature.toLowerCase().replace(/\s/g, '-')}`}>
                          {typeof row.business === 'boolean' ? (
                            row.business ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <span className="text-red-500 font-bold">✗</span>
                            )
                          ) : (
                            row.business
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-background" data-testid="faq-section">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="h2 mb-4" data-testid="faq-title">Câu Hỏi Thường Gặp</h2>
            <p className="lead max-w-3xl mx-auto" data-testid="faq-subtitle">
              Những câu hỏi phổ biến về việc mua và sử dụng sản phẩm Microsoft bản quyền
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="mb-4">
                  <button
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-muted/50 transition-colors duration-200"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    data-testid={`faq-question-${index + 1}`}
                  >
                    <span className="font-semibold pr-4">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-primary" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-primary" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6" data-testid={`faq-answer-${index + 1}`}>
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}