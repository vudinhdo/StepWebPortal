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
    content: `# Docker từ Cơ Bản đến Nâng Cao - Hướng Dẫn Toàn Diện 2024

Docker đã trở thành công cụ không thể thiếu trong DevOps và phát triển phần mềm hiện đại. Với hơn 13 tỷ container downloads và được sử dụng bởi 95% Fortune 100 companies, Docker đã cách mạng hóa cách chúng ta xây dựng, ship và run applications. Bài viết này sẽ hướng dẫn bạn từ những khái niệm cơ bản đến các kỹ thuật nâng cao và production-ready practices.

## 1. Docker Architecture và Core Concepts

### Docker là gì?

Docker là một nền tảng containerization mã nguồn mở sử dụng OS-level virtualization để đóng gói ứng dụng và dependencies vào các containers nhẹ, portable và isolated. Khác với traditional virtual machines, Docker containers chia sẻ OS kernel, giúp tiết kiệm tài nguyên đáng kể.

### Docker Architecture Components

#### Docker Engine
Docker Engine bao gồm ba thành phần chính:
- **Docker Daemon (dockerd)**: Background service quản lý containers, images, networks và volumes
- **Docker CLI (docker)**: Command-line interface để tương tác với Docker daemon
- **REST API**: Interface cho phép applications tương tác với daemon

#### Images và Layers
Docker images được xây dựng theo layered architecture:
\`\`\`bash
# Xem layers của một image
docker history nginx:latest

# Inspect image details
docker inspect nginx:latest
\`\`\`

Mỗi instruction trong Dockerfile tạo ra một layer mới. Docker sử dụng copy-on-write filesystem để tối ưu storage.

#### Container Lifecycle
\`\`\`bash
# Container states: Created -> Running -> Paused -> Stopped -> Removed
docker create nginx:latest          # Created state
docker start <container_id>         # Running state
docker pause <container_id>         # Paused state
docker stop <container_id>          # Stopped state
docker rm <container_id>            # Removed state
\`\`\`

### Ưu điểm của Docker

#### 1. **Application Portability**
- Containers chạy consistent trên laptop, data center, cloud
- "It works on my machine" problem được giải quyết
- Support cross-platform development

#### 2. **Resource Efficiency**
- Containers nhẹ hơn VMs (MB vs GB)
- Faster startup time (seconds vs minutes)
- Higher density - chạy nhiều containers trên cùng host

#### 3. **DevOps Integration**
- Seamless CI/CD integration
- Infrastructure as Code compatibility
- Microservices architecture enabler

#### 4. **Scalability và High Availability**
- Horizontal scaling với orchestration tools
- Self-healing capabilities
- Load distribution across multiple instances

## 2. Docker Installation và Configuration

### Production Installation trên Ubuntu 20.04/22.04

\`\`\`bash
# Remove old versions
sudo apt-get remove docker docker-engine docker.io containerd runc

# Update package index
sudo apt-get update

# Install packages to allow apt to use HTTPS repositories
sudo apt-get install \\
    ca-certificates \\
    curl \\
    gnupg \\
    lsb-release

# Add Docker's official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up stable repository
echo \\
  "deb [arch=\$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \\
  \$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Verify installation
sudo docker run hello-world
\`\`\`

### Post-Installation Security Configuration

\`\`\`bash
# Create docker group và add user
sudo groupadd docker
sudo usermod -aG docker $USER

# Configure Docker daemon for production
sudo mkdir -p /etc/docker
cat <<EOF | sudo tee /etc/docker/daemon.json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2",
  "userland-proxy": false,
  "live-restore": true,
  "no-new-privileges": true,
  "seccomp-profile": "/etc/docker/seccomp.json"
}
EOF

# Restart Docker service
sudo systemctl restart docker
sudo systemctl enable docker

# Verify configuration
docker info
\`\`\`

### Docker Desktop cho Development

Docker Desktop cung cấp GUI và local Kubernetes cluster:
\`\`\`bash
# Download từ https://docs.docker.com/desktop/

# Configure resource limits
# Settings -> Resources -> Advanced
# RAM: 4-8GB recommended
# CPUs: 2-4 cores
# Disk: 50GB minimum
\`\`\`

## 3. Working với Images và Registries

### Docker Hub và Public Registries

\`\`\`bash
# Search for images
docker search nginx

# Pull specific version
docker pull nginx:1.21-alpine
docker pull postgres:14.5

# List local images
docker images --format "table {{.Repository}}\\t{{.Tag}}\\t{{.Size}}"

# Remove unused images
docker image prune -a

# Remove specific image
docker rmi nginx:latest
\`\`\`

### Building Custom Images

#### Multi-stage Dockerfile cho Node.js Application

\`\`\`dockerfile
# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install all dependencies (including dev dependencies)
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build application
RUN yarn build

# Production stage
FROM node:18-alpine AS production

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nextjs -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install only production dependencies
RUN yarn install --frozen-lockfile --production && \\
    yarn cache clean

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\
  CMD node healthcheck.js

# Security: Run as non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "dist/server.js"]
\`\`\`

#### Dockerfile Best Practices

\`\`\`dockerfile
# Use specific tags, avoid 'latest'
FROM node:18.17.0-alpine3.18

# Combine RUN commands để reduce layers
RUN apk add --no-cache \\
        ca-certificates \\
        tzdata && \\
    rm -rf /var/cache/apk/*

# Use .dockerignore để exclude unnecessary files
# .dockerignore content:
# node_modules
# npm-debug.log
# .git
# .gitignore
# README.md
# .env
# coverage
# .nyc_output

# Order instructions by frequency of change
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Use COPY instead of ADD unless extracting archives
COPY --chown=node:node package*.json ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Use exec form for CMD và ENTRYPOINT
CMD ["node", "server.js"]
\`\`\`

### Private Docker Registry

#### Setting up Private Registry

\`\`\`bash
# Run registry container
docker run -d \\
  --name registry \\
  --restart=always \\
  -p 5000:5000 \\
  -v /opt/registry-data:/var/lib/registry \\
  registry:2

# Tag image for private registry
docker tag myapp:latest localhost:5000/myapp:v1.0

# Push to private registry
docker push localhost:5000/myapp:v1.0

# Pull from private registry
docker pull localhost:5000/myapp:v1.0
\`\`\`

#### Production Registry với TLS và Authentication

\`\`\`yaml
# docker-compose.yml cho production registry
version: '3.8'

services:
  registry:
    image: registry:2
    restart: always
    ports:
      - "5000:5000"
    environment:
      REGISTRY_HTTP_TLS_CERTIFICATE: /certs/domain.crt
      REGISTRY_HTTP_TLS_KEY: /certs/domain.key
      REGISTRY_AUTH: htpasswd
      REGISTRY_AUTH_HTPASSWD_PATH: /auth/htpasswd
      REGISTRY_AUTH_HTPASSWD_REALM: Registry Realm
    volumes:
      - ./certs:/certs
      - ./auth:/auth
      - registry-data:/var/lib/registry

volumes:
  registry-data:
\`\`\`

## 4. Container Management và Networking

### Advanced Container Operations

\`\`\`bash
# Run container với detailed configuration
docker run -d \\
  --name web-app \\
  --restart=unless-stopped \\
  --memory="1g" \\
  --cpus="1.5" \\
  --health-cmd="curl -f http://localhost:3000/health || exit 1" \\
  --health-interval=30s \\
  --health-timeout=10s \\
  --health-retries=3 \\
  -p 3000:3000 \\
  -e NODE_ENV=production \\
  -e DB_HOST=postgres \\
  -v /app/logs:/var/log/app \\
  --network app-network \\
  myapp:latest

# Monitor container resources
docker stats --format "table {{.Container}}\\t{{.CPUPerc}}\\t{{.MemUsage}}\\t{{.NetIO}}"

# View container processes
docker top web-app

# Execute commands in running container
docker exec -it web-app /bin/sh

# Copy files between host và container
docker cp ./config.json web-app:/app/config.json
docker cp web-app:/app/logs ./logs

# View container logs với filtering
docker logs --follow --since="2h" --tail=100 web-app
\`\`\`

### Docker Networking Deep Dive

#### Network Types

\`\`\`bash
# List networks
docker network ls

# Create custom bridge network
docker network create \\
  --driver bridge \\
  --subnet=172.20.0.0/16 \\
  --ip-range=172.20.240.0/20 \\
  --gateway=172.20.0.1 \\
  app-network

# Inspect network details
docker network inspect app-network

# Connect container to network
docker network connect app-network web-app

# Create overlay network cho swarm
docker network create \\
  --driver overlay \\
  --attachable \\
  multi-host-network
\`\`\`

#### Service Discovery và Load Balancing

\`\`\`yaml
# docker-compose.yml với internal networking
version: '3.8'

services:
  web:
    build: .
    ports:
      - "80:3000"
    depends_on:
      - api
      - database
    networks:
      - frontend
      - backend

  api:
    build: ./api
    expose:
      - "8080"
    depends_on:
      - database
      - redis
    networks:
      - backend
    deploy:
      replicas: 3
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3

  database:
    image: postgres:14
    environment:
      POSTGRES_DB: appdb
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - backend
    secrets:
      - db_password

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass \${REDIS_PASSWORD}
    networks:
      - backend
    volumes:
      - redis-data:/data

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true

volumes:
  db-data:
  redis-data:

secrets:
  db_password:
    file: ./secrets/db_password.txt
\`\`\`

## 5. Docker Compose for Complex Applications

### Production-Ready LAMP Stack

\`\`\`yaml
version: '3.8'

services:
  nginx:
    image: nginx:1.21-alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
      - web-content:/var/www/html
    depends_on:
      - php
    networks:
      - frontend
    restart: unless-stopped

  php:
    build:
      context: ./php
      dockerfile: Dockerfile
    volumes:
      - web-content:/var/www/html
      - ./php.ini:/usr/local/etc/php/php.ini:ro
    networks:
      - frontend
      - backend
    depends_on:
      - mysql
      - redis
    restart: unless-stopped
    environment:
      - DB_HOST=mysql
      - REDIS_HOST=redis

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD_FILE: /run/secrets/mysql_root_password
      MYSQL_DATABASE: webapp
      MYSQL_USER: webuser
      MYSQL_PASSWORD_FILE: /run/secrets/mysql_password
    volumes:
      - mysql-data:/var/lib/mysql
      - ./mysql/init:/docker-entrypoint-initdb.d
    networks:
      - backend
    restart: unless-stopped
    secrets:
      - mysql_root_password
      - mysql_password
    command: --default-authentication-plugin=mysql_native_password

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass \${REDIS_PASSWORD} --appendonly yes
    volumes:
      - redis-data:/data
    networks:
      - backend
    restart: unless-stopped

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    environment:
      PMA_HOST: mysql
      PMA_PORT: 3306
      PMA_USER: root
      PMA_PASSWORD_FILE: /run/secrets/mysql_root_password
    ports:
      - "8080:80"
    depends_on:
      - mysql
    networks:
      - backend
    secrets:
      - mysql_root_password

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true

volumes:
  mysql-data:
    driver: local
  redis-data:
    driver: local
  web-content:
    driver: local

secrets:
  mysql_root_password:
    file: ./secrets/mysql_root_password.txt
  mysql_password:
    file: ./secrets/mysql_password.txt
\`\`\`

### Environment-Specific Configurations

\`\`\`bash
# Development environment
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production environment
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

# Override file example (docker-compose.dev.yml)
version: '3.8'

services:
  web:
    build:
      target: development
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - DEBUG=*
    ports:
      - "3000:3000"
      - "9229:9229"  # Debug port
\`\`\`

## 6. Volume Management và Persistent Storage

### Volume Types và Use Cases

\`\`\`bash
# Named volumes (recommended for production)
docker volume create --driver local \\
  --opt type=ext4 \\
  --opt device=/dev/xvdb \\
  app-data

# Bind mounts (development)
docker run -v /host/path:/container/path app:latest

# tmpfs mounts (temporary data)
docker run --tmpfs /tmp app:latest

# List và manage volumes
docker volume ls
docker volume inspect app-data
docker volume prune  # Remove unused volumes
\`\`\`

### Backup và Restore Strategies

\`\`\`bash
# Backup volume data
docker run --rm \\
  -v app-data:/data \\
  -v /backup:/backup \\
  alpine tar czf /backup/app-data-backup.tar.gz -C /data .

# Restore volume data
docker run --rm \\
  -v app-data:/data \\
  -v /backup:/backup \\
  alpine tar xzf /backup/app-data-backup.tar.gz -C /data

# Database backup với specific tools
docker exec mysql-container \\
  mysqldump -u root -p\${MYSQL_ROOT_PASSWORD} --all-databases > backup.sql

# Automated backup script
#!/bin/bash
BACKUP_DIR="/backups/\$(date +%Y%m%d)"
mkdir -p \$BACKUP_DIR

docker exec postgres-container \\
  pg_dumpall -U postgres > \$BACKUP_DIR/postgres_backup.sql

docker run --rm \\
  -v app-uploads:/data \\
  -v \$BACKUP_DIR:/backup \\
  alpine tar czf /backup/uploads.tar.gz -C /data .

# Retention policy
find /backups -type d -mtime +30 -exec rm -rf {} \\;
\`\`\`

## 7. Security Best Practices

### Container Security Hardening

\`\`\`dockerfile
# Use specific, minimal base images
FROM node:18.17.0-alpine3.18

# Create non-root user
RUN addgroup -g 1001 -S appgroup && \\
    adduser -S appuser -u 1001 -G appgroup

# Set proper file permissions
COPY --chown=appuser:appgroup package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Remove unnecessary packages
RUN apk del .build-dependencies

# Use read-only root filesystem
USER appuser
COPY --chown=appuser:appgroup . .

# Run với security options
docker run \\
  --read-only \\
  --tmpfs /tmp \\
  --tmpfs /var/run \\
  --cap-drop=ALL \\
  --cap-add=NET_BIND_SERVICE \\
  --security-opt=no-new-privileges:true \\
  --user 1001:1001 \\
  app:latest
\`\`\`

### Secret Management

\`\`\`bash
# Using Docker secrets (Swarm mode)
echo "my_secret_password" | docker secret create db_password -

# Using external secret management
docker run \\
  -e DB_PASSWORD_FILE=/run/secrets/db_password \\
  -v /path/to/secret:/run/secrets/db_password:ro \\
  app:latest

# Environment variable injection từ file
docker run --env-file .env app:latest

# .env file format
DB_HOST=postgres
DB_NAME=webapp
REDIS_URL=redis://redis:6379
\`\`\`

### Image Scanning và Vulnerability Management

\`\`\`bash
# Scan images for vulnerabilities
docker scout cves myapp:latest

# Use Snyk for comprehensive scanning
docker run --rm -it \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  -v \$(pwd):/project \\
  snyk/snyk:docker test myapp:latest

# Trivy scanning
docker run --rm \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  -v \$HOME/Library/Caches:/root/.cache/ \\
  aquasec/trivy image myapp:latest
\`\`\`

## 8. Monitoring và Logging

### Container Monitoring Setup

\`\`\`yaml
# monitoring-stack.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.enable-lifecycle'

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123
    volumes:
      - grafana-data:/var/lib/grafana
      - ./grafana/dashboards:/etc/grafana/provisioning/dashboards
      - ./grafana/datasources:/etc/grafana/provisioning/datasources

  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    ports:
      - "8080:8080"
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
      - /dev/disk/:/dev/disk:ro
    privileged: true

  node-exporter:
    image: prom/node-exporter:latest
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
  prometheus-data:
  grafana-data:
\`\`\`

### Centralized Logging

\`\`\`yaml
# logging-stack.yml
version: '3.8'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.8.0
    environment:
      - discovery.type=single-node
      - ES_JAVA_OPTS=-Xms1g -Xmx1g
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch-data:/usr/share/elasticsearch/data

  logstash:
    image: docker.elastic.co/logstash/logstash:8.8.0
    ports:
      - "5044:5044"
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    depends_on:
      - elasticsearch

  kibana:
    image: docker.elastic.co/kibana/kibana:8.8.0
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    depends_on:
      - elasticsearch

  filebeat:
    image: docker.elastic.co/beats/filebeat:8.8.0
    volumes:
      - ./filebeat.yml:/usr/share/filebeat/filebeat.yml
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
    depends_on:
      - logstash

volumes:
  elasticsearch-data:
\`\`\`

## 9. Production Deployment Strategies

### Docker Swarm Orchestration

\`\`\`bash
# Initialize swarm cluster
docker swarm init --advertise-addr <MANAGER-IP>

# Join worker nodes
docker swarm join --token <TOKEN> <MANAGER-IP>:2377

# Deploy stack
docker stack deploy -c docker-compose.yml myapp

# Scale services
docker service scale myapp_web=5

# Rolling updates
docker service update --image myapp:v2 myapp_web

# Monitor services
docker service ls
docker service ps myapp_web
\`\`\`

### Load Balancing và High Availability

\`\`\`yaml
# Production deployment với HA
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    configs:
      - source: nginx_config
        target: /etc/nginx/nginx.conf
    deploy:
      replicas: 2
      placement:
        constraints:
          - node.role == manager
      restart_policy:
        condition: on-failure

  web:
    image: myapp:latest
    deploy:
      replicas: 5
      update_config:
        parallelism: 2
        delay: 10s
        failure_action: rollback
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 3
      placement:
        constraints:
          - node.role == worker

configs:
  nginx_config:
    external: true
\`\`\`

### Health Checks và Auto-healing

\`\`\`dockerfile
# Advanced health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1
\`\`\`

\`\`\`javascript
// Health check endpoint implementation
app.get('/health', async (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    checks: {}
  };

  try {
    // Database connectivity
    await db.query('SELECT 1');
    healthcheck.checks.database = 'OK';

    // Redis connectivity
    await redis.ping();
    healthcheck.checks.redis = 'OK';

    // Memory usage
    const memUsage = process.memoryUsage();
    healthcheck.checks.memory = {
      used: Math.round(memUsage.heapUsed / 1024 / 1024) + 'MB',
      total: Math.round(memUsage.heapTotal / 1024 / 1024) + 'MB'
    };

    res.status(200).json(healthcheck);
  } catch (error) {
    healthcheck.message = error.message;
    res.status(503).json(healthcheck);
  }
});
\`\`\`

## 10. CI/CD Integration

### GitLab CI Pipeline

\`\`\`yaml
# .gitlab-ci.yml
stages:
  - build
  - test
  - security
  - deploy

variables:
  DOCKER_REGISTRY: registry.gitlab.com
  IMAGE_NAME: \$CI_PROJECT_PATH
  DOCKER_DRIVER: overlay2

build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  before_script:
    - docker login -u \$CI_REGISTRY_USER -p \$CI_REGISTRY_PASSWORD \$CI_REGISTRY
  script:
    - docker build -t \$CI_REGISTRY_IMAGE:\$CI_COMMIT_SHA .
    - docker push \$CI_REGISTRY_IMAGE:\$CI_COMMIT_SHA
  only:
    - master
    - develop

test:
  stage: test
  image: \$CI_REGISTRY_IMAGE:\$CI_COMMIT_SHA
  script:
    - npm test
    - npm run test:coverage
  coverage: '/Statements.*?(\d+(?:\.\d+)?)%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

security:
  stage: security
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker run --rm -v /var/run/docker.sock:/var/run/docker.sock 
        aquasec/trivy image \$CI_REGISTRY_IMAGE:\$CI_COMMIT_SHA
  allow_failure: true

deploy_production:
  stage: deploy
  image: docker:latest
  script:
    - docker stack deploy -c docker-compose.prod.yml myapp
  environment:
    name: production
    url: https://myapp.com
  when: manual
  only:
    - master
\`\`\`

### Jenkins Pipeline

\`\`\`groovy
pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'your-registry.com'
        IMAGE_NAME = 'myapp'
        DOCKER_CREDENTIALS = credentials('docker-registry')
    }
    
    stages {
        stage('Build') {
            steps {
                script {
                    def app = docker.build("\${DOCKER_REGISTRY}/\${IMAGE_NAME}:\${env.BUILD_NUMBER}")
                    docker.withRegistry('https://\${DOCKER_REGISTRY}', 'docker-registry') {
                        app.push()
                        app.push("latest")
                    }
                }
            }
        }
        
        stage('Test') {
            steps {
                script {
                    docker.image("\${DOCKER_REGISTRY}/\${IMAGE_NAME}:\${env.BUILD_NUMBER}").inside {
                        sh 'npm test'
                        sh 'npm run test:integration'
                    }
                }
            }
            post {
                always {
                    publishTestResults testResultsPattern: 'test-results.xml'
                    publishCoverageReport coveragePattern: 'coverage/**/*'
                }
            }
        }
        
        stage('Security Scan') {
            steps {
                sh '''
                    docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \\
                        aquasec/trivy image \${DOCKER_REGISTRY}/\${IMAGE_NAME}:\${BUILD_NUMBER}
                '''
            }
        }
        
        stage('Deploy') {
            when {
                branch 'master'
            }
            steps {
                sshagent(['production-server']) {
                    sh '''
                        ssh user@production-server "
                            docker service update --image \${DOCKER_REGISTRY}/\${IMAGE_NAME}:\${BUILD_NUMBER} myapp_web
                        "
                    '''
                }
            }
        }
    }
}
\`\`\`

## 11. Troubleshooting và Performance Optimization

### Common Issues và Solutions

\`\`\`bash
# Container won't start
docker logs <container_id>
docker events --filter container=<container_id>

# Resource constraints
docker exec <container_id> ps aux
docker exec <container_id> free -h
docker exec <container_id> df -h

# Network connectivity issues
docker exec <container_id> nslookup <hostname>
docker exec <container_id> ping <host>
docker network inspect <network_name>

# Performance analysis
docker stats
docker exec <container_id> top
docker exec <container_id> iostat -x 1

# Debug container startup
docker run --rm -it --entrypoint /bin/sh image:tag
\`\`\`

### Performance Tuning

\`\`\`bash
# Optimize Docker daemon
# /etc/docker/daemon.json
{
  "storage-driver": "overlay2",
  "storage-opts": [
    "overlay2.override_kernel_check=true"
  ],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "userland-proxy": false,
  "experimental": true,
  "metrics-addr": "127.0.0.1:9323"
}

# Container resource limits
docker run \\
  --memory="1g" \\
  --memory-swap="1g" \\
  --memory-swappiness=0 \\
  --cpus="1.5" \\
  --cpu-shares=1024 \\
  --blkio-weight=500 \\
  myapp:latest

# Multi-stage build optimization
FROM node:18-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package*.json ./
USER node
CMD ["node", "dist/server.js"]
\`\`\`

## 12. Advanced Topics

### Container Orchestration Migration

\`\`\`bash
# Migrate từ Docker Compose sang Kubernetes
kompose convert -f docker-compose.yml

# Generate Helm charts
helm create myapp
\`\`\`

### Custom Runtime và Advanced Features

\`\`\`bash
# GPU support với NVIDIA runtime
docker run --gpus all nvidia/cuda:11.0-base nvidia-smi

# Windows containers trên Windows hosts
docker run -it mcr.microsoft.com/windows/nanoserver:20H2 cmd

# ARM64 multi-architecture builds
docker buildx create --use
docker buildx build --platform linux/amd64,linux/arm64 -t myapp:latest --push .
\`\`\`

## Kết luận

Docker đã cách mạng hóa cách chúng ta phát triển, ship và vận hành applications. Từ development environment consistency đến production-scale orchestration, Docker cung cấp một platform mạnh mẽ cho modern software delivery.

Key takeaways từ bài viết này:

### 1. **Foundation Knowledge**
- Hiểu Docker architecture và core concepts
- Master image building và container lifecycle
- Implement security best practices từ đầu

### 2. **Production Readiness**
- Use multi-stage builds cho optimization
- Implement proper logging và monitoring
- Design cho scalability và high availability

### 3. **DevOps Integration**
- Automate builds với CI/CD pipelines
- Implement testing strategies
- Use Infrastructure as Code approaches

### 4. **Operational Excellence**
- Monitor performance và resource usage
- Implement backup và disaster recovery
- Maintain security posture

### 5. **Future-Proofing**
- Understand container orchestration options
- Prepare for cloud-native architectures
- Stay updated với Docker ecosystem evolution

Docker không chỉ là một tool - nó là foundation cho modern DevOps practices và cloud-native development. Việc master Docker sẽ mở ra opportunities với Kubernetes, microservices architectures, và advanced deployment strategies.

Tiếp tục thực hành với real-world projects, experiment với advanced features, và tham gia Docker community để stay updated với latest best practices và innovations trong containerization space.`,
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
    content: `# Kubernetes Production Deployment Guide - Complete Enterprise Setup 2024

Kubernetes đã trở thành tiêu chuẩn de facto cho container orchestration trong enterprise environments. Với hơn 5.6 triệu developers sử dụng và được adopt bởi 96% organizations sử dụng containers, Kubernetes cung cấp platform mạnh mẽ cho modern application deployment và management. Bài viết này sẽ hướng dẫn comprehensive setup từ cluster initialization đến production-grade operations với real-world best practices.

## 1. Kubernetes Architecture Deep Dive

### Control Plane Components

#### API Server (kube-apiserver)
API Server là central management entity của Kubernetes cluster, serving như RESTful API để tất cả cluster operations:

\`\`\`bash
# Check API server status và health
kubectl cluster-info
kubectl get componentstatuses

# API server configuration file
sudo vim /etc/kubernetes/manifests/kube-apiserver.yaml

# Key configuration parameters:
# --etcd-servers: etcd cluster endpoints
# --service-cluster-ip-range: service IP CIDR
# --admission-control: admission controllers
# --audit-log-path: audit logging location
# --enable-admission-plugins: NodeRestriction,PodSecurityPolicy
# --authorization-mode: Node,RBAC
\`\`\`

#### etcd Cluster Management
etcd là distributed key-value store chứa toàn bộ cluster state:

\`\`\`bash
# etcd cluster health check
sudo ETCDCTL_API=3 etcdctl \\
  --endpoints=https://127.0.0.1:2379 \\
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \\
  --cert=/etc/kubernetes/pki/etcd/healthcheck-client.crt \\
  --key=/etc/kubernetes/pki/etcd/healthcheck-client.key \\
  endpoint health

# Backup etcd data - CRITICAL for disaster recovery
sudo ETCDCTL_API=3 etcdctl \\
  --endpoints=https://127.0.0.1:2379 \\
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \\
  --cert=/etc/kubernetes/pki/etcd/server.crt \\
  --key=/etc/kubernetes/pki/etcd/server.key \\
  snapshot save /backup/etcd-snapshot-\$(date +%Y%m%d_%H%M%S).db

# Restore etcd từ backup
sudo ETCDCTL_API=3 etcdctl \\
  --endpoints=https://127.0.0.1:2379 \\
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \\
  --name=master \\
  --cert=/etc/kubernetes/pki/etcd/server.crt \\
  --key=/etc/kubernetes/pki/etcd/server.key \\
  --data-dir=/var/lib/etcd \\
  --initial-cluster=master=https://127.0.0.1:2380 \\
  --initial-cluster-token=etcd-cluster \\
  --initial-advertise-peer-urls=https://127.0.0.1:2380 \\
  snapshot restore /backup/etcd-snapshot.db
\`\`\`

#### Controller Manager Configuration
\`\`\`yaml
# /etc/kubernetes/manifests/kube-controller-manager.yaml
apiVersion: v1
kind: Pod
metadata:
  name: kube-controller-manager
  namespace: kube-system
spec:
  containers:
  - command:
    - kube-controller-manager
    - --bind-address=127.0.0.1
    - --cluster-cidr=10.244.0.0/16
    - --cluster-name=kubernetes
    - --cluster-signing-cert-file=/etc/kubernetes/pki/ca.crt
    - --cluster-signing-key-file=/etc/kubernetes/pki/ca.key
    - --controllers=*,bootstrapsigner,tokencleaner
    - --kubeconfig=/etc/kubernetes/controller-manager.conf
    - --leader-elect=true
    - --node-cidr-mask-size=24
    - --requestheader-client-ca-file=/etc/kubernetes/pki/front-proxy-ca.crt
    - --root-ca-file=/etc/kubernetes/pki/ca.crt
    - --service-account-private-key-file=/etc/kubernetes/pki/sa.key
    - --service-cluster-ip-range=10.96.0.0/12
    - --use-service-account-credentials=true
    - --v=2
\`\`\`

### Worker Node Components

#### kubelet Advanced Configuration
\`\`\`yaml
# /var/lib/kubelet/config.yaml
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
address: 0.0.0.0
port: 10250
readOnlyPort: 0
cgroupDriver: systemd
clusterDNS:
- 10.96.0.10
clusterDomain: cluster.local
failSwapOn: false
authentication:
  anonymous:
    enabled: false
  webhook:
    enabled: true
authorization:
  mode: Webhook
serverTLSBootstrap: true
resolvConf: /run/systemd/resolve/resolv.conf
runtimeRequestTimeout: 15m
tlsCertFile: /var/lib/kubelet/pki/kubelet.crt
tlsPrivateKeyFile: /var/lib/kubelet/pki/kubelet.key
# Resource management
maxPods: 110
kubeReserved:
  cpu: "100m"
  memory: "1Gi"
  ephemeral-storage: "1Gi"
systemReserved:
  cpu: "100m"
  memory: "1Gi"
  ephemeral-storage: "1Gi"
evictionHard:
  memory.available: "200Mi"
  nodefs.available: "10%"
  nodefs.inodesFree: "5%"
  imagefs.available: "15%"
\`\`\`

#### Container Runtime Setup (containerd)
\`\`\`bash
# Install containerd
sudo apt-get update
sudo apt-get install containerd.io

# Configure containerd for production
sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml

# Enable SystemdCgroup and configure runtime
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/g' /etc/containerd/config.toml

# Configure resource limits
cat <<EOF | sudo tee -a /etc/containerd/config.toml
[plugins."io.containerd.grpc.v1.cri"]
  max_container_log_line_size = 16384
  max_concurrent_downloads = 10

[plugins."io.containerd.grpc.v1.cri".containerd]
  snapshotter = "overlayfs"
  default_runtime_name = "runc"

[plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
  SystemdCgroup = true
  BinaryName = "/usr/bin/runc"
EOF

# Restart và enable containerd
sudo systemctl restart containerd
sudo systemctl enable containerd
\`\`\`

## 2. Production High Availability Setup

### Load Balancer cho Control Plane
\`\`\`nginx
# /etc/nginx/nginx.conf - HA Load Balancer
events {
    worker_connections 1024;
}

stream {
    upstream kubernetes {
        server 10.0.1.10:6443 max_fails=3 fail_timeout=30s;
        server 10.0.1.11:6443 max_fails=3 fail_timeout=30s;
        server 10.0.1.12:6443 max_fails=3 fail_timeout=30s;
    }

    server {
        listen 6443;
        proxy_pass kubernetes;
        proxy_timeout 5s;
        proxy_responses 1;
        proxy_connect_timeout 1s;
    }
}

http {
    upstream k8s-dashboard {
        server 10.0.1.10:30000;
        server 10.0.1.11:30000;
        server 10.0.1.12:30000;
    }

    server {
        listen 80;
        server_name dashboard.k8s.local;
        
        location / {
            proxy_pass http://k8s-dashboard;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
        }
    }
}
\`\`\`

### kubeadm High Availability Cluster
\`\`\`bash
# Initialize first control plane node với HA configuration
sudo kubeadm init \\
  --control-plane-endpoint="k8s-lb.example.com:6443" \\
  --upload-certs \\
  --pod-network-cidr=10.244.0.0/16 \\
  --service-cidr=10.96.0.0/12 \\
  --cri-socket=/run/containerd/containerd.sock \\
  --apiserver-advertise-address=10.0.1.10

# Setup kubectl cho admin user
mkdir -p \$HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf \$HOME/.kube/config
sudo chown \$(id -u):\$(id -g) \$HOME/.kube/config

# Join additional control plane nodes
sudo kubeadm join k8s-lb.example.com:6443 \\
  --token <token> \\
  --discovery-token-ca-cert-hash sha256:<hash> \\
  --control-plane \\
  --certificate-key <certificate-key>

# Join worker nodes
sudo kubeadm join k8s-lb.example.com:6443 \\
  --token <token> \\
  --discovery-token-ca-cert-hash sha256:<hash>

# Verify cluster health
kubectl get nodes -o wide
kubectl get pods --all-namespaces
\`\`\`

### CNI Network Plugin Selection

#### Calico với Network Policies
\`\`\`bash
# Install Tigera operator
kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.26.1/manifests/tigera-operator.yaml

# Configure Calico installation
cat <<EOF | kubectl apply -f -
apiVersion: operator.tigera.io/v1
kind: Installation
metadata:
  name: default
spec:
  calicoNetwork:
    ipPools:
    - blockSize: 26
      cidr: 10.244.0.0/16
      encapsulation: VXLANCrossSubnet
      natOutgoing: Enabled
      nodeSelector: all()
    nodeAddressAutodetection:
      kubernetes: NodeInternalIP
EOF

# Install Calico API server cho kubectl calico commands
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.26.1/manifests/apiserver.yaml

# Verify Calico installation
kubectl get pods -n calico-system
kubectl get nodes -o wide
\`\`\`

#### Cilium với eBPF Performance
\`\`\`bash
# Install Cilium CLI
curl -L --fail --remote-name-all https://github.com/cilium/cilium-cli/releases/latest/download/cilium-linux-amd64.tar.gz
sudo tar xzvfC cilium-linux-amd64.tar.gz /usr/local/bin

# Install Cilium với advanced configuration
cilium install \\
  --cluster-name production-cluster \\
  --cluster-id 1 \\
  --ipam cluster-pool \\
  --cluster-pool-ipv4-cidr 10.244.0.0/16 \\
  --cluster-pool-ipv4-mask-size 24 \\
  --native-routing-cidr=10.244.0.0/16 \\
  --enable-l7-proxy=true \\
  --enable-local-redirect-policy=true

# Enable Hubble observability platform
cilium hubble enable --ui
kubectl port-forward -n kube-system svc/hubble-ui 12000:80

# Verify connectivity
cilium connectivity test
\`\`\`

## 3. Advanced Workload Management

### Blue-Green Deployment với Argo Rollouts
\`\`\`yaml
# blue-green-rollout.yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: webapp-rollout
  namespace: production
spec:
  replicas: 10
  strategy:
    blueGreen:
      activeService: webapp-active
      previewService: webapp-preview
      autoPromotionEnabled: false
      scaleDownDelaySeconds: 30
      prePromotionAnalysis:
        templates:
        - templateName: success-rate
        args:
        - name: service-name
          value: webapp-preview.production.svc.cluster.local
      postPromotionAnalysis:
        templates:
        - templateName: success-rate
        args:
        - name: service-name
          value: webapp-active.production.svc.cluster.local
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      labels:
        app: webapp
    spec:
      serviceAccountName: webapp-sa
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        fsGroup: 2000
      containers:
      - name: webapp
        image: webapp:v1.0
        imagePullPolicy: Always
        ports:
        - containerPort: 8080
          protocol: TCP
        env:
        - name: ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: webapp-secrets
              key: database-url
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 3
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
          timeoutSeconds: 3
          failureThreshold: 3
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        volumeMounts:
        - name: app-config
          mountPath: /etc/config
          readOnly: true
      volumes:
      - name: app-config
        configMap:
          name: webapp-config
---
# Analysis Template cho automated rollback
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
            http_requests_total{service="\{\{args.service-name\}\}",status!~"5.*"}[2m]
          )) /
          sum(rate(
            http_requests_total{service="\{\{args.service-name\}\}"}[2m]
          ))
\`\`\`

### Canary Deployment với Flagger và Istio
\`\`\`yaml
# canary-flagger.yaml
apiVersion: flagger.app/v1beta1
kind: Canary
metadata:
  name: webapp-canary
  namespace: production
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: webapp
  progressDeadlineSeconds: 60
  service:
    port: 80
    targetPort: 8080
    portDiscovery: true
    gateways:
    - public-gateway.istio-system.svc.cluster.local
    hosts:
    - app.example.com
    trafficPolicy:
      tls:
        mode: DISABLE
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
    - name: custom-metric
      thresholdRange:
        min: 0.90
      interval: 1m
      query: |
        histogram_quantile(0.99,
          sum(
            rate(
              http_request_duration_seconds_bucket{
                kubernetes_namespace="production",
                kubernetes_pod_name=~"webapp-[0-9a-zA-Z]+(-[0-9a-zA-Z]+)"
              }[1m]
            )
          ) by (le)
        )
    webhooks:
    - name: load-test
      type: rollout
      url: http://flagger-loadtester.test/
      timeout: 5s
      metadata:
        cmd: "hey -z 1m -q 10 -c 2 http://app.example.com/"
    - name: slack-notification
      type: event
      url: https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
\`\`\`

### StatefulSets cho Stateful Applications
\`\`\`yaml
# postgresql-ha-statefulset.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgresql-ha
  namespace: databases
spec:
  serviceName: postgresql-headless
  replicas: 3
  updateStrategy:
    type: RollingUpdate
  selector:
    matchLabels:
      app: postgresql-ha
  template:
    metadata:
      labels:
        app: postgresql-ha
    spec:
      serviceAccountName: postgresql-sa
      securityContext:
        runAsUser: 999
        runAsGroup: 999
        fsGroup: 999
      initContainers:
      - name: init-postgresql
        image: postgres:14-alpine
        command:
        - /bin/bash
        - -c
        - |
          if [ ! -f /var/lib/postgresql/data/postgresql.conf ]; then
            echo "Initializing PostgreSQL..."
            initdb -D /var/lib/postgresql/data
            pg_ctl -D /var/lib/postgresql/data start
            psql -c "ALTER USER postgres PASSWORD '\${POSTGRES_PASSWORD}';"
            pg_ctl -D /var/lib/postgresql/data stop
          fi
        env:
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgresql-secret
              key: postgres-password
        volumeMounts:
        - name: postgresql-storage
          mountPath: /var/lib/postgresql/data
      containers:
      - name: postgresql
        image: postgres:14-alpine
        ports:
        - containerPort: 5432
          name: postgresql
        env:
        - name: POSTGRES_DB
          value: "webapp"
        - name: POSTGRES_USER
          value: "postgres"
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgresql-secret
              key: postgres-password
        - name: POSTGRES_REPLICATION_USER
          value: "replicator"
        - name: POSTGRES_REPLICATION_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgresql-secret
              key: replication-password
        - name: PGDATA
          value: /var/lib/postgresql/data/pgdata
        volumeMounts:
        - name: postgresql-storage
          mountPath: /var/lib/postgresql/data
        - name: postgresql-config
          mountPath: /etc/postgresql/postgresql.conf
          subPath: postgresql.conf
        - name: postgresql-hba
          mountPath: /etc/postgresql/pg_hba.conf
          subPath: pg_hba.conf
        livenessProbe:
          exec:
            command:
            - /bin/sh
            - -c
            - "pg_isready -U postgres -h 127.0.0.1 -p 5432"
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 6
        readinessProbe:
          exec:
            command:
            - /bin/sh
            - -c
            - "pg_isready -U postgres -h 127.0.0.1 -p 5432"
          initialDelaySeconds: 5
          periodSeconds: 5
          timeoutSeconds: 1
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
      volumes:
      - name: postgresql-config
        configMap:
          name: postgresql-config
      - name: postgresql-hba
        configMap:
          name: postgresql-hba-config
  volumeClaimTemplates:
  - metadata:
      name: postgresql-storage
    spec:
      accessModes: ["ReadWriteOnce"]
      storageClassName: fast-ssd
      resources:
        requests:
          storage: 100Gi
\`\`\`

## 4. Advanced Networking và Service Mesh

### Istio Service Mesh Implementation
\`\`\`bash
# Download và install Istio
curl -L https://istio.io/downloadIstio | sh -
cd istio-*
export PATH=\$PWD/bin:\$PATH

# Install Istio với production configuration
istioctl install --set values.defaultRevision=default \\
  --set values.pilot.traceSampling=1.0 \\
  --set values.global.meshID=mesh1 \\
  --set values.global.network=network1

# Label namespace cho sidecar injection
kubectl label namespace production istio-injection=enabled

# Install observability addons
kubectl apply -f samples/addons/prometheus.yaml
kubectl apply -f samples/addons/grafana.yaml
kubectl apply -f samples/addons/jaeger.yaml
kubectl apply -f samples/addons/kiali.yaml
\`\`\`

### Advanced Traffic Management
\`\`\`yaml
# istio-traffic-management.yaml
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: webapp-gateway
  namespace: production
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "webapp.example.com"
    tls:
      httpsRedirect: true
  - port:
      number: 443
      name: https
      protocol: HTTPS
    tls:
      mode: SIMPLE
      credentialName: webapp-tls-secret
    hosts:
    - "webapp.example.com"
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: webapp-vs
  namespace: production
spec:
  hosts:
  - "webapp.example.com"
  gateways:
  - webapp-gateway
  http:
  - match:
    - uri:
        prefix: "/api/v1"
    route:
    - destination:
        host: api-service.production.svc.cluster.local
        port:
          number: 8080
        subset: v1
      weight: 90
    - destination:
        host: api-service.production.svc.cluster.local
        port:
          number: 8080
        subset: v2
      weight: 10
    fault:
      delay:
        percentage:
          value: 0.1
        fixedDelay: 5s
    retries:
      attempts: 3
      perTryTimeout: 2s
      retryOn: gateway-error,connect-failure,refused-stream
    timeout: 10s
    corsPolicy:
      allowOrigins:
      - exact: https://webapp.example.com
      allowMethods:
      - POST
      - GET
      - PUT
      - DELETE
      allowCredentials: false
      allowHeaders:
      - content-type
      - authorization
  - match:
    - uri:
        prefix: "/"
    route:
    - destination:
        host: frontend-service.production.svc.cluster.local
        port:
          number: 80
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: api-service-dr
  namespace: production
spec:
  host: api-service.production.svc.cluster.local
  trafficPolicy:
    connectionPool:
      tcp:
        maxConnections: 100
      http:
        http1MaxPendingRequests: 50
        maxRequestsPerConnection: 2
    circuitBreaker:
      consecutiveErrors: 3
      interval: 30s
      baseEjectionTime: 30s
      maxEjectionPercent: 50
    loadBalancer:
      simple: LEAST_CONN
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
\`\`\`

### Comprehensive Network Policies
\`\`\`yaml
# network-security-policies.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
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
  name: allow-frontend-to-api
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: api-service
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    - namespaceSelector:
        matchLabels:
          name: production
    ports:
    - protocol: TCP
      port: 8080
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-api-to-database
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: postgresql-ha
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: api-service
    ports:
    - protocol: TCP
      port: 5432
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-monitoring
  namespace: production
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: monitoring
    ports:
    - protocol: TCP
      port: 8080
    - protocol: TCP
      port: 9090
    - protocol: TCP
      port: 3000
\`\`\`

## 5. Production Storage Management

### Advanced StorageClass Configurations
\`\`\`yaml
# storage-classes-production.yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd-retained
  annotations:
    storageclass.kubernetes.io/is-default-class: "false"
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
  iops: "3000"
  throughput: "125"
  encrypted: "true"
  fsType: ext4
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
reclaimPolicy: Retain
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: standard-hdd
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp2
  encrypted: "true"
volumeBindingMode: Immediate
allowVolumeExpansion: true
reclaimPolicy: Delete
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: high-iops-ssd
provisioner: kubernetes.io/aws-ebs
parameters:
  type: io2
  iops: "10000"
  encrypted: "true"
volumeBindingMode: WaitForFirstConsumer
allowVolumeExpansion: true
reclaimPolicy: Retain
---
# NFS Storage Class cho shared storage
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: nfs-shared
provisioner: nfs.csi.k8s.io
parameters:
  server: nfs-server.example.com
  share: /shared
reclaimPolicy: Retain
volumeBindingMode: Immediate
allowVolumeExpansion: true
\`\`\`

### Backup and Disaster Recovery với Velero
\`\`\`bash
# Install Velero CLI
wget https://github.com/vmware-tanzu/velero/releases/latest/download/velero-linux-amd64.tar.gz
tar -xvf velero-linux-amd64.tar.gz
sudo mv velero-*/velero /usr/local/bin

# Configure AWS S3 backend cho backups
cat <<EOF > credentials-velero
[default]
aws_access_key_id = <AWS_ACCESS_KEY_ID>
aws_secret_access_key = <AWS_SECRET_ACCESS_KEY>
EOF

# Install Velero với comprehensive configuration
velero install \\
    --provider aws \\
    --plugins velero/velero-plugin-for-aws:v1.7.0 \\
    --bucket velero-k8s-backups \\
    --backup-location-config region=us-west-2 \\
    --snapshot-location-config region=us-west-2 \\
    --secret-file ./credentials-velero \\
    --use-volume-snapshots=false \\
    --use-restic

# Create backup schedules
velero schedule create daily-full-backup \\
  --schedule="0 1 * * *" \\
  --ttl 720h0m0s \\
  --include-namespaces production,monitoring,databases

velero schedule create hourly-critical-backup \\
  --schedule="0 * * * *" \\
  --ttl 168h0m0s \\
  --include-namespaces production \\
  --selector app=critical

# Manual backup với specific resources
velero backup create manual-backup-\$(date +%Y%m%d-%H%M) \\
  --include-namespaces production \\
  --include-resources persistentvolumeclaims,persistentvolumes \\
  --storage-location default

# Restore specific backup
velero restore create restore-\$(date +%Y%m%d-%H%M) \\
  --from-backup daily-full-backup-20241201-010000 \\
  --namespace-mappings production:production-restored

# Monitor backup status
velero backup get
velero restore get
\`\`\`

## 6. Security Hardening và Compliance

### Pod Security Standards Implementation
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
# SecurityContext template cho production workloads
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod-template
spec:
  serviceAccountName: restricted-sa
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    runAsGroup: 3000
    fsGroup: 2000
    seccompProfile:
      type: RuntimeDefault
    supplementalGroups: [2000]
  containers:
  - name: app
    image: app:latest
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      runAsNonRoot: true
      runAsUser: 1000
      capabilities:
        drop:
        - ALL
        add:
        - NET_BIND_SERVICE
    resources:
      requests:
        memory: "512Mi"
        cpu: "500m"
      limits:
        memory: "1Gi"
        cpu: "1000m"
    volumeMounts:
    - name: tmp
      mountPath: /tmp
    - name: var-run
      mountPath: /var/run
  volumes:
  - name: tmp
    emptyDir: {}
  - name: var-run
    emptyDir: {}
\`\`\`

### Comprehensive RBAC Configuration
\`\`\`yaml
# rbac-production.yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: developer-role
rules:
- apiGroups: [""]
  resources: ["pods", "services", "configmaps", "secrets"]
  verbs: ["get", "list", "create", "update", "patch", "delete"]
- apiGroups: ["apps"]
  resources: ["deployments", "replicasets", "statefulsets", "daemonsets"]
  verbs: ["get", "list", "create", "update", "patch", "delete"]
- apiGroups: ["networking.k8s.io"]
  resources: ["ingresses", "networkpolicies"]
  verbs: ["get", "list", "create", "update", "patch", "delete"]
- apiGroups: [""]
  resources: ["events"]
  verbs: ["get", "list"]
- apiGroups: [""]
  resources: ["pods/log", "pods/exec"]
  verbs: ["get", "list", "create"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: sre-admin-role
rules:
- apiGroups: ["*"]
  resources: ["*"]
  verbs: ["*"]
- nonResourceURLs: ["*"]
  verbs: ["*"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: readonly-role
rules:
- apiGroups: [""]
  resources: ["*"]
  verbs: ["get", "list", "watch"]
- apiGroups: ["apps", "extensions", "networking.k8s.io"]
  resources: ["*"]
  verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: developers-production
  namespace: production
subjects:
- kind: User
  name: "dev-team@company.com"
  apiGroup: rbac.authorization.k8s.io
- kind: Group
  name: "developers"
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: developer-role
  apiGroup: rbac.authorization.k8s.io
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: sre-admin-binding
subjects:
- kind: User
  name: "sre-team@company.com"
  apiGroup: rbac.authorization.k8s.io
- kind: Group
  name: "sre-admins"
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: sre-admin-role
  apiGroup: rbac.authorization.k8s.io
\`\`\`

### Security Scanning và Compliance
\`\`\`bash
# Install Falco cho runtime security monitoring
helm repo add falcosecurity https://falcosecurity.github.io/charts
helm repo update

helm install falco falcosecurity/falco \\
  --namespace falco \\
  --create-namespace \\
  --set falco.grpc.enabled=true \\
  --set falco.grpcOutput.enabled=true

# Install OPA Gatekeeper cho policy enforcement
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper/release-3.14/deploy/gatekeeper.yaml

# Example constraint template
cat <<EOF | kubectl apply -f -
apiVersion: templates.gatekeeper.sh/v1beta1
kind: ConstraintTemplate
metadata:
  name: k8srequiredlabels
spec:
  crd:
    spec:
      names:
        kind: K8sRequiredLabels
      validation:
        type: object
        properties:
          labels:
            type: array
            items:
              type: string
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package k8srequiredlabels
        violation[{"msg": msg}] {
          required := input.parameters.labels
          provided := input.review.object.metadata.labels
          missing := required[_]
          not provided[missing]
          msg := sprintf("Missing required label: %v", [missing])
        }
EOF

# Apply constraint
cat <<EOF | kubectl apply -f -
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sRequiredLabels
metadata:
  name: must-have-app-label
spec:
  match:
    kinds:
      - apiGroups: ["apps"]
        kinds: ["Deployment"]
  parameters:
    labels: ["app", "environment", "team"]
EOF

# Scan images với Trivy
kubectl create job image-scan --image=aquasec/trivy \\
  -- trivy image --exit-code 1 --severity HIGH,CRITICAL nginx:latest
\`\`\`

## 7. Monitoring, Logging và Observability

### Prometheus Stack với Custom Metrics
\`\`\`yaml
# prometheus-production-values.yaml
prometheus:
  prometheusSpec:
    storageSpec:
      volumeClaimTemplate:
        spec:
          storageClassName: fast-ssd-retained
          accessModes: ["ReadWriteOnce"]
          resources:
            requests:
              storage: 200Gi
    retention: 30d
    retentionSize: 190GB
    resources:
      requests:
        memory: 4Gi
        cpu: 2000m
      limits:
        memory: 8Gi
        cpu: 4000m
    additionalScrapeConfigs:
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

grafana:
  persistence:
    enabled: true
    storageClassName: fast-ssd
    size: 20Gi
  admin:
    existingSecret: grafana-admin-secret
  resources:
    requests:
      memory: 1Gi
      cpu: 500m
    limits:
      memory: 2Gi
      cpu: 1000m
  dashboardProviders:
    dashboardproviders.yaml:
      apiVersion: 1
      providers:
      - name: 'default'
        orgId: 1
        folder: ''
        type: file
        disableDeletion: false
        editable: true
        options:
          path: /var/lib/grafana/dashboards/default

alertmanager:
  alertmanagerSpec:
    storage:
      volumeClaimTemplate:
        spec:
          storageClassName: fast-ssd
          accessModes: ["ReadWriteOnce"]
          resources:
            requests:
              storage: 20Gi
    config:
      global:
        slack_api_url: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK'
      route:
        group_by: ['alertname']
        group_wait: 10s
        group_interval: 10s
        repeat_interval: 1h
        receiver: 'web.hook'
      receivers:
      - name: 'web.hook'
        slack_configs:
        - channel: '#alerts'
          title: 'K8s Alert'
          text: 'Summary: \{\{ range .Alerts \}\}\{\{ .Annotations.summary \}\}\{\{ end \}\}'
\`\`\`

### Horizontal Pod Autoscaler với Custom Metrics
\`\`\`yaml
# custom-metrics-hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: webapp-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: webapp
  minReplicas: 3
  maxReplicas: 100
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  - type: Pods
    pods:
      metric:
        name: http_requests_per_second
      target:
        type: AverageValue
        averageValue: "1000m"
  - type: Object
    object:
      metric:
        name: messages_in_queue
      describedObject:
        apiVersion: v1
        kind: Service
        name: rabbitmq
      target:
        type: Value
        value: "30"
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 10
        periodSeconds: 60
      - type: Pods
        value: 2
        periodSeconds: 60
      selectPolicy: Min
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
      - type: Percent
        value: 100
        periodSeconds: 15
      - type: Pods
        value: 4
        periodSeconds: 15
      selectPolicy: Max
\`\`\`

### Centralized Logging với ELK Stack
\`\`\`yaml
# elasticsearch-cluster.yaml
apiVersion: elasticsearch.k8s.elastic.co/v1
kind: Elasticsearch
metadata:
  name: elasticsearch
  namespace: logging
spec:
  version: 8.8.0
  nodeSets:
  - name: master
    count: 3
    config:
      node.roles: ["master"]
      xpack.security.enabled: true
      xpack.security.transport.ssl.enabled: true
      xpack.security.transport.ssl.verification_mode: certificate
      xpack.security.transport.ssl.client_authentication: required
      xpack.security.transport.ssl.keystore.path: /usr/share/elasticsearch/config/certs/elastic-internal.p12
      xpack.security.transport.ssl.truststore.path: /usr/share/elasticsearch/config/certs/elastic-internal.p12
    podTemplate:
      spec:
        containers:
        - name: elasticsearch
          resources:
            requests:
              memory: 2Gi
              cpu: 1000m
            limits:
              memory: 4Gi
              cpu: 2000m
    volumeClaimTemplates:
    - metadata:
        name: elasticsearch-data
      spec:
        accessModes:
        - ReadWriteOnce
        resources:
          requests:
            storage: 100Gi
        storageClassName: fast-ssd
  - name: data
    count: 6
    config:
      node.roles: ["data", "ingest"]
    podTemplate:
      spec:
        containers:
        - name: elasticsearch
          resources:
            requests:
              memory: 4Gi
              cpu: 2000m
            limits:
              memory: 8Gi
              cpu: 4000m
    volumeClaimTemplates:
    - metadata:
        name: elasticsearch-data
      spec:
        accessModes:
        - ReadWriteOnce
        resources:
          requests:
            storage: 500Gi
        storageClassName: fast-ssd
---
apiVersion: kibana.k8s.elastic.co/v1
kind: Kibana
metadata:
  name: kibana
  namespace: logging
spec:
  version: 8.8.0
  count: 3
  elasticsearchRef:
    name: elasticsearch
  config:
    server.publicBaseUrl: https://kibana.example.com
  http:
    tls:
      selfSignedCertificate:
        disabled: true
\`\`\`

## 8. GitOps và CI/CD Integration

### ArgoCD Production Setup
\`\`\`yaml
# argocd-production.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: webapp-production
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: production
  source:
    repoURL: https://github.com/company/k8s-manifests
    targetRevision: HEAD
    path: applications/webapp/overlays/production
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
    - RespectIgnoreDifferences=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m0s
  revisionHistoryLimit: 10
  ignoreDifferences:
  - group: apps
    kind: Deployment
    managedFieldsManagers:
    - kube-controller-manager
---
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: production
  namespace: argocd
spec:
  description: Production applications project
  sourceRepos:
  - 'https://github.com/company/*'
  - 'https://charts.bitnami.com/bitnami'
  destinations:
  - namespace: 'production'
    server: https://kubernetes.default.svc
  - namespace: 'monitoring'
    server: https://kubernetes.default.svc
  clusterResourceWhitelist:
  - group: ''
    kind: Namespace
  - group: rbac.authorization.k8s.io
    kind: ClusterRole
  - group: rbac.authorization.k8s.io
    kind: ClusterRoleBinding
  namespaceResourceBlacklist:
  - group: ''
    kind: ResourceQuota
  - group: ''
    kind: LimitRange
  roles:
  - name: production-admin
    description: Admin access to production project
    policies:
    - p, proj:production:production-admin, applications, *, production/*, allow
    - p, proj:production:production-admin, repositories, *, *, allow
    groups:
    - company:production-admins
\`\`\`

### Helm Charts Management cho Production
\`\`\`yaml
# Chart.yaml cho production application
apiVersion: v2
name: webapp
description: Production-ready web application
type: application
version: 2.1.0
appVersion: "2.1.0"
dependencies:
- name: postgresql
  version: 12.1.2
  repository: https://charts.bitnami.com/bitnami
  condition: postgresql.enabled
- name: redis
  version: 17.4.3
  repository: https://charts.bitnami.com/bitnami
  condition: redis.enabled
- name: nginx-ingress
  version: 4.4.0
  repository: https://kubernetes.github.io/ingress-nginx
  condition: nginx-ingress.enabled
maintainers:
- name: STEP DevOps Team
  email: devops@step.com.vn
\`\`\`

\`\`\`yaml
# values-production.yaml
replicaCount: 5

image:
  repository: webapp
  pullPolicy: Always
  tag: "2.1.0"

nameOverride: ""
fullnameOverride: ""

serviceAccount:
  create: true
  annotations: {}
  name: ""

podAnnotations:
  prometheus.io/scrape: "true"
  prometheus.io/port: "8080"
  prometheus.io/path: "/metrics"

podSecurityContext:
  runAsNonRoot: true
  runAsUser: 1000
  fsGroup: 2000

securityContext:
  allowPrivilegeEscalation: false
  readOnlyRootFilesystem: true
  runAsNonRoot: true
  runAsUser: 1000
  capabilities:
    drop:
    - ALL

service:
  type: ClusterIP
  port: 80
  targetPort: 8080

ingress:
  enabled: true
  className: "nginx"
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/rate-limit: "100"
    nginx.ingress.kubernetes.io/rate-limit-window: "1m"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
  hosts:
  - host: webapp.example.com
    paths:
    - path: /
      pathType: Prefix
  tls:
  - secretName: webapp-tls
    hosts:
    - webapp.example.com

resources:
  limits:
    cpu: 2000m
    memory: 2Gi
  requests:
    cpu: 1000m
    memory: 1Gi

livenessProbe:
  httpGet:
    path: /health
    port: http
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /ready
    port: http
  initialDelaySeconds: 5
  periodSeconds: 5

autoscaling:
  enabled: true
  minReplicas: 5
  maxReplicas: 100
  targetCPUUtilizationPercentage: 70
  targetMemoryUtilizationPercentage: 80

nodeSelector: {}

tolerations: []

affinity:
  podAntiAffinity:
    preferredDuringSchedulingIgnoredDuringExecution:
    - weight: 100
      podAffinityTerm:
        labelSelector:
          matchExpressions:
          - key: app.kubernetes.io/name
            operator: In
            values:
            - webapp
        topologyKey: kubernetes.io/hostname

postgresql:
  enabled: true
  auth:
    postgresPassword: "secure-postgres-password"
    database: "webapp"
    username: "webapp"
    password: "webapp-db-password"
  primary:
    persistence:
      enabled: true
      size: 100Gi
      storageClass: "fast-ssd-retained"
    resources:
      requests:
        memory: 2Gi
        cpu: 1000m
      limits:
        memory: 4Gi
        cpu: 2000m

redis:
  enabled: true
  auth:
    enabled: true
    password: "secure-redis-password"
  master:
    persistence:
      enabled: true
      size: 20Gi
      storageClass: "fast-ssd"
    resources:
      requests:
        memory: 1Gi
        cpu: 500m
      limits:
        memory: 2Gi
        cpu: 1000m
  replica:
    replicaCount: 3
    persistence:
      enabled: true
      size: 20Gi
      storageClass: "fast-ssd"
\`\`\`

## 9. Troubleshooting và Performance Optimization

### Advanced Debugging Techniques
\`\`\`bash
# Cluster-wide health check
kubectl get nodes -o wide
kubectl get componentstatuses
kubectl cluster-info dump --output-directory=/tmp/cluster-dump

# Resource utilization analysis
kubectl top nodes --sort-by cpu
kubectl top pods --all-namespaces --sort-by cpu
kubectl describe node <node-name> | grep -A 10 "Allocated resources"

# Network connectivity debugging
kubectl run debug-pod --image=nicolaka/netshoot --rm -it -- /bin/bash
# Inside debug pod:
# nslookup kubernetes.default
# dig kubernetes.default.svc.cluster.local
# curl -I http://webapp.production.svc.cluster.local

# DNS debugging
kubectl run dns-debug --image=busybox --rm -it -- nslookup kubernetes.default
kubectl exec -ti dns-debug -- cat /etc/resolv.conf

# Storage debugging
kubectl get pv,pvc --all-namespaces
kubectl describe pv <pv-name>
kubectl get storageclass
kubectl get volumeattachments

# Event monitoring và analysis
kubectl get events --sort-by=.metadata.creationTimestamp
kubectl get events --field-selector involvedObject.kind=Pod,reason=Failed
kubectl get events --field-selector involvedObject.name=<pod-name>

# Pod debugging
kubectl describe pod <pod-name> -n <namespace>
kubectl logs <pod-name> -n <namespace> --previous
kubectl exec -it <pod-name> -n <namespace> -- /bin/sh
\`\`\`

### Performance Tuning
\`\`\`bash
# Node performance optimization
echo 'vm.max_map_count=262144' | sudo tee -a /etc/sysctl.conf
echo 'fs.file-max=2097152' | sudo tee -a /etc/sysctl.conf
echo 'net.core.somaxconn=32768' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv4.ip_local_port_range=1024 65535' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# kubelet performance tuning
# /var/lib/kubelet/config.yaml
maxPods: 200
kubeReserved:
  cpu: "200m"
  memory: "2Gi"
  ephemeral-storage: "1Gi"
systemReserved:
  cpu: "200m"
  memory: "1Gi"
  ephemeral-storage: "1Gi"
evictionHard:
  memory.available: "100Mi"
  nodefs.available: "5%"
  nodefs.inodesFree: "5%"
  imagefs.available: "10%"

# Container runtime optimization
# /etc/containerd/config.toml
[plugins."io.containerd.grpc.v1.cri"]
  max_container_log_line_size = 16384
  max_concurrent_downloads = 20

[plugins."io.containerd.grpc.v1.cri".containerd]
  snapshotter = "overlayfs"
  default_runtime_name = "runc"

[plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
  SystemdCgroup = true
  BinaryName = "/usr/bin/runc"

# etcd performance tuning
# --quota-backend-bytes=8589934592  # 8GB
# --auto-compaction-retention=3
# --max-request-bytes=33554432      # 32MB
\`\`\`

### Cluster Upgrades Strategy
\`\`\`bash
# Pre-upgrade checklist
kubectl get nodes
kubectl get pods --all-namespaces | grep -v Running
kubectl get pv | grep -v Bound

# Backup critical data
etcdctl snapshot save /backup/etcd-pre-upgrade-\$(date +%Y%m%d).db
velero backup create pre-upgrade-backup --wait

# Upgrade control plane first
sudo apt-mark unhold kubeadm
sudo apt-get update && sudo apt-get install -y kubeadm=1.28.4-00
sudo apt-mark hold kubeadm

# Verify upgrade plan
sudo kubeadm upgrade plan

# Apply upgrade to first control plane node
sudo kubeadm upgrade apply v1.28.4 --yes

# Upgrade kubelet và kubectl
sudo apt-mark unhold kubelet kubectl
sudo apt-get update && sudo apt-get install -y kubelet=1.28.4-00 kubectl=1.28.4-00
sudo apt-mark hold kubelet kubectl

# Restart kubelet
sudo systemctl daemon-reload
sudo systemctl restart kubelet

# Upgrade additional control plane nodes
kubectl drain <control-plane-node> --ignore-daemonsets --delete-emptydir-data
sudo kubeadm upgrade node
sudo systemctl daemon-reload
sudo systemctl restart kubelet
kubectl uncordon <control-plane-node>

# Upgrade worker nodes
kubectl drain <worker-node> --ignore-daemonsets --delete-emptydir-data
sudo kubeadm upgrade node
sudo systemctl daemon-reload
sudo systemctl restart kubelet
kubectl uncordon <worker-node>

# Post-upgrade verification
kubectl get nodes
kubectl version
kubectl get pods --all-namespaces
\`\`\`

## Kết luận

Kubernetes production deployment trong enterprise environment cần comprehensive approach covering architecture, security, operations, và continuous improvement. Key takeaways:

### 1. **Infrastructure Foundation**
- High availability control plane với proper load balancing
- CNI selection based trên performance requirements (Calico vs Cilium)
- Storage classes optimized cho workload patterns
- Comprehensive backup strategies với Velero

### 2. **Security-First Approach**
- Pod Security Standards enforcement
- RBAC implementation với least privilege principle
- Network policies cho micro-segmentation
- Runtime security monitoring với Falco
- Policy enforcement với OPA Gatekeeper

### 3. **Operational Excellence**
- Comprehensive monitoring stack với Prometheus/Grafana
- Centralized logging với ELK stack
- Automated scaling với HPA/VPA
- GitOps workflow với ArgoCD
- Proper troubleshooting procedures và tooling

### 4. **Application Deployment Strategies**
- Blue-green deployments cho zero-downtime releases
- Canary deployments với automated rollback
- StatefulSets cho stateful applications
- Service mesh integration cho advanced traffic management

### 5. **Performance và Scalability**
- Resource optimization với proper requests/limits
- Node performance tuning
- Container runtime optimization
- Application-level performance monitoring

### 6. **Disaster Recovery**
- Regular etcd backups
- Cluster-wide backup strategies
- Multi-region deployment considerations
- Recovery procedures documentation

Kubernetes platform success đòi hỏi continuous learning, proper tooling, strong operational practices, và deep understanding của underlying infrastructure. Investment trong Kubernetes expertise và proper tooling sẽ provide significant ROI trong long-term infrastructure strategy, application delivery capabilities, và operational efficiency.

Modern enterprise applications demand reliability, scalability, và security mà Kubernetes ecosystem cung cấp. Với proper implementation của best practices outlined trong guide này, organizations có thể achieve production-grade Kubernetes deployments supporting business-critical workloads với confidence và operational excellence.`,
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
                    def imageTag = "\${env.BUILD_NUMBER}-\${env.GIT_COMMIT.take(7)}"
                    docker.build("\${DOCKER_REGISTRY}/\${IMAGE_NAME}:\${imageTag}")
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
                     message: "Build failed: \${env.JOB_NAME} - \${env.BUILD_NUMBER}"
        }
        success {
            slackSend channel: '#devops', 
                     color: 'good', 
                     message: "Build successful: \${env.JOB_NAME} - \${env.BUILD_NUMBER}"
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
      postgresPassword: \${POSTGRES_PASSWORD}
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