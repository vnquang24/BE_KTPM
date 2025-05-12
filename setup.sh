#!/bin/bash

# Function để kiểm tra lỗi sau mỗi lệnh
check_error() {
  if [ $? -ne 0 ]; then
    echo "Lỗi: $1"
    exit 1
  fi
}

# Phát hiện hệ điều hành
if [ "$(uname)" == "Linux" ]; then
  OS="linux"
elif [ "$OSTYPE" == "msys" ] || [ "$OSTYPE" == "win32" ]; then
  OS="windows"
else
  echo "Hệ điều hành không được hỗ trợ"
  exit 1
fi

# Hỏi người dùng về phương thức clone
echo "Chọn phương thức clone repository:"
echo "1. SSH (git@github.com:vnquang24/...)"
echo "2. HTTPS (https://github.com/vnquang24/...)"
read -p "Nhập lựa chọn của bạn (1 hoặc 2, mặc định là 1): " clone_method

# Thiết lập URL dựa trên lựa chọn
if [ "$clone_method" == "2" ]; then
  FE_REPO="https://github.com/vnquang24/KTPM-FE.git"
  BE_REPO="https://github.com/vnquang24/BE_KTPM.git"
  echo "Đã chọn phương thức clone: HTTPS"
else
  FE_REPO="git@github.com:vnquang24/KTPM-FE.git"
  BE_REPO="git@github.com:vnquang24/BE_KTPM.git"
  echo "Đã chọn phương thức clone: SSH"
fi

# Bước 1: Clone repositories
echo "Bước 1: Clone repositories từ GitHub"
echo "Đang clone Frontend từ: $FE_REPO"
git clone $FE_REPO
check_error "Không thể clone KTPM-FE repository"

echo "Đang clone Backend từ: $BE_REPO" 
git clone $BE_REPO
check_error "Không thể clone BE_KTPM repository"

# Bước 2: Setup Backend
echo "Bước 2: Setup Backend"
cd BE_KTPM/
check_error "Không thể truy cập thư mục BE_KTPM"

echo "Cài đặt các dependencies cho Backend..."
npm install
check_error "Cài đặt dependencies thất bại"

echo "Kiểm tra và sửa lỗi bảo mật..."
npm audit fix
check_error "Không thể sửa lỗi bảo mật"

echo "Khởi động Docker containers..."
docker compose up -d
check_error "Không thể khởi động Docker containers"

echo "Tạo code bằng Zenstack..."
npx zenstack generate
check_error "Không thể tạo code bằng Zenstack"

echo "Khởi tạo dữ liệu mẫu..."
npx prisma db seed
check_error "Không thể khởi tạo dữ liệu mẫu"

# Bước 3: Setup Frontend
echo "Bước 3: Setup Frontend"
cd ..
cd KTPM-FE/
check_error "Không thể truy cập thư mục KTPM-FE"

echo "Cài đặt các dependencies cho Frontend..."
npm install
check_error "Cài đặt dependencies thất bại"

echo "Tạo code bằng Zenstack cho Frontend..."
npx zenstack generate
check_error "Không thể tạo code bằng Zenstack"

# Trở lại thư mục gốc
cd ..

# Bước 4: Tạo Node module ở thư mục gốc để quản lý cả BE và FE
echo "Bước 4: Tạo Node module để chạy đồng thời cả BE và FE"

# Tạo package.json cho module
cat > package.json << 'EOF'
{
  "name": "ktpm-project",
  "version": "1.0.0",
  "description": "KTPM Project with BE and FE",
  "main": "index.js",
  "scripts": {
    "start:be": "cd BE_KTPM && npm run start:dev",
    "start:fe": "cd KTPM-FE && npm run dev",
    "start": "concurrently \"npm run start:be\" \"npm run start:fe\"",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "concurrently": "^8.2.2",
    "open": "^9.1.0"
  }
}
EOF

# Cài đặt dependencies cho module
echo "Cài đặt dependencies (concurrently, open)..."
npm install
check_error "Không thể cài đặt dependencies"

# Tạo script để chạy cả BE và FE bằng Node
cat > start-project.js << 'EOF'
const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const open = require('open');

const isWindows = os.platform() === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

console.log('Khởi động dự án KTPM...');
console.log('Đang chạy Backend và Frontend đồng thời...');

// Chạy npm start để sử dụng concurrently
const proc = spawn(npmCmd, ['start'], {
  stdio: 'inherit',
  shell: true
});

proc.on('error', (error) => {
  console.error(`Lỗi: ${error.message}`);
  process.exit(1);
});

proc.on('close', (code) => {
  if (code !== 0) {
    console.error(`Quá trình kết thúc với mã: ${code}`);
  }
});

// Đợi một thời gian ngắn để front-end khởi động, sau đó mở trình duyệt
console.log('Đang đợi Frontend khởi động...');
setTimeout(async () => {
  try {
    console.log('Đang mở trình duyệt tại địa chỉ http://localhost:3000');
    await open('http://localhost:3000');
  } catch (error) {
    console.error(`Không thể mở trình duyệt: ${error.message}`);
  }
}, 5000); // Đợi 5 giây

console.log('Để dừng ứng dụng, nhấn Ctrl+C');
EOF

# Tạo script khởi động phù hợp với hệ điều hành
if [ "$OS" == "linux" ]; then
  # Tạo script cho Linux
  cat > start-project.sh << 'EOF'
#!/bin/bash
node start-project.js
EOF

  chmod +x start-project.sh
  echo "Script đã được tạo: start-project.sh"
  echo "Để khởi động dự án, chạy lệnh: ./start-project.sh"

elif [ "$OS" == "windows" ]; then
  # Tạo script cho Windows
  cat > start-project.bat << 'EOF'
@echo off
node start-project.js
EOF

  echo "Script đã được tạo: start-project.bat"
  echo "Để khởi động dự án, chạy lệnh: start-project.bat"
fi

echo "Hoàn tất! Dự án đã được cài đặt thành công."