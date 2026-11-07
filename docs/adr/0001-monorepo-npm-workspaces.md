# ADR 0001 — Dùng monorepo với npm workspaces

- **Trạng thái:** Đã chấp nhận
- **Ngày:** 2026-11-07

## Bối cảnh

Cần chia sẻ type và zod schema giữa mobile (Expo) và backend (Node). Ba lựa chọn: ba repo riêng, monorepo dùng pnpm, monorepo dùng npm workspaces.

## Quyết định

Dùng **một repo** với **npm workspaces**: `mobile/`, `backend/`, `packages/shared/`.

## Lý do

1. `packages/shared` nhiều khả năng sẽ đổi thường xuyên trong giai đoạn đầu — type của một entity đổi thì cả hai phía cùng đổi. Với polyrepo, mỗi thay đổi cần 2 PR + publish version + bump ở hai repo.
2. npm có sẵn khi cài Node; máy dev hiện chưa có pnpm.
3. Circuit: pnpm + Expo cần thêm `node-linker=hoisted` để Metro hoạt động, đó là một cấu hình thừa so với giá trị mang lại ở quy mô này.
4. CI/CD đơn giản hơn: một pipeline, một lockfile.

## Hệ quả

- **Chấp nhận:** Docker build của backend phải dùng context là root repo (`docker build -f backend/Dockerfile .`), vì image cần `packages/shared`.
- **Chấp nhận:** `npm install` ở root cài cả ba workspace, chậm hơn cài từng phần. Dockerfile giới hạn bằng `--workspace` để tránh kéo dependency của mobile vào image backend.
- **Chấp nhận:** không thể deploy độc lập tuyệt đối — vẫn deploy được riêng từng app vì mỗi app có pipeline riêng.

## Phương án đã loại

| Phương án | Lý do loại |
|---|---|
| Ba repo riêng | Chi phí đồng bộ `shared` lớn hơn lợi ích ở giai đoạn này |
| pnpm workspaces | Máy dev chưa có pnpm; thêm cấu hình `node-linker=hoisted` cho Expo |
| Turborepo/Nx | Chưa có đủ package để cache build mang lại lợi ích; thêm một lớp phải hiểu |
