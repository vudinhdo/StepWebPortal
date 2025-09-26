import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, LineChart, Line, AreaChart, Area, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { 
  Zap, Clock, Database, Shield, TrendingUp, Server, 
  Cpu, HardDrive, Wifi, Activity, CheckCircle, ArrowRight 
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

// Performance data for different hosting plans
const responseTimeData = [
  { metric: "HTML Load", Basic: 850, Advanced: 420, Pro: 180, Enterprise: 95 },
  { metric: "Database Query", Basic: 320, Advanced: 180, Pro: 85, Enterprise: 45 },
  { metric: "API Response", Basic: 280, Advanced: 150, Pro: 75, Enterprise: 35 },
  { metric: "Image Loading", Basic: 1200, Advanced: 650, Pro: 280, Enterprise: 140 },
  { metric: "CSS/JS Load", Basic: 950, Advanced: 480, Pro: 220, Enterprise: 110 }
];

const throughputData = [
  { metric: "Concurrent Requests", Basic: 500, Advanced: 2000, Pro: 8000, Enterprise: 20000 },
  { metric: "Peak Capacity", Basic: 1000, Advanced: 4500, Pro: 15000, Enterprise: 35000 },
  { metric: "Avg Requests/sec", Basic: 250, Advanced: 800, Pro: 2500, Enterprise: 6000 },
  { metric: "Data Transfer", Basic: 10, Advanced: 50, Pro: 200, Enterprise: 500 }
];

const resourceUsageData = [
  { plan: "Basic", CPU: 65, RAM: 70, Disk: 45, Network: 40, Memory: 60 },
  { plan: "Advanced", CPU: 45, RAM: 50, Disk: 30, Network: 60, Memory: 40 },
  { plan: "Pro", CPU: 25, RAM: 30, Disk: 20, Network: 80, Memory: 25 },
  { plan: "Enterprise", CPU: 15, RAM: 20, Disk: 15, Network: 90, Memory: 18 }
];

const uptimeData = [
  { month: "Jan", Basic: 98.5, Advanced: 99.2, Pro: 99.8, Enterprise: 99.95 },
  { month: "Feb", Basic: 98.2, Advanced: 99.1, Pro: 99.7, Enterprise: 99.97 },
  { month: "Mar", Basic: 98.8, Advanced: 99.3, Pro: 99.9, Enterprise: 99.96 },
  { month: "Apr", Basic: 98.4, Advanced: 99.0, Pro: 99.8, Enterprise: 99.98 },
  { month: "May", Basic: 98.9, Advanced: 99.4, Pro: 99.9, Enterprise: 99.97 },
  { month: "Jun", Basic: 98.6, Advanced: 99.2, Pro: 99.8, Enterprise: 99.95 }
];

const securityData = [
  { metric: "DDoS Protection", Basic: 70, Advanced: 85, Pro: 95, Enterprise: 99 },
  { metric: "SSL Performance", Basic: 80, Advanced: 90, Pro: 97, Enterprise: 99 },
  { metric: "Malware Scanning", Basic: 60, Advanced: 80, Pro: 95, Enterprise: 98 },
  { metric: "Backup Speed", Basic: 40, Advanced: 70, Pro: 90, Enterprise: 95 },
  { metric: "Recovery Time", Basic: 50, Advanced: 75, Pro: 90, Enterprise: 97 }
];

const planFeatures = {
  Basic: {
    price: "200K VNĐ/tháng",
    color: "#8884d8",
    features: ["1 CPU Core", "2GB RAM", "20GB SSD", "100GB Bandwidth", "Basic Support"],
    bestFor: "Websites nhỏ, blog cá nhân"
  },
  Advanced: {
    price: "500K VNĐ/tháng", 
    color: "#82ca9d",
    features: ["2 CPU Cores", "4GB RAM", "50GB SSD", "500GB Bandwidth", "Priority Support"],
    bestFor: "Doanh nghiệp vừa, e-commerce"
  },
  Pro: {
    price: "1.2M VNĐ/tháng",
    color: "#ffc658", 
    features: ["4 CPU Cores", "8GB RAM", "100GB SSD", "1TB Bandwidth", "24/7 Support"],
    bestFor: "Ứng dụng cao tải, API services"
  },
  Enterprise: {
    price: "2.5M VNĐ/tháng",
    color: "#ff7300",
    features: ["8 CPU Cores", "16GB RAM", "200GB SSD", "Unlimited Bandwidth", "Dedicated Support"],
    bestFor: "Enterprise applications, mission-critical"
  }
};

export default function PerformanceBenchmark() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const formatTooltip = (value: any, name: string) => {
    if (name.includes("Time") || name.includes("Response")) {
      return [`${value}ms`, name];
    }
    if (name.includes("Uptime")) {
      return [`${value}%`, name];
    }
    return [value, name];
  };

  const PlanRecommendation = ({ plan }: { plan: string }) => (
    <Card className="border-2 border-dashed border-blue-200 bg-blue-50/30">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle className="h-5 w-5 text-blue-600" />
          <span className="font-semibold text-blue-800">Recommended: {plan}</span>
        </div>
        <p className="text-sm text-blue-700 mb-3">{planFeatures[plan as keyof typeof planFeatures].bestFor}</p>
        <Button 
          onClick={() => window.location.href = '/contact'}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Tư vấn gói {plan}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              Performance Analytics
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              So Sánh Hiệu Suất
              <span className="block text-blue-200">Hosting Plans</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Dữ liệu thực tế từ hệ thống monitoring 24/7. So sánh chi tiết hiệu suất, 
              tài nguyên và độ tin cậy của các gói hosting STEP.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {Object.entries(planFeatures).map(([plan, info]) => (
                <div key={plan} className="text-center">
                  <div className="text-2xl font-bold">{plan}</div>
                  <div className="text-blue-200 text-sm">{info.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Performance Charts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="response-time" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-2xl grid-cols-5">
                <TabsTrigger value="response-time" className="text-xs">Response Time</TabsTrigger>
                <TabsTrigger value="throughput" className="text-xs">Throughput</TabsTrigger>
                <TabsTrigger value="resources" className="text-xs">Resources</TabsTrigger>
                <TabsTrigger value="uptime" className="text-xs">Uptime</TabsTrigger>
                <TabsTrigger value="security" className="text-xs">Security</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="response-time" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Response Time Analysis</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Thời gian phản hồi trung bình của các thành phần website. Số liệu thấp hơn = hiệu suất tốt hơn.
                </p>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Response Time Comparison (milliseconds)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={responseTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="metric" />
                      <YAxis />
                      <Tooltip formatter={formatTooltip} />
                      <Legend />
                      <Bar dataKey="Basic" fill="#8884d8" />
                      <Bar dataKey="Advanced" fill="#82ca9d" />
                      <Bar dataKey="Pro" fill="#ffc658" />
                      <Bar dataKey="Enterprise" fill="#ff7300" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <PlanRecommendation plan="Pro" />
            </TabsContent>

            <TabsContent value="throughput" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Throughput Performance</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Khả năng xử lý tải và lưu lượng truy cập đồng thời. Số liệu cao hơn = hiệu suất tốt hơn.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Throughput Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={throughputData} layout="horizontal" margin={{ top: 20, right: 30, left: 100, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="metric" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Basic" fill="#8884d8" />
                      <Bar dataKey="Advanced" fill="#82ca9d" />
                      <Bar dataKey="Pro" fill="#ffc658" />
                      <Bar dataKey="Enterprise" fill="#ff7300" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <PlanRecommendation plan="Advanced" />
            </TabsContent>

            <TabsContent value="resources" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Resource Usage Analysis</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Mức độ sử dụng tài nguyên hệ thống. Số liệu thấp hơn = tối ưu hóa tốt hơn.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-purple-600" />
                    Resource Utilization Radar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={500}>
                    <RadarChart data={resourceUsageData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="plan" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar name="CPU" dataKey="CPU" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Radar name="RAM" dataKey="RAM" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                      <Radar name="Disk I/O" dataKey="Disk" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                      <Radar name="Network" dataKey="Network" stroke="#ff7300" fill="#ff7300" fillOpacity={0.6} />
                      <Radar name="Memory" dataKey="Memory" stroke="#8dd1e1" fill="#8dd1e1" fillOpacity={0.6} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <PlanRecommendation plan="Enterprise" />
            </TabsContent>

            <TabsContent value="uptime" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Uptime Tracking</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Thống kê thời gian hoạt động 6 tháng gần nhất. Số liệu cao hơn = độ tin cậy tốt hơn.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    6-Month Uptime History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={uptimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[97, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Uptime']} />
                      <Legend />
                      <Area type="monotone" dataKey="Basic" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="Advanced" stackId="2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="Pro" stackId="3" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="Enterprise" stackId="4" stroke="#ff7300" fill="#ff7300" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Object.entries(planFeatures).map(([plan, info]) => (
                  <Card key={plan} className="text-center">
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {uptimeData[uptimeData.length - 1][plan as keyof typeof uptimeData[0]]}%
                      </div>
                      <div className="text-sm text-gray-500 mb-2">{plan} Plan</div>
                      <div className="text-xs text-gray-400">
                        Downtime: {((100 - Number(uptimeData[uptimeData.length - 1][plan as keyof typeof uptimeData[0]])) * 7.2).toFixed(1)}h/month
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <PlanRecommendation plan="Pro" />
            </TabsContent>

            <TabsContent value="security" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Security & Backup Performance</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Điểm số bảo mật và hiệu suất backup/recovery. Số liệu cao hơn = bảo mật tốt hơn.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-red-600" />
                    Security Performance Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={securityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="metric" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                      <Legend />
                      <Line type="monotone" dataKey="Basic" stroke="#8884d8" strokeWidth={3} />
                      <Line type="monotone" dataKey="Advanced" stroke="#82ca9d" strokeWidth={3} />
                      <Line type="monotone" dataKey="Pro" stroke="#ffc658" strokeWidth={3} />
                      <Line type="monotone" dataKey="Enterprise" stroke="#ff7300" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <PlanRecommendation plan="Enterprise" />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Plan Selection Interface */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Chọn Gói Hosting Phù Hợp</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dựa trên dữ liệu hiệu suất thực tế để chọn gói hosting tối ưu cho dự án của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(planFeatures).map(([plan, info]) => (
              <Card 
                key={plan} 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedPlan === plan ? 'ring-2 ring-blue-500 shadow-lg' : ''
                }`}
                onClick={() => setSelectedPlan(selectedPlan === plan ? null : plan)}
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan}</CardTitle>
                  <div className="text-2xl font-bold text-blue-600">{info.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {info.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="text-xs text-gray-500 mb-4">{info.bestFor}</div>
                  <Button 
                    className="w-full" 
                    variant={selectedPlan === plan ? "default" : "outline"}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = '/contact';
                    }}
                  >
                    {selectedPlan === plan ? "Đã chọn" : "Chọn gói này"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Summary */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Tóm Tắt Hiệu Suất</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Zap className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Tốc Độ Vượt Trội</h3>
                <p className="text-gray-600">Enterprise plan nhanh hơn Basic plan tới 8.9x trong response time</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Database className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Khả Năng Mở Rộng</h3>
                <p className="text-gray-600">Hỗ trợ từ 500 đến 35,000 concurrent requests</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Shield className="h-10 w-10 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Độ Tin Cậy Cao</h3>
                <p className="text-gray-600">Uptime lên đến 99.98% với Enterprise plan</p>
              </div>
            </div>

            <Button 
              size="lg" 
              onClick={() => window.location.href = '/contact'}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Tư vấn miễn phí về hiệu suất hosting
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
}