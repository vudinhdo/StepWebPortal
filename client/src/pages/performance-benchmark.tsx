import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";
import { Clock, Zap, Server, Shield, TrendingUp, Award, CheckCircle, Target } from "lucide-react";
import { PerformanceComparison } from "@/components/performance-comparison";
import ContactForm from "@/components/contact-form";

// Sample performance data
const responseTimeData = [
  { name: 'HTML Load', Basic: 450, Advanced: 280, Pro: 180, Enterprise: 120 },
  { name: 'Database Query', Basic: 320, Advanced: 180, Pro: 120, Enterprise: 80 },
  { name: 'API Response', Basic: 280, Advanced: 150, Pro: 90, Enterprise: 60 },
  { name: 'Image Loading', Basic: 1200, Advanced: 800, Pro: 500, Enterprise: 300 },
  { name: 'CSS/JS Bundle', Basic: 850, Advanced: 550, Pro: 350, Enterprise: 200 }
];

const throughputData = [
  { name: 'Concurrent Requests', Basic: 100, Advanced: 500, Pro: 1500, Enterprise: 5000 },
  { name: 'Peak Capacity', Basic: 150, Advanced: 800, Pro: 2500, Enterprise: 8000 },
  { name: 'Average Load', Basic: 80, Advanced: 400, Pro: 1200, Enterprise: 4000 },
  { name: 'Burst Handling', Basic: 120, Advanced: 600, Pro: 1800, Enterprise: 6000 }
];

const resourceUsageData = [
  { plan: 'Basic', CPU: 40, RAM: 35, 'Disk I/O': 30, Network: 25, Memory: 40 },
  { plan: 'Advanced', CPU: 65, RAM: 70, 'Disk I/O': 75, Network: 80, Memory: 70 },
  { plan: 'Pro', CPU: 85, RAM: 90, 'Disk I/O': 95, Network: 95, Memory: 90 },
  { plan: 'Enterprise', CPU: 98, RAM: 98, 'Disk I/O': 99, Network: 99, Memory: 98 }
];

const uptimeData = [
  { month: 'T7', Basic: 99.2, Advanced: 99.7, Pro: 99.9, Enterprise: 99.95 },
  { month: 'T8', Basic: 99.1, Advanced: 99.8, Pro: 99.9, Enterprise: 99.96 },
  { month: 'T9', Basic: 99.3, Advanced: 99.7, Pro: 99.95, Enterprise: 99.97 },
  { month: 'T10', Basic: 99.0, Advanced: 99.6, Pro: 99.9, Enterprise: 99.95 },
  { month: 'T11', Basic: 99.4, Advanced: 99.8, Pro: 99.95, Enterprise: 99.98 },
  { month: 'T12', Basic: 99.2, Advanced: 99.7, Pro: 99.9, Enterprise: 99.96 }
];

const securityData = [
  { feature: 'DDoS Protection', Basic: 60, Advanced: 85, Pro: 95, Enterprise: 99 },
  { feature: 'SSL Performance', Basic: 70, Advanced: 90, Pro: 95, Enterprise: 98 },
  { feature: 'Malware Scanning', Basic: 50, Advanced: 80, Pro: 90, Enterprise: 95 },
  { feature: 'Backup Speed', Basic: 40, Advanced: 70, Pro: 85, Enterprise: 95 },
  { feature: 'Recovery Time', Basic: 45, Advanced: 75, Pro: 90, Enterprise: 98 }
];

const plans = [
  {
    name: 'Basic',
    price: '200k',
    color: '#8B5CF6',
    description: 'Phù hợp cho website cá nhân và blog nhỏ'
  },
  {
    name: 'Advanced', 
    price: '500k',
    color: '#3B82F6',
    description: 'Tối ưu cho doanh nghiệp vừa và e-commerce'
  },
  {
    name: 'Pro',
    price: '1.2M',
    color: '#10B981',
    description: 'Hiệu năng cao cho ứng dụng enterprise'
  },
  {
    name: 'Enterprise',
    price: '2.5M',
    color: '#F59E0B',
    description: 'Giải pháp toàn diện cho tập đoàn'
  }
];

export default function PerformanceBenchmark() {
  const [selectedPlan, setSelectedPlan] = useState('Pro');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value}{entry.dataKey.includes('Time') || entry.dataKey.includes('Response') ? 'ms' : entry.dataKey.includes('Uptime') ? '%' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-white/20 rounded-full">
                  <TrendingUp className="w-12 h-12" />
                </div>
              </div>
              <h1 className="text-5xl font-bold mb-6">
                Performance Benchmark
              </h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                So sánh hiệu năng chi tiết giữa các gói hosting STEP. 
                Dữ liệu thực tế từ hệ thống monitoring 24/7.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="px-4 py-2 text-lg">
                  <Award className="w-5 h-5 mr-2" />
                  99.9% Uptime
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-lg">
                  <Zap className="w-5 h-5 mr-2" />
                  Sub-second Response
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-lg">
                  <Shield className="w-5 h-5 mr-2" />
                  Enterprise Security
                </Badge>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Performance Dashboard */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Plan Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
                Chọn gói hosting để xem chi tiết hiệu năng
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {plans.map((plan) => (
                  <motion.div
                    key={plan.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all duration-300 ${
                        selectedPlan === plan.name 
                          ? 'ring-2 ring-blue-500 shadow-lg' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedPlan(plan.name)}
                    >
                      <CardContent className="p-6 text-center">
                        <div 
                          className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: plan.color + '20' }}
                        >
                          <Server className="w-8 h-8" style={{ color: plan.color }} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                        <p className="text-2xl font-bold mb-2" style={{ color: plan.color }}>
                          {plan.price} VNĐ/tháng
                        </p>
                        <p className="text-sm text-gray-600">{plan.description}</p>
                        {selectedPlan === plan.name && (
                          <Badge className="mt-3 bg-blue-500">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Đang xem
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Performance Metrics Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Tabs defaultValue="response-time" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
                  <TabsTrigger value="response-time" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Response Time
                  </TabsTrigger>
                  <TabsTrigger value="throughput" className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Throughput
                  </TabsTrigger>
                  <TabsTrigger value="resources" className="flex items-center gap-2">
                    <Server className="w-4 h-4" />
                    Resource Usage
                  </TabsTrigger>
                  <TabsTrigger value="uptime" className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Uptime
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Security & Backup
                  </TabsTrigger>
                </TabsList>

                {/* Response Time Tab */}
                <TabsContent value="response-time">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-6 h-6 text-blue-600" />
                        Response Time Analysis (ms)
                      </CardTitle>
                      <p className="text-gray-600">
                        Thời gian phản hồi trung bình cho các loại request khác nhau
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={responseTimeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="Basic" fill="#8B5CF6" />
                            <Bar dataKey="Advanced" fill="#3B82F6" />
                            <Bar dataKey="Pro" fill="#10B981" />
                            <Bar dataKey="Enterprise" fill="#F59E0B" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Throughput Tab */}
                <TabsContent value="throughput">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="w-6 h-6 text-green-600" />
                        Throughput Performance
                      </CardTitle>
                      <p className="text-gray-600">
                        Khả năng xử lý đồng thời và throughput peak của từng gói
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={throughputData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="Basic" stackId="1" fill="#8B5CF6" />
                            <Area type="monotone" dataKey="Advanced" stackId="1" fill="#3B82F6" />
                            <Area type="monotone" dataKey="Pro" stackId="1" fill="#10B981" />
                            <Area type="monotone" dataKey="Enterprise" stackId="1" fill="#F59E0B" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Resource Usage Tab */}
                <TabsContent value="resources">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Server className="w-6 h-6 text-purple-600" />
                        Resource Utilization
                      </CardTitle>
                      <p className="text-gray-600">
                        Mức độ sử dụng tài nguyên hệ thống (%)
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart data={resourceUsageData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="plan" />
                            <PolarRadiusAxis angle={90} domain={[0, 100]} />
                            <Radar name="CPU" dataKey="CPU" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.1} />
                            <Radar name="RAM" dataKey="RAM" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
                            <Radar name="Disk I/O" dataKey="Disk I/O" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
                            <Radar name="Network" dataKey="Network" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.1} />
                            <Radar name="Memory" dataKey="Memory" stroke="#EF4444" fill="#EF4444" fillOpacity={0.1} />
                            <Tooltip />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Uptime Tab */}
                <TabsContent value="uptime">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-indigo-600" />
                        Uptime Tracking
                      </CardTitle>
                      <p className="text-gray-600">
                        Thống kê uptime 6 tháng gần nhất (%)
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={uptimeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis domain={[98.5, 100]} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line type="monotone" dataKey="Basic" stroke="#8B5CF6" strokeWidth={3} />
                            <Line type="monotone" dataKey="Advanced" stroke="#3B82F6" strokeWidth={3} />
                            <Line type="monotone" dataKey="Pro" stroke="#10B981" strokeWidth={3} />
                            <Line type="monotone" dataKey="Enterprise" stroke="#F59E0B" strokeWidth={3} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-6 h-6 text-red-600" />
                        Security & Backup Performance
                      </CardTitle>
                      <p className="text-gray-600">
                        Hiệu quả bảo mật và tốc độ backup/restore
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={securityData} layout="horizontal">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" domain={[0, 100]} />
                            <YAxis dataKey="feature" type="category" />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="Basic" fill="#8B5CF6" />
                            <Bar dataKey="Advanced" fill="#3B82F6" />
                            <Bar dataKey="Pro" fill="#10B981" />
                            <Bar dataKey="Enterprise" fill="#F59E0B" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Interactive Comparison Tool */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mt-16"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-2xl">
                    Interactive Plan Comparison Tool
                  </CardTitle>
                  <p className="text-center text-gray-600">
                    Compare multiple hosting plans side by side with detailed metrics
                  </p>
                </CardHeader>
                <CardContent>
                  <PerformanceComparison 
                    plans={['Basic', 'Advanced', 'Pro', 'Enterprise']}
                    showRecommendation={true}
                    onSelectPlan={(plan) => {
                      setSelectedPlan(plan);
                      // Scroll to contact form or show contact modal
                    }}
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Recommendation Engine */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mt-16"
            >
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Target className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">
                      Gói {selectedPlan} được đề xuất cho bạn
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                      Dựa trên phân tích hiệu năng, gói {selectedPlan} phù hợp nhất với nhu cầu của bạn. 
                      Liên hệ để được tư vấn chi tiết về cấu hình và migration.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <ContactForm 
                        trigger={
                          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                            Liên hệ tư vấn {selectedPlan}
                          </Button>
                        }
                        defaultService={`Hosting ${selectedPlan}`}
                        defaultMessage={`Tôi quan tâm đến gói hosting ${selectedPlan} và muốn được tư vấn chi tiết về hiệu năng và migration.`}
                      />
                      <Button variant="outline" size="lg">
                        So sánh chi tiết các gói
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}