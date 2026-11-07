<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/your-username/bep-nha-minh">
    <img src="docs/images/logo.svg" alt="Bếp Nhà Mình Logo" width="96" height="96">
  </a>

  <h1 align="center">Bếp Nhà Mình</h1>

  <p align="center">
    <strong>Giải pháp lên thực đơn, quản lý món ăn và đi chợ thông minh cho gia đình.</strong>
    <br />
    Hệ thống Monorepo hiện đại xây dựng trên nền tảng React Native (Expo) và Node.js (Express).
    <br />
    <br />
    <a href="docs/00-overview.md"><strong>Khám phá tài liệu »</strong></a>
    &middot;
    <a href="docs/02-api-contract.md">Hợp đồng API</a>
    &middot;
    <a href="https://github.com/your-username/bep-nha-minh/issues/new?labels=bug">Báo lỗi</a>
    &middot;
    <a href="https://github.com/your-username/bep-nha-minh/issues/new?labels=enhancement">Đề xuất tính năng</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary><strong>Mục lục (Table of Contents)</strong></summary>
  <ol>
    <li>
      <a href="#về-dự-án">Về dự án</a>
      <ul>
        <li><a href="#công-nghệ-sử-dụng">Công nghệ sử dụng</a></li>
        <li><a href="#kiến-trúc-hệ-thống">Kiến trúc hệ thống</a></li>
      </ul>
    </li>
    <li>
      <a href="#bắt-đầu">Bắt đầu</a>
      <ul>
        <li><a href="#yêu-cầu-hệ-thống">Yêu cầu hệ thống</a></li>
        <li><a href="#cài-đặt">Cài đặt</a></li>
      </ul>
    </li>
    <li>
      <a href="#hướng-dẫn-sử-dụng">Hướng dẫn sử dụng</a>
      <ul>
        <li><a href="#1-quản-lý-cơ-sở-dữ-liệu-với-docker">1. Quản lý cơ sở dữ liệu với Docker</a></li>
        <li><a href="#2-khởi-chạy-backend-api">2. Khởi chạy Backend API</a></li>
        <li><a href="#3-khởi-chạy-ứng-dụng-mobile-expo">3. Khởi chạy ứng dụng Mobile (Expo)</a></li>
        <li><a href="#bảng-cổng-dịch-vụ-ports--services">Bảng cổng dịch vụ (Ports & Services)</a></li>
        <li><a href="#bảng-tra-cứu-lệnh-command-cheatsheet">Bảng tra cứu lệnh (Command Cheatsheet)</a></li>
      </ul>
    </li>
    <li><a href="#xử-lý-sự-cố-troubleshooting">Xử lý sự cố (Troubleshooting)</a></li>
    <li><a href="#lộ-trình-phát-triển-roadmap">Lộ trình phát triển (Roadmap)</a></li>
    <li><a href="#đóng-góp-contributing">Đóng góp (Contributing)</a></li>
    <li><a href="#giấy-phép-license">Giấy phép (License)</a></li>
    <li><a href="#liên-hệ-contact">Liên hệ (Contact)</a></li>
    <li><a href="#lời-cảm-ơn-acknowledgments">Lời cảm ơn (Acknowledgments)</a></li>
  </ol>
</details>

---

<!-- ABOUT THE PROJECT -->
## Về dự án

Việc quản lý dinh dưỡng gia đình thường gặp khó khăn do dữ liệu món ăn, kế hoạch bữa ăn và danh sách mua sắm nằm rải rác trên nhiều ứng dụng ghi chú hoặc nhóm nhắn tin. 

**Bếp Nhà Mình** cung cấp một giải pháp tập trung, nhất quán và tự động hóa:

- **Thực đơn tuần có cấu trúc**: Phân chia chi tiết 4 bữa/ngày (sáng, trưa, tối, xế) theo từng thành viên.
- **Sổ tay công thức chuẩn hóa**: Lưu trữ định lượng nguyên liệu, đơn vị quy đổi và các bước nấu kèm hình ảnh.
- **Tự động gộp danh sách đi chợ**: Thuật toán tự động tổng hợp khối lượng nguyên liệu từ kế hoạch tuần.
- **Phân quyền gia đình**: Mô hình Owner/Member quản lý quyền chỉnh sửa và mời qua mã định danh.

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

### Công nghệ sử dụng

Dự án sử dụng bộ công nghệ TypeScript toàn diện từ giao diện tới tầng lưu trữ:

* [![TypeScript][TypeScript]][TypeScript-url]
* [![React Native][ReactNative]][ReactNative-url]
* [![Expo][Expo]][Expo-url]
* [![NodeJS][NodeJS]][NodeJS-url]
* [![Express][Express]][Express-url]
* [![Prisma][Prisma]][Prisma-url]
* [![PostgreSQL][PostgreSQL]][PostgreSQL-url]
* [![Docker][Docker]][Docker-url]
* [![Zod][Zod]][Zod-url]
* [![MinIO][MinIO]][MinIO-url]

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

### Kiến trúc hệ thống

Dự án áp dụng mô hình **Monorepo** quản lý bằng **npm workspaces**:

- **`mobile/`**: Ứng dụng di động đa nền tảng React Native (Expo SDK 58, React 19).
- **`backend/`**: Dịch vụ RESTful API Node.js 24, Express 5 và Prisma ORM 6.
- **`packages/shared/`**: Thư viện dùng chung chứa TypeScript Types và Zod Schemas.
- **`infrastructure/`**: Định nghĩa container Docker Compose (PostgreSQL, MinIO), cấu hình Nginx và hạ tầng đám mây.

```
                      +---------------------------------------+
                      |    Mobile App (Expo / React Native)   |
                      +---------------------------------------+
                                    |                 \
                     REST API Calls |                  \ Direct S3 Upload
                        (Port 3000) |                   \ (Presigned URL)
                                    v                    v
+-------------------------------+  +-------------------------------------+
|      @bepnhaminh/shared       |  | Express 5 API Service (Backend)     |
| (Zod Schemas + TS Contracts)  |  +-------------------------------------+
+-------------------------------+         |                     |
                                          v                     v
                                +-------------------+ +-------------------+
                                |   PostgreSQL 16   | |   MinIO (S3 Dev)  |
                                |    (Docker Dev)   | |    (Docker Dev)   |
                                +-------------------+ +-------------------+
```

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

---

<!-- GETTING STARTED -->
## Bắt đầu

Hướng dẫn chuẩn bị và thiết lập môi trường phát triển cục bộ.

### Yêu cầu hệ thống

Đảm bảo các công cụ dưới đây đã được cài đặt trên máy trạm:

- **Node.js**: Phiên bản `>= 22` (khuyến nghị **Node 24** đồng bộ qua [.nvmrc](file:///C:/Projects/BepNhaMinh_Workspace/.nvmrc))
  ```sh
  node -v
  ```
- **npm**: Phiên bản `>= 11` (đi kèm Node 24)
  ```sh
  npm -v
  ```
- **Docker Desktop**: Hỗ trợ Docker Compose v2 để chạy cơ sở dữ liệu
  ```sh
  docker --version
  docker compose version
  ```
- **Môi trường chạy Mobile**:
  - *Thiết bị thực tế*: Cài đặt ứng dụng **Expo Go** trên Android hoặc iOS.
  - *Môi trường giả lập*: Android Studio Emulator hoặc Xcode Simulator (macOS).

### Cài đặt

1. **Sao chép mã nguồn**:
   ```sh
   git clone https://github.com/your-username/bep-nha-minh.git
   cd bep-nha-minh
   ```

2. **Cài đặt dependencies cho toàn bộ workspace**:
   ```sh
   npm install
   ```
   > [!NOTE]
   > Lệnh này sẽ cài đặt toàn bộ gói phụ thuộc cho root, mobile, backend và tự động biên dịch package `@bepnhaminh/shared`.

3. **Khởi tạo tệp biến môi trường**:
   - Trên Linux / macOS:
     ```sh
     cp backend/.env.example backend/.env
     cp mobile/.env.example mobile/.env
     ```
   - Trên Windows PowerShell:
     ```powershell
     Copy-Item backend\.env.example backend\.env
     Copy-Item mobile\.env.example mobile\.env
     ```

4. **Cấu hình địa chỉ mạng nội bộ cho Mobile**:
   Mở file [mobile/.env](file:///C:/Projects/BepNhaMinh_Workspace/mobile/.env.example), cập nhật `EXPO_PUBLIC_API_URL` trỏ tới IP LAN của máy tính:
   ```ini
   EXPO_PUBLIC_API_URL=http://<IP_LAN_CUA_BAN>:3000/api/v1
   ```

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

---

<!-- USAGE EXAMPLES -->
## Hướng dẫn sử dụng

### 1. Quản lý cơ sở dữ liệu với Docker

Cấu hình phát triển cục bộ được lưu trữ tại [infrastructure/docker-compose.dev.yml](file:///C:/Projects/BepNhaMinh_Workspace/infrastructure/docker-compose.dev.yml), bao gồm PostgreSQL 16 và MinIO (giả lập AWS S3).

```sh
# Khởi động dịch vụ nền (PostgreSQL + MinIO)
npm run db:up

# Đồng bộ schema Prisma vào database
npm run db:migrate

# Nạp dữ liệu mẫu ban đầu
npm run db:seed

# Mở giao diện quản trị cơ sở dữ liệu (Prisma Studio)
npm run db:studio
# -> Truy cập http://localhost:5555 trên trình duyệt

# Dừng toàn bộ dịch vụ cơ sở dữ liệu
npm run db:down
```

> [!IMPORTANT]
> **Quy tắc Monorepo Docker Build**: Tệp `backend/Dockerfile` phụ thuộc vào `packages/shared`. Ngữ cảnh đóng gói (build context) **bắt buộc** phải đặt tại thư mục gốc repository:
> ```sh
> # Thực thi từ root repository
> docker build -f backend/Dockerfile -t bep-api:latest .
> ```

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

### 2. Khởi chạy Backend API

Mở cửa sổ terminal độc lập và chạy API ở chế độ tự động reload (`tsx watch`):

```sh
npm run dev:api
```

Kiểm tra trạng thái hoạt động:
- **Trạng thái hệ thống**: [http://localhost:3000/health](http://localhost:3000/health)
- **Kiểm tra kết nối**: [http://localhost:3000/api/v1/ping](http://localhost:3000/api/v1/ping)

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

### 3. Khởi chạy ứng dụng Mobile (Expo)

Mở cửa sổ terminal riêng cho ứng dụng di động:

#### Xác định địa chỉ IP LAN
Thiết bị di động thật coi `localhost` là chính nó. Cần xác định địa chỉ IPv4 của máy tính trên mạng nội bộ:
- **Windows**: Chạy lệnh `ipconfig` trong PowerShell, sao chép giá trị tại mục `IPv4 Address`.
- **macOS / Linux**: Chạy lệnh `ifconfig` hoặc `ip a`.

#### Các phương thức thực thi

- **Phương thức 1: Mạng cục bộ WiFi (Khuyến nghị)**  
  Áp dụng khi điện thoại và máy tính kết nối chung mạng WiFi:
  ```sh
  npm run dev:mobile
  ```
  - *Android*: Sử dụng **Expo Go** quét mã QR trên màn hình terminal.
  - *iOS*: Sử dụng ứng dụng **Camera** quét mã QR để mở qua Expo Go.

- **Phương thức 2: Chế độ Tunnel (Đường hầm)**  
  Áp dụng khi thiết bị sử dụng mạng 4G/5G hoặc router chặn giao tiếp nội bộ (AP Isolation):
  ```sh
  npm run dev:mobile:tunnel
  ```

- **Phương thức 3: Máy ảo giả lập**  
  ```sh
  # Android Studio Emulator
  npm run android -w mobile

  # iOS Simulator (macOS)
  npm run ios -w mobile
  ```

#### Bảng phím điều khiển Expo Terminal

Trong quá trình Expo server hoạt động, nhấn các phím sau trên terminal:

| Phím | Chức năng |
|:---:|---|
| <kbd>r</kbd> | Tải lại (Reload) gói ứng dụng |
| <kbd>m</kbd> | Đóng / mở Developer Menu trên thiết bị |
| <kbd>c</kbd> | Xóa sạch cache Metro Bundler |
| <kbd>j</kbd> | Khởi động trình gỡ lỗi (Debugger) |
| <kbd>a</kbd> | Chuyển tiếp sang Android Emulator |
| <kbd>i</kbd> | Chuyển tiếp sang iOS Simulator |

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

### Bảng cổng dịch vụ (Ports & Services)

| Dịch vụ | Cổng | Đường dẫn / Giao thức | Thông tin xác thực | Mục đích |
|---|:---:|---|---|---|
| **Backend API** | `3000` | `http://localhost:3000/api/v1` | Bearer Token (nếu có) | REST API chính |
| **Health Check** | `3000` | `http://localhost:3000/health` | Không yêu cầu | Giám sát trạng thái |
| **Metro Bundler** | `8081` | `http://localhost:8081` | — | Expo Bundler |
| **PostgreSQL** | `5432` | `localhost:5432` | `bepnhaminh` / `bepnhaminh` | Database |
| **MinIO S3 API** | `9000` | `http://localhost:9000` | — | S3 Mock Endpoint |
| **MinIO Console**| `9001` | `http://localhost:9001` | `bepnhaminh` / `bepnhaminh-secret` | Quản trị Web S3 |
| **Prisma Studio**| `5555` | `http://localhost:5555` | — | Giao diện đồ họa DB |

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

### Bảng tra cứu lệnh (Command Cheatsheet)

| Lệnh | Phạm vi | Mô tả |
|---|---|---|
| `npm run dev:api` | Root | Khởi chạy Express API ở chế độ theo dõi |
| `npm run dev:mobile` | Root | Khởi chạy Expo Dev Server mạng LAN |
| `npm run dev:mobile:tunnel` | Root | Khởi chạy Expo Dev Server qua Tunnel |
| `npm run db:up` | Root | Khởi động PostgreSQL và MinIO trong Docker |
| `npm run db:down` | Root | Tắt và gỡ container Docker cơ sở dữ liệu |
| `npm run db:migrate` | Root | Thực thi migration Prisma schema |
| `npm run db:seed` | Root | Khởi tạo dữ liệu mẫu cho database |
| `npm run db:studio` | Root | Mở giao diện Prisma Studio |
| `npm run build` | Root | Biên dịch `@bepnhaminh/shared` và `backend` |
| `npm run typecheck` | Root | Kiểm tra tính hợp lệ TypeScript toàn dự án |
| `npm run lint` | Root | Kiểm tra định dạng chuẩn với ESLint |
| `npm test` | Root | Thực thi bộ kiểm thử tự động |
| `npm run clean` | Root | Dọn dẹp `node_modules` và thư mục `dist` |

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

---

<!-- TROUBLESHOOTING -->
## Xử lý sự cố (Troubleshooting)

<details>
  <summary><strong>1. Thiết bị di động không kết nối được tới Backend ("Network request failed")</strong></summary>

  - **Hiện tượng**: Gọi API từ app trên điện thoại thất bại hoặc báo timeout.
  - **Biện pháp khắc phục**:
    1. Xác minh Backend đang chạy tại cổng 3000 (`npm run dev:api`).
    2. Đảm bảo điện thoại và máy tính cùng kết nối vào một mạng WiFi.
    3. Kiểm tra biến `EXPO_PUBLIC_API_URL` trong `mobile/.env` đã đặt đúng IP LAN (không dùng `localhost`).
    4. Cấu hình tường lửa máy tính cho phép nhận kết nối đến cổng 3000.
    5. Chuyển sang chế độ kết nối Tunnel: `npm run dev:mobile:tunnel`.
</details>

<details>
  <summary><strong>2. Đã thay đổi IP trong mobile/.env nhưng Expo không cập nhật</strong></summary>

  - **Hiện tượng**: Ứng dụng vẫn gửi request tới địa chỉ IP cũ.
  - **Biện pháp khắc phục**: Biến có tiền tố `EXPO_PUBLIC_*` được nhúng lúc compile và lưu cache trong Metro. Cần xóa sạch cache khi khởi động:
    ```sh
    npx expo start -c mobile
    ```
</details>

<details>
  <summary><strong>3. Đóng gói Docker Backend gặp lỗi "COPY packages/shared: not found"</strong></summary>

  - **Hiện tượng**: Docker build dừng lại ở bước copy dependency.
  - **Biện pháp khắc phục**: Đứng từ thư mục gốc của repository để thực hiện lệnh:
    ```sh
    docker build -f backend/Dockerfile -t bep-api .
    ```
</details>

<details>
  <summary><strong>4. Sửa đổi mã nguồn trong packages/shared nhưng không có hiệu lực</strong></summary>

  - **Hiện tượng**: Backend hoặc Mobile không nhận các type hoặc schema mới.
  - **Biện pháp khắc phục**: Cần biên dịch lại thư viện shared:
    ```sh
    # Biên dịch một lần:
    npm run build -w @bepnhaminh/shared

    # Hoặc bật chế độ tự động theo dõi:
    npm run dev -w @bepnhaminh/shared
    ```
</details>

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

---

<!-- ROADMAP -->
## Lộ trình phát triển (Roadmap)

### Giai đoạn MVP
- [x] Khởi tạo kiến trúc Monorepo (npm workspaces)
- [x] Thiết lập hạ tầng Docker Dev (PostgreSQL 16, MinIO)
- [x] Thiết kế Schema Prisma và Hợp đồng API
- [ ] Xác thực người dùng (Email/Password, JWT Access/Refresh)
- [ ] Quản lý Gia đình và mã mời thành viên
- [ ] Quản lý danh mục công thức món ăn (CRUD + S3 Upload)
- [ ] Lập kế hoạch thực đơn tuần theo 4 bữa/ngày
- [ ] Tự động tổng hợp danh sách đi chợ theo tuần

### Kế hoạch mở rộng
- [ ] Đề xuất thực đơn thông minh bằng trí tuệ nhân tạo (AI/LLM)
- [ ] Nhắc nhở thời gian chuẩn bị bữa qua Push Notification
- [ ] Xuất bản và chia sẻ công thức ra cộng đồng

Theo dõi tiến độ chi tiết tại [Danh sách Issues](https://github.com/your-username/bep-nha-minh/issues).

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

---

<!-- CONTRIBUTING -->
## Đóng góp (Contributing)

Đóng góp mã nguồn giúp dự án hoàn thiện và chất lượng hơn. Quy trình thực hiện như sau:

1. **Fork** dự án về tài khoản GitHub cá nhân.
2. Tạo nhánh làm việc mới:
   ```sh
   git checkout -b feature/TenTinhNang
   ```
3. Thực hiện commit theo chuẩn **Conventional Commits**:
   ```sh
   git commit -m "feat(mobile): bo sung man hinh danh sach di cho"
   ```
4. Đẩy nhánh lên repository:
   ```sh
   git push origin feature/TenTinhNang
   ```
5. Mở một **Pull Request** trên GitHub.

> [!TIP]
> Trước khi mở Pull Request, đảm bảo kiểm tra mã nguồn vượt qua tất cả bài kiểm tra:
> ```sh
> npm run typecheck
> npm run lint
> npm test
> ```

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

---

<!-- LICENSE -->
## Giấy phép (License)

Dự án được phân phối dưới giấy phép **MIT License**. Chi tiết xem tại tệp [LICENSE](LICENSE).

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

---

<!-- CONTACT -->
## Liên hệ (Contact)

Dự án: [https://github.com/your-username/bep-nha-minh](https://github.com/your-username/bep-nha-minh)  
Tài liệu kiến trúc: [docs/00-overview.md](file:///C:/Projects/BepNhaMinh_Workspace/docs/00-overview.md)

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

---

<!-- ACKNOWLEDGMENTS -->
## Lời cảm ơn (Acknowledgments)

* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
* [Expo Documentation](https://docs.expo.dev/)
* [Prisma ORM](https://www.prisma.io/)
* [Shields.io](https://shields.io/)
* [Simple Icons](https://simpleicons.org/)

<p align="right">(<a href="#readme-top">về đầu trang</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/your-username/bep-nha-minh.svg?style=for-the-badge
[contributors-url]: https://github.com/your-username/bep-nha-minh/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/your-username/bep-nha-minh.svg?style=for-the-badge
[forks-url]: https://github.com/your-username/bep-nha-minh/network/members
[stars-shield]: https://img.shields.io/github/stars/your-username/bep-nha-minh.svg?style=for-the-badge
[stars-url]: https://github.com/your-username/bep-nha-minh/stargazers
[issues-shield]: https://img.shields.io/github/issues/your-username/bep-nha-minh.svg?style=for-the-badge
[issues-url]: https://github.com/your-username/bep-nha-minh/issues
[license-shield]: https://img.shields.io/github/license/your-username/bep-nha-minh.svg?style=for-the-badge
[license-url]: https://github.com/your-username/bep-nha-minh/blob/main/LICENSE
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[ReactNative]: https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[ReactNative-url]: https://reactnative.dev/
[Expo]: https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white
[Expo-url]: https://expo.dev/
[NodeJS]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[NodeJS-url]: https://nodejs.org/
[Express]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[Prisma]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Docker]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[Zod]: https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white
[Zod-url]: https://zod.dev/
[MinIO]: https://img.shields.io/badge/MinIO-C72C48?style=for-the-badge&logo=minio&logoColor=white
[MinIO-url]: https://min.io/
