// File này để chặn việc chạy nhầm `npx expo start` tại thư mục root của Monorepo.
// Dự án Expo nằm trong thư mục `mobile/`.
console.error('\n' + '='.repeat(60));
console.error('❌ LỖI: Bạn đang chạy Expo từ thư mục ROOT của Monorepo!');
console.error('👉 Vui lòng dừng lệnh này (Ctrl + C) và sử dụng:');
console.error('     npm start');
console.error('   hoặc:');
console.error('     npm run dev:mobile');
console.error('   hoặc chuyển vào thư mục mobile:');
console.error('     cd mobile && npx expo start');
console.error('='.repeat(60) + '\n');

process.exit(1);
