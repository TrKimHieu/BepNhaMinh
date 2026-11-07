# Bếp Nhà Mình

App lên thực đơn và quản lý bữa ăn cho gia đình. Monorepo: Expo (mobile) + Node/Express (backend) + package `shared` dùng chung type và validation.

## Yêu cầu

- Node **24** (`nvm use` — đã có `.nvmrc`)
- npm **11+** (đi kèm Node 24)
- Docker Desktop (cho PostgreSQL local)
- Expo Go trên điện thoại (để chạy thử mobile)

## Chạy lần đầu

```bash
npm install                      # cài toàn bộ workspace, tự build packages/shared
cp backend/.env.example backend/.env
cp mobile/.env.example mobile/.env

npm run db:up                    # bật PostgreSQL local (docker)
npm run db:migrate               # tạo bảng từ prisma/schema.prisma
npm run db:seed                  # dữ liệu mẫu

npm run dev:api                  # http://localhost:3000/api/v1/ping
npm run dev:mobile               # Expo, quét QR bằng Expo Go
```

`mobile/.env` phải trỏ tới **IP LAN** của máy tính, không phải `localhost` — điện thoại hiểu `localhost` là chính nó:

```ini
EXPO_PUBLIC_API_URL=http://192.168.1.10:3000/api/v1
```

## Lệnh thường dùng

| Lệnh | Việc |
|---|---|
| `npm run dev:api` | Backend chế độ watch (tsx) |
| `npm run dev:mobile` | Expo dev server |
| `npm run typecheck` | `tsc --noEmit` toàn workspace |
| `npm run lint` | ESLint toàn workspace |
| `npm test` | Vitest (backend) + Jest (mobile) |
| `npm run build` | Build `shared` rồi build backend |

## Cấu trúc

```
mobile/          Expo app
backend/         Express API + Prisma
packages/shared/ Type + zod schema dùng chung (mobile ↔ backend)
infrastructure/  Docker Compose, nginx, Terraform, script deploy
docs/            Tài liệu + ADR
.github/         CI/CD — PHẢI ở root, GitHub không đọc chỗ khác
```

Chi tiết từng thư mục: `docs/00-overview.md`.

## Ba điều dễ sai nhất

1. **`.env` không bao giờ commit.** Chỉ commit `.env.example`.
2. **Docker build backend phải chạy từ root repo**, vì image cần `packages/shared`:
   ```bash
   docker build -f backend/Dockerfile -t bep-api .
   ```
3. **Biến `EXPO_PUBLIC_*` bị nhúng lúc build.** Đổi URL API phải build lại app, không chỉ sửa `.env`.
