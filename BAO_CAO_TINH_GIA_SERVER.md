# BÁO CÁO CHI TIẾT: CẤU HÌNH SERVER VÀ CÁCH TÍNH GIÁ

**Công ty Cổ phần Đầu tư Công nghệ STEP**  
**Ngày: 09/11/2025**

---

## MỤC LỤC

1. [Tổng quan hệ thống](#1-tổng-quan-hệ-thống)
2. [Bảng giá thành phần server](#2-bảng-giá-thành-phần-server)
3. [Các gói cấu hình mẫu](#3-các-gói-cấu-hình-mẫu)
4. [Dịch vụ bổ sung](#4-dịch-vụ-bổ-sung)
5. [Công thức tính giá chi tiết](#5-công-thức-tính-giá-chi-tiết)
6. [Ví dụ tính giá cụ thể](#6-ví-dụ-tính-giá-cụ-thể)
7. [Quy trình báo giá](#7-quy-trình-báo-giá)

---

## 1. TỔNG QUAN HỆ THỐNG

Hệ thống **ServerConfigurator** cho phép khách hàng:
- ✅ Tùy chỉnh cấu hình server theo nhu cầu
- ✅ Chọn từ 6 gói cấu hình mẫu
- ✅ Thêm nhiều server với cấu hình khác nhau
- ✅ Chọn GPU chuyên dụng cho AI/ML
- ✅ Chọn hệ điều hành (Windows/Linux/Custom)
- ✅ Thêm dịch vụ bổ sung cho từng server
- ✅ Thêm dịch vụ khác (Hosting, Email, Domain)
- ✅ Áp dụng voucher giảm giá
- ✅ Tính VAT 10%
- ✅ Xuất báo giá PDF chuyên nghiệp

---

## 2. BẢNG GIÁ THÀNH PHẦN SERVER

### 2.1. Thành phần bắt buộc

| Thành phần | Đơn vị | Giá/Đơn vị | Số lượng Min | Số lượng Max | Ghi chú |
|------------|--------|------------|--------------|--------------|---------|
| **CPU** | Core | 60,000 VND/tháng | 1 | 64 | Bắt buộc |
| **RAM** | GB | 60,000 VND/tháng | 1 | 512 | Bắt buộc |
| **SSD** | GB | 3,000 VND/tháng | 1 | 10,000 | Tốc độ cao |
| **HDD** | GB | 1,000 VND/tháng | 1 | 10,000 | Dung lượng lớn |
| **IP Tĩnh** | IP | 100,000 VND/tháng | 1 | 10 | IP đầu tiên miễn phí |
| **Băng thông** | 100Mbps | 100,000 VND/tháng | 1 | 100 | Gói đầu miễn phí |
| **Backup** | GB | 2,000 VND/tháng | 0 | 1,000 | Tùy chọn |

### 2.2. Lưu ý đặc biệt về chi phí

- **IP Tĩnh**: IP đầu tiên MIỄN PHÍ, từ IP thứ 2 trở đi tính phí 100,000 VND/IP/tháng
  - Ví dụ: 1 IP = 0 VND, 3 IP = 200,000 VND (2 IP tính phí)
  
- **Băng thông**: Gói 100Mbps đầu tiên MIỄN PHÍ, từ gói thứ 2 trở đi tính phí 100,000 VND/gói/tháng
  - Ví dụ: 1x100Mbps = 0 VND, 5x100Mbps = 400,000 VND (4 gói tính phí)

### 2.3. GPU Chuyên dụng (Dedicated GPU)

| Model GPU | VRAM | Giá/tháng | Ứng dụng |
|-----------|------|-----------|----------|
| NVIDIA RTX 3060 | 12GB | 1,800,000 VND | Entry-level AI/Gaming |
| NVIDIA RTX 3070 | 8GB | 2,200,000 VND | Mid-range AI/Gaming |
| NVIDIA RTX 3080 | 10GB | 3,000,000 VND | High-end Gaming |
| NVIDIA RTX 3090 | 24GB | 4,500,000 VND | Professional AI |
| NVIDIA RTX 4060 | 8GB | 2,500,000 VND | Latest Gen Entry |
| NVIDIA RTX 4070 | 12GB | 3,500,000 VND | Latest Gen Mid |
| NVIDIA RTX 4080 | 16GB | 5,000,000 VND | Latest Gen High |
| NVIDIA RTX 4090 | 24GB | 7,500,000 VND | Flagship Gaming/AI |
| NVIDIA RTX A4000 | 16GB | 5,000,000 VND | Workstation Pro |
| NVIDIA RTX A5000 | 24GB | 6,000,000 VND | Advanced Workstation |
| NVIDIA RTX A6000 | 48GB | 8,500,000 VND | Enterprise Workstation |
| NVIDIA H100 | 80GB | 15,000,000 VND | AI/ML Supercomputing |
| NVIDIA Tesla T4 | 16GB | 3,500,000 VND | Data Center AI |
| NVIDIA Tesla V100 | 32GB | 8,000,000 VND | HPC & Deep Learning |

### 2.4. Hệ điều hành (Operating System)

| Hệ điều hành | Loại | Giá/tháng |
|--------------|------|-----------|
| Ubuntu 22.04 LTS | Linux | Miễn phí |
| Ubuntu 20.04 LTS | Linux | Miễn phí |
| CentOS Stream 8/9 | Linux | Miễn phí |
| Rocky Linux 8/9 | Linux | Miễn phí |
| AlmaLinux 8/9 | Linux | Miễn phí |
| Debian 11/12 | Linux | Miễn phí |
| Fedora 38 | Linux | Miễn phí |
| Windows Server 2019 | Windows | 500,000 VND |
| Windows Server 2022 | Windows | 600,000 VND |
| **Windows Server Trial** | **Windows Trial** | **Miễn phí (180 ngày)** |
| Hệ điều hành khác | Custom | Miễn phí |

---

## 3. CÁC GÓI CẤU HÌNH MẪU

### 3.1. Basic - Startup (Khởi nghiệp)
**Phù hợp cho**: Website nhỏ, blog cá nhân

| Thành phần | Cấu hình | Giá/tháng |
|------------|----------|-----------|
| CPU | 2 Core | 120,000 VND |
| RAM | 4 GB | 240,000 VND |
| SSD | 40 GB | 120,000 VND |
| IP Tĩnh | 1 IP | 0 VND (miễn phí) |
| Băng thông | 1x100Mbps | 0 VND (miễn phí) |
| Backup | 0 GB | 0 VND |
| OS | Ubuntu 22.04 | 0 VND (miễn phí) |
| **TỔNG** | | **480,000 VND/tháng** |

### 3.2. Pro - Business (Doanh nghiệp vừa)
**Phù hợp cho**: Doanh nghiệp vừa, ứng dụng web

| Thành phần | Cấu hình | Giá/tháng |
|------------|----------|-----------|
| CPU | 4 Core | 240,000 VND |
| RAM | 8 GB | 480,000 VND |
| SSD | 100 GB | 300,000 VND |
| IP Tĩnh | 1 IP | 0 VND (miễn phí) |
| Băng thông | 2x100Mbps | 100,000 VND (1 gói tính phí) |
| Backup | 50 GB | 100,000 VND |
| OS | Ubuntu 22.04 | 0 VND (miễn phí) |
| **TỔNG** | | **1,220,000 VND/tháng** |

### 3.3. Enterprise - High Performance (Hiệu suất cao)
**Phù hợp cho**: Hệ thống lớn, nhiều traffic

| Thành phần | Cấu hình | Giá/tháng |
|------------|----------|-----------|
| CPU | 8 Core | 480,000 VND |
| RAM | 16 GB | 960,000 VND |
| SSD | 200 GB | 600,000 VND |
| IP Tĩnh | 2 IP | 100,000 VND (1 IP tính phí) |
| Băng thông | 5x100Mbps | 400,000 VND (4 gói tính phí) |
| Backup | 100 GB | 200,000 VND |
| OS | Ubuntu 22.04 | 0 VND (miễn phí) |
| **TỔNG** | | **2,740,000 VND/tháng** |

### 3.4. AI/ML - Deep Learning
**Phù hợp cho**: Huấn luyện AI, Machine Learning

| Thành phần | Cấu hình | Giá/tháng |
|------------|----------|-----------|
| CPU | 16 Core | 960,000 VND |
| RAM | 64 GB | 3,840,000 VND |
| SSD | 500 GB | 1,500,000 VND |
| IP Tĩnh | 1 IP | 0 VND (miễn phí) |
| Băng thông | 3x100Mbps | 200,000 VND (2 gói tính phí) |
| Backup | 200 GB | 400,000 VND |
| **GPU** | **NVIDIA RTX 4090** | **7,500,000 VND** |
| OS | Ubuntu 22.04 | 0 VND (miễn phí) |
| **TỔNG** | | **14,400,000 VND/tháng** |

### 3.5. Gaming Server
**Phù hợp cho**: Server game online, streaming

| Thành phần | Cấu hình | Giá/tháng |
|------------|----------|-----------|
| CPU | 8 Core | 480,000 VND |
| RAM | 32 GB | 1,920,000 VND |
| SSD | 300 GB | 900,000 VND |
| IP Tĩnh | 1 IP | 0 VND (miễn phí) |
| Băng thông | 10x100Mbps | 900,000 VND (9 gói tính phí) |
| Backup | 100 GB | 200,000 VND |
| **GPU** | **NVIDIA RTX 4070** | **3,500,000 VND** |
| OS | Windows Server 2022 | 600,000 VND |
| **TỔNG** | | **8,500,000 VND/tháng** |

### 3.6. Database Server
**Phù hợp cho**: MySQL, PostgreSQL, MongoDB

| Thành phần | Cấu hình | Giá/tháng |
|------------|----------|-----------|
| CPU | 8 Core | 480,000 VND |
| RAM | 32 GB | 1,920,000 VND |
| SSD | 500 GB | 1,500,000 VND |
| IP Tĩnh | 1 IP | 0 VND (miễn phí) |
| Băng thông | 3x100Mbps | 200,000 VND (2 gói tính phí) |
| Backup | 500 GB | 1,000,000 VND |
| OS | Ubuntu 22.04 | 0 VND (miễn phí) |
| **TỔNG** | | **5,100,000 VND/tháng** |

---

## 4. DỊCH VỤ BỔ SUNG

### 4.1. Dịch vụ bổ sung cho từng Server

| Dịch vụ | Mô tả | Giá | Loại phí |
|---------|-------|-----|----------|
| **Server Management** | Quản lý server toàn diện, cài đặt phần mềm | 1,000,000 VND | Hàng tháng |
| **Database Optimization** | Tối ưu hóa MySQL, PostgreSQL, MongoDB | 3,000,000 VND | Một lần (one-time) |
| **Migration Service** | Chuyển đổi website/dữ liệu từ hosting khác | 1,000,000 VND | Một lần (per site) |
| **Load Balancer** | Cân bằng tải cho traffic cao | 2,000,000 VND | Hàng tháng |
| **AI/ML Support** | Tư vấn setup TensorFlow, PyTorch, CUDA | 1,500,000 VND | Hàng tháng |
| **Website Speed Optimization** | Phân tích và tối ưu hóa performance website | 500,000 VND | Một lần (one-time) |

**Lưu ý quan trọng**:
- ✅ Phí **hàng tháng** (monthly): Được cộng vào chi phí hàng tháng của server
- ✅ Phí **một lần** (one-time): Chỉ hiển thị trong bảng dịch vụ bổ sung, KHÔNG cộng vào tổng chi phí hàng tháng

### 4.2. Dịch vụ khác từ STEP

| Dịch vụ | Giá cơ bản | Đơn vị |
|---------|------------|--------|
| NVME Hosting | 200,000 VND | /tháng |
| WordPress Hosting | 150,000 VND | /tháng |
| Laravel Hosting | 250,000 VND | /tháng |
| Email 365 | 80,000 VND | /user/tháng |
| Email Workspace | 150,000 VND | /user/tháng |
| Đăng ký tên miền .com | 300,000 VND | /năm |
| Đăng ký tên miền .vn | 500,000 VND | /năm |

---

## 5. CÔNG THỨC TÍNH GIÁ CHI TIẾT

### 5.1. Công thức tính giá cho 1 Server

```
TỔNG CHI PHÍ HÀNG THÁNG = 
  (Chi phí CPU) +
  (Chi phí RAM) +
  (Chi phí Disk) +
  (Chi phí IP - IP đầu miễn phí) +
  (Chi phí Băng thông - gói đầu miễn phí) +
  (Chi phí Backup) +
  (Chi phí GPU) +
  (Chi phí OS) +
  (Chi phí Dịch vụ bổ sung hàng tháng)
```

### 5.2. Các bước tính giá chi tiết

#### Bước 1: Tính chi phí thành phần cơ bản
```
Chi phí CPU = Số core × 60,000 VND
Chi phí RAM = Số GB RAM × 60,000 VND
Chi phí SSD = Số GB SSD × 3,000 VND
Chi phí HDD = Số GB HDD × 1,000 VND
Chi phí Backup = Số GB Backup × 2,000 VND
```

#### Bước 2: Tính chi phí IP (IP đầu tiên miễn phí)
```
Nếu số IP = 1:
  Chi phí IP = 0 VND

Nếu số IP > 1:
  Chi phí IP = (Số IP - 1) × 100,000 VND
  
Ví dụ:
  - 1 IP → 0 VND
  - 3 IP → (3-1) × 100,000 = 200,000 VND
  - 5 IP → (5-1) × 100,000 = 400,000 VND
```

#### Bước 3: Tính chi phí Băng thông (gói đầu miễn phí)
```
Nếu băng thông = 1:
  Chi phí Băng thông = 0 VND

Nếu băng thông > 1:
  Chi phí Băng thông = (Số gói - 1) × 100,000 VND
  
Ví dụ:
  - 1x100Mbps → 0 VND
  - 2x100Mbps → (2-1) × 100,000 = 100,000 VND
  - 10x100Mbps → (10-1) × 100,000 = 900,000 VND
```

#### Bước 4: Tính chi phí GPU
```
Nếu không chọn GPU:
  Chi phí GPU = 0 VND

Nếu có chọn GPU:
  Chi phí GPU = Giá GPU theo bảng (từ 1,800,000 đến 15,000,000 VND)
```

#### Bước 5: Tính chi phí OS
```
Nếu Linux (Ubuntu, CentOS, Rocky, Debian, etc.):
  Chi phí OS = 0 VND (miễn phí)

Nếu Windows Server Trial:
  Chi phí OS = 0 VND (miễn phí 180 ngày)

Nếu Windows Server 2019:
  Chi phí OS = 500,000 VND

Nếu Windows Server 2022:
  Chi phí OS = 600,000 VND

Nếu Custom OS:
  Chi phí OS = 0 VND (miễn phí)
```

#### Bước 6: Tính chi phí Dịch vụ bổ sung (chỉ phí hàng tháng)
```
Chi phí Dịch vụ bổ sung = 
  Tổng các dịch vụ có đuôi "/tháng"
  
Ví dụ:
  - Server Management: 1,000,000 VND/tháng → Cộng vào
  - Load Balancer: 2,000,000 VND/tháng → Cộng vào
  - Database Optimization: 3,000,000 VND/lần → KHÔNG cộng vào (one-time)
  - Website Speed Optimization: 500,000 VND/lần → KHÔNG cộng vào (one-time)
```

#### Bước 7: Tính Subtotal (Tổng trước giảm giá)
```
Subtotal = Tổng các chi phí từ Bước 1-6
```

#### Bước 8: Áp dụng Voucher giảm giá (nếu có)
```
Nếu có Voucher X%:
  Giá sau Voucher = Subtotal × (1 - X/100)
  
Ví dụ:
  - Subtotal: 10,000,000 VND
  - Voucher: 10%
  - Giá sau Voucher = 10,000,000 × (1 - 10/100) = 9,000,000 VND
```

#### Bước 9: Áp dụng VAT (nếu chọn)
```
Nếu chọn bao gồm VAT:
  Giá cuối cùng = Giá sau Voucher × 1.1
  
Nếu không chọn VAT:
  Giá cuối cùng = Giá sau Voucher
  
Ví dụ:
  - Giá sau Voucher: 9,000,000 VND
  - Có VAT: 9,000,000 × 1.1 = 9,900,000 VND
  - Không VAT: 9,000,000 VND
```

### 5.3. Thứ tự tính toán

```
1. Subtotal (Tổng trước giảm giá)
   ↓
2. Áp dụng Voucher (giảm %)
   ↓
3. Áp dụng VAT 10% (nếu chọn)
   ↓
4. Giá cuối cùng
```

**LƯU Ý QUAN TRỌNG**: 
- ✅ Voucher được áp dụng TRƯỚC VAT
- ✅ VAT 10% được tính trên số tiền SAU khi đã giảm Voucher
- ✅ Phí một lần (one-time) KHÔNG cộng vào tổng chi phí hàng tháng

---

## 6. VÍ DỤ TÍNH GIÁ CỤ THỂ

### Ví dụ 1: Website startup cơ bản

**Cấu hình:**
- CPU: 2 Core
- RAM: 4 GB
- SSD: 40 GB
- IP: 1 IP
- Băng thông: 1x100Mbps
- Backup: 0 GB
- GPU: Không
- OS: Ubuntu 22.04
- Dịch vụ bổ sung: Không
- Voucher: Không
- VAT: Có

**Tính toán:**
```
Bước 1: Chi phí cơ bản
  CPU      = 2 × 60,000    = 120,000 VND
  RAM      = 4 × 60,000    = 240,000 VND
  SSD      = 40 × 3,000    = 120,000 VND
  IP       = 0             = 0 VND (IP đầu miễn phí)
  Băng thông = 0           = 0 VND (gói đầu miễn phí)
  Backup   = 0             = 0 VND
  GPU      = 0             = 0 VND
  OS       = 0             = 0 VND (Ubuntu miễn phí)
  Dịch vụ  = 0             = 0 VND

Bước 2: Subtotal
  Subtotal = 480,000 VND

Bước 3: Voucher
  Không có → 480,000 VND

Bước 4: VAT
  480,000 × 1.1 = 528,000 VND

→ TỔNG CHI PHÍ: 528,000 VND/tháng
```

---

### Ví dụ 2: Server AI/ML với GPU

**Cấu hình:**
- CPU: 16 Core
- RAM: 64 GB
- SSD: 500 GB
- IP: 2 IP
- Băng thông: 5x100Mbps
- Backup: 200 GB
- GPU: NVIDIA RTX 4090
- OS: Ubuntu 22.04
- Dịch vụ bổ sung: AI/ML Support (1,500,000 VND/tháng)
- Voucher: 15%
- VAT: Có

**Tính toán:**
```
Bước 1: Chi phí cơ bản
  CPU      = 16 × 60,000   = 960,000 VND
  RAM      = 64 × 60,000   = 3,840,000 VND
  SSD      = 500 × 3,000   = 1,500,000 VND
  IP       = (2-1) × 100,000 = 100,000 VND
  Băng thông = (5-1) × 100,000 = 400,000 VND
  Backup   = 200 × 2,000   = 400,000 VND
  GPU      = 7,500,000     = 7,500,000 VND
  OS       = 0             = 0 VND (Ubuntu miễn phí)
  Dịch vụ  = 1,500,000     = 1,500,000 VND (AI/ML Support)

Bước 2: Subtotal
  Subtotal = 16,200,000 VND

Bước 3: Voucher 15%
  16,200,000 × (1 - 15/100) = 13,770,000 VND

Bước 4: VAT 10%
  13,770,000 × 1.1 = 15,147,000 VND

→ TỔNG CHI PHÍ: 15,147,000 VND/tháng

→ TIẾT KIỆM: 2,430,000 VND (15% voucher)
→ VAT: 1,377,000 VND (10%)
```

---

### Ví dụ 3: Gaming Server với Windows

**Cấu hình:**
- CPU: 8 Core
- RAM: 32 GB
- SSD: 300 GB
- IP: 1 IP
- Băng thông: 10x100Mbps
- Backup: 100 GB
- GPU: NVIDIA RTX 4070
- OS: Windows Server 2022
- Dịch vụ bổ sung: 
  - Server Management (1,000,000 VND/tháng) ← Cộng vào
  - Website Speed Optimization (500,000 VND/lần) ← KHÔNG cộng vào
- Voucher: 10%
- VAT: Có

**Tính toán:**
```
Bước 1: Chi phí cơ bản
  CPU      = 8 × 60,000    = 480,000 VND
  RAM      = 32 × 60,000   = 1,920,000 VND
  SSD      = 300 × 3,000   = 900,000 VND
  IP       = 0             = 0 VND (IP đầu miễn phí)
  Băng thông = (10-1) × 100,000 = 900,000 VND
  Backup   = 100 × 2,000   = 200,000 VND
  GPU      = 3,500,000     = 3,500,000 VND
  OS       = 600,000       = 600,000 VND (Windows 2022)
  Dịch vụ  = 1,000,000     = 1,000,000 VND (chỉ Server Management)

Bước 2: Subtotal
  Subtotal = 9,500,000 VND
  (Lưu ý: Website Speed Optimization 500k KHÔNG cộng vào vì là one-time)

Bước 3: Voucher 10%
  9,500,000 × (1 - 10/100) = 8,550,000 VND

Bước 4: VAT 10%
  8,550,000 × 1.1 = 9,405,000 VND

→ TỔNG CHI PHÍ HÀNG THÁNG: 9,405,000 VND/tháng

→ PHÍ MỘT LẦN (One-time):
  - Website Speed Optimization: 500,000 VND (thanh toán riêng)

→ TIẾT KIỆM: 950,000 VND (10% voucher)
→ VAT: 855,000 VND (10%)
```

---

### Ví dụ 4: Nhiều Server cùng lúc

**Server 1: Web Application**
- CPU: 4 Core → 240,000 VND
- RAM: 8 GB → 480,000 VND
- SSD: 100 GB → 300,000 VND
- IP: 1 → 0 VND
- Băng thông: 2x → 100,000 VND
- Subtotal: 1,120,000 VND
- Voucher 5%: 1,064,000 VND
- VAT 10%: 1,170,400 VND

**Server 2: Database**
- CPU: 8 Core → 480,000 VND
- RAM: 32 GB → 1,920,000 VND
- SSD: 500 GB → 1,500,000 VND
- Backup: 500 GB → 1,000,000 VND
- IP: 1 → 0 VND
- Băng thông: 3x → 200,000 VND
- Subtotal: 5,100,000 VND
- Voucher 10%: 4,590,000 VND
- VAT 10%: 5,049,000 VND

**TỔNG CHI PHÍ CẢ 2 SERVER:**
```
Server 1: 1,170,400 VND/tháng
Server 2: 5,049,000 VND/tháng
─────────────────────────────
TỔNG:     6,219,400 VND/tháng
```

---

## 7. QUY TRÌNH BÁO GIÁ

### 7.1. Quy trình người dùng

```
Bước 1: Điền Thông Tin Khách Hàng
  ├─ Họ tên
  ├─ Số điện thoại
  ├─ Email (BẮT BUỘC) ★
  ├─ Công ty
  └─ Mã số thuế

Bước 2: Chọn Gói Cấu Hình Mẫu (hoặc tùy chỉnh)
  ├─ Basic - Startup
  ├─ Pro - Business
  ├─ Enterprise - High Performance
  ├─ AI/ML - Deep Learning
  ├─ Gaming Server
  └─ Database Server

Bước 3: Tùy Chỉnh Chi Tiết
  ├─ CPU (1-64 Core)
  ├─ RAM (1-512 GB)
  ├─ Disk (SSD/HDD, 1-10,000 GB)
  ├─ IP (1-10 IP)
  ├─ Băng thông (1-100 × 100Mbps)
  ├─ Backup (0-1,000 GB)
  ├─ GPU (14 lựa chọn)
  └─ OS (Linux/Windows/Custom)

Bước 4: Chọn Dịch Vụ Bổ Sung (cho từng server)
  ├─ Server Management
  ├─ Database Optimization
  ├─ Website Speed Optimization
  ├─ Load Balancer
  ├─ AI/ML Support
  └─ Migration Service

Bước 5: Nhập Chu Kỳ Thanh Toán & Voucher
  ├─ Chu kỳ: 1-60 tháng
  ├─ Voucher: 0-100%
  └─ VAT: Bật/Tắt

Bước 6: Thêm Server Mới (nếu cần)
  └─ Lặp lại Bước 2-5 cho server mới

Bước 7: Chọn Dịch Vụ Khác (tùy chọn)
  ├─ Hosting
  ├─ Email
  └─ Domain

Bước 8: Xuất Báo Giá PDF
  └─ Nhấn nút "Xuất Báo Giá PDF"
```

### 7.2. Kiểm tra trước khi xuất PDF

Hệ thống sẽ kiểm tra:

1. ✅ **Email hợp lệ** (bắt buộc phải có dấu @)
   - Nếu không có email → Hiển thị cảnh báo
   
2. ✅ **Hệ điều hành Custom** (nếu chọn "Khác")
   - Nếu chọn "Khác" nhưng không nhập tên → Hiển thị cảnh báo

### 7.3. Nội dung PDF xuất ra

```
┌────────────────────────────────────────────┐
│ CÔNG TY CỔ PHẦN ĐẦU TƯ CÔNG NGHỆ STEP     │
│ Địa chỉ, Văn phòng, Email, MST             │
├────────────────────────────────────────────┤
│        BÁO GIÁ CLOUD SERVER                │
│             Ngày: DD/MM/YYYY               │
├────────────────────────────────────────────┤
│ THÔNG TIN KHÁCH HÀNG                       │
│ - Họ tên: ...                              │
│ - Email: ...                               │
│ - Điện thoại: ...                          │
│ - Công ty: ...                             │
│ - MST: ...                                 │
├────────────────────────────────────────────┤
│ 1. SERVER 1 - [Tên Server]                 │
│                                            │
│ ┌──────────────┬──────────┬──────────┐    │
│ │ Thành phần   │ Cấu hình │ Đơn giá  │    │
│ ├──────────────┼──────────┼──────────┤    │
│ │ CPU          │ X Core   │ XXX VND  │    │
│ │ RAM          │ X GB     │ XXX VND  │    │
│ │ SSD          │ X GB     │ XXX VND  │    │
│ │ IP Tĩnh      │ X IP     │ XXX VND  │    │
│ │ Băng thông   │ Xx100Mbps│ XXX VND  │    │
│ │ Backup       │ X GB     │ XXX VND  │    │
│ │ Dedicated GPU│ Model    │ XXX VND  │    │
│ │ Hệ điều hành │ OS Name  │ XXX VND  │    │
│ │ Chu kỳ       │ X tháng  │          │    │
│ │ Voucher      │ X%       │ Trước VAT│    │
│ └──────────────┴──────────┴──────────┘    │
│                                            │
│ DỊCH VỤ BỔ SUNG (Server 1)                 │
│ ┌──────────────┬──────────┬──────────┐    │
│ │ Dịch vụ      │ Số lượng │ Thành tiền│   │
│ ├──────────────┼──────────┼──────────┤    │
│ │ Server Mgmt  │ 1        │ 1,000k   │    │
│ │ DB Optimize  │ 1 (one-time) │ 3,000k│   │
│ └──────────────┴──────────┴──────────┘    │
│                                            │
│ Chi phí hàng tháng Server 1: XXX VND       │
│ Chi phí một lần Server 1: XXX VND          │
├────────────────────────────────────────────┤
│ 2. SERVER 2 - [Tên Server]                 │
│ (Tương tự...)                              │
├────────────────────────────────────────────┤
│ DỊCH VỤ KHÁC                               │
│ ┌──────────────┬──────────┬──────────┐    │
│ │ Dịch vụ      │ Số lượng │ Thành tiền│   │
│ ├──────────────┼──────────┼──────────┤    │
│ │ NVME Hosting │ 2        │ 400k     │    │
│ │ Email 365    │ 10 user  │ 800k     │    │
│ └──────────────┴──────────┴──────────┘    │
├────────────────────────────────────────────┤
│ TỔNG KẾT                                   │
│ - Tổng trước giảm giá: XXX VND             │
│ - Giảm giá (Voucher X%): -XXX VND          │
│ - Tổng sau giảm giá: XXX VND               │
│ - VAT (10%): +XXX VND                      │
│ ═══════════════════════════════════        │
│ TỔNG CHI PHÍ: XXX VND/tháng                │
├────────────────────────────────────────────┤
│ THÔNG TIN THANH TOÁN                       │
│ • Chủ tài khoản: CÔNG TY CỔ PHẦN...       │
│ • Số tài khoản: 6223399                    │
│ • Ngân hàng: Ngân Hàng Hàng Hải Việt Nam   │
└────────────────────────────────────────────┘
```

### 7.4. Dịch vụ miễn phí kèm theo (mọi gói)

✅ **SSL Certificate**: Miễn phí  
✅ **Monitoring & Alert**: Giám sát 24/7 miễn phí  
✅ **24/7 Support**: Hỗ trợ kỹ thuật miễn phí  
✅ **IP đầu tiên**: Miễn phí  
✅ **Băng thông 100Mbps đầu tiên**: Miễn phí  

---

## 8. TỔNG KẾT & LƯU Ý QUAN TRỌNG

### 8.1. Các điểm cần nhớ

1. ✅ **Email bắt buộc** để xuất PDF
2. ✅ **IP đầu tiên miễn phí**, từ IP thứ 2 mới tính phí
3. ✅ **Băng thông 100Mbps đầu miễn phí**, từ gói thứ 2 mới tính phí
4. ✅ **Phí one-time KHÔNG cộng vào tổng hàng tháng**
5. ✅ **Voucher áp dụng TRƯỚC VAT**
6. ✅ **VAT 10% tính trên giá SAU khi giảm Voucher**
7. ✅ **Có thể cấu hình nhiều server cùng lúc**
8. ✅ **Mỗi server có thể có voucher riêng**
9. ✅ **Windows Server Trial miễn phí 180 ngày**
10. ✅ **Custom OS miễn phí nhưng cần nhập tên**

### 8.2. Công thức tính nhanh

```
GIÁ CUỐI = ((Subtotal - Voucher%) + Phí hàng tháng) × VAT%

Trong đó:
- Subtotal = CPU + RAM + Disk + IP + BW + Backup + GPU + OS
- Phí hàng tháng = Các dịch vụ có "/tháng"
- Voucher% = Giảm giá theo %
- VAT% = 1.1 (nếu chọn) hoặc 1.0 (nếu không)
```

### 8.3. Dịch vụ bổ sung - Phân loại chi phí

**Hàng tháng (cộng vào tổng):**
- Server Management: 1,000,000 VND/tháng
- Load Balancer: 2,000,000 VND/tháng
- AI/ML Support: 1,500,000 VND/tháng

**Một lần (hiển thị riêng):**
- Database Optimization: 3,000,000 VND/lần
- Migration Service: 1,000,000 VND/site
- Website Speed Optimization: 500,000 VND/lần

---

## PHỤ LỤC

### A. Liên hệ & Hỗ trợ

**CÔNG TY CỔ PHẦN ĐẦU TƯ CÔNG NGHỆ STEP**

📍 **Địa chỉ đăng ký**: Xóm 9, Khu 3, Xã Quốc Oai, Hà Nội  
🏢 **Văn phòng**: Số 99 Hoàng Ngân - Phường Nhân Chính - Quận Thanh Xuân - Tp. Hà Nội  
📧 **Email**: info@step.com.vn  
🌐 **Website**: http://step.com.vn/  
🏦 **MST**: 0108230633  

**Thông tin chuyển khoản:**
- 👤 Chủ tài khoản: CÔNG TY CỔ PHẦN ĐẦU TƯ CÔNG NGHỆ STEP
- 💳 Số tài khoản: **6223399**
- 🏦 Ngân hàng: **Ngân Hàng Hàng Hải Việt Nam (MSB - Maritime Bank)**

---

### B. So sánh nhanh các gói

| Gói | CPU | RAM | Disk | Giá/tháng | Phù hợp cho |
|-----|-----|-----|------|-----------|-------------|
| Basic - Startup | 2 Core | 4 GB | 40 GB SSD | ~480k | Website nhỏ |
| Pro - Business | 4 Core | 8 GB | 100 GB SSD | ~1,220k | Doanh nghiệp |
| Enterprise | 8 Core | 16 GB | 200 GB SSD | ~2,740k | Hệ thống lớn |
| AI/ML | 16 Core | 64 GB | 500 GB SSD + RTX 4090 | ~14,400k | AI/ML |
| Gaming | 8 Core | 32 GB | 300 GB SSD + RTX 4070 | ~8,500k | Game Server |
| Database | 8 Core | 32 GB | 500 GB SSD | ~5,100k | Database |

---

**Ngày cập nhật**: 09/11/2025  
**Phiên bản**: 1.0  
**Người lập**: STEP IT Services Team

---

*Báo cáo này cung cấp thông tin chi tiết về hệ thống báo giá Cloud Server của STEP. Mọi thắc mắc xin liên hệ info@step.com.vn*
