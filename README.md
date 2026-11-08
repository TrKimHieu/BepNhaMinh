# Bếp Nhà Mình

<p align="center">
  <img src="docs/images/logo.png" alt="Logo Bếp Nhà Mình" width="180" height="180">
</p>

Ứng dụng lên thực đơn, quản lý công thức và danh sách đi chợ cho gia đình. Monorepo gồm React Native / Expo, backend Express / Prisma và package TypeScript dùng chung.

**Dev mới bắt đầu tại [Chạy thử Expo Go](#expo-go).** Bạn có thể dùng API Render hiện có để mở app trên điện thoại mà chưa cần mật khẩu database, JWT secret hoặc tài khoản Render / Supabase. Sau khi chạy thử, xem [Xin biến từ Scrum Master](#bien-moi-truong) để nhận cấu hình đúng cho task được giao.

## Mục lục

- [Hiện trạng và cấu trúc](#cau-truc)
- [Chuẩn bị](#chuan-bi)
- [Chạy thử Expo Go từng bước](#expo-go)
- [Xin biến môi trường từ Scrum Master](#bien-moi-truong)
- [Chạy backend local](#backend-local)
- [Lệnh thường dùng](#lenh)
- [Xử lý lỗi](#loi)
- [GitHub, Render và Supabase](#deploy)
- [Làm việc với nhóm](#nhom)

<a id="cau-truc"></a>

## Hiện trạng và cấu trúc

Đã có khung ứng dụng, schema database, migration đầu tiên và backend chạy trên Render. Home gọi `/api/v1/ping` để hiển thị trạng thái server. Đăng nhập, quản lý gia đình, CRUD công thức, thực đơn và danh sách đi chợ đang chờ triển khai; trạng thái xanh chưa có nghĩa các chức năng nghiệp vụ đã hoàn tất.

| Thư mục | Nội dung |
|---|---|
| `mobile/` | React Native, Expo SDK 58, React 19, navigation và API client |
| `backend/` | Express 5, Prisma 6, schema và migrations PostgreSQL |
| `packages/shared/` | Types, constants và Zod schemas dùng chung |
| `infrastructure/` | Docker Compose cho PostgreSQL / MinIO local và cấu hình hạ tầng |
| `.github/workflows/` | CI và workflow gọi Render Deploy Hook |
| `docs/` | Tổng quan, API contract và ADR |

```text
Máy dev chạy Expo / Metro ──tải bundle──> Expo Go trên điện thoại
                                                │
                                                └──HTTPS──> API Render
                                                                │
                                                                └──Prisma──> PostgreSQL Supabase
```

Expo / Metro cung cấp mã ứng dụng từ máy dev. API Render chạy độc lập; bạn không cần mở backend local khi chỉ thử app với server online.

<a id="chuan-bi"></a>

## Chuẩn bị

| Công cụ | Yêu cầu |
|---|---|
| Git | Clone repository và làm việc với branch / PR |
| Node.js | Khuyến nghị **Node 24**, khớp [`.nvmrc`](.nvmrc); project khai báo `>=22 <25` |
| npm | Dùng npm đi kèm Node 24; nhóm đang dùng npm 11 |
| IDE | VS Code hoặc trình soạn thảo có terminal |
| Điện thoại | Cài Expo Go từ App Store / Google Play, bản hỗ trợ SDK của project |
| Mạng | Máy tính và điện thoại cùng Wi-Fi để dùng chế độ LAN |

Kiểm tra trên terminal:

```sh
git --version
node --version
npm --version
```

Docker, Android Studio và Xcode không bắt buộc để thử bằng Expo Go trên điện thoại thật. Docker chỉ cần nếu bạn chọn chạy PostgreSQL / MinIO local.

Các lệnh `npm ...` bên dưới dùng được trên macOS, Linux và Windows. Nếu PowerShell báo `npm.ps1 cannot be loaded`, dùng `npm.cmd` thay `npm`, ví dụ `npm.cmd ci`; không cần thay execution policy của máy. Tương tự, dùng `npx.cmd` nếu `npx.ps1` bị chặn.

<a id="expo-go"></a>

## Chạy thử Expo Go từng bước

### Bước 1 — Clone repository

Mở terminal trong thư mục muốn chứa code:

```sh
git clone https://github.com/TrKimHieu/BepNhaMinh.git
cd BepNhaMinh
```

Nếu GitHub báo không có quyền truy cập, xin Scrum Master cấp quyền repository cho tài khoản GitHub của bạn, rồi clone lại. Các lệnh tiếp theo chạy tại **root repository**: thư mục `BepNhaMinh` chứa `package.json` và `package-lock.json`.

### Bước 2 — Cài dependencies

```sh
npm ci
npm run build -w @bepnhaminh/shared
```

Chỉ cài ở root; npm workspaces cài dependencies cho mobile, backend và shared. `npm ci` sử dụng lockfile của repository. Shared có `prepare` tự build khi cài; lệnh build riêng giúp xác nhận package dùng chung đã sẵn sàng.

Nếu cài đặt thất bại, xử lý lỗi trước khi đi tiếp. Không tự xóa lockfile hoặc nâng Expo / React Native để bỏ qua lỗi.

### Bước 3 — Tạo cấu hình mobile để chạy thử

Nếu chưa có `mobile/.env`, copy file mẫu.

**Windows PowerShell:**

```powershell
Copy-Item mobile/.env.example mobile/.env
```

**macOS / Linux:**

```sh
cp mobile/.env.example mobile/.env
```

Nếu đã có `.env`, sửa file hiện tại thay vì copy đè. Mở `mobile/.env`, đặt dòng sau rồi lưu:

```dotenv
EXPO_PUBLIC_API_URL=https://bepnhaminh-api.onrender.com/api/v1
```

Đây là URL công khai để thử server hiện có; giữ `/api/v1` ở cuối. Bạn chưa cần tạo `backend/.env` hoặc xin database password / JWT secret ở bước này.

Khi bắt đầu task, **xin biến `EXPO_PUBLIC_API_URL` từ Scrum Master để mobile gọi đúng API dev / staging được phân công**. Không thay đổi dữ liệu dùng chung nếu chưa được giao việc.

### Bước 4 — Kiểm tra API trên trình duyệt

Mở trên máy tính hoặc điện thoại:

- [Health check](https://bepnhaminh-api.onrender.com/health): JSON có `"status":"ok"`.
- [Ping](https://bepnhaminh-api.onrender.com/api/v1/ping): JSON có `"pong":true`.

Đường dẫn `/` không phải giao diện website; hãy kiểm tra đúng hai endpoint trên. Nếu service dùng Render Free và đang ngủ, request đầu có thể mất khoảng một phút. Đợi `/health` phản hồi rồi kiểm tra app. Xem [giới hạn Render Free](https://render.com/docs/free).

### Bước 5 — Mở Expo

Tại root:

```sh
npm run start -w mobile -- --clear --go
```

`--clear` xóa cache Metro, `--go` chọn Expo Go. Terminal sẽ hiện mã QR và địa chỉ development server.

**Giữ terminal mở khi dùng Expo Go.** Nếu chưa có Expo đang chạy, mở terminal mới và chạy lệnh trên; không cần tìm tiến trình để dừng. Muốn restart thì nhấn `Ctrl + C` tại terminal đang chạy Expo, sau đó chạy lại.

Không chạy trực tiếp `npx expo start` ở root: Expo project nằm trong `mobile/`, và Metro tại root chủ động báo lỗi để tránh chạy nhầm. Cách tương đương là vào `mobile` rồi chạy `npx expo start --clear --go`.

### Bước 6 — Quét QR trên điện thoại

1. Kết nối điện thoại và máy tính cùng Wi-Fi.
2. Android: mở Expo Go và dùng chức năng quét QR. iPhone: dùng Camera quét QR rồi chọn mở bằng Expo Go.
3. Đợi tải bundle từ máy dev.
4. Trên Home, xem **Thông tin kết nối**: API Base URL phải đúng URL Render ở trên, có thời điểm phản hồi, dấu ✓ xanh và chữ “Server Bếp Nhà Mình đang hoạt động”.

Màu xanh xác nhận điện thoại gọi được `/ping`; endpoint này chưa kiểm tra truy vấn database hoặc đăng nhập. Hiện chưa có tài khoản demo đăng nhập hoạt động.

Nếu Wi-Fi chặn LAN hoặc điện thoại dùng mạng khác, dừng Expo rồi chạy:

```sh
npm run start -w mobile -- --clear --go --tunnel
```

Nếu Expo hỏi cài công cụ hỗ trợ tunnel, làm theo lời nhắc rồi quét **QR mới**. Tunnel giúp tải bundle từ máy dev; API vẫn dùng URL Render trong `.env`. Xem [hướng dẫn Expo](https://docs.expo.dev/get-started/start-developing/).

### Bước 7 — Báo kết quả và xin cấu hình cho task

Báo Scrum Master: đã clone repo, cài dependencies, mở Home trên Expo Go và thấy trạng thái API xanh. Nếu lỗi, gửi tên bước, hệ điều hành, phiên bản Node / npm và log đã che secret. Sau đó xin đúng các biến dưới đây theo công việc được giao.

<a id="bien-moi-truong"></a>

## Xin biến môi trường từ Scrum Master

### Cần xin biến nào để làm gì?

| Công việc | Yêu cầu gửi Scrum Master | Nơi điền |
|---|---|---|
| Dev mobile với API của nhóm | **Xin biến `EXPO_PUBLIC_API_URL` từ Scrum Master để gọi đúng API dev / staging.** Giá trị phải có `/api/v1`. | `mobile/.env` |
| Backend dùng database Supabase dev | **Xin biến `DATABASE_URL` từ Scrum Master để Prisma kết nối database dev được cấp.** Không tự lấy database production. | `backend/.env` |
| Phát triển xác thực trên backend local | **Xin `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `JWT_ACCESS_TTL`, `JWT_REFRESH_TTL` từ Scrum Master để cấu hình ký / kiểm tra token và thời hạn token của môi trường dev.** | `backend/.env` |
| Chạy backend theo cấu hình nhóm | **Xin `NODE_ENV`, `PORT`, `CORS_ORIGIN`, `AWS_REGION`, `S3_BUCKET` từ Scrum Master để thống nhất chế độ chạy, cổng API, CORS và cấu hình lưu ảnh dự kiến.** | `backend/.env` |
| Sửa schema / áp dụng migration lên DB dùng chung | **Xin `DATABASE_URL` đúng môi trường và xác nhận thao tác từ Scrum Master để cập nhật đúng database, tránh ảnh hưởng dev khác.** | `backend/.env` và migration trong PR |
| Được giao quản lý deploy | **Xin quyền GitHub / Render và `RENDER_DEPLOY_HOOK_URL` từ Scrum Master để GitHub Actions gọi deploy.** | GitHub Actions secret; không đặt trong mobile |

Chỉ làm mobile với API online thì cần `mobile/.env`; không cần xin JWT secret, database password hoặc quyền quản trị Supabase. Nếu chạy backend + database hoàn toàn local, file mẫu và Docker Compose có cấu hình local; xin Scrum Master xác nhận bộ giá trị dev cần dùng.

### Tất cả biến backend hiện được code đọc

Đối chiếu [file mẫu](backend/.env.example) và [bộ kiểm tra cấu hình](backend/src/config/env.ts):

| Biến | Mục đích / yêu cầu |
|---|---|
| `NODE_ENV` | `development`, `test` hoặc `production`; local dùng `development` |
| `PORT` | Cổng API local, mặc định `3000`; Render tự cấp `PORT` |
| `DATABASE_URL` | URI PostgreSQL gồm thông tin đăng nhập; bắt buộc có giá trị |
| `JWT_ACCESS_SECRET` | Khóa ký access token; bắt buộc ít nhất 32 ký tự |
| `JWT_REFRESH_SECRET` | Khóa ký refresh token; bắt buộc ít nhất 32 ký tự và dùng giá trị khác access secret |
| `JWT_ACCESS_TTL` | Thời hạn access token; mặc định `15m` |
| `JWT_REFRESH_TTL` | Thời hạn refresh token; mặc định `7d` |
| `CORS_ORIGIN` | Origin cho phép; nhiều origin phân cách bằng dấu phẩy; local có thể dùng `*` |
| `AWS_REGION` | Vùng S3 dự kiến; mặc định `ap-southeast-1` |
| `S3_BUCKET` | Tên bucket; hiện bắt buộc để server qua bước kiểm tra cấu hình, upload ảnh chưa được triển khai |

Nếu Supabase hiển thị `DATABASE_URL` / `DIRECT_URL`, đừng dán cả hai một cách máy móc. **Prisma schema hiện chỉ đọc `DATABASE_URL`**. Xin Scrum Master cung cấp chuỗi đã chọn; khi setup project đã dùng Session pooler có host `…pooler.supabase.com`, cổng `5432`. `DIRECT_URL` chưa được nối vào schema hiện tại.

### Mẫu tin nhắn xin cấu hình

```text
Em đã clone repo và thử Expo Go [thành công / lỗi ở bước ...].
Em đang làm task ... trên môi trường dev/staging ...
Nhờ Scrum Master cung cấp qua kênh riêng:
- EXPO_PUBLIC_API_URL: để mobile gọi đúng API của môi trường.
- Nếu cần backend local: DATABASE_URL, bộ JWT và các biến backend dev tương ứng.
Nhờ xác nhận database em được dùng và em có được phép chạy migration hay không.
```

### Quy tắc `.env`

- File mobile là `mobile/.env`; file backend là `backend/.env`. Đây là hai file riêng. Sửa `.env.example` không thay đổi cấu hình ứng dụng đang chạy.
- Không copy đè `.env` đã có. Sửa đúng dòng và lưu file.
- Không commit `.env`, mật khẩu, JWT secret hoặc Deploy Hook. Chỉ commit `.env.example` với placeholder khi cần thêm biến.
- `EXPO_PUBLIC_*` là dữ liệu công khai trong bundle. Không đặt JWT secret, mật khẩu database hoặc service role key trong mobile, kể cả dưới tên biến khác. Xem [tài liệu Expo về biến môi trường](https://docs.expo.dev/guides/environment-variables/).
- Sau khi đổi URL mobile: dừng Expo rồi start lại với `--clear`. Bản app đã build cần build / update bundle tương ứng.
- Sau khi đổi backend `.env`: restart backend.
- Che secret trong log / ảnh; nhận cấu hình qua kênh riêng do Scrum Master cung cấp.

<a id="backend-local"></a>

## Chạy backend local

Phần này dành cho dev sửa API / schema; có thể bỏ qua nếu chỉ thử mobile với Render.

### 1. Tạo file và nhận cấu hình

Nếu chưa có `backend/.env`, copy file mẫu từ root:

```powershell
# Windows PowerShell
Copy-Item backend/.env.example backend/.env
```

```sh
# macOS / Linux
cp backend/.env.example backend/.env
```

Điền bộ biến dev nhận từ Scrum Master. Các giá trị local trong file mẫu không phải credentials Supabase. Chọn một cách database bên dưới.

### 2A. PostgreSQL local bằng Docker

Mở Docker Desktop trước. Dùng kết nối khớp Compose trong `backend/.env`:

```dotenv
DATABASE_URL="postgresql://bepnhaminh:bepnhaminh@localhost:5432/bepnhaminh?schema=public"
```

Tại root:

```sh
npm run db:up
npm run db:generate -w backend
npm run db:deploy -w backend
```

`db:up` mở PostgreSQL tại cổng `5432` và MinIO tại `9000` / `9001`. Đợi PostgreSQL healthy rồi áp dụng migration có sẵn bằng `db:deploy`.

Tùy chọn, chỉ trên database local riêng:

```sh
npm run db:seed
```

Seed dùng password hash placeholder, **không tạo tài khoản đăng nhập hoạt động**. Chạy nhiều lần có thể thêm công thức trùng; không seed database dùng chung nếu chưa thống nhất.

### 2B. Supabase dev được cấp

Xin `DATABASE_URL` từ Scrum Master, thay nguyên giá trị trong `backend/.env`, rồi generate Prisma Client:

```sh
npm run db:generate -w backend
```

Chỉ khi được giao áp dụng migration lên database đó, chạy:

```sh
npm run db:deploy -w backend
```

Kiểm tra dòng `Datasource` trong output: phải đúng host / database dự kiến. `localhost:5432` là máy bạn, không phải Supabase. Nếu tự điền password vào URI, ký tự đặc biệt trong phần password phải được URL-encode. Xem [hướng dẫn Supabase](https://supabase.com/docs/guides/database/connecting-to-postgres).

Không chạy `prisma migrate reset` hoặc `db:migrate` lên database dùng chung. `db:migrate` dùng `prisma migrate dev`, dành cho tạo migration trên database phát triển riêng; thống nhất schema và commit migration qua PR.

### 3. Chạy API local

Tại root, trong terminal riêng:

```sh
npm run build -w @bepnhaminh/shared
npm run dev:api
```

Giữ terminal mở. Kiểm tra [health local](http://localhost:3000/health) và [ping local](http://localhost:3000/api/v1/ping); thay cổng nếu `PORT` khác `3000`.

### 4. Điện thoại gọi API local

1. Tìm IPv4 LAN của máy: Windows dùng `ipconfig`; macOS / Linux xem cấu hình Wi-Fi hoặc dùng `ifconfig` / `ip a` nếu có.
2. Sửa `mobile/.env`, ví dụ máy có IP `192.168.1.10`:

   ```dotenv
   EXPO_PUBLIC_API_URL=http://192.168.1.10:3000/api/v1
   ```

3. Máy và điện thoại cùng Wi-Fi; cho phép Node.js nhận kết nối trên mạng riêng nếu firewall hỏi.
4. Mở terminal khác ở root và chạy `npm run start -w mobile -- --clear --go`.
5. Thử `http://<IP_LAN>:3000/health` trên điện thoại trước khi kiểm tra app.

`localhost` trên điện thoại là chính điện thoại. Expo tunnel chỉ chuyển tiếp Metro, không tự đưa API local ra internet; để thử từ mạng khác, dùng API online do Scrum Master cung cấp.

<a id="lenh"></a>

## Lệnh thường dùng

Chạy từ root, trừ khi ghi khác:

| Lệnh | Mục đích |
|---|---|
| `npm ci` | Cài dependencies theo lockfile |
| `npm run start -w mobile -- --clear --go` | Expo Go, xóa cache |
| `npm run start -w mobile -- --clear --go --tunnel` | Expo Go qua tunnel |
| `npm run build -w @bepnhaminh/shared` | Build shared |
| `npm run dev -w @bepnhaminh/shared` | Build shared khi source thay đổi |
| `npm run dev:api` | API local với auto reload |
| `npm run db:up` / `npm run db:down` | Bật / tắt DB và MinIO local |
| `npm run db:generate -w backend` | Generate Prisma Client |
| `npm run db:deploy -w backend` | Áp dụng migration có sẵn lên DB đang cấu hình |
| `npm run db:migrate -w backend -- --name ten_thay_doi` | Tạo migration trên DB phát triển riêng |
| `npm run db:studio` | Prisma Studio với DB đang cấu hình |
| `npm run build` | Build shared và backend |
| `npm run typecheck` | Kiểm tra TypeScript các workspace |
| `npm run lint` | ESLint |
| `npm test` | Test hiện có |

<a id="loi"></a>

## Xử lý lỗi

| Hiện tượng | Cách xử lý |
|---|---|
| Clone báo repository not found / permission denied | Xin Scrum Master quyền repo cho đúng tài khoản GitHub; kiểm tra URL clone |
| PowerShell chặn `npm.ps1` | Dùng `npm.cmd` thay `npm`; dùng `npx.cmd` nếu cần |
| Expo báo chạy nhầm root monorepo | Dùng `npm run start -w mobile -- --clear --go` |
| Không resolve `@bepnhaminh/shared` | Cài dependencies tại root, build shared rồi restart Expo với `--clear` |
| Không thấy terminal Expo để dừng | Mở terminal mới rồi start; không cần dừng khi chưa chạy |
| Quét QR không mở được app | Kiểm tra Wi-Fi, quyền mạng local của Expo Go, firewall / VPN; thử `--tunnel` và quét QR mới |
| Expo Go báo SDK không tương thích | Project dùng SDK 58; kiểm tra Expo Go hỗ trợ và trao đổi Scrum Master, không tự nâng dependencies |
| Home đỏ nhưng app đã mở | Xem API Base URL; mở `/health` trên điện thoại, đợi server thức dậy rồi reload bằng phím `r` tại terminal |
| URL cũ dù đã sửa `.env` | Lưu đúng `mobile/.env`; kiểm tra `.env.local` / biến shell ghi đè; restart Expo với `--clear` |
| Backend thiếu biến / JWT secret ngắn | Sửa `backend/.env`, xin bộ biến dev từ Scrum Master; mỗi secret ít nhất 32 ký tự |
| Prisma P1001 tại `localhost:5432` | Nếu dùng Docker, mở Docker rồi `db:up`; nếu dùng Supabase, sửa `DATABASE_URL` sang URI được cấp và lưu |
| API xanh nhưng không đăng nhập / CRUD được | `/ping` là smoke test; các module nghiệp vụ chưa hoàn tất |

Nếu vẫn lỗi, gửi log từ dòng lỗi đầu, hệ điều hành, Node / npm version và cách tái hiện cho Scrum Master hoặc dev phụ trách; che credentials.

<a id="deploy"></a>

## GitHub, Render và Supabase

- Repository: [TrKimHieu/BepNhaMinh](https://github.com/TrKimHieu/BepNhaMinh).
- API: `https://bepnhaminh-api.onrender.com/api/v1`.
- Render build [backend/Dockerfile](backend/Dockerfile) với context là **root repository** vì cần shared. Build local bằng `docker build -f backend/Dockerfile -t bepnhaminh-api .`.
- Supabase cung cấp PostgreSQL qua Prisma; Supabase Auth / Storage chưa được dùng cho nghiệp vụ hiện tại.
- [CI](.github/workflows/ci.yml) kiểm tra typecheck, lint, test khi mở PR hoặc push `main`.
- [Deploy backend](.github/workflows/deploy-backend.yml) gọi Render Deploy Hook khi push `main` có thay đổi `backend/**`, `packages/shared/**`, `infrastructure/**` hoặc workflow đó; hỗ trợ chạy thủ công qua `workflow_dispatch`.
- Xin `RENDER_DEPLOY_HOOK_URL` từ Scrum Master nếu được giao deploy. Lưu tại **GitHub repo → Settings → Secrets and variables → Actions**. Job dùng environment `production`, có thể chịu quy tắc bảo vệ environment của repo.
- Workflow deploy hiện độc lập với CI, chưa chờ CI thành công. Hook thành công chỉ xác nhận nhận yêu cầu deploy; xem kết quả build / runtime trên Render.
- **Migration chưa tự động chạy khi Render khởi động.** Docker CMD hiện chỉ chạy server; người phụ trách phải phối hợp migration riêng. Push schema không tự cập nhật database.
- Service hiện được cấu hình qua Render Dashboard. Dev mới chỉ chạy Expo Go không cần tạo service Render, project Supabase hoặc Blueprint riêng; liên hệ Scrum Master nếu được giao thay đổi hạ tầng.

<a id="nhom"></a>

## Làm việc với nhóm

Sau khi chạy thử và nhận cấu hình cho task, tạo nhánh:

```sh
git switch -c feature/ten-task
```

Trước khi mở PR:

```sh
npm run build -w @bepnhaminh/shared
npm run db:generate -w backend
npm run typecheck
npm run lint
npm test
```

Không commit secret. Khi thêm biến, cập nhật `.env.example` và README: ghi rõ phải xin biến nào từ Scrum Master để thực hiện việc gì. Với schema, commit migration và mô tả ảnh hưởng dữ liệu trong PR.

| Tài liệu | Nội dung |
|---|---|
| [Tổng quan](docs/00-overview.md) | Bài toán, vai trò và phạm vi MVP |
| [API contract](docs/02-api-contract.md) | Endpoint dự kiến; đối chiếu code route để biết phần đã triển khai |
| [ADR monorepo](docs/adr/0001-monorepo-npm-workspaces.md) | Quyết định dùng npm workspaces |
| [Prisma schema](backend/prisma/schema.prisma) | Models, quan hệ và enums |
| [Mobile env mẫu](mobile/.env.example) | Biến mobile công khai |
| [Backend env mẫu](backend/.env.example) | Tên biến backend; xin giá trị theo môi trường từ Scrum Master |

### Logo ứng dụng

Logo chính thức được lưu tại [mobile/assets/images/logo.png](mobile/assets/images/logo.png); bản dùng cho tài liệu ở [docs/images/logo.png](docs/images/logo.png). Hai file giữ nguyên ảnh gốc được cung cấp, gồm nền kem.

Home và cấu hình icon iOS / Android / favicon dùng asset trong `mobile`. Sau khi pull code mới, reload Expo Go hoặc khởi động lại với `npm run start -w mobile -- --clear --go` để thấy logo Home. Icon của ứng dụng cài riêng cần build lại; Expo Go trên màn hình điện thoại vẫn có icon của chính Expo Go. Khi thay logo, cập nhật cả hai bản PNG để tài liệu và ứng dụng đồng bộ.

Mục tiêu MVP tiếp theo: xác thực email / password, gia đình và mã mời, công thức và ảnh, thực đơn tuần, danh sách đi chợ. Những phần này cần được phát triển và kiểm thử riêng sau bước thiết lập môi trường.
