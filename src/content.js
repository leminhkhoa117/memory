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
    eyebrow: 'Đôi lời anh muốn nói với em',
    title: 'Anh đã suy nghĩ rất nhiều trước khi nói điều này.',
    subtitle:
      'Hy vọng là em có thể dành một chút thời gian để xem đến cuối.',
    background: introPhoto,
  },
  firstMeet: {
    chapter: { number: '01', label: 'Nơi câu chuyện bắt đầu' },
    date: 'Một ngày rất đỗi bình thường',
    title: 'Người đặc biệt.',
    body:
      'Anh chẳng nhớ mọi thứ đã bắt đầu như thế nào nữa, chỉ là... vào một ngày bình thường, những cuộc trò chuyện bình thường, không biết từ lúc nào em đã trở thành người đặc biệt trong mắt anh.',
    image: firstPhoto,
    imageAlt: 'Khoảnh khắc đầu tiên của hai chúng ta',
  },
  gallery: {
    chapter: { number: '02', label: 'Những ngày có em' },
    title: 'Những lần được đi chơi cùng em',
    intro:
      'Có thể với em nó chỉ là những tấm ảnh bình thường, nhưng mà với anh thì nó còn là cảm giác khi được ở cạnh em.',
    moments: [
      {
        image: secondPhoto,
        alt: 'Hai người cùng lưu lại một khoảnh khắc vui vẻ',
        index: '01',
        caption: 'Khung hình có em là khung hình đẹp nhất.',
      },
      {
        image: firstPhoto,
        alt: 'Hai người ngồi cạnh nhau cùng bó hoa',
        index: '02',
        caption: 'Mỗi phút giây bên em đều là khoảnh khắc đáng nhớ.',
      },
      {
        image: thirdPhoto,
        alt: 'Hai người đeo kính trắng tạo dáng cùng nhau',
        index: '03',
        caption: 'Anh mong là dù có chuyện gì thì em vẫn nở nụ cười.',
      },
    ],
  },
  listening: {
    chapter: { number: '03', label: 'Những lời em nói' },
    title: 'Anh thích trò chuyện cùng em.',
    intro:
      'Tính anh hay quên lắm, nhiều khi mọi người nói gì, năm phút sau anh lại quên mất. Nhưng mà những lời em nói, từ câu chuyện dài em kể đến những lời nói vu vơ, anh đều nhớ cả.',
    quotes: [
      'Anh thích nụ cười của em mỗi khi nói về điều mà em thích.',
      'Anh thích những lúc mình chẳng biết nên đi đâu nữa, rồi lại ra biển.',
      'Có điều là anh mong em sẽ quan tâm đến sức khoẻ của mình hơn, ăn đủ bữa và đi ngủ sớm.',
    ],
  },
  doubt: {
    chapter: { number: '04', label: 'Một khoảng lặng nho nhỏ' },
    title: 'Anh đã do dự rất lâu',
    lines: [
      'Anh đã sợ, anh sợ nói ra rồi thì những khoảnh khắc tuyệt vời đó sẽ không còn nữa.',
      'Không biết em có để ý không, những bài nhạc anh viết ra đều là những lời anh muốn gửi đến em.',
      'Hôm nay anh đã hỏi con tim mình, nó nói rằng nếu anh im lặng, anh sẽ phải tiếc nuối.',
    ],
    note: 'Hy vọng là em vẫn còn đủ kiên nhẫn để xem đến đây.',
  },
  video: {
    chapter: 'Một thước phim anh luôn giữ',
    src: memoryVideo,
    poster: secondPhoto,
    caption: 'anh thực sự yêu khoảnh khắc này',
  },
  confession: {
    chapter: 'Anh muốn nói là',
    lines: [
      'Anh thật sự thích em.',
      'Liệu em có thể cho anh một cơ hội được tìm hiểu em một cách nghiêm túc không? Hãy nhắn cho anh nếu em đồng ý.',
      'Nếu em không đồng ý thì không cần nhắn gì cả, hãy cứ phớt lờ nó đi. Anh sẽ hiểu đó là lời từ chối, và luôn tôn trọng cảm xúc của em.',
    ],
    closing: 'Cảm ơn em đã dành thời gian xem đến tận đây, đó là tất cả những gì anh muốn nói.',
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