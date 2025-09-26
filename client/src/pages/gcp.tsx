import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Cloud, 
  Shield, 
  Server, 
  CheckCircle, 
  ArrowRight, 
  Globe, 
  Clock,
  Users,
  Star,
  X,
  Database,
  TrendingUp,
  Lock,
  BarChart3,
  Cpu,
  Zap,
  Settings,
  Monitor,
  Award
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PerformanceBenchmark from "@/components/performance-benchmark";
import EmailPopup from "@/components/email-popup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function GCPPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({
    email: "",
    name: "",
    phone: ""
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectDescription: "",
    package: ""
  });

  const handleEmailSubmit = async (email: string) => {
    console.log('Email submitted for GCP:', email);
    // Integration with email service would go here
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  // Show popup after 10 seconds or 50% scroll
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000);

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent >= 50) {
        setShowPopup(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const benefits = [
    {
      icon: BarChart3,
      title: "BigQuery & AI/ML Mạnh Mẽ",
      description: "Xử lý petabyte data trong giây lát với BigQuery, tích hợp sẵn TensorFlow và AutoML để phân tích dữ liệu thông minh – lý tưởng cho doanh nghiệp cần insights nhanh từ big data mà không cần đầu tư hạ tầng phức tạp."
    },
    {
      icon: Zap,
      title: "Auto-Scaling & Global Network", 
      description: "Tự động mở rộng theo traffic với network backbone tốc độ cao của Google, load balancing thông minh và CDN global – giúp app của bạn phục vụ khách hàng toàn cầu với latency thấp nhất."
    },
    {
      icon: Shield,
      title: "Bảo Mật Zero Trust & BeyondCorp",
      description: "Security-first design với Zero Trust architecture, IAM chi tiết và encryption mặc định cho mọi dữ liệu. Google bảo vệ infrastructure như chính hệ thống của họ – an toàn tối đa cho dữ liệu doanh nghiệp."
    },
    {
      icon: Users,
      title: "Tiết Kiệm Chi Phí & Pay-as-you-use",
      description: "Giá cạnh tranh nhất thị trường với committed use discounts, sustained use discounts tự động và preemptible VMs – tiết kiệm 15-30% so với AWS/Azure mà vẫn đảm bảo performance cao."
    }
  ];

  const gcpAdvantages = [
    {
      icon: Database,
      title: "Data Analytics Vượt Trội",
      description: "BigQuery xử lý SQL queries trên petabyte data trong vài giây, Data Studio miễn phí cho visualization, và Looker cho business intelligence. Lý tưởng cho data-driven companies cần insights thời gian thực."
    },
    {
      icon: Cpu,
      title: "Kubernetes & Container Native",
      description: "Google Kubernetes Engine (GKE) với auto-pilot mode, container registry private và Cloud Run serverless. Deploy và scale microservices dễ dàng, phù hợp cho modern app architecture."
    },
    {
      icon: Cloud,
      title: "Multi-Cloud & Hybrid Support",
      description: "Anthos cho hybrid/multi-cloud deployment, migrate VMs với Migrate for Compute Engine và consistent experience across clouds. Không bị vendor lock-in, linh hoạt tối đa."
    },
    {
      icon: Monitor,
      title: "DevOps & CI/CD Tích Hợp",
      description: "Cloud Build cho CI/CD pipelines, Container Registry, Cloud Source Repositories và monitoring với Stackdriver. Streamline development workflow từ code đến production."
    },
    {
      icon: TrendingUp,
      title: "AI Platform & Machine Learning",
      description: "Vertex AI cho MLOps, pre-trained APIs (Vision, Natural Language, Translation), và TPUs cho training nhanh. Dễ dàng tích hợp AI vào app mà không cần ML expertise sâu."
    },
    {
      icon: Settings,
      title: "Serverless & Managed Services",
      description: "Cloud Functions, Cloud Run, App Engine cho serverless computing. Cloud SQL, Firestore, Cloud Storage fully managed – focus vào business logic thay vì infrastructure management."
    }
  ];

  const packages = [
    {
      name: "Gói Startup",
      price: "2.000.000 VNĐ/tháng",
      storage: "Compute Engine + Cloud Storage",
      features: "2 vCPUs, 8GB RAM, 100GB SSD",
      suitable: "Startup/SME với traffic vừa",
      color: "blue",
      specs: [
        "2 vCPUs, 8GB RAM",
        "100GB SSD Storage",
        "Cloud Load Balancing",
        "Cloud SQL Database",
        "SSL Certificates",
        "$300 Free Credits"
      ]
    },
    {
      name: "Gói Business",
      price: "5.000.000 VNĐ/tháng", 
      storage: "BigQuery + Kubernetes Engine",
      features: "4 vCPUs, 16GB RAM, Auto-scaling",
      suitable: "Doanh nghiệp với data analytics",
      color: "green",
      popular: true,
      specs: [
        "All từ gói Startup",
        "4 vCPUs, 16GB RAM", 
        "BigQuery 1TB Processing",
        "GKE Cluster",
        "Cloud Functions",
        "24/7 Premium Support"
      ]
    },
    {
      name: "Gói Enterprise",
      price: "15.000.000 VNĐ/tháng",
      storage: "Full AI/ML Platform + Multi-region", 
      features: "Custom vCPUs, High Memory, TPUs",
      suitable: "Large enterprise/AI companies",
      color: "purple",
      specs: [
        "All từ gói Business",
        "Custom Machine Types",
        "Vertex AI Platform",
        "TPU Access",
        "Multi-region Deployment",
        "Dedicated Account Manager"
      ]
    }
  ];

  const testimonial = {
    text: "Google Cloud giúp chúng tôi scale từ 100K users lên 10M users mà không cần thay đổi kiến trúc!",
    author: "Anh D., CTO tại Tiki"
  };

  const techFeatures = [
    { name: "BigQuery", icon: BarChart3 },
    { name: "Kubernetes", icon: Settings },
    { name: "Cloud Functions", icon: Zap },
    { name: "Vertex AI", icon: Monitor },
    { name: "Cloud SQL", icon: Database },
    { name: "Load Balancing", icon: Globe }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Main form data:', formData);
    // Handle form submission
    // Contact form removed - navigate to /contact page
  };

  const handlePopupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Popup form data:', popupData);
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-slate-50/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <Cloud className="text-white w-6 h-6" />
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Google Cloud Platform
                </span>
              </div>
              
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Google Cloud Platform – 
                <span className="text-blue-500"> Sức Mạnh AI & Big Data</span> 
                Nâng Tầm Doanh Nghiệp Của Bạn!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Dịch vụ cloud toàn diện với BigQuery xử lý petabyte data, AI Platform training models nhanh gấp 10 lần, 
                và auto-scaling global infrastructure. Dành riêng cho doanh nghiệp cần breakthrough công nghệ AI/ML và big data analytics.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 px-8 py-4 text-lg font-semibold"
                  onClick={() => {
                    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  data-testid="button-check-packages"
                >
                  Kiểm Tra Gói Cloud Phù Hợp
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-4 text-lg"
                  onClick={() => window.location.href = '/contact'}
                  data-testid="button-free-trial"
                >
                  Nhận $300 Credits Miễn Phí
                </Button>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Trải nghiệm ngay BigQuery và Vertex AI với $300 credits!</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 text-green-400 font-mono text-sm">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 ml-4">Google Cloud Console</span>
                </div>
                
                <div className="space-y-2">
                  <div><span className="text-blue-400">$</span> gcloud compute instances create</div>
                  <div><span className="text-blue-400">$</span> bq query "SELECT * FROM dataset"</div>
                  <div><span className="text-blue-400">$</span> kubectl apply -f deployment.yaml</div>
                  <div><span className="text-green-500">✓</span> AI Platform training job started!</div>
                </div>
              </div>

              {/* Tech Stack Icons */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {techFeatures.map((tech, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-4 text-center">
                    <tech.icon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <span className="text-sm font-medium text-gray-700">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tại Sao Chọn Google Cloud Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những ưu thế vượt trội của GCP cho doanh nghiệp Việt Nam
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-100"
                data-testid={`benefit-card-${index}`}
              >
                <div className="flex items-start space-x-6">
                  <div className="bg-blue-100 rounded-xl p-4 flex-shrink-0">
                    <benefit.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GCP Advantages Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tính Năng Nổi Bật Của Google Cloud
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bộ công cụ toàn diện để xây dựng, triển khai và mở rộng ứng dụng
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {gcpAdvantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                data-testid={`advantage-card-${index}`}
              >
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 w-fit mb-4">
                  <advantage.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages Section */}
      <section id="packages" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Gói Dịch Vụ Google Cloud
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Lựa chọn gói phù hợp với quy mô và nhu cầu của doanh nghiệp
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-xl border-2 ${
                  pkg.popular 
                    ? 'border-blue-500 transform scale-105' 
                    : 'border-gray-200'
                } p-8 hover:shadow-2xl transition-all`}
                data-testid={`package-card-${index}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Phổ biến nhất
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{pkg.price}</div>
                  <p className="text-gray-600 text-sm">{pkg.suitable}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.specs.map((spec, specIndex) => (
                    <li key={specIndex} className="flex items-start text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{spec}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full py-3 text-base font-semibold ${
                    pkg.popular
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                  onClick={() => window.location.href = '/contact'}
                  data-testid={`button-choose-package-${index}`}
                >
                  Chọn Gói {pkg.name}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Benchmark Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              So Sánh Hiệu Suất Google Cloud
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Benchmarks thực tế cho các use cases phổ biến
            </p>
          </div>
          
          <PerformanceBenchmark />
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-8 w-8 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-2xl text-gray-900 font-medium mb-8 italic leading-relaxed">
                "{testimonial.text}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-600 text-sm">Vietnam Technology Leader</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Sẵn Sàng Khám Phá Google Cloud Platform?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Nhận $300 credits miễn phí để trải nghiệm BigQuery, Vertex AI và toàn bộ ecosystem Google Cloud.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              onClick={() => window.location.href = '/contact'}
              data-testid="button-get-started"
            >
              Bắt Đầu Ngay
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
              onClick={() => window.location.href = '/contact'}
              data-testid="button-contact-consultant"
            >
              Liên Hệ Tư Vấn
            </Button>
          </div>
        </div>
      </section>

      <Footer />


      {/* Email Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full relative"
          >
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              data-testid="button-close-popup"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cloud className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                🚀 Ưu Đãi Google Cloud!
              </h3>
              <p className="text-gray-600">
                Nhận $300 credits miễn phí + tư vấn setup BigQuery cho doanh nghiệp!
              </p>
            </div>
            
            <form onSubmit={handlePopupSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Họ tên *"
                value={popupData.name}
                onChange={(e) => setPopupData({...popupData, name: e.target.value})}
                required
                data-testid="input-popup-name"
              />
              <Input
                type="email"
                placeholder="Email *"
                value={popupData.email}
                onChange={(e) => setPopupData({...popupData, email: e.target.value})}
                required
                data-testid="input-popup-email"
              />
              <Input
                type="tel"
                placeholder="Số điện thoại *"
                value={popupData.phone}
                onChange={(e) => setPopupData({...popupData, phone: e.target.value})}
                required
                data-testid="input-popup-phone"
              />
              <Button 
                type="submit" 
                className="w-full bg-blue-500 hover:bg-blue-600"
                data-testid="button-popup-submit"
              >
                Nhận Ưu Đãi Ngay
              </Button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Email Popup Component - for consistent experience */}
      <EmailPopup
        discount="$300 Credits"
        title="🚀 Ưu Đãi Google Cloud Platform!"
        description="Đăng ký email để nhận $300 credits miễn phí + setup consultation cho BigQuery và AI Platform!"
        buttonText="Nhận Credits Miễn Phí"
        storageKey="gcp_email_popup_shown"
      />
    </div>
  );
}