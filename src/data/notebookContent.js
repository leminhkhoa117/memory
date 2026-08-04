import { story } from '../content'

const galleryPages = story.gallery.moments.map((moment, index) => ({
  id: `khoanh-khac-${index + 1}`,
  kind: 'photo',
  image: moment.image,
  alt: moment.alt,
  index: moment.index,
  caption: moment.caption,
}))

// Xếp theo cặp để khi mở đôi thì một bên là ảnh, một bên là chữ, giữ nguyên mạch bản gốc.
const pages = [
  {
    id: 'mo-dau',
    kind: 'text',
    eyebrow: story.intro.eyebrow,
    title: story.intro.title,
    lines: [story.intro.subtitle],
  },
  {
    id: 'mo-dau-anh',
    kind: 'photo',
    image: story.intro.background,
    alt: 'Tấm ảnh mở đầu cuốn sổ',
  },
  {
    id: 'lan-dau-anh',
    kind: 'photo',
    image: story.firstMeet.image,
    alt: story.firstMeet.imageAlt,
  },
  {
    id: 'lan-dau',
    kind: 'text',
    chapter: story.firstMeet.chapter,
    eyebrow: story.firstMeet.date,
    title: story.firstMeet.title,
    lines: [story.firstMeet.body],
  },
  {
    id: 'di-choi',
    kind: 'text',
    chapter: story.gallery.chapter,
    title: story.gallery.title,
    lines: [story.gallery.intro],
  },
  ...galleryPages,
  {
    id: 'lang-nghe',
    kind: 'text',
    chapter: story.listening.chapter,
    title: story.listening.title,
    lines: [story.listening.intro],
  },
  {
    id: 'lang-nghe-loi',
    kind: 'quotes',
    quotes: story.listening.quotes,
  },
  {
    id: 'do-du',
    kind: 'text',
    chapter: story.doubt.chapter,
    title: story.doubt.title,
    lines: story.doubt.lines,
    note: story.doubt.note,
  },
  {
    id: 'thuoc-phim',
    kind: 'video',
    eyebrow: story.video.chapter,
    src: story.video.src,
    poster: story.video.poster,
    caption: story.video.caption,
  },
  {
    id: 'la-thu',
    kind: 'letter',
    eyebrow: story.confession.chapter,
  },
]

// Trên sổ tay dọc chỉ có một trang mỗi lần nên hai đoạn đầu được gộp ảnh vào cùng chữ.
const mobilePages = [
  {
    id: 'mo-dau',
    kind: 'photoText',
    eyebrow: story.intro.eyebrow,
    title: story.intro.title,
    lines: [story.intro.subtitle],
    image: story.intro.background,
    alt: 'Tấm ảnh mở đầu cuốn sổ',
  },
  {
    id: 'lan-dau',
    kind: 'photoText',
    chapter: story.firstMeet.chapter,
    eyebrow: story.firstMeet.date,
    title: story.firstMeet.title,
    lines: [story.firstMeet.body],
    image: story.firstMeet.image,
    alt: story.firstMeet.imageAlt,
  },
  ...pages.slice(4),
]

const notebookContent = {
  cover: {
    eyebrow: 'Sổ tay',
    stamp: 'Cuốn sổ bí mật',
    title: story.intro.eyebrow,
    skipLabel: 'Bỏ qua',
  },
  firstPage: {
    eyebrow: story.intro.eyebrow,
    line: story.intro.title,
  },
  nav: {
    prev: 'Trang trước',
    next: 'Trang sau',
    hint: 'Kéo mép trang để lật',
  },
  pages,
  mobilePages,
  letter: story.confession,
}

export default notebookContent
