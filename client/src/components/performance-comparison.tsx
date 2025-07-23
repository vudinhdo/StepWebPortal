import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";
import { Clock, Zap, Server, Shield, CheckCircle, X, ArrowRight } from "lucide-react";

interface PerformanceComparisonProps {
  plans?: string[];
  showRecommendation?: boolean;
  onSelectPlan?: (plan: string) => void;
}

const performanceMetrics = {
  responseTime: [
    { metric: 'Page Load Time', Basic: 2.8, Advanced: 1.6, Pro: 0.9, Enterprise: 0.5, unit: 's' },
    { metric: 'API Response', Basic: 450, Advanced: 280, Pro: 180, Enterprise: 120, unit: 'ms' },
    { metric: 'Database Query', Basic: 320, Advanced: 180, Pro: 120, Enterprise: 80, unit: 'ms' },
    { metric: 'Image Loading', Basic: 1200, Advanced: 800, Pro: 500, Enterprise: 300, unit: 'ms' }
  ],
  
  throughput: [
    { metric: 'Concurrent Users', Basic: 500, Advanced: 2000, Pro: 8000, Enterprise: 20000, unit: '' },
    { metric: 'Requests/sec', Basic: 100, Advanced: 500, Pro: 2000, Enterprise: 5000, unit: '' },
    { metric: 'Bandwidth', Basic: 10, Advanced: 50, Pro: 200, Enterprise: 500, unit: 'GB' }
  ],

  features: [
    { name: 'SSD Storage', Basic: '50GB', Advanced: '200GB', Pro: '500GB', Enterprise: '2TB' },
    { name: 'RAM', Basic: '2GB', Advanced: '8GB', Pro: '32GB', Enterprise: '128GB' },
    { name: 'CPU Cores', Basic: '2', Advanced: '4', Pro: '8', Enterprise: '16' },
    { name: 'SSL Certificate', Basic: true, Advanced: true, Pro: true, Enterprise: true },
    { name: 'CDN', Basic: false, Advanced: true, Pro: true, Enterprise: true },
    { name: 'Auto Backup', Basic: 'Weekly', Advanced: 'Daily', Pro: '3x Daily', Enterprise: 'Real-time' },
    { name: 'Support', Basic: 'Email', Advanced: '24/7 Chat', Pro: '24/7 Phone', Enterprise: 'Dedicated' },
    { name: 'Uptime SLA', Basic: '99.5%', Advanced: '99.9%', Pro: '99.95%', Enterprise: '99.99%' }
  ]
};

const planColors = {
  Basic: '#8B5CF6',
  Advanced: '#3B82F6', 
  Pro: '#10B981',
  Enterprise: '#F59E0B'
};

export function PerformanceComparison({ 
  plans = ['Basic', 'Advanced', 'Pro', 'Enterprise'],
  showRecommendation = true,
  onSelectPlan 
}: PerformanceComparisonProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPlans, setSelectedPlans] = useState(plans.slice(0, 3));

  const togglePlan = (plan: string) => {
    if (selectedPlans.includes(plan)) {
      setSelectedPlans(selectedPlans.filter(p => p !== plan));
    } else if (selectedPlans.length < 4) {
      setSelectedPlans([...selectedPlans, plan]);
    }
  };

  const formatValue = (value: any, unit: string) => {
    if (typeof value === 'boolean') return value ? '✓' : '✗';
    return `${value}${unit}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value}{entry.payload.unit || ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Plan Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan) => (
          <motion.div
            key={plan}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-300 ${
                selectedPlans.includes(plan)
                  ? 'ring-2 shadow-lg' 
                  : 'hover:shadow-md opacity-60'
              }`}
              style={selectedPlans.includes(plan) ? { 
                borderColor: planColors[plan as keyof typeof planColors],
                borderWidth: '2px'
              } : {}}
              onClick={() => togglePlan(plan)}
            >
              <CardContent className="p-4 text-center">
                <div 
                  className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                  style={{ 
                    backgroundColor: (planColors[plan as keyof typeof planColors] || '#666') + '20',
                    color: planColors[plan as keyof typeof planColors] || '#666'
                  }}
                >
                  <Server className="w-6 h-6" />
                </div>
                <h3 className="font-bold">{plan}</h3>
                {selectedPlans.includes(plan) && (
                  <Badge className="mt-2" style={{ backgroundColor: planColors[plan as keyof typeof planColors] }}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Selected
                  </Badge>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b">
        {[
          { id: 'overview', label: 'Tổng quan', icon: Server },
          { id: 'performance', label: 'Hiệu năng', icon: Zap },
          { id: 'features', label: 'Tính năng', icon: CheckCircle }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2"
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Response Time Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Response Time Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceMetrics.responseTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    {selectedPlans.map((plan) => (
                      <Bar 
                        key={plan}
                        dataKey={plan} 
                        fill={planColors[plan as keyof typeof planColors]} 
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Throughput Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-600" />
                Throughput Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceMetrics.throughput}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    {selectedPlans.map((plan) => (
                      <Line 
                        key={plan}
                        type="monotone" 
                        dataKey={plan} 
                        stroke={planColors[plan as keyof typeof planColors]}
                        strokeWidth={3}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'performance' && (
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics Detailed Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Metric</th>
                    {selectedPlans.map((plan) => (
                      <th key={plan} className="text-center p-3" style={{ color: planColors[plan as keyof typeof planColors] }}>
                        {plan}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...performanceMetrics.responseTime, ...performanceMetrics.throughput].map((metric, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{metric.metric}</td>
                      {selectedPlans.map((plan) => (
                        <td key={plan} className="text-center p-3">
                          {formatValue(metric[plan as keyof typeof metric], metric.unit || '')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'features' && (
        <Card>
          <CardHeader>
            <CardTitle>Features & Specifications Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Feature</th>
                    {selectedPlans.map((plan) => (
                      <th key={plan} className="text-center p-3" style={{ color: planColors[plan as keyof typeof planColors] }}>
                        {plan}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {performanceMetrics.features.map((feature, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{feature.name}</td>
                      {selectedPlans.map((plan) => (
                        <td key={plan} className="text-center p-3">
                          {typeof feature[plan as keyof typeof feature] === 'boolean' ? (
                            feature[plan as keyof typeof feature] ? (
                              <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-red-500 mx-auto" />
                            )
                          ) : (
                            <span className="font-medium">
                              {feature[plan as keyof typeof feature]}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendation */}
      {showRecommendation && selectedPlans.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">
                  Recommended Plan: {selectedPlans[selectedPlans.length - 1]}
                </h3>
                <p className="text-gray-600 mb-6">
                  Based on your selection and typical usage patterns, this plan offers the best value for your needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => onSelectPlan?.(selectedPlans[selectedPlans.length - 1])}
                  >
                    Choose {selectedPlans[selectedPlans.length - 1]} Plan
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" size="lg">
                    Get Custom Quote
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}