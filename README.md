# Lời thương kể bằng cuộn trang

Website tỏ tình dạng scrollytelling, xây bằng React 18, Vite, GSAP ScrollTrigger, Lenis, Framer Motion, tsParticles, Howler.js, canvas-confetti và TailwindCSS.

## Chạy project

Yêu cầu Node.js 18 trở lên.

```bash
npm install
npm run dev
```

Mở địa chỉ Vite hiển thị trong terminal, mặc định là `http://localhost:5173`.

Kiểm tra bản production:

```bash
npm run lint
npm run build
npm run preview
```

## Thay nội dung

Toàn bộ câu chữ và đường dẫn media nằm trong `src/content.js`. Chỉ cần sửa file này, không cần thay đổi logic animation.

- Ảnh và video hiện nằm trong `image/`.
- Nhạc nền hiện nằm trong `music/`.
- Video được phát muted và inline khi bước vào chương "Một khoảnh khắc anh luôn nhớ".
- Nhạc nền được yêu cầu phát ngay khi trang tải. Nếu trình duyệt chặn autoplay có âm thanh, nhạc sẽ tự mở khóa ở thao tác chạm, click hoặc nhấn phím đầu tiên; nút cố định ở góc dưới bên phải vẫn cho phép bật/tắt thủ công.
- Phần tỏ tình cuối trang chỉ kể chuyện, không có nút chọn, form hoặc lời thúc ép.

## Cấu trúc chính

```text
src/
├── components/
│   ├── sections/
│   │   ├── Intro.jsx
│   │   ├── FirstMeet.jsx
│   │   ├── MemoryGallery.jsx
│   │   ├── Listening.jsx
│   │   ├── Doubt.jsx
│   │   ├── VideoMoment.jsx
│   │   └── Confession.jsx
│   ├── LoadingScreen.jsx
│   ├── MusicToggle.jsx
│   ├── ParticleField.jsx
│   └── StoryProgress.jsx
├── hooks/
│   ├── useScrollAnimation.js
│   ├── useSmoothScroll.js
│   ├── useTypewriter.js
│   └── useReducedMotion.js
├── App.jsx
├── content.js
├── index.css
└── main.jsx
```

Trên desktop, gallery dùng horizontal scroll được pin bằng ScrollTrigger. Dưới 900px, gallery tự chuyển thành danh sách dọc để cuộn cảm ứng ổn định. Chế độ `prefers-reduced-motion` cũng được hỗ trợ để giảm animation khi hệ điều hành yêu cầu.