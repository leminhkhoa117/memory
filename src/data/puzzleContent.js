const puzzleContent = {
  // Đáp án ẩn: ngày sinh 06/01 -> 4 chữ số theo thứ tự.
  answer: ['0', '6', '0', '1'],
  intro: {
    eyebrow: 'Một trò chơi nhỏ',
    title: 'Những mảnh ký ức lạc chỗ',
    lines: [
      'Trên mặt bàn cũ còn sót lại vài món đồ chẳng còn nguyên vẹn.',
      'Ghép chúng lại đi, sẽ có một con số hiện ra.',
    ],
    steps: [
      { index: '01', text: 'Kéo từng mảnh lại gần nhau, đúng chỗ thì nó sẽ sáng lên.' },
      { index: '02', text: 'Đủ hai mảnh sẽ thành một chữ số, tất cả bốn lần như vậy.' },
      { index: '03', text: 'Quay đúng dãy số vừa tìm được để mở khoá.' },
    ],
    note: 'Không có giới hạn thời gian, cứ từ từ.',
    cta: 'Bắt đầu',
  },
  eyebrow: 'Trước khi bắt đầu',
  title: 'Những mảnh ký ức lạc chỗ',
  hint: 'Đâu đó trong những mảnh ghép này, một con số đang chờ được tìm ra…',
  trayLabel: 'Khay kết quả',
  hintButtonLabel: 'Gợi ý',
  dialLabel: 'Quay số để xác nhận',
  dialHelper: 'Quay lần lượt từng số theo đúng thứ tự trên khay.',
  successTitle: '06 · 01',
  successLine: 'Ngày một cô gái xinh đẹp được sinh ra đời.',
  successPrompt:
    'Bạn đã hoàn thành trò chơi và mở khoá thành công cuốn sổ bí mật, bạn có muốn mở cuốn sổ bí mật không?',
  cta: 'Mở cuốn sổ bí mật',
}

export default puzzleContent
