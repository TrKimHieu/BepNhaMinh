# Bếp Nhà Mình — tổng quan

<p align="center">
  <img src="images/logo.png" alt="Logo Bếp Nhà Mình" width="160" height="160">
</p>

## Bài toán

Gia đình nhiều người, mỗi tối đều phải trả lời "mai ăn gì". Hiện tại mọi thứ nằm rải rác trong ghi chú điện thoại và trí nhớ. App gom lại một chỗ: thực đơn theo tuần, công thức nấu, đi chợ.

## Người dùng

| Vai trò | Quyền |
|---|---|
| Owner | Tạo/xoá gia đình, mời thành viên, sửa mọi thực đơn |
| Member | Xem và sửa thực đơn, thêm công thức, bình luận món |

## Phạm vi MVP

- [ ] Đăng ký / đăng nhập bằng email + mật khẩu
- [ ] Tạo gia đình, mời thành viên bằng mã
- [ ] Thêm công thức (tên, ảnh, nguyên liệu, các bước)
- [ ] Xếp công thức vào thực đơn tuần (4 bữa/ngày)
- [ ] Danh sách đi chợ gộp từ thực đơn tuần

**Ngoài phạm vi MVP:** gợi ý món bằng AI, nhắc việc qua push notification, chia sẻ công khai, thanh toán.

## Thành phần

```
Expo app ──HTTP/JSON──> Express API ──Prisma──> PostgreSQL
                              │
                              └──presigned URL──> S3 (ảnh món ăn)
```

- Mobile giữ **access token** trong bộ nhớ, **refresh token** trong SecureStore.
- Ảnh không đi qua API server: mobile xin presigned URL rồi PUT thẳng lên S3.

## Tài liệu liên quan

| File | Nội dung |
|---|---|
| `01-architecture.md` | *(chưa viết)* luồng request, sơ đồ thành phần chi tiết |
| `02-api-contract.md` | Danh sách endpoint, mã lỗi |
| `03-database-schema.md` | *(chưa viết)* bảng, quan hệ, index |
| `04-deployment.md` | *(chưa viết)* runbook deploy / rollback / backup |
| `adr/` | Các quyết định kiến trúc kèm lý do |
