# Hướng dẫn Deploy STEP Website trên Server Riêng

## Yêu cầu hệ thống

### Phần cứng tối thiểu
- **CPU**: 2 cores
- **RAM**: 4GB
- **Ổ cứng**: 20GB dung lượng trống
- **Băng thông**: 100Mbps

### Phần mềm cần thiết
- **Node.js**: Version 18.x hoặc 20.x
- **npm**: Version 9.x trở lên
- **PostgreSQL**: Version 14.x trở lên
- **Git**: Để clone source code

### Hệ điều hành hỗ trợ
- Ubuntu 20.04/22.04 LTS
- CentOS 7/8
- RHEL 8/9
- Windows Server 2019/2022

## Bước 1: Chuẩn bị Server

### Trên Ubuntu/Debian:
```bash
# Cập nhật hệ thống
sudo apt update && sudo apt upgrade -y

# Cài đặt Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Cài đặt PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Cài đặt Git
sudo apt install git -y

# Cài đặt PM2 để quản lý ứng dụng
sudo npm install -g pm2
```

### Trên CentOS/RHEL:
```bash
# Cập nhật hệ thống
sudo yum update -y

# Cài đặt Node.js 20.x
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# Cài đặt PostgreSQL
sudo yum install postgresql-server postgresql-contrib -y
sudo postgresql-setup initdb
sudo systemctl enable postgresql
sudo systemctl start postgresql

# Cài đặt Git
sudo yum install git -y

# Cài đặt PM2
sudo npm install -g pm2
```

## Bước 2: Thiết lập Database

```bash
# Đăng nhập PostgreSQL
sudo -u postgres psql

# Tạo database và user
CREATE DATABASE step_website;
CREATE USER step_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE step_website TO step_user;
\q
```

## Bước 3: Tải Source Code

```bash
# Tạo thư mục cho ứng dụng
sudo mkdir -p /var/www/step-website
sudo chown $USER:$USER /var/www/step-website
cd /var/www/step-website

# Clone source code (thay thế bằng URL repository của bạn)
git clone https://github.com/your-username/step-website.git .

# Hoặc tải file zip và giải nén
# wget https://your-domain.com/step-website.zip
# unzip step-website.zip
```

## Bước 4: Cấu hình Environment

```bash
# Tạo file .env
cp .env.example .env

# Chỉnh sửa file .env
nano .env
```

### Nội dung file .env:
```env
# Database Configuration
DATABASE_URL="postgresql://step_user:your_secure_password@localhost:5432/step_website"
PGHOST=localhost
PGPORT=5432
PGUSER=step_user
PGPASSWORD=your_secure_password
PGDATABASE=step_website

# Application Configuration
NODE_ENV=production
PORT=3000

# Session Secret (tạo random string mạnh)
SESSION_SECRET="your_very_long_random_string_here"

# Domain Configuration
REPLIT_DOMAINS="your-domain.com"
REPL_ID="step-website-production"
ISSUER_URL="https://replit.com/oidc"
```

## Bước 5: Build và Cài đặt Dependencies

```bash
# Cài đặt dependencies
npm install

# Build production
npm run build

# Chạy database migrations
npm run db:push
```

## Bước 6: Thiết lập PM2

Tạo file `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'step-website',
    script: 'dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
```

```bash
# Tạo thư mục logs
mkdir logs

# Khởi động ứng dụng với PM2
pm2 start ecosystem.config.js --env production

# Lưu cấu hình PM2
pm2 save

# Thiết lập PM2 tự khởi động
pm2 startup
```

## Bước 7: Cấu hình Nginx (Reverse Proxy)

```bash
# Cài đặt Nginx
sudo apt install nginx -y  # Ubuntu/Debian
# sudo yum install nginx -y  # CentOS/RHEL

# Tạo file cấu hình
sudo nano /etc/nginx/sites-available/step-website
```

### Nội dung file cấu hình Nginx:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Phục vụ static files
    location /assets/ {
        alias /var/www/step-website/dist/public/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# Kích hoạt site
sudo ln -s /etc/nginx/sites-available/step-website /etc/nginx/sites-enabled/

# Test cấu hình
sudo nginx -t

# Khởi động Nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

## Bước 8: Cài đặt SSL với Let's Encrypt

```bash
# Cài đặt Certbot
sudo apt install certbot python3-certbot-nginx -y

# Lấy SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Thiết lập auto-renewal
sudo crontab -e
# Thêm dòng sau:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

## Bước 9: Thiết lập Firewall

```bash
# UFW (Ubuntu/Debian)
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable

# FirewallD (CentOS/RHEL)
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

## Bước 10: Monitoring và Backup

### Thiết lập monitoring:
```bash
# Xem logs ứng dụng
pm2 logs step-website

# Xem status
pm2 status

# Restart ứng dụng
pm2 restart step-website

# Reload ứng dụng (zero-downtime)
pm2 reload step-website
```

### Thiết lập backup database:
```bash
# Tạo script backup
sudo nano /etc/cron.daily/backup-step-db

#!/bin/bash
BACKUP_DIR="/var/backups/step-website"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

pg_dump -h localhost -U step_user step_website > $BACKUP_DIR/step_db_$DATE.sql
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete

# Cho phép thực thi
sudo chmod +x /etc/cron.daily/backup-step-db
```

## Cập nhật Ứng dụng

```bash
# Vào thư mục ứng dụng
cd /var/www/step-website

# Pull code mới
git pull origin main

# Cài đặt dependencies mới (nếu có)
npm install

# Build lại
npm run build

# Cập nhật database (nếu có)
npm run db:push

# Restart ứng dụng
pm2 reload step-website
```

## Troubleshooting

### Kiểm tra logs:
```bash
# Application logs
pm2 logs step-website

# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-*.log
```

### Kiểm tra services:
```bash
# Kiểm tra PM2
pm2 status

# Kiểm tra Nginx
sudo systemctl status nginx

# Kiểm tra PostgreSQL
sudo systemctl status postgresql
```

### Performance tuning:
```bash
# Tối ưu PostgreSQL
sudo nano /etc/postgresql/*/main/postgresql.conf

# Tăng shared_buffers, work_mem, effective_cache_size
# Restart PostgreSQL sau khi thay đổi
sudo systemctl restart postgresql
```

## Liên hệ hỗ trợ

Nếu gặp vấn đề trong quá trình deploy, vui lòng liên hệ:
- Email: support@step.com.vn
- Hotline: 0985.636.289

---

**Lưu ý**: Thay thế `your-domain.com`, `your_secure_password`, và các thông tin khác bằng thông tin thực tế của bạn.