import type { InsertArticle } from "@shared/schema";

// Optimized DevOps articles data - reduced size for better performance
export const devopsArticles: InsertArticle[] = [
  {
    title: "Hướng dẫn Docker từ cơ bản đến nâng cao cho DevOps Engineers",
    slug: "huong-dan-docker-tu-co-ban-den-nang-cao",
    excerpt: "Khóa học Docker toàn diện từ cơ bản đến nâng cao, bao gồm containers, images, Docker Compose và deployment strategies cho các dự án thực tế.",
    content: `# Docker từ Cơ Bản đến Nâng Cao - Hướng Dẫn Toàn Diện 2024

Docker đã trở thành công cụ không thể thiếu trong DevOps và phát triển phần mềm hiện đại. Với hơn 13 tỷ container downloads và được sử dụng bởi 95% Fortune 100 companies, Docker đã cách mạng hóa cách chúng ta xây dựng, ship và run applications.

## 1. Docker Architecture và Core Concepts

### Docker là gì?
Docker là một nền tảng containerization mã nguồn mở sử dụng OS-level virtualization để đóng gói ứng dụng và dependencies vào các containers nhẹ, portable và isolated.

### Docker Components
- **Docker Engine**: Background service quản lý containers
- **Docker CLI**: Command-line interface
- **Docker Images**: Templates để tạo containers
- **Docker Containers**: Running instances của images

## 2. Production Best Practices

### Multi-stage Builds
\`\`\`dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### Health Checks
\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1
\`\`\`

## 3. Container Orchestration với Docker Compose

### Production Docker Compose
\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
      - redis
    restart: unless-stopped
    
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped
    
  redis:
    image: redis:7-alpine
    restart: unless-stopped
    
volumes:
  postgres_data:
\`\`\`

## 4. Security Best Practices

### Non-root User
\`\`\`dockerfile
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs
\`\`\`

### Vulnerability Scanning
\`\`\`bash
# Scan images for vulnerabilities
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \\
  aquasec/trivy image myapp:latest
\`\`\`

## 5. Performance Optimization

### Image Size Optimization
- Sử dụng Alpine Linux base images
- Multi-stage builds để loại bỏ build dependencies
- .dockerignore để exclude unnecessary files
- Combine RUN commands để giảm layers

### Runtime Optimization
\`\`\`bash
# Limit container resources
docker run -d --memory="512m" --cpus="1.0" myapp:latest
\`\`\`

## 6. Monitoring và Logging

### Centralized Logging
\`\`\`yaml
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
\`\`\`

### Container Metrics
\`\`\`bash
# Monitor container stats
docker stats --format "table {{.Container}}\\t{{.CPUPerc}}\\t{{.MemUsage}}"
\`\`\`

## Kết luận

Docker containerization mang lại nhiều lợi ích cho development và production environments. Việc áp dụng đúng best practices về security, performance và monitoring sẽ giúp tối ưu hóa hiệu quả sử dụng Docker trong môi trường enterprise.

### Key Takeaways:
- Sử dụng multi-stage builds để optimize image size
- Implement proper health checks và resource limits
- Apply security best practices từ development đến production
- Monitor containers và implement centralized logging
- Regular vulnerability scanning và updates`,
    category: "DevOps",
    tags: ["Docker", "Containerization", "DevOps", "Production"],
    author: "STEP IT Team",
    isPublished: true,
    isFeatured: true
  },
  {
    title: "Kubernetes Production Guide - Container Orchestration Mastery",
    slug: "kubernetes-production-guide-container-orchestration",
    excerpt: "Hướng dẫn toàn diện về Kubernetes từ cơ bản đến advanced patterns, bao gồm production deployment, security, monitoring và best practices.",
    content: `# Kubernetes Production Guide - Container Orchestration Mastery

Kubernetes đã trở thành de facto standard cho container orchestration trong enterprise environments. Với khả năng manage hàng nghìn containers across multiple hosts, Kubernetes cung cấp platform mạnh mẽ cho modern applications.

## 1. Kubernetes Architecture Overview

### Control Plane Components
- **API Server**: Central management entity
- **etcd**: Distributed key-value store
- **Scheduler**: Pod placement decisions
- **Controller Manager**: Maintains desired state

### Node Components
- **kubelet**: Node agent
- **kube-proxy**: Network proxy
- **Container Runtime**: Docker/containerd

## 2. Production Deployment Patterns

### Deployment Strategy
\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  labels:
    app: myapp
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 1
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: app
        image: myapp:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
\`\`\`

### Service Discovery
\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: ClusterIP
\`\`\`

## 3. Advanced Networking

### Ingress Configuration
\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - myapp.example.com
    secretName: myapp-tls
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp-service
            port:
              number: 80
\`\`\`

## 4. Storage Management

### Persistent Volumes
\`\`\`yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
  storageClassName: fast-ssd
\`\`\`

## 5. Security Best Practices

### RBAC Configuration
\`\`\`yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
\`\`\`

### Network Policies
\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
\`\`\`

## 6. Monitoring và Observability

### Prometheus Integration
\`\`\`yaml
apiVersion: v1
kind: ServiceMonitor
metadata:
  name: myapp-metrics
spec:
  selector:
    matchLabels:
      app: myapp
  endpoints:
  - port: metrics
    interval: 30s
    path: /metrics
\`\`\`

## 7. Auto-scaling

### Horizontal Pod Autoscaler
\`\`\`yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
\`\`\`

## Kết luận

Kubernetes cung cấp platform mạnh mẽ cho container orchestration, nhưng requires proper planning và implementation của best practices để achieve production readiness. Focus vào security, monitoring, và automation sẽ đảm bảo successful Kubernetes deployment trong enterprise environment.`,
    category: "DevOps",
    tags: ["Kubernetes", "Container Orchestration", "Production", "Cloud Native"],
    author: "STEP IT Team",
    isPublished: true,
    isFeatured: true
  },
  {
    title: "CI/CD Pipeline Automation - Complete Implementation Guide",
    slug: "cicd-pipeline-automation-complete-guide",
    excerpt: "Hướng dẫn xây dựng CI/CD pipeline hiện đại với GitLab CI, Jenkins, và GitHub Actions. Bao gồm automated testing, security scanning và deployment strategies.",
    content: `# CI/CD Pipeline Automation - Complete Implementation Guide

CI/CD (Continuous Integration/Continuous Deployment) đã trở thành backbone của modern software development, enabling teams deliver high-quality software faster và reliable hơn.

## 1. CI/CD Fundamentals

### Core Principles
- **Continuous Integration**: Merge code changes frequently
- **Continuous Deployment**: Automate deployment process
- **Quality Gates**: Automated testing và validation
- **Fast Feedback**: Quick notification về build status

## 2. GitLab CI Implementation

### .gitlab-ci.yml Configuration
\`\`\`yaml
stages:
  - build
  - test
  - security
  - deploy

variables:
  DOCKER_REGISTRY: registry.gitlab.com
  IMAGE_NAME: \$CI_PROJECT_PATH

before_script:
  - docker login -u \$CI_REGISTRY_USER -p \$CI_REGISTRY_PASSWORD \$CI_REGISTRY

build:
  stage: build
  script:
    - docker build -t \$CI_REGISTRY_IMAGE:\$CI_COMMIT_SHA .
    - docker push \$CI_REGISTRY_IMAGE:\$CI_COMMIT_SHA

test:unit:
  stage: test
  image: \$CI_REGISTRY_IMAGE:\$CI_COMMIT_SHA
  script:
    - npm test
    - npm run test:coverage
  coverage: '/Lines\\s*:\\s*(\\d+\\.?\\d*)%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura.xml

security:scan:
  stage: security
  script:
    - docker run --rm -v /var/run/docker.sock:/var/run/docker.sock 
        aquasec/trivy image \$CI_REGISTRY_IMAGE:\$CI_COMMIT_SHA

deploy:production:
  stage: deploy
  script:
    - kubectl set image deployment/myapp app=\$CI_REGISTRY_IMAGE:\$CI_COMMIT_SHA
    - kubectl rollout status deployment/myapp
  only:
    - main
\`\`\`

## 3. Jenkins Pipeline

### Declarative Pipeline
\`\`\`groovy
pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'docker.io'
        IMAGE_NAME = 'myapp'
        KUBECONFIG = credentials('kubeconfig')
    }
    
    stages {
        stage('Build') {
            steps {
                script {
                    def image = docker.build("\${IMAGE_NAME}:\${BUILD_NUMBER}")
                    docker.withRegistry('https://\${DOCKER_REGISTRY}', 'docker-hub-credentials') {
                        image.push()
                        image.push('latest')
                    }
                }
            }
        }
        
        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'npm test'
                    }
                    post {
                        always {
                            publishTestResults testResultsPattern: 'test-results.xml'
                        }
                    }
                }
                
                stage('Integration Tests') {
                    steps {
                        sh 'npm run test:integration'
                    }
                }
            }
        }
        
        stage('Security Scan') {
            steps {
                sh '''
                    docker run --rm -v \$(pwd):/workspace \\
                        aquasec/trivy fs --format json --output trivy-report.json /workspace
                '''
                archiveArtifacts artifacts: 'trivy-report.json'
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh '''
                    helm upgrade --install myapp ./helm-chart \\
                        --set image.tag=\${BUILD_NUMBER} \\
                        --set environment=production
                '''
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        failure {
            emailext (
                subject: "Build Failed: \${env.JOB_NAME} - \${env.BUILD_NUMBER}",
                body: "Build failed. Check console output at \${env.BUILD_URL}",
                to: "\${env.CHANGE_AUTHOR_EMAIL}"
            )
        }
    }
}
\`\`\`

## 4. GitHub Actions Workflow

### Complete Workflow
\`\`\`yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Generate coverage report
      run: npm run test:coverage
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3

  security:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Run Trivy vulnerability scanner
      uses: aquasecurity/trivy-action@master
      with:
        scan-type: 'fs'
        scan-ref: '.'
        format: 'sarif'
        output: 'trivy-results.sarif'
    
    - name: Upload Trivy scan results to GitHub Security
      uses: github/codeql-action/upload-sarif@v2
      with:
        sarif_file: 'trivy-results.sarif'

  build-and-deploy:
    needs: [test, security]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Log in to Container Registry
      uses: docker/login-action@v2
      with:
        registry: \${{ env.REGISTRY }}
        username: \${{ github.actor }}
        password: \${{ secrets.GITHUB_TOKEN }}
    
    - name: Build and push Docker image
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:latest
    
    - name: Deploy to Kubernetes
      uses: azure/k8s-deploy@v1
      with:
        manifests: |
          k8s/deployment.yaml
          k8s/service.yaml
        images: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:latest
\`\`\`

## 5. Quality Gates và Testing

### Test Automation Strategy
\`\`\`json
{
  "scripts": {
    "test": "jest",
    "test:unit": "jest --testPathPattern=unit",
    "test:integration": "jest --testPathPattern=integration",
    "test:e2e": "cypress run",
    "test:coverage": "jest --coverage",
    "test:mutation": "stryker run"
  }
}
\`\`\`

### SonarQube Integration
\`\`\`yaml
sonar:
  stage: quality
  script:
    - sonar-scanner
      -Dsonar.projectKey=myproject
      -Dsonar.sources=src
      -Dsonar.tests=tests
      -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
\`\`\`

## 6. Deployment Strategies

### Blue-Green Deployment
\`\`\`bash
# Switch traffic to new version
kubectl patch service myapp-service -p '{"spec":{"selector":{"version":"green"}}}'

# Wait for health checks
sleep 30

# Verify deployment
curl -f http://myapp.example.com/health
\`\`\`

### Canary Deployment
\`\`\`yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: myapp-canary
spec:
  http:
  - match:
    - headers:
        canary:
          exact: "true"
    route:
    - destination:
        host: myapp-service
        subset: v2
  - route:
    - destination:
        host: myapp-service
        subset: v1
      weight: 90
    - destination:
        host: myapp-service
        subset: v2
      weight: 10
\`\`\`

## Kết luận

CI/CD pipeline automation là foundation của modern DevOps practices. Proper implementation của automated testing, security scanning, và deployment strategies sẽ significantly improve software quality và delivery speed.

### Key Benefits:
- Faster time-to-market
- Improved software quality
- Reduced manual errors
- Better collaboration between teams
- Automated security và compliance checks`,
    category: "DevOps",
    tags: ["CI/CD", "GitLab CI", "Jenkins", "GitHub Actions", "Automation"],
    author: "STEP IT Team",
    isPublished: true,
    isFeatured: true
  }
];