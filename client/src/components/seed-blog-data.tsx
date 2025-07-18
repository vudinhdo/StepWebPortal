import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { InsertArticle } from "@shared/schema";

const sampleArticles: InsertArticle[] = [
  {
    title: "Xu hướng Cloud Computing 2025: Điều gì đang chờ đợi doanh nghiệp Việt Nam?",
    slug: "xu-huong-cloud-computing-2025",
    excerpt: "Khám phá những xu hướng công nghệ cloud computing mới nhất và cách chúng sẽ thay đổi cách thức hoạt động của doanh nghiệp Việt Nam trong năm 2025.",
    content: `
# Xu hướng Cloud Computing 2025

Cloud computing đang tiếp tục phát triển với tốc độ chóng mặt. Trong năm 2025, chúng ta sẽ chứng kiến những thay đổi đáng kể trong cách các doanh nghiệp Việt Nam tiếp cận và sử dụng công nghệ cloud.

## 1. Multi-Cloud và Hybrid Cloud

Ngày càng nhiều doanh nghiệp chọn chiến lược multi-cloud để tránh phụ thuộc vào một nhà cung cấp duy nhất. Điều này giúp:
- Tăng tính linh hoạt
- Giảm rủi ro
- Tối ưu chi phí

## 2. Edge Computing

Edge computing sẽ trở thành xu hướng chính, đặc biệt quan trọng cho:
- IoT applications
- Real-time processing
- Reduced latency

## 3. AI và Machine Learning tích hợp

Cloud providers sẽ tích hợp sâu hơn các dịch vụ AI/ML, giúp doanh nghiệp dễ dàng triển khai:
- Automated workflows
- Predictive analytics
- Smart decision making

## Kết luận

Doanh nghiệp Việt Nam cần chuẩn bị cho những thay đổi này để không bị tụt hậu trong cuộc đua công nghệ.
    `,
    category: "Xu hướng Cloud",
    tags: ["cloud", "công nghệ", "xu hướng 2025", "doanh nghiệp"],
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    author: "STEP Team",
    isPublished: true,
    isFeatured: true,
  },
  {
    title: "Hướng dẫn triển khai Docker trong môi trường production",
    slug: "huong-dan-trien-khai-docker-production",
    excerpt: "Hướng dẫn chi tiết cách triển khai và quản lý Docker containers trong môi trường production một cách an toàn và hiệu quả.",
    content: `
# Triển khai Docker trong Production

Docker đã trở thành công cụ không thể thiếu trong việc containerization. Bài viết này sẽ hướng dẫn bạn cách triển khai Docker trong môi trường production.

## Chuẩn bị môi trường

### 1. Cài đặt Docker Engine
\`\`\`bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
\`\`\`

### 2. Cấu hình Docker Daemon
Tạo file \`/etc/docker/daemon.json\`:
\`\`\`json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
\`\`\`

## Best Practices

### Security
- Sử dụng non-root user
- Scan images for vulnerabilities
- Limit container resources

### Monitoring
- Implement health checks
- Set up log aggregation
- Monitor resource usage

## Docker Compose cho Production

\`\`\`yaml
version: '3.8'
services:
  app:
    image: myapp:latest
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
\`\`\`

Việc triển khai Docker đúng cách sẽ giúp ứng dụng của bạn ổn định và dễ quản lý hơn.
    `,
    category: "Hướng dẫn kỹ thuật",
    tags: ["docker", "devops", "production", "containerization"],
    imageUrl: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop",
    author: "STEP DevOps Team",
    isPublished: true,
    isFeatured: false,
  },
  {
    title: "Bảo mật mạng cho doanh nghiệp: 10 điều cần làm ngay",
    slug: "bao-mat-mang-doanh-nghiep-10-dieu-can-lam",
    excerpt: "10 biện pháp bảo mật mạng thiết yếu mà mọi doanh nghiệp cần triển khai ngay lập tức để bảo vệ dữ liệu và hệ thống khỏi các mối đe dọa cyber.",
    content: `
# Bảo mật mạng cho doanh nghiệp

Trong thời đại số hóa, bảo mật mạng là ưu tiên hàng đầu của mọi doanh nghiệp. Dưới đây là 10 điều cần làm ngay để bảo vệ hệ thống của bạn.

## 1. Triển khai Firewall hiệu quả

Firewall là tuyến phòng thủ đầu tiên:
- Cấu hình rules chặt chẽ
- Monitoring traffic liên tục
- Regular updates

## 2. Sử dụng VPN cho remote access

VPN đảm bảo kết nối an toàn:
- End-to-end encryption
- Multi-factor authentication
- Access logging

## 3. Regular Security Audits

Thực hiện kiểm tra bảo mật định kỳ:
- Vulnerability scanning
- Penetration testing
- Compliance checks

## 4. Employee Training

Đào tạo nhân viên về:
- Phishing awareness
- Password policies
- Social engineering

## 5. Backup và Recovery Plan

Chuẩn bị cho worst-case scenarios:
- Regular automated backups
- Test recovery procedures
- Offsite storage

## 6. Network Segmentation

Chia tách mạng để giảm thiểu rủi ro:
- Isolate critical systems
- Limit lateral movement
- Monitor inter-segment traffic

## 7. Endpoint Protection

Bảo vệ các thiết bị đầu cuối:
- Antivirus/Anti-malware
- Device management
- Regular patching

## 8. Access Control

Quản lý quyền truy cập chặt chẽ:
- Principle of least privilege
- Role-based access
- Regular access reviews

## 9. Incident Response Plan

Chuẩn bị kế hoạch ứng phó:
- Clear procedures
- Response team
- Communication plan

## 10. Continuous Monitoring

Giám sát liên tục:
- SIEM systems
- Real-time alerts
- Log analysis

Việc triển khai đầy đủ các biện pháp này sẽ giúp doanh nghiệp của bạn an toàn trước các mối đe dọa cyber.
    `,
    category: "Bảo mật mạng",
    tags: ["bảo mật", "cybersecurity", "doanh nghiệp", "mạng"],
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
    author: "STEP Security Team",
    isPublished: true,
    isFeatured: true,
  },
  {
    title: "AI và Machine Learning: Cách ứng dụng vào business thực tế",
    slug: "ai-machine-learning-ung-dung-business",
    excerpt: "Khám phá cách các doanh nghiệp có thể tận dụng AI và Machine Learning để tối ưu hóa quy trình, nâng cao hiệu quả và tạo ra giá trị mới.",
    content: `
# AI và Machine Learning trong Business

Artificial Intelligence (AI) và Machine Learning (ML) không còn là khái niệm xa vời mà đã trở thành công cụ thiết thực cho doanh nghiệp.

## Các ứng dụng phổ biến

### 1. Customer Service
- Chatbots thông minh
- Automated ticket routing
- Sentiment analysis

### 2. Sales và Marketing
- Lead scoring
- Personalized recommendations
- Churn prediction

### 3. Operations
- Predictive maintenance
- Supply chain optimization
- Quality control automation

### 4. Finance
- Fraud detection
- Risk assessment
- Algorithmic trading

## Implementation Strategy

### Phase 1: Assessment
- Identify use cases
- Data readiness evaluation
- ROI calculation

### Phase 2: Pilot Project
- Start small
- Measure results
- Learn and iterate

### Phase 3: Scale Up
- Expand successful pilots
- Build AI infrastructure
- Train teams

## Challenges và Solutions

### Data Quality
- Implement data governance
- Clean and prepare data
- Ensure data privacy compliance

### Talent Gap
- Train existing staff
- Partner with AI specialists
- Use no-code/low-code platforms

### Change Management
- Executive buy-in
- Clear communication
- Gradual implementation

## ROI của AI Projects

Typical returns include:
- 20-30% cost reduction in operations
- 15-25% increase in customer satisfaction
- 10-20% improvement in decision speed

AI và ML không phải là magic bullet, nhưng khi được triển khai đúng cách, chúng có thể mang lại giá trị kinh doanh đáng kể.
    `,
    category: "AI & Machine Learning",
    tags: ["AI", "machine learning", "business", "automation"],
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    author: "STEP AI Team",
    isPublished: true,
    isFeatured: false,
  },
  {
    title: "Tin tức: STEP ra mắt dịch vụ Cloud GPU mới",
    slug: "step-ra-mat-dich-vu-cloud-gpu-moi",
    excerpt: "STEP chính thức công bố dịch vụ Cloud GPU mới với hiệu năng vượt trội, hỗ trợ AI/ML workloads và gaming applications với giá cả cạnh tranh.",
    content: `
# STEP ra mắt dịch vụ Cloud GPU mới

Hôm nay, STEP Technology Investment Company tự hào công bố sự ra mắt của dịch vụ Cloud GPU thế hệ mới, được thiết kế đặc biệt để đáp ứng nhu cầu ngày càng tăng về tính toán hiệu năng cao.

## Tính năng nổi bật

### GPU Hardware
- NVIDIA RTX 4090, RTX 3080 Ti
- AMD Radeon Pro series
- Flexible scaling options

### Performance
- Up to 10x faster than traditional CPU
- Low latency connections
- 99.9% uptime guarantee

### Use Cases
- Machine Learning training
- 3D rendering và animation
- Scientific computing
- Game development và testing

## Packages và Pricing

### Starter Package
- 1x RTX 3070
- 8GB VRAM
- $0.50/hour

### Professional Package
- 1x RTX 4080
- 16GB VRAM
- $0.80/hour

### Enterprise Package
- Multiple RTX 4090
- 24GB VRAM each
- Custom pricing

## Tại sao chọn STEP Cloud GPU?

### 1. Cost Effective
Tiết kiệm up to 70% so với việc mua hardware

### 2. Instant Access
Deploy trong vòng 5 phút

### 3. Local Support
Đội ngũ kỹ thuật Việt Nam 24/7

### 4. Data Security
Tuân thủ các chuẩn bảo mật quốc tế

## Khuyến mãi ra mắt

- 50% off for first month
- Free setup và migration
- Dedicated technical support

## Đăng ký ngay

Liên hệ team STEP để được tư vấn và demo:
- Phone: 1900-xxxx
- Email: gpu@step.com.vn
- Website: step.com.vn/cloud-gpu

Dịch vụ Cloud GPU của STEP sẽ giúp doanh nghiệp Việt Nam tiếp cận công nghệ tính toán hiệu năng cao một cách dễ dàng và kinh tế.
    `,
    category: "Tin tức công nghệ",
    tags: ["tin tức", "cloud gpu", "step", "ra mắt"],
    imageUrl: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&h=400&fit=crop",
    author: "STEP Marketing Team",
    isPublished: true,
    isFeatured: true,
  }
];

export default function SeedBlogData() {
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const seedMutation = useMutation({
    mutationFn: async () => {
      setIsSeeding(true);
      const promises = sampleArticles.map(article => 
        apiRequest("POST", "/api/articles", article).then(res => res.json())
      );
      return Promise.all(promises);
    },
    onSuccess: () => {
      toast({
        title: "Thành công!",
        description: `Đã tạo ${sampleArticles.length} bài viết mẫu thành công.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/articles/published"] });
      queryClient.invalidateQueries({ queryKey: ["/api/articles/featured"] });
      setIsSeeding(false);
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi!",
        description: error.message || "Có lỗi xảy ra khi tạo dữ liệu mẫu.",
        variant: "destructive",
      });
      setIsSeeding(false);
    },
  });

  return (
    <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
      <h3 className="text-lg font-semibold text-blue-900 mb-2">
        Dữ liệu mẫu cho Blog
      </h3>
      <p className="text-blue-700 mb-4">
        Tạo {sampleArticles.length} bài viết mẫu để test hệ thống blog.
      </p>
      <Button 
        onClick={() => seedMutation.mutate()}
        disabled={isSeeding}
        className="bg-blue-600 hover:bg-blue-700"
      >
        {isSeeding ? "Đang tạo..." : "Tạo dữ liệu mẫu"}
      </Button>
    </div>
  );
}