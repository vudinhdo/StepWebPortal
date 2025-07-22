# STEP Website - Hướng dẫn Deploy trên Server Riêng

## 🚀 Tổng quan

Website STEP Technology Investment Company được xây dựng với React.js + Node.js + PostgreSQL, hỗ trợ deploy trên server riêng với nhiều phương thức khác nhau.

## 📦 Tải Source Code

### Phương thức 1: Download ZIP
```bash
# Chạy script đóng gói (trên Replit)
./package-source.sh

# File zip sẽ được tạo với tên: step-website_YYYYMMDD_HHMMSS.zip
# Upload file này lên server của bạn
```

### Phương thức 2: Git Clone
```bash
# Trên server của bạn
git clone https://github.com/your-repo/step-website.git
cd step-website
```

## 🛠️ Phương thức Deploy

### 1. Deploy Truyền thống (Ubuntu/CentOS)
**Phù hợp với**: VPS, Dedicated Server, Cloud VM

```bash
# Giải nén và vào thư mục
unzip step-website_*.zip
cd step-website

# Chạy script cài đặt tự động
./scripts/setup.sh
```

**Tính năng của setup script:**
- ✅ Cài đặt Node.js 20.x tự động
- ✅ Cài đặt PostgreSQL
- ✅ Thiết lập PM2 cho quản lý process
- ✅ Cấu hình Nginx reverse proxy
- ✅ Thiết lập SSL với Let's Encrypt
- ✅ Cấu hình firewall tự động

### 2. Deploy với Docker (Khuyến nghị)
**Phù hợp với**: Mọi loại server, dễ quản lý

```bash
# Cài đặt Docker (nếu chưa có)
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Deploy ứng dụng
cd step-website
cp .env.example .env
# Chỉnh sửa .env với thông tin server của bạn

# Khởi động tất cả services
docker compose up -d
```

**Tính năng Docker setup:**
- 🐳 PostgreSQL container tự động
- 🌐 Nginx reverse proxy tích hợp
- 📊 Redis cho session storage
- 🔄 Auto-restart khi crash
- 📋 Health check tự động
- 💾 Volume backup tự động

## ⚙️ Cấu hình Môi trường

### File .env cần thiết:
```env
# Database
DATABASE_URL="postgresql://step_user:your_password@localhost:5432/step_website"
PGHOST=localhost
PGPORT=5432
PGUSER=step_user
PGPASSWORD=your_password
PGDATABASE=step_website

# Application
NODE_ENV=production
PORT=3000
SESSION_SECRET="your_very_long_random_string_here"

# Domain
REPLIT_DOMAINS="your-domain.com,www.your-domain.com"
REPL_ID="step-website-production"
```

## 🌐 Cấu hình Domain

### Trỏ DNS:
```
A Record: your-domain.com → IP_SERVER
A Record: www.your-domain.com → IP_SERVER
```

### SSL Certificate:
```bash
# Tự động với Let's Encrypt (trong setup script)
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 📊 Quản lý Ứng dụng

### Với PM2 (Traditional Deploy):
```bash
# Xem status
pm2 status

# Xem logs
pm2 logs step-website

# Restart app
pm2 restart step-website

# Deploy code mới
./scripts/deploy.sh
```

### Với Docker:
```bash
# Xem status containers
docker compose ps

# Xem logs
docker compose logs app

# Restart services
docker compose restart

# Update code mới
git pull && docker compose up -d --build
```

## 🔧 Troubleshooting

### Kiểm tra logs:
```bash
# Traditional deployment
pm2 logs step-website
sudo tail -f /var/log/nginx/error.log

# Docker deployment
docker compose logs app
docker compose logs nginx
```

### Database issues:
```bash
# Kiểm tra PostgreSQL
sudo systemctl status postgresql  # Traditional
docker compose exec postgres psql -U step_user step_website  # Docker
```

### Port conflicts:
```bash
# Kiểm tra port đang sử dụng
sudo netstat -tlnp | grep :3000
sudo netstat -tlnp | grep :80

# Thay đổi port trong .env nếu cần
PORT=8080
```

## 🚀 Performance Optimization

### 1. Database Tuning:
```sql
-- PostgreSQL optimization
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET work_mem = '8MB';
ALTER SYSTEM SET effective_cache_size = '1GB';
SELECT pg_reload_conf();
```

### 2. PM2 Cluster Mode:
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'step-website',
    script: 'dist/index.js',
    instances: 'max',  // Sử dụng tất cả CPU cores
    exec_mode: 'cluster'
  }]
}
```

### 3. Nginx Caching:
```nginx
# Trong nginx.conf
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 📦 Backup & Recovery

### Automated Backup:
```bash
# Chạy script backup hàng ngày
0 2 * * * /var/www/step-website/backup.sh

# Backup script có sẵn:
./scripts/backup.sh
```

### Manual Backup:
```bash
# Database
pg_dump -U step_user step_website > backup_$(date +%Y%m%d).sql

# Application files
tar -czf app_backup_$(date +%Y%m%d).tar.gz .
```

## 🔒 Security Checklist

- ✅ Firewall enabled (chỉ mở port 22, 80, 443)
- ✅ SSL certificate cài đặt
- ✅ Database password mạnh
- ✅ Session secret random
- ✅ Nginx security headers
- ✅ Auto-updates enabled
- ✅ Backup thường xuyên

## 📞 Hỗ trợ

Nếu gặp vấn đề trong quá trình deploy:

1. **Kiểm tra logs** chi tiết
2. **Đọc file hướng dẫn** đầy đủ: `DEPLOYMENT_GUIDE.md`
3. **Sử dụng Docker** nếu gặp vấn đề với traditional deploy
4. **Liên hệ support**: info@step.com.vn

## 📁 Cấu trúc Files

```
step-website/
├── DEPLOYMENT_GUIDE.md      # Hướng dẫn chi tiết
├── DOCKER_DEPLOYMENT.md     # Hướng dẫn Docker
├── README_DEPLOYMENT.md     # File này
├── docker-compose.yml       # Docker setup
├── Dockerfile              # Docker build
├── nginx.conf              # Nginx config
├── ecosystem.config.js     # PM2 config
├── .env.example           # Environment template
├── scripts/
│   ├── setup.sh           # Auto setup script
│   ├── deploy.sh          # Deploy script
│   └── backup.sh          # Backup script
└── package-source.sh      # Package script
```

---

**Thời gian deploy**: 15-30 phút (tùy phương thức)
**Yêu cầu server tối thiểu**: 2GB RAM, 2 CPU cores, 20GB storage