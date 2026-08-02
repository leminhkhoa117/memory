const introPhoto = new URL('../image/khuyen.jpg', import.meta.url).href
const firstPhoto = new URL('../image/1000001736.jpg', import.meta.url).href
const secondPhoto = new URL('../image/1000001738.jpg', import.meta.url).href
const thirdPhoto = new URL('../image/1000001739.jpg', import.meta.url).href
const memoryVideo = new URL('../image/lv_0_20260620105157.mp4', import.meta.url).href
const backgroundMusic = new URL(
  '../music/lokenwarrior-river-romance-482803.mp3',
  import.meta.url,
).href

export const story = {
  intro: {
    eyebrow: 'Một câu chuyện anh đã giữ trong lòng',
    title: 'Có một điều, anh muốn kể em nghe.',
    subtitle:
      'Không cần vội đâu. Chỉ là vài khoảnh khắc nhỏ, và tất cả đều dẫn về phía em.',
    background: introPhoto,
  },
  firstMeet: {
    chapter: { number: '01', label: 'nơi câu chuyện bắt đầu' },
    date: 'Một ngày rất đỗi bình thường',
    title: 'Lần đầu gặp em',
    body:
      'Anh không biết một cuộc gặp có thể ở lại lâu đến thế. Từ hôm ấy, giữa rất nhiều điều bình thường, em trở thành điều anh luôn nhớ nhất.',
    image: firstPhoto,
    imageAlt: 'Khoảnh khắc đầu tiên của hai chúng ta',
  },
  gallery: {
    chapter: { number: '02', label: 'những ngày có em' },
    title: 'Những lần được đi cùng em',
    intro:
      'Mỗi bức ảnh giữ một phần ký ức. Còn anh thì giữ cả cảm giác khi được ở cạnh em.',
    moments: [
      {
        image: secondPhoto,
        alt: 'Hai người cùng lưu lại một khoảnh khắc vui vẻ',
        index: '01',
        caption: 'Có em trong khung hình, mọi ngày đều sáng hơn một chút.',
      },
      {
        image: firstPhoto,
        alt: 'Hai người ngồi cạnh nhau cùng bó hoa',
        index: '02',
        caption: 'Anh thích cách những phút bình thường bên em trở nên đáng nhớ.',
      },
      {
        image: thirdPhoto,
        alt: 'Hai người đeo kính trắng tạo dáng cùng nhau',
        index: '03',
        caption: 'Và có những lúc chỉ cần cùng em vui một chút là đủ.',
      },
    ],
  },
  listening: {
    chapter: { number: '03', label: 'những điều em kể' },
    title: 'Anh thích lắng nghe em kể',
    intro:
      'Có những điều em kể rất lâu, cũng có những điều chỉ là một câu vu vơ. Anh đều muốn nhớ.',
    quotes: [
      'Anh yêu cách mắt em sáng lên khi kể về điều mình thích.',
      'Anh quý cả những khoảng lặng, khi mình chẳng cần nói gì mà vẫn thấy bình yên.',
      'Và anh nhận ra, điều anh mong nhất là được nghe em kể thêm thật nhiều câu chuyện nữa.',
    ],
  },
  doubt: {
    chapter: { number: '04', label: 'một khoảng lặng trong tim' },
    title: 'Anh đã do dự rất lâu',
    lines: [
      'Nếu nói ra, mọi thứ có khác đi không?',
      'Nếu cứ im lặng, anh sẽ tiếc chứ?',
      'Có lẽ chân thành cũng cần một lần can đảm.',
    ],
    note: 'Tim anh đã trả lời trước cả khi anh kịp tìm đủ lời.',
  },
  video: {
    chapter: 'Một thước phim anh luôn giữ',
    src: memoryVideo,
    poster: secondPhoto,
    caption: 'anh thực sự yêu khoảnh khắc này',
  },
  confession: {
    chapter: 'Lời từ trái tim',
    lines: [
      'Anh thật sự thích em.',
      'Nếu em cũng muốn cho chúng ta một cơ hội, hãy nhắn lại cho anh nhé.',
      'Còn nếu em không muốn trả lời, em không cần nhắn gì cả. Anh sẽ hiểu, và luôn tôn trọng cảm xúc của em.',
    ],
    closing: 'Cảm ơn em đã lắng nghe đến tận đây.',
  },
  music: {
    src: backgroundMusic,
    label: 'Nhạc nền River Romance',
  },
}

export const preloadAssets = [
  introPhoto,
  firstPhoto,
  secondPhoto,
  thirdPhoto,
  story.video.src,
]