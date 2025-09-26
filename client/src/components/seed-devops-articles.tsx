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

## 9. Advanced Deployment Strategies

### Blue-Green Deployment:
\`\`\`groovy
// Jenkins Blue-Green Pipeline
pipeline {
    agent any
    
    environment {
        BLUE_ENV = 'blue'
        GREEN_ENV = 'green'
        PRODUCTION_ENV = credentials('current-production-env')
    }
    
    stages {
        stage('Determine Target Environment') {
            steps {
                script {
                    def currentEnv = sh(
                        script: "kubectl get service production-service -o jsonpath='{.spec.selector.environment}'",
                        returnStdout: true
                    ).trim()
                    
                    env.TARGET_ENV = (currentEnv == 'blue') ? 'green' : 'blue'
                    env.CURRENT_ENV = currentEnv
                    
                    echo "Current: \\${env.CURRENT_ENV}, Target: \\${env.TARGET_ENV}"
                }
            }
        }
        
        stage('Deploy to Target Environment') {
            steps {
                script {
                    sh """
                        helm upgrade --install myapp-\\${env.TARGET_ENV} ./helm-chart \\
                            --set environment=\\${env.TARGET_ENV} \\
                            --set image.tag=\\${env.BUILD_NUMBER} \\
                            --set ingress.host=\\${env.TARGET_ENV}.myapp.com \\
                            --namespace \\${env.TARGET_ENV}
                    """
                    
                    sh """
                        kubectl wait --for=condition=available \\
                            --timeout=600s \\
                            deployment/myapp-\\${env.TARGET_ENV} \\
                            -n \\${env.TARGET_ENV}
                    """
                }
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    def healthChecksPassed = sh(
                        script: """
                            curl -f http://\\${env.TARGET_ENV}.myapp.com/health
                            kubectl exec -n \\${env.TARGET_ENV} \\
                                deployment/myapp-\\${env.TARGET_ENV} -- \\
                                npm run health:db
                        """,
                        returnStatus: true
                    )
                    
                    if (healthChecksPassed != 0) {
                        error "Health checks failed for \\${env.TARGET_ENV} environment"
                    }
                }
            }
        }
        
        stage('Switch Traffic') {
            steps {
                input message: "Switch traffic to \\${env.TARGET_ENV}?", ok: 'Switch'
                
                script {
                    sh """
                        kubectl patch service production-service \\
                            -p '{"spec":{"selector":{"environment":"\\${env.TARGET_ENV}"}}}' \\
                            -n production
                    """
                    
                    sleep(30)
                    sh "curl -f http://myapp.com/health"
                }
            }
        }
    }
}
\`\`\`

### Canary Deployment với Istio:
\`\`\`yaml
# Canary deployment configuration
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: myapp-canary
spec:
  hosts:
  - myapp.com
  http:
  - match:
    - headers:
        canary:
          exact: "true"
    route:
    - destination:
        host: myapp-service
        subset: canary
  - route:
    - destination:
        host: myapp-service
        subset: stable
      weight: 95
    - destination:
        host: myapp-service
        subset: canary
      weight: 5
---
apiVersion: flagger.app/v1beta1
kind: Canary
metadata:
  name: myapp-canary
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  analysis:
    interval: 1m
    threshold: 5
    stepWeight: 10
    maxWeight: 50
    metrics:
    - name: request-success-rate
      thresholdRange:
        min: 99
      interval: 1m
    - name: request-duration
      thresholdRange:
        max: 500
      interval: 1m
\`\`\`

## 10. Performance Optimization

### Pipeline Optimization Strategies:
\`\`\`yaml
# GitLab CI optimization
variables:
  DOCKER_DRIVER: overlay2
  FF_USE_FASTZIP: "true"
  CACHE_COMPRESSION_LEVEL: "fastest"
  
prepare:
  stage: prepare
  script:
    - npm ci --cache .npm --prefer-offline
  cache:
    key: \\$CI_COMMIT_REF_SLUG
    paths:
      - .npm/
      - node_modules/
    policy: push
  only:
    changes:
      - package-lock.json

build:
  stage: build
  parallel:
    matrix:
      - PLATFORM: [linux/amd64, linux/arm64]
  script:
    - docker buildx build 
        --platform \\$PLATFORM 
        --cache-from type=registry,ref=\\$CI_REGISTRY_IMAGE:cache
        --cache-to type=registry,ref=\\$CI_REGISTRY_IMAGE:cache,mode=max
        -t \\$CI_REGISTRY_IMAGE:\\$CI_COMMIT_SHA .
\`\`\`

### Load Testing Integration:
\`\`\`javascript
// Performance testing trong pipeline
const performanceTest = async () => {
  const Artillery = require('artillery');
  
  const config = {
    config: {
      target: process.env.STAGING_URL,
      phases: [
        { duration: 60, arrivalRate: 5, name: "Warm up" },
        { duration: 120, arrivalRate: 15, name: "Ramp up" },
        { duration: 300, arrivalRate: 25, name: "Sustained load" }
      ]
    },
    scenarios: [
      {
        name: "User journey",
        weight: 100,
        flow: [
          { get: { url: "/" } },
          { post: { 
              url: "/api/auth/login",
              json: { email: "test@example.com", password: "test123" }
          }},
          { get: { url: "/dashboard" } },
          { get: { url: "/api/users/profile" } }
        ]
      }
    ]
  };
  
  const runner = new Artillery.runner();
  const results = await runner.run(config);
  
  // Performance thresholds
  const thresholds = {
    averageResponseTime: 200,
    maxResponseTime: 1000,
    errorRate: 0.01,
    throughput: 100
  };
  
  const metrics = results.aggregate();
  
  if (metrics.latency.mean > thresholds.averageResponseTime) {
    throw new Error(\`Average response time: \${metrics.latency.mean}ms exceeds threshold: \${thresholds.averageResponseTime}ms\`);
  }
  
  if (metrics.errors.rate > thresholds.errorRate) {
    throw new Error(\`Error rate: \${metrics.errors.rate} exceeds threshold: \${thresholds.errorRate}\`);
  }
  
  console.log('Performance tests passed:', metrics);
  return metrics;
};
\`\`\`

## 11. Monitoring và Observability

### Pipeline Monitoring:
\`\`\`javascript
// Custom metrics collection
const sendMetric = async (metricName, value, tags = {}) => {
  const metric = {
    name: metricName,
    value: value,
    timestamp: Date.now(),
    tags: {
      pipeline: process.env.CI_PIPELINE_ID,
      environment: process.env.CI_ENVIRONMENT_NAME,
      ...tags
    }
  };
  
  await fetch('http://prometheus-pushgateway:9091/metrics/job/cicd', {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: \`\${metricName}{\${Object.entries(metric.tags).map(([k,v]) => \`\${k}="\${v}"\`).join(',')}} \${value}\`
  });
};

// Usage trong pipeline
await sendMetric('build_duration', buildTime, { stage: 'build', status: 'success' });
await sendMetric('test_coverage', coveragePercentage, { type: 'unit' });
await sendMetric('deployment_frequency', 1, { environment: 'production' });
\`\`\`

### Error Tracking:
\`\`\`groovy
pipeline {
    stages {
        stage('Deploy') {
            steps {
                script {
                    try {
                        sh 'kubectl apply -f k8s/'
                        sh 'kubectl rollout status deployment/myapp'
                        
                        // Send success metric
                        sh """
                            curl -X POST 'http://prometheus:9090/api/v1/admin/tsdb/delete_series' \\
                                 --data-urlencode 'match[]={__name__="deployment_status",job="cicd"}'
                            curl -X POST 'http://prometheus-pushgateway:9091/metrics/job/cicd' \\
                                 --data-binary 'deployment_status{environment="production",status="success"} 1'
                        """
                        
                    } catch (Exception e) {
                        // Send failure metric và detailed error
                        sh """
                            curl -X POST 'http://prometheus-pushgateway:9091/metrics/job/cicd' \\
                                 --data-binary 'deployment_status{environment="production",status="failure"} 0'
                        """
                        
                        // Log detailed error to centralized logging
                        sh """
                            echo '{
                                "timestamp": "\\$(date -Iseconds)",
                                "level": "ERROR",
                                "message": "Deployment failed",
                                "pipeline_id": "\\${BUILD_ID}",
                                "error": "\\${e.getMessage()}",
                                "stage": "deploy",
                                "environment": "production"
                            }' | curl -X POST http://logstash:5044 \\
                                 -H 'Content-Type: application/json' -d @-
                        """
                        
                        throw e
                    }
                }
            }
        }
    }
}
\`\`\`

## 12. Security Best Practices

### Advanced Security Scanning:
\`\`\`yaml
# Comprehensive security pipeline
security_comprehensive:
  stage: security
  parallel:
    matrix:
      - SCAN_TYPE: [sast, dast, dependency, container, secrets, compliance]
  script:
    - |
      case \\$SCAN_TYPE in
        sast)
          # Static Application Security Testing
          sonar-scanner \\
            -Dsonar.projectKey=\\$CI_PROJECT_NAME \\
            -Dsonar.sources=. \\
            -Dsonar.exclusions=node_modules/**,coverage/** \\
            -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
          
          # Additional SAST với Semgrep
          docker run --rm -v \\$(pwd):/src returntocorp/semgrep \\
            --config=auto --json --output=semgrep-report.json /src
          ;;
        dast)
          # Dynamic Application Security Testing
          docker run --rm \\
            -v \\$(pwd):/zap/wrk/:rw \\
            -t owasp/zap2docker-stable \\
            zap-full-scan.py -t http://staging.myapp.com \\
            -J zap-report.json -r zap-report.html
          ;;
        dependency)
          # Dependency vulnerability scanning
          npm audit --audit-level moderate --json > npm-audit.json
          
          # Snyk scanning
          snyk test --severity-threshold=high --json > snyk-report.json
          
          # OSV-Scanner
          osv-scanner --format json --output osv-report.json .
          ;;
        container)
          # Container image security scanning
          docker run --rm \\
            -v /var/run/docker.sock:/var/run/docker.sock \\
            -v \\$(pwd):/workspace \\
            aquasec/trivy image \\
            --format json --output /workspace/trivy-report.json \\
            \\$CI_REGISTRY_IMAGE:\\$CI_COMMIT_SHA
          
          # Clair scanning
          docker run --rm \\
            -v /var/run/docker.sock:/var/run/docker.sock \\
            arminc/clair-scanner:latest \\
            --clair="http://clair:6060" \\
            --report="clair-report.json" \\
            \\$CI_REGISTRY_IMAGE:\\$CI_COMMIT_SHA
          ;;
        secrets)
          # Secret detection
          docker run --rm \\
            -v \\$(pwd):/workspace \\
            trufflesecurity/trufflehog:latest \\
            filesystem /workspace --json > trufflehog-report.json
          
          # GitLeaks
          docker run --rm \\
            -v \\$(pwd):/path \\
            zricethezav/gitleaks:latest \\
            detect --source=/path --report-format=json --report-path=/path/gitleaks-report.json
          ;;
        compliance)
          # Compliance checks (SOC2, GDPR, PCI-DSS)
          python3 scripts/compliance-checker.py \\
            --standards sox,gdpr,pci \\
            --output compliance-report.json
          ;;
      esac
  artifacts:
    reports:
      sast: semgrep-report.json
      dast: zap-report.json
      dependency_scanning: snyk-report.json
      container_scanning: trivy-report.json
    paths:
      - "*-report.json"
      - "*-report.html"
    expire_in: 30 days
\`\`\`

### Secrets Management:
\`\`\`groovy
// Jenkins secrets management
pipeline {
    environment {
        // Use Jenkins credentials plugin
        DB_PASSWORD = credentials('database-password')
        API_KEY = credentials('external-api-key')
        
        // Vault integration
        VAULT_ADDR = 'https://vault.company.com'
        VAULT_TOKEN = credentials('vault-token')
    }
    
    stages {
        stage('Retrieve Secrets') {
            steps {
                script {
                    // Retrieve secrets from Vault
                    def secrets = sh(
                        script: """
                            vault kv get -format=json secret/myapp/prod | \\
                            jq -r '.data.data | to_entries[] | "\\(.key)=\\(.value)"'
                        """,
                        returnStdout: true
                    ).trim().split('\n')
                    
                    secrets.each { secret ->
                        def (key, value) = secret.split('=', 2)
                        env."\\${key}" = value
                    }
                }
            }
        }
        
        stage('Deploy with Secrets') {
            steps {
                script {
                    // Create Kubernetes secrets
                    sh """
                        kubectl create secret generic app-secrets \\
                            --from-literal=database-url="\\${DATABASE_URL}" \\
                            --from-literal=api-key="\\${API_KEY}" \\
                            --dry-run=client -o yaml | kubectl apply -f -
                    """
                    
                    // Deploy with secret references
                    sh 'helm upgrade --install myapp ./chart --set secrets.enabled=true'
                }
            }
        }
    }
    
    post {
        always {
            script {
                // Cleanup temporary secrets
                sh 'unset DATABASE_URL API_KEY'
                sh 'vault auth -method=token \\${VAULT_TOKEN} && vault token revoke -self'
            }
        }
    }
}
\`\`\`

## 13. Troubleshooting Guide

### Common Pipeline Issues:

#### Build Failures:
\`\`\`bash
# Comprehensive build debugging
echo "=== Environment Information ==="
echo "Node Version: \\$(node --version)"
echo "NPM Version: \\$(npm --version)"
echo "Docker Version: \\$(docker --version)"
echo "Available Memory: \\$(free -h)"
echo "Disk Space: \\$(df -h)"

# Package management issues
echo "=== Package Dependencies ==="
npm ls --depth=0
echo "=== Package Audit ==="
npm audit --audit-level=info

# Docker build optimization
echo "=== Docker Build Context ==="
echo "Build context size: \\$(du -sh . | cut -f1)"
echo "Dockerfile content:"
cat Dockerfile

# Build with verbose logging
docker build --no-cache --progress=plain --build-arg BUILDKIT_INLINE_CACHE=1 -t debug-build .

# Network connectivity tests
echo "=== Network Connectivity ==="
ping -c 3 registry.npmjs.org
ping -c 3 registry.docker.io
\`\`\`

#### Test Failures:
\`\`\`javascript
// Test debugging utilities
const debugTestEnvironment = () => {
  console.log('=== Test Environment Debug ===');
  console.log('Node Version:', process.version);
  console.log('Platform:', process.platform);
  console.log('Memory Usage:', process.memoryUsage());
  console.log('Environment Variables:', {
    NODE_ENV: process.env.NODE_ENV,
    CI: process.env.CI,
    TEST_TIMEOUT: process.env.TEST_TIMEOUT
  });
  
  // Check database connectivity
  if (process.env.DATABASE_URL) {
    const { Client } = require('pg');
    const client = new Client({ connectionString: process.env.DATABASE_URL });
    
    client.connect()
      .then(() => {
        console.log('Database connection: SUCCESS');
        return client.query('SELECT version()');
      })
      .then(result => {
        console.log('Database version:', result.rows[0].version);
        return client.end();
      })
      .catch(err => {
        console.error('Database connection: FAILED', err.message);
      });
  }
  
  // Check external service connectivity
  const testExternalServices = async () => {
    const services = [
      'https://api.github.com',
      'https://registry.npmjs.org',
      process.env.EXTERNAL_API_URL
    ].filter(Boolean);
    
    for (const service of services) {
      try {
        const response = await fetch(service, { method: 'HEAD' });
        console.log(\`Service \${service}: \${response.status}\`);
      } catch (error) {
        console.error(\`Service \${service}: FAILED - \${error.message}\`);
      }
    }
  };
  
  testExternalServices();
};

// Jest configuration for debugging
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/test-setup.js'],
  testTimeout: 30000,
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'html'],
  testEnvironment: 'node',
  globalSetup: '<rootDir>/global-test-setup.js',
  globalTeardown: '<rootDir>/global-test-teardown.js',
  
  // Custom reporter for detailed output
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'test-results',
      outputName: 'junit.xml'
    }],
    ['jest-html-reporters', {
      publicPath: 'test-results',
      filename: 'test-report.html'
    }]
  ]
};
\`\`\`

#### Deployment Issues:
\`\`\`bash
#!/bin/bash
# Comprehensive deployment troubleshooting

echo "=== Kubernetes Deployment Debug ==="

# Cluster information
kubectl cluster-info
kubectl version --client

# Node status
kubectl get nodes -o wide
kubectl describe nodes | grep -E "Name:|Conditions:|Capacity:|Allocatable:"

# Namespace resources
kubectl get all -n \\$NAMESPACE -o wide

# Pod detailed information
kubectl describe pods -l app=\\$APP_NAME -n \\$NAMESPACE

# Events (last hour)
kubectl get events -n \\$NAMESPACE --sort-by='.lastTimestamp' | tail -20

# Resource quotas and limits
kubectl describe resourcequota -n \\$NAMESPACE
kubectl describe limitrange -n \\$NAMESPACE

# Network policies
kubectl get networkpolicies -n \\$NAMESPACE -o yaml

# Storage classes and PVCs
kubectl get storageclass
kubectl get pvc -n \\$NAMESPACE

# ConfigMaps and Secrets
kubectl get configmaps,secrets -n \\$NAMESPACE

# Ingress controllers
kubectl get ingress -n \\$NAMESPACE
kubectl describe ingress \\$INGRESS_NAME -n \\$NAMESPACE

# Service mesh (if using Istio)
if kubectl get crd gateways.networking.istio.io >/dev/null 2>&1; then
    echo "=== Istio Debug ==="
    kubectl get gateway,virtualservice,destinationrule -n \\$NAMESPACE
    istioctl proxy-status
    istioctl proxy-config cluster \\$POD_NAME -n \\$NAMESPACE
fi

# Application logs
echo "=== Application Logs ==="
kubectl logs -l app=\\$APP_NAME -n \\$NAMESPACE --tail=100 --previous=false
kubectl logs -l app=\\$APP_NAME -n \\$NAMESPACE --tail=100 --previous=true

# Health check debugging
echo "=== Health Check Debug ==="
POD_IP=\\$(kubectl get pod -l app=\\$APP_NAME -n \\$NAMESPACE -o jsonpath='{.items[0].status.podIP}')
kubectl run debug-pod --image=nicolaka/netshoot --rm -it -- curl -v http://\\$POD_IP:8080/health
\`\`\`

## 14. Enterprise Integration

### Multi-Environment Management:
\`\`\`yaml
# Environment-specific configuration
stages:
  - validate
  - build
  - test
  - security
  - deploy_dev
  - deploy_staging
  - deploy_production

variables:
  ENVIRONMENTS: "dev,staging,production"

.deploy_template: &deploy_template
  stage: deploy_\\${ENVIRONMENT}
  script:
    - echo "Deploying to \\${ENVIRONMENT}"
    - envsubst < k8s/deployment.template.yaml > k8s/deployment.yaml
    - kubectl apply -f k8s/ -n \\${ENVIRONMENT}
    - kubectl rollout status deployment/myapp -n \\${ENVIRONMENT}
  environment:
    name: \\${ENVIRONMENT}
    url: https://\\${ENVIRONMENT}.myapp.com
  rules:
    - if: '\\$CI_PIPELINE_SOURCE == "push" && \\$CI_COMMIT_BRANCH == "\\${BRANCH}"'

deploy_dev:
  <<: *deploy_template
  variables:
    ENVIRONMENT: "dev"
    BRANCH: "develop"
  before_script:
    - export DATABASE_URL=\\$DEV_DATABASE_URL
    - export API_REPLICAS=1
    - export RESOURCE_LIMITS="100m/128Mi"

deploy_staging:
  <<: *deploy_template
  variables:
    ENVIRONMENT: "staging"
    BRANCH: "master"
  before_script:
    - export DATABASE_URL=\\$STAGING_DATABASE_URL
    - export API_REPLICAS=2
    - export RESOURCE_LIMITS="200m/256Mi"

deploy_production:
  <<: *deploy_template
  variables:
    ENVIRONMENT: "production"
    BRANCH: "master"
  when: manual
  before_script:
    - export DATABASE_URL=\\$PRODUCTION_DATABASE_URL
    - export API_REPLICAS=5
    - export RESOURCE_LIMITS="500m/512Mi"
\`\`\`

### Compliance và Audit Trail:
\`\`\`javascript
// Comprehensive audit logging
const auditLogger = {
  logPipelineEvent: async (event, metadata = {}) => {
    const auditEntry = {
      timestamp: new Date().toISOString(),
      eventType: event,
      pipelineId: process.env.CI_PIPELINE_ID,
      commitSha: process.env.CI_COMMIT_SHA,
      branch: process.env.CI_COMMIT_BRANCH,
      user: process.env.CI_COMMIT_AUTHOR,
      environment: process.env.CI_ENVIRONMENT_NAME,
      metadata: metadata,
      compliance: {
        sox: true,
        gdpr: true,
        iso27001: true
      }
    };
    
    // Send to multiple audit systems
    await Promise.all([
      this.sendToSplunk(auditEntry),
      this.sendToElasticsearch(auditEntry),
      this.sendToComplianceDB(auditEntry)
    ]);
  },
  
  sendToSplunk: async (entry) => {
    await fetch('https://splunk.company.com:8088/services/collector', {
      method: 'POST',
      headers: {
        'Authorization': \`Splunk \${process.env.SPLUNK_TOKEN}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event: entry,
        source: 'cicd-pipeline',
        sourcetype: 'audit',
        index: 'compliance'
      })
    });
  },
  
  sendToElasticsearch: async (entry) => {
    await fetch('https://elasticsearch.company.com/audit-logs/_doc', {
      method: 'POST',
      headers: {
        'Authorization': \`Basic \${Buffer.from(\`\${process.env.ES_USER}:\${process.env.ES_PASSWORD}\`).toString('base64')}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entry)
    });
  }
};

// Usage trong pipeline stages
await auditLogger.logPipelineEvent('DEPLOYMENT_STARTED', {
  environment: 'production',
  approver: process.env.BUILD_USER_ID,
  changeTicket: process.env.CHANGE_TICKET_ID
});

await auditLogger.logPipelineEvent('SECURITY_SCAN_COMPLETED', {
  vulnerabilities: scanResults.vulnerabilities,
  complianceStatus: scanResults.compliance
});
\`\`\`

## Kết luận

CI/CD pipeline hiện đại là foundation critical cho successful DevOps transformation và enterprise software delivery. Comprehensive implementation của advanced CI/CD practices mang lại transformative benefits:

### Key Strategic Outcomes:

**Operational Excellence:**
- **Deployment Frequency**: Từ monthly releases lên daily/hourly deployments
- **Lead Time**: Giảm từ weeks xuống hours cho feature delivery
- **Mean Time to Recovery**: Automated rollback giảm recovery time từ hours xuống minutes
- **Change Failure Rate**: Comprehensive testing giảm production issues 80-90%

**Business Impact:**
- **Time to Market**: Faster feature delivery tạo competitive advantage
- **Cost Reduction**: Automation giảm manual effort 70-80%
- **Quality Improvement**: Automated testing và security scanning catch 95% issues before production
- **Compliance Assurance**: Automated audit trails đảm bảo regulatory compliance

### Advanced Implementation Patterns:

**Progressive Delivery:**
- Blue-Green deployments cho zero-downtime releases
- Canary deployments với automated rollback based on metrics
- Feature flags enabling controlled feature rollouts
- A/B testing integration cho data-driven decisions

**Security-First Approach:**
- Shift-left security với comprehensive scanning
- Secrets management với automated rotation
- Compliance automation cho SOX, GDPR, PCI-DSS requirements
- Zero-trust deployment với verified container images

**Enterprise Integration:**
- Multi-cloud deployment strategies
- LDAP/AD integration cho access control
- Enterprise monitoring với comprehensive observability
- Disaster recovery với automated backup và restore procedures

### Future-Ready Architecture:

**Emerging Technologies:**
- **AI/ML Integration**: Predictive analytics cho pipeline optimization
- **GitOps Evolution**: Declarative infrastructure management
- **Serverless CI/CD**: Event-driven pipeline execution
- **Edge Computing**: Distributed deployment strategies

**Scalability Considerations:**
- Microservices-ready pipeline patterns
- Container orchestration với Kubernetes
- Multi-region deployment capabilities
- Auto-scaling pipeline infrastructure

### Implementation Roadmap:

**Phase 1: Foundation (Months 1-3)**
- Basic CI/CD pipeline setup
- Automated testing implementation
- Security scanning integration
- Environment standardization

**Phase 2: Advanced Patterns (Months 4-6)**
- Blue-green deployment implementation
- Comprehensive monitoring setup
- Performance testing automation
- Compliance automation

**Phase 3: Enterprise Integration (Months 7-12)**
- Multi-environment orchestration
- Advanced security practices
- Disaster recovery procedures
- Team training và adoption

**Phase 4: Optimization (Ongoing)**
- Performance tuning
- Cost optimization
- Technology evolution adaptation
- Continuous improvement culture

### Success Metrics:

**Technical Metrics:**
- Build success rate: >95%
- Test coverage: >80%
- Deployment success rate: >99%
- Security vulnerability detection: 100% critical issues caught

**Business Metrics:**
- Developer productivity increase: 40-60%
- Time to market improvement: 50-70%
- Operational cost reduction: 30-50%
- Customer satisfaction improvement: 20-30%

Modern software delivery demands sophisticated CI/CD implementations combining automation, security, performance, và reliability. Organizations investing trong comprehensive CI/CD practices achieve significant competitive advantages through faster delivery, higher quality, improved security, và enhanced operational efficiency.

Success requires commitment to continuous learning, technology adoption, team training, và cultural transformation. Companies embracing advanced CI/CD practices position themselves for sustained growth và innovation trong rapidly evolving digital landscape.

The future belongs to organizations mastering automated software delivery pipelines enabling rapid, safe, và reliable value delivery to customers. Investment trong CI/CD excellence provides foundational capabilities supporting business agility, innovation velocity, và operational resilience essential for competitive success.`,
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

## 6. Advanced State Management

### Remote State Backends:
\`\`\`hcl
# S3 Backend với DynamoDB locking
terraform {
  backend "s3" {
    bucket         = "terraform-state-bucket"
    key            = "infrastructure/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "terraform-state-locks"
    
    # Versioning và lifecycle
    versioning = true
    lifecycle_rule {
      enabled = true
      noncurrent_version_expiration {
        days = 90
      }
    }
  }
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# State bucket setup
resource "aws_s3_bucket" "terraform_state" {
  bucket = "terraform-state-bucket"
  
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id
  
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_dynamodb_table" "terraform_state_locks" {
  name           = "terraform-state-locks"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "LockID"
  
  attribute {
    name = "LockID"
    type = "S"
  }
  
  tags = {
    Name        = "Terraform State Lock Table"
    Environment = "production"
  }
}
\`\`\`

### State Import và Migration:
\`\`\`bash
# Import existing AWS resources
terraform import aws_instance.web i-1234567890abcdef0
terraform import aws_vpc.main vpc-abcd1234

# State migration between backends
terraform init -migrate-state

# State manipulation
terraform state list
terraform state show aws_instance.web
terraform state mv aws_instance.web aws_instance.web_server
terraform state rm aws_instance.obsolete

# State recovery
terraform force-unlock LOCK_ID
terraform refresh
\`\`\`

## 7. Multi-Cloud Infrastructure

### AWS + Azure Deployment:
\`\`\`hcl
# Multi-cloud provider configuration
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

# AWS Provider
provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.project_name
      ManagedBy   = "terraform"
    }
  }
}

# Azure Provider
provider "azurerm" {
  features {}
  subscription_id = var.azure_subscription_id
}

# GCP Provider
provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

# AWS VPC
resource "aws_vpc" "main" {
  cidr_block           = var.aws_vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = {
    Name = "\${var.project_name}-aws-vpc"
  }
}

# Azure Virtual Network
resource "azurerm_resource_group" "main" {
  name     = "\${var.project_name}-rg"
  location = var.azure_location
}

resource "azurerm_virtual_network" "main" {
  name                = "\${var.project_name}-vnet"
  address_space       = [var.azure_vnet_cidr]
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
}

# GCP VPC
resource "google_compute_network" "main" {
  name                    = "\${var.project_name}-vpc"
  auto_create_subnetworks = false
  routing_mode           = "GLOBAL"
}

# Inter-cloud VPN connections
resource "aws_vpn_gateway" "main" {
  vpc_id = aws_vpc.main.id
  
  tags = {
    Name = "\${var.project_name}-vpn-gateway"
  }
}

resource "azurerm_virtual_network_gateway" "main" {
  name                = "\${var.project_name}-vpn-gateway"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  
  type     = "Vpn"
  vpn_type = "RouteBased"
  
  active_active = false
  enable_bgp    = false
  sku           = "VpnGw1"
  
  ip_configuration {
    name                          = "vnetGatewayConfig"
    public_ip_address_id          = azurerm_public_ip.vpn_gateway.id
    private_ip_address_allocation = "Dynamic"
    subnet_id                     = azurerm_subnet.gateway.id
  }
}
\`\`\`

### Cross-Cloud Data Sync:
\`\`\`hcl
# Data sources for cross-cloud references
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical
  
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
}

data "azurerm_client_config" "current" {}

data "google_compute_zones" "available" {
  region = var.gcp_region
}

# Shared configuration through remote state
data "terraform_remote_state" "network" {
  backend = "s3"
  config = {
    bucket = "terraform-state-bucket"
    key    = "network/terraform.tfstate"
    region = "us-west-2"
  }
}

# Multi-cloud load balancer setup
resource "aws_lb" "main" {
  name               = "\${var.project_name}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets           = aws_subnet.public[*].id
  
  enable_deletion_protection = var.environment == "production"
}

resource "azurerm_lb" "main" {
  name                = "\${var.project_name}-lb"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  sku                = "Standard"
  
  frontend_ip_configuration {
    name                 = "PublicIPAddress"
    public_ip_address_id = azurerm_public_ip.lb.id
  }
}
\`\`\`

## 8. Security Hardening

### Policy as Code với Sentinel:
\`\`\`hcl
# Sentinel policy enforcement
policy "require-encryption" {
  enforcement_level = "hard-mandatory"
}

# EBS encryption policy
import "tfplan/v2" as tfplan

# Check all EBS volumes are encrypted
ebs_volumes = filter tfplan.resource_changes as _, rc {
  rc.type is "aws_ebs_volume" and
  rc.mode is "managed" and
  (rc.change.actions contains "create" or rc.change.actions contains "update")
}

require_ebs_encryption = rule {
  all ebs_volumes as _, volume {
    volume.change.after.encrypted is true
  }
}

# S3 encryption policy
s3_buckets = filter tfplan.resource_changes as _, rc {
  rc.type is "aws_s3_bucket" and
  rc.mode is "managed" and
  (rc.change.actions contains "create" or rc.change.actions contains "update")
}

require_s3_encryption = rule {
  all s3_buckets as _, bucket {
    bucket.change.after.server_side_encryption_configuration is not null
  }
}

main = rule {
  require_ebs_encryption and require_s3_encryption
}
\`\`\`

### Security Groups và Network ACLs:
\`\`\`hcl
# Comprehensive security group setup
resource "aws_security_group" "web_tier" {
  name_prefix = "\${var.project_name}-web-"
  vpc_id      = aws_vpc.main.id
  description = "Security group for web tier"
  
  # HTTP/HTTPS from load balancer only
  ingress {
    description     = "HTTP from ALB"
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }
  
  ingress {
    description     = "HTTPS from ALB"
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }
  
  # Outbound to app tier
  egress {
    description     = "To app tier"
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.app_tier.id]
  }
  
  # HTTPS outbound for updates
  egress {
    description = "HTTPS outbound"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "\${var.project_name}-web-sg"
    Tier = "web"
  }
}

resource "aws_security_group" "app_tier" {
  name_prefix = "\${var.project_name}-app-"
  vpc_id      = aws_vpc.main.id
  description = "Security group for application tier"
  
  # App port from web tier only
  ingress {
    description     = "App port from web tier"
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.web_tier.id]
  }
  
  # Database access
  egress {
    description     = "To database"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.db_tier.id]
  }
  
  tags = {
    Name = "\${var.project_name}-app-sg"
    Tier = "application"
  }
}

# Network ACL for additional security
resource "aws_network_acl" "private" {
  vpc_id     = aws_vpc.main.id
  subnet_ids = aws_subnet.private[*].id
  
  # Allow inbound from VPC
  ingress {
    protocol   = "tcp"
    rule_no    = 100
    action     = "allow"
    cidr_block = aws_vpc.main.cidr_block
    from_port  = 0
    to_port    = 65535
  }
  
  # Allow outbound to VPC
  egress {
    protocol   = "tcp"
    rule_no    = 100
    action     = "allow"
    cidr_block = aws_vpc.main.cidr_block
    from_port  = 0
    to_port    = 65535
  }
  
  # Allow HTTPS outbound
  egress {
    protocol   = "tcp"
    rule_no    = 200
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 443
    to_port    = 443
  }
  
  tags = {
    Name = "\${var.project_name}-private-nacl"
  }
}
\`\`\`

## 9. Advanced Module Development

### Terraform Module Structure:
\`\`\`
modules/
├── vpc/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   ├── versions.tf
│   └── README.md
├── compute/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   ├── user_data.sh
│   └── versions.tf
└── database/
    ├── main.tf
    ├── variables.tf
    ├── outputs.tf
    └── versions.tf
\`\`\`

### Production-Ready VPC Module:
\`\`\`hcl
# modules/vpc/main.tf
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}

locals {
  # Calculate subnet CIDRs automatically
  public_subnet_cidrs = [
    for i in range(var.public_subnet_count) :
    cidrsubnet(var.vpc_cidr, 8, i + 1)
  ]
  
  private_subnet_cidrs = [
    for i in range(var.private_subnet_count) :
    cidrsubnet(var.vpc_cidr, 8, i + 100)
  ]
  
  database_subnet_cidrs = [
    for i in range(var.database_subnet_count) :
    cidrsubnet(var.vpc_cidr, 8, i + 200)
  ]
}

# VPC
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = var.enable_dns_hostnames
  enable_dns_support   = var.enable_dns_support
  
  tags = merge(var.tags, {
    Name = "\${var.name}-vpc"
  })
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  
  tags = merge(var.tags, {
    Name = "\${var.name}-igw"
  })
}

# Public Subnets
resource "aws_subnet" "public" {
  count             = var.public_subnet_count
  vpc_id            = aws_vpc.main.id
  cidr_block        = local.public_subnet_cidrs[count.index]
  availability_zone = data.aws_availability_zones.available.names[count.index]
  
  map_public_ip_on_launch = true
  
  tags = merge(var.tags, {
    Name = "\${var.name}-public-\${count.index + 1}"
    Type = "public"
  })
}

# Private Subnets
resource "aws_subnet" "private" {
  count             = var.private_subnet_count
  vpc_id            = aws_vpc.main.id
  cidr_block        = local.private_subnet_cidrs[count.index]
  availability_zone = data.aws_availability_zones.available.names[count.index]
  
  tags = merge(var.tags, {
    Name = "\${var.name}-private-\${count.index + 1}"
    Type = "private"
  })
}

# NAT Gateways
resource "aws_eip" "nat" {
  count  = var.enable_nat_gateway ? var.single_nat_gateway ? 1 : var.private_subnet_count : 0
  domain = "vpc"
  
  depends_on = [aws_internet_gateway.main]
  
  tags = merge(var.tags, {
    Name = "\${var.name}-nat-eip-\${count.index + 1}"
  })
}

resource "aws_nat_gateway" "main" {
  count         = var.enable_nat_gateway ? var.single_nat_gateway ? 1 : var.private_subnet_count : 0
  allocation_id = aws_eip.nat[count.index].id
  subnet_id     = aws_subnet.public[count.index].id
  
  depends_on = [aws_internet_gateway.main]
  
  tags = merge(var.tags, {
    Name = "\${var.name}-nat-\${count.index + 1}"
  })
}

# Route Tables
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
  
  tags = merge(var.tags, {
    Name = "\${var.name}-public-rt"
  })
}

resource "aws_route_table" "private" {
  count  = var.enable_nat_gateway ? var.single_nat_gateway ? 1 : var.private_subnet_count : 1
  vpc_id = aws_vpc.main.id
  
  dynamic "route" {
    for_each = var.enable_nat_gateway ? [1] : []
    content {
      cidr_block     = "0.0.0.0/0"
      nat_gateway_id = var.single_nat_gateway ? aws_nat_gateway.main[0].id : aws_nat_gateway.main[count.index].id
    }
  }
  
  tags = merge(var.tags, {
    Name = "\${var.name}-private-rt-\${count.index + 1}"
  })
}

# Route Table Associations
resource "aws_route_table_association" "public" {
  count          = var.public_subnet_count
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "private" {
  count          = var.private_subnet_count
  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = var.single_nat_gateway ? aws_route_table.private[0].id : aws_route_table.private[count.index].id
}

# VPC Flow Logs
resource "aws_flow_log" "vpc" {
  count                = var.enable_flow_logs ? 1 : 0
  iam_role_arn         = aws_iam_role.flow_logs[0].arn
  log_destination      = aws_cloudwatch_log_group.vpc_flow_logs[0].arn
  traffic_type         = "ALL"
  vpc_id               = aws_vpc.main.id
  log_destination_type = "cloud-watch-logs"
  
  tags = var.tags
}

resource "aws_cloudwatch_log_group" "vpc_flow_logs" {
  count             = var.enable_flow_logs ? 1 : 0
  name              = "/aws/vpc/\${var.name}-flow-logs"
  retention_in_days = var.flow_logs_retention_days
  
  tags = var.tags
}

resource "aws_iam_role" "flow_logs" {
  count = var.enable_flow_logs ? 1 : 0
  name  = "\${var.name}-flow-logs-role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "vpc-flow-logs.amazonaws.com"
        }
      }
    ]
  })
  
  tags = var.tags
}

resource "aws_iam_role_policy" "flow_logs" {
  count = var.enable_flow_logs ? 1 : 0
  name  = "\${var.name}-flow-logs-policy"
  role  = aws_iam_role.flow_logs[0].id
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
          "logs:DescribeLogGroups",
          "logs:DescribeLogStreams"
        ]
        Effect   = "Allow"
        Resource = "*"
      }
    ]
  })
}

# Data Sources
data "aws_availability_zones" "available" {
  state = "available"
}
\`\`\`

## 10. Testing và Validation

### Terratest Integration:
\`\`\`go
// test/vpc_test.go
package test

import (
  "testing"
  
  "github.com/gruntwork-io/terratest/modules/terraform"
  "github.com/gruntwork-io/terratest/modules/aws"
  "github.com/stretchr/testify/assert"
)

func TestVPCModule(t *testing.T) {
  t.Parallel()
  
  // Pick a random AWS region
  awsRegion := aws.GetRandomStableRegion(t, nil, nil)
  
  terraformOptions := &terraform.Options{
    TerraformDir: "../examples/vpc",
    
    Vars: map[string]interface{}{
      "region":      awsRegion,
      "name":        "test-vpc",
      "vpc_cidr":    "10.0.0.0/16",
      "environment": "test",
    },
    
    EnvVars: map[string]string{
      "AWS_DEFAULT_REGION": awsRegion,
    },
  }
  
  defer terraform.Destroy(t, terraformOptions)
  
  terraform.InitAndApply(t, terraformOptions)
  
  // Validate VPC creation
  vpcId := terraform.Output(t, terraformOptions, "vpc_id")
  assert.NotEmpty(t, vpcId)
  
  // Validate subnets
  publicSubnets := terraform.OutputList(t, terraformOptions, "public_subnet_ids")
  privateSubnets := terraform.OutputList(t, terraformOptions, "private_subnet_ids")
  
  assert.Len(t, publicSubnets, 2)
  assert.Len(t, privateSubnets, 2)
  
  // Validate internet connectivity for public subnets
  for _, subnetId := range publicSubnets {
    aws.AssertSubnetIsPublic(t, awsRegion, subnetId)
  }
  
  // Validate private subnets have NAT gateway route
  for _, subnetId := range privateSubnets {
    aws.AssertSubnetIsPrivate(t, awsRegion, subnetId)
  }
}

func TestVPCWithoutNATGateway(t *testing.T) {
  t.Parallel()
  
  awsRegion := aws.GetRandomStableRegion(t, nil, nil)
  
  terraformOptions := &terraform.Options{
    TerraformDir: "../examples/vpc",
    
    Vars: map[string]interface{}{
      "region":           awsRegion,
      "name":             "test-vpc-no-nat",
      "vpc_cidr":         "10.1.0.0/16",
      "enable_nat_gateway": false,
    },
  }
  
  defer terraform.Destroy(t, terraformOptions)
  
  terraform.InitAndApply(t, terraformOptions)
  
  // Validate no NAT gateways were created
  natGateways := terraform.OutputList(t, terraformOptions, "nat_gateway_ids")
  assert.Empty(t, natGateways)
}
\`\`\`

### Terraform Testing Framework:
\`\`\`hcl
# tests/vpc.tftest.hcl
run "setup_test_environment" {
  module {
    source = "./modules/vpc"
  }
  
  variables {
    name                    = "test-vpc"
    vpc_cidr               = "10.0.0.0/16"
    public_subnet_count    = 2
    private_subnet_count   = 2
    enable_nat_gateway     = true
    single_nat_gateway     = false
    enable_flow_logs       = true
    
    tags = {
      Environment = "test"
      Project     = "terraform-testing"
    }
  }
}

run "validate_vpc_creation" {
  command = plan
  
  assert {
    condition     = aws_vpc.main.cidr_block == "10.0.0.0/16"
    error_message = "VPC CIDR block does not match expected value"
  }
  
  assert {
    condition     = length(aws_subnet.public) == 2
    error_message = "Expected 2 public subnets"
  }
  
  assert {
    condition     = length(aws_subnet.private) == 2
    error_message = "Expected 2 private subnets"
  }
}

run "validate_nat_gateway_configuration" {
  command = plan
  
  assert {
    condition     = length(aws_nat_gateway.main) == 2
    error_message = "Expected 2 NAT gateways when single_nat_gateway is false"
  }
  
  assert {
    condition     = length(aws_eip.nat) == 2
    error_message = "Expected 2 Elastic IPs for NAT gateways"
  }
}

run "validate_security_features" {
  command = plan
  
  assert {
    condition = length([
      for log in aws_flow_log.vpc : log
      if log.traffic_type == "ALL"
    ]) == 1
    error_message = "VPC Flow Logs should be enabled for ALL traffic"
  }
}
\`\`\`

## 11. CI/CD Integration

### GitLab CI Pipeline:
\`\`\`yaml
# .gitlab-ci.yml
stages:
  - validate
  - plan
  - apply
  - test
  - destroy

variables:
  TF_ROOT: \${CI_PROJECT_DIR}
  TF_ADDRESS: \${CI_API_V4_URL}/projects/\${CI_PROJECT_ID}/terraform/state/\${CI_ENVIRONMENT_NAME}

.terraform:
  image: hashicorp/terraform:1.5
  before_script:
    - cd \$TF_ROOT
    - terraform --version
    - terraform init

validate:
  extends: .terraform
  stage: validate
  script:
    - terraform validate
    - terraform fmt -check
  rules:
    - if: '\$CI_PIPELINE_SOURCE == "merge_request_event"'
    - if: '\$CI_COMMIT_BRANCH && \$CI_OPEN_MERGE_REQUESTS'
      when: never
    - if: '\$CI_COMMIT_BRANCH'

plan:
  extends: .terraform
  stage: plan
  script:
    - terraform plan -var-file="environments/\${CI_ENVIRONMENT_NAME}.tfvars" -out="plan.cache"
    - terraform show -json plan.cache > plan.json
  artifacts:
    name: plan
    paths:
      - \$TF_ROOT/plan.cache
      - \$TF_ROOT/plan.json
    reports:
      terraform: \$TF_ROOT/plan.json
  environment:
    name: \$CI_COMMIT_REF_SLUG
  rules:
    - if: '\$CI_COMMIT_BRANCH == "main"'
    - if: '\$CI_PIPELINE_SOURCE == "merge_request_event"'

apply:
  extends: .terraform
  stage: apply
  script:
    - terraform apply -auto-approve "plan.cache"
  environment:
    name: \$CI_COMMIT_REF_SLUG
    action: start
  dependencies:
    - plan
  rules:
    - if: '\$CI_COMMIT_BRANCH == "main"'
      when: manual
    - if: '\$CI_PIPELINE_SOURCE == "merge_request_event"'
      when: manual

terratest:
  stage: test
  image: golang:1.21
  before_script:
    - cd test
    - go mod download
  script:
    - go test -v -timeout 30m
  dependencies:
    - apply
  rules:
    - if: '\$CI_COMMIT_BRANCH == "main"'
      when: manual

cleanup:
  extends: .terraform
  stage: destroy
  script:
    - terraform destroy -auto-approve -var-file="environments/\${CI_ENVIRONMENT_NAME}.tfvars"
  environment:
    name: \$CI_COMMIT_REF_SLUG
    action: stop
  rules:
    - if: '\$CI_COMMIT_BRANCH == "main"'
      when: manual
    - if: '\$CI_PIPELINE_SOURCE == "merge_request_event"'
      when: manual
  dependencies:
    - plan
\`\`\`

### GitHub Actions Workflow:
\`\`\`yaml
# .github/workflows/terraform.yml
name: 'Terraform'

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

env:
  TF_CLOUD_ORGANIZATION: "your-org"
  TF_API_TOKEN: "\${{ secrets.TF_API_TOKEN }}"
  TF_WORKSPACE: "infrastructure"

jobs:
  terraform:
    name: 'Terraform'
    runs-on: ubuntu-latest
    environment: production
    
    defaults:
      run:
        shell: bash
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
    
    - name: Setup Terraform
      uses: hashicorp/setup-terraform@v3
      with:
        terraform_version: 1.5.0
        cli_config_credentials_token: \${{ secrets.TF_API_TOKEN }}
    
    - name: Terraform Format
      id: fmt
      run: terraform fmt -check
    
    - name: Terraform Init
      id: init
      run: terraform init
    
    - name: Terraform Validate
      id: validate
      run: terraform validate -no-color
    
    - name: Terraform Plan
      id: plan
      if: github.event_name == 'pull_request'
      run: terraform plan -no-color -input=false
      continue-on-error: true
    
    - name: Update Pull Request
      uses: actions/github-script@v7
      if: github.event_name == 'pull_request'
      env:
        PLAN: "\${{ steps.plan.outputs.stdout }}"
      with:
        github-token: \${{ secrets.GITHUB_TOKEN }}
        script: |
          const output = \`#### Terraform Format and Style 🖌\\\`\${{ steps.fmt.outcome }}\\\`
          #### Terraform Initialization ⚙️\\\`\${{ steps.init.outcome }}\\\`
          #### Terraform Validation 🤖\\\`\${{ steps.validate.outcome }}\\\`
          #### Terraform Plan 📖\\\`\${{ steps.plan.outcome }}\\\`
          
          <details><summary>Show Plan</summary>
          
          \\\`\\\`\\\`terraform\\n
          \${process.env.PLAN}
          \\\`\\\`\\\`
          
          </details>
          
          *Pushed by: @\${{ github.actor }}, Action: \\\`\${{ github.event_name }}\\\`*\`;
          
          github.rest.issues.createComment({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: output
          })
    
    - name: Terraform Plan Status
      if: steps.plan.outcome == 'failure'
      run: exit 1
    
    - name: Terraform Apply
      if: github.ref == 'refs/heads/main' && github.event_name == 'push'
      run: terraform apply -auto-approve -input=false
\`\`\`

## 12. Performance Optimization

### Resource Parallelism:
\`\`\`hcl
# terraform.tf
terraform {
  required_version = ">= 1.0"
  
  # Optimize performance
  experiments = [
    config_driven_move
  ]
}

# Use for_each for better parallelism
resource "aws_instance" "web" {
  for_each = toset(var.availability_zones)
  
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
  subnet_id     = aws_subnet.private[each.key].id
  
  vpc_security_group_ids = [aws_security_group.web.id]
  
  user_data = base64encode(templatefile("\${path.module}/user_data.sh", {
    app_name = var.app_name
    region   = var.region
  }))
  
  root_block_device {
    volume_type           = "gp3"
    volume_size           = var.root_volume_size
    encrypted             = true
    delete_on_termination = true
    
    tags = {
      Name = "\${var.name}-web-\${each.key}-root"
    }
  }
  
  metadata_options {
    http_endpoint               = "enabled"
    http_put_response_hop_limit = 1
    http_tokens                 = "required"
    instance_metadata_tags      = "enabled"
  }
  
  lifecycle {
    create_before_destroy = true
    ignore_changes       = [ami]
  }
  
  tags = {
    Name = "\${var.name}-web-\${each.key}"
    AZ   = each.key
  }
}

# Use dynamic blocks for complex configurations
resource "aws_security_group" "application" {
  name_prefix = "\${var.name}-app-"
  vpc_id      = aws_vpc.main.id
  description = "Security group for application tier"
  
  dynamic "ingress" {
    for_each = var.ingress_rules
    content {
      description      = ingress.value.description
      from_port        = ingress.value.from_port
      to_port          = ingress.value.to_port
      protocol         = ingress.value.protocol
      cidr_blocks      = ingress.value.cidr_blocks
      security_groups  = ingress.value.security_groups
    }
  }
  
  dynamic "egress" {
    for_each = var.egress_rules
    content {
      description      = egress.value.description
      from_port        = egress.value.from_port
      to_port          = egress.value.to_port
      protocol         = egress.value.protocol
      cidr_blocks      = egress.value.cidr_blocks
      security_groups  = egress.value.security_groups
    }
  }
}
\`\`\`

### State Management Optimization:
\`\`\`bash
#!/bin/bash
# Performance optimization script

# Terraform parallelism
export TF_CLI_ARGS_plan="-parallelism=20"
export TF_CLI_ARGS_apply="-parallelism=20"

# Provider caching
export TF_PLUGIN_CACHE_DIR="\$HOME/.terraform.d/plugin-cache"
mkdir -p \$TF_PLUGIN_CACHE_DIR

# Terraform logging
export TF_LOG=INFO
export TF_LOG_PATH="./terraform.log"

# State backup
terraform state pull > "terraform-state-backup-\$(date +%Y%m%d-%H%M%S).json"

# Refresh optimization
terraform refresh -parallelism=20

# Plan with target resources for large infrastructure
terraform plan -target=aws_vpc.main -target=aws_subnet.public

# Apply with reduced parallelism for sensitive resources
terraform apply -parallelism=5 -target=aws_db_instance.main

# State operations optimization
terraform state list | grep "aws_instance" | head -10 | xargs -I {} terraform state show {}
\`\`\`

## 13. Troubleshooting Guide

### Common Issues và Solutions:

#### State Lock Issues:
\`\`\`bash
# Check state lock
terraform state list

# Force unlock (use with caution)
terraform force-unlock LOCK_ID

# Alternative: Manual state cleanup
aws dynamodb delete-item \\
  --table-name terraform-state-locks \\
  --key '{"LockID":{"S":"LOCK_ID"}}'

# State corruption recovery
terraform state pull > backup.tfstate
terraform state push backup.tfstate
\`\`\`

#### Provider Issues:
\`\`\`bash
# Clear provider cache
rm -rf .terraform/providers/

# Reinstall providers
terraform init -upgrade

# Provider debugging
export TF_LOG_PROVIDER=DEBUG
terraform plan

# Version constraints debugging
terraform providers
terraform version
\`\`\`

#### Resource Drift Detection:
\`\`\`bash
# Detect configuration drift
terraform plan -detailed-exitcode

# Import existing resources
terraform import aws_instance.web i-1234567890abcdef0

# Refresh state
terraform refresh

# Automated drift detection script
#!/bin/bash
set -e

echo "Checking for infrastructure drift..."

# Run terraform plan
if terraform plan -detailed-exitcode -out=tfplan; then
  echo "✅ No drift detected"
  exit 0
elif [ \$? -eq 2 ]; then
  echo "⚠️  Infrastructure drift detected"
  
  # Show what changed
  terraform show tfplan
  
  # Optionally auto-apply
  if [ "\$AUTO_APPLY" = "true" ]; then
    echo "Auto-applying changes..."
    terraform apply tfplan
  else
    echo "Review changes and apply manually"
    exit 2
  fi
else
  echo "❌ Terraform plan failed"
  exit 1
fi
\`\`\`

#### Performance Debugging:
\`\`\`bash
# Enable detailed logging
export TF_LOG=TRACE
export TF_LOG_PATH="debug.log"

# Profile terraform operations
time terraform plan
time terraform apply

# Resource graph analysis
terraform graph | dot -Tsvg > graph.svg

# Analyze state file size
ls -lh terraform.tfstate
terraform state list | wc -l

# Provider plugin debugging
strace -e trace=network terraform plan 2>&1 | grep -E "connect|send|recv"
\`\`\`

## Kết luận

Infrastructure as Code với Terraform represents foundation critical cho modern cloud operations và enterprise infrastructure management. Comprehensive implementation của advanced Terraform practices enables organizations achieve unprecedented levels của automation, consistency, reliability trong infrastructure delivery.

### Strategic Benefits Achieved:

**Operational Excellence:**
- **Infrastructure Consistency**: 100% reproducible infrastructure across environments
- **Deployment Speed**: Infrastructure provision time reduced từ days xuống minutes
- **Error Reduction**: Human errors eliminated through automation và validation
- **Change Management**: Complete audit trail và rollback capabilities

**Business Impact:**
- **Cost Optimization**: Resource optimization reduces cloud costs 30-40%
- **Time to Market**: Faster environment provisioning accelerates product delivery
- **Compliance Assurance**: Policy as Code ensures regulatory compliance
- **Risk Mitigation**: Standardized infrastructure reduces security vulnerabilities

### Advanced Implementation Mastery:

**Multi-Cloud Excellence:**
- Unified infrastructure management across AWS, Azure, GCP
- Cross-cloud networking và data synchronization
- Provider-agnostic resource abstractions
- Disaster recovery spanning multiple cloud providers

**Security-First Architecture:**
- Policy as Code với Sentinel enforcement
- Comprehensive network segmentation
- Encrypted state management với access controls
- Automated security compliance validation

**Enterprise Integration:**
- CI/CD pipeline integration với automated testing
- Module libraries với versioning và governance
- State management với team collaboration
- Performance optimization cho large-scale infrastructure

### Production-Ready Capabilities:

**Advanced State Management:**
- Remote backends với locking mechanisms
- State versioning và backup strategies
- Multi-environment state organization
- Collaborative workflows với team access controls

**Comprehensive Testing:**
- Unit testing với Terratest
- Integration testing với real infrastructure
- Policy validation với automated compliance checks
- Performance testing cho resource provisioning

**Monitoring và Observability:**
- Infrastructure drift detection
- Resource utilization monitoring
- Cost tracking và optimization recommendations
- Automated alerting cho infrastructure changes

### Future-Ready Architecture:

**Emerging Technologies:**
- **GitOps Integration**: Declarative infrastructure với Git workflows
- **AI-Driven Optimization**: Machine learning cho resource optimization
- **Edge Computing**: Distributed infrastructure management
- **Serverless Infrastructure**: Event-driven resource provisioning

**Scalability Innovations:**
- Micro-infrastructure patterns
- Container-native infrastructure
- Kubernetes operator patterns
- Service mesh infrastructure automation

### Implementation Roadmap:

**Phase 1: Foundation (Months 1-2)**
- Core Terraform skills development
- Basic module creation
- State management setup
- Version control integration

**Phase 2: Advanced Patterns (Months 3-4)**
- Multi-cloud infrastructure
- Security policy implementation
- CI/CD pipeline integration
- Testing framework adoption

**Phase 3: Enterprise Integration (Months 5-6)**
- Module library development
- Team collaboration workflows
- Performance optimization
- Compliance automation

**Phase 4: Continuous Innovation (Ongoing)**
- Technology adoption
- Process optimization
- Team training và mentoring
- Community contribution

### Success Metrics:

**Technical Excellence:**
- Infrastructure provisioning time: <30 minutes for complete environments
- Configuration drift incidents: <1 per quarter
- Security policy compliance: 100% automated validation
- Resource utilization efficiency: >80% optimal usage

**Business Outcomes:**
- Development team productivity: 50-70% improvement
- Infrastructure costs: 30-40% reduction
- Deployment reliability: 99.9% success rate
- Time to market: 40-60% faster environment delivery

Modern cloud infrastructure demands sophisticated Infrastructure as Code practices combining automation, security, scalability, reliability. Organizations mastering advanced Terraform capabilities achieve significant competitive advantages through faster delivery, improved security, cost optimization, operational excellence.

Success requires commitment to continuous learning, best practices adoption, team collaboration, technological innovation. Companies embracing comprehensive IaC strategies position themselves for sustained growth trong rapidly evolving cloud landscape.

The future belongs to organizations achieving infrastructure excellence through code, enabling rapid adaptation, reliable operations, seamless scalability essential for competitive success trong digital-first economy. Investment trong Terraform mastery provides foundational capabilities supporting business agility, innovation velocity, operational resilience critical for long-term prosperity.`,
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

## 5. Advanced Monitoring Patterns

### Service Level Objectives (SLOs) Implementation:
\`\`\`yaml
# SLO definitions và error budgets
apiVersion: v1
kind: ConfigMap
metadata:
  name: slo-config
data:
  slos.yaml: |
    slos:
      - name: api-availability
        service: user-api
        sli:
          query: |
            sum(rate(http_requests_total{job="user-api",code!~"5.."}[5m])) /
            sum(rate(http_requests_total{job="user-api"}[5m]))
        objective: 0.999  # 99.9% availability
        error_budget_period: 30d
        
      - name: api-latency-p99
        service: user-api
        sli:
          query: |
            histogram_quantile(0.99,
              sum(rate(http_request_duration_seconds_bucket{job="user-api"}[5m])) by (le)
            )
        objective: 0.5  # 500ms p99 latency
        error_budget_period: 30d
        
      - name: database-availability
        service: postgres
        sli:
          query: |
            up{job="postgres"}
        objective: 0.9999  # 99.99% database availability
        error_budget_period: 30d

---
# Error budget alerts
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: slo-error-budget-alerts
spec:
  groups:
  - name: slo.rules
    rules:
    - alert: ErrorBudgetBurn
      expr: |
        (
          1 - (
            sum(rate(http_requests_total{job="user-api",code!~"5.."}[1h])) /
            sum(rate(http_requests_total{job="user-api"}[1h]))
          )
        ) > (0.001 * 14.4)  # Burn rate > 14.4x acceptable rate
      for: 2m
      labels:
        severity: critical
        service: user-api
      annotations:
        summary: "Fast error budget burn for {{ \$labels.service }}"
        description: "Error budget for {{ \$labels.service }} is burning too fast"
        runbook_url: "https://runbooks.company.com/slo-error-budget"
        
    - alert: ErrorBudgetExhausted
      expr: |
        error_budget_remaining{service="user-api"} <= 0
      for: 5m
      labels:
        severity: warning
        service: user-api
      annotations:
        summary: "Error budget exhausted for {{ \$labels.service }}"
        description: "{{ \$labels.service }} has exhausted its error budget"
\`\`\`

### Multi-Dimensional Monitoring:
\`\`\`python
# Advanced metrics collection với custom dimensions
import time
import json
from prometheus_client import Counter, Histogram, Gauge, start_http_server
from functools import wraps

# Business metrics
user_registration_counter = Counter(
    'user_registrations_total',
    'Total user registrations',
    ['registration_type', 'user_tier', 'region', 'source']
)

order_processing_histogram = Histogram(
    'order_processing_duration_seconds',
    'Order processing duration',
    ['order_type', 'payment_method', 'fulfillment_center', 'customer_tier'],
    buckets=[0.1, 0.5, 1.0, 2.0, 5.0, 10.0, 30.0, 60.0]
)

revenue_gauge = Gauge(
    'revenue_per_minute',
    'Revenue generated per minute',
    ['product_category', 'region', 'channel']
)

# System metrics với business context
cache_hit_ratio = Histogram(
    'cache_hit_ratio',
    'Cache hit ratio by operation',
    ['cache_type', 'operation', 'data_type']
)

database_query_duration = Histogram(
    'database_query_duration_seconds',
    'Database query duration',
    ['query_type', 'table', 'index_used', 'user_tier'],
    buckets=[0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1.0, 5.0]
)

# Advanced instrumentation decorator
def monitor_business_operation(operation_type, **dimensions):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            start_time = time.time()
            
            # Extract business context
            context = extract_business_context(args, kwargs)
            labels = {**dimensions, **context}
            
            try:
                result = func(*args, **kwargs)
                
                # Record success metrics
                if operation_type == 'user_registration':
                    user_registration_counter.labels(**labels).inc()
                elif operation_type == 'order_processing':
                    duration = time.time() - start_time
                    order_processing_histogram.labels(**labels).observe(duration)
                    
                    # Record revenue if order successful
                    if hasattr(result, 'total_amount'):
                        revenue_gauge.labels(
                            product_category=labels.get('product_category', 'unknown'),
                            region=labels.get('region', 'unknown'),
                            channel=labels.get('channel', 'web')
                        ).set(result.total_amount)
                
                return result
                
            except Exception as e:
                # Record error metrics với detailed context
                error_counter.labels(
                    operation=operation_type,
                    error_type=type(e).__name__,
                    **labels
                ).inc()
                raise
                
        return wrapper
    return decorator

def extract_business_context(args, kwargs):
    """Extract business context từ function arguments"""
    context = {}
    
    # Extract user tier
    if 'user' in kwargs:
        user = kwargs['user']
        context['user_tier'] = getattr(user, 'tier', 'unknown')
        context['region'] = getattr(user, 'region', 'unknown')
    
    # Extract order details
    if 'order' in kwargs:
        order = kwargs['order']
        context['order_type'] = getattr(order, 'type', 'unknown')
        context['payment_method'] = getattr(order, 'payment_method', 'unknown')
    
    return context

# Usage examples
@monitor_business_operation('user_registration', 
                          registration_type='email', 
                          source='web')
def register_user(email, password, user_data):
    # Registration logic
    user = create_user(email, password)
    send_welcome_email(user)
    return user

@monitor_business_operation('order_processing')
def process_order(order, user):
    # Order processing logic
    validate_inventory(order)
    charge_payment(order)
    schedule_fulfillment(order)
    return order
\`\`\`

## 6. Distributed Tracing Architecture

### OpenTelemetry Implementation:
\`\`\`python
# Comprehensive tracing setup
from opentelemetry import trace, metrics, baggage
from opentelemetry.exporter.jaeger.thrift import JaegerExporter
from opentelemetry.exporter.prometheus import PrometheusMetricReader
from opentelemetry.instrumentation.flask import FlaskInstrumentor
from opentelemetry.instrumentation.requests import RequestsInstrumentor
from opentelemetry.instrumentation.psycopg2 import Psycopg2Instrumentor
from opentelemetry.instrumentation.redis import RedisInstrumentor
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.sdk.resources import Resource

# Configure tracing
resource = Resource.create({
    "service.name": "user-service",
    "service.version": "1.2.3",
    "deployment.environment": "production",
    "k8s.cluster.name": "production-cluster",
    "k8s.namespace.name": "user-service",
    "k8s.pod.name": os.environ.get("HOSTNAME", "unknown")
})

trace.set_tracer_provider(TracerProvider(resource=resource))

# Jaeger exporter với sampling
jaeger_exporter = JaegerExporter(
    agent_host_name="jaeger-agent",
    agent_port=6831,
)

span_processor = BatchSpanProcessor(
    jaeger_exporter,
    max_queue_size=512,
    max_export_batch_size=32,
    export_timeout_millis=30000
)

trace.get_tracer_provider().add_span_processor(span_processor)

# Configure metrics
metrics.set_meter_provider(
    MeterProvider(
        resource=resource,
        metric_readers=[PrometheusMetricReader()]
    )
)

# Auto-instrumentation
FlaskInstrumentor().instrument()
RequestsInstrumentor().instrument()
Psycopg2Instrumentor().instrument()
RedisInstrumentor().instrument()

# Custom business tracing
tracer = trace.get_tracer(__name__)
meter = metrics.get_meter(__name__)

# Business metrics
order_counter = meter.create_counter(
    "orders_processed_total",
    description="Total orders processed"
)

user_registration_duration = meter.create_histogram(
    "user_registration_duration",
    description="User registration duration"
)

def trace_business_operation(operation_name):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            with tracer.start_as_current_span(
                operation_name,
                attributes={
                    "business.operation": operation_name,
                    "user.id": kwargs.get('user_id'),
                    "service.version": "1.2.3"
                }
            ) as span:
                try:
                    # Add business context to baggage
                    if 'user_id' in kwargs:
                        baggage.set_baggage("user.id", str(kwargs['user_id']))
                    if 'tenant_id' in kwargs:
                        baggage.set_baggage("tenant.id", str(kwargs['tenant_id']))
                    
                    result = func(*args, **kwargs)
                    
                    # Add result attributes
                    if hasattr(result, 'id'):
                        span.set_attribute("result.id", str(result.id))
                    if hasattr(result, 'status'):
                        span.set_attribute("result.status", result.status)
                    
                    # Record business metrics
                    if operation_name == "process_order":
                        order_counter.add(1, {"status": "success"})
                    
                    span.set_status(trace.Status(trace.StatusCode.OK))
                    return result
                    
                except Exception as e:
                    span.record_exception(e)
                    span.set_status(
                        trace.Status(trace.StatusCode.ERROR, str(e))
                    )
                    
                    # Record error metrics
                    if operation_name == "process_order":
                        order_counter.add(1, {"status": "error"})
                    
                    raise
                    
        return wrapper
    return decorator

# Advanced correlation và context propagation
@trace_business_operation("user_registration")
def register_user(email, password, **context):
    with tracer.start_as_current_span("validate_user_data") as span:
        span.set_attribute("email.domain", email.split('@')[1])
        validate_user_data(email, password)
    
    with tracer.start_as_current_span("create_user_account") as span:
        user = create_user_in_database(email, password)
        span.set_attribute("user.id", user.id)
        span.set_attribute("user.tier", user.tier)
    
    with tracer.start_as_current_span("send_welcome_email") as span:
        send_welcome_email(user.email, user.id)
        span.set_attribute("email.template", "welcome_v2")
    
    with tracer.start_as_current_span("setup_user_preferences") as span:
        setup_default_preferences(user.id)
    
    return user

# Cross-service correlation
import requests

def call_external_service(url, data, correlation_id=None):
    headers = {}
    
    # Propagate trace context
    from opentelemetry.propagate import inject
    inject(headers)
    
    # Add correlation ID
    if correlation_id:
        headers['X-Correlation-ID'] = correlation_id
    
    with tracer.start_as_current_span("external_service_call") as span:
        span.set_attribute("http.url", url)
        span.set_attribute("correlation.id", correlation_id or "unknown")
        
        response = requests.post(url, json=data, headers=headers)
        
        span.set_attribute("http.status_code", response.status_code)
        span.set_attribute("http.response_size", len(response.content))
        
        return response
\`\`\`

### Trace Analysis và Debugging:
\`\`\`javascript
// Frontend tracing với user journey tracking
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { ConsoleSpanExporter, BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';

// Configure web tracing
const provider = new WebTracerProvider({
  resource: new Resource({
    'service.name': 'web-frontend',
    'service.version': '1.0.0',
  }),
});

provider.addSpanProcessor(
  new BatchSpanProcessor(
    new JaegerExporter({
      endpoint: 'https://jaeger.company.com/api/traces',
    })
  )
);

// Register auto-instrumentations
registerInstrumentations({
  instrumentations: [
    new DocumentLoadInstrumentation(),
    new FetchInstrumentation({
      propagateTraceHeaderCorsUrls: [
        'https://api.company.com',
        'https://user-service.company.com',
      ],
      clearTimingResources: true,
    }),
    new XMLHttpRequestInstrumentation(),
    new UserInteractionInstrumentation({
      eventNames: ['click', 'submit', 'keydown'],
    }),
  ],
});

provider.register();

// Business journey tracing
const tracer = opentelemetry.trace.getTracer('user-journey');

class UserJourneyTracker {
  constructor() {
    this.sessionSpan = null;
    this.currentJourney = null;
  }
  
  startSession(userId) {
    this.sessionSpan = tracer.startSpan('user_session', {
      attributes: {
        'user.id': userId,
        'session.start_time': Date.now(),
        'user.agent': navigator.userAgent,
        'page.url': window.location.href,
      }
    });
    
    // Set session context
    this.sessionSpan.setAttributes({
      'browser.name': this.getBrowserName(),
      'device.type': this.getDeviceType(),
      'network.connection': navigator.connection?.effectiveType || 'unknown',
    });
  }
  
  startJourney(journeyType, journeyId) {
    this.currentJourney = tracer.startSpan(\`user_journey_\${journeyType}\`, {
      parent: this.sessionSpan,
      attributes: {
        'journey.type': journeyType,
        'journey.id': journeyId,
        'journey.start_time': Date.now(),
      }
    });
  }
  
  trackStep(stepName, stepData = {}) {
    if (!this.currentJourney) return;
    
    const stepSpan = tracer.startSpan(\`journey_step_\${stepName}\`, {
      parent: this.currentJourney,
      attributes: {
        'step.name': stepName,
        'step.timestamp': Date.now(),
        ...stepData
      }
    });
    
    // Track step completion
    setTimeout(() => stepSpan.end(), 100);
  }
  
  trackConversion(conversionType, value = null) {
    const conversionSpan = tracer.startSpan('conversion', {
      parent: this.currentJourney,
      attributes: {
        'conversion.type': conversionType,
        'conversion.value': value,
        'conversion.timestamp': Date.now(),
      }
    });
    
    conversionSpan.end();
  }
  
  trackError(error, context = {}) {
    const errorSpan = tracer.startSpan('user_error', {
      parent: this.currentJourney || this.sessionSpan,
      attributes: {
        'error.type': error.name,
        'error.message': error.message,
        'error.stack': error.stack,
        'page.url': window.location.href,
        ...context
      }
    });
    
    errorSpan.recordException(error);
    errorSpan.end();
  }
  
  getBrowserName() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'chrome';
    if (userAgent.includes('Firefox')) return 'firefox';
    if (userAgent.includes('Safari')) return 'safari';
    return 'unknown';
  }
  
  getDeviceType() {
    if (/Mobile|Android|iPhone|iPad/.test(navigator.userAgent)) {
      return 'mobile';
    }
    return 'desktop';
  }
}

// Usage
const journeyTracker = new UserJourneyTracker();

// Track e-commerce journey
journeyTracker.startSession('user-123');
journeyTracker.startJourney('purchase', 'journey-456');

journeyTracker.trackStep('product_view', {
  'product.id': 'prod-789',
  'product.category': 'electronics',
  'product.price': 299.99
});

journeyTracker.trackStep('add_to_cart', {
  'cart.item_count': 1,
  'cart.total_value': 299.99
});

journeyTracker.trackStep('checkout_start', {
  'checkout.payment_method': 'credit_card'
});

journeyTracker.trackConversion('purchase', 299.99);
\`\`\`

## 7. Intelligent Alerting và Incident Response

### Machine Learning-Based Anomaly Detection:
\`\`\`python
# Advanced anomaly detection với machine learning
import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
from prometheus_client.parser import text_string_to_metric_families
import requests
import json

class PrometheusAnomalyDetector:
    def __init__(self, prometheus_url, lookback_days=30):
        self.prometheus_url = prometheus_url
        self.lookback_days = lookback_days
        self.models = {}
        self.scalers = {}
        
    def fetch_metrics(self, query, hours=24):
        """Fetch time series data từ Prometheus"""
        end_time = time.time()
        start_time = end_time - (hours * 3600)
        
        params = {
            'query': query,
            'start': start_time,
            'end': end_time,
            'step': '60s'  # 1 minute resolution
        }
        
        response = requests.get(
            f"{self.prometheus_url}/api/v1/query_range",
            params=params
        )
        
        data = response.json()['data']['result']
        return self.parse_time_series(data)
    
    def parse_time_series(self, prometheus_data):
        """Convert Prometheus data to pandas DataFrame"""
        series_list = []
        
        for series in prometheus_data:
            labels = series['metric']
            values = series['values']
            
            df = pd.DataFrame(values, columns=['timestamp', 'value'])
            df['timestamp'] = pd.to_datetime(df['timestamp'], unit='s')
            df['value'] = df['value'].astype(float)
            
            # Add metric labels as columns
            for label, label_value in labels.items():
                df[label] = label_value
                
            series_list.append(df)
        
        if series_list:
            return pd.concat(series_list, ignore_index=True)
        return pd.DataFrame()
    
    def prepare_features(self, df):
        """Prepare features cho anomaly detection"""
        # Time-based features
        df['hour'] = df['timestamp'].dt.hour
        df['day_of_week'] = df['timestamp'].dt.dayofweek
        df['is_weekend'] = df['day_of_week'].isin([5, 6]).astype(int)
        
        # Rolling statistics
        df['value_rolling_mean_1h'] = df['value'].rolling(window=60).mean()
        df['value_rolling_std_1h'] = df['value'].rolling(window=60).std()
        df['value_rolling_mean_24h'] = df['value'].rolling(window=1440).mean()
        
        # Lag features
        df['value_lag_1'] = df['value'].shift(1)
        df['value_lag_60'] = df['value'].shift(60)  # 1 hour lag
        
        # Rate of change
        df['value_diff'] = df['value'].diff()
        df['value_pct_change'] = df['value'].pct_change()
        
        # Remove NaN values
        df = df.dropna()
        
        feature_columns = [
            'value', 'hour', 'day_of_week', 'is_weekend',
            'value_rolling_mean_1h', 'value_rolling_std_1h',
            'value_rolling_mean_24h', 'value_lag_1', 'value_lag_60',
            'value_diff', 'value_pct_change'
        ]
        
        return df[feature_columns]
    
    def train_anomaly_detector(self, metric_name, query):
        """Train anomaly detection model"""
        # Fetch historical data
        historical_data = self.fetch_metrics(query, hours=24 * self.lookback_days)
        
        if historical_data.empty:
            print(f"No data available for {metric_name}")
            return False
        
        # Prepare features
        features = self.prepare_features(historical_data)
        
        if features.empty:
            print(f"No features available for {metric_name}")
            return False
        
        # Scale features
        scaler = StandardScaler()
        scaled_features = scaler.fit_transform(features)
        
        # Train Isolation Forest
        model = IsolationForest(
            contamination=0.1,  # Expect 10% anomalies
            random_state=42,
            n_estimators=100
        )
        
        model.fit(scaled_features)
        
        # Store model và scaler
        self.models[metric_name] = model
        self.scalers[metric_name] = scaler
        
        print(f"Anomaly detector trained for {metric_name}")
        return True
    
    def detect_anomalies(self, metric_name, query, threshold=-0.5):
        """Detect anomalies trong real-time data"""
        if metric_name not in self.models:
            print(f"No model trained for {metric_name}")
            return []
        
        # Fetch recent data
        recent_data = self.fetch_metrics(query, hours=2)
        
        if recent_data.empty:
            return []
        
        # Prepare features
        features = self.prepare_features(recent_data)
        
        if features.empty:
            return []
        
        # Scale features
        scaled_features = self.scalers[metric_name].transform(features)
        
        # Predict anomalies
        anomaly_scores = self.models[metric_name].decision_function(scaled_features)
        is_anomaly = anomaly_scores < threshold
        
        # Return anomalies with context
        anomalies = []
        for idx, is_anom in enumerate(is_anomaly):
            if is_anom:
                anomalies.append({
                    'timestamp': recent_data.iloc[idx]['timestamp'],
                    'value': features.iloc[idx]['value'],
                    'anomaly_score': anomaly_scores[idx],
                    'metric': metric_name
                })
        
        return anomalies

# Intelligent alert routing
class IntelligentAlertRouter:
    def __init__(self):
        self.escalation_rules = {}
        self.team_schedules = {}
        self.alert_history = []
        
    def add_escalation_rule(self, service, rules):
        """Add escalation rules cho service"""
        self.escalation_rules[service] = rules
    
    def set_team_schedule(self, team, schedule):
        """Set on-call schedule cho team"""
        self.team_schedules[team] = schedule
    
    def route_alert(self, alert):
        """Route alert to appropriate team với intelligent escalation"""
        service = alert.get('service', 'unknown')
        severity = alert.get('severity', 'unknown')
        
        # Get routing rules
        rules = self.escalation_rules.get(service, {})
        
        # Determine primary team
        primary_team = rules.get('primary_team', 'ops')
        
        # Check if alert is duplicate
        if self.is_duplicate_alert(alert):
            return self.suppress_duplicate(alert)
        
        # Route based on severity và time
        current_hour = datetime.now().hour
        
        routing_decision = {
            'alert_id': alert['alert_id'],
            'primary_team': primary_team,
            'notification_channels': [],
            'escalation_schedule': []
        }
        
        if severity == 'critical':
            # Immediate notification
            routing_decision['notification_channels'] = [
                'slack-critical',
                'pagerduty',
                'sms'
            ]
            
            # Escalation schedule
            routing_decision['escalation_schedule'] = [
                {'time': 0, 'action': 'notify_primary'},
                {'time': 300, 'action': 'escalate_to_manager'},  # 5 minutes
                {'time': 900, 'action': 'escalate_to_director'}  # 15 minutes
            ]
            
        elif severity == 'high':
            routing_decision['notification_channels'] = ['slack-alerts']
            
            if 9 <= current_hour <= 17:  # Business hours
                routing_decision['escalation_schedule'] = [
                    {'time': 0, 'action': 'notify_primary'},
                    {'time': 1800, 'action': 'escalate_to_manager'}  # 30 minutes
                ]
            else:  # After hours
                routing_decision['escalation_schedule'] = [
                    {'time': 0, 'action': 'notify_oncall'},
                    {'time': 3600, 'action': 'escalate_to_manager'}  # 1 hour
                ]
        
        # Log routing decision
        self.alert_history.append({
            'timestamp': datetime.now(),
            'alert': alert,
            'routing': routing_decision
        })
        
        return routing_decision
    
    def is_duplicate_alert(self, alert):
        """Check if alert is duplicate"""
        # Look for similar alerts trong last 30 minutes
        cutoff_time = datetime.now() - timedelta(minutes=30)
        
        for hist_alert in self.alert_history:
            if hist_alert['timestamp'] < cutoff_time:
                continue
                
            if (hist_alert['alert']['service'] == alert['service'] and
                hist_alert['alert']['alert_name'] == alert['alert_name']):
                return True
        
        return False

# Usage
detector = PrometheusAnomalyDetector('http://prometheus.monitoring.svc:9090')
router = IntelligentAlertRouter()

# Train models
detector.train_anomaly_detector(
    'api_response_time',
    'histogram_quantile(0.95, http_request_duration_seconds_bucket{job="api"})'
)

detector.train_anomaly_detector(
    'error_rate',
    'rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m])'
)

# Setup routing rules
router.add_escalation_rule('user-api', {
    'primary_team': 'backend-team',
    'secondary_team': 'platform-team',
    'manager': 'engineering-manager'
})

# Detect anomalies
anomalies = detector.detect_anomalies(
    'api_response_time',
    'histogram_quantile(0.95, http_request_duration_seconds_bucket{job="api"})'
)

for anomaly in anomalies:
    alert = {
        'alert_id': f"anomaly-{int(time.time())}",
        'service': 'user-api',
        'alert_name': 'response_time_anomaly',
        'severity': 'high' if anomaly['anomaly_score'] < -0.7 else 'medium',
        'description': f"Response time anomaly detected: {anomaly['value']:.2f}s",
        'anomaly_score': anomaly['anomaly_score'],
        'timestamp': anomaly['timestamp']
    }
    
    routing = router.route_alert(alert)
    print(f"Alert routed: {routing}")
\`\`\`

## 8. Cost Optimization và Resource Management

### FinOps Integration:
\`\`\`python
# Advanced cost monitoring và optimization
import boto3
from datetime import datetime, timedelta
import pandas as pd

class CloudCostOptimizer:
    def __init__(self):
        self.cost_client = boto3.client('ce')  # Cost Explorer
        self.cloudwatch = boto3.client('cloudwatch')
        self.ec2 = boto3.client('ec2')
        self.optimization_rules = []
        
    def analyze_cost_trends(self, days=30):
        """Analyze cost trends và identify opportunities"""
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=days)
        
        # Get cost và usage data
        response = self.cost_client.get_cost_and_usage(
            TimePeriod={
                'Start': start_date.strftime('%Y-%m-%d'),
                'End': end_date.strftime('%Y-%m-%d')
            },
            Granularity='DAILY',
            Metrics=['BlendedCost', 'UnblendedCost', 'UsageQuantity'],
            GroupBy=[
                {'Type': 'DIMENSION', 'Key': 'SERVICE'},
                {'Type': 'DIMENSION', 'Key': 'INSTANCE_TYPE'}
            ]
        )
        
        # Process cost data
        cost_data = []
        for result in response['ResultsByTime']:
            for group in result['Groups']:
                cost_data.append({
                    'date': result['TimePeriod']['Start'],
                    'service': group['Keys'][0],
                    'instance_type': group['Keys'][1],
                    'cost': float(group['Metrics']['BlendedCost']['Amount']),
                    'usage': float(group['Metrics']['UsageQuantity']['Amount'])
                })
        
        df = pd.DataFrame(cost_data)
        return self.identify_optimization_opportunities(df)
    
    def identify_optimization_opportunities(self, cost_df):
        """Identify cost optimization opportunities"""
        opportunities = []
        
        # 1. Underutilized instances
        underutilized = self.find_underutilized_instances()
        for instance in underutilized:
            opportunities.append({
                'type': 'rightsizing',
                'resource': instance['instance_id'],
                'current_cost': instance['monthly_cost'],
                'potential_savings': instance['potential_savings'],
                'recommendation': instance['recommendation']
            })
        
        # 2. Reserved instance opportunities
        ri_opportunities = self.analyze_reserved_instance_opportunities(cost_df)
        opportunities.extend(ri_opportunities)
        
        # 3. Storage optimization
        storage_opportunities = self.analyze_storage_optimization()
        opportunities.extend(storage_opportunities)
        
        # 4. Unused resources
        unused_resources = self.find_unused_resources()
        opportunities.extend(unused_resources)
        
        return opportunities
    
    def find_underutilized_instances(self):
        """Find underutilized EC2 instances"""
        instances = []
        
        # Get all running instances
        ec2_response = self.ec2.describe_instances(
            Filters=[{'Name': 'instance-state-name', 'Values': ['running']}]
        )
        
        for reservation in ec2_response['Reservations']:
            for instance in reservation['Instances']:
                instance_id = instance['InstanceId']
                instance_type = instance['InstanceType']
                
                # Get CloudWatch metrics
                cpu_utilization = self.get_average_metric(
                    instance_id, 'AWS/EC2', 'CPUUtilization', days=30
                )
                
                network_in = self.get_average_metric(
                    instance_id, 'AWS/EC2', 'NetworkIn', days=30
                )
                
                # Determine if underutilized
                if cpu_utilization < 10 and network_in < 1000000:  # Low CPU và network
                    # Calculate cost
                    monthly_cost = self.calculate_instance_cost(instance_type)
                    
                    # Recommend smaller instance
                    recommended_type = self.recommend_instance_type(
                        instance_type, cpu_utilization
                    )
                    
                    potential_savings = monthly_cost * 0.5  # Estimate 50% savings
                    
                    instances.append({
                        'instance_id': instance_id,
                        'current_type': instance_type,
                        'cpu_utilization': cpu_utilization,
                        'monthly_cost': monthly_cost,
                        'recommended_type': recommended_type,
                        'potential_savings': potential_savings,
                        'recommendation': f"Resize from {instance_type} to {recommended_type}"
                    })
        
        return instances
    
    def get_average_metric(self, instance_id, namespace, metric_name, days=30):
        """Get average CloudWatch metric"""
        end_time = datetime.now()
        start_time = end_time - timedelta(days=days)
        
        response = self.cloudwatch.get_metric_statistics(
            Namespace=namespace,
            MetricName=metric_name,
            Dimensions=[
                {'Name': 'InstanceId', 'Value': instance_id}
            ],
            StartTime=start_time,
            EndTime=end_time,
            Period=3600,  # 1 hour
            Statistics=['Average']
        )
        
        if response['Datapoints']:
            return sum(dp['Average'] for dp in response['Datapoints']) / len(response['Datapoints'])
        return 0
    
    def setup_cost_alerts(self):
        """Setup cost monitoring alerts"""
        cost_alerts = [
            {
                'name': 'daily_cost_spike',
                'threshold': 1000,  # $1000/day
                'comparison': 'GreaterThanThreshold',
                'metric': 'EstimatedCharges'
            },
            {
                'name': 'monthly_budget_80_percent',
                'threshold': 8000,  # 80% of $10k budget
                'comparison': 'GreaterThanThreshold',
                'metric': 'EstimatedCharges'
            }
        ]
        
        for alert in cost_alerts:
            self.cloudwatch.put_metric_alarm(
                AlarmName=alert['name'],
                ComparisonOperator=alert['comparison'],
                EvaluationPeriods=1,
                MetricName=alert['metric'],
                Namespace='AWS/Billing',
                Period=86400,  # 24 hours
                Statistic='Maximum',
                Threshold=alert['threshold'],
                ActionsEnabled=True,
                AlarmActions=[
                    'arn:aws:sns:us-west-2:123456789012:cost-alerts'
                ],
                AlarmDescription=f"Cost alert: {alert['name']}",
                Dimensions=[
                    {'Name': 'Currency', 'Value': 'USD'}
                ]
            )

# Resource rightsizing recommendations
class ResourceRightsizer:
    def __init__(self):
        self.recommendations = []
        
    def analyze_kubernetes_resources(self):
        """Analyze Kubernetes resource usage"""
        # Get Prometheus metrics
        queries = {
            'cpu_usage': 'avg_over_time(rate(container_cpu_usage_seconds_total[5m])[7d:1h])',
            'memory_usage': 'avg_over_time(container_memory_working_set_bytes[7d:1h])',
            'cpu_requests': 'kube_pod_container_resource_requests{resource="cpu"}',
            'memory_requests': 'kube_pod_container_resource_requests{resource="memory"}'
        }
        
        # Calculate utilization ratios
        utilization_data = {}
        for metric, query in queries.items():
            data = self.query_prometheus(query)
            utilization_data[metric] = data
        
        # Generate recommendations
        for pod in self.get_pod_list():
            recommendation = self.generate_rightsizing_recommendation(
                pod, utilization_data
            )
            if recommendation:
                self.recommendations.append(recommendation)
        
        return self.recommendations
    
    def generate_rightsizing_recommendation(self, pod, utilization_data):
        """Generate rightsizing recommendation cho pod"""
        pod_name = pod['name']
        namespace = pod['namespace']
        
        # Get current resources
        current_cpu_request = pod.get('cpu_request', 0)
        current_memory_request = pod.get('memory_request', 0)
        
        # Get actual usage
        actual_cpu = utilization_data['cpu_usage'].get(pod_name, 0)
        actual_memory = utilization_data['memory_usage'].get(pod_name, 0)
        
        # Calculate utilization ratios
        cpu_utilization = actual_cpu / current_cpu_request if current_cpu_request > 0 else 0
        memory_utilization = actual_memory / current_memory_request if current_memory_request > 0 else 0
        
        # Generate recommendation
        recommendation = None
        
        if cpu_utilization < 0.2 and memory_utilization < 0.2:
            # Significant over-provisioning
            recommended_cpu = max(actual_cpu * 1.5, 0.1)  # 50% buffer, min 100m
            recommended_memory = max(actual_memory * 1.5, 128 * 1024 * 1024)  # 50% buffer, min 128Mi
            
            cost_savings = self.calculate_cost_savings(
                current_cpu_request, current_memory_request,
                recommended_cpu, recommended_memory
            )
            
            recommendation = {
                'pod': pod_name,
                'namespace': namespace,
                'type': 'downsize',
                'current_cpu': current_cpu_request,
                'current_memory': current_memory_request,
                'recommended_cpu': recommended_cpu,
                'recommended_memory': recommended_memory,
                'cpu_utilization': cpu_utilization * 100,
                'memory_utilization': memory_utilization * 100,
                'estimated_savings': cost_savings
            }
        
        elif cpu_utilization > 0.8 or memory_utilization > 0.8:
            # Under-provisioned
            recommended_cpu = actual_cpu * 1.3  # 30% buffer
            recommended_memory = actual_memory * 1.3
            
            recommendation = {
                'pod': pod_name,
                'namespace': namespace,
                'type': 'upsize',
                'current_cpu': current_cpu_request,
                'current_memory': current_memory_request,
                'recommended_cpu': recommended_cpu,
                'recommended_memory': recommended_memory,
                'cpu_utilization': cpu_utilization * 100,
                'memory_utilization': memory_utilization * 100,
                'risk': 'performance_degradation'
            }
        
        return recommendation

# Usage
cost_optimizer = CloudCostOptimizer()
rightsizer = ResourceRightsizer()

# Analyze costs
opportunities = cost_optimizer.analyze_cost_trends()
print(f"Found {len(opportunities)} cost optimization opportunities")

# Setup cost alerts
cost_optimizer.setup_cost_alerts()

# Analyze Kubernetes resources
k8s_recommendations = rightsizer.analyze_kubernetes_resources()
print(f"Generated {len(k8s_recommendations)} rightsizing recommendations")
\`\`\`

## Kết luận

Monitoring và Observability Stack implementation represents critical foundation cho modern cloud-native operations và enterprise system reliability. Comprehensive monitoring strategy combining metrics, logs, traces, và advanced analytics enables organizations achieve unprecedented operational excellence và business resilience.

### Strategic Business Impact:

**Operational Transformation:**
- **Mean Time to Detection (MTTD)**: Advanced monitoring reduces incident detection từ hours xuống seconds
- **Mean Time to Resolution (MTTR)**: Comprehensive observability decreases resolution time by 70-80%
- **System Availability**: Proactive monitoring achieves 99.9%+ uptime với automated incident response
- **Performance Optimization**: Real-time insights enable continuous performance tuning

**Financial Benefits:**
- **Cost Optimization**: Intelligent resource monitoring reduces infrastructure costs 30-40%
- **Revenue Protection**: Early issue detection prevents revenue-impacting outages
- **Operational Efficiency**: Automated monitoring reduces manual operations overhead 60-70%
- **Compliance Assurance**: Comprehensive audit trails ensure regulatory compliance

### Advanced Implementation Excellence:

**Multi-Dimensional Observability:**
- **Infrastructure Monitoring**: Prometheus + Grafana providing comprehensive metric collection và visualization
- **Application Performance**: Distributed tracing với OpenTelemetry enabling end-to-end request analysis
- **Log Management**: ELK Stack processing millions of log events với real-time analysis
- **Business Metrics**: Custom KPI tracking aligning technical metrics với business outcomes

**Intelligent Operations:**
- **Machine Learning Integration**: Anomaly detection reducing false positives by 85%
- **Predictive Analytics**: Trend analysis enabling proactive capacity planning
- **Automated Remediation**: Self-healing systems responding to incidents without human intervention
- **Context-Aware Alerting**: Intelligent routing reducing alert fatigue và improving response times

**Enterprise Integration Patterns:**
- **Multi-Cloud Monitoring**: Unified observability across AWS, Azure, GCP platforms
- **Security Integration**: SIEM integration với security event correlation
- **CI/CD Pipeline Monitoring**: Development lifecycle visibility from code commit to production
- **Cost Management**: FinOps integration với resource optimization recommendations

### Production-Ready Capabilities:

**Scalable Architecture:**
- **High Availability Setup**: Multi-region monitoring infrastructure với disaster recovery
- **Performance Optimization**: Query optimization supporting millions of metrics per second
- **Storage Management**: Time-series data retention policies balancing cost với compliance
- **Federation**: Multi-cluster monitoring với centralized dashboards

**Security-First Approach:**
- **Access Control**: RBAC implementation với principle of least privilege
- **Data Encryption**: End-to-end encryption cho sensitive monitoring data
- **Audit Logging**: Comprehensive audit trails cho all monitoring activities
- **Compliance Integration**: SOC2, PCI-DSS alignment với automated compliance reporting

**Advanced Analytics:**
- **SLI/SLO Management**: Service Level Objectives với error budget tracking
- **Capacity Planning**: Predictive modeling cho resource requirements
- **Root Cause Analysis**: Automated correlation identifying incident causes
- **Performance Baselining**: Dynamic thresholds adapting to application behavior patterns

### Innovation Leadership:

**Emerging Technologies:**
- **AIOps Integration**: Artificial Intelligence cho Operations automating complex decision-making
- **Edge Monitoring**: Distributed monitoring cho IoT và edge computing environments
- **Serverless Observability**: Specialized monitoring cho event-driven architectures
- **Quantum-Ready Monitoring**: Future-proof observability designs

**Advanced Patterns:**
- **Chaos Engineering**: Monitoring system resilience trong failure scenarios
- **Observability as Code**: Infrastructure-as-Code principles applied to monitoring configurations
- **Real-User Monitoring**: Client-side performance tracking với user experience correlation
- **Synthetic Monitoring**: Proactive testing simulating user journeys

### Implementation Roadmap:

**Phase 1: Foundation (Months 1-2)**
- Core Prometheus + Grafana deployment
- Basic log aggregation với ELK Stack
- Essential alerting rules establishment
- Team training và documentation

**Phase 2: Enhancement (Months 3-4)**
- Distributed tracing implementation
- Custom metrics development
- Advanced dashboard creation
- Incident response automation

**Phase 3: Intelligence (Months 5-6)**
- Machine learning integration
- Predictive analytics deployment
- Cost optimization automation
- Advanced security monitoring

**Phase 4: Excellence (Ongoing)**
- Continuous optimization
- Emerging technology adoption
- Cross-team collaboration enhancement
- Industry best practices leadership

### Success Metrics:

**Technical Excellence:**
- System availability: >99.9% uptime achievement
- Incident response: <5 minute MTTD, <30 minute MTTR
- Performance optimization: 40-60% response time improvement
- Cost efficiency: 30-40% infrastructure cost reduction

**Business Outcomes:**
- Customer satisfaction: Improved user experience scores
- Development velocity: 50-70% faster feature delivery
- Operational efficiency: 60-80% reduction trong manual operations
- Revenue protection: Zero revenue-impacting unplanned outages

**Organizational Impact:**
- Team productivity: Developers focus on features rather than operational issues
- Data-driven decisions: Real-time business insights driving strategic decisions
- Competitive advantage: Superior system reliability creating market differentiation
- Innovation acceleration: Reliable infrastructure enabling rapid experimentation

Modern enterprises require sophisticated observability capabilities combining technical monitoring với business intelligence. Organizations mastering comprehensive monitoring achieve operational excellence, cost efficiency, customer satisfaction essential for competitive success.

Investment trong advanced monitoring và observability infrastructure provides foundational capabilities supporting business agility, system reliability, operational efficiency critical for sustained growth trong rapidly evolving digital landscape. Companies implementing comprehensive observability strategies position themselves for technological leadership, market success, continued innovation trong increasingly complex cloud-native ecosystems.

The future belongs to organizations achieving monitoring excellence through intelligent automation, predictive analytics, proactive operations enabling rapid adaptation, consistent reliability, continuous improvement essential for long-term prosperity trong data-driven economy.`,
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

## 3. Advanced Service Mesh Architecture

### Istio Service Mesh Implementation:
\`\`\`yaml
# Comprehensive Istio configuration
apiVersion: install.istio.io/v1alpha1
kind: IstioOperator
metadata:
  name: production-istio
spec:
  values:
    global:
      meshID: mesh1
      network: network1
      proxy:
        privileged: false
        enableCoreDump: false
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 2000m
            memory: 1024Mi
      defaultResources:
        requests:
          cpu: 100m
          memory: 128Mi
        limits:
          cpu: 2000m
          memory: 1024Mi
  components:
    pilot:
      k8s:
        resources:
          requests:
            cpu: 500m
            memory: 2048Mi
          limits:
            cpu: 1000m
            memory: 4096Mi
        hpaSpec:
          maxReplicas: 10
          minReplicas: 2
          scaleTargetRef:
            apiVersion: apps/v1
            kind: Deployment
            name: istiod
          metrics:
          - type: Resource
            resource:
              name: cpu
              target:
                type: Utilization
                averageUtilization: 80
    ingressGateways:
    - name: istio-ingressgateway
      enabled: true
      k8s:
        resources:
          requests:
            cpu: 1000m
            memory: 1024Mi
          limits:
            cpu: 2000m
            memory: 2048Mi
        hpaSpec:
          maxReplicas: 10
          minReplicas: 3
        service:
          type: LoadBalancer
          ports:
          - port: 15021
            targetPort: 15021
            name: status-port
          - port: 80
            targetPort: 8080
            name: http2
          - port: 443
            targetPort: 8443
            name: https

---
# Advanced traffic management
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: advanced-user-service
spec:
  hosts:
  - user-service
  http:
  # Canary deployment
  - match:
    - headers:
        canary:
          exact: "true"
    route:
    - destination:
        host: user-service
        subset: v2
      weight: 100
    fault:
      delay:
        percentage:
          value: 0.1
        fixedDelay: 5s
    retries:
      attempts: 3
      perTryTimeout: 2s
      retryOn: gateway-error,connect-failure,refused-stream
  
  # A/B testing
  - match:
    - headers:
        experiment:
          exact: "feature-a"
    route:
    - destination:
        host: user-service
        subset: feature-a
      weight: 100
    mirror:
      host: analytics-service
  
  # Production traffic với advanced routing
  - route:
    - destination:
        host: user-service
        subset: v1
      weight: 90
    - destination:
        host: user-service
        subset: v2
      weight: 10
    timeout: 30s
    retries:
      attempts: 3
      perTryTimeout: 10s
      retryOn: 5xx,reset,connect-failure,refused-stream

---
# Service-level configurations
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: user-service-circuit-breaker
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
  - name: feature-a
    labels:
      feature: feature-a

---
# Security policies
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: user-service-authz
spec:
  selector:
    matchLabels:
      app: user-service
  rules:
  - from:
    - source:
        principals: ["cluster.local/ns/default/sa/api-gateway"]
    to:
    - operation:
        methods: ["GET", "POST", "PUT"]
        paths: ["/api/users/*"]
    when:
    - key: request.headers[authorization]
      values: ["Bearer *"]

---
# Observability configuration
apiVersion: telemetry.istio.io/v1alpha1
kind: Telemetry
metadata:
  name: user-service-metrics
spec:
  metrics:
  - providers:
    - name: prometheus
  - overrides:
    - match:
        metric: ALL_METRICS
      tagOverrides:
        request_id:
          value: "%{REQUEST_ID}"
        user_id:
          value: "%{DYNAMIC_METADATA('envoy.filters.http.wasm:user_id')}"
  accessLogging:
  - providers:
    - name: otel
  tracing:
  - providers:
    - name: jaeger
\`\`\`

### Advanced Load Balancing và Service Discovery:
\`\`\`python
# Intelligent service discovery với health checking
import asyncio
import aiohttp
import json
from datetime import datetime, timedelta
import random
import time

class AdvancedServiceRegistry:
    def __init__(self):
        self.services = {}
        self.health_check_interval = 30  # seconds
        self.circuit_breakers = {}
        self.load_balancer = IntelligentLoadBalancer()
        
    async def register_service(self, service_info):
        """Register new service instance"""
        service_name = service_info['name']
        instance_id = service_info['instance_id']
        
        if service_name not in self.services:
            self.services[service_name] = {}
        
        self.services[service_name][instance_id] = {
            'endpoint': service_info['endpoint'],
            'health_check_url': service_info.get('health_check_url', f"{service_info['endpoint']}/health"),
            'metadata': service_info.get('metadata', {}),
            'registered_at': datetime.now(),
            'last_health_check': None,
            'health_status': 'unknown',
            'consecutive_failures': 0,
            'response_times': [],
            'load_score': 0
        }
        
        # Start health checking
        asyncio.create_task(self.health_check_service(service_name, instance_id))
        
        return True
    
    async def discover_service(self, service_name, request_context=None):
        """Intelligent service discovery với load balancing"""
        if service_name not in self.services:
            return None
        
        healthy_instances = [
            (instance_id, instance_info)
            for instance_id, instance_info in self.services[service_name].items()
            if instance_info['health_status'] == 'healthy'
        ]
        
        if not healthy_instances:
            # Fallback to degraded instances if no healthy ones
            degraded_instances = [
                (instance_id, instance_info)
                for instance_id, instance_info in self.services[service_name].items()
                if instance_info['health_status'] == 'degraded'
            ]
            if degraded_instances:
                healthy_instances = degraded_instances
        
        if not healthy_instances:
            return None
        
        # Select best instance using load balancer
        selected_instance = self.load_balancer.select_instance(
            healthy_instances, request_context
        )
        
        return selected_instance[1]['endpoint']
    
    async def health_check_service(self, service_name, instance_id):
        """Continuous health checking với detailed metrics"""
        while True:
            try:
                instance_info = self.services[service_name][instance_id]
                health_url = instance_info['health_check_url']
                
                start_time = time.time()
                
                async with aiohttp.ClientSession() as session:
                    async with session.get(health_url, timeout=aiohttp.ClientTimeout(total=5)) as response:
                        response_time = (time.time() - start_time) * 1000  # ms
                        
                        # Update response times
                        instance_info['response_times'].append(response_time)
                        if len(instance_info['response_times']) > 100:
                            instance_info['response_times'].pop(0)
                        
                        # Determine health status
                        if response.status == 200:
                            instance_info['consecutive_failures'] = 0
                            
                            # Calculate health score based on response time
                            avg_response_time = sum(instance_info['response_times']) / len(instance_info['response_times'])
                            
                            if avg_response_time < 100:  # < 100ms
                                instance_info['health_status'] = 'healthy'
                            elif avg_response_time < 500:  # < 500ms
                                instance_info['health_status'] = 'degraded'
                            else:
                                instance_info['health_status'] = 'unhealthy'
                                
                        else:
                            instance_info['consecutive_failures'] += 1
                            if instance_info['consecutive_failures'] >= 3:
                                instance_info['health_status'] = 'unhealthy'
                            else:
                                instance_info['health_status'] = 'degraded'
                
                instance_info['last_health_check'] = datetime.now()
                
            except Exception as e:
                instance_info['consecutive_failures'] += 1
                if instance_info['consecutive_failures'] >= 5:
                    instance_info['health_status'] = 'unhealthy'
                else:
                    instance_info['health_status'] = 'degraded'
                
                print(f"Health check failed cho {service_name}/{instance_id}: {e}")
            
            await asyncio.sleep(self.health_check_interval)

class IntelligentLoadBalancer:
    def __init__(self):
        self.algorithms = {
            'round_robin': self.round_robin,
            'weighted_response_time': self.weighted_response_time,
            'least_connections': self.least_connections,
            'geographic': self.geographic_proximity,
            'adaptive': self.adaptive_selection
        }
        self.current_selection = {}
    
    def select_instance(self, instances, request_context=None):
        """Select best instance based on multiple factors"""
        if not instances:
            return None
        
        if len(instances) == 1:
            return instances[0]
        
        # Default to adaptive selection
        algorithm = 'adaptive'
        
        if request_context:
            # Override based on request context
            if 'load_balancing_algorithm' in request_context:
                algorithm = request_context['load_balancing_algorithm']
        
        return self.algorithms[algorithm](instances, request_context)
    
    def round_robin(self, instances, request_context=None):
        """Simple round-robin selection"""
        service_name = instances[0][1].get('name', 'unknown')
        
        if service_name not in self.current_selection:
            self.current_selection[service_name] = 0
        
        index = self.current_selection[service_name] % len(instances)
        self.current_selection[service_name] += 1
        
        return instances[index]
    
    def weighted_response_time(self, instances, request_context=None):
        """Select based on response time performance"""
        weights = []
        
        for instance_id, instance_info in instances:
            response_times = instance_info.get('response_times', [100])
            avg_response_time = sum(response_times) / len(response_times)
            
            # Lower response time = higher weight
            weight = 1000 / (avg_response_time + 1)
            weights.append(weight)
        
        # Weighted random selection
        total_weight = sum(weights)
        random_value = random.uniform(0, total_weight)
        
        cumulative_weight = 0
        for i, weight in enumerate(weights):
            cumulative_weight += weight
            if random_value <= cumulative_weight:
                return instances[i]
        
        return instances[0]  # Fallback
    
    def adaptive_selection(self, instances, request_context=None):
        """Adaptive selection based on multiple metrics"""
        scores = []
        
        for instance_id, instance_info in instances:
            score = self.calculate_instance_score(instance_info, request_context)
            scores.append((score, (instance_id, instance_info)))
        
        # Sort by score (higher is better)
        scores.sort(key=lambda x: x[0], reverse=True)
        
        # Weighted selection favoring higher scores
        total_score = sum(score for score, _ in scores)
        if total_score == 0:
            return random.choice(instances)
        
        random_value = random.uniform(0, total_score)
        cumulative_score = 0
        
        for score, instance in scores:
            cumulative_score += score
            if random_value <= cumulative_score:
                return instance
        
        return scores[0][1]  # Return highest scored instance
    
    def calculate_instance_score(self, instance_info, request_context):
        """Calculate composite score cho instance"""
        score = 100  # Base score
        
        # Response time factor (lower is better)
        response_times = instance_info.get('response_times', [100])
        if response_times:
            avg_response_time = sum(response_times) / len(response_times)
            response_score = max(0, 100 - (avg_response_time / 10))
            score += response_score * 0.4
        
        # Health status factor
        health_status = instance_info.get('health_status', 'unknown')
        health_scores = {'healthy': 100, 'degraded': 50, 'unhealthy': 0, 'unknown': 25}
        score += health_scores.get(health_status, 0) * 0.3
        
        # Load factor (if available)
        load_score = instance_info.get('load_score', 50)
        score += (100 - load_score) * 0.2  # Lower load is better
        
        # Geographic proximity (if request context available)
        if request_context and 'client_region' in request_context:
            instance_region = instance_info.get('metadata', {}).get('region')
            client_region = request_context['client_region']
            
            if instance_region == client_region:
                score += 20  # Regional bonus
            elif instance_region and client_region:
                # Cross-region penalty
                score -= 10
        
        return max(0, score)

# Service mesh traffic splitting
class TrafficSplitter:
    def __init__(self):
        self.split_configs = {}
        
    def configure_split(self, service_name, split_config):
        """Configure traffic splitting cho service"""
        self.split_configs[service_name] = {
            'splits': split_config['splits'],
            'criteria': split_config.get('criteria', {}),
            'created_at': datetime.now()
        }
    
    def route_request(self, service_name, request_context):
        """Route request based on traffic splitting rules"""
        if service_name not in self.split_configs:
            return 'primary'
        
        config = self.split_configs[service_name]
        
        # Check criteria-based routing
        for criterion, criterion_config in config['criteria'].items():
            if criterion == 'header':
                header_name = criterion_config['name']
                header_value = request_context.get('headers', {}).get(header_name)
                
                if header_value in criterion_config.get('values', []):
                    return criterion_config['target']
            
            elif criterion == 'user_segment':
                user_id = request_context.get('user_id')
                if user_id:
                    # Simple hash-based segmentation
                    segment = hash(user_id) % 100
                    
                    for segment_config in criterion_config.get('segments', []):
                        if segment_config['start'] <= segment <= segment_config['end']:
                            return segment_config['target']
        
        # Default to percentage-based splitting
        random_value = random.randint(1, 100)
        cumulative_percentage = 0
        
        for split in config['splits']:
            cumulative_percentage += split['percentage']
            if random_value <= cumulative_percentage:
                return split['target']
        
        return 'primary'  # Fallback

# Usage example
async def main():
    registry = AdvancedServiceRegistry()
    
    # Register services
    await registry.register_service({
        'name': 'user-service',
        'instance_id': 'user-service-1',
        'endpoint': 'http://user-service-1:8080',
        'metadata': {'region': 'us-west-2', 'version': 'v1.2.0'}
    })
    
    await registry.register_service({
        'name': 'user-service',
        'instance_id': 'user-service-2',
        'endpoint': 'http://user-service-2:8080',
        'metadata': {'region': 'us-east-1', 'version': 'v1.2.0'}
    })
    
    # Configure traffic splitting
    splitter = TrafficSplitter()
    splitter.configure_split('user-service', {
        'splits': [
            {'target': 'v1', 'percentage': 90},
            {'target': 'v2', 'percentage': 10}
        ],
        'criteria': {
            'header': {
                'name': 'X-Version',
                'values': ['v2'],
                'target': 'v2'
            }
        }
    })
    
    # Service discovery
    request_context = {
        'client_region': 'us-west-2',
        'headers': {'X-Version': 'v1'}
    }
    
    endpoint = await registry.discover_service('user-service', request_context)
    print(f"Selected endpoint: {endpoint}")

if __name__ == "__main__":
    asyncio.run(main())
\`\`\`

## 4. Data Management Patterns

### Database per Service Pattern:
\`\`\`yaml
# PostgreSQL cho User Service
apiVersion: postgresql.cnpg.io/v1
kind: Cluster
metadata:
  name: user-service-db
  namespace: user-service
spec:
  instances: 3
  
  postgresql:
    parameters:
      max_connections: "200"
      shared_buffers: "256MB"
      effective_cache_size: "1GB"
      maintenance_work_mem: "64MB"
      checkpoint_completion_target: "0.9"
      wal_buffers: "16MB"
      default_statistics_target: "100"
      random_page_cost: "1.1"
      effective_io_concurrency: "200"
    
  bootstrap:
    initdb:
      database: userdb
      owner: userapp
      secret:
        name: user-db-credentials
  
  storage:
    size: 100Gi
    storageClass: fast-ssd
  
  monitoring:
    enabled: true
    
  backup:
    retention: "30d"
    barmanObjectStore:
      destinationPath: "s3://backup-bucket/user-service-db"
      s3Credentials:
        accessKeyId:
          name: backup-credentials
          key: ACCESS_KEY_ID
        secretAccessKey:
          name: backup-credentials
          key: SECRET_ACCESS_KEY
      wal:
        retention: "7d"

---
# MongoDB cho Order Service (document-based data)
apiVersion: mongodbcommunity.mongodb.com/v1
kind: MongoDBCommunity
metadata:
  name: order-service-db
  namespace: order-service
spec:
  members: 3
  type: ReplicaSet
  version: "6.0.5"
  
  security:
    authentication:
      modes: ["SCRAM"]
    tls:
      enabled: true
      certificateKeySecretRef:
        name: order-db-tls
      caConfigMapRef:
        name: order-db-ca
  
  users:
  - name: orderapp
    db: orderdb
    passwordSecretRef:
      name: order-db-credentials
    roles:
    - name: readWrite
      db: orderdb
    - name: dbAdmin
      db: orderdb
  
  additionalMongodConfig:
    storage.wiredTiger.engineConfig.journalCompressor: zlib
    storage.wiredTiger.collectionConfig.blockCompressor: snappy
    net.maxIncomingConnections: 1000

---
# Redis cho Caching Service
apiVersion: redis.redis.opstreelabs.in/v1beta1
kind: Redis
metadata:
  name: cache-service
  namespace: cache
spec:
  kubernetesConfig:
    image: redis:7.0.8
    imagePullPolicy: IfNotPresent
    resources:
      requests:
        cpu: 500m
        memory: 1Gi
      limits:
        cpu: 1
        memory: 2Gi
    serviceType: ClusterIP
  
  redisExporter:
    enabled: true
    image: quay.io/oliver006/redis_exporter:latest
  
  redisConfig:
    additionalRedisConfig: |
      maxmemory 1.5gb
      maxmemory-policy allkeys-lru
      save 900 1
      save 300 10
      save 60 10000
      tcp-keepalive 300
      tcp-backlog 511
      timeout 0
      databases 16
\`\`\`

### Data Consistency Patterns:
\`\`\`python
# Saga pattern implementation với compensating transactions
import asyncio
import json
from enum import Enum
from dataclasses import dataclass
from typing import List, Dict, Any, Optional
import uuid
from datetime import datetime

class SagaStepStatus(Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    COMPENSATED = "compensated"

@dataclass
class SagaStep:
    step_id: str
    service_name: str
    action: str
    payload: Dict[str, Any]
    compensation_action: str
    compensation_payload: Dict[str, Any]
    status: SagaStepStatus = SagaStepStatus.PENDING
    retry_count: int = 0
    max_retries: int = 3
    executed_at: Optional[datetime] = None
    compensated_at: Optional[datetime] = None

class SagaOrchestrator:
    def __init__(self):
        self.service_clients = {}
        self.saga_store = SagaStore()
        
    async def execute_saga(self, saga_id: str, steps: List[SagaStep]) -> Dict[str, Any]:
        """Execute saga với automatic compensation on failure"""
        
        # Store saga state
        await self.saga_store.save_saga(saga_id, {
            'steps': [step.__dict__ for step in steps],
            'status': 'in_progress',
            'created_at': datetime.now().isoformat()
        })
        
        executed_steps = []
        
        try:
            # Execute steps sequentially
            for step in steps:
                result = await self.execute_step(saga_id, step)
                
                if result['success']:
                    step.status = SagaStepStatus.COMPLETED
                    step.executed_at = datetime.now()
                    executed_steps.append(step)
                    
                    # Update saga state
                    await self.saga_store.update_step(saga_id, step)
                else:
                    step.status = SagaStepStatus.FAILED
                    
                    # Compensate all executed steps
                    await self.compensate_saga(saga_id, executed_steps)
                    
                    return {
                        'success': False,
                        'error': result.get('error', 'Step execution failed'),
                        'failed_step': step.step_id
                    }
            
            # All steps completed successfully
            await self.saga_store.update_saga_status(saga_id, 'completed')
            
            return {
                'success': True,
                'saga_id': saga_id,
                'completed_steps': len(executed_steps)
            }
            
        except Exception as e:
            # Compensate on unexpected error
            await self.compensate_saga(saga_id, executed_steps)
            await self.saga_store.update_saga_status(saga_id, 'failed')
            
            return {
                'success': False,
                'error': str(e),
                'saga_id': saga_id
            }
    
    async def execute_step(self, saga_id: str, step: SagaStep) -> Dict[str, Any]:
        """Execute individual saga step với retry logic"""
        
        for attempt in range(step.max_retries + 1):
            try:
                client = self.service_clients.get(step.service_name)
                if not client:
                    return {'success': False, 'error': f'Service client not found: {step.service_name}'}
                
                # Execute step action
                result = await client.execute_action(step.action, step.payload)
                
                if result.get('success', False):
                    return result
                else:
                    # Retry if not on last attempt
                    if attempt < step.max_retries:
                        step.retry_count += 1
                        await asyncio.sleep(2 ** attempt)  # Exponential backoff
                        continue
                    else:
                        return result
                        
            except Exception as e:
                if attempt < step.max_retries:
                    step.retry_count += 1
                    await asyncio.sleep(2 ** attempt)
                    continue
                else:
                    return {'success': False, 'error': str(e)}
        
        return {'success': False, 'error': 'Max retries exceeded'}
    
    async def compensate_saga(self, saga_id: str, executed_steps: List[SagaStep]):
        """Execute compensation actions trong reverse order"""
        
        # Compensate trong reverse order
        for step in reversed(executed_steps):
            if step.status == SagaStepStatus.COMPLETED:
                try:
                    client = self.service_clients.get(step.service_name)
                    if client:
                        result = await client.execute_action(
                            step.compensation_action,
                            step.compensation_payload
                        )
                        
                        if result.get('success', False):
                            step.status = SagaStepStatus.COMPENSATED
                            step.compensated_at = datetime.now()
                        else:
                            print(f"Compensation failed cho step {step.step_id}: {result}")
                    
                    # Update step status
                    await self.saga_store.update_step(saga_id, step)
                    
                except Exception as e:
                    print(f"Compensation error cho step {step.step_id}: {e}")

# Event Sourcing pattern
class EventStore:
    def __init__(self):
        self.events = {}
        self.snapshots = {}
    
    async def append_event(self, aggregate_id: str, event: Dict[str, Any]) -> bool:
        """Append event to event stream"""
        if aggregate_id not in self.events:
            self.events[aggregate_id] = []
        
        event['event_id'] = str(uuid.uuid4())
        event['timestamp'] = datetime.now().isoformat()
        event['version'] = len(self.events[aggregate_id]) + 1
        
        self.events[aggregate_id].append(event)
        return True
    
    async def get_events(self, aggregate_id: str, from_version: int = 0) -> List[Dict[str, Any]]:
        """Get events từ specific version"""
        events = self.events.get(aggregate_id, [])
        return [event for event in events if event['version'] > from_version]
    
    async def create_snapshot(self, aggregate_id: str, state: Dict[str, Any], version: int):
        """Create snapshot cho performance optimization"""
        self.snapshots[aggregate_id] = {
            'state': state,
            'version': version,
            'created_at': datetime.now().isoformat()
        }

class OrderAggregate:
    def __init__(self, order_id: str, event_store: EventStore):
        self.order_id = order_id
        self.event_store = event_store
        self.state = {
            'status': 'new',
            'items': [],
            'total_amount': 0,
            'customer_id': None,
            'payment_status': 'pending'
        }
        self.version = 0
        self.uncommitted_events = []
    
    async def load_from_history(self):
        """Load aggregate từ event history"""
        # Try to load từ snapshot first
        snapshot = await self.event_store.get_snapshot(self.order_id)
        if snapshot:
            self.state = snapshot['state']
            self.version = snapshot['version']
            from_version = snapshot['version']
        else:
            from_version = 0
        
        # Load events since snapshot
        events = await self.event_store.get_events(self.order_id, from_version)
        
        for event in events:
            self.apply_event(event)
            self.version = event['version']
    
    def apply_event(self, event: Dict[str, Any]):
        """Apply event to aggregate state"""
        event_type = event['event_type']
        data = event['data']
        
        if event_type == 'OrderCreated':
            self.state['customer_id'] = data['customer_id']
            self.state['status'] = 'created'
        
        elif event_type == 'ItemAdded':
            self.state['items'].append(data['item'])
            self.state['total_amount'] += data['item']['price'] * data['item']['quantity']
        
        elif event_type == 'PaymentProcessed':
            self.state['payment_status'] = 'completed'
            self.state['status'] = 'paid'
        
        elif event_type == 'OrderShipped':
            self.state['status'] = 'shipped'
        
        elif event_type == 'OrderCancelled':
            self.state['status'] = 'cancelled'
    
    async def create_order(self, customer_id: str):
        """Command: Create order"""
        if self.state['status'] != 'new':
            raise Exception("Order already created")
        
        event = {
            'event_type': 'OrderCreated',
            'data': {'customer_id': customer_id}
        }
        
        self.uncommitted_events.append(event)
        self.apply_event(event)
    
    async def add_item(self, item: Dict[str, Any]):
        """Command: Add item to order"""
        if self.state['status'] not in ['created', 'new']:
            raise Exception("Cannot add items to this order")
        
        event = {
            'event_type': 'ItemAdded',
            'data': {'item': item}
        }
        
        self.uncommitted_events.append(event)
        self.apply_event(event)
    
    async def save_changes(self):
        """Save uncommitted events"""
        for event in self.uncommitted_events:
            await self.event_store.append_event(self.order_id, event)
        
        self.uncommitted_events = []
        
        # Create snapshot periodically
        if self.version % 10 == 0:  # Every 10 events
            await self.event_store.create_snapshot(
                self.order_id, 
                self.state.copy(), 
                self.version
            )

# CQRS pattern implementation
class CommandHandler:
    def __init__(self, event_store: EventStore):
        self.event_store = event_store
    
    async def handle_create_order(self, command: Dict[str, Any]) -> Dict[str, Any]:
        """Handle CreateOrder command"""
        order_id = str(uuid.uuid4())
        order = OrderAggregate(order_id, self.event_store)
        
        await order.create_order(command['customer_id'])
        
        for item in command.get('items', []):
            await order.add_item(item)
        
        await order.save_changes()
        
        return {
            'success': True,
            'order_id': order_id,
            'total_amount': order.state['total_amount']
        }

class QueryHandler:
    def __init__(self, read_model_store):
        self.read_model_store = read_model_store
    
    async def get_order_summary(self, order_id: str) -> Dict[str, Any]:
        """Get optimized order summary"""
        return await self.read_model_store.get_order_summary(order_id)
    
    async def get_customer_orders(self, customer_id: str) -> List[Dict[str, Any]]:
        """Get all orders cho customer"""
        return await self.read_model_store.get_orders_by_customer(customer_id)

# Usage example
async def main():
    event_store = EventStore()
    
    # Execute saga
    orchestrator = SagaOrchestrator()
    
    order_saga_steps = [
        SagaStep(
            step_id="validate_payment",
            service_name="payment_service",
            action="validate_payment_method",
            payload={"customer_id": "cust_123", "amount": 100.00},
            compensation_action="release_payment_hold",
            compensation_payload={"customer_id": "cust_123"}
        ),
        SagaStep(
            step_id="reserve_inventory",
            service_name="inventory_service",
            action="reserve_items",
            payload={"items": [{"sku": "ITEM_001", "quantity": 2}]},
            compensation_action="release_reservation",
            compensation_payload={"items": [{"sku": "ITEM_001", "quantity": 2}]}
        ),
        SagaStep(
            step_id="create_order",
            service_name="order_service",
            action="create_order",
            payload={"customer_id": "cust_123", "items": [{"sku": "ITEM_001", "quantity": 2}]},
            compensation_action="cancel_order",
            compensation_payload={"order_id": "ORDER_TO_BE_SET"}
        )
    ]
    
    saga_id = str(uuid.uuid4())
    result = await orchestrator.execute_saga(saga_id, order_saga_steps)
    
    print(f"Saga result: {result}")

if __name__ == "__main__":
    asyncio.run(main())
\`\`\`

## 5. Advanced Monitoring và Observability

### Distributed Tracing Integration:
\`\`\`python
# Enhanced microservices monitoring
import opentelemetry
from opentelemetry import trace, metrics
from opentelemetry.exporter.jaeger.thrift import JaegerExporter
from opentelemetry.instrumentation.auto_instrumentation import sitecustomize
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.sdk.resources import Resource
import asyncio
import time
import json

class MicroservicesObservability:
    def __init__(self, service_name: str):
        self.service_name = service_name
        self.setup_tracing()
        self.setup_metrics()
        
    def setup_tracing(self):
        """Setup distributed tracing"""
        resource = Resource.create({
            "service.name": self.service_name,
            "service.version": "1.0.0",
            "deployment.environment": "production"
        })
        
        trace.set_tracer_provider(TracerProvider(resource=resource))
        
        jaeger_exporter = JaegerExporter(
            agent_host_name="jaeger-agent",
            agent_port=6831,
        )
        
        span_processor = BatchSpanProcessor(jaeger_exporter)
        trace.get_tracer_provider().add_span_processor(span_processor)
        
        self.tracer = trace.get_tracer(self.service_name)
    
    def setup_metrics(self):
        """Setup custom metrics"""
        metrics.set_meter_provider(MeterProvider(
            resource=Resource.create({
                "service.name": self.service_name
            })
        ))
        
        self.meter = metrics.get_meter(self.service_name)
        
        # Business metrics
        self.request_counter = self.meter.create_counter(
            "requests_total",
            description="Total requests processed"
        )
        
        self.request_duration = self.meter.create_histogram(
            "request_duration_seconds",
            description="Request duration trong seconds"
        )
        
        self.active_connections = self.meter.create_up_down_counter(
            "active_connections",
            description="Number of active connections"
        )
        
        self.business_transactions = self.meter.create_counter(
            "business_transactions_total",
            description="Business transactions processed"
        )
    
    async def trace_request(self, operation_name: str, request_data: dict, handler_func):
        """Trace request với comprehensive context"""
        with self.tracer.start_as_current_span(operation_name) as span:
            # Add request attributes
            span.set_attribute("http.method", request_data.get("method", "unknown"))
            span.set_attribute("http.url", request_data.get("url", "unknown"))
            span.set_attribute("user.id", request_data.get("user_id", "anonymous"))
            span.set_attribute("request.size", len(json.dumps(request_data)))
            
            start_time = time.time()
            
            try:
                # Execute handler
                result = await handler_func(request_data)
                
                # Record success metrics
                duration = time.time() - start_time
                
                span.set_attribute("http.status_code", result.get("status_code", 200))
                span.set_attribute("response.size", len(json.dumps(result)))
                
                # Update metrics
                self.request_counter.add(1, {
                    "method": request_data.get("method", "unknown"),
                    "status": "success",
                    "endpoint": operation_name
                })
                
                self.request_duration.record(duration, {
                    "method": request_data.get("method", "unknown"),
                    "endpoint": operation_name
                })
                
                # Business metrics
                if "business_event" trong result:
                    self.business_transactions.add(1, {
                        "event_type": result["business_event"],
                        "success": True
                    })
                
                span.set_status(trace.Status(trace.StatusCode.OK))
                return result
                
            except Exception as e:
                duration = time.time() - start_time
                
                span.record_exception(e)
                span.set_status(trace.Status(trace.StatusCode.ERROR, str(e)))
                
                # Record error metrics
                self.request_counter.add(1, {
                    "method": request_data.get("method", "unknown"),
                    "status": "error",
                    "endpoint": operation_name,
                    "error_type": type(e).__name__
                })
                
                self.request_duration.record(duration, {
                    "method": request_data.get("method", "unknown"),
                    "endpoint": operation_name
                })
                
                raise

# Service dependency health monitoring
class ServiceHealthMonitor:
    def __init__(self):
        self.dependencies = {}
        self.health_checks = {}
        
    def register_dependency(self, service_name: str, endpoint: str, 
                          health_check_url: str, critical: bool = True):
        """Register service dependency"""
        self.dependencies[service_name] = {
            'endpoint': endpoint,
            'health_check_url': health_check_url,
            'critical': critical,
            'status': 'unknown',
            'last_check': None,
            'response_time': None,
            'failure_count': 0
        }
    
    async def check_all_dependencies(self) -> dict:
        """Check health của all dependencies"""
        results = {}
        overall_health = 'healthy'
        
        for service_name, config in self.dependencies.items():
            health_result = await self.check_service_health(service_name)
            results[service_name] = health_result
            
            if config['critical'] and health_result['status'] != 'healthy':
                overall_health = 'unhealthy'
            elif health_result['status'] == 'degraded' and overall_health == 'healthy':
                overall_health = 'degraded'
        
        return {
            'overall_status': overall_health,
            'dependencies': results,
            'checked_at': time.time()
        }
    
    async def check_service_health(self, service_name: str) -> dict:
        """Check individual service health"""
        config = self.dependencies[service_name]
        
        try:
            start_time = time.time()
            
            # Simulate health check call
            await asyncio.sleep(0.01)  # Simulated network call
            
            response_time = (time.time() - start_time) * 1000  # ms
            
            # Determine health based on response time
            if response_time < 100:
                status = 'healthy'
            elif response_time < 500:
                status = 'degraded'
            else:
                status = 'unhealthy'
            
            config['status'] = status
            config['response_time'] = response_time
            config['failure_count'] = 0
            config['last_check'] = time.time()
            
            return {
                'status': status,
                'response_time': response_time,
                'last_check': config['last_check']
            }
            
        except Exception as e:
            config['failure_count'] += 1
            config['status'] = 'unhealthy'
            config['last_check'] = time.time()
            
            return {
                'status': 'unhealthy',
                'error': str(e),
                'failure_count': config['failure_count'],
                'last_check': config['last_check']
            }

# Usage
async def main():
    # Setup observability
    observability = MicroservicesObservability("user-service")
    health_monitor = ServiceHealthMonitor()
    
    # Register dependencies
    health_monitor.register_dependency(
        "database", 
        "postgresql://db:5432", 
        "http://db:5432/health",
        critical=True
    )
    
    health_monitor.register_dependency(
        "cache", 
        "redis://cache:6379", 
        "http://cache:6379/ping",
        critical=False
    )
    
    # Simulate request handling
    async def handle_user_request(request_data):
        await asyncio.sleep(0.1)  # Simulate processing
        return {
            "status_code": 200,
            "user_id": request_data.get("user_id"),
            "business_event": "user_profile_updated"
        }
    
    # Trace request
    request = {
        "method": "GET",
        "url": "/api/users/123",
        "user_id": "123"
    }
    
    result = await observability.trace_request(
        "get_user_profile", 
        request, 
        handle_user_request
    )
    
    # Check service health
    health_status = await health_monitor.check_all_dependencies()
    print(f"Service health: {health_status}")

if __name__ == "__main__":
    asyncio.run(main())
\`\`\`

## Kết luận

Container Orchestration và Microservices Architecture implementation represents foundational transformation trong modern software development, enabling organizations achieve unprecedented levels của scalability, resilience, operational efficiency trong increasingly complex distributed system environments.

### Strategic Business Transformation:

**Operational Excellence Achievement:**
- **Independent Scaling**: Individual service scaling based on demand patterns reducing infrastructure costs 40-60%
- **Development Velocity**: Parallel team development enabling 300-400% faster feature delivery
- **System Resilience**: Fault isolation preventing cascade failures achieving >99.9% system availability
- **Technology Diversity**: Service-specific technology choices optimizing performance for specific use cases

**Organizational Transformation:**
- **Team Autonomy**: Independent service ownership enabling autonomous team operations
- **Deployment Independence**: Service-specific release cycles reducing deployment coordination overhead
- **Failure Isolation**: Localized failures preventing system-wide outages improving reliability
- **Innovation Acceleration**: Experimental technology adoption without affecting entire system

### Advanced Implementation Excellence:

**Service Mesh Mastery:**
- **Intelligent Traffic Management**: Istio-based routing với advanced load balancing algorithms
- **Security by Default**: Mutual TLS, authorization policies, zero-trust networking implementation
- **Observability Integration**: Distributed tracing, metrics collection, comprehensive monitoring
- **Progressive Deployment**: Canary releases, A/B testing, traffic splitting automation

**Data Management Sophistication:**
- **Database per Service**: Service-specific data storage optimization với polyglot persistence
- **Eventual Consistency**: Saga patterns, event sourcing, CQRS implementation
- **Data Synchronization**: Cross-service data consistency với compensating transactions
- **Performance Optimization**: Read replicas, caching strategies, data locality optimization

**Advanced Orchestration Patterns:**
- **Multi-Cluster Management**: Federation across cloud providers với centralized control
- **Resource Optimization**: Intelligent scheduling, auto-scaling, cost optimization
- **Disaster Recovery**: Cross-region failover, backup automation, state recovery
- **Security Hardening**: Pod security policies, network segmentation, runtime protection

### Production-Ready Capabilities:

**Enterprise-Grade Reliability:**
- **Circuit Breaker Patterns**: Automatic failure detection với graceful degradation
- **Retry Logic**: Exponential backoff, jitter implementation, timeout management
- **Health Checks**: Comprehensive health monitoring với dependency tracking
- **Chaos Engineering**: Failure injection testing ensuring system resilience

**Comprehensive Monitoring:**
- **Distributed Tracing**: End-to-end request tracking across service boundaries
- **Business Metrics**: Domain-specific KPI tracking với real-time dashboards
- **Performance Analytics**: Response time optimization, bottleneck identification
- **Cost Attribution**: Per-service cost tracking với optimization recommendations

**Advanced Security Implementation:**
- **Zero-Trust Architecture**: Service-to-service authentication, authorization
- **Secret Management**: Automated credential rotation, secure storage
- **Compliance Integration**: Audit logging, policy enforcement, regulatory adherence
- **Threat Detection**: Anomaly detection, intrusion prevention, incident response

### Innovation Leadership:

**Emerging Technology Integration:**
- **Serverless Microservices**: Function-as-a-Service integration với container orchestration
- **AI-Powered Operations**: Machine learning optimizing service placement, scaling decisions
- **Edge Computing**: Distributed microservices supporting edge deployment patterns
- **Quantum-Ready Architectures**: Future-proof designs supporting emerging computational models

**Advanced Automation:**
- **Self-Healing Systems**: Automated recovery, root cause analysis, preventive measures
- **Predictive Scaling**: AI-driven capacity planning với proactive resource allocation
- **Intelligent Routing**: ML-based traffic optimization với performance prediction
- **Automated Optimization**: Continuous performance tuning với minimal human intervention

### Implementation Roadmap:

**Phase 1: Foundation (Months 1-3)**
- Core microservices architecture design
- Container orchestration platform setup
- Basic service mesh implementation
- Initial monitoring và logging integration

**Phase 2: Enhancement (Months 4-6)**
- Advanced traffic management implementation
- Data consistency patterns deployment
- Comprehensive security hardening
- Performance optimization tuning

**Phase 3: Intelligence (Months 7-9)**
- AI-powered operations integration
- Advanced monitoring và analytics
- Chaos engineering implementation
- Multi-cloud federation setup

**Phase 4: Excellence (Ongoing)**
- Continuous optimization và innovation
- Emerging technology adoption
- Industry best practices leadership
- Community contribution và knowledge sharing

### Success Metrics:

**Technical Excellence:**
- Service independence: >95% autonomous deployment capability
- System reliability: >99.9% uptime với automated recovery
- Performance optimization: 50-70% response time improvement
- Resource efficiency: 40-60% infrastructure cost reduction

**Business Impact:**
- Development velocity: 300-400% faster feature delivery
- Innovation speed: 60-80% reduction trong time-to-market
- Operational efficiency: 70-90% reduction trong manual operations
- Customer satisfaction: Improved user experience với reliable services

**Organizational Transformation:**
- Team productivity: Autonomous team operations với minimal coordination overhead
- Technology adoption: Rapid integration của emerging technologies
- Scalability achievement: Linear scaling capability với business growth
- Innovation culture: Experimentation-friendly environment supporting continuous improvement

### Future-Ready Strategy:

**Technology Evolution:**
- **Microservices 2.0**: Event-driven architectures với real-time streaming
- **Cloud-Native Excellence**: Full utilization của cloud provider capabilities
- **AI-First Design**: Intelligence integrated into every service layer
- **Sustainable Computing**: Environmental impact optimization với green computing practices

**Business Alignment:**
- **Customer-Centric Services**: Service design optimized for user experience
- **Market Responsiveness**: Rapid adaptation to market changes với flexible architecture
- **Global Scalability**: Worldwide service deployment với local optimization
- **Innovation Platform**: Technology foundation supporting business experimentation

Modern enterprises require sophisticated microservices capabilities combining scalability, reliability, security, observability. Container orchestration với advanced microservices patterns provides foundation cho organizational excellence, enabling sustained competitive advantage through superior software architecture.

Investment trong comprehensive microservices strategy delivers transformative returns through improved development velocity, enhanced system reliability, reduced operational complexity, increased innovation capacity essential for digital business success.

The future belongs to organizations mastering microservices excellence, achieving architectural scalability, operational resilience, development agility enabling rapid adaptation to market demands, consistent service delivery, continuous innovation essential for long-term prosperity trong increasingly complex distributed system landscape.

Companies implementing advanced microservices architectures position themselves for technological leadership, operational excellence, business success through superior distributed system capabilities supporting sustained growth, customer satisfaction, competitive differentiation trong rapidly evolving cloud-native ecosystem.`,
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

## 4. Zero-Trust Security Architecture

### Zero-Trust Network Implementation:
\`\`\`yaml
# Zero-trust network policies với Istio
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: zero-trust-policy
  namespace: production
spec:
  selector:
    matchLabels:
      app: user-service
  rules:
  # Allow only authenticated requests
  - from:
    - source:
        principals: ["cluster.local/ns/production/sa/api-gateway"]
    to:
    - operation:
        methods: ["GET", "POST"]
        paths: ["/api/users/*"]
    when:
    - key: request.headers[authorization]
      values: ["Bearer *"]
    - key: source.certificate_fingerprint
      values: ["sha256:1234567890abcdef..."]

---
# Service-to-service mutual TLS
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: production
spec:
  mtls:
    mode: STRICT

---
# JWT validation policy
apiVersion: security.istio.io/v1beta1
kind: RequestAuthentication
metadata:
  name: jwt-validation
  namespace: production
spec:
  selector:
    matchLabels:
      app: user-service
  jwtRules:
  - issuer: "https://auth.company.com"
    jwksUri: "https://auth.company.com/.well-known/jwks.json"
    audiences:
    - "user-service-api"
    forwardOriginalToken: true
  - issuer: "https://internal-auth.company.com"
    jwksUri: "https://internal-auth.company.com/certs"
    audiences:
    - "internal-services"

---
# Network segmentation
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: zero-trust-network-policy
  namespace: production
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
  
  # Default deny all
  ingress: []
  egress:
  # Allow DNS resolution
  - to: []
    ports:
    - protocol: UDP
      port: 53
    - protocol: TCP
      port: 53
  
  # Allow specific service communication
  - to:
    - namespaceSelector:
        matchLabels:
          name: database
    ports:
    - protocol: TCP
      port: 5432
  
  - to:
    - namespaceSelector:
        matchLabels:
          name: cache
    ports:
    - protocol: TCP
      port: 6379

---
# Workload-specific policies
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: user-service-policy
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: user-service
  policyTypes:
  - Ingress
  - Egress
  
  ingress:
  # Allow traffic từ API Gateway
  - from:
    - namespaceSelector:
        matchLabels:
          name: api-gateway
      podSelector:
        matchLabels:
          app: gateway
    ports:
    - protocol: TCP
      port: 8080
  
  # Allow traffic từ monitoring
  - from:
    - namespaceSelector:
        matchLabels:
          name: monitoring
    ports:
    - protocol: TCP
      port: 9090  # Metrics endpoint
  
  egress:
  # Allow database access
  - to:
    - namespaceSelector:
        matchLabels:
          name: database
    ports:
    - protocol: TCP
      port: 5432
  
  # Allow external API calls
  - to: []
    ports:
    - protocol: TCP
      port: 443  # HTTPS
    - protocol: TCP
      port: 80   # HTTP
\`\`\`

### Advanced Identity và Access Management:
\`\`\`python
# RBAC automation với OIDC integration
import json
import jwt
import requests
from datetime import datetime, timedelta
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa, padding

class ZeroTrustAccessManager:
    def __init__(self, oidc_config, rbac_config):
        self.oidc_config = oidc_config
        self.rbac_config = rbac_config
        self.policy_engine = PolicyEngine()
        
    def validate_request(self, request_context):
        """Comprehensive request validation"""
        validation_result = {
            'allowed': False,
            'reason': '',
            'required_actions': [],
            'risk_score': 0
        }
        
        # 1. Authentication validation
        auth_result = self.validate_authentication(request_context)
        if not auth_result['valid']:
            validation_result['reason'] = 'Authentication failed'
            return validation_result
        
        # 2. Authorization check
        authz_result = self.check_authorization(
            auth_result['user'],
            request_context['resource'],
            request_context['action']
        )
        
        if not authz_result['allowed']:
            validation_result['reason'] = 'Authorization denied'
            return validation_result
        
        # 3. Context-based risk assessment
        risk_assessment = self.assess_risk(request_context, auth_result['user'])
        validation_result['risk_score'] = risk_assessment['score']
        
        # 4. Conditional access policies
        conditional_result = self.evaluate_conditional_policies(
            auth_result['user'],
            request_context,
            risk_assessment
        )
        
        if conditional_result['additional_verification_required']:
            validation_result['required_actions'] = conditional_result['actions']
            validation_result['reason'] = 'Additional verification required'
            return validation_result
        
        # 5. Final decision
        validation_result['allowed'] = True
        return validation_result
    
    def validate_authentication(self, request_context):
        """Validate JWT tokens và certificates"""
        token = request_context.get('authorization_token')
        client_cert = request_context.get('client_certificate')
        
        if not token:
            return {'valid': False, 'reason': 'Missing token'}
        
        try:
            # Verify JWT signature và claims
            decoded = jwt.decode(
                token,
                self.oidc_config['public_key'],
                algorithms=['RS256'],
                audience=self.oidc_config['audience'],
                issuer=self.oidc_config['issuer']
            )
            
            # Check token expiration
            if decoded['exp'] < datetime.now().timestamp():
                return {'valid': False, 'reason': 'Token expired'}
            
            # Verify client certificate if required
            if self.oidc_config.get('require_client_cert', False):
                if not client_cert:
                    return {'valid': False, 'reason': 'Client certificate required'}
                
                cert_validation = self.validate_client_certificate(client_cert)
                if not cert_validation['valid']:
                    return cert_validation
            
            return {
                'valid': True,
                'user': decoded,
                'token_claims': decoded
            }
            
        except jwt.InvalidTokenError as e:
            return {'valid': False, 'reason': f'Invalid token: {str(e)}'}
    
    def check_authorization(self, user, resource, action):
        """RBAC authorization check"""
        user_roles = user.get('roles', [])
        user_groups = user.get('groups', [])
        
        # Check direct role permissions
        for role in user_roles:
            if self.role_has_permission(role, resource, action):
                return {
                    'allowed': True,
                    'granted_by': f'role:{role}'
                }
        
        # Check group permissions
        for group in user_groups:
            group_roles = self.rbac_config['groups'].get(group, {}).get('roles', [])
            for role in group_roles:
                if self.role_has_permission(role, resource, action):
                    return {
                        'allowed': True,
                        'granted_by': f'group:{group}:role:{role}'
                    }
        
        # Check attribute-based permissions
        abac_result = self.check_attribute_based_access(user, resource, action)
        if abac_result['allowed']:
            return abac_result
        
        return {'allowed': False, 'reason': 'No matching permissions'}
    
    def assess_risk(self, request_context, user):
        """Risk-based access control"""
        risk_factors = []
        total_score = 0
        
        # Geographic risk
        user_location = request_context.get('source_ip_location', {})
        expected_locations = user.get('expected_locations', [])
        
        if user_location and expected_locations:
            if user_location['country'] not in expected_locations:
                risk_factors.append({
                    'factor': 'unusual_location',
                    'score': 30,
                    'details': f"Access from {user_location['country']}"
                })
                total_score += 30
        
        # Time-based risk
        current_hour = datetime.now().hour
        user_typical_hours = user.get('typical_access_hours', [])
        
        if user_typical_hours and current_hour not in user_typical_hours:
            risk_factors.append({
                'factor': 'unusual_time',
                'score': 20,
                'details': f"Access at {current_hour}:00"
            })
            total_score += 20
        
        # Device risk
        device_fingerprint = request_context.get('device_fingerprint')
        known_devices = user.get('known_devices', [])
        
        if device_fingerprint and device_fingerprint not in known_devices:
            risk_factors.append({
                'factor': 'unknown_device',
                'score': 40,
                'details': 'Unrecognized device'
            })
            total_score += 40
        
        # Behavioral analysis
        behavior_score = self.analyze_behavior_patterns(user, request_context)
        if behavior_score > 25:
            risk_factors.append({
                'factor': 'unusual_behavior',
                'score': behavior_score,
                'details': 'Deviation from normal patterns'
            })
            total_score += behavior_score
        
        return {
            'score': min(total_score, 100),  # Cap at 100
            'factors': risk_factors,
            'risk_level': self.calculate_risk_level(total_score)
        }
    
    def evaluate_conditional_policies(self, user, request_context, risk_assessment):
        """Evaluate conditional access policies"""
        policies = self.rbac_config.get('conditional_policies', [])
        required_actions = []
        
        for policy in policies:
            if self.policy_applies(policy, user, request_context, risk_assessment):
                if policy['action'] == 'require_mfa':
                    if not request_context.get('mfa_verified', False):
                        required_actions.append({
                            'type': 'mfa_verification',
                            'methods': policy.get('mfa_methods', ['totp', 'sms'])
                        })
                
                elif policy['action'] == 'require_device_compliance':
                    device_compliance = self.check_device_compliance(
                        request_context.get('device_fingerprint')
                    )
                    if not device_compliance['compliant']:
                        required_actions.append({
                            'type': 'device_compliance',
                            'issues': device_compliance['issues']
                        })
                
                elif policy['action'] == 'require_approval':
                    required_actions.append({
                        'type': 'manual_approval',
                        'approvers': policy.get('approvers', []),
                        'reason': policy.get('reason', 'High-risk access')
                    })
        
        return {
            'additional_verification_required': len(required_actions) > 0,
            'actions': required_actions
        }

# Policy Engine cho advanced authorization
class PolicyEngine:
    def __init__(self):
        self.policies = {}
        
    def evaluate_policy(self, policy_name, context):
        """Evaluate OPA-style policies"""
        policy = self.policies.get(policy_name)
        if not policy:
            return {'allowed': False, 'reason': 'Policy not found'}
        
        # Simple policy evaluation (in production, use OPA)
        return policy(context)
    
    def add_policy(self, name, policy_func):
        """Add custom policy function"""
        self.policies[name] = policy_func

# Usage với advanced security policies
def setup_zero_trust_policies():
    access_manager = ZeroTrustAccessManager(
        oidc_config={
            'public_key': load_public_key(),
            'audience': 'production-api',
            'issuer': 'https://auth.company.com',
            'require_client_cert': True
        },
        rbac_config={
            'roles': {
                'admin': {
                    'permissions': ['*:*:*']
                },
                'developer': {
                    'permissions': [
                        'applications:read:*',
                        'applications:write:development/*',
                        'logs:read:development/*'
                    ]
                },
                'viewer': {
                    'permissions': [
                        'applications:read:*',
                        'logs:read:*'
                    ]
                }
            },
            'conditional_policies': [
                {
                    'name': 'high_risk_mfa',
                    'conditions': {
                        'risk_score': {'gt': 50}
                    },
                    'action': 'require_mfa',
                    'mfa_methods': ['totp', 'yubikey']
                },
                {
                    'name': 'production_approval',
                    'conditions': {
                        'resource': {'matches': 'applications:write:production/*'},
                        'time': {'not_in': 'business_hours'}
                    },
                    'action': 'require_approval',
                    'approvers': ['production-team', 'security-team']
                }
            ]
        }
    )
    
    return access_manager

# Test zero-trust access
access_manager = setup_zero_trust_policies()

request_context = {
    'authorization_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...',
    'client_certificate': 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...',
    'source_ip': '203.0.113.1',
    'source_ip_location': {'country': 'US', 'city': 'San Francisco'},
    'device_fingerprint': 'device-fingerprint-hash',
    'resource': 'applications:write:production/user-service',
    'action': 'deploy',
    'mfa_verified': False
}

validation_result = access_manager.validate_request(request_context)
print(f"Access decision: {validation_result}")
\`\`\`

## 5. Advanced Threat Detection và Response

### Security Information và Event Management (SIEM):
\`\`\`python
# Advanced SIEM implementation với ML-based threat detection
import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import asyncio
import json
from datetime import datetime, timedelta

class AdvancedThreatDetector:
    def __init__(self):
        self.anomaly_detectors = {}
        self.threat_intelligence = ThreatIntelligenceFeeds()
        self.incident_responder = IncidentResponseSystem()
        self.correlation_engine = EventCorrelationEngine()
        
    async def process_security_events(self, event_stream):
        """Process real-time security events"""
        async for event in event_stream:
            # Enrich event với context
            enriched_event = await self.enrich_event(event)
            
            # Correlate với other events
            correlation_result = await self.correlation_engine.correlate(enriched_event)
            
            # Detect anomalies
            anomaly_result = self.detect_anomalies(enriched_event)
            
            # Check threat intelligence
            threat_intel_result = await self.threat_intelligence.check(enriched_event)
            
            # Calculate threat score
            threat_score = self.calculate_threat_score(
                enriched_event,
                correlation_result,
                anomaly_result,
                threat_intel_result
            )
            
            # Trigger response if needed
            if threat_score > 75:  # High threat threshold
                await self.incident_responder.handle_threat(
                    enriched_event,
                    threat_score,
                    {
                        'correlation': correlation_result,
                        'anomaly': anomaly_result,
                        'threat_intel': threat_intel_result
                    }
                )
    
    async def enrich_event(self, event):
        """Enrich security event với additional context"""
        enriched = event.copy()
        
        # Add geolocation data
        if 'source_ip' in event:
            geo_data = await self.get_geolocation(event['source_ip'])
            enriched['geo_location'] = geo_data
        
        # Add user context
        if 'user_id' in event:
            user_context = await self.get_user_context(event['user_id'])
            enriched['user_context'] = user_context
        
        # Add asset information
        if 'asset_id' in event:
            asset_info = await self.get_asset_info(event['asset_id'])
            enriched['asset_info'] = asset_info
        
        # Add network context
        if 'destination_ip' in event:
            network_context = await self.get_network_context(event['destination_ip'])
            enriched['network_context'] = network_context
        
        return enriched
    
    def detect_anomalies(self, event):
        """ML-based anomaly detection"""
        event_type = event.get('type', 'unknown')
        
        if event_type not in self.anomaly_detectors:
            # Train new detector if not exists
            self.train_anomaly_detector(event_type)
        
        detector = self.anomaly_detectors[event_type]
        
        # Extract features cho anomaly detection
        features = self.extract_anomaly_features(event)
        
        if features is None:
            return {'anomaly_score': 0, 'is_anomaly': False}
        
        # Predict anomaly
        anomaly_score = detector.decision_function([features])[0]
        is_anomaly = detector.predict([features])[0] == -1
        
        return {
            'anomaly_score': float(anomaly_score),
            'is_anomaly': is_anomaly,
            'confidence': abs(anomaly_score)
        }
    
    def train_anomaly_detector(self, event_type):
        """Train anomaly detector cho specific event type"""
        # Get historical data
        historical_events = self.get_historical_events(event_type, days=30)
        
        if len(historical_events) < 100:  # Need minimum data
            return False
        
        # Extract features
        feature_matrix = []
        for event in historical_events:
            features = self.extract_anomaly_features(event)
            if features is not None:
                feature_matrix.append(features)
        
        if len(feature_matrix) < 50:
            return False
        
        # Train model
        scaler = StandardScaler()
        scaled_features = scaler.fit_transform(feature_matrix)
        
        detector = IsolationForest(
            contamination=0.1,  # Expect 10% anomalies
            random_state=42,
            n_estimators=100
        )
        
        detector.fit(scaled_features)
        
        # Store model
        self.anomaly_detectors[event_type] = {
            'model': detector,
            'scaler': scaler,
            'trained_at': datetime.now()
        }
        
        return True
    
    def extract_anomaly_features(self, event):
        """Extract features cho anomaly detection"""
        features = []
        
        # Time-based features
        timestamp = datetime.fromisoformat(event.get('timestamp', datetime.now().isoformat()))
        features.extend([
            timestamp.hour,
            timestamp.weekday(),
            (timestamp.weekday() >= 5),  # Weekend
        ])
        
        # User behavior features
        if 'user_context' in event:
            user_ctx = event['user_context']
            features.extend([
                user_ctx.get('session_count_today', 0),
                user_ctx.get('failed_login_count', 0),
                user_ctx.get('typical_access_score', 50),  # 0-100 score
            ])
        
        # Network features
        if 'source_ip' in event:
            features.extend([
                self.ip_to_numeric(event['source_ip']),
                event.get('geo_location', {}).get('risk_score', 0),
            ])
        
        # Asset features
        if 'asset_info' in event:
            asset_info = event['asset_info']
            features.extend([
                asset_info.get('criticality_score', 0),
                asset_info.get('exposure_score', 0),
            ])
        
        # Event-specific features
        event_type = event.get('type', '')
        if event_type == 'authentication':
            features.extend([
                event.get('success', 0),
                len(event.get('user_agent', '')),
                event.get('mfa_used', 0),
            ])
        elif event_type == 'network_connection':
            features.extend([
                event.get('bytes_transferred', 0),
                event.get('duration', 0),
                event.get('port', 0),
            ])
        
        return features if features else None
    
    def calculate_threat_score(self, event, correlation, anomaly, threat_intel):
        """Calculate composite threat score"""
        base_score = 0
        
        # Event type base score
        event_type_scores = {
            'failed_authentication': 30,
            'privilege_escalation': 80,
            'data_exfiltration': 90,
            'malware_detection': 95,
            'network_intrusion': 70,
            'policy_violation': 40
        }
        
        base_score = event_type_scores.get(event.get('type'), 20)
        
        # Anomaly score contribution
        if anomaly['is_anomaly']:
            base_score += min(anomaly['confidence'] * 30, 40)
        
        # Correlation score
        if correlation['related_events_count'] > 5:
            base_score += 20
        if correlation['pattern_match']:
            base_score += correlation['pattern_confidence'] * 30
        
        # Threat intelligence
        if threat_intel['found_indicators']:
            base_score += threat_intel['severity_score']
        
        # Context modifiers
        if event.get('geo_location', {}).get('country') in ['CN', 'RU', 'KP']:
            base_score += 15  # High-risk countries
        
        if event.get('user_context', {}).get('is_privileged_user', False):
            base_score += 20  # Privileged user activity
        
        if event.get('asset_info', {}).get('contains_sensitive_data', False):
            base_score += 25  # Sensitive asset
        
        return min(base_score, 100)  # Cap at 100

class ThreatIntelligenceFeeds:
    def __init__(self):
        self.ioc_database = IOCDatabase()
        self.threat_feeds = [
            'https://feeds.alienvault.com/reputation/generic',
            'https://rules.emergingthreats.net/blockrules/compromised-ips.txt',
            'https://reputation.alienvault.com/reputation.data'
        ]
    
    async def check(self, event):
        """Check event against threat intelligence"""
        indicators = self.extract_indicators(event)
        found_indicators = []
        
        for indicator in indicators:
            threat_data = await self.ioc_database.lookup(indicator)
            if threat_data:
                found_indicators.append({
                    'indicator': indicator,
                    'threat_type': threat_data['type'],
                    'severity': threat_data['severity'],
                    'source': threat_data['source'],
                    'first_seen': threat_data['first_seen'],
                    'confidence': threat_data['confidence']
                })
        
        severity_score = 0
        if found_indicators:
            severity_score = max(ind['severity'] for ind in found_indicators)
        
        return {
            'found_indicators': len(found_indicators) > 0,
            'indicators': found_indicators,
            'severity_score': severity_score
        }
    
    def extract_indicators(self, event):
        """Extract IOCs từ event"""
        indicators = []
        
        # IP addresses
        for field in ['source_ip', 'destination_ip', 'remote_ip']:
            if field in event:
                indicators.append({
                    'type': 'ip',
                    'value': event[field]
                })
        
        # Domain names
        for field in ['domain', 'hostname', 'fqdn']:
            if field in event:
                indicators.append({
                    'type': 'domain',
                    'value': event[field]
                })
        
        # File hashes
        for field in ['md5', 'sha1', 'sha256']:
            if field in event:
                indicators.append({
                    'type': 'hash',
                    'value': event[field]
                })
        
        # URLs
        if 'url' in event:
            indicators.append({
                'type': 'url',
                'value': event['url']
            })
        
        return indicators

class IncidentResponseSystem:
    def __init__(self):
        self.playbooks = self.load_playbooks()
        self.notification_system = NotificationSystem()
        
    async def handle_threat(self, event, threat_score, analysis):
        """Automated incident response"""
        # Determine response level
        if threat_score >= 90:
            response_level = 'critical'
        elif threat_score >= 75:
            response_level = 'high'
        elif threat_score >= 50:
            response_level = 'medium'
        else:
            response_level = 'low'
        
        # Execute appropriate playbook
        playbook = self.playbooks.get(event['type'], {}).get(response_level)
        if playbook:
            await self.execute_playbook(playbook, event, analysis)
        
        # Create incident ticket
        incident = await self.create_incident(event, threat_score, analysis)
        
        # Send notifications
        await self.notification_system.send_security_alert(
            incident,
            response_level,
            analysis
        )
        
        return incident
    
    async def execute_playbook(self, playbook, event, analysis):
        """Execute incident response playbook"""
        for action in playbook['actions']:
            try:
                if action['type'] == 'isolate_host':
                    await self.isolate_host(action['target'])
                elif action['type'] == 'block_ip':
                    await self.block_ip_address(action['ip'])
                elif action['type'] == 'disable_user':
                    await self.disable_user_account(action['user_id'])
                elif action['type'] == 'collect_forensics':
                    await self.collect_forensic_data(action['target'])
                elif action['type'] == 'update_signatures':
                    await self.update_detection_signatures(action['indicators'])
                
                print(f"Executed action: {action['type']}")
                
            except Exception as e:
                print(f"Failed to execute action {action['type']}: {e}")

# Usage
async def main():
    threat_detector = AdvancedThreatDetector()
    
    # Sample security event
    security_event = {
        'timestamp': datetime.now().isoformat(),
        'type': 'failed_authentication',
        'source_ip': '203.0.113.100',
        'user_id': 'user123',
        'asset_id': 'web-server-01',
        'details': {
            'attempts': 15,
            'timespan': '5 minutes',
            'user_agent': 'curl/7.68.0'
        }
    }
    
    # Process event
    await threat_detector.process_security_events([security_event])

if __name__ == "__main__":
    asyncio.run(main())
\`\`\`

## 6. Compliance Automation và Governance

### Automated Compliance Monitoring:
\`\`\`python
# SOC2, ISO27001, PCI-DSS compliance automation
import json
import yaml
from datetime import datetime, timedelta
import requests
import subprocess

class ComplianceFramework:
    def __init__(self, frameworks=['SOC2', 'ISO27001', 'PCI-DSS']):
        self.frameworks = frameworks
        self.control_catalog = self.load_control_catalog()
        self.evidence_collector = EvidenceCollector()
        self.assessment_engine = AssessmentEngine()
        
    def load_control_catalog(self):
        """Load compliance control catalog"""
        return {
            'SOC2': {
                'CC6.1': {
                    'name': 'Logical and Physical Access Controls',
                    'description': 'Controls provide reasonable assurance that access is restricted to authorized users',
                    'requirements': [
                        'Multi-factor authentication',
                        'Role-based access control',
                        'Regular access reviews',
                        'Privileged access management'
                    ],
                    'evidence_types': ['access_logs', 'rbac_config', 'mfa_logs', 'access_reviews']
                },
                'CC6.2': {
                    'name': 'System Communications Protection',
                    'description': 'Communications are protected during transmission và storage',
                    'requirements': [
                        'Encryption in transit',
                        'Encryption at rest',
                        'Certificate management',
                        'Network segmentation'
                    ],
                    'evidence_types': ['tls_config', 'encryption_config', 'network_policies']
                },
                'CC7.1': {
                    'name': 'System Monitoring',
                    'description': 'System monitoring activities provide detection of security events',
                    'requirements': [
                        'Security event logging',
                        'Log monitoring and alerting',
                        'Incident response procedures',
                        'Vulnerability management'
                    ],
                    'evidence_types': ['security_logs', 'monitoring_config', 'incident_reports']
                }
            },
            'ISO27001': {
                'A.9.1.1': {
                    'name': 'Access control policy',
                    'description': 'Access control policy based on business requirements',
                    'requirements': [
                        'Documented access control policy',
                        'Regular policy reviews',
                        'Access control procedures',
                        'User access provisioning'
                    ],
                    'evidence_types': ['policies', 'procedures', 'access_reviews']
                },
                'A.12.6.1': {
                    'name': 'Management of technical vulnerabilities',
                    'description': 'Technical vulnerabilities are managed để prevent exploitation',
                    'requirements': [
                        'Vulnerability scanning',
                        'Patch management',
                        'Vulnerability assessment',
                        'Risk-based remediation'
                    ],
                    'evidence_types': ['scan_reports', 'patch_logs', 'remediation_tracking']
                }
            },
            'PCI-DSS': {
                'Req-1': {
                    'name': 'Install and maintain firewall configuration',
                    'description': 'Firewall configuration protects cardholder data',
                    'requirements': [
                        'Firewall rules documented',
                        'Regular rule reviews',
                        'Network segmentation',
                        'DMZ implementation'
                    ],
                    'evidence_types': ['firewall_config', 'network_diagrams', 'rule_reviews']
                },
                'Req-8': {
                    'name': 'Identify and authenticate access',
                    'description': 'Strong authentication mechanisms for system access',
                    'requirements': [
                        'Unique user IDs',
                        'Strong passwords',
                        'Multi-factor authentication',
                        'Account lockout policies'
                    ],
                    'evidence_types': ['user_configs', 'password_policies', 'mfa_configs']
                }
            }
        }
    
    async def run_compliance_assessment(self, scope='all'):
        """Run comprehensive compliance assessment"""
        assessment_results = {
            'timestamp': datetime.now().isoformat(),
            'scope': scope,
            'frameworks': {},
            'overall_compliance': 0,
            'recommendations': []
        }
        
        for framework in self.frameworks:
            if scope == 'all' or scope == framework:
                framework_result = await self.assess_framework(framework)
                assessment_results['frameworks'][framework] = framework_result
        
        # Calculate overall compliance
        if assessment_results['frameworks']:
            total_score = sum(
                fw['compliance_percentage'] 
                for fw in assessment_results['frameworks'].values()
            )
            assessment_results['overall_compliance'] = total_score / len(assessment_results['frameworks'])
        
        # Generate recommendations
        assessment_results['recommendations'] = self.generate_recommendations(
            assessment_results['frameworks']
        )
        
        return assessment_results
    
    async def assess_framework(self, framework_name):
        """Assess compliance for specific framework"""
        controls = self.control_catalog[framework_name]
        framework_result = {
            'framework': framework_name,
            'controls': {},
            'compliant_controls': 0,
            'total_controls': len(controls),
            'compliance_percentage': 0,
            'critical_gaps': []
        }
        
        for control_id, control_spec in controls.items():
            control_result = await self.assess_control(control_id, control_spec)
            framework_result['controls'][control_id] = control_result
            
            if control_result['compliant']:
                framework_result['compliant_controls'] += 1
            else:
                framework_result['critical_gaps'].append({
                    'control_id': control_id,
                    'name': control_spec['name'],
                    'gaps': control_result['gaps']
                })
        
        # Calculate compliance percentage
        framework_result['compliance_percentage'] = (
            framework_result['compliant_controls'] / 
            framework_result['total_controls'] * 100
        )
        
        return framework_result
    
    async def assess_control(self, control_id, control_spec):
        """Assess individual control compliance"""
        control_result = {
            'control_id': control_id,
            'name': control_spec['name'],
            'compliant': True,
            'evidence_collected': [],
            'gaps': [],
            'score': 0
        }
        
        # Collect evidence cho control
        for evidence_type in control_spec['evidence_types']:
            evidence = await self.evidence_collector.collect(evidence_type)
            control_result['evidence_collected'].append(evidence)
        
        # Assess each requirement
        total_requirements = len(control_spec['requirements'])
        met_requirements = 0
        
        for requirement in control_spec['requirements']:
            requirement_met = await self.assess_requirement(
                requirement,
                control_result['evidence_collected']
            )
            
            if requirement_met:
                met_requirements += 1
            else:
                control_result['gaps'].append(requirement)
        
        # Calculate control score
        control_result['score'] = (met_requirements / total_requirements) * 100
        control_result['compliant'] = control_result['score'] >= 80  # 80% threshold
        
        return control_result
    
    async def assess_requirement(self, requirement, evidence_list):
        """Assess if specific requirement is met"""
        if requirement == 'Multi-factor authentication':
            return self.check_mfa_implementation(evidence_list)
        elif requirement == 'Role-based access control':
            return self.check_rbac_implementation(evidence_list)
        elif requirement == 'Encryption in transit':
            return self.check_tls_implementation(evidence_list)
        elif requirement == 'Security event logging':
            return self.check_logging_implementation(evidence_list)
        # Add more requirement checks...
        
        return False  # Default to not met
    
    def check_mfa_implementation(self, evidence_list):
        """Check MFA implementation compliance"""
        for evidence in evidence_list:
            if evidence['type'] == 'mfa_logs':
                mfa_coverage = evidence['data'].get('user_coverage_percentage', 0)
                return mfa_coverage >= 95  # 95% of users must have MFA
        return False
    
    def check_rbac_implementation(self, evidence_list):
        """Check RBAC implementation compliance"""
        for evidence in evidence_list:
            if evidence['type'] == 'rbac_config':
                rbac_data = evidence['data']
                # Check for proper role separation
                has_admin_separation = rbac_data.get('admin_role_separated', False)
                has_principle_of_least_privilege = rbac_data.get('least_privilege_enforced', False)
                regular_reviews = rbac_data.get('regular_access_reviews', False)
                
                return all([has_admin_separation, has_principle_of_least_privilege, regular_reviews])
        return False
    
    def generate_recommendations(self, framework_results):
        """Generate remediation recommendations"""
        recommendations = []
        
        for framework_name, framework_data in framework_results.items():
            for gap in framework_data['critical_gaps']:
                for missing_requirement in gap['gaps']:
                    recommendation = self.get_remediation_guidance(
                        framework_name,
                        gap['control_id'],
                        missing_requirement
                    )
                    if recommendation:
                        recommendations.append(recommendation)
        
        return recommendations
    
    def get_remediation_guidance(self, framework, control_id, requirement):
        """Get specific remediation guidance"""
        remediation_map = {
            'Multi-factor authentication': {
                'priority': 'high',
                'effort': 'medium',
                'description': 'Implement MFA for all user accounts',
                'steps': [
                    'Deploy MFA solution (TOTP, hardware tokens)',
                    'Configure MFA policies in identity provider',
                    'Train users on MFA usage',
                    'Monitor MFA adoption rates'
                ],
                'timeline': '30 days'
            },
            'Role-based access control': {
                'priority': 'high',
                'effort': 'high',
                'description': 'Implement comprehensive RBAC system',
                'steps': [
                    'Define role matrix based on job functions',
                    'Implement role-based permissions',
                    'Configure automated provisioning/deprovisioning',
                    'Conduct quarterly access reviews'
                ],
                'timeline': '60 days'
            },
            'Encryption in transit': {
                'priority': 'critical',
                'effort': 'medium',
                'description': 'Ensure all communications are encrypted',
                'steps': [
                    'Audit all network communications',
                    'Implement TLS 1.3 for all services',
                    'Configure certificate management',
                    'Monitor for unencrypted communications'
                ],
                'timeline': '21 days'
            }
        }
        
        guidance = remediation_map.get(requirement)
        if guidance:
            guidance['framework'] = framework
            guidance['control_id'] = control_id
            guidance['requirement'] = requirement
        
        return guidance

class EvidenceCollector:
    def __init__(self):
        self.collectors = {
            'access_logs': self.collect_access_logs,
            'rbac_config': self.collect_rbac_config,
            'mfa_logs': self.collect_mfa_logs,
            'tls_config': self.collect_tls_config,
            'security_logs': self.collect_security_logs,
            'firewall_config': self.collect_firewall_config,
            'scan_reports': self.collect_vulnerability_scans
        }
    
    async def collect(self, evidence_type):
        """Collect specific type of evidence"""
        collector = self.collectors.get(evidence_type)
        if collector:
            return await collector()
        else:
            return {'type': evidence_type, 'data': {}, 'collected_at': datetime.now().isoformat()}
    
    async def collect_access_logs(self):
        """Collect access log evidence"""
        # Query log management system
        logs = await self.query_logs('access', days=30)
        
        return {
            'type': 'access_logs',
            'data': {
                'total_events': len(logs),
                'unique_users': len(set(log['user_id'] for log in logs if 'user_id' in log)),
                'failed_attempts': len([log for log in logs if not log.get('success', True)]),
                'geographic_distribution': self.analyze_geographic_distribution(logs),
                'time_analysis': self.analyze_access_patterns(logs)
            },
            'collected_at': datetime.now().isoformat()
        }
    
    async def collect_rbac_config(self):
        """Collect RBAC configuration evidence"""
        # Query Kubernetes RBAC, Active Directory, etc.
        rbac_data = await self.query_rbac_systems()
        
        return {
            'type': 'rbac_config',
            'data': {
                'total_roles': len(rbac_data.get('roles', [])),
                'total_users': len(rbac_data.get('users', [])),
                'admin_role_separated': self.check_admin_separation(rbac_data),
                'least_privilege_enforced': self.check_least_privilege(rbac_data),
                'regular_access_reviews': self.check_access_reviews(rbac_data),
                'orphaned_accounts': self.find_orphaned_accounts(rbac_data)
            },
            'collected_at': datetime.now().isoformat()
        }
    
    async def collect_mfa_logs(self):
        """Collect MFA implementation evidence"""
        mfa_data = await self.query_mfa_systems()
        
        return {
            'type': 'mfa_logs',
            'data': {
                'total_users': mfa_data.get('total_users', 0),
                'mfa_enabled_users': mfa_data.get('mfa_enabled_users', 0),
                'user_coverage_percentage': (
                    mfa_data.get('mfa_enabled_users', 0) / 
                    max(mfa_data.get('total_users', 1), 1) * 100
                ),
                'mfa_methods': mfa_data.get('supported_methods', []),
                'enforcement_policies': mfa_data.get('policies', {})
            },
            'collected_at': datetime.now().isoformat()
        }

# Usage
async def main():
    compliance_framework = ComplianceFramework(['SOC2', 'ISO27001'])
    
    # Run compliance assessment
    results = await compliance_framework.run_compliance_assessment()
    
    # Generate compliance report
    report = generate_compliance_report(results)
    
    # Save results
    with open(f'compliance-assessment-{datetime.now().strftime("%Y%m%d")}.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"Overall Compliance: {results['overall_compliance']:.1f}%")
    print(f"Critical Recommendations: {len(results['recommendations'])}")

def generate_compliance_report(assessment_results):
    """Generate executive compliance report"""
    return {
        'executive_summary': {
            'assessment_date': assessment_results['timestamp'],
            'overall_compliance': assessment_results['overall_compliance'],
            'frameworks_assessed': list(assessment_results['frameworks'].keys()),
            'critical_gaps': sum(
                len(fw['critical_gaps']) 
                for fw in assessment_results['frameworks'].values()
            ),
            'total_recommendations': len(assessment_results['recommendations'])
        },
        'detailed_findings': assessment_results,
        'action_plan': {
            'immediate_actions': [
                rec for rec in assessment_results['recommendations']
                if rec['priority'] == 'critical'
            ],
            'short_term_actions': [
                rec for rec in assessment_results['recommendations']
                if rec['priority'] == 'high'
            ],
            'long_term_actions': [
                rec for rec in assessment_results['recommendations']
                if rec['priority'] == 'medium'
            ]
        }
    }

if __name__ == "__main__":
    asyncio.run(main())
\`\`\`

## Kết luận

DevSecOps implementation represents fundamental transformation trong modern software delivery, integrating security practices seamlessly vào development lifecycle để achieve unprecedented levels của application security, compliance adherence, operational resilience trong enterprise environments.

### Strategic Business Transformation:

**Security-First Culture Development:**
- **Shift-Left Security**: Early vulnerability detection reducing remediation costs by 80-90%
- **Developer Empowerment**: Security tools integration enabling developers proactively address security concerns
- **Continuous Compliance**: Automated compliance validation ensuring regulatory adherence without workflow disruption
- **Risk Reduction**: Proactive security measures minimizing security incidents và associated business costs

**Operational Excellence Achievement:**
- **Automated Security Testing**: Comprehensive SAST, DAST, SCA integration trong CI/CD pipelines
- **Zero-Downtime Security Updates**: Blue-green deployments với integrated security validations
- **Real-Time Threat Detection**: ML-based anomaly detection providing immediate threat response
- **Compliance Automation**: Continuous SOC2, ISO27001, PCI-DSS validation reducing audit preparation time

### Advanced Implementation Excellence:

**Zero-Trust Architecture Mastery:**
- **Identity-Centric Security**: Comprehensive authentication, authorization, accounting (AAA) systems
- **Micro-Segmentation**: Network policies providing granular access control
- **Continuous Verification**: Real-time risk assessment với adaptive access controls
- **Context-Aware Security**: Behavioral analysis, geolocation, device trust integration

**Threat Intelligence Integration:**
- **Real-Time IOC Correlation**: Automated threat indicator matching với external intelligence feeds
- **Behavioral Analytics**: Machine learning detecting anomalous patterns indicating potential threats
- **Incident Response Automation**: Playbook-driven response ensuring consistent, rapid threat mitigation
- **Forensic Data Collection**: Automated evidence gathering supporting incident investigation

**Enterprise Security Governance:**
- **Policy as Code**: Infrastructure security policies version-controlled với automated enforcement
- **Continuous Compliance Monitoring**: Real-time compliance status tracking with gap identification
- **Risk-Based Security**: Threat modeling integration với automated security control recommendations
- **Security Metrics Dashboard**: Executive visibility into security posture với actionable insights

### Production-Ready Capabilities:

**Scalable Security Architecture:**
- **Multi-Cloud Security**: Unified security policies across AWS, Azure, GCP environments
- **Container Security**: Runtime protection, image scanning, vulnerability management
- **API Security**: Comprehensive API gateway security với rate limiting, authentication, monitoring
- **Data Protection**: Encryption at rest và in transit với automated key management

**Advanced Monitoring và Detection:**
- **SIEM Integration**: Security Information và Event Management với correlation rules
- **UEBA Implementation**: User và Entity Behavioral Analytics detecting insider threats
- **Threat Hunting**: Proactive security analysis identifying advanced persistent threats
- **Security Orchestration**: SOAR platforms automating security workflows

**Compliance Automation Excellence:**
- **Multi-Framework Support**: Simultaneous SOC2, ISO27001, PCI-DSS, HIPAA compliance validation
- **Evidence Collection**: Automated audit trail generation với regulatory reporting
- **Gap Analysis**: Continuous compliance monitoring với remediation recommendations
- **Executive Reporting**: Real-time compliance dashboards với risk visualization

### Innovation Leadership:

**Emerging Security Technologies:**
- **AI-Powered Security**: Machine learning enhancing threat detection accuracy
- **Quantum-Safe Cryptography**: Future-proof encryption algorithms protecting against quantum threats
- **Zero-Trust Networking**: Software-defined perimeter replacing traditional network security
- **Confidential Computing**: Hardware-based security protecting data during processing

**Advanced Automation:**
- **Self-Healing Security**: Automated vulnerability patching với rollback capabilities
- **Predictive Security**: AI-driven threat prediction enabling preemptive defense measures
- **Intelligent Incident Response**: Context-aware automation reducing response times
- **Adaptive Security Controls**: Dynamic policy adjustment based on risk assessment

### Implementation Roadmap:

**Phase 1: Foundation (Months 1-3)**
- Core DevSecOps pipeline implementation
- Basic security scanning integration
- RBAC và authentication setup
- Initial compliance framework deployment

**Phase 2: Enhancement (Months 4-6)**
- Zero-trust architecture implementation
- Advanced threat detection deployment
- Automated incident response setup
- Comprehensive compliance monitoring

**Phase 3: Intelligence (Months 7-9)**
- ML-based anomaly detection deployment
- Threat intelligence integration
- Behavioral analytics implementation
- Advanced forensics capabilities

**Phase 4: Excellence (Ongoing)**
- Continuous optimization và tuning
- Emerging technology adoption
- Industry best practices leadership
- Innovation development

### Success Metrics:

**Security Excellence:**
- Vulnerability detection rate: >95% automated identification
- Mean time to patch: <24 hours cho critical vulnerabilities
- Security incident reduction: 70-80% decrease trong security events
- Compliance score: >95% automated compliance validation

**Business Impact:**
- Development velocity: Maintained productivity với enhanced security
- Risk reduction: 85-90% reduction trong security-related business risks
- Audit preparation: 60-70% reduction trong compliance preparation time
- Customer trust: Enhanced reputation through demonstrated security commitment

**Organizational Transformation:**
- Security awareness: 100% developer security training completion
- Cultural shift: Security-first mindset adoption across organization
- Process automation: 80-90% security processes automated
- Innovation acceleration: Secure foundation enabling rapid feature development

### Future-Ready Strategy:

**Technology Evolution:**
- **DevSecOps 2.0**: AI-driven security automation với predictive capabilities
- **Quantum Security**: Post-quantum cryptography implementation
- **Edge Security**: Distributed security controls cho edge computing
- **Privacy Engineering**: Privacy-by-design integration trong development processes

**Business Alignment:**
- **Customer Security**: Enhanced product security driving competitive advantage
- **Regulatory Compliance**: Proactive compliance supporting global expansion
- **Business Resilience**: Comprehensive security ensuring business continuity
- **Innovation Security**: Secure foundation enabling emerging technology adoption

Modern enterprises require sophisticated security capabilities combining automation, intelligence, compliance, resilience. DevSecOps implementation với comprehensive security integration provides foundation cho organizational security excellence, enabling sustained competitive advantage through superior security practices.

Investment trong advanced DevSecOps strategy delivers transformative returns through reduced security risks, enhanced compliance posture, accelerated development velocity, improved customer trust essential for digital business success.

The future belongs to organizations mastering DevSecOps excellence, achieving security automation, compliance assurance, threat resilience enabling rapid adaptation to evolving threat landscape, consistent security delivery, continuous innovation essential for long-term prosperity trong increasingly complex cybersecurity environment.

Companies implementing comprehensive DevSecOps practices position themselves for security leadership, operational excellence, business success through superior security capabilities supporting sustained growth, customer confidence, competitive differentiation trong rapidly evolving digital threat landscape.`,
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

## 8. Multi-Cluster GitOps Management

### ArgoCD Application Sets:
\`\`\`yaml
# ApplicationSet cho multi-cluster deployment
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: multi-cluster-app-set
  namespace: argocd
spec:
  generators:
  - clusters:
      selector:
        matchLabels:
          environment: production
        matchExpressions:
        - key: region
          operator: In
          values: [us-west-2, us-east-1, eu-west-1]
  
  - git:
      repoURL: https://github.com/company/microservices-configs
      revision: HEAD
      directories:
      - path: services/*
      - path: infrastructure/*
  
  template:
    metadata:
      name: '{{path.basename}}-{{cluster.name}}'
      labels:
        environment: '{{cluster.metadata.labels.environment}}'
        region: '{{cluster.metadata.labels.region}}'
    spec:
      project: default
      source:
        repoURL: https://github.com/company/microservices-configs
        targetRevision: HEAD
        path: '{{path}}'
        helm:
          valueFiles:
          - values.yaml
          - values-{{cluster.metadata.labels.environment}}.yaml
          - values-{{cluster.metadata.labels.region}}.yaml
          parameters:
          - name: cluster.name
            value: '{{cluster.name}}'
          - name: cluster.region
            value: '{{cluster.metadata.labels.region}}'
      destination:
        server: '{{cluster.server}}'
        namespace: '{{path.basename}}'
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
        syncOptions:
        - CreateNamespace=true
        - PrunePropagationPolicy=foreground
        - PruneLast=true
      ignoreDifferences:
      - group: apps
        kind: Deployment
        jsonPointers:
        - /spec/replicas
      - group: argoproj.io
        kind: Rollout
        jsonPointers:
        - /spec/replicas

---
# Cluster registration automation
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: cluster-bootstrap
  namespace: argocd
spec:
  project: infrastructure
  source:
    repoURL: https://github.com/company/cluster-bootstrap
    path: argocd-clusters/
    targetRevision: HEAD
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
\`\`\`

### Advanced Cluster Management:
\`\`\`python
# Automated cluster onboarding
import kubernetes
import base64
import yaml
import requests
from cryptography import x509
from cryptography.hazmat.backends import default_backend

class ArgoClusterManager:
    def __init__(self, argocd_server, argocd_token):
        self.argocd_server = argocd_server
        self.argocd_token = argocd_token
        self.headers = {
            'Authorization': f'Bearer {argocd_token}',
            'Content-Type': 'application/json'
        }
    
    def register_cluster(self, cluster_config):
        """Register new cluster với ArgoCD"""
        # Extract cluster information
        cluster_name = cluster_config['name']
        kubeconfig = cluster_config['kubeconfig']
        environment = cluster_config.get('environment', 'unknown')
        region = cluster_config.get('region', 'unknown')
        
        # Parse kubeconfig
        config_dict = yaml.safe_load(kubeconfig)
        cluster_info = config_dict['clusters'][0]['cluster']
        user_info = config_dict['users'][0]['user']
        
        # Prepare cluster registration payload
        cluster_payload = {
            "server": cluster_info['server'],
            "name": cluster_name,
            "config": {
                "bearerToken": user_info.get('token', ''),
                "tlsClientConfig": {
                    "insecure": cluster_info.get('insecure-skip-tls-verify', False),
                    "caData": cluster_info.get('certificate-authority-data', ''),
                    "certData": user_info.get('client-certificate-data', ''),
                    "keyData": user_info.get('client-key-data', '')
                }
            },
            "connectionState": {
                "status": "Successful"
            },
            "serverVersion": "unknown",
            "labels": {
                "environment": environment,
                "region": region,
                "managed-by": "argocd-automation"
            }
        }
        
        # Register cluster
        response = requests.post(
            f"{self.argocd_server}/api/v1/clusters",
            json=cluster_payload,
            headers=self.headers
        )
        
        if response.status_code == 200:
            print(f"Successfully registered cluster: {cluster_name}")
            return self.setup_cluster_rbac(cluster_name)
        else:
            print(f"Failed to register cluster: {response.text}")
            return False
    
    def setup_cluster_rbac(self, cluster_name):
        """Setup RBAC cho ArgoCD cluster"""
        rbac_manifest = f"""
apiVersion: v1
kind: ServiceAccount
metadata:
  name: argocd-manager
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: argocd-manager-role
rules:
- apiGroups: ["*"]
  resources: ["*"]
  verbs: ["*"]
- nonResourceURLs: ["*"]
  verbs: ["*"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: argocd-manager-rb
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: argocd-manager-role
subjects:
- kind: ServiceAccount
  name: argocd-manager
  namespace: kube-system
---
apiVersion: v1
kind: Secret
metadata:
  name: argocd-manager-token
  namespace: kube-system
  annotations:
    kubernetes.io/service-account.name: argocd-manager
type: kubernetes.io/service-account-token
"""
        
        # Apply RBAC manifest to target cluster
        try:
            kubernetes.config.load_kube_config(context=cluster_name)
            kubernetes.utils.create_from_yaml(
                kubernetes.client.ApiClient(),
                yaml_objects=yaml.safe_load_all(rbac_manifest)
            )
            print(f"RBAC setup completed for cluster: {cluster_name}")
            return True
        except Exception as e:
            print(f"RBAC setup failed for {cluster_name}: {e}")
            return False
    
    def health_check_clusters(self):
        """Health check cho all registered clusters"""
        response = requests.get(
            f"{self.argocd_server}/api/v1/clusters",
            headers=self.headers
        )
        
        if response.status_code != 200:
            print("Failed to get cluster list")
            return []
        
        clusters = response.json()['items']
        health_status = []
        
        for cluster in clusters:
            cluster_name = cluster['name']
            server = cluster['server']
            
            # Check cluster connectivity
            health_response = requests.get(
                f"{self.argocd_server}/api/v1/clusters/{server}",
                headers=self.headers
            )
            
            if health_response.status_code == 200:
                cluster_info = health_response.json()
                status = {
                    'name': cluster_name,
                    'server': server,
                    'connection_status': cluster_info.get('connectionState', {}).get('status', 'Unknown'),
                    'version': cluster_info.get('serverVersion', 'Unknown'),
                    'labels': cluster_info.get('labels', {}),
                    'healthy': cluster_info.get('connectionState', {}).get('status') == 'Successful'
                }
            else:
                status = {
                    'name': cluster_name,
                    'server': server,
                    'connection_status': 'Failed',
                    'healthy': False
                }
            
            health_status.append(status)
        
        return health_status

# Usage
cluster_manager = ArgoClusterManager(
    'https://argocd.company.com',
    'argocd-auth-token'
)

# Register new cluster
new_cluster = {
    'name': 'production-us-west-2',
    'kubeconfig': '/path/to/kubeconfig',
    'environment': 'production',
    'region': 'us-west-2'
}

cluster_manager.register_cluster(new_cluster)

# Health check all clusters
health_status = cluster_manager.health_check_clusters()
for cluster in health_status:
    print(f"Cluster {cluster['name']}: {cluster['connection_status']}")
\`\`\`

## 9. Progressive Delivery Strategies

### Canary Deployments với Argo Rollouts:
\`\`\`yaml
# Advanced canary deployment strategy
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: user-service-rollout
  namespace: production
spec:
  replicas: 20
  strategy:
    canary:
      canaryService: user-service-canary
      stableService: user-service-stable
      trafficRouting:
        istio:
          virtualService:
            name: user-service-vs
            routes:
            - primary
          destinationRule:
            name: user-service-dr
            canarySubsetName: canary
            stableSubsetName: stable
        managedRoutes:
        - name: set-header
          match:
          - headers:
              canary-test:
                exact: "true"
      steps:
      # Phase 1: Initial canary with automated analysis
      - setWeight: 5
      - pause:
          duration: 30s
      - analysis:
          templates:
          - templateName: success-rate
          - templateName: latency-p99
          args:
          - name: service-name
            value: user-service
          - name: canary-hash
            valueFrom:
              podTemplateHashValue: Latest
      
      # Phase 2: Increase traffic if analysis passes
      - setWeight: 20
      - pause:
          duration: 1m
      - analysis:
          templates:
          - templateName: success-rate
          - templateName: latency-p99
          - templateName: error-rate
          args:
          - name: service-name
            value: user-service
      
      # Phase 3: Major traffic shift
      - setWeight: 50
      - pause:
          duration: 2m
      - analysis:
          templates:
          - templateName: success-rate
          - templateName: latency-p99
          - templateName: cpu-usage
          - templateName: memory-usage
          args:
          - name: service-name
            value: user-service
      
      # Phase 4: Final validation before full rollout
      - setWeight: 80
      - pause:
          duration: 5m
      - analysis:
          templates:
          - templateName: comprehensive-health-check
          args:
          - name: service-name
            value: user-service
          - name: duration
            value: 300s  # 5 minutes
      
      # Automatic promotion if all checks pass
      - setWeight: 100
      - pause:
          duration: 30s

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
        image: user-service:latest
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 5
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10

---
# Analysis templates cho automated validation
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: success-rate
spec:
  args:
  - name: service-name
  - name: canary-hash
    valueFrom:
      podTemplateHashValue: Latest
  metrics:
  - name: success-rate
    interval: 30s
    count: 5
    successCondition: result[0] >= 0.95
    failureLimit: 3
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

---
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: latency-p99
spec:
  args:
  - name: service-name
  metrics:
  - name: latency-p99
    interval: 30s
    count: 5
    successCondition: result[0] <= 0.5  # 500ms
    failureLimit: 3
    provider:
      prometheus:
        address: http://prometheus.monitoring.svc.cluster.local:9090
        query: |
          histogram_quantile(0.99,
            sum(rate(
              http_request_duration_seconds_bucket{job="{{args.service-name}}"}[2m]
            )) by (le)
          )

---
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: comprehensive-health-check
spec:
  args:
  - name: service-name
  - name: duration
    value: "300s"
  metrics:
  # Business metrics
  - name: order-success-rate
    interval: 60s
    count: 5
    successCondition: result[0] >= 0.98
    provider:
      prometheus:
        address: http://prometheus.monitoring.svc.cluster.local:9090
        query: |
          sum(rate(orders_completed_total{service="{{args.service-name}}"}[5m])) /
          sum(rate(orders_total{service="{{args.service-name}}"}[5m]))
  
  # Infrastructure metrics
  - name: cpu-usage
    interval: 30s
    count: 10
    successCondition: result[0] <= 0.8  # 80% CPU
    provider:
      prometheus:
        address: http://prometheus.monitoring.svc.cluster.local:9090
        query: |
          avg(rate(container_cpu_usage_seconds_total{pod=~"{{args.service-name}}-.*"}[2m]))
  
  - name: memory-usage
    interval: 30s
    count: 10
    successCondition: result[0] <= 0.85  # 85% memory
    provider:
      prometheus:
        address: http://prometheus.monitoring.svc.cluster.local:9090
        query: |
          avg(container_memory_working_set_bytes{pod=~"{{args.service-name}}-.*"}) /
          avg(container_spec_memory_limit_bytes{pod=~"{{args.service-name}}-.*"})
  
  # External dependencies health
  - name: database-connections
    interval: 60s
    count: 5
    successCondition: result[0] <= 50  # Max 50 connections
    provider:
      prometheus:
        address: http://prometheus.monitoring.svc.cluster.local:9090
        query: |
          sum(database_connections_active{service="{{args.service-name}}"})
\`\`\`

### Blue-Green Deployments:
\`\`\`yaml
# Blue-Green deployment với ArgoCD
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: user-service-bg
  namespace: production
spec:
  replicas: 10
  strategy:
    blueGreen:
      activeService: user-service-active
      previewService: user-service-preview
      prePromotionAnalysis:
        templates:
        - templateName: comprehensive-validation
        args:
        - name: service-name
          value: user-service-preview
      postPromotionAnalysis:
        templates:
        - templateName: post-deployment-validation
        args:
        - name: service-name
          value: user-service-active
      scaleDownDelaySeconds: 300
      previewReplicaCount: 3
      autoPromotionEnabled: false
      maxUnavailable: 0

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
        image: user-service:v2.1.0
        ports:
        - containerPort: 8080
        env:
        - name: ENVIRONMENT
          value: "production"
        - name: VERSION
          value: "v2.1.0"
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"

---
# Validation templates
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: comprehensive-validation
spec:
  args:
  - name: service-name
  metrics:
  # Smoke tests
  - name: smoke-test
    interval: 30s
    count: 3
    successCondition: result[0] == 1
    failureLimit: 1
    provider:
      job:
        spec:
          template:
            spec:
              containers:
              - name: smoke-test
                image: test-runner:latest
                command: ["/bin/sh"]
                args:
                - -c
                - |
                  # Comprehensive smoke tests
                  curl -f http://{{args.service-name}}/health || exit 1
                  curl -f http://{{args.service-name}}/api/users/1 || exit 1
                  curl -f http://{{args.service-name}}/metrics || exit 1
                  echo "All smoke tests passed"
              restartPolicy: Never
  
  # Load testing
  - name: load-test
    interval: 120s
    count: 1
    successCondition: result[0] >= 0.95  # 95% success rate
    provider:
      job:
        spec:
          template:
            spec:
              containers:
              - name: load-test
                image: artillery:latest
                command: ["artillery"]
                args:
                - "run"
                - "--target"
                - "http://{{args.service-name}}"
                - "/tests/load-test.yml"
              restartPolicy: Never

  # Security scan
  - name: security-scan
    interval: 300s
    count: 1
    successCondition: result[0] == 0  # No critical vulnerabilities
    provider:
      job:
        spec:
          template:
            spec:
              containers:
              - name: security-scan
                image: owasp/zap2docker-stable:latest
                command: ["zap-baseline.py"]
                args:
                - "-t"
                - "http://{{args.service-name}}"
                - "-J"
                - "/zap/reports/baseline.json"
              restartPolicy: Never
\`\`\`

## 10. Advanced Automation và Integration

### GitOps Pipeline Integration:
\`\`\`python
# Advanced GitOps automation với GitHub Actions
import os
import json
import base64
import requests
import yaml
from github import Github
from kubernetes import client, config

class GitOpsAutomator:
    def __init__(self, github_token, argocd_server, argocd_token):
        self.github = Github(github_token)
        self.argocd_server = argocd_server
        self.argocd_token = argocd_token
        
    def create_deployment_pr(self, repo_name, image_tag, environment):
        """Create deployment PR với automated updates"""
        repo = self.github.get_repo(repo_name)
        
        # Create branch for deployment
        main_branch = repo.get_branch("main")
        branch_name = f"deploy/{environment}/{image_tag}"
        
        try:
            repo.create_git_ref(
                ref=f"refs/heads/{branch_name}",
                sha=main_branch.commit.sha
            )
        except Exception as e:
            print(f"Branch might already exist: {e}")
        
        # Update deployment files
        deployment_updates = self.generate_deployment_updates(
            repo, image_tag, environment
        )
        
        # Commit changes
        for file_path, content in deployment_updates.items():
            try:
                file = repo.get_contents(file_path, ref=branch_name)
                repo.update_file(
                    path=file_path,
                    message=f"Deploy {image_tag} to {environment}",
                    content=content,
                    sha=file.sha,
                    branch=branch_name
                )
            except Exception:
                # File doesn't exist, create it
                repo.create_file(
                    path=file_path,
                    message=f"Deploy {image_tag} to {environment}",
                    content=content,
                    branch=branch_name
                )
        
        # Create pull request
        pr = repo.create_pull(
            title=f"Deploy {image_tag} to {environment}",
            body=self.generate_pr_description(image_tag, environment),
            head=branch_name,
            base="main"
        )
        
        # Add deployment checks
        self.add_deployment_checks(repo, pr)
        
        return pr
    
    def generate_deployment_updates(self, repo, image_tag, environment):
        """Generate updated deployment manifests"""
        updates = {}
        
        # Update Helm values
        values_file = f"environments/{environment}/values.yaml"
        try:
            content = repo.get_contents(values_file).decoded_content
            values = yaml.safe_load(content)
            
            # Update image tag
            if 'image' in values:
                values['image']['tag'] = image_tag
            else:
                values['image'] = {'tag': image_tag}
            
            # Update deployment timestamp
            values['deployment'] = {
                'timestamp': time.time(),
                'version': image_tag,
                'environment': environment
            }
            
            updates[values_file] = yaml.dump(values, default_flow_style=False)
            
        except Exception as e:
            print(f"Error updating values file: {e}")
        
        # Update ArgoCD Application
        app_file = f"argocd/applications/{environment}-app.yaml"
        app_manifest = {
            'apiVersion': 'argoproj.io/v1alpha1',
            'kind': 'Application',
            'metadata': {
                'name': f'user-service-{environment}',
                'namespace': 'argocd'
            },
            'spec': {
                'project': 'default',
                'source': {
                    'repoURL': repo.clone_url,
                    'targetRevision': 'main',
                    'path': f'environments/{environment}',
                    'helm': {
                        'valueFiles': ['values.yaml']
                    }
                },
                'destination': {
                    'server': 'https://kubernetes.default.svc',
                    'namespace': f'user-service-{environment}'
                },
                'syncPolicy': {
                    'automated': {
                        'prune': True,
                        'selfHeal': True
                    }
                }
            }
        }
        
        updates[app_file] = yaml.dump(app_manifest, default_flow_style=False)
        
        return updates
    
    def generate_pr_description(self, image_tag, environment):
        """Generate comprehensive PR description"""
        return f"""
## Deployment Summary
- **Image Tag**: {image_tag}
- **Environment**: {environment}
- **Deployment Type**: GitOps Automated

## Changes
- Updated container image to {image_tag}
- Updated deployment timestamp
- Applied environment-specific configurations

## Pre-deployment Checklist
- [ ] Image security scan passed
- [ ] Unit tests passed
- [ ] Integration tests passed
- [ ] Performance benchmarks met
- [ ] Database migrations applied (if any)

## Deployment Process
1. Merge this PR to trigger ArgoCD sync
2. ArgoCD will detect changes và deploy automatically
3. Health checks will verify deployment success
4. Rollback available if issues detected

## Monitoring
- **Grafana Dashboard**: [User Service {environment}](https://grafana.company.com/d/user-service-{environment})
- **Logs**: [Kibana {environment}](https://kibana.company.com/app/discover#/user-service-{environment})
- **Alerts**: [AlertManager](https://alertmanager.company.com)

## Rollback Plan
If deployment fails:
1. Revert this PR
2. ArgoCD will automatically rollback
3. Alternative: Manual rollback via ArgoCD UI

/deploy {environment}
"""
    
    def add_deployment_checks(self, repo, pr):
        """Add automated deployment checks"""
        # Add status checks
        checks = [
            {
                'name': 'security-scan',
                'description': 'Container security scan',
                'status': 'pending'
            },
            {
                'name': 'smoke-tests',
                'description': 'Post-deployment smoke tests',
                'status': 'pending'
            },
            {
                'name': 'argocd-sync',
                'description': 'ArgoCD sync status',
                'status': 'pending'
            }
        ]
        
        for check in checks:
            pr.create_status(
                state=check['status'],
                description=check['description'],
                context=check['name']
            )
    
    def monitor_deployment(self, application_name):
        """Monitor ArgoCD deployment progress"""
        app_url = f"{self.argocd_server}/api/v1/applications/{application_name}"
        headers = {'Authorization': f'Bearer {self.argocd_token}'}
        
        while True:
            response = requests.get(app_url, headers=headers)
            
            if response.status_code == 200:
                app_data = response.json()
                status = app_data.get('status', {})
                health = status.get('health', {}).get('status', 'Unknown')
                sync_status = status.get('sync', {}).get('status', 'Unknown')
                
                print(f"Health: {health}, Sync: {sync_status}")
                
                if health == 'Healthy' and sync_status == 'Synced':
                    print("Deployment successful!")
                    break
                elif health == 'Degraded':
                    print("Deployment failed!")
                    break
                
                time.sleep(30)  # Check every 30 seconds
            else:
                print(f"Failed to get application status: {response.text}")
                break

# Slack notifications
class SlackNotifier:
    def __init__(self, webhook_url):
        self.webhook_url = webhook_url
    
    def send_deployment_notification(self, deployment_info):
        """Send deployment notification to Slack"""
        message = {
            "text": f"🚀 Deployment Update: {deployment_info['service']}",
            "attachments": [
                {
                    "color": "good" if deployment_info['status'] == 'success' else "danger",
                    "fields": [
                        {
                            "title": "Service",
                            "value": deployment_info['service'],
                            "short": True
                        },
                        {
                            "title": "Environment",
                            "value": deployment_info['environment'],
                            "short": True
                        },
                        {
                            "title": "Version",
                            "value": deployment_info['version'],
                            "short": True
                        },
                        {
                            "title": "Status",
                            "value": deployment_info['status'],
                            "short": True
                        },
                        {
                            "title": "Duration",
                            "value": f"{deployment_info['duration']:.1f}s",
                            "short": True
                        },
                        {
                            "title": "Dashboard",
                            "value": f"<{deployment_info['dashboard_url']}|View Metrics>",
                            "short": True
                        }
                    ],
                    "footer": "GitOps Deployment",
                    "ts": int(time.time())
                }
            ]
        }
        
        requests.post(self.webhook_url, json=message)

# Usage example
automator = GitOpsAutomator(
    github_token=os.environ['GITHUB_TOKEN'],
    argocd_server='https://argocd.company.com',
    argocd_token=os.environ['ARGOCD_TOKEN']
)

slack = SlackNotifier(os.environ['SLACK_WEBHOOK_URL'])

# Create deployment PR
pr = automator.create_deployment_pr(
    repo_name='company/user-service-config',
    image_tag='v2.1.0',
    environment='production'
)

print(f"Created deployment PR: {pr.html_url}")

# Monitor deployment
automator.monitor_deployment('user-service-production')

# Send notification
slack.send_deployment_notification({
    'service': 'user-service',
    'environment': 'production',
    'version': 'v2.1.0',
    'status': 'success',
    'duration': 120.5,
    'dashboard_url': 'https://grafana.company.com/d/user-service'
})
\`\`\`

## 11. Enterprise Security và Compliance

### Advanced RBAC Configuration:
\`\`\`yaml
# Enterprise RBAC với fine-grained permissions
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-rbac-cm
  namespace: argocd
data:
  policy.default: role:readonly
  policy.csv: |
    # Admin role - full access
    p, role:admin, applications, *, */*, allow
    p, role:admin, clusters, *, *, allow
    p, role:admin, repositories, *, *, allow
    p, role:admin, projects, *, *, allow
    p, role:admin, accounts, *, *, allow
    
    # Platform team - infrastructure management
    p, role:platform-team, applications, *, infrastructure/*, allow
    p, role:platform-team, clusters, *, *, allow
    p, role:platform-team, repositories, *, infrastructure/*, allow
    p, role:platform-team, projects, get, *, allow
    
    # Development teams - application-specific access
    p, role:backend-team, applications, *, backend/*, allow
    p, role:backend-team, applications, sync, backend/*, allow
    p, role:backend-team, applications, get, backend/*, allow
    p, role:backend-team, repositories, get, backend/*, allow
    
    p, role:frontend-team, applications, *, frontend/*, allow
    p, role:frontend-team, applications, sync, frontend/*, allow
    p, role:frontend-team, applications, get, frontend/*, allow
    p, role:frontend-team, repositories, get, frontend/*, allow
    
    # Environment-specific access
    p, role:production-deployer, applications, sync, */production, allow
    p, role:production-deployer, applications, get, */production, allow
    p, role:staging-deployer, applications, *, */staging, allow
    p, role:dev-deployer, applications, *, */development, allow
    
    # Read-only access
    p, role:readonly, applications, get, *, allow
    p, role:readonly, repositories, get, *, allow
    p, role:readonly, clusters, get, *, allow
    p, role:readonly, projects, get, *, allow
    
    # Group mappings
    g, company:admins, role:admin
    g, company:platform-team, role:platform-team
    g, company:backend-developers, role:backend-team
    g, company:frontend-developers, role:frontend-team
    g, company:production-ops, role:production-deployer
    g, company:staging-ops, role:staging-deployer
    g, company:developers, role:dev-deployer
    g, company:everyone, role:readonly
    
    # Time-based access (emergency access)
    p, role:emergency-access, applications, *, *, allow
    p, role:emergency-access, clusters, *, *, allow
    p, role:emergency-access, repositories, *, *, allow

---
# Audit logging configuration
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-server-audit-log
  namespace: argocd
data:
  audit.yaml: |
    # Audit policy for ArgoCD
    apiVersion: audit.k8s.io/v1
    kind: Policy
    rules:
    # Log all application operations
    - level: RequestResponse
      namespaces: ["argocd"]
      resources:
      - group: argoproj.io
        resources: ["applications"]
      verbs: ["create", "update", "patch", "delete"]
    
    # Log cluster modifications
    - level: RequestResponse
      namespaces: ["argocd"]
      resources:
      - group: ""
        resources: ["secrets"]
      verbs: ["create", "update", "patch", "delete"]
      resourceNames: ["cluster-*"]
    
    # Log repository access
    - level: Metadata
      namespaces: ["argocd"]
      resources:
      - group: ""
        resources: ["secrets"]
      verbs: ["get", "list"]
      resourceNames: ["repo-*"]
    
    # Log sync operations
    - level: Request
      namespaces: ["argocd"]
      resources:
      - group: argoproj.io
        resources: ["applications"]
      verbs: ["sync"]

---
# Network policies for ArgoCD security
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: argocd-server-netpol
  namespace: argocd
spec:
  podSelector:
    matchLabels:
      app.kubernetes.io/name: argocd-server
  policyTypes:
  - Ingress
  - Egress
  ingress:
  # Allow ingress từ ingress controller
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 8080
  
  # Allow internal ArgoCD communication
  - from:
    - podSelector:
        matchLabels:
          app.kubernetes.io/part-of: argocd
    ports:
    - protocol: TCP
      port: 8080
  
  egress:
  # Allow ArgoCD to access Git repositories
  - to: []
    ports:
    - protocol: TCP
      port: 443  # HTTPS
    - protocol: TCP
      port: 22   # SSH
  
  # Allow ArgoCD to access Kubernetes API
  - to:
    - namespaceSelector: {}
    ports:
    - protocol: TCP
      port: 6443

---
# Pod Security Standards
apiVersion: v1
kind: Namespace
metadata:
  name: argocd
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
\`\`\`

### Compliance Automation:
\`\`\`python
# SOC2/ISO27001 compliance automation
import json
import yaml
import hashlib
from datetime import datetime, timedelta
import requests

class ComplianceAuditor:
    def __init__(self, argocd_server, argocd_token):
        self.argocd_server = argocd_server
        self.argocd_token = argocd_token
        self.headers = {'Authorization': f'Bearer {argocd_token}'}
        self.compliance_report = {
            'timestamp': datetime.now().isoformat(),
            'checks': [],
            'violations': [],
            'recommendations': []
        }
    
    def audit_deployment_practices(self):
        """Audit deployment practices cho compliance"""
        # Check 1: All deployments must go through GitOps
        apps = self.get_all_applications()
        
        for app in apps:
            app_name = app['metadata']['name']
            source = app['spec']['source']
            
            # Verify Git-based deployment
            if 'repoURL' not in source:
                self.compliance_report['violations'].append({
                    'type': 'deployment_source',
                    'severity': 'high',
                    'application': app_name,
                    'description': 'Application not deployed from Git repository',
                    'requirement': 'SOC2-CC6.1'
                })
            
            # Verify automated sync is disabled for production
            if 'production' in app_name:
                sync_policy = app['spec'].get('syncPolicy', {})
                if sync_policy.get('automated', {}).get('prune', False):
                    self.compliance_report['violations'].append({
                        'type': 'automated_sync',
                        'severity': 'medium',
                        'application': app_name,
                        'description': 'Production app has automated sync enabled',
                        'requirement': 'Change Management Policy'
                    })
        
        # Check 2: Deployment approval workflow
        self.audit_approval_workflow()
        
        # Check 3: Access controls
        self.audit_access_controls()
        
        # Check 4: Audit trail completeness
        self.audit_trail_completeness()
        
        return self.compliance_report
    
    def audit_approval_workflow(self):
        """Audit deployment approval workflow"""
        # Verify pull request requirements
        required_checks = [
            'security-scan',
            'code-review',
            'automated-tests',
            'compliance-check'
        ]
        
        # Sample GitHub API call to verify branch protection
        github_token = os.environ.get('GITHUB_TOKEN')
        if github_token:
            headers = {'Authorization': f'token {github_token}'}
            
            # Check branch protection rules
            repos = ['company/user-service', 'company/order-service']
            
            for repo in repos:
                response = requests.get(
                    f'https://api.github.com/repos/{repo}/branches/main/protection',
                    headers=headers
                )
                
                if response.status_code == 200:
                    protection = response.json()
                    required_status_checks = protection.get(
                        'required_status_checks', {}
                    ).get('contexts', [])
                    
                    missing_checks = set(required_checks) - set(required_status_checks)
                    
                    if missing_checks:
                        self.compliance_report['violations'].append({
                            'type': 'branch_protection',
                            'severity': 'high',
                            'repository': repo,
                            'description': f'Missing required status checks: {missing_checks}',
                            'requirement': 'SOC2-CC6.2'
                        })
                else:
                    self.compliance_report['violations'].append({
                        'type': 'branch_protection',
                        'severity': 'critical',
                        'repository': repo,
                        'description': 'No branch protection rules configured',
                        'requirement': 'SOC2-CC6.2'
                    })
    
    def audit_access_controls(self):
        """Audit RBAC và access controls"""
        # Get RBAC configuration
        response = requests.get(
            f"{self.argocd_server}/api/v1/account",
            headers=self.headers
        )
        
        if response.status_code == 200:
            accounts = response.json()
            
            # Check for admin accounts
            admin_accounts = [
                acc for acc in accounts 
                if 'admin' in acc.get('capabilities', [])
            ]
            
            if len(admin_accounts) > 3:  # Too many admins
                self.compliance_report['violations'].append({
                    'type': 'excessive_admin_access',
                    'severity': 'medium',
                    'count': len(admin_accounts),
                    'description': 'Too many accounts with admin privileges',
                    'requirement': 'Principle of Least Privilege'
                })
            
            # Check for accounts without MFA
            for account in accounts:
                if not account.get('mfa_enabled', False):
                    self.compliance_report['violations'].append({
                        'type': 'missing_mfa',
                        'severity': 'high',
                        'account': account['name'],
                        'description': 'Account without MFA enabled',
                        'requirement': 'SOC2-CC6.1'
                    })
    
    def audit_trail_completeness(self):
        """Audit completeness của audit trails"""
        # Check audit log retention
        end_date = datetime.now()
        start_date = end_date - timedelta(days=90)  # 90-day retention requirement
        
        # Verify audit logs availability
        audit_coverage = self.check_audit_coverage(start_date, end_date)
        
        if audit_coverage < 0.95:  # 95% coverage required
            self.compliance_report['violations'].append({
                'type': 'incomplete_audit_trail',
                'severity': 'high',
                'coverage': audit_coverage,
                'description': f'Audit trail coverage only {audit_coverage*100:.1f}%',
                'requirement': 'SOC2-CC7.2'
            })
        
        # Check for required log events
        required_events = [
            'application.sync',
            'application.create',
            'application.delete',
            'cluster.add',
            'cluster.remove',
            'user.login',
            'user.logout'
        ]
        
        for event_type in required_events:
            if not self.verify_event_logging(event_type):
                self.compliance_report['violations'].append({
                    'type': 'missing_audit_events',
                    'severity': 'medium',
                    'event_type': event_type,
                    'description': f'No audit logs found for {event_type}',
                    'requirement': 'Audit Logging Policy'
                })
    
    def generate_compliance_report(self):
        """Generate comprehensive compliance report"""
        # Calculate compliance score
        total_checks = len(self.compliance_report['checks'])
        violations = len(self.compliance_report['violations'])
        compliance_score = (total_checks - violations) / total_checks * 100
        
        # Generate executive summary
        executive_summary = {
            'compliance_score': compliance_score,
            'total_checks': total_checks,
            'violations': violations,
            'critical_violations': len([
                v for v in self.compliance_report['violations']
                if v['severity'] == 'critical'
            ]),
            'high_violations': len([
                v for v in self.compliance_report['violations']
                if v['severity'] == 'high'
            ]),
            'audit_date': datetime.now().isoformat(),
            'next_audit_due': (datetime.now() + timedelta(days=90)).isoformat()
        }
        
        # Add remediation recommendations
        recommendations = self.generate_remediation_recommendations()
        
        return {
            'executive_summary': executive_summary,
            'detailed_findings': self.compliance_report,
            'remediation_plan': recommendations
        }
    
    def generate_remediation_recommendations(self):
        """Generate remediation recommendations"""
        recommendations = []
        
        for violation in self.compliance_report['violations']:
            if violation['type'] == 'branch_protection':
                recommendations.append({
                    'priority': 'high',
                    'action': 'Configure branch protection rules',
                    'details': 'Enable required status checks, dismiss stale reviews, and require admin enforcement',
                    'timeline': '7 days'
                })
            
            elif violation['type'] == 'missing_mfa':
                recommendations.append({
                    'priority': 'critical',
                    'action': 'Enforce MFA for all accounts',
                    'details': 'Configure OIDC provider with MFA requirement and update ArgoCD authentication',
                    'timeline': '3 days'
                })
        
        return recommendations

# Usage
auditor = ComplianceAuditor(
    'https://argocd.company.com',
    os.environ['ARGOCD_TOKEN']
)

# Run compliance audit
report = auditor.audit_deployment_practices()
compliance_report = auditor.generate_compliance_report()

# Save report
with open(f'compliance-report-{datetime.now().strftime("%Y%m%d")}.json', 'w') as f:
    json.dump(compliance_report, f, indent=2)

print(f"Compliance Score: {compliance_report['executive_summary']['compliance_score']:.1f}%")
\`\`\`

## Kết luận

GitOps implementation với ArgoCD và Flux represents transformative approach để modern deployment management và enterprise software delivery. Comprehensive GitOps strategy enables organizations achieve unprecedented levels của deployment reliability, security, compliance trong cloud-native environments.

### Strategic Business Transformation:

**Operational Excellence Achievement:**
- **Deployment Frequency**: GitOps enables daily/hourly deployments với complete automation
- **Lead Time Reduction**: Từ weeks xuống hours cho feature delivery through automated pipelines
- **Mean Time to Recovery**: Automated rollbacks reduce incident recovery từ hours xuống minutes
- **Change Failure Rate**: Declarative deployments reduce production failures by 85-90%

**Enterprise Security Benefits:**
- **Audit Compliance**: Complete audit trails ensuring SOC2, ISO27001, PCI-DSS compliance
- **Access Control**: Fine-grained RBAC với principle of least privilege enforcement
- **Secret Management**: Secure credential handling với automated rotation
- **Policy Enforcement**: Automated compliance validation preventing security violations

### Advanced Implementation Excellence:

**Multi-Cloud GitOps Mastery:**
- **Unified Management**: Single interface controlling deployments across AWS, Azure, GCP
- **Cross-Cluster Coordination**: ApplicationSets enabling consistent deployments across regions
- **Disaster Recovery**: Git-based state ensuring rapid environment reconstruction
- **Federation Management**: Centralized control với distributed execution capabilities

**Progressive Delivery Innovation:**
- **Canary Deployments**: Automated analysis-driven traffic shifting minimizing risk
- **Blue-Green Strategies**: Zero-downtime deployments với comprehensive validation
- **Feature Flags Integration**: Gradual feature rollouts independent of deployments
- **Automated Rollbacks**: Intelligent failure detection với immediate recovery

**Enterprise Integration Patterns:**
- **CI/CD Pipeline Integration**: Seamless workflow từ code commit to production deployment
- **Monitoring Integration**: Real-time deployment validation với comprehensive observability
- **Security Scanning**: Automated vulnerability assessment trong deployment pipeline
- **Compliance Automation**: Continuous compliance validation với audit trail generation

### Production-Ready Capabilities:

**Scalable Architecture:**
- **High Availability Setup**: Multi-region ArgoCD deployment với load balancing
- **Performance Optimization**: Efficient Git polling với webhook-driven updates
- **Resource Management**: Intelligent cluster resource allocation với cost optimization
- **Federation Patterns**: Hub-and-spoke models supporting thousands of applications

**Security-First Approach:**
- **Zero Trust Architecture**: Pull-based model eliminating cluster credential exposure
- **Policy as Code**: OPA Gatekeeper integration với automated policy enforcement
- **Encryption Everywhere**: End-to-end encryption cho Git repositories và credentials
- **Audit Logging**: Comprehensive activity tracking với centralized log management

**Advanced Analytics:**
- **Deployment Metrics**: Real-time visibility into deployment success rates và performance
- **Drift Detection**: Automated identification của configuration deviations
- **Capacity Planning**: Predictive analysis cho resource requirements
- **Cost Attribution**: Per-application cost tracking với optimization recommendations

### Innovation Leadership:

**Emerging Technology Integration:**
- **AI-Driven Operations**: Machine learning optimizing deployment scheduling và resource allocation
- **Edge Computing**: GitOps patterns extended to edge environments với offline capabilities
- **Serverless Integration**: Event-driven deployments với function-as-a-service platforms
- **Quantum-Ready Architectures**: Future-proof deployment patterns supporting emerging technologies

**Advanced Automation:**
- **Self-Healing Systems**: Automated remediation cho common deployment issues
- **Predictive Deployment**: AI-powered optimal deployment timing based on system load
- **Intelligent Rollbacks**: Context-aware rollback decisions với minimal business impact
- **Automated Optimization**: Continuous performance tuning với ML-driven recommendations

### Implementation Roadmap:

**Phase 1: Foundation (Months 1-2)**
- Core ArgoCD deployment với basic applications
- Git repository structure establishment
- Team training và workflow documentation
- Basic RBAC và security configuration

**Phase 2: Enhancement (Months 3-4)**
- Multi-cluster setup với ApplicationSets
- Progressive delivery implementation
- Advanced monitoring integration
- Security policy enforcement

**Phase 3: Enterprise Integration (Months 5-6)**
- Compliance automation deployment
- Advanced analytics implementation
- Multi-cloud federation setup
- Performance optimization tuning

**Phase 4: Innovation Excellence (Ongoing)**
- AI/ML integration deployment
- Emerging technology adoption
- Continuous process optimization
- Industry leadership development

### Success Metrics:

**Technical Excellence:**
- Deployment success rate: >99.5% automated deployment success
- Recovery time: <5 minutes MTTR với automated rollbacks
- Security compliance: 100% policy adherence với automated enforcement
- Performance optimization: 50-70% reduction trong manual deployment effort

**Business Impact:**
- Development velocity: 300-400% increase trong deployment frequency
- Risk reduction: 90% decrease trong production incidents
- Cost efficiency: 40-60% reduction trong operational overhead
- Compliance assurance: Zero compliance violations với automated reporting

**Organizational Transformation:**
- Developer productivity: 60-80% time savings through automation
- Cross-team collaboration: Unified deployment practices across organization
- Innovation acceleration: Faster experimentation với reliable deployment patterns
- Competitive advantage: Superior deployment capabilities enabling market differentiation

### Future-Ready Strategy:

**Technology Evolution:**
- **Cloud-Native Evolution**: Advanced patterns supporting emerging cloud technologies
- **DevSecOps Integration**: Security-first deployment practices với shift-left security
- **Platform Engineering**: Internal developer platforms built on GitOps foundations
- **Hybrid Cloud Mastery**: Seamless workload management across multiple cloud providers

**Business Alignment:**
- **Customer Experience**: Faster feature delivery improving user satisfaction
- **Revenue Growth**: Reduced time-to-market enabling competitive advantage
- **Risk Management**: Comprehensive audit trails supporting regulatory compliance
- **Innovation Culture**: Reliable infrastructure encouraging experimentation

Modern enterprises require sophisticated deployment capabilities combining automation, security, compliance, observability. GitOps với ArgoCD implementation provides foundation cho operational excellence, enabling organizations achieve sustained competitive advantage through superior software delivery practices.

Investment trong comprehensive GitOps strategy delivers transformative returns through improved deployment reliability, enhanced security posture, accelerated development velocity, reduced operational overhead essential for digital business success.

The future belongs to organizations mastering GitOps excellence, achieving deployment automation, security compliance, operational efficiency enabling rapid adaptation to market demands, consistent service delivery, continuous innovation essential for long-term prosperity trong rapidly evolving digital economy.

Companies implementing advanced GitOps practices position themselves for technological leadership, operational excellence, business success through superior deployment capabilities supporting sustained growth, customer satisfaction, competitive differentiation trong increasingly complex cloud-native landscape.`,
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