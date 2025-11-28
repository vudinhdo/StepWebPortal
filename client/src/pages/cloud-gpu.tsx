import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Cpu,
  Zap,
  Brain,
  Sparkles,
  Server,
  Shield,
  Gauge,
  Code,
  BarChart,
  Layers,
  CircuitBoard,
  Database,
  Network,
  Bot,
  MessageSquare,
  Image,
  Video,
  Music,
  Microscope,
  TrendingUp,
  Clock,
  DollarSign,
  Headphones,
  ChevronRight,
  Play,
  CheckCircle,
  Settings
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import Header from '@/components/header';
import Footer from '@/components/footer';
import ServerConfigurator from '@/components/server-configurator';

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  opacity: [0.7, 1, 0.7],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const gpuPackages = [
  {
    name: "RTX 4060",
    vram: "8GB GDDR6",
    priceValue: "2.500.000",
    priceUnit: "VNĐ/tháng",
    specs: "8GB VRAM, 3072 CUDA Cores",
    suitable: "Fine-tuning models, Inference nhẹ",
    popular: false,
    features: [
      "8GB GDDR6 VRAM",
      "3072 CUDA Cores",
      "Ada Lovelace Architecture",
      "4th Gen Tensor Cores",
      "8 vCPU, 32GB RAM",
      "200GB NVMe SSD",
      "CUDA 12.x Support",
      "PyTorch & TensorFlow Ready"
    ],
    useCases: ["Stable Diffusion", "LLaMA 7B Inference", "Code Generation"],
    color: "from-green-500 to-emerald-600"
  },
  {
    name: "RTX 4080",
    vram: "16GB GDDR6X",
    priceValue: "5.000.000",
    priceUnit: "VNĐ/tháng",
    specs: "16GB VRAM, 9728 CUDA Cores",
    suitable: "Training models, LLM Inference",
    popular: true,
    features: [
      "16GB GDDR6X VRAM",
      "9728 CUDA Cores",
      "Ada Lovelace Architecture",
      "4th Gen Tensor Cores",
      "16 vCPU, 64GB RAM",
      "500GB NVMe SSD",
      "CUDA 12.x Support",
      "Multi-GPU Ready"
    ],
    useCases: ["LLaMA 13B", "Mistral 7B Training", "Video Generation"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "RTX 4090",
    vram: "24GB GDDR6X",
    priceValue: "7.500.000",
    priceUnit: "VNĐ/tháng",
    specs: "24GB VRAM, 16384 CUDA Cores",
    suitable: "Heavy Training, Large LLMs",
    popular: false,
    features: [
      "24GB GDDR6X VRAM",
      "16384 CUDA Cores",
      "Ada Lovelace Architecture",
      "4th Gen Tensor Cores",
      "32 vCPU, 128GB RAM",
      "1TB NVMe SSD",
      "NVLink Support",
      "Enterprise Drivers"
    ],
    useCases: ["LLaMA 30B+", "SDXL Training", "3D Rendering"],
    color: "from-purple-500 to-violet-600"
  },
  {
    name: "Tesla V100",
    vram: "32GB HBM2",
    priceValue: "12.000.000",
    priceUnit: "VNĐ/tháng",
    specs: "32GB HBM2, 5120 CUDA Cores",
    suitable: "Enterprise AI, Research",
    popular: false,
    features: [
      "32GB HBM2 VRAM",
      "5120 CUDA Cores",
      "Volta Architecture",
      "640 Tensor Cores",
      "48 vCPU, 256GB RAM",
      "2TB NVMe SSD",
      "NVLink 300GB/s",
      "Enterprise Support"
    ],
    useCases: ["GPT-3 Scale", "Scientific Computing", "Multi-node Training"],
    color: "from-amber-500 to-orange-600"
  },
  {
    name: "A100 40GB",
    vram: "40GB HBM2e",
    priceValue: "25.000.000",
    priceUnit: "VNĐ/tháng",
    specs: "40GB HBM2e, 6912 CUDA Cores",
    suitable: "LLM Training, Enterprise AI",
    popular: true,
    features: [
      "40GB HBM2e VRAM",
      "6912 CUDA Cores",
      "Ampere Architecture",
      "3rd Gen Tensor Cores",
      "64 vCPU, 512GB RAM",
      "4TB NVMe SSD",
      "NVLink 600GB/s",
      "MIG Technology"
    ],
    useCases: ["LLaMA 65B", "GPT-4 Fine-tune", "Distributed Training"],
    color: "from-cyan-500 to-blue-600"
  },
  {
    name: "H100 80GB",
    vram: "80GB HBM3",
    priceValue: "50.000.000",
    priceUnit: "VNĐ/tháng",
    specs: "80GB HBM3, 16896 CUDA Cores",
    suitable: "Frontier AI, LLM từ scratch",
    popular: false,
    features: [
      "80GB HBM3 VRAM",
      "16896 CUDA Cores",
      "Hopper Architecture",
      "4th Gen Tensor Cores",
      "128 vCPU, 1TB RAM",
      "8TB NVMe SSD",
      "NVLink 900GB/s",
      "Transformer Engine"
    ],
    useCases: ["GPT-4 Class", "LLaMA 70B+ Training", "Foundation Models"],
    color: "from-rose-500 to-pink-600"
  }
];

const aiUseCases = [
  {
    icon: MessageSquare,
    title: "Large Language Models (LLM)",
    description: "Train và deploy các mô hình ngôn ngữ lớn như LLaMA, Mistral, GPT tùy chỉnh",
    examples: ["Chatbot AI", "Code Assistant", "Document Analysis"],
    gradient: "from-violet-500 to-purple-600"
  },
  {
    icon: Image,
    title: "AI Image Generation",
    description: "Stable Diffusion, DALL-E, Midjourney-style image generation",
    examples: ["Product Design", "Art Creation", "Marketing Assets"],
    gradient: "from-pink-500 to-rose-600"
  },
  {
    icon: Video,
    title: "Video AI & Rendering",
    description: "Video generation, enhancement, 3D rendering với GPU acceleration",
    examples: ["Deepfake Detection", "Video Upscaling", "CGI Rendering"],
    gradient: "from-orange-500 to-amber-600"
  },
  {
    icon: Bot,
    title: "AI Agents & Automation",
    description: "Xây dựng AI agents tự động hóa workflow phức tạp",
    examples: ["Auto Research", "Data Processing", "Decision Making"],
    gradient: "from-emerald-500 to-green-600"
  },
  {
    icon: Microscope,
    title: "Scientific Computing",
    description: "Mô phỏng khoa học, phân tích dữ liệu lớn, bioinformatics",
    examples: ["Drug Discovery", "Climate Modeling", "Genome Analysis"],
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    icon: BarChart,
    title: "ML & Deep Learning",
    description: "Training các neural networks, computer vision, NLP models",
    examples: ["Object Detection", "Sentiment Analysis", "Forecasting"],
    gradient: "from-cyan-500 to-teal-600"
  }
];

const techSpecs = [
  { label: "CUDA Cores", value: "Lên đến 16,896", icon: CircuitBoard },
  { label: "VRAM", value: "8GB - 80GB HBM3", icon: Database },
  { label: "Tensor Cores", value: "Gen 4 & Transformer Engine", icon: Layers },
  { label: "Memory Bandwidth", value: "Lên đến 3.35TB/s", icon: Zap },
  { label: "NVLink", value: "900GB/s Inter-GPU", icon: Network },
  { label: "Deep Learning", value: "FP8, FP16, TF32, INT8", icon: Brain }
];

const benefits = [
  {
    icon: Clock,
    title: "Triển Khai Trong 5 Phút",
    description: "GPU instance sẵn sàng với CUDA, cuDNN, PyTorch, TensorFlow pre-installed. Không cần setup phức tạp."
  },
  {
    icon: DollarSign,
    title: "Pay-Per-Hour Linh Hoạt",
    description: "Chỉ trả tiền khi sử dụng. Tắt instance = không tốn phí. Tối ưu chi phí cho dự án AI."
  },
  {
    icon: Gauge,
    title: "Hiệu Suất Datacenter Việt",
    description: "Latency <10ms từ Việt Nam. Data sovereignty compliance. GPU dedicated không chia sẻ."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Isolated network, encrypted storage, compliance với tiêu chuẩn bảo mật dữ liệu Việt Nam."
  },
  {
    icon: Code,
    title: "Dev-Ready Environment",
    description: "Jupyter Lab, VS Code Server, SSH access. Git integration, Docker support, Kubernetes ready."
  },
  {
    icon: Headphones,
    title: "AI Expert Support 24/7",
    description: "Đội ngũ chuyên gia AI hỗ trợ tối ưu model, troubleshoot CUDA, tư vấn architecture."
  }
];

export default function CloudGPU() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      
      {/* Hero Section with Cyber/AI Effects */}
      <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-purple-950/30 to-gray-950" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating Orbs - Hidden on mobile, visible on md+ */}
        <motion.div
          animate={floatingAnimation}
          className="hidden md:block absolute top-1/4 left-1/4 w-48 lg:w-96 h-48 lg:h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
          className="hidden md:block absolute bottom-1/4 right-1/4 w-40 lg:w-80 h-40 lg:h-80 bg-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 0.5 } }}
          className="hidden md:block absolute top-1/3 right-1/3 w-32 lg:w-64 h-32 lg:h-64 bg-pink-500/15 rounded-full blur-3xl"
        />

        {/* Neural Network Lines - Decorative */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          {[...Array(20)].map((_, i) => (
            <motion.line
              key={i}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatType: "reverse" }}
            />
          ))}
        </svg>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 mb-8"
            >
              <motion.div animate={pulseAnimation}>
                <Sparkles className="w-4 h-4 text-purple-400" />
              </motion.div>
              <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                NVIDIA GPU Cloud Infrastructure
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Cloud GPU
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                cho AI & LLM
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Sức mạnh NVIDIA GPU từ RTX 4090 đến H100 - Train LLMs, chạy Stable Diffusion,
              deploy AI models với latency thấp nhất từ datacenter Việt Nam.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-purple-500/25"
                onClick={() => document.getElementById('gpu-packages')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-view-gpu-packages"
              >
                <Cpu className="w-5 h-5 mr-2" />
                Xem GPU Packages
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-6 text-lg rounded-xl"
                onClick={() => document.getElementById('server-configurator')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-configure-gpu"
              >
                <Settings className="w-5 h-5 mr-2" />
                Cấu Hình Ngay
              </Button>
            </motion.div>

            {/* GPU Chips Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {["RTX 4090", "Tesla V100", "A100", "H100"].map((gpu, index) => (
                <motion.div
                  key={gpu}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700/50 backdrop-blur-sm"
                >
                  <CircuitBoard className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-gray-300">{gpu}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, y: { repeat: Infinity, duration: 2 } }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronRight className="w-6 h-6 text-purple-400 rotate-90" />
        </motion.div>
      </section>

      {/* Tech Specs Bar */}
      <section className="py-8 bg-gradient-to-r from-purple-900/20 via-gray-900 to-cyan-900/20 border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techSpecs.map((spec, index) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <spec.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-sm text-gray-400">{spec.label}</div>
                <div className="text-sm font-semibold text-white">{spec.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GPU Packages Section */}
      <section id="gpu-packages" className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                GPU Packages
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Từ inference nhẹ đến training LLMs quy mô lớn - chọn GPU phù hợp với workload AI của bạn
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gpuPackages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl bg-gray-900/50 border ${
                  pkg.popular ? 'border-purple-500' : 'border-gray-800'
                } overflow-hidden hover:border-purple-500/50 transition-all duration-300 group`}
                data-testid={`card-gpu-${pkg.name.toLowerCase().replace(' ', '-')}`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-center py-1 text-xs font-semibold">
                    PHỔ BIẾN NHẤT
                  </div>
                )}
                
                {/* Card Header */}
                <div className={`p-6 bg-gradient-to-br ${pkg.color} ${pkg.popular ? 'pt-8' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{pkg.name}</h3>
                    <CircuitBoard className="w-8 h-8 text-white/80" />
                  </div>
                  <div className="text-white/90 text-sm mb-2">{pkg.vram}</div>
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {pkg.priceValue}
                    <span className="text-sm md:text-base font-normal text-white/80"> {pkg.priceUnit}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-gray-400 text-sm mb-4">{pkg.suitable}</p>
                  
                  {/* Use Cases */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pkg.useCases.map((useCase) => (
                      <span
                        key={useCase}
                        className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {pkg.features.slice(0, 6).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                    onClick={() => {
                      setSelectedPackage(pkg.name);
                      document.getElementById('server-configurator')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    data-testid={`button-select-${pkg.name.toLowerCase().replace(' ', '-')}`}
                  >
                    Chọn {pkg.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Use Cases Section */}
      <section className="py-20 bg-gradient-to-b from-gray-950 via-purple-950/10 to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                AI & Machine Learning Use Cases
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Xây dựng ứng dụng AI thế hệ mới với sức mạnh GPU từ STEP Cloud
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiUseCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl bg-gray-900/30 border border-gray-800 p-6 hover:border-purple-500/50 transition-all duration-300 overflow-hidden"
                data-testid={`card-usecase-${index}`}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${useCase.gradient} flex items-center justify-center mb-4`}>
                  <useCase.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{useCase.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {useCase.examples.map((example) => (
                    <span
                      key={example}
                      className="text-xs px-2 py-1 rounded-md bg-gray-800 text-gray-300"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Tại Sao Chọn STEP Cloud GPU?
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Infrastructure GPU được tối ưu cho AI workloads tại Việt Nam
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-gray-900/30 border border-gray-800 hover:border-green-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LLM Comparison Section */}
      <section className="py-20 bg-gradient-to-b from-gray-950 via-purple-950/10 to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                GPU cho LLM - Bạn Cần Gì?
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Hướng dẫn chọn GPU phù hợp với model AI của bạn
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <table className="w-full min-w-[800px] text-left">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="py-4 px-4 text-purple-400 font-semibold">LLM Model</th>
                  <th className="py-4 px-4 text-purple-400 font-semibold">Parameters</th>
                  <th className="py-4 px-4 text-purple-400 font-semibold">VRAM Cần</th>
                  <th className="py-4 px-4 text-purple-400 font-semibold">GPU Đề Xuất</th>
                  <th className="py-4 px-4 text-purple-400 font-semibold">Use Case</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800/50 hover:bg-gray-900/30">
                  <td className="py-4 px-4 font-medium">LLaMA 2 7B</td>
                  <td className="py-4 px-4">7 Billion</td>
                  <td className="py-4 px-4">~14GB (FP16)</td>
                  <td className="py-4 px-4"><span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-sm">RTX 4080</span></td>
                  <td className="py-4 px-4">Chatbot, Code Assistant</td>
                </tr>
                <tr className="border-b border-gray-800/50 hover:bg-gray-900/30">
                  <td className="py-4 px-4 font-medium">LLaMA 2 13B</td>
                  <td className="py-4 px-4">13 Billion</td>
                  <td className="py-4 px-4">~26GB (FP16)</td>
                  <td className="py-4 px-4"><span className="px-2 py-1 rounded bg-purple-500/20 text-purple-400 text-sm">RTX 4090 / V100</span></td>
                  <td className="py-4 px-4">Document Analysis, RAG</td>
                </tr>
                <tr className="border-b border-gray-800/50 hover:bg-gray-900/30">
                  <td className="py-4 px-4 font-medium">Mistral 7B</td>
                  <td className="py-4 px-4">7 Billion</td>
                  <td className="py-4 px-4">~14GB (FP16)</td>
                  <td className="py-4 px-4"><span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-sm">RTX 4080</span></td>
                  <td className="py-4 px-4">Fast Inference, Agents</td>
                </tr>
                <tr className="border-b border-gray-800/50 hover:bg-gray-900/30">
                  <td className="py-4 px-4 font-medium">LLaMA 2 70B</td>
                  <td className="py-4 px-4">70 Billion</td>
                  <td className="py-4 px-4">~140GB (FP16)</td>
                  <td className="py-4 px-4"><span className="px-2 py-1 rounded bg-pink-500/20 text-pink-400 text-sm">2x A100 / 2x H100</span></td>
                  <td className="py-4 px-4">Enterprise AI, Fine-tuning</td>
                </tr>
                <tr className="border-b border-gray-800/50 hover:bg-gray-900/30">
                  <td className="py-4 px-4 font-medium">Stable Diffusion XL</td>
                  <td className="py-4 px-4">6.6 Billion</td>
                  <td className="py-4 px-4">~12GB</td>
                  <td className="py-4 px-4"><span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-sm">RTX 4080+</span></td>
                  <td className="py-4 px-4">Image Generation</td>
                </tr>
                <tr className="hover:bg-gray-900/30">
                  <td className="py-4 px-4 font-medium">GPT-4 Class (Fine-tune)</td>
                  <td className="py-4 px-4">175B+</td>
                  <td className="py-4 px-4">~350GB+</td>
                  <td className="py-4 px-4"><span className="px-2 py-1 rounded bg-rose-500/20 text-rose-400 text-sm">Multi H100 Cluster</span></td>
                  <td className="py-4 px-4">Foundation Models</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Server Configurator Section - với dark wrapper */}
      <section id="server-configurator" className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Cấu Hình GPU Cloud Server
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Tùy chỉnh cấu hình server GPU theo nhu cầu của bạn - từ inference nhẹ đến training LLMs quy mô lớn
            </p>
          </motion.div>
        </div>
        <div className="bg-gray-50 rounded-t-3xl pt-8">
          <ServerConfigurator />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 via-gray-900 to-cyan-900/50 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Brain className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Bắt Đầu Xây Dựng AI Của Bạn
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Đội ngũ chuyên gia AI của STEP sẵn sàng tư vấn và hỗ trợ bạn triển khai GPU Cloud phù hợp nhất
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-6 text-lg rounded-xl"
                onClick={() => document.getElementById('server-configurator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Cpu className="w-5 h-5 mr-2" />
                Cấu Hình GPU Ngay
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-6 text-lg rounded-xl"
              >
                <Headphones className="w-5 h-5 mr-2" />
                Liên Hệ Tư Vấn AI
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
