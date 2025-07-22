# Hướng dẫn Deploy STEP Website với Docker

## Yêu cầu

- Docker Engine 20.x+
- Docker Compose 2.x+
- 4GB RAM tối thiểu
- 20GB dung lượng ổ cứng

## Cài đặt Docker

### Ubuntu/Debian:
```bash
# Cập nhật packages
sudo apt update

# Cài đặt dependencies
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release

# Thêm Docker GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Thêm Docker repository
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Cài đặt Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Thêm user vào group docker
sudo usermod -aG docker $USER

# Logout và login lại để áp dụng thay đổi
```

### CentOS/RHEL:
```bash
# Cài đặt dependencies
sudo yum install -y yum-utils

# Thêm Docker repository
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# Cài đặt Docker
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Khởi động Docker
sudo systemctl start docker
sudo systemctl enable docker

# Thêm user vào group docker
sudo usermod -aG docker $USER
```

## Deploy với Docker Compose

### Bước 1: Tải source code
```bash
# Tạo thư mục dự án
mkdir -p /var/www/step-website
cd /var/www/step-website

# Clone repository hoặc copy files
git clone https://github.com/your-repo/step-website.git .
```

### Bước 2: Cấu hình Environment
```bash
# Copy và chỉnh sửa file environment
cp .env.example .env
nano .env
```

**File .env mẫu:**
```env
# Database
POSTGRES_PASSWORD=secure_password_123
DATABASE_URL=postgresql://step_user:secure_password_123@postgres:5432/step_website

# Application
NODE_ENV=production
SESSION_SECRET=your_very_long_session_secret_here
DOMAIN=your-domain.com
REPLIT_DOMAINS=your-domain.com,www.your-domain.com
REPL_ID=step-website-production
PORT=3000

# PostgreSQL connection
PGHOST=postgres
PGPORT=5432
PGUSER=step_user
PGPASSWORD=secure_password_123
PGDATABASE=step_website
```

### Bước 3: Deploy
```bash
# Build và khởi động containers
docker compose up -d

# Xem logs
docker compose logs -f

# Kiểm tra trạng thái
docker compose ps
```

### Bước 4: Thiết lập Database
```bash
# Chạy migrations
docker compose exec app npm run db:push

# Hoặc khởi tạo database với seed data
docker compose exec app npm run db:seed
```

## Quản lý ứng dụng

### Xem logs:
```bash
# Tất cả services
docker compose logs

# Chỉ app
docker compose logs app

# Follow logs real-time
docker compose logs -f app
```

### Restart services:
```bash
# Restart tất cả
docker compose restart

# Restart app only
docker compose restart app

# Restart nginx
docker compose restart nginx
```

### Cập nhật ứng dụng:
```bash
# Pull code mới
git pull origin main

# Rebuild và restart
docker compose up -d --build app

# Hoặc rebuild tất cả
docker compose down
docker compose up -d --build
```

### Backup Database:
```bash
# Tạo backup
docker compose exec postgres pg_dump -U step_user step_website > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore backup
docker compose exec -T postgres psql -U step_user step_website < backup_file.sql
```

## Cấu hình SSL

### Với Let's Encrypt:
```bash
# Cài đặt certbot
sudo apt install certbot

# Tạo certificate
sudo certbot certonly --standalone -d your-domain.com -d www.your-domain.com

# Copy certificates
sudo mkdir -p ./ssl
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem ./ssl/cert.pem
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem ./ssl/key.pem
sudo chown $USER:$USER ./ssl/*
```

### Cập nhật nginx.conf cho SSL:
```nginx
# Uncomment SSL server block trong nginx.conf
server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    # Same location blocks as HTTP
    location / {
        proxy_pass http://step_backend;
        # ... other proxy settings
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

### Restart Nginx:
```bash
docker compose restart nginx
```

## Production Optimizations

### Cấu hình docker-compose.production.yml:
```yaml
version: '3.8'

services:
  app:
    restart: always
    deploy:
      replicas: 3
      resources:
        limits:
          memory: 1G
          cpus: '0.5'
        reservations:
          memory: 512M
          cpus: '0.25'

  postgres:
    restart: always
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1'
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./postgresql.conf:/etc/postgresql/postgresql.conf
    command: postgres -c config_file=/etc/postgresql/postgresql.conf

  nginx:
    restart: always
    deploy:
      resources:
        limits:
          memory: 256M
          cpus: '0.25'

volumes:
  postgres_data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /var/lib/docker/volumes/step_postgres_data
```

### Chạy production mode:
```bash
docker compose -f docker-compose.yml -f docker-compose.production.yml up -d
```

## Monitoring và Logging

### Setup log rotation:
```bash
# Tạo file logrotate
sudo tee /etc/logrotate.d/docker-step > /dev/null << EOF
/var/lib/docker/containers/*/*.log {
    rotate 7
    daily
    compress
    size=50M
    missingok
    delaycompress
    copytruncate
}
EOF
```

### Health check script:
```bash
#!/bin/bash
# health_check.sh

APP_URL="http://localhost:3000/health"
EMAIL="admin@step.com.vn"

if ! curl -f $APP_URL > /dev/null 2>&1; then
    echo "STEP Website is DOWN!" | mail -s "Website Alert" $EMAIL
    docker compose restart app
fi
```

### Cron job cho health check:
```bash
# Thêm vào crontab
echo "*/5 * * * * /var/www/step-website/health_check.sh" | crontab -
```

## Troubleshooting

### Container không khởi động:
```bash
# Xem logs chi tiết
docker compose logs app

# Xem resource usage
docker stats

# Kiểm tra disk space
df -h
docker system df
```

### Database connection issues:
```bash
# Kiểm tra database container
docker compose exec postgres psql -U step_user -d step_website -c "SELECT version();"

# Xem database logs
docker compose logs postgres
```

### Performance issues:
```bash
# Kiểm tra resource usage
docker compose top

# Xem metrics
docker compose exec app node -e "console.log(process.memoryUsage())"
```

### Cleanup:
```bash
# Dọn dẹp containers cũ
docker system prune -a

# Dọn dẹp volumes không sử dụng
docker volume prune

# Dọn dẹp images cũ
docker image prune -a
```

## Backup và Recovery

### Automated backup script:
```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/var/backups/step-website"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Database backup
docker compose exec -T postgres pg_dump -U step_user step_website > $BACKUP_DIR/db_$DATE.sql

# Application files backup
tar -czf $BACKUP_DIR/app_$DATE.tar.gz --exclude=node_modules --exclude=dist .

# Cleanup old backups (keep 7 days)
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
```

### Recovery procedure:
```bash
# Stop services
docker compose down

# Restore database
docker compose up -d postgres
sleep 10
docker compose exec -T postgres psql -U step_user step_website < backup_file.sql

# Restore application
tar -xzf app_backup.tar.gz

# Start all services
docker compose up -d
```

## Security Best Practices

1. **Secrets Management**: Sử dụng Docker secrets hoặc external secret management
2. **Network Security**: Cấu hình custom networks và firewall rules
3. **Regular Updates**: Cập nhật base images thường xuyên
4. **Vulnerability Scanning**: Sử dụng tools như `docker scout`
5. **Access Control**: Hạn chế quyền truy cập containers

```bash
# Scan for vulnerabilities
docker scout cves step-website

# Update base images
docker compose pull
docker compose up -d
```

---

**Lưu ý**: Thay thế các placeholder như `your-domain.com`, `secure_password_123` bằng thông tin thực tế của bạn.