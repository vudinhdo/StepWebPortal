import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  Zap, 
  Database, 
  Shield, 
  Server, 
  HardDrive, 
  Network, 
  Clock, 
  TrendingUp,
  Activity,
  Gauge
} from "lucide-react";

interface PerformanceBenchmarkProps {
  selectedPlan?: string;
  onPlanSelect?: (plan: string) => void;
}

export default function PerformanceBenchmark({ selectedPlan = "advanced", onPlanSelect }: PerformanceBenchmarkProps) {
  const [activeMetric, setActiveMetric] = useState("response-time");

  // Performance data for different hosting plans
  const hostingPlans = {
    basic: {
      name: "Gói Cơ Bản",
      color: "#64748b",
      storage: "NVME SSD 10GB",
      price: "300k VNĐ/tháng"
    },
    advanced: {
      name: "Gói Nâng Cao", 
      color: "#3b82f6",
      storage: "NVME SSD 50GB",
      price: "600k VNĐ/tháng"
    },
    pro: {
      name: "Gói Pro",
      color: "#10b981", 
      storage: "NVME SSD 100GB",
      price: "1.2M VNĐ/tháng"
    }
  };

  // Response Time Comparison Data
  const responseTimeData = [
    {
      metric: "HTML Load",
      basic: 1.2,
      advanced: 0.4,
      pro: 0.2,
      unit: "giây"
    },
    {
      metric: "Database Query",
      basic: 0.8,
      advanced: 0.3,
      pro: 0.1,
      unit: "giây"
    },
    {
      metric: "API Response",
      basic: 2.1,
      advanced: 0.7,
      pro: 0.3,
      unit: "giây"
    },
    {
      metric: "Image Loading",
      basic: 3.2,
      advanced: 1.1,
      pro: 0.5,
      unit: "giây"
    },
    {
      metric: "Full Page Load",
      basic: 4.5,
      advanced: 1.8,
      pro: 0.8,
      unit: "giây"
    }
  ];

  // Throughput Data (requests per second)
  const throughputData = [
    {
      plan: "Cơ Bản",
      concurrent: 50,
      peak: 120,
      average: 80
    },
    {
      plan: "Nâng Cao",
      concurrent: 200,
      peak: 500,
      average: 350
    },
    {
      plan: "Pro",
      concurrent: 500,
      peak: 1200,
      average: 800
    }
  ];

  // Resource Usage Radar Chart Data
  const resourceData = [
    {
      metric: "CPU",
      basic: 70,
      advanced: 45,
      pro: 25,
      fullMark: 100
    },
    {
      metric: "RAM", 
      basic: 80,
      advanced: 50,
      pro: 30,
      fullMark: 100
    },
    {
      metric: "Disk I/O",
      basic: 85,
      advanced: 40,
      pro: 20,
      fullMark: 100
    },
    {
      metric: "Network",
      basic: 60,
      advanced: 35,
      pro: 15,
      fullMark: 100
    },
    {
      metric: "Memory",
      basic: 75,
      advanced: 45,
      pro: 25,
      fullMark: 100
    }
  ];

  // Uptime Performance Over Time
  const uptimeData = [
    { month: "T1", basic: 99.2, advanced: 99.8, pro: 99.99 },
    { month: "T2", basic: 99.1, advanced: 99.9, pro: 99.99 },
    { month: "T3", basic: 98.9, advanced: 99.8, pro: 99.99 },
    { month: "T4", basic: 99.3, advanced: 99.9, pro: 99.99 },
    { month: "T5", basic: 99.0, advanced: 99.8, pro: 99.99 },
    { month: "T6", basic: 99.4, advanced: 99.9, pro: 99.99 }
  ];

  // Security & Backup Performance
  const securityData = [
    {
      name: "Backup Speed",
      basic: 65,
      advanced: 85,
      pro: 95
    },
    {
      name: "DDoS Protection",
      basic: 50,
      advanced: 80,
      pro: 95
    },
    {
      name: "SSL Performance",
      basic: 70,
      advanced: 90,
      pro: 98
    },
    {
      name: "Malware Scanning",
      basic: 60,
      advanced: 85,
      pro: 95
    }
  ];

  const COLORS = ['#64748b', '#3b82f6', '#10b981'];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          So Sánh Hiệu Suất Hosting Plans
        </h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          Phân tích chi tiết hiệu suất thực tế của các gói hosting NVME để giúp bạn chọn gói phù hợp nhất
        </p>
      </motion.div>

      <Tabs defaultValue="response-time" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="response-time" className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span className="hidden sm:inline">Response Time</span>
          </TabsTrigger>
          <TabsTrigger value="throughput" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline">Throughput</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center space-x-2">
            <Gauge className="w-4 h-4" />
            <span className="hidden sm:inline">Resources</span>
          </TabsTrigger>
          <TabsTrigger value="uptime" className="flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span className="hidden sm:inline">Uptime</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        {/* Response Time Analysis */}
        <TabsContent value="response-time">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-6 h-6 text-blue-600" />
                <span>Thời Gian Phản Hồi (Response Time)</span>
              </CardTitle>
              <CardDescription>
                So sánh tốc độ phản hồi của các loại request khác nhau giữa các gói hosting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={responseTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis label={{ value: 'Thời gian (giây)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    formatter={(value, name) => [`${value} giây`, hostingPlans[name as keyof typeof hostingPlans]?.name || name]}
                    labelFormatter={(label) => `Loại: ${label}`}
                  />
                  <Legend />
                  <Bar dataKey="basic" fill={hostingPlans.basic.color} name="basic" />
                  <Bar dataKey="advanced" fill={hostingPlans.advanced.color} name="advanced" />
                  <Bar dataKey="pro" fill={hostingPlans.pro.color} name="pro" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {Object.entries(hostingPlans).map(([key, plan]) => (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-lg border"
                    style={{ borderColor: plan.color }}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: plan.color }}
                      ></div>
                      <h4 className="font-semibold">{plan.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{plan.storage}</p>
                    <p className="text-sm font-medium text-blue-600">{plan.price}</p>
                    {key === 'pro' && (
                      <Badge className="mt-2 bg-green-100 text-green-800">
                        Nhanh nhất
                      </Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Throughput Analysis */}
        <TabsContent value="throughput">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <span>Khả Năng Xử Lý (Throughput)</span>
              </CardTitle>
              <CardDescription>
                Số lượng request có thể xử lý đồng thời và trong điều kiện peak
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={throughputData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="plan" />
                  <YAxis label={{ value: 'Requests/giây', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="concurrent" fill="#8884d8" name="Đồng thời" />
                  <Bar dataKey="peak" fill="#82ca9d" name="Peak" />
                  <Bar dataKey="average" fill="#ffc658" name="Trung bình" />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Server className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold">Concurrent Requests</h4>
                  <p className="text-sm text-gray-600">Xử lý đồng thời</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold">Peak Performance</h4>
                  <p className="text-sm text-gray-600">Hiệu suất tối đa</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Activity className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <h4 className="font-semibold">Average Load</h4>
                  <p className="text-sm text-gray-600">Tải trung bình</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resource Usage Radar Chart */}
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gauge className="w-6 h-6 text-blue-600" />
                <span>Sử Dụng Tài Nguyên</span>
              </CardTitle>
              <CardDescription>
                Mức độ sử dụng tài nguyên hệ thống của các gói hosting (% tối đa)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={resourceData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar 
                    name="Gói Cơ Bản" 
                    dataKey="basic" 
                    stroke={hostingPlans.basic.color}
                    fill={hostingPlans.basic.color}
                    fillOpacity={0.2}
                  />
                  <Radar 
                    name="Gói Nâng Cao" 
                    dataKey="advanced" 
                    stroke={hostingPlans.advanced.color}
                    fill={hostingPlans.advanced.color}
                    fillOpacity={0.2}
                  />
                  <Radar 
                    name="Gói Pro" 
                    dataKey="pro" 
                    stroke={hostingPlans.pro.color}
                    fill={hostingPlans.pro.color}
                    fillOpacity={0.2}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-4">
                  * Số liệu thấp hơn = Hiệu quả cao hơn (ít tải hệ thống)
                </p>
                <div className="flex justify-center space-x-4">
                  {Object.entries(hostingPlans).map(([key, plan]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: plan.color }}
                      ></div>
                      <span className="text-sm">{plan.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Uptime Tracking */}
        <TabsContent value="uptime">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-6 h-6 text-blue-600" />
                <span>Uptime Performance</span>
              </CardTitle>
              <CardDescription>
                Thống kê uptime 6 tháng gần nhất của các gói hosting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={uptimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis 
                    domain={[98, 100]} 
                    label={{ value: 'Uptime (%)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip formatter={(value) => [`${value}%`, 'Uptime']} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="basic" 
                    stackId="1" 
                    stroke={hostingPlans.basic.color}
                    fill={hostingPlans.basic.color}
                    fillOpacity={0.6}
                    name="Gói Cơ Bản"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="advanced" 
                    stackId="2" 
                    stroke={hostingPlans.advanced.color}
                    fill={hostingPlans.advanced.color}
                    fillOpacity={0.6}
                    name="Gói Nâng Cao"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pro" 
                    stackId="3" 
                    stroke={hostingPlans.pro.color}
                    fill={hostingPlans.pro.color}
                    fillOpacity={0.6}
                    name="Gói Pro"
                  />
                </AreaChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-2xl font-bold text-gray-700">99.2%</h4>
                  <p className="text-sm text-gray-600">Gói Cơ Bản</p>
                  <p className="text-xs text-gray-500">~5.8h downtime/tháng</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h4 className="text-2xl font-bold text-blue-600">99.9%</h4>
                  <p className="text-sm text-gray-600">Gói Nâng Cao</p>
                  <p className="text-xs text-gray-500">~43min downtime/tháng</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h4 className="text-2xl font-bold text-green-600">99.99%</h4>
                  <p className="text-sm text-gray-600">Gói Pro</p>
                  <p className="text-xs text-gray-500">~4min downtime/tháng</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security & Backup Performance */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-blue-600" />
                <span>Bảo Mật & Backup</span>
              </CardTitle>
              <CardDescription>
                Đánh giá hiệu suất các tính năng bảo mật và backup
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={securityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Điểm hiệu suất', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="basic" fill={hostingPlans.basic.color} name="Gói Cơ Bản" />
                  <Bar dataKey="advanced" fill={hostingPlans.advanced.color} name="Gói Nâng Cao" />
                  <Bar dataKey="pro" fill={hostingPlans.pro.color} name="Gói Pro" />
                </BarChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Database className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold">Backup Speed</h4>
                  <p className="text-xs text-gray-600">Tốc độ sao lưu</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <Shield className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <h4 className="font-semibold">DDoS Protection</h4>
                  <p className="text-xs text-gray-600">Chống tấn công</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Network className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold">SSL Performance</h4>
                  <p className="text-xs text-gray-600">Hiệu suất SSL</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <HardDrive className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold">Malware Scan</h4>
                  <p className="text-xs text-gray-600">Quét malware</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Summary Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-12"
      >
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardHeader>
            <CardTitle className="text-center">Khuyến Nghị Dựa Trên Performance</CardTitle>
            <CardDescription className="text-center">
              Lựa chọn gói hosting phù hợp với nhu cầu hiệu suất của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <Badge className="mb-3 bg-gray-100 text-gray-800">Dự án nhỏ</Badge>
                <h4 className="font-semibold mb-2">Gói Cơ Bản</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Phù hợp cho website cá nhân, blog, hoặc dự án thử nghiệm
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => onPlanSelect?.('basic')}
                  className="w-full"
                >
                  Chọn Gói Này
                </Button>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-lg border-2 border-blue-500">
                <Badge className="mb-3 bg-blue-600 text-white">Phổ biến nhất</Badge>
                <h4 className="font-semibold mb-2">Gói Nâng Cao</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Lý tưởng cho e-commerce, web app trung bình với traffic ổn định
                </p>
                <Button 
                  onClick={() => onPlanSelect?.('advanced')}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Chọn Gói Này
                </Button>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <Badge className="mb-3 bg-green-100 text-green-800">Enterprise</Badge>
                <h4 className="font-semibold mb-2">Gói Pro</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Cho dự án lớn, high-traffic, cần performance và uptime tối đa
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => onPlanSelect?.('pro')}
                  className="w-full border-green-500 text-green-600 hover:bg-green-50"
                >
                  Chọn Gói Này
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}