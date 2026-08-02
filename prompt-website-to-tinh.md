# PROMPT: Website tỏ tình dạng Scrollytelling bằng ReactJS

Bạn là một Senior Frontend Engineer chuyên về animation và trải nghiệm người dùng cao cấp (kiểu Awwwards-winning site). Hãy giúp tôi xây dựng một website tỏ tình dạng "scrollytelling" (kể chuyện qua cuộn trang) bằng ReactJS, animation phải mượt mà, chuyên nghiệp, cảm xúc.

## 1. Tech stack bắt buộc
- React 18 + Vite
- **Lenis** (smooth scroll)
- **GSAP + ScrollTrigger** (animation chính theo scroll, pin section, timeline)
- **Framer Motion** (transition UI, hover, modal, micro-interaction)
- **tsparticles** (hiệu ứng particle nền: trái tim, ánh sáng, sao bay)
- **canvas-confetti** (hiệu ứng pháo hoa/trái tim rơi ở climax)
- **Howler.js** (nhạc nền, có nút bật/tắt, fade in/out mượt)
- TailwindCSS cho styling

Cấu trúc thư mục rõ ràng theo component, mỗi section là 1 component riêng, tách logic animation ra custom hook (ví dụ `useScrollAnimation.js`).

## 2. Flow nội dung & animation chi tiết (theo thứ tự cuộn từ trên xuống)

### Section 0 — Intro (Hero, full-screen)
- Nền gradient tối lãng mạn (tím đậm → hồng → đen), có thể thêm noise/grain nhẹ cho sang trọng
- Particle trái tim/ánh sáng bay nhẹ nhàng phía sau (tsparticles)
- Tiêu đề chính xuất hiện bằng hiệu ứng text reveal: từng ký tự/từ trồi lên từ dưới lên kèm fade in, có stagger delay
- Dòng phụ đề fade in chậm hơn 0.3s sau tiêu đề
- Icon mũi tên cuộn xuống ở đáy màn hình, có animation bounce loop nhẹ nhàng, mờ dần khi user bắt đầu cuộn

### Section 1 — "Lần đầu gặp em"
- Pin section lại bằng ScrollTrigger trong lúc animation chạy (scrub: true)
- Ảnh xuất hiện bằng clip-path reveal (từ 0% lên 100%) hoặc scale từ 0.8 → 1 kết hợp fade
- Text mô tả bay vào từ 2 bên trái/phải, mượt, dùng easing "power3.out"
- Có thể thêm timestamp/ngày tháng nhỏ để tăng cảm giác timeline kỷ niệm

### Section 2 — "Được đi chơi cùng em"
- Hiệu ứng horizontal scroll bên trong section dọc: dùng ScrollTrigger pin + translateX theo scroll progress để tạo cảm giác lướt qua một dải ảnh kỷ niệm
- Parallax nhẹ giữa layer ảnh nền và ảnh chính (tốc độ di chuyển khác nhau)
- Mỗi ảnh có caption nhỏ fade in khi vào viewport

### Section 3 — "Lắng nghe câu chuyện của em"
- Các câu quote/tâm sự xuất hiện tuần tự dạng card, hiệu ứng blur-to-focus (từ blur(10px) + opacity 0 → blur(0) + opacity 1) khi scroll tới
- Có thể dùng font chữ viết tay (Google Font dạng script, ví dụ "Caveat" hoặc "Dancing Script") cho phần quote để tạo cảm giác ấm áp, cá nhân
- Background chuyển màu dịu nhẹ (theo scroll progress, dùng GSAP để interpolate màu nền)

### Section 4 — "Sợ bị từ chối"
- Tông màu chuyển tối hơn (transition mượt qua background-color)
- Hiệu ứng nhịp tim: một icon/text scale nhẹ theo chu kỳ giống nhịp tim đập (keyframe: 1 → 1.05 → 1 → 1.08 → 1)
- Text hiển thị theo kiểu typewriter rồi xóa đi viết lại (diễn tả sự do dự, đắn đo), dùng thư viện `typewriter-effect` hoặc tự viết bằng GSAP TextPlugin
- Nhịp animation chậm lại, tạo khoảng lặng cảm xúc trước khi vào climax

### Section 5 — "Tỏ tình" (Climax, quan trọng nhất)
- Đây là section **chỉ có hiệu ứng và text, không có nút bấm/không có tương tác lựa chọn nào cả**. Không làm nút "Có/Không", không làm form, không có gì để bấm.
- Background sáng bừng lên đột ngột nhưng mượt (transition 1-1.5s), particle trái tim tăng mật độ mạnh, tạo không khí ấm áp, chân thành, không gây áp lực
- Câu hỏi/lời tỏ tình xuất hiện giữa màn hình với animation scale + fade ấn tượng (kiểu spring bounce của Framer Motion), text hiện tuần tự theo từng dòng, có nhịp nghỉ giữa các dòng để tạo cảm giác đang thổ lộ chậm rãi, chân thành
- Nội dung text theo đúng tinh thần sau (tôi sẽ điền chính xác nội dung thật vào `content.js`, đây chỉ là placeholder mẫu về ý nghĩa):
  1. Dòng mở đầu: lời tỏ tình chính
  2. Dòng tiếp theo: nếu em đồng ý, hãy nhắn tin lại cho anh
  3. Dòng cuối: nếu em không muốn trả lời, không cần nhắn gì cả, cứ im lặng/phớt lờ trang này là được, anh sẽ hiểu đó là một câu trả lời và tôn trọng điều đó
- Sau khi hết chuỗi text, có thể để lại một hiệu ứng nhẹ nhàng loop mãi (particle trái tim bay chậm, ánh sáng lung linh) như một khoảnh khắc lắng đọng cuối trang, không có call-to-action nào thúc ép thêm
- Không dùng `canvas-confetti` kiểu ăn mừng ở section này vì không có sự kiện "bấm nút xác nhận" — có thể giữ hiệu ứng particle nền tinh tế xuyên suốt để kết thúc trang một cách nhẹ nhàng, sang trọng

## 3. Yêu cầu kỹ thuật khác
- Toàn bộ animation phải dùng `will-change`, `transform`, `opacity` để đảm bảo 60fps, tránh layout thrashing
- Responsive tốt trên mobile (horizontal scroll section cần fallback hợp lý trên màn hình nhỏ, ví dụ chuyển thành vertical stack hoặc swipe)
- Có loading screen ban đầu (progress bar đơn giản) trước khi vào Intro, tránh giật khi ảnh/font chưa load xong
- Code sạch, comment rõ từng phần animation, tách riêng data (nội dung, ảnh, câu chuyện) ra file `content.js` để dễ tùy chỉnh sau này mà không cần đụng vào logic
- Có nút bật/tắt nhạc nền cố định ở góc màn hình xuyên suốt toàn trang

## 4. Output mong muốn
Hãy generate:
1. Cấu trúc thư mục project đầy đủ
2. Code từng component (Intro, Section1-5, Navigation nếu cần)
3. File `content.js` mẫu để tôi điền nội dung/ảnh thật vào
4. Hướng dẫn cài đặt (`npm install` các package cần thiết) và chạy thử

Hãy làm từng phần một, bắt đầu từ setup project và Intro section trước, sau đó tôi sẽ yêu cầu tiếp các section tiếp theo.
