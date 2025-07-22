#!/bin/bash

# Script đóng gói source code STEP Website
# Tạo file zip chứa toàn bộ source code để deploy

PROJECT_NAME="step-website"
VERSION=$(date +%Y%m%d_%H%M%S)
OUTPUT_FILE="${PROJECT_NAME}_${VERSION}.zip"

echo "=== Đóng gói STEP Website Source Code ==="
echo "Tên file: $OUTPUT_FILE"

# Tạo file zip chứa source code
zip -r $OUTPUT_FILE . \
  -x "node_modules/*" \
  -x "dist/*" \
  -x ".git/*" \
  -x "logs/*" \
  -x "*.log" \
  -x ".env" \
  -x "backups/*" \
  -x "ssl/*" \
  -x "*.zip"

echo "✅ Đã tạo file: $OUTPUT_FILE"
echo "📁 Kích thước: $(du -h $OUTPUT_FILE | cut -f1)"
echo ""
echo "📋 Nội dung package:"
echo "   ✓ Source code ứng dụng"
echo "   ✓ File cấu hình Docker"
echo "   ✓ Scripts deploy tự động"
echo "   ✓ Hướng dẫn deployment"
echo "   ✓ File cấu hình Nginx"
echo ""
echo "🚀 Để deploy trên server:"
echo "   1. Upload file $OUTPUT_FILE lên server"
echo "   2. Giải nén: unzip $OUTPUT_FILE"
echo "   3. Chạy: ./scripts/setup.sh"
echo "   4. Hoặc dùng Docker: docker compose up -d"