import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { InsertArticle } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const devopsArticles: InsertArticle[] = [
  {
    title: "Hướng dẫn Docker từ cơ bản đến nâng cao cho DevOps Engineers",
    slug: "huong-dan-docker-tu-co-ban-den-nang-cao",
    excerpt: "Khóa học Docker toàn diện từ cơ bản đến nâng cao, bao gồm containers, images, Docker Compose và deployment strategies cho các dự án thực tế.",
    content: `# Docker từ Cơ Bản đến Nâng Cao

Docker đã trở thành công cụ không thể thiếu trong DevOps và phát triển phần mềm hiện đại. Bài viết này sẽ hướng dẫn bạn từ những khái niệm cơ bản đến các kỹ thuật nâng cao.

## 1. Docker là gì?

Docker là một platform containerization cho phép đóng gói ứng dụng và dependencies vào các containers nhẹ, portable và isolated.

### Ưu điểm của Docker:
- **Consistency**: Chạy giống nhau trên mọi môi trường
- **Portability**: Di chuyển dễ dàng giữa các systems
- **Efficiency**: Sử dụng tài nguyên hiệu quả hơn VMs
- **Scalability**: Scale up/down nhanh chóng

## 2. Cài đặt Docker

### Ubuntu/Debian:
\`\`\`bash
# Update package index
sudo apt update

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Verify installation
docker --version
\`\`\`

## 3. Docker Images và Containers

### Làm việc với Images:
\`\`\`bash
# Pull image từ Docker Hub
docker pull nginx:latest
docker pull node:18-alpine

# List images
docker images

# Remove image
docker rmi nginx:latest
\`\`\`

### Chạy Containers:
\`\`\`bash
# Chạy container cơ bản
docker run hello-world

# Chạy container interactively
docker run -it ubuntu:20.04 /bin/bash

# Chạy container detached
docker run -d --name mynginx -p 8080:80 nginx
\`\`\`

## 4. Dockerfile - Build Custom Images

### Dockerfile cơ bản cho Node.js app:
\`\`\`dockerfile
# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["npm", "start"]
\`\`\`

## 5. Docker Compose - Multi-Container Applications

### docker-compose.yml cho LAMP stack:
\`\`\`yaml
version: '3.8'

services:
  web:
    image: php:8.1-apache
    container_name: web-server
    ports:
      - "80:80"
    volumes:
      - ./src:/var/www/html
    depends_on:
      - database
    networks:
      - app-network

  database:
    image: mysql:8.0
    container_name: mysql-db
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: myapp
      MYSQL_USER: appuser
      MYSQL_PASSWORD: apppass
    volumes:
      - db-data:/var/lib/mysql
    ports:
      - "3306:3306"
    networks:
      - app-network

volumes:
  db-data:

networks:
  app-network:
    driver: bridge
\`\`\`

## Kết luận

Docker là công cụ mạnh mẽ cho containerization và là nền tảng của DevOps hiện đại. Việc nắm vững Docker sẽ giúp bạn triển khai ứng dụng nhanh chóng, quản lý dependencies hiệu quả và hỗ trợ CI/CD pipelines.`,
    category: "DevOps",
    tags: ["docker", "containerization", "devops", "deployment", "microservices"],
    imageUrl: "https://images.unsplash.com/photo-1605745341112-85968b19335a?w=800&h=400&fit=crop",
    author: "STEP DevOps Team",
    isPublished: true,
    isFeatured: true,
  },
  {
    title: "Kubernetes Production Deployment Guide - Từ Zero đến Hero",
    slug: "kubernetes-production-deployment-guide",
    excerpt: "Hướng dẫn triển khai Kubernetes trong môi trường production, bao gồm cluster setup, workload management, security và monitoring.",
    content: `# Kubernetes Production Deployment Guide

Kubernetes đã trở thành tiêu chuẩn de facto cho container orchestration. Bài viết này sẽ hướng dẫn bạn triển khai K8s từ zero đến production-ready.

## 1. Kubernetes Architecture Overview

### Core Components:
- **Control Plane**: API Server, etcd, Controller Manager, Scheduler
- **Worker Nodes**: kubelet, kube-proxy, Container Runtime
- **Add-ons**: DNS, Dashboard, Monitoring

## 2. Cluster Setup Options

### Managed Kubernetes:
- **AWS EKS**: Fully managed control plane
- **Google GKE**: Auto-scaling và security
- **Azure AKS**: Integration với Azure services

### Self-managed:
\`\`\`bash
# kubeadm cluster init
sudo kubeadm init --pod-network-cidr=10.244.0.0/16

# Setup kubectl
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# Install CNI (Flannel)
kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml
\`\`\`

## 3. Deployment Strategies

### Rolling Updates:
\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web
        image: nginx:1.21
        ports:
        - containerPort: 80
        resources:
          limits:
            cpu: 500m
            memory: 512Mi
          requests:
            cpu: 250m
            memory: 256Mi
\`\`\`

## 4. Services và Networking

### Service Types:
\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  type: LoadBalancer
  selector:
    app: web-app
  ports:
  - port: 80
    targetPort: 80
    protocol: TCP
\`\`\`

### Ingress Controller:
\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-service
            port:
              number: 80
\`\`\`

## 5. ConfigMaps và Secrets

### ConfigMap:
\`\`\`yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  database_url: "postgres://db.example.com:5432/myapp"
  redis_url: "redis://redis.example.com:6379"
\`\`\`

### Secrets:
\`\`\`bash
# Create secret from command line
kubectl create secret generic app-secrets \\
  --from-literal=db-password=secretpassword \\
  --from-literal=api-key=myapikey
\`\`\`

## 6. Persistent Volumes

### StorageClass:
\`\`\`yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp2
  zones: us-west-2a, us-west-2b
\`\`\`

### PersistentVolumeClaim:
\`\`\`yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: database-pvc
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: fast-ssd
  resources:
    requests:
      storage: 20Gi
\`\`\`

## 7. Security Best Practices

### RBAC:
\`\`\`yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: developer
rules:
- apiGroups: [""]
  resources: ["pods", "services"]
  verbs: ["get", "list", "create", "update", "delete"]
\`\`\`

### Network Policies:
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

## 8. Monitoring và Logging

### Prometheus Setup:
\`\`\`bash
# Add Prometheus Helm repo
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

# Install Prometheus stack
helm install monitoring prometheus-community/kube-prometheus-stack
\`\`\`

### Logging với ELK:
\`\`\`yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd
spec:
  selector:
    matchLabels:
      name: fluentd
  template:
    metadata:
      labels:
        name: fluentd
    spec:
      containers:
      - name: fluentd
        image: fluent/fluentd:v1.14-1
        volumeMounts:
        - name: varlog
          mountPath: /var/log
\`\`\`

## Kết luận

Kubernetes mang lại khả năng scale, resilience và automation mạnh mẽ cho containerized applications. Việc triển khai đúng cách sẽ giúp team DevOps quản lý infrastructure hiệu quả và đáng tin cậy.`,
    category: "DevOps",
    tags: ["kubernetes", "k8s", "orchestration", "deployment", "scalability"],
    imageUrl: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop",
    author: "STEP DevOps Team",
    isPublished: true,
    isFeatured: true,
  },
  {
    title: "CI/CD Pipeline với GitLab CI và Jenkins - Best Practices 2024",
    slug: "ci-cd-pipeline-gitlab-jenkins-best-practices",
    excerpt: "Hướng dẫn xây dựng CI/CD pipeline hiệu quả với GitLab CI và Jenkins, bao gồm automated testing, security scanning và deployment strategies.",
    content: `# CI/CD Pipeline Best Practices 2024

Continuous Integration và Continuous Deployment là nền tảng của DevOps hiện đại. Bài viết này sẽ hướng dẫn xây dựng CI/CD pipeline robust và scalable.

## 1. CI/CD Fundamentals

### Continuous Integration:
- Automated build process
- Automated testing
- Code quality checks
- Security scanning

### Continuous Deployment:
- Automated deployment
- Environment promotion
- Rollback capabilities
- Monitoring integration

## 2. GitLab CI Setup

### .gitlab-ci.yml cơ bản:
\`\`\`yaml
stages:
  - build
  - test
  - security
  - deploy

variables:
  DOCKER_REGISTRY: registry.gitlab.com
  IMAGE_NAME: $CI_PROJECT_PATH
  IMAGE_TAG: $CI_COMMIT_SHORT_SHA

before_script:
  - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY

build:
  stage: build
  script:
    - docker build -t $DOCKER_REGISTRY/$IMAGE_NAME:$IMAGE_TAG .
    - docker push $DOCKER_REGISTRY/$IMAGE_NAME:$IMAGE_TAG
  only:
    - master
    - develop

unit_test:
  stage: test
  script:
    - npm install
    - npm run test:unit
    - npm run test:coverage
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
  coverage: '/Statements.*?(\d+(?:\.\d+)?)%/'

integration_test:
  stage: test
  services:
    - postgres:13
    - redis:6
  variables:
    POSTGRES_DB: testdb
    POSTGRES_USER: testuser
    POSTGRES_PASSWORD: testpass
  script:
    - npm run test:integration
  dependencies:
    - build

security_scan:
  stage: security
  script:
    - npm audit --audit-level moderate
    - docker run --rm -v $(pwd):/app -w /app securecodewarrior/docker-security-scan
  allow_failure: true

deploy_staging:
  stage: deploy
  script:
    - kubectl config use-context staging
    - helm upgrade --install myapp ./helm-chart 
        --set image.tag=$IMAGE_TAG 
        --set ingress.host=staging.myapp.com
  environment:
    name: staging
    url: https://staging.myapp.com
  only:
    - develop

deploy_production:
  stage: deploy
  script:
    - kubectl config use-context production
    - helm upgrade --install myapp ./helm-chart 
        --set image.tag=$IMAGE_TAG 
        --set ingress.host=myapp.com
  environment:
    name: production
    url: https://myapp.com
  when: manual
  only:
    - master
\`\`\`

## 3. Jenkins Pipeline

### Jenkinsfile với declarative syntax:
\`\`\`groovy
pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'your-registry.com'
        IMAGE_NAME = 'myapp'
        KUBECONFIG = credentials('kubeconfig')
        DOCKER_CREDENTIALS = credentials('docker-registry')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                script {
                    def imageTag = "${env.BUILD_NUMBER}-${env.GIT_COMMIT.take(7)}"
                    docker.build("${DOCKER_REGISTRY}/${IMAGE_NAME}:${imageTag}")
                }
            }
        }
        
        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'npm install'
                        sh 'npm run test:unit'
                    }
                    post {
                        always {
                            publishTestResults testResultsPattern: 'test-results.xml'
                            publishCoverageReport coverageRuntimePattern: 'coverage/**/*'
                        }
                    }
                }
                
                stage('Integration Tests') {
                    steps {
                        sh 'docker-compose -f docker-compose.test.yml up --abort-on-container-exit'
                    }
                    post {
                        always {
                            sh 'docker-compose -f docker-compose.test.yml down'
                        }
                    }
                }
                
                stage('Security Scan') {
                    steps {
                        sh 'npm audit --audit-level moderate'
                        sh 'docker run --rm -v $(pwd):/app clair-scanner:latest'
                    }
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    kubernetesDeploy(
                        configs: 'k8s/staging/*.yaml',
                        kubeconfigId: 'kubeconfig'
                    )
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'master'
            }
            steps {
                input message: 'Deploy to production?', ok: 'Deploy'
                script {
                    kubernetesDeploy(
                        configs: 'k8s/production/*.yaml',
                        kubeconfigId: 'kubeconfig'
                    )
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        failure {
            slackSend channel: '#devops', 
                     color: 'danger', 
                     message: "Build failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}"
        }
        success {
            slackSend channel: '#devops', 
                     color: 'good', 
                     message: "Build successful: ${env.JOB_NAME} - ${env.BUILD_NUMBER}"
        }
    }
}
\`\`\`

## 4. Advanced Testing Strategies

### Test Automation Pyramid:
\`\`\`javascript
// Unit Tests (70%)
describe('UserService', () => {
  test('should create user with valid data', async () => {
    const userData = { name: 'John', email: 'john@example.com' };
    const user = await userService.create(userData);
    expect(user.id).toBeDefined();
    expect(user.name).toBe('John');
  });
});

// Integration Tests (20%)
describe('API Integration', () => {
  test('POST /users should create user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'John', email: 'john@example.com' })
      .expect(201);
    
    expect(response.body.user.name).toBe('John');
  });
});

// E2E Tests (10%)
describe('User Flow', () => {
  test('should complete user registration flow', async () => {
    await page.goto('/signup');
    await page.fill('#name', 'John Doe');
    await page.fill('#email', 'john@example.com');
    await page.click('#submit');
    await expect(page).toHaveURL('/dashboard');
  });
});
\`\`\`

## 5. Environment Management

### Environment configs:
\`\`\`yaml
# environments/development.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: development
data:
  DATABASE_URL: "postgres://dev-db:5432/myapp"
  REDIS_URL: "redis://dev-redis:6379"
  LOG_LEVEL: "debug"
  
---
# environments/production.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: production
data:
  DATABASE_URL: "postgres://prod-db:5432/myapp"
  REDIS_URL: "redis://prod-redis:6379"
  LOG_LEVEL: "info"
\`\`\`

## 6. Deployment Strategies

### Blue-Green Deployment:
\`\`\`bash
#!/bin/bash
# Blue-Green deployment script

CURRENT_ENV=$(kubectl get service myapp-service -o jsonpath='{.spec.selector.version}')
NEW_ENV=$([[ $CURRENT_ENV == "blue" ]] && echo "green" || echo "blue")

echo "Current environment: $CURRENT_ENV"
echo "Deploying to: $NEW_ENV"

# Deploy new version
kubectl set image deployment/myapp-$NEW_ENV myapp=myapp:$IMAGE_TAG

# Wait for rollout
kubectl rollout status deployment/myapp-$NEW_ENV

# Run health checks
if curl -f http://myapp-$NEW_ENV:8080/health; then
    echo "Health check passed, switching traffic"
    kubectl patch service myapp-service -p '{"spec":{"selector":{"version":"'$NEW_ENV'"}}}'
    echo "Traffic switched to $NEW_ENV"
else
    echo "Health check failed, rolling back"
    exit 1
fi
\`\`\`

## 7. Monitoring và Observability

### Prometheus metrics:
\`\`\`javascript
const client = require('prom-client');

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

// Middleware to collect metrics
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .observe(duration);
    
    httpRequestsTotal
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .inc();
  });
  
  next();
});
\`\`\`

## 8. Security Integration

### SAST/DAST trong pipeline:
\`\`\`yaml
security_checks:
  stage: security
  parallel:
    matrix:
      - SCAN_TYPE: [sast, dast, dependency]
  script:
    - |
      case $SCAN_TYPE in
        sast)
          sonar-scanner -Dsonar.projectKey=$CI_PROJECT_NAME
          ;;
        dast)
          docker run --rm -v $(pwd):/zap/wrk/:rw -t owasp/zap2docker-stable zap-baseline.py -t http://staging.myapp.com
          ;;
        dependency)
          npm audit --audit-level moderate
          snyk test --severity-threshold=high
          ;;
      esac
  artifacts:
    reports:
      sast: gl-sast-report.json
      dast: gl-dast-report.json
\`\`\`

## Kết luận

CI/CD pipeline hiệu quả là backbone của DevOps culture. Việc implement đúng cách sẽ giúp team deliver software nhanh hơn, an toàn hơn và đáng tin cậy hơn.`,
    category: "DevOps",
    tags: ["ci-cd", "gitlab-ci", "jenkins", "automation", "testing"],
    imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=400&fit=crop",
    author: "STEP DevOps Team",
    isPublished: true,
    isFeatured: false,
  },
  {
    title: "Infrastructure as Code với Terraform - Quản lý Cloud Infrastructure Hiệu quả",
    slug: "infrastructure-as-code-terraform-guide",
    excerpt: "Hướng dẫn sử dụng Terraform để quản lý infrastructure trên AWS, Azure và GCP. Bao gồm best practices, modules và state management.",
    content: `# Infrastructure as Code với Terraform

Infrastructure as Code (IaC) là phương pháp quản lý và provision infrastructure thông qua code thay vì manual processes. Terraform là công cụ IaC phổ biến nhất hiện nay.

## 1. Terraform Fundamentals

### Terraform Core Concepts:
- **Providers**: Plugin để tương tác với APIs (AWS, Azure, GCP)
- **Resources**: Infrastructure components (EC2, RDS, VPC)
- **Data Sources**: Fetch information from existing infrastructure
- **Variables**: Input parameters để tái sử dụng code
- **Outputs**: Return values từ Terraform modules

### Installation:
\`\`\`bash
# Download Terraform
wget https://releases.hashicorp.com/terraform/1.5.0/terraform_1.5.0_linux_amd64.zip
unzip terraform_1.5.0_linux_amd64.zip
sudo mv terraform /usr/local/bin/

# Verify installation
terraform --version

# Enable auto-completion
terraform -install-autocomplete
\`\`\`

## 2. AWS Infrastructure Example

### Provider Configuration:
\`\`\`hcl
# providers.tf
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.project_name
      ManagedBy   = "Terraform"
    }
  }
}
\`\`\`

### VPC Setup:
\`\`\`hcl
# vpc.tf
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "\${var.project_name}-vpc"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "\${var.project_name}-igw"
  }
}

resource "aws_subnet" "public" {
  count = length(var.public_subnet_cidrs)

  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "\${var.project_name}-public-subnet-\${count.index + 1}"
    Type = "Public"
  }
}

resource "aws_subnet" "private" {
  count = length(var.private_subnet_cidrs)

  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "\${var.project_name}-private-subnet-\${count.index + 1}"
    Type = "Private"
  }
}

# Route Tables
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "\${var.project_name}-public-rt"
  }
}

resource "aws_route_table_association" "public" {
  count = length(aws_subnet.public)

  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}
\`\`\`

### EC2 Instances với Auto Scaling:
\`\`\`hcl
# ec2.tf
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

resource "aws_launch_template" "web" {
  name_prefix   = "\${var.project_name}-web-"
  image_id      = data.aws_ami.amazon_linux.id
  instance_type = var.instance_type
  key_name      = var.key_pair_name

  vpc_security_group_ids = [aws_security_group.web.id]

  user_data = base64encode(templatefile("\${path.module}/user_data.sh", {
    project_name = var.project_name
  }))

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "\${var.project_name}-web-instance"
    }
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_autoscaling_group" "web" {
  name                = "\${var.project_name}-web-asg"
  vpc_zone_identifier = aws_subnet.private[*].id
  target_group_arns   = [aws_lb_target_group.web.arn]
  health_check_type   = "ELB"
  min_size            = var.min_size
  max_size            = var.max_size
  desired_capacity    = var.desired_capacity

  launch_template {
    id      = aws_launch_template.web.id
    version = "$Latest"
  }

  tag {
    key                 = "Name"
    value               = "\${var.project_name}-web-asg"
    propagate_at_launch = true
  }
}
\`\`\`

### Load Balancer:
\`\`\`hcl
# alb.tf
resource "aws_lb" "main" {
  name               = "\${var.project_name}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = aws_subnet.public[*].id

  enable_deletion_protection = var.environment == "production"

  tags = {
    Name = "\${var.project_name}-alb"
  }
}

resource "aws_lb_target_group" "web" {
  name     = "\${var.project_name}-web-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id

  health_check {
    enabled             = true
    healthy_threshold   = 2
    interval            = 30
    matcher             = "200"
    path                = "/health"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }

  tags = {
    Name = "\${var.project_name}-web-tg"
  }
}

resource "aws_lb_listener" "web" {
  load_balancer_arn = aws_lb.main.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.web.arn
  }
}
\`\`\`

## 3. Variables và Outputs

### Variables:
\`\`\`hcl
# variables.tf
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
  default     = ["10.0.11.0/24", "10.0.12.0/24"]
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"

  validation {
    condition     = contains(["t3.micro", "t3.small", "t3.medium"], var.instance_type)
    error_message = "Instance type must be t3.micro, t3.small, or t3.medium."
  }
}
\`\`\`

### Outputs:
\`\`\`hcl
# outputs.tf
output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "IDs of public subnets"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "IDs of private subnets"
  value       = aws_subnet.private[*].id
}

output "load_balancer_dns" {
  description = "DNS name of the load balancer"
  value       = aws_lb.main.dns_name
}

output "load_balancer_zone_id" {
  description = "Zone ID of the load balancer"
  value       = aws_lb.main.zone_id
}
\`\`\`

## 4. Terraform Modules

### Module Structure:
\`\`\`
modules/
├── vpc/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── README.md
├── ec2/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── user_data.sh
└── rds/
    ├── main.tf
    ├── variables.tf
    └── outputs.tf
\`\`\`

### Using Modules:
\`\`\`hcl
# main.tf
module "vpc" {
  source = "./modules/vpc"

  project_name           = var.project_name
  environment           = var.environment
  vpc_cidr             = var.vpc_cidr
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
}

module "web_servers" {
  source = "./modules/ec2"

  project_name    = var.project_name
  environment     = var.environment
  vpc_id          = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnet_ids
  public_subnets  = module.vpc.public_subnet_ids
  instance_type   = var.instance_type
}

module "database" {
  source = "./modules/rds"

  project_name    = var.project_name
  environment     = var.environment
  vpc_id          = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnet_ids
  
  depends_on = [module.vpc]
}
\`\`\`

## 5. State Management

### Remote State với S3:
\`\`\`hcl
# backend.tf
terraform {
  backend "s3" {
    bucket         = "my-terraform-state-bucket"
    key            = "environments/production/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}
\`\`\`

### State Locking với DynamoDB:
\`\`\`hcl
resource "aws_dynamodb_table" "terraform_locks" {
  name           = "terraform-locks"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Name = "Terraform Lock Table"
  }
}
\`\`\`

## 6. Environment Management

### Environment-specific configs:
\`\`\`hcl
# environments/dev/terraform.tfvars
project_name = "myapp"
environment  = "dev"
instance_type = "t3.micro"
min_size     = 1
max_size     = 2
desired_capacity = 1

# environments/prod/terraform.tfvars
project_name = "myapp"
environment  = "prod"
instance_type = "t3.medium"
min_size     = 2
max_size     = 10
desired_capacity = 4
\`\`\`

## 7. Best Practices

### Security:
\`\`\`hcl
# Security Groups
resource "aws_security_group" "web" {
  name_prefix = "\${var.project_name}-web-"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "HTTP from ALB"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "\${var.project_name}-web-sg"
  }
}
\`\`\`

### Validation và Testing:
\`\`\`bash
# Terraform workflow
terraform init
terraform validate
terraform plan -var-file="environments/dev/terraform.tfvars"
terraform apply -var-file="environments/dev/terraform.tfvars"

# Testing với terratest
go test -v -timeout 30m
\`\`\`

## Kết luận

Infrastructure as Code với Terraform giúp teams quản lý infrastructure một cách consistent, repeatable và scalable. Việc adopt IaC sẽ mang lại benefits lớn về automation, reliability và collaboration.`,
    category: "DevOps",
    tags: ["terraform", "infrastructure-as-code", "aws", "automation", "cloud"],
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
    author: "STEP DevOps Team",
    isPublished: true,
    isFeatured: false,
  },
  {
    title: "Monitoring và Observability Stack - Prometheus, Grafana và ELK",
    slug: "monitoring-observability-prometheus-grafana-elk",
    excerpt: "Hướng dẫn xây dựng monitoring và observability stack hoàn chỉnh với Prometheus, Grafana, Elasticsearch, Logstash và Kibana cho production systems.",
    content: `# Monitoring và Observability Stack

Observability là khả năng hiểu được internal state của system thông qua external outputs. Stack Prometheus + Grafana + ELK cung cấp solution toàn diện cho monitoring, metrics và logging.

## 1. Observability Pillars

### Three Pillars of Observability:
- **Metrics**: Numerical data đo lường performance
- **Logs**: Discrete events với detailed context
- **Traces**: Request flow qua distributed systems

### Key Concepts:
- **SLI (Service Level Indicators)**: Actual measurements
- **SLO (Service Level Objectives)**: Target values cho SLIs
- **SLA (Service Level Agreements)**: Commitments với customers

## 2. Prometheus Setup

### Prometheus Configuration:
\`\`\`yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"
  - "recording_rules.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  - job_name: 'web-app'
    static_configs:
      - targets: ['web-app:8080']
    metrics_path: '/metrics'
    scrape_interval: 30s

  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
\`\`\`

### Docker Compose cho Prometheus Stack:
\`\`\`yaml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - ./alert_rules.yml:/etc/prometheus/alert_rules.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--web.enable-lifecycle'
      - '--web.enable-admin-api'

  alertmanager:
    image: prom/alertmanager:latest
    container_name: alertmanager
    ports:
      - "9093:9093"
    volumes:
      - ./alertmanager.yml:/etc/alertmanager/alertmanager.yml
      - alertmanager_data:/alertmanager

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana/provisioning:/etc/grafana/provisioning

  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    ports:
      - "9100:9100"
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.ignored-mount-points'
      - '^/(sys|proc|dev|host|etc|rootfs/var/lib/docker/containers|rootfs/var/lib/docker/overlay2|rootfs/run/docker/netns|rootfs/var/lib/docker/aufs)($$|/)'

volumes:
  prometheus_data:
  alertmanager_data:
  grafana_data:
\`\`\`

## 3. Application Metrics với Client Libraries

### Node.js Application Metrics:
\`\`\`javascript
const express = require('express');
const client = require('prom-client');

const app = express();

// Create a Registry
const register = new client.Registry();

// Add default metrics
client.collectDefaultMetrics({ register });

// Custom metrics
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const activeConnections = new client.Gauge({
  name: 'active_connections',
  help: 'Number of active connections'
});

const businessMetrics = new client.Counter({
  name: 'orders_total',
  help: 'Total number of orders processed',
  labelNames: ['status', 'payment_method']
});

// Register metrics
register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestsTotal);
register.registerMetric(activeConnections);
register.registerMetric(businessMetrics);

// Middleware to collect HTTP metrics
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route ? req.route.path : req.path;
    
    httpRequestDuration
      .labels(req.method, route, res.statusCode)
      .observe(duration);
    
    httpRequestsTotal
      .labels(req.method, route, res.statusCode)
      .inc();
  });
  
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Business logic
app.post('/orders', (req, res) => {
  const { payment_method } = req.body;
  
  // Process order logic here
  const success = Math.random() > 0.1; // 90% success rate
  
  if (success) {
    businessMetrics.labels('completed', payment_method).inc();
    res.json({ order_id: Date.now(), status: 'completed' });
  } else {
    businessMetrics.labels('failed', payment_method).inc();
    res.status(500).json({ error: 'Order processing failed' });
  }
});

app.listen(8080, () => {
  console.log('App listening on port 8080');
});
\`\`\`

## 4. Alert Rules

### Prometheus Alert Rules:
\`\`\`yaml
# alert_rules.yml
groups:
  - name: infrastructure.rules
    rules:
      - alert: HighCPUUsage
        expr: 100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage detected"
          description: "CPU usage is above 80% for more than 5 minutes on {{ $labels.instance }}"

      - alert: HighMemoryUsage
        expr: (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes * 100 > 85
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage detected"
          description: "Memory usage is above 85% on {{ $labels.instance }}"

      - alert: DiskSpaceLow
        expr: (node_filesystem_avail_bytes / node_filesystem_size_bytes) * 100 < 10
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Disk space is running low"
          description: "Disk space is below 10% on {{ $labels.instance }}"

  - name: application.rules
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status_code=~"5.."}[5m]) / rate(http_requests_total[5m]) > 0.05
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is above 5% for {{ $labels.instance }}"

      - alert: HighResponseTime
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High response time detected"
          description: "95th percentile response time is above 1 second"

      - alert: ServiceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Service is down"
          description: "{{ $labels.instance }} has been down for more than 1 minute"
\`\`\`

### Alertmanager Configuration:
\`\`\`yaml
# alertmanager.yml
global:
  smtp_smarthost: 'smtp.gmail.com:587'
  smtp_from: 'alerts@company.com'

route:
  group_by: ['alertname', 'cluster', 'service']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 1h
  receiver: 'default'
  routes:
    - match:
        severity: critical
      receiver: 'critical-alerts'
    - match:
        severity: warning
      receiver: 'warning-alerts'

receivers:
  - name: 'default'
    email_configs:
      - to: 'team@company.com'
        subject: 'Alert: {{ .GroupLabels.alertname }}'
        body: |
          {{ range .Alerts }}
          Alert: {{ .Annotations.summary }}
          Description: {{ .Annotations.description }}
          {{ end }}

  - name: 'critical-alerts'
    slack_configs:
      - api_url: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK'
        channel: '#alerts-critical'
        title: 'Critical Alert'
        text: |
          {{ range .Alerts }}
          *Alert:* {{ .Annotations.summary }}
          *Description:* {{ .Annotations.description }}
          *Instance:* {{ .Labels.instance }}
          {{ end }}
    email_configs:
      - to: 'oncall@company.com'
        subject: 'CRITICAL: {{ .GroupLabels.alertname }}'

  - name: 'warning-alerts'
    slack_configs:
      - api_url: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK'
        channel: '#alerts-warning'
        title: 'Warning Alert'
\`\`\`

## 5. ELK Stack Setup

### Docker Compose cho ELK:
\`\`\`yaml
version: '3.8'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.8.0
    container_name: elasticsearch
    environment:
      - discovery.type=single-node
      - ES_JAVA_OPTS=-Xms1g -Xmx1g
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data

  logstash:
    image: docker.elastic.co/logstash/logstash:8.8.0
    container_name: logstash
    ports:
      - "5044:5044"
      - "9600:9600"
    volumes:
      - ./logstash/pipeline:/usr/share/logstash/pipeline
      - ./logstash/config:/usr/share/logstash/config
    depends_on:
      - elasticsearch

  kibana:
    image: docker.elastic.co/kibana/kibana:8.8.0
    container_name: kibana
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    depends_on:
      - elasticsearch

  filebeat:
    image: docker.elastic.co/beats/filebeat:8.8.0
    container_name: filebeat
    user: root
    volumes:
      - ./filebeat/filebeat.yml:/usr/share/filebeat/filebeat.yml
      - /var/log:/var/log:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
    depends_on:
      - logstash

volumes:
  elasticsearch_data:
\`\`\`

### Logstash Pipeline:
\`\`\`ruby
# logstash/pipeline/logstash.conf
input {
  beats {
    port => 5044
  }
}

filter {
  if [fields][log_type] == "nginx" {
    grok {
      match => { "message" => "%{NGINXACCESS}" }
    }
    
    date {
      match => [ "timestamp", "dd/MMM/yyyy:HH:mm:ss Z" ]
    }
    
    mutate {
      convert => { "response" => "integer" }
      convert => { "bytes" => "integer" }
      convert => { "responsetime" => "float" }
    }
  }
  
  if [fields][log_type] == "application" {
    if [message] =~ /^{.*}$/ {
      json {
        source => "message"
      }
    }
    
    if [level] {
      mutate {
        uppercase => [ "level" ]
      }
    }
  }
  
  # GeoIP enrichment
  if [clientip] {
    geoip {
      source => "clientip"
      target => "geoip"
    }
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "%{[@metadata][beat]}-%{[@metadata][version]}-%{+YYYY.MM.dd}"
  }
  
  # Debug output
  stdout {
    codec => rubydebug
  }
}
\`\`\`

### Filebeat Configuration:
\`\`\`yaml
# filebeat/filebeat.yml
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /var/log/nginx/*.log
  fields:
    log_type: nginx
    service: web
  fields_under_root: true

- type: log
  enabled: true
  paths:
    - /var/log/app/*.log
  fields:
    log_type: application
    service: backend
  fields_under_root: true
  multiline.pattern: '^\\d{4}-\\d{2}-\\d{2}'
  multiline.negate: true
  multiline.match: after

- type: docker
  containers.ids:
    - '*'
  processors:
    - add_docker_metadata:
        host: "unix:///var/run/docker.sock"

output.logstash:
  hosts: ["logstash:5044"]

processors:
  - add_host_metadata:
      when.not.contains.tags: forwarded
  - add_docker_metadata: ~

logging.level: info
logging.to_files: true
logging.files:
  path: /var/log/filebeat
  name: filebeat
  keepfiles: 7
  permissions: 0644
\`\`\`

## 6. Grafana Dashboards

### Dashboard Configuration:
\`\`\`json
{
  "dashboard": {
    "id": null,
    "title": "Application Metrics",
    "tags": ["application", "metrics"],
    "timezone": "browser",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} {{route}}"
          }
        ],
        "yAxes": [
          {
            "label": "Requests/sec",
            "min": 0
          }
        ]
      },
      {
        "title": "Response Time P95",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "95th percentile"
          }
        ]
      },
      {
        "title": "Error Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total{status_code=~\"5..\"}[5m]) / rate(http_requests_total[5m]) * 100",
            "legendFormat": "Error Rate %"
          }
        ]
      }
    ]
  }
}
\`\`\`

## 7. Best Practices

### Monitoring Strategy:
1. **USE Method**: Utilization, Saturation, Errors
2. **RED Method**: Rate, Errors, Duration
3. **Four Golden Signals**: Latency, Traffic, Errors, Saturation

### Alerting Best Practices:
- Alert on symptoms, not causes
- Keep alert fatigue low
- Use runbooks cho mỗi alert
- Test alerting rules regularly

## Kết luận

Monitoring và observability stack với Prometheus, Grafana và ELK cung cấp comprehensive visibility vào systems. Việc implement đúng cách sẽ giúp teams detect issues early, reduce MTTR và improve system reliability.`,
    category: "DevOps",
    tags: ["monitoring", "prometheus", "grafana", "elk", "observability"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    author: "STEP DevOps Team",
    isPublished: true,
    isFeatured: false,
  },
  {
    title: "Container Orchestration và Microservices Architecture Best Practices",
    slug: "container-orchestration-microservices-best-practices",
    excerpt: "Hướng dẫn thiết kế và triển khai microservices architecture với container orchestration, service mesh và distributed systems patterns.",
    content: `# Container Orchestration và Microservices Architecture

Microservices architecture kết hợp với container orchestration mang lại scalability và flexibility cho modern applications. Bài viết này sẽ hướng dẫn best practices và design patterns.

## 1. Microservices Architecture Fundamentals

### Core Principles:
- **Single Responsibility**: Mỗi service có một business capability
- **Decentralized**: Autonomous services với own data
- **Fault Tolerant**: Isolated failures không ảnh hưởng toàn hệ thống
- **Technology Agnostic**: Services có thể dùng different tech stacks

### Benefits:
- Independent deployment và scaling
- Technology diversity
- Team autonomy
- Improved fault isolation

### Challenges:
- Distributed system complexity
- Network latency và reliability
- Data consistency
- Testing complexity

## 2. Service Design Patterns

### API Gateway Pattern:
\`\`\`yaml
# api-gateway.yaml
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: api-gateway
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - api.example.com
  - port:
      number: 443
      name: https
      protocol: HTTPS
    tls:
      mode: SIMPLE
      credentialName: api-tls-secret
    hosts:
    - api.example.com

---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: api-routes
spec:
  hosts:
  - api.example.com
  gateways:
  - api-gateway
  http:
  - match:
    - uri:
        prefix: /users
    route:
    - destination:
        host: user-service
        port:
          number: 8080
  - match:
    - uri:
        prefix: /orders
    route:
    - destination:
        host: order-service
        port:
          number: 8080
  - match:
    - uri:
        prefix: /payments
    route:
    - destination:
        host: payment-service
        port:
          number: 8080
\`\`\`

### Circuit Breaker Pattern:
\`\`\`javascript
const CircuitBreaker = require('opossum');

const options = {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000,
  rollingCountTimeout: 10000,
  rollingCountBuckets: 10
};

const breaker = new CircuitBreaker(callExternalService, options);

breaker.fallback(() => ({
  status: 'service_unavailable',
  message: 'Service temporarily unavailable',
  data: getCachedData()
}));

breaker.on('open', () => console.log('Circuit breaker opened'));
breaker.on('halfOpen', () => console.log('Circuit breaker half-open'));
breaker.on('close', () => console.log('Circuit breaker closed'));

async function callExternalService(data) {
  const response = await fetch('http://external-service/api', {
    method: 'POST',
    body: JSON.stringify(data),
    timeout: 3000
  });
  
  if (!response.ok) {
    throw new Error(\`Service error: \${response.status}\`);
  }
  
  return response.json();
}

// Usage
app.post('/api/process', async (req, res) => {
  try {
    const result = await breaker.fire(req.body);
    res.json(result);
  } catch (error) {
    res.status(503).json({
      error: 'Service unavailable',
      retry_after: 30
    });
  }
});
\`\`\`

## 3. Service Mesh với Istio

### Istio Installation:
\`\`\`bash
# Install Istio
curl -L https://istio.io/downloadIstio | sh -
cd istio-*
export PATH=$PWD/bin:$PATH

# Install Istio in cluster
istioctl install --set values.defaultRevision=default

# Enable sidecar injection
kubectl label namespace default istio-injection=enabled

# Install addons
kubectl apply -f samples/addons/prometheus.yaml
kubectl apply -f samples/addons/grafana.yaml
kubectl apply -f samples/addons/jaeger.yaml
kubectl apply -f samples/addons/kiali.yaml
\`\`\`

### Service Mesh Configuration:
\`\`\`yaml
# traffic-management.yaml
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: user-service-dr
spec:
  host: user-service
  trafficPolicy:
    connectionPool:
      tcp:
        maxConnections: 100
      http:
        http1MaxPendingRequests: 10
        maxRequestsPerConnection: 2
    circuitBreaker:
      consecutiveErrors: 3
      interval: 30s
      baseEjectionTime: 30s
    outlierDetection:
      consecutive5xxErrors: 3
      interval: 30s
      baseEjectionTime: 30s
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2

---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: user-service-vs
spec:
  hosts:
  - user-service
  http:
  - match:
    - headers:
        canary:
          exact: "true"
    route:
    - destination:
        host: user-service
        subset: v2
      weight: 100
  - route:
    - destination:
        host: user-service
        subset: v1
      weight: 90
    - destination:
        host: user-service
        subset: v2
      weight: 10
\`\`\`

## 4. Data Management Patterns

### Database per Service:
\`\`\`yaml
# user-service database
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-db
spec:
  replicas: 1
  selector:
    matchLabels:
      app: user-db
  template:
    metadata:
      labels:
        app: user-db
    spec:
      containers:
      - name: postgres
        image: postgres:13
        env:
        - name: POSTGRES_DB
          value: userdb
        - name: POSTGRES_USER
          value: userapp
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: user-db-secret
              key: password
        volumeMounts:
        - name: user-db-storage
          mountPath: /var/lib/postgresql/data
      volumes:
      - name: user-db-storage
        persistentVolumeClaim:
          claimName: user-db-pvc

---
# order-service database
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-db
spec:
  replicas: 1
  selector:
    matchLabels:
      app: order-db
  template:
    metadata:
      labels:
        app: order-db
    spec:
      containers:
      - name: postgres
        image: postgres:13
        env:
        - name: POSTGRES_DB
          value: orderdb
        - name: POSTGRES_USER
          value: orderapp
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: order-db-secret
              key: password
        volumeMounts:
        - name: order-db-storage
          mountPath: /var/lib/postgresql/data
      volumes:
      - name: order-db-storage
        persistentVolumeClaim:
          claimName: order-db-pvc
\`\`\`

### Event Sourcing với Kafka:
\`\`\`javascript
const kafka = require('kafkajs');

const client = kafka({
  clientId: 'order-service',
  brokers: ['kafka:9092']
});

const producer = client.producer();
const consumer = client.consumer({ groupId: 'order-group' });

// Event publishing
async function publishEvent(event) {
  await producer.send({
    topic: 'order-events',
    messages: [{
      key: event.orderId,
      value: JSON.stringify(event),
      timestamp: Date.now(),
      headers: {
        eventType: event.type,
        version: '1.0'
      }
    }]
  });
}

// Event consumption
async function startEventConsumer() {
  await consumer.subscribe({ topic: 'order-events' });
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const event = JSON.parse(message.value.toString());
      
      switch (event.type) {
        case 'ORDER_CREATED':
          await handleOrderCreated(event);
          break;
        case 'ORDER_UPDATED':
          await handleOrderUpdated(event);
          break;
        case 'ORDER_CANCELLED':
          await handleOrderCancelled(event);
          break;
        default:
          console.log(\`Unknown event type: \${event.type}\`);
      }
    },
  });
}

// Saga pattern for distributed transactions
class OrderSaga {
  constructor() {
    this.steps = [];
    this.compensations = [];
  }
  
  addStep(action, compensation) {
    this.steps.push(action);
    this.compensations.push(compensation);
    return this;
  }
  
  async execute(data) {
    const executedSteps = [];
    
    try {
      for (const step of this.steps) {
        await step(data);
        executedSteps.push(step);
      }
      return { success: true };
    } catch (error) {
      // Compensate in reverse order
      for (let i = executedSteps.length - 1; i >= 0; i--) {
        try {
          await this.compensations[i](data);
        } catch (compensationError) {
          console.error('Compensation failed:', compensationError);
        }
      }
      throw error;
    }
  }
}
\`\`\`

## 5. Service Discovery và Load Balancing

### Kubernetes Service Discovery:
\`\`\`yaml
# Service definitions
apiVersion: v1
kind: Service
metadata:
  name: user-service
  labels:
    app: user-service
spec:
  selector:
    app: user-service
  ports:
  - port: 8080
    targetPort: 8080
    name: http
  type: ClusterIP

---
apiVersion: v1
kind: Service
metadata:
  name: order-service
  labels:
    app: order-service
spec:
  selector:
    app: order-service
  ports:
  - port: 8080
    targetPort: 8080
    name: http
  type: ClusterIP

---
# Service Monitor for Prometheus
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: microservices-monitor
spec:
  selector:
    matchLabels:
      monitoring: enabled
  endpoints:
  - port: metrics
    path: /metrics
    interval: 30s
\`\`\`

## 6. Security Patterns

### mTLS với Istio:
\`\`\`yaml
# Enable strict mTLS
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: production
spec:
  mtls:
    mode: STRICT

---
# Authorization policies
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: user-service-authz
  namespace: production
spec:
  selector:
    matchLabels:
      app: user-service
  rules:
  - from:
    - source:
        principals: ["cluster.local/ns/production/sa/api-gateway"]
  - to:
    - operation:
        methods: ["GET", "POST"]
        paths: ["/users/*"]
\`\`\`

### JWT Authentication:
\`\`\`javascript
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: 'https://auth.example.com/.well-known/jwks.json',
  cache: true,
  cacheMaxAge: 86400000 // 24 hours
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, getKey, {
    audience: 'api.example.com',
    issuer: 'https://auth.example.com',
    algorithms: ['RS256']
  }, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);
\`\`\`

## 7. Testing Strategies

### Contract Testing với Pact:
\`\`\`javascript
// Consumer test (API Gateway)
const { Pact } = require('@pact-foundation/pact');
const path = require('path');

const provider = new Pact({
  consumer: 'api-gateway',
  provider: 'user-service',
  port: 1234,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'INFO'
});

describe('User Service Contract', () => {
  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());

  describe('Get User', () => {
    beforeEach(() => {
      return provider.addInteraction({
        state: 'user exists',
        uponReceiving: 'a request for user',
        withRequest: {
          method: 'GET',
          path: '/users/123',
          headers: {
            'Accept': 'application/json'
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            id: 123,
            name: 'John Doe',
            email: 'john@example.com'
          }
        }
      });
    });

    test('should return user data', async () => {
      const response = await fetch('http://localhost:1234/users/123');
      const user = await response.json();
      
      expect(response.status).toBe(200);
      expect(user.id).toBe(123);
      expect(user.name).toBe('John Doe');
    });
  });
});
\`\`\`

## 8. Deployment Strategies

### Canary Deployment:
\`\`\`yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: user-service-rollout
spec:
  replicas: 10
  strategy:
    canary:
      steps:
      - setWeight: 10
      - pause: {duration: 30s}
      - setWeight: 20
      - pause: {duration: 30s}
      - setWeight: 50
      - pause: {duration: 60s}
      - setWeight: 100
      canaryService: user-service-canary
      stableService: user-service-stable
      trafficRouting:
        istio:
          virtualService:
            name: user-service-vs
            routes:
            - primary
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: user-service:v2.0
        ports:
        - containerPort: 8080
\`\`\`

## Kết luận

Container orchestration và microservices architecture yêu cầu careful planning và robust patterns. Việc implement đúng cách sẽ mang lại benefits về scalability, maintainability và team productivity.`,
    category: "DevOps",
    tags: ["microservices", "containers", "orchestration", "service-mesh", "architecture"],
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    author: "STEP DevOps Team",
    isPublished: true,
    isFeatured: false,
  },
  {
    title: "DevOps Security - DevSecOps Implementation và Security Best Practices",
    slug: "devsecops-implementation-security-best-practices",
    excerpt: "Hướng dẫn triển khai DevSecOps pipeline với security scanning, compliance checking và security automation trong CI/CD workflow.",
    content: `# DevSecOps Implementation Guide

DevSecOps tích hợp security vào mọi giai đoạn của SDLC. Bài viết này hướng dẫn implementation strategies và best practices để shift security left.

## 1. DevSecOps Fundamentals

### Shift Left Security:
- **Static Application Security Testing (SAST)**: Code analysis
- **Dynamic Application Security Testing (DAST)**: Runtime testing
- **Interactive Application Security Testing (IAST)**: Hybrid approach
- **Software Composition Analysis (SCA)**: Dependency scanning

### Security as Code:
- Infrastructure security policies
- Automated compliance checking  
- Security testing automation
- Incident response automation

## 2. Secure CI/CD Pipeline

### GitLab CI Security Pipeline:
\`\`\`yaml
# .gitlab-ci.yml
stages:
  - security-scan
  - build
  - test
  - security-test
  - deploy

variables:
  SECURE_LOG_LEVEL: "info"
  SAST_EXCLUDED_PATHS: "spec, test, tests, tmp"

# Secret Detection
secret_detection:
  stage: security-scan
  image: registry.gitlab.com/gitlab-org/security-products/analyzers/secrets:latest
  script:
    - /analyzer run
  artifacts:
    reports:
      secret_detection: gl-secret-detection-report.json
  only:
    - branches

# SAST Scanning
sast:
  stage: security-scan
  image: registry.gitlab.com/gitlab-org/security-products/analyzers/sobelow:latest
  script:
    - /analyzer run
  artifacts:
    reports:
      sast: gl-sast-report.json
  only:
    - branches

# Dependency Scanning
dependency_scanning:
  stage: security-scan
  image: registry.gitlab.com/gitlab-org/security-products/analyzers/gemnasium:latest
  script:
    - /analyzer run
  artifacts:
    reports:
      dependency_scanning: gl-dependency-scanning-report.json
  only:
    - branches

# Container Scanning
container_scanning:
  stage: security-test
  image: registry.gitlab.com/gitlab-org/security-products/analyzers/clair:latest
  variables:
    CI_APPLICATION_REPOSITORY: $CI_REGISTRY_IMAGE
    CI_APPLICATION_TAG: $CI_COMMIT_SHA
  script:
    - /analyzer run
  artifacts:
    reports:
      container_scanning: gl-container-scanning-report.json
  dependencies:
    - build
  only:
    - branches

# DAST Scanning
dast:
  stage: security-test
  image: registry.gitlab.com/gitlab-org/security-products/analyzers/dast:latest
  variables:
    DAST_WEBSITE: https://staging.example.com
    DAST_FULL_SCAN_ENABLED: "true"
  script:
    - /analyzer run
  artifacts:
    reports:
      dast: gl-dast-report.json
  only:
    - master
  environment:
    name: staging
\`\`\`

### Security Gates:
\`\`\`yaml
# Security quality gates
security_gate:
  stage: security-test
  image: alpine:latest
  before_script:
    - apk add --no-cache jq
  script:
    - |
      # Check SAST results
      if [ -f gl-sast-report.json ]; then
        HIGH_VULNS=$(jq '.vulnerabilities[] | select(.severity == "High")' gl-sast-report.json | jq -s length)
        CRITICAL_VULNS=$(jq '.vulnerabilities[] | select(.severity == "Critical")' gl-sast-report.json | jq -s length)
        
        if [ "$CRITICAL_VULNS" -gt 0 ]; then
          echo "CRITICAL: Found $CRITICAL_VULNS critical vulnerabilities"
          exit 1
        fi
        
        if [ "$HIGH_VULNS" -gt 5 ]; then
          echo "ERROR: Found $HIGH_VULNS high vulnerabilities (max allowed: 5)"
          exit 1
        fi
      fi
      
      # Check dependency scan results
      if [ -f gl-dependency-scanning-report.json ]; then
        DEP_CRITICAL=$(jq '.vulnerabilities[] | select(.severity == "Critical")' gl-dependency-scanning-report.json | jq -s length)
        if [ "$DEP_CRITICAL" -gt 0 ]; then
          echo "CRITICAL: Found $DEP_CRITICAL critical dependency vulnerabilities"
          exit 1
        fi
      fi
      
      echo "Security gate passed"
  dependencies:
    - sast
    - dependency_scanning
  only:
    - master
\`\`\`

## 3. Infrastructure Security

### Security Policies với Open Policy Agent:
\`\`\`rego
# pod-security-policy.rego
package kubernetes.admission

import data.kubernetes.namespaces

deny[msg] {
  input.request.kind.kind == "Pod"
  input.request.object.spec.securityContext.runAsUser == 0
  msg := "Containers must not run as root"
}

deny[msg] {
  input.request.kind.kind == "Pod"
  input.request.object.spec.containers[_].securityContext.privileged == true
  msg := "Privileged containers are not allowed"
}

deny[msg] {
  input.request.kind.kind == "Pod"
  container := input.request.object.spec.containers[_]
  not container.securityContext.readOnlyRootFilesystem == true
  msg := "Containers must have read-only root filesystem"
}

deny[msg] {
  input.request.kind.kind == "Pod"
  container := input.request.object.spec.containers[_]
  not container.resources.limits.memory
  msg := "Containers must have memory limits"
}

deny[msg] {
  input.request.kind.kind == "Pod"
  container := input.request.object.spec.containers[_]
  not container.resources.limits.cpu
  msg := "Containers must have CPU limits"
}

# Network policy enforcement
deny[msg] {
  input.request.kind.kind == "Pod"
  input.request.object.metadata.namespace == "production"
  not input.request.object.metadata.labels["network-policy"]
  msg := "Pods in production must have network policy labels"
}
\`\`\`

### Kubernetes Security Configuration:
\`\`\`yaml
# pod-security-standards.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted

---
# Network Policy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
  namespace: production
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress

---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-web-to-api
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: api-server
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: web-frontend
    ports:
    - protocol: TCP
      port: 8080

---
# RBAC Configuration
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: production
  name: developer
rules:
- apiGroups: [""]
  resources: ["pods", "services", "configmaps"]
  verbs: ["get", "list", "create", "update", "patch"]
- apiGroups: ["apps"]
  resources: ["deployments", "replicasets"]
  verbs: ["get", "list", "create", "update", "patch"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: developer-binding
  namespace: production
subjects:
- kind: User
  name: developer@company.com
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: developer
  apiGroup: rbac.authorization.k8s.io
\`\`\`

## 4. Secrets Management

### HashiCorp Vault Integration:
\`\`\`yaml
# vault-configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: vault-config
data:
  vault.hcl: |
    ui = true
    
    listener "tcp" {
      address     = "0.0.0.0:8200"
      tls_disable = 1
    }
    
    storage "consul" {
      address = "consul:8500"
      path    = "vault/"
    }
    
    seal "awskms" {
      region     = "us-west-2"
      kms_key_id = "alias/vault-unseal-key"
    }

---
# Vault Agent for secret injection
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp-with-vault
spec:
  replicas: 1
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      labels:
        app: webapp
      annotations:
        vault.hashicorp.com/agent-inject: "true"
        vault.hashicorp.com/role: "webapp"
        vault.hashicorp.com/agent-inject-secret-database: "database/creds/webapp"
        vault.hashicorp.com/agent-inject-template-database: |
          {{- with secret "database/creds/webapp" -}}
          DATABASE_URL="postgres://{{ .Data.username }}:{{ .Data.password }}@postgres:5432/webapp"
          {{- end }}
    spec:
      serviceAccountName: webapp-vault
      containers:
      - name: webapp
        image: webapp:latest
        env:
        - name: VAULT_ADDR
          value: "http://vault:8200"
        volumeMounts:
        - name: vault-secrets
          mountPath: /vault/secrets
          readOnly: true
      volumes:
      - name: vault-secrets
        emptyDir: {}
\`\`\`

### External Secrets Operator:
\`\`\`yaml
# external-secrets.yaml
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: vault-backend
  namespace: production
spec:
  provider:
    vault:
      server: "https://vault.company.com"
      path: "secret"
      version: "v2"
      auth:
        kubernetes:
          mountPath: "kubernetes"
          role: "production-role"
          serviceAccountRef:
            name: "external-secrets-sa"

---
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: app-secrets
  namespace: production
spec:
  refreshInterval: 60s
  secretStoreRef:
    name: vault-backend
    kind: SecretStore
  target:
    name: app-secrets
    creationPolicy: Owner
  data:
  - secretKey: database-password
    remoteRef:
      key: database
      property: password
  - secretKey: api-key
    remoteRef:
      key: api
      property: key
\`\`\`

## 5. Security Monitoring

### Falco Security Rules:
\`\`\`yaml
# falco-rules.yaml
- rule: Detect shell in container
  desc: Alert if a shell is used in a container
  condition: >
    spawned_process and container and
    shell_procs and proc.pname exists
  output: >
    Shell spawned in container
    (user=%user.name container_id=%container.id container_name=%container.name 
     shell=%proc.name parent=%proc.pname cmdline=%proc.cmdline)
  priority: WARNING

- rule: Detect privilege escalation
  desc: Alert on privilege escalation attempts
  condition: >
    spawned_process and container and
    ((proc.name in (sudo, su)) or
     (proc.cmdline contains "chmod +s") or
     (proc.cmdline contains "setuid"))
  output: >
    Privilege escalation attempt
    (user=%user.name container_id=%container.id container_name=%container.name 
     process=%proc.name cmdline=%proc.cmdline)
  priority: CRITICAL

- rule: Detect file system changes in containers
  desc: Alert on unexpected file system modifications
  condition: >
    open_write and container and fd.typechar='f' and
    (fd.name startswith /bin/ or
     fd.name startswith /usr/bin/ or
     fd.name startswith /sbin/ or
     fd.name startswith /usr/sbin/)
  output: >
    File system modification in container
    (user=%user.name container_id=%container.id file=%fd.name 
     command=%proc.cmdline)
  priority: WARNING

- rule: Network connection to suspicious port
  desc: Alert on connections to commonly abused ports
  condition: >
    inbound_outbound and fd.sport in (4444, 5555, 6666, 7777, 8888, 9999) and 
    not proc.name in (nginx, apache2, httpd)
  output: >
    Connection to suspicious port
    (connection=%fd.name sport=%fd.sport dport=%fd.dport 
     proc=%proc.name cmdline=%proc.cmdline)
  priority: HIGH
\`\`\`

### Security Metrics Collection:
\`\`\`javascript
const prometheus = require('prom-client');

// Security metrics
const securityEvents = new prometheus.Counter({
  name: 'security_events_total',
  help: 'Total number of security events',
  labelNames: ['type', 'severity', 'source']
});

const vulnerabilityScans = new prometheus.Counter({
  name: 'vulnerability_scans_total',
  help: 'Total number of vulnerability scans',
  labelNames: ['scanner', 'status']
});

const authenticationAttempts = new prometheus.Counter({
  name: 'authentication_attempts_total',
  help: 'Total authentication attempts',
  labelNames: ['method', 'status', 'user_agent']
});

// Security middleware
function securityMiddleware(req, res, next) {
  // Track authentication attempts
  if (req.path === '/auth/login') {
    authenticationAttempts
      .labels(req.body.method || 'password', 'attempt', req.get('User-Agent'))
      .inc();
  }
  
  // Detect suspicious activity
  const suspiciousPatterns = [
    /\\.\\.\\//, // Directory traversal
    /<script/i, // XSS attempts
    /union.*select/i, // SQL injection
    /exec\\(/, // Code injection
  ];
  
  const userInput = JSON.stringify(req.body) + req.url + JSON.stringify(req.query);
  
  suspiciousPatterns.forEach(pattern => {
    if (pattern.test(userInput)) {
      securityEvents
        .labels('malicious_input', 'high', req.ip)
        .inc();
      
      console.warn(\`Suspicious activity detected from \${req.ip}: \${pattern}\`);
    }
  });
  
  next();
}

// Rate limiting with security focus
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 auth requests per windowMs
  message: 'Too many authentication attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  onLimitReached: (req) => {
    securityEvents
      .labels('rate_limit_exceeded', 'medium', req.ip)
      .inc();
  }
});

module.exports = {
  securityMiddleware,
  authLimiter,
  securityEvents,
  vulnerabilityScans,
  authenticationAttempts
};
\`\`\`

## 6. Compliance và Governance

### CIS Benchmark Automation:
\`\`\`bash
#!/bin/bash
# CIS Kubernetes Benchmark automated checks

echo "Running CIS Kubernetes Benchmark checks..."

# 1.1.1 Ensure API server is not exposed on insecure port
check_api_server_insecure_port() {
    echo "Checking API server insecure port..."
    kubectl get pods -n kube-system -o yaml | grep -E "insecure-port|insecure-bind-address"
    if [ $? -eq 0 ]; then
        echo "FAIL: API server may be exposed on insecure port"
        return 1
    else
        echo "PASS: API server insecure port check"
        return 0
    fi
}

# 1.2.1 Ensure anonymous auth is disabled
check_anonymous_auth() {
    echo "Checking anonymous authentication..."
    kubectl get pods -n kube-system -o yaml | grep "anonymous-auth=false"
    if [ $? -eq 0 ]; then
        echo "PASS: Anonymous auth is disabled"
        return 0
    else
        echo "FAIL: Anonymous auth may be enabled"
        return 1
    fi
}

# 3.2.1 Ensure network policy is enabled
check_network_policy() {
    echo "Checking network policies..."
    kubectl get networkpolicies --all-namespaces
    if [ $? -eq 0 ]; then
        echo "PASS: Network policies are configured"
        return 0
    else
        echo "FAIL: No network policies found"
        return 1
    fi
}

# 5.1.1 Ensure RBAC is enabled
check_rbac() {
    echo "Checking RBAC configuration..."
    kubectl auth can-i create pods --as=system:anonymous
    if [ $? -ne 0 ]; then
        echo "PASS: RBAC is properly configured"
        return 0
    else
        echo "FAIL: RBAC may be misconfigured"
        return 1
    fi
}

# Run all checks
TOTAL_CHECKS=0
PASSED_CHECKS=0

for check in check_api_server_insecure_port check_anonymous_auth check_network_policy check_rbac; do
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    if $check; then
        PASSED_CHECKS=$((PASSED_CHECKS + 1))
    fi
    echo "---"
done

echo "CIS Benchmark Results: $PASSED_CHECKS/$TOTAL_CHECKS checks passed"

if [ $PASSED_CHECKS -eq $TOTAL_CHECKS ]; then
    echo "All checks passed!"
    exit 0
else
    echo "Some checks failed. Please review security configuration."
    exit 1
fi
\`\`\`

## 7. Incident Response Automation

### Security Incident Playbook:
\`\`\`python
# security_incident_response.py
import asyncio
import json
from datetime import datetime
from typing import Dict, List

class SecurityIncidentResponse:
    def __init__(self, alert_manager, slack_client, vault_client):
        self.alert_manager = alert_manager
        self.slack_client = slack_client
        self.vault_client = vault_client
        self.incident_log = []
    
    async def handle_security_alert(self, alert: Dict):
        """Main incident response handler"""
        severity = alert.get('severity', 'unknown')
        alert_type = alert.get('type', 'unknown')
        
        incident_id = f"SEC-{datetime.now().strftime('%Y%m%d-%H%M%S')}"
        
        self.log_incident(incident_id, alert)
        
        # Route based on severity
        if severity == 'critical':
            await self.handle_critical_incident(incident_id, alert)
        elif severity == 'high':
            await self.handle_high_incident(incident_id, alert)
        else:
            await self.handle_low_incident(incident_id, alert)
    
    async def handle_critical_incident(self, incident_id: str, alert: Dict):
        """Handle critical security incidents"""
        # 1. Immediate notification
        await self.notify_security_team(incident_id, alert, urgent=True)
        
        # 2. Automated containment
        if alert['type'] == 'malicious_activity':
            await self.block_suspicious_ip(alert.get('source_ip'))
        elif alert['type'] == 'privilege_escalation':
            await self.isolate_affected_pod(alert.get('pod_name'))
        elif alert['type'] == 'data_exfiltration':
            await self.block_outbound_traffic(alert.get('source'))
        
        # 3. Evidence collection
        await self.collect_forensic_evidence(alert)
        
        # 4. Rotate credentials if needed
        if alert['type'] in ['credential_compromise', 'unauthorized_access']:
            await self.rotate_affected_credentials(alert)
    
    async def block_suspicious_ip(self, ip_address: str):
        """Block suspicious IP at network level"""
        network_policy = {
            "apiVersion": "networking.k8s.io/v1",
            "kind": "NetworkPolicy",
            "metadata": {
                "name": f"block-ip-{ip_address.replace('.', '-')}",
                "namespace": "default"
            },
            "spec": {
                "podSelector": {},
                "policyTypes": ["Ingress"],
                "ingress": [
                    {
                        "from": [
                            {
                                "ipBlock": {
                                    "cidr": "0.0.0.0/0",
                                    "except": [f"{ip_address}/32"]
                                }
                            }
                        ]
                    }
                ]
            }
        }
        
        # Apply network policy via kubectl
        await self.apply_k8s_resource(network_policy)
        self.log_action(f"Blocked IP address: {ip_address}")
    
    async def isolate_affected_pod(self, pod_name: str):
        """Isolate compromised pod"""
        # Label pod for isolation
        isolation_labels = {
            "security.status": "isolated",
            "incident.id": incident_id
        }
        
        await self.label_pod(pod_name, isolation_labels)
        
        # Apply strict network policy
        isolation_policy = {
            "apiVersion": "networking.k8s.io/v1",
            "kind": "NetworkPolicy",
            "metadata": {
                "name": f"isolate-{pod_name}",
                "namespace": "default"
            },
            "spec": {
                "podSelector": {
                    "matchLabels": {
                        "security.status": "isolated"
                    }
                },
                "policyTypes": ["Ingress", "Egress"]
                # No ingress/egress rules = deny all
            }
        }
        
        await self.apply_k8s_resource(isolation_policy)
        self.log_action(f"Isolated pod: {pod_name}")
    
    async def collect_forensic_evidence(self, alert: Dict):
        """Collect evidence for investigation"""
        evidence = {
            "timestamp": datetime.now().isoformat(),
            "alert": alert,
            "system_state": await self.get_system_snapshot(),
            "network_connections": await self.get_network_connections(),
            "process_list": await self.get_running_processes(),
            "file_changes": await self.get_recent_file_changes()
        }
        
        # Store evidence securely
        await self.store_evidence(evidence)
        self.log_action("Forensic evidence collected")
    
    def log_incident(self, incident_id: str, alert: Dict):
        """Log security incident"""
        log_entry = {
            "incident_id": incident_id,
            "timestamp": datetime.now().isoformat(),
            "alert": alert,
            "status": "active"
        }
        
        self.incident_log.append(log_entry)
        print(f"Security incident logged: {incident_id}")

# Usage
async def main():
    incident_response = SecurityIncidentResponse(
        alert_manager=AlertManager(),
        slack_client=SlackClient(),
        vault_client=VaultClient()
    )
    
    # Example critical alert
    critical_alert = {
        "severity": "critical",
        "type": "privilege_escalation",
        "source_ip": "192.168.1.100",
        "pod_name": "webapp-suspicious",
        "description": "Unauthorized sudo access detected",
        "evidence": {
            "process": "sudo /bin/bash",
            "user": "www-data",
            "timestamp": "2024-01-15T10:30:00Z"
        }
    }
    
    await incident_response.handle_security_alert(critical_alert)

if __name__ == "__main__":
    asyncio.run(main())
\`\`\`

## Kết luận

DevSecOps implementation yêu cầu cultural shift và technical changes. Việc integrate security vào mọi giai đoạn của development lifecycle sẽ giúp organizations build more secure và resilient systems.`,
    category: "DevOps",
    tags: ["devsecops", "security", "compliance", "automation", "monitoring"],
    imageUrl: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&h=400&fit=crop",
    author: "STEP DevOps Team",
    isPublished: true,
    isFeatured: false,
  },
  {
    title: "GitOps Workflow với ArgoCD và Flux - Modern Deployment Strategies",
    slug: "gitops-workflow-argocd-flux-deployment",
    excerpt: "Hướng dẫn triển khai GitOps workflow với ArgoCD và Flux, bao gồm declarative deployments, automated rollbacks và multi-environment management.",
    content: `# GitOps Workflow với ArgoCD và Flux

GitOps là operational framework sử dụng Git như single source of truth cho declarative infrastructure và applications. Bài viết này hướng dẫn implementation với ArgoCD và Flux.

## 1. GitOps Principles

### Core Principles:
- **Declarative**: Infrastructure và applications defined declaratively
- **Versioned**: All changes tracked trong Git với complete history
- **Pulled Automatically**: Agents tự động pull changes từ Git
- **Continuously Reconciled**: System state continuously reconciled với Git

### Benefits:
- Improved deployment reliability
- Faster mean time to deployment (MTTD)
- Enhanced security với pull-based model
- Complete audit trail
- Easy rollbacks và disaster recovery

## 2. ArgoCD Setup và Configuration

### ArgoCD Installation:
\`\`\`bash
# Install ArgoCD
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Install ArgoCD CLI
curl -sSL -o argocd-linux-amd64 https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
sudo install -m 555 argocd-linux-amd64 /usr/local/bin/argocd

# Port forward to access UI
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Get initial admin password
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
\`\`\`

### ArgoCD Configuration:
\`\`\`yaml
# argocd-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-cm
  namespace: argocd
data:
  url: https://argocd.example.com
  application.instanceLabelKey: argocd.argoproj.io/instance
  
  # Repository credentials
  repositories: |
    - url: https://github.com/company/k8s-manifests
      passwordSecret:
        name: repo-secret
        key: password
      usernameSecret:
        name: repo-secret
        key: username
    - url: https://charts.helm.sh/stable
      type: helm
      name: stable
  
  # OIDC configuration
  oidc.config: |
    name: Corporate SSO
    issuer: https://auth.company.com
    clientId: argocd
    clientSecret: $oidc.clientSecret
    requestedScopes: ["openid", "profile", "email", "groups"]
    requestedIDTokenClaims: {"groups": {"essential": true}}

  # RBAC policy
  policy.default: role:readonly
  policy.csv: |
    p, role:admin, applications, *, *, allow
    p, role:admin, clusters, *, *, allow
    p, role:admin, repositories, *, *, allow
    
    p, role:developer, applications, get, */*, allow
    p, role:developer, applications, sync, */*, allow
    p, role:developer, applications, action/*, */*, allow
    
    g, argocd-admins, role:admin
    g, developers, role:developer
\`\`\`

### Application Manifest:
\`\`\`yaml
# applications/web-app.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: web-app
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: default
  source:
    repoURL: https://github.com/company/k8s-manifests
    targetRevision: HEAD
    path: applications/web-app
    helm:
      valueFiles:
        - values-production.yaml
      parameters:
        - name: image.tag
          value: v1.2.3
        - name: replicaCount
          value: "3"
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
      allowEmpty: false
    syncOptions:
      - CreateNamespace=true
      - PrunePropagationPolicy=foreground
      - PruneLast=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m
  revisionHistoryLimit: 10
\`\`\`

## 3. Flux v2 Setup

### Flux Installation:
\`\`\`bash
# Install Flux CLI
curl -s https://fluxcd.io/install.sh | sudo bash

# Bootstrap Flux
export GITHUB_TOKEN=<your-token>
flux bootstrap github \\
  --owner=company \\
  --repository=k8s-cluster \\
  --branch=main \\
  --path=./clusters/production \\
  --personal

# Verify installation
flux check
\`\`\`

### Flux Sources và Kustomizations:
\`\`\`yaml
# sources/web-app-source.yaml
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: GitRepository
metadata:
  name: web-app
  namespace: flux-system
spec:
  interval: 1m
  ref:
    branch: main
  url: https://github.com/company/web-app-manifests
  secretRef:
    name: git-credentials

---
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: HelmRepository
metadata:
  name: bitnami
  namespace: flux-system
spec:
  interval: 10m
  url: https://charts.bitnami.com/bitnami

---
# kustomizations/web-app.yaml
apiVersion: kustomize.toolkit.fluxcd.io/v1beta2
kind: Kustomization
metadata:
  name: web-app
  namespace: flux-system
spec:
  interval: 5m
  path: "./manifests"
  prune: true
  sourceRef:
    kind: GitRepository
    name: web-app
  validation: client
  healthChecks:
    - apiVersion: apps/v1
      kind: Deployment
      name: web-app
      namespace: production
  dependsOn:
    - name: infrastructure
\`\`\`

### Helm Releases với Flux:
\`\`\`yaml
# releases/postgresql.yaml
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: postgresql
  namespace: flux-system
spec:
  interval: 10m
  chart:
    spec:
      chart: postgresql
      version: "11.x.x"
      sourceRef:
        kind: HelmRepository
        name: bitnami
      interval: 5m
  releaseName: postgresql
  targetNamespace: database
  createNamespace: true
  values:
    auth:
      postgresPassword: ${POSTGRES_PASSWORD}
      database: webapp
    primary:
      persistence:
        enabled: true
        size: 50Gi
        storageClass: fast-ssd
    readReplicas:
      replicaCount: 2
  valuesFrom:
    - kind: Secret
      name: postgresql-values
      valuesKey: values.yaml
      optional: false
\`\`\`

## 4. Multi-Environment Management

### Environment Structure:
\`\`\`
gitops-repo/
├── clusters/
│   ├── development/
│   │   ├── infrastructure/
│   │   └── applications/
│   ├── staging/
│   │   ├── infrastructure/
│   │   └── applications/
│   └── production/
│       ├── infrastructure/
│       └── applications/
└── base/
    ├── infrastructure/
    └── applications/
\`\`\`

### Kustomize Overlays:
\`\`\`yaml
# base/applications/web-app/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web-app
        image: web-app:latest
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"

---
# clusters/production/applications/web-app/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
- ../../../../base/applications/web-app

patchesStrategicMerge:
- replica-patch.yaml
- resource-patch.yaml

images:
- name: web-app
  newTag: v1.2.3

namespace: production

---
# clusters/production/applications/web-app/replica-patch.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 5

---
# clusters/production/applications/web-app/resource-patch.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  template:
    spec:
      containers:
      - name: web-app
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
\`\`\`

## 5. Progressive Delivery

### Canary Deployments với Flagger:
\`\`\`yaml
# Install Flagger
kubectl apply -k github.com/fluxcd/flagger//kustomize/base

# Canary configuration
apiVersion: flagger.app/v1beta1
kind: Canary
metadata:
  name: web-app
  namespace: production
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  progressDeadlineSeconds: 60
  service:
    port: 80
    targetPort: 8080
    gateways:
    - public-gateway.istio-system.svc.cluster.local
    hosts:
    - app.example.com
  analysis:
    interval: 1m
    threshold: 5
    maxWeight: 50
    stepWeight: 10
    metrics:
    - name: request-success-rate
      thresholdRange:
        min: 99
      interval: 1m
    - name: request-duration
      thresholdRange:
        max: 500
      interval: 30s
    webhooks:
    - name: acceptance-test
      type: pre-rollout
      url: http://web-app-test-runner.test:80
      timeout: 30s
      metadata:
        type: bash
        cmd: "curl -sd 'test' http://web-app-canary.production:80/test | grep OK"
    - name: load-test
      type: rollout
      url: http://flagger-loadtester.test/
      timeout: 5s
      metadata:
        cmd: "hey -z 1m -q 10 -c 2 http://app.example.com/"
\`\`\`

### Blue-Green với ArgoCD Rollouts:
\`\`\`yaml
# rollout.yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: web-app
spec:
  replicas: 5
  strategy:
    blueGreen:
      activeService: web-app-active
      previewService: web-app-preview
      autoPromotionEnabled: false
      scaleDownDelaySeconds: 30
      prePromotionAnalysis:
        templates:
        - templateName: success-rate
        args:
        - name: service-name
          value: web-app-preview.production.svc.cluster.local
      postPromotionAnalysis:
        templates:
        - templateName: success-rate
        args:
        - name: service-name
          value: web-app-active.production.svc.cluster.local
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web-app
        image: web-app:blue
        ports:
        - containerPort: 8080

---
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: success-rate
spec:
  args:
  - name: service-name
  metrics:
  - name: success-rate
    interval: 10s
    count: 5
    successCondition: result[0] >= 0.95
    provider:
      prometheus:
        address: http://prometheus.monitoring.svc.cluster.local:9090
        query: |
          sum(rate(
            http_requests_total{job="{{args.service-name}}",status!~"5.*"}[2m]
          )) / 
          sum(rate(
            http_requests_total{job="{{args.service-name}}"}[2m]
          ))
\`\`\`

## 6. Secret Management trong GitOps

### Sealed Secrets:
\`\`\`bash
# Install Sealed Secrets controller
kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.18.0/controller.yaml

# Install kubeseal CLI
wget https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.18.0/kubeseal-linux-amd64 -O kubeseal
sudo install -m 755 kubeseal /usr/local/bin/kubeseal

# Create sealed secret
echo -n mypassword | kubectl create secret generic mysecret --dry-run=client --from-file=password=/dev/stdin -o yaml | kubeseal -o yaml > mysealedsecret.yaml
\`\`\`

### External Secrets với GitOps:
\`\`\`yaml
# external-secret.yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: database-credentials
  namespace: production
spec:
  refreshInterval: 60s
  secretStoreRef:
    name: vault-secret-store
    kind: SecretStore
  target:
    name: database-credentials
    creationPolicy: Owner
    template:
      engineVersion: v2
      data:
        DATABASE_URL: "postgres://{{ .username }}:{{ .password }}@postgres:5432/webapp"
  data:
  - secretKey: username
    remoteRef:
      key: database/production
      property: username
  - secretKey: password
    remoteRef:
      key: database/production
      property: password
\`\`\`

## 7. GitOps Monitoring và Observability

### ArgoCD Notifications:
\`\`\`yaml
# argocd-notifications-cm.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
  namespace: argocd
data:
  service.slack: |
    token: $slack-token
  template.app-deployed: |
    email:
      subject: New version of an application {{.app.metadata.name}} is up and running.
    message: |
      {{if eq .serviceType "slack"}}:white_check_mark:{{end}} Application {{.app.metadata.name}} is now running new version.
    slack:
      attachments: |
        [{
          "title": "{{ .app.metadata.name}}",
          "title_link":"{{.context.argocdUrl}}/applications/{{.app.metadata.name}}",
          "color": "#18be52",
          "fields": [
          {
            "title": "Sync Status",
            "value": "{{.app.status.sync.status}}",
            "short": true
          },
          {
            "title": "Repository",
            "value": "{{.app.spec.source.repoURL}}",
            "short": true
          },
          {
            "title": "Revision",
            "value": "{{.app.status.sync.revision}}",
            "short": true
          }
          {{range $index, $c := .app.status.conditions}}
          {{if not $index}},{{end}}
          {{if $index}},{{end}}
          {
            "title": "{{$c.type}}",
            "value": "{{$c.message}}",
            "short": true
          }
          {{end}}
          ]
        }]
  trigger.on-deployed: |
    - description: Application is synced and healthy
      send:
      - app-deployed
      when: app.status.operationState.phase in ['Succeeded'] and app.status.health.status == 'Healthy'
  subscriptions: |
    - recipients:
      - slack:deployments
      triggers:
      - on-deployed
\`\`\`

### Flux Monitoring Stack:
\`\`\`yaml
# monitoring/flux-system-monitors.yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: flux-system
  namespace: flux-system
spec:
  selector:
    matchLabels:
      app.kubernetes.io/part-of: flux
  endpoints:
  - port: http-prom
    interval: 30s
    path: /metrics

---
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: flux-system
  namespace: flux-system
spec:
  groups:
  - name: flux
    rules:
    - alert: FluxComponentAbsent
      expr: absent(up{job=~"flux-system/.*"})
      for: 5m
      labels:
        severity: critical
      annotations:
        summary: "Flux component has disappeared from Prometheus target discovery"
    
    - alert: FluxReconciliationFailure
      expr: increase(gotk_reconcile_duration_seconds_count{kind!="Bucket",result!="success"}[10m]) > 0
      for: 0m
      labels:
        severity: warning
      annotations:
        summary: "Flux reconciliation failure"
        description: "{{ $labels.kind }}/{{ $labels.name }} reconciliation has been failing for more than 10 minutes"
\`\`\`

## 8. Best Practices

### Repository Structure:
\`\`\`
# Recommended structure
gitops-repo/
├── apps/
│   ├── base/
│   └── overlays/
│       ├── development/
│       ├── staging/
│       └── production/
├── infrastructure/
│   ├── base/
│   └── overlays/
│       ├── development/
│       ├── staging/
│       └── production/
├── clusters/
│   ├── development/
│   ├── staging/
│   └── production/
└── docs/
    ├── runbooks/
    └── architecture/
\`\`\`

### Security Considerations:
- Separate repositories cho infrastructure và applications
- Use branch protection rules
- Implement RBAC cho Git repositories
- Regular access reviews
- Audit trail cho tất cả changes

## Kết luận

GitOps với ArgoCD và Flux mang lại reliable, secure và auditable deployment process. Việc adopt GitOps sẽ improve deployment frequency, reduce lead time và increase deployment success rate.`,
    category: "DevOps",
    tags: ["gitops", "argocd", "flux", "kubernetes", "deployment"],
    imageUrl: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop",
    author: "STEP DevOps Team",
    isPublished: true,
    isFeatured: false,
  },
  {
    title: "Cloud-Native Development với Service Mesh và Observability",
    slug: "cloud-native-development-service-mesh-observability",
    excerpt: "Hướng dẫn phát triển cloud-native applications với service mesh, distributed tracing, metrics collection và comprehensive observability stack.",
    content: `# Cloud-Native Development Guide

Cloud-native development tận dụng cloud computing advantages để build scalable, resilient applications. Bài viết này hướng dẫn modern practices với service mesh và observability.

## 1. Cloud-Native Fundamentals

### The 12-Factor App Principles:
1. **Codebase**: One codebase tracked trong version control
2. **Dependencies**: Explicitly declare và isolate dependencies
3. **Config**: Store config trong environment
4. **Backing Services**: Treat backing services như attached resources
5. **Build, Release, Run**: Strictly separate build và run stages
6. **Processes**: Execute app như one or more stateless processes
7. **Port Binding**: Export services via port binding
8. **Concurrency**: Scale out via process model
9. **Disposability**: Maximize robustness với fast startup và graceful shutdown
10. **Dev/Prod Parity**: Keep development, staging và production similar
11. **Logs**: Treat logs như event streams
12. **Admin Processes**: Run admin/management tasks như one-off processes

### Cloud-Native Characteristics:
- **Microservices Architecture**: Loosely coupled services
- **Containerization**: Consistent deployment environments
- **Dynamic Orchestration**: Container orchestration platforms
- **DevOps Integration**: Automated CI/CD pipelines

## 2. Service Mesh Implementation

### Istio Service Mesh Setup:
\`\`\`bash
# Install Istio
curl -L https://istio.io/downloadIstio | sh -
cd istio-*
export PATH=$PWD/bin:$PATH

# Install với configuration profile
istioctl install --set values.defaultRevision=default

# Enable sidecar injection
kubectl label namespace default istio-injection=enabled

# Install observability addons
kubectl apply -f samples/addons/
\`\`\`

### Istio Configuration:
\`\`\`yaml
# gateway.yaml
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: app-gateway
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "*.example.com"
  - port:
      number: 443
      name: https
      protocol: HTTPS
    tls:
      mode: SIMPLE
      credentialName: app-tls-secret
    hosts:
    - "*.example.com"

---
# virtual-service.yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: app-routing
spec:
  hosts:
  - "app.example.com"
  gateways:
  - app-gateway
  http:
  - match:
    - uri:
        prefix: "/api/v1/"
    route:
    - destination:
        host: api-service
        port:
          number: 8080
      weight: 90
    - destination:
        host: api-service-v2
        port:
          number: 8080
      weight: 10
    fault:
      delay:
        percentage:
          value: 0.1
        fixedDelay: 5s
    retries:
      attempts: 3
      perTryTimeout: 2s
    timeout: 10s

---
# destination-rule.yaml
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: api-service-dr
spec:
  host: api-service
  trafficPolicy:
    loadBalancer:
      simple: LEAST_CONN
    connectionPool:
      tcp:
        maxConnections: 100
      http:
        http1MaxPendingRequests: 50
        maxRequestsPerConnection: 5
    circuitBreaker:
      consecutiveGatewayErrors: 3
      interval: 30s
      baseEjectionTime: 30s
      maxEjectionPercent: 50
    outlierDetection:
      consecutive5xxErrors: 3
      interval: 30s
      baseEjectionTime: 30s
      minHealthPercent: 50
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
\`\`\`

## 3. Distributed Tracing với Jaeger

### Jaeger Setup:
\`\`\`yaml
# jaeger-operator.yaml
apiVersion: jaegertracing.io/v1
kind: Jaeger
metadata:
  name: jaeger-production
  namespace: observability
spec:
  strategy: production
  collector:
    maxReplicas: 5
    resources:
      limits:
        cpu: 2
        memory: 2Gi
      requests:
        cpu: 1
        memory: 1Gi
  storage:
    type: elasticsearch
    elasticsearch:
      nodeCount: 3
      storage:
        size: 50Gi
        storageClassName: fast-ssd
      resources:
        limits:
          cpu: 2
          memory: 4Gi
        requests:
          cpu: 1
          memory: 2Gi
  query:
    replicas: 2
    resources:
      limits:
        cpu: 1
        memory: 1Gi
      requests:
        cpu: 500m
        memory: 512Mi
\`\`\`

### Application Tracing Implementation:
\`\`\`javascript
// Node.js application với OpenTelemetry
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

// Initialize OpenTelemetry SDK
const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'api-service',
    [SemanticResourceAttributes.SERVICE_VERSION]: process.env.SERVICE_VERSION || '1.0.0',
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV || 'development',
  }),
  traceExporter: new JaegerExporter({
    endpoint: process.env.JAEGER_ENDPOINT || 'http://jaeger-collector:14268/api/traces',
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

// Express application với custom tracing
const express = require('express');
const { trace, SpanStatusCode } = require('@opentelemetry/api');

const app = express();
const tracer = trace.getTracer('api-service');

// Custom middleware for detailed tracing
app.use((req, res, next) => {
  const span = tracer.startSpan(\`\${req.method} \${req.path}\`);
  
  span.setAttributes({
    'http.method': req.method,
    'http.url': req.url,
    'http.route': req.route?.path || req.path,
    'user.id': req.user?.id,
    'user.role': req.user?.role,
  });

  res.on('finish', () => {
    span.setAttributes({
      'http.status_code': res.statusCode,
      'http.response.size': res.get('content-length') || 0,
    });

    if (res.statusCode >= 400) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: \`HTTP \${res.statusCode}\`,
      });
    }

    span.end();
  });

  req.span = span;
  next();
});

// Business logic với custom spans
app.get('/api/v1/users/:id', async (req, res) => {
  const span = tracer.startSpan('get-user-details');
  
  try {
    span.setAttributes({
      'user.id': req.params.id,
      'operation': 'get_user_details',
    });

    // Database call với tracing
    const userSpan = tracer.startSpan('database.query.user');
    userSpan.setAttributes({
      'db.system': 'postgresql',
      'db.statement': 'SELECT * FROM users WHERE id = $1',
      'db.operation': 'SELECT',
    });

    const user = await getUserById(req.params.id);
    userSpan.end();

    if (!user) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: 'User not found',
      });
      return res.status(404).json({ error: 'User not found' });
    }

    // External API call với tracing
    const profileSpan = tracer.startSpan('external.api.profile');
    profileSpan.setAttributes({
      'http.method': 'GET',
      'http.url': \`https://profile-service/users/\${user.id}\`,
      'service.name': 'profile-service',
    });

    const profile = await fetchUserProfile(user.id);
    profileSpan.end();

    span.setAttributes({
      'user.found': true,
      'profile.loaded': !!profile,
    });

    res.json({ user, profile });
  } catch (error) {
    span.recordException(error);
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: error.message,
    });
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    span.end();
  }
});
\`\`\`

## 4. Metrics Collection với Prometheus

### Application Metrics:
\`\`\`javascript
const client = require('prom-client');

// Create custom metrics
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code', 'version'],
  buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 5, 10],
});

const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code', 'version'],
});

const activeConnections = new client.Gauge({
  name: 'active_connections',
  help: 'Number of active connections',
});

const businessMetrics = new client.Counter({
  name: 'business_operations_total',
  help: 'Total number of business operations',
  labelNames: ['operation', 'status', 'customer_tier'],
});

const cacheHitRate = new client.Histogram({
  name: 'cache_hit_rate',
  help: 'Cache hit rate',
  labelNames: ['cache_type', 'operation'],
});

// Database connection pool metrics
const dbPoolConnections = new client.Gauge({
  name: 'database_pool_connections',
  help: 'Number of database pool connections',
  labelNames: ['pool', 'state'],
});

// Queue metrics
const queueSize = new client.Gauge({
  name: 'queue_size',
  help: 'Number of items in queue',
  labelNames: ['queue_name'],
});

const queueProcessingTime = new client.Histogram({
  name: 'queue_processing_duration_seconds',
  help: 'Time spent processing queue items',
  labelNames: ['queue_name', 'status'],
  buckets: [0.01, 0.1, 0.5, 1, 5, 10, 30, 60],
});

// Middleware for HTTP metrics
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route ? req.route.path : req.path;
    const version = req.headers['api-version'] || 'v1';
    
    httpRequestDuration
      .labels(req.method, route, res.statusCode, version)
      .observe(duration);
    
    httpRequestsTotal
      .labels(req.method, route, res.statusCode, version)
      .inc();
  });
  
  next();
});

// Business metrics example
app.post('/api/v1/orders', async (req, res) => {
  const startTime = Date.now();
  
  try {
    const order = await processOrder(req.body);
    
    businessMetrics
      .labels('order_creation', 'success', req.user.tier)
      .inc();
    
    res.json(order);
  } catch (error) {
    businessMetrics
      .labels('order_creation', 'error', req.user.tier)
      .inc();
    
    res.status(500).json({ error: error.message });
  }
});

// Background job để collect system metrics
setInterval(() => {
  // Database pool metrics
  const pool = database.getPool();
  dbPoolConnections.labels('main', 'idle').set(pool.idleCount);
  dbPoolConnections.labels('main', 'active').set(pool.totalCount - pool.idleCount);
  
  // Queue metrics
  const queueSizes = getQueueSizes();
  Object.entries(queueSizes).forEach(([queueName, size]) => {
    queueSize.labels(queueName).set(size);
  });
  
  // Active connections
  activeConnections.set(getCurrentConnectionCount());
}, 10000);

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});
\`\`\`

## 5. Logging Strategy

### Structured Logging:
\`\`\`javascript
const winston = require('winston');
const { format } = winston;

// Create structured logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json(),
    format.printf(info => {
      const { timestamp, level, message, ...meta } = info;
      
      const logEntry = {
        '@timestamp': timestamp,
        level,
        message,
        service: 'api-service',
        version: process.env.SERVICE_VERSION || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        ...meta
      };
      
      // Add trace context if available
      const span = trace.getActiveSpan();
      if (span) {
        const spanContext = span.spanContext();
        logEntry.traceId = spanContext.traceId;
        logEntry.spanId = spanContext.spanId;
      }
      
      return JSON.stringify(logEntry);
    })
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

// Request logging middleware
app.use((req, res, next) => {
  const requestId = req.headers['x-request-id'] || generateRequestId();
  req.requestId = requestId;
  
  logger.info('HTTP request started', {
    method: req.method,
    url: req.url,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    requestId,
    userId: req.user?.id,
  });
  
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    logger.info('HTTP request completed', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration,
      requestId,
      userId: req.user?.id,
      responseSize: res.get('content-length') || 0,
    });
  });
  
  next();
});

// Error logging
app.use((error, req, res, next) => {
  logger.error('Request error', {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    method: req.method,
    url: req.url,
    requestId: req.requestId,
    userId: req.user?.id,
  });
  
  res.status(500).json({ 
    error: 'Internal server error',
    requestId: req.requestId 
  });
});

// Structured business logging
function logBusinessEvent(event, data, req) {
  logger.info('Business event', {
    event,
    data,
    requestId: req?.requestId,
    userId: req?.user?.id,
    sessionId: req?.sessionID,
  });
}

// Usage example
app.post('/api/v1/users', async (req, res) => {
  try {
    const user = await createUser(req.body);
    
    logBusinessEvent('user_created', {
      userId: user.id,
      email: user.email,
      role: user.role,
    }, req);
    
    res.status(201).json(user);
  } catch (error) {
    logger.error('User creation failed', {
      error: {
        name: error.name,
        message: error.message,
      },
      requestData: req.body,
      requestId: req.requestId,
    });
    
    res.status(400).json({ error: error.message });
  }
});
\`\`\`

## 6. Health Checks và Readiness Probes

### Comprehensive Health Checks:
\`\`\`javascript
const healthChecks = {
  database: async () => {
    try {
      await database.query('SELECT 1');
      return { status: 'healthy', responseTime: Date.now() };
    } catch (error) {
      return { status: 'unhealthy', error: error.message };
    }
  },
  
  redis: async () => {
    try {
      const start = Date.now();
      await redis.ping();
      return { 
        status: 'healthy', 
        responseTime: Date.now() - start,
        connections: redis.status
      };
    } catch (error) {
      return { status: 'unhealthy', error: error.message };
    }
  },
  
  externalAPI: async () => {
    try {
      const start = Date.now();
      const response = await fetch('https://api.external-service.com/health', {
        timeout: 5000
      });
      return { 
        status: response.ok ? 'healthy' : 'unhealthy',
        responseTime: Date.now() - start,
        statusCode: response.status
      };
    } catch (error) {
      return { status: 'unhealthy', error: error.message };
    }
  },
  
  diskSpace: async () => {
    try {
      const stats = await fs.promises.statvfs('/');
      const freeSpace = (stats.f_bavail * stats.f_frsize) / (1024 * 1024 * 1024); // GB
      const usedPercent = ((stats.f_blocks - stats.f_bavail) / stats.f_blocks) * 100;
      
      return {
        status: usedPercent < 90 ? 'healthy' : 'unhealthy',
        freeSpaceGB: freeSpace,
        usedPercent: Math.round(usedPercent)
      };
    } catch (error) {
      return { status: 'unhealthy', error: error.message };
    }
  }
};

// Health endpoint
app.get('/health', async (req, res) => {
  const results = {};
  let overallStatus = 'healthy';
  
  // Run all health checks in parallel
  await Promise.all(
    Object.entries(healthChecks).map(async ([name, check]) => {
      try {
        results[name] = await check();
        if (results[name].status !== 'healthy') {
          overallStatus = 'unhealthy';
        }
      } catch (error) {
        results[name] = { status: 'unhealthy', error: error.message };
        overallStatus = 'unhealthy';
      }
    })
  );
  
  const response = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    service: 'api-service',
    version: process.env.SERVICE_VERSION || '1.0.0',
    checks: results
  };
  
  res.status(overallStatus === 'healthy' ? 200 : 503).json(response);
});

// Readiness endpoint (simpler check)
app.get('/ready', async (req, res) => {
  try {
    // Basic checks for readiness
    await database.query('SELECT 1');
    await redis.ping();
    
    res.json({ 
      status: 'ready',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({ 
      status: 'not ready',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Liveness endpoint (very basic check)
app.get('/live', (req, res) => {
  res.json({ 
    status: 'alive',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
\`\`\`

## 7. Configuration Management

### 12-Factor Config:
\`\`\`javascript
// config.js
const config = {
  server: {
    port: parseInt(process.env.PORT) || 8080,
    host: process.env.HOST || '0.0.0.0',
  },
  
  database: {
    url: process.env.DATABASE_URL || 'postgres://localhost:5432/app',
    pool: {
      min: parseInt(process.env.DB_POOL_MIN) || 2,
      max: parseInt(process.env.DB_POOL_MAX) || 10,
    },
    ssl: process.env.NODE_ENV === 'production',
  },
  
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    keyPrefix: process.env.REDIS_KEY_PREFIX || 'app:',
  },
  
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiry: process.env.JWT_EXPIRY || '24h',
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12,
  },
  
  external: {
    apiBaseUrl: process.env.EXTERNAL_API_URL,
    apiKey: process.env.EXTERNAL_API_KEY,
    timeout: parseInt(process.env.EXTERNAL_API_TIMEOUT) || 5000,
  },
  
  observability: {
    jaegerEndpoint: process.env.JAEGER_ENDPOINT,
    logLevel: process.env.LOG_LEVEL || 'info',
    metricsEnabled: process.env.METRICS_ENABLED !== 'false',
  },
  
  features: {
    enableNewFeature: process.env.ENABLE_NEW_FEATURE === 'true',
    maxUploadSize: parseInt(process.env.MAX_UPLOAD_SIZE) || 10485760, // 10MB
  }
};

// Validation
const requiredEnvVars = [
  'DATABASE_URL',
  'JWT_SECRET',
  'EXTERNAL_API_KEY'
];

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(\`Required environment variable \${varName} is not set\`);
  }
});

module.exports = config;
\`\`\`

## Kết luận

Cloud-native development với service mesh và comprehensive observability enables teams để build highly scalable, resilient applications. Proper implementation của distributed tracing, metrics, logging và health checks là essential cho production-ready cloud-native systems.`,
    category: "DevOps",
    tags: ["cloud-native", "service-mesh", "observability", "microservices", "monitoring"],
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    author: "STEP DevOps Team",
    isPublished: true,
    isFeatured: false,
  }
];

export function SeedDevOpsArticles() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSeeding, setIsSeeding] = useState(false);

  const seedMutation = useMutation({
    mutationFn: async (articles: InsertArticle[]) => {
      const results = [];
      for (const article of articles) {
        const response = await apiRequest("/api/articles", "POST", article);
        const result = await response.json();
        results.push(result);
      }
      return results;
    },
    onSuccess: (results) => {
      toast({
        title: "Thành công!",
        description: `Đã tạo ${results.length} bài viết DevOps mới.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/articles/published"] });
      queryClient.invalidateQueries({ queryKey: ["/api/articles/featured"] });
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi!",
        description: error.message || "Có lỗi xảy ra khi tạo bài viết.",
        variant: "destructive",
      });
    },
  });

  const handleSeedArticles = async () => {
    setIsSeeding(true);
    try {
      await seedMutation.mutateAsync(devopsArticles);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-600">
          🚀 Seed DevOps Articles
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-blue-700 mb-4">
            Tạo <strong>{devopsArticles.length} bài viết DevOps chuyên sâu</strong> cho blog STEP:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {devopsArticles.map((article, index) => (
              <div key={index} className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-sm text-blue-800 mb-1">{article.title}</h4>
                <p className="text-xs text-blue-600 mb-2">{article.excerpt}</p>
                <div className="flex gap-1 flex-wrap">
                  {article.tags?.slice(0, 3).map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">📋 Nội dung bao gồm:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Docker từ cơ bản đến nâng cao với production setup</li>
              <li>• Kubernetes deployment guide với real-world examples</li>
              <li>• CI/CD pipelines với GitLab CI và Jenkins</li>
              <li>• Infrastructure as Code với Terraform</li>
              <li>• Monitoring stack với Prometheus, Grafana và ELK</li>
            </ul>
          </div>

          <Button
            onClick={handleSeedArticles}
            disabled={isSeeding || seedMutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
            data-testid="button-seed-devops"
          >
            {isSeeding || seedMutation.isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Đang tạo bài viết...
              </>
            ) : (
              <>
                🚀 Tạo {devopsArticles.length} Bài Viết DevOps
              </>
            )}
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            Các bài viết sẽ được publish ngay lập tức và hiển thị trên blog
          </p>
        </div>
      </CardContent>
    </Card>
  );
}