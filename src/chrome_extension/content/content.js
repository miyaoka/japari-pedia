import './css/general.scss'
import './css/header.scss'
import './css/content.scss'
import './css/nav.scss'
import './css/kemo.scss'

/**
 * head
 */
const exHeadList = [
  'すごーい！',
  'すっごーい！',
  'わーい！',
]
const preHeadList = [
  'キミは',
  'あなたは',
]
const postHeadList = [
  'のフレンズなんだね！',
  'って言うんだー！',
]

/**
 * paragraph
 */
const postPeriodList = [
  'すごーい',
  'すっごーい',
  'わーい！',
  'たのしー！',
  'たーのしー！',
  'うー！がぉー！',
  'へーきへーき！',
  'なにこれー！？',
]
const postParaList = [
  'でも騒ぐほどでもないか',
  '全然知らなかったー',
  'そうなのー！？',
  'たべないよー！',
  'そんなことないよー！',
  'って言うんだー！',
  '知ってたー?',
]

const sayRate = 0.3

const randomPick = list => list[Math.floor(Math.random() * list.length)]

const kemoInnerHTML = list => `<span class="kemo-say">＼${randomPick(list)}／</span>`

const japarizeWikipedia = () => {
  // document title
  document.title = document.title.replace(/wikipedia$/i, 'ジャパリ図書館')

  // search props
  const searchInput = document.getElementById('searchInput')
  const props = ['placeholder', 'title']
  props.forEach((prop) => {
    searchInput[prop] = searchInput[prop].replace(/wikipedia/i, 'ジャパリ図書館')
  })

  // text content
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  )

  let n
  while ((n = walker.nextNode())) {
    n.textContent = n.textContent.replace(/(wikipedia|ウィキペディア)/gi, 'ジャパリ図書館')
  }
}

const japarizeHeader = () => {
  document
  .querySelectorAll('.mw-headline, #mw-panel h3')
  .forEach(el => (el.textContent = `ジャパリ${el.textContent}`))
}

const becomeFriendWithSectionTitle = () => {
  const head = document.getElementById('firstHeading')
  head.textContent = [
    randomPick(exHeadList),
    randomPick(preHeadList),
    ' ',
    head.textContent,
    ' ',
    randomPick(postHeadList),
  ].join('')
}

const insertWordsInContent = () => {
  document
  .querySelectorAll('#mw-content-text > p')
  .forEach((para) => {
    let sentence = para.innerHTML.match(/.+?[。]/g)
    if (!sentence) {
      return
    }

    const last = sentence.length - 1
    sentence = sentence
    .map((s, i) => (
      (i !== last && Math.random() < sayRate)
        ? s + kemoInnerHTML(postPeriodList)
        : s
      )
    )

    if (Math.random() < sayRate) {
      sentence.push(kemoInnerHTML(postParaList))
    }

    para.innerHTML = sentence.join('')
  })
}

export default () => {
  japarizeWikipedia()
  japarizeHeader()
  becomeFriendWithSectionTitle()
  insertWordsInContent()
}
