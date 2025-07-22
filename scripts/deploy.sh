#!/bin/bash

# STEP Website Deployment Script
# Script tự động deploy ứng dụng

set -e

APP_NAME="step-website"
APP_DIR="/var/www/step-website"
BACKUP_DIR="/var/backups/step-website"
DATE=$(date +%Y%m%d_%H%M%S)

echo "=== STEP Website Deployment Script ==="

# Tạo backup trước khi deploy
create_backup() {
    echo "Đang tạo backup..."
    mkdir -p $BACKUP_DIR
    
    # Backup database
    if command -v pg_dump &> /dev/null; then
        pg_dump -h localhost -U step_user step_website > $BACKUP_DIR/db_backup_$DATE.sql
        echo "Database backup: $BACKUP_DIR/db_backup_$DATE.sql"
    fi
    
    # Backup application
    if [[ -d "$APP_DIR" ]]; then
        tar -czf $BACKUP_DIR/app_backup_$DATE.tar.gz -C $APP_DIR .
        echo "Application backup: $BACKUP_DIR/app_backup_$DATE.tar.gz"
    fi
}

# Deploy từ Git repository
deploy_from_git() {
    echo "Đang deploy từ Git repository..."
    cd $APP_DIR
    
    # Stash local changes
    git stash
    
    # Pull latest code
    git pull origin main
    
    # Install/update dependencies
    npm install
    
    # Build application
    npm run build
    
    # Run database migrations
    npm run db:push
    
    echo "Code đã được cập nhật từ Git!"
}

# Deploy từ file zip
deploy_from_zip() {
    read -p "Nhập đường dẫn đến file zip: " zip_path
    
    if [[ ! -f "$zip_path" ]]; then
        echo "File không tồn tại: $zip_path"
        exit 1
    fi
    
    echo "Đang deploy từ file zip..."
    
    # Tạo thư mục tạm
    temp_dir="/tmp/step-deploy-$DATE"
    mkdir -p $temp_dir
    
    # Giải nén
    unzip -q $zip_path -d $temp_dir
    
    # Copy files
    rsync -av --exclude='.env' --exclude='node_modules' --exclude='dist' $temp_dir/ $APP_DIR/
    
    cd $APP_DIR
    
    # Install dependencies
    npm install
    
    # Build application
    npm run build
    
    # Run database migrations
    npm run db:push
    
    # Cleanup
    rm -rf $temp_dir
    
    echo "Deploy từ zip hoàn tất!"
}

# Restart services
restart_services() {
    echo "Đang restart services..."
    
    # Restart application with PM2
    if command -v pm2 &> /dev/null; then
        pm2 reload $APP_NAME || pm2 start ecosystem.config.js --env production
        echo "PM2 đã được restart"
    fi
    
    # Restart Nginx
    if command -v nginx &> /dev/null; then
        sudo nginx -t && sudo systemctl reload nginx
        echo "Nginx đã được reload"
    fi
}

# Health check
health_check() {
    echo "Đang kiểm tra health..."
    
    # Kiểm tra PM2
    if command -v pm2 &> /dev/null; then
        pm2 status $APP_NAME
    fi
    
    # Kiểm tra HTTP response
    sleep 5
    if curl -f http://localhost:3000/health > /dev/null 2>&1; then
        echo "✅ Ứng dụng hoạt động bình thường"
    else
        echo "❌ Ứng dụng có vấn đề"
        pm2 logs $APP_NAME --lines 50
        exit 1
    fi
}

# Rollback function
rollback() {
    echo "Đang rollback..."
    
    # List available backups
    echo "Các backup có sẵn:"
    ls -la $BACKUP_DIR/app_backup_*.tar.gz 2>/dev/null || echo "Không có backup nào"
    
    read -p "Nhập tên file backup để rollback (hoặc Enter để hủy): " backup_file
    
    if [[ -z "$backup_file" ]]; then
        echo "Hủy rollback"
        return
    fi
    
    if [[ ! -f "$BACKUP_DIR/$backup_file" ]]; then
        echo "File backup không tồn tại: $BACKUP_DIR/$backup_file"
        return
    fi
    
    # Stop application
    pm2 stop $APP_NAME
    
    # Restore from backup
    cd $APP_DIR
    tar -xzf $BACKUP_DIR/$backup_file
    
    # Restart
    pm2 start $APP_NAME
    
    echo "Rollback hoàn tất!"
}

# Clean old backups
cleanup_backups() {
    echo "Đang dọn dẹp backup cũ..."
    find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
    find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
    echo "Đã xóa backup cũ hơn 7 ngày"
}

# Main menu
main_menu() {
    echo ""
    echo "=== STEP Website Deployment Menu ==="
    echo "1. Deploy từ Git repository"
    echo "2. Deploy từ file ZIP"
    echo "3. Restart services"
    echo "4. Health check"
    echo "5. Rollback"
    echo "6. Tạo backup"
    echo "7. Dọn dẹp backup cũ"
    echo "8. Xem logs"
    echo "9. Thoát"
    echo ""
    read -p "Nhập lựa chọn (1-9): " choice
    
    case $choice in
        1)
            create_backup
            deploy_from_git
            restart_services
            health_check
            ;;
        2)
            create_backup
            deploy_from_zip
            restart_services
            health_check
            ;;
        3)
            restart_services
            ;;
        4)
            health_check
            ;;
        5)
            rollback
            ;;
        6)
            create_backup
            ;;
        7)
            cleanup_backups
            ;;
        8)
            pm2 logs $APP_NAME
            ;;
        9)
            echo "Thoát script."
            exit 0
            ;;
        *)
            echo "Lựa chọn không hợp lệ!"
            main_menu
            ;;
    esac
}

# Kiểm tra quyền
if [[ $EUID -eq 0 ]]; then
   echo "Script này không nên chạy với quyền root."
   exit 1
fi

# Kiểm tra thư mục ứng dụng
if [[ ! -d "$APP_DIR" ]]; then
    echo "Thư mục ứng dụng không tồn tại: $APP_DIR"
    echo "Vui lòng chạy setup script trước."
    exit 1
fi

# Bắt đầu
main_menu