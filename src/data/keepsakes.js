// Toạ độ trong file này dùng "stage unit" — hệ đo ảo được nhân với `unit`
// (hệ số co giãn theo kích thước board) nên hình dạng số không bao giờ bị méo.

export const KEEPSAKES = [
  {
    id: 'ribbon',
    shape: 'ribbon',
    label: 'Dải ruy băng cũ',
    size: { w: 72, h: 152 },
    home: { x: 0.13, y: 0.24 },
    tilt: -8,
  },
  {
    id: 'wire',
    shape: 'wire',
    label: 'Dây đèn nhỏ',
    size: { w: 72, h: 152 },
    home: { x: 0.87, y: 0.3 },
    tilt: 7,
  },
  {
    id: 'twig',
    shape: 'twig',
    label: 'Cành lá khô',
    size: { w: 74, h: 100 },
    home: { x: 0.19, y: 0.79 },
    tilt: 12,
  },
  {
    id: 'button',
    shape: 'button',
    label: 'Chiếc nút áo',
    size: { w: 88, h: 88 },
    home: { x: 0.81, y: 0.76 },
    tilt: -5,
  },
  {
    id: 'pencil',
    shape: 'pencil',
    label: 'Cây bút chì',
    size: { w: 30, h: 154 },
    home: { x: 0.5, y: 0.15 },
    tilt: -14,
  },
  {
    id: 'scrap',
    shape: 'scrap',
    label: 'Mảnh giấy xé',
    size: { w: 58, h: 44 },
    home: { x: 0.12, y: 0.55 },
    tilt: -18,
  },
  // Ba món dưới đây không thuộc số nào — chúng chỉ ở đó để phải tìm.
  {
    id: 'ticket',
    shape: 'ticket',
    label: 'Vé xem phim cũ',
    size: { w: 104, h: 46 },
    home: { x: 0.88, y: 0.56 },
    tilt: 9,
  },
  {
    id: 'polaroid',
    shape: 'polaroid',
    label: 'Khung ảnh nhỏ',
    size: { w: 82, h: 94 },
    home: { x: 0.31, y: 0.87 },
    tilt: -6,
  },
  {
    id: 'clip',
    shape: 'clip',
    label: 'Chiếc kẹp giấy',
    size: { w: 40, h: 76 },
    home: { x: 0.67, y: 0.88 },
    tilt: 16,
  },
]

export const KEEPSAKE_MAP = KEEPSAKES.reduce((acc, item) => {
  acc[item.id] = item
  return acc
}, {})

// Mỗi số được ghép từ 2 vật. `offset` là vị trí tương đối so với tâm số.
export const DIGITS = [
  {
    value: '0',
    anchor: { x: 0.38, y: 0.44 },
    parts: [
      { itemId: 'ribbon', offset: { x: -34, y: 0 } },
      { itemId: 'wire', offset: { x: 34, y: 0 } },
    ],
  },
  {
    value: '6',
    anchor: { x: 0.59, y: 0.5 },
    parts: [
      { itemId: 'twig', offset: { x: -10, y: -44 } },
      { itemId: 'button', offset: { x: 4, y: 38 } },
    ],
  },
  {
    value: '0',
    anchor: { x: 0.43, y: 0.57 },
    parts: [
      { itemId: 'ribbon', offset: { x: -34, y: 0 } },
      { itemId: 'wire', offset: { x: 34, y: 0 } },
    ],
  },
  {
    value: '1',
    anchor: { x: 0.62, y: 0.42 },
    parts: [
      { itemId: 'pencil', offset: { x: 10, y: 0 } },
      { itemId: 'scrap', offset: { x: -26, y: -54 } },
    ],
  },
]

export const STAGE = { width: 1000, height: 640 }
