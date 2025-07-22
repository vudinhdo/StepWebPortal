#!/bin/bash

# STEP Website Setup Script
# Tự động thiết lập môi trường cho STEP Website

set -e

echo "=== STEP Website Setup Script ==="
echo "Đang thiết lập môi trường cho STEP Website..."

# Kiểm tra quyền root
if [[ $EUID -eq 0 ]]; then
   echo "Script này không nên chạy với quyền root. Vui lòng chạy với user thường." 
   exit 1
fi

# Phát hiện hệ điều hành
if [[ -f /etc/os-release ]]; then
    . /etc/os-release
    OS=$NAME
    VER=$VERSION_ID
elif type lsb_release >/dev/null 2>&1; then
    OS=$(lsb_release -si)
    VER=$(lsb_release -sr)
else
    OS=$(uname -s)
    VER=$(uname -r)
fi

echo "Hệ điều hành: $OS $VER"

# Cài đặt Node.js
install_nodejs() {
    echo "Đang cài đặt Node.js 20.x..."
    if [[ "$OS" == *"Ubuntu"* ]] || [[ "$OS" == *"Debian"* ]]; then
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt-get install -y nodejs
    elif [[ "$OS" == *"CentOS"* ]] || [[ "$OS" == *"Red Hat"* ]]; then
        curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
        sudo yum install -y nodejs
    else
        echo "Vui lòng cài đặt Node.js 20.x thủ công."
        exit 1
    fi
}

# Cài đặt PostgreSQL
install_postgresql() {
    echo "Đang cài đặt PostgreSQL..."
    if [[ "$OS" == *"Ubuntu"* ]] || [[ "$OS" == *"Debian"* ]]; then
        sudo apt update
        sudo apt install -y postgresql postgresql-contrib
        sudo systemctl start postgresql
        sudo systemctl enable postgresql
    elif [[ "$OS" == *"CentOS"* ]] || [[ "$OS" == *"Red Hat"* ]]; then
        sudo yum install -y postgresql-server postgresql-contrib
        sudo postgresql-setup initdb
        sudo systemctl start postgresql
        sudo systemctl enable postgresql
    fi
}

# Cài đặt PM2
install_pm2() {
    echo "Đang cài đặt PM2..."
    sudo npm install -g pm2
}

# Cài đặt Nginx
install_nginx() {
    echo "Đang cài đặt Nginx..."
    if [[ "$OS" == *"Ubuntu"* ]] || [[ "$OS" == *"Debian"* ]]; then
        sudo apt install -y nginx
    elif [[ "$OS" == *"CentOS"* ]] || [[ "$OS" == *"Red Hat"* ]]; then
        sudo yum install -y nginx
    fi
    sudo systemctl start nginx
    sudo systemctl enable nginx
}

# Thiết lập database
setup_database() {
    echo "Đang thiết lập database..."
    read -p "Nhập password cho database user 'step_user': " db_password
    
    sudo -u postgres psql << EOF
CREATE DATABASE step_website;
CREATE USER step_user WITH ENCRYPTED PASSWORD '$db_password';
GRANT ALL PRIVILEGES ON DATABASE step_website TO step_user;
\q
EOF
    
    echo "Database đã được thiết lập thành công!"
    echo "Lưu password này để cấu hình .env: $db_password"
}

# Thiết lập ứng dụng
setup_application() {
    echo "Đang thiết lập ứng dụng..."
    
    # Tạo thư mục
    sudo mkdir -p /var/www/step-website
    sudo chown $USER:$USER /var/www/step-website
    
    # Copy files nếu đang chạy trong thư mục source
    if [[ -f "package.json" ]]; then
        echo "Copying source files..."
        cp -r . /var/www/step-website/
        cd /var/www/step-website
    else
        cd /var/www/step-website
    fi
    
    # Cài đặt dependencies
    echo "Đang cài đặt dependencies..."
    npm install
    
    # Tạo file .env
    if [[ ! -f ".env" ]]; then
        cp .env.example .env
        echo "File .env đã được tạo. Vui lòng chỉnh sửa thông tin cần thiết."
    fi
    
    # Build application
    echo "Đang build ứng dụng..."
    npm run build
    
    # Tạo thư mục logs
    mkdir -p logs
}

# Thiết lập PM2
setup_pm2() {
    echo "Đang thiết lập PM2..."
    
    # Khởi động ứng dụng
    pm2 start ecosystem.config.js --env production
    pm2 save
    pm2 startup
}

# Thiết lập Nginx
setup_nginx() {
    echo "Đang thiết lập Nginx..."
    read -p "Nhập domain name (ví dụ: step.com.vn): " domain_name
    
    # Tạo file cấu hình Nginx
    sudo tee /etc/nginx/sites-available/step-website > /dev/null << EOF
server {
    listen 80;
    server_name $domain_name www.$domain_name;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    location /assets/ {
        alias /var/www/step-website/dist/public/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

    # Kích hoạt site
    sudo ln -sf /etc/nginx/sites-available/step-website /etc/nginx/sites-enabled/
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # Test và reload Nginx
    sudo nginx -t
    sudo systemctl reload nginx
    
    echo "Nginx đã được cấu hình cho domain: $domain_name"
}

# Thiết lập SSL
setup_ssl() {
    echo "Thiết lập SSL với Let's Encrypt..."
    read -p "Bạn có muốn cài đặt SSL certificate? (y/n): " setup_ssl_choice
    
    if [[ "$setup_ssl_choice" == "y" ]]; then
        sudo apt install -y certbot python3-certbot-nginx
        read -p "Nhập domain name: " domain_name
        sudo certbot --nginx -d $domain_name -d www.$domain_name
        
        # Thiết lập auto-renewal
        echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo crontab -
        echo "SSL đã được thiết lập thành công!"
    fi
}

# Thiết lập firewall
setup_firewall() {
    echo "Đang thiết lập firewall..."
    if command -v ufw &> /dev/null; then
        sudo ufw allow ssh
        sudo ufw allow 'Nginx Full'
        echo "y" | sudo ufw enable
    elif command -v firewall-cmd &> /dev/null; then
        sudo firewall-cmd --permanent --add-service=ssh
        sudo firewall-cmd --permanent --add-service=http
        sudo firewall-cmd --permanent --add-service=https
        sudo firewall-cmd --reload
    fi
    echo "Firewall đã được cấu hình!"
}

# Menu chính
main_menu() {
    echo ""
    echo "=== Chọn chức năng cài đặt ==="
    echo "1. Cài đặt đầy đủ (tự động)"
    echo "2. Cài đặt từng bước"
    echo "3. Chỉ thiết lập ứng dụng"
    echo "4. Thoát"
    echo ""
    read -p "Nhập lựa chọn (1-4): " choice
    
    case $choice in
        1)
            echo "Bắt đầu cài đặt đầy đủ..."
            install_nodejs
            install_postgresql
            install_pm2
            install_nginx
            setup_database
            setup_application
            setup_pm2
            setup_nginx
            setup_ssl
            setup_firewall
            echo "=== Cài đặt hoàn tất! ==="
            ;;
        2)
            step_by_step_menu
            ;;
        3)
            setup_application
            echo "Ứng dụng đã được thiết lập!"
            ;;
        4)
            echo "Thoát script."
            exit 0
            ;;
        *)
            echo "Lựa chọn không hợp lệ!"
            main_menu
            ;;
    esac
}

# Menu từng bước
step_by_step_menu() {
    while true; do
        echo ""
        echo "=== Cài đặt từng bước ==="
        echo "1. Cài đặt Node.js"
        echo "2. Cài đặt PostgreSQL"
        echo "3. Cài đặt PM2"
        echo "4. Cài đặt Nginx"
        echo "5. Thiết lập Database"
        echo "6. Thiết lập Ứng dụng"
        echo "7. Thiết lập PM2"
        echo "8. Thiết lập Nginx"
        echo "9. Thiết lập SSL"
        echo "10. Thiết lập Firewall"
        echo "11. Quay lại menu chính"
        echo ""
        read -p "Nhập lựa chọn (1-11): " step_choice
        
        case $step_choice in
            1) install_nodejs ;;
            2) install_postgresql ;;
            3) install_pm2 ;;
            4) install_nginx ;;
            5) setup_database ;;
            6) setup_application ;;
            7) setup_pm2 ;;
            8) setup_nginx ;;
            9) setup_ssl ;;
            10) setup_firewall ;;
            11) main_menu; break ;;
            *) echo "Lựa chọn không hợp lệ!" ;;
        esac
    done
}

# Bắt đầu script
echo "Chào mừng đến với STEP Website Setup Script!"
main_menu