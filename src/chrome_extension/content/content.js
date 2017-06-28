import './css/index.css'
import language from './language.yml'

const defaultLang = 'en'
const lang = document.documentElement.lang
const words = Object.prototype.hasOwnProperty.call(language, lang)
? language[lang]
: language[defaultLang]

const sayRate = 0.3

const randomPick = list => list[Math.floor(Math.random() * list.length)]
const kemoInnerHTML = list => `<span class="kemo-say">＼${randomPick(list)}／</span>`
const escapeRegExp = str => str.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')

const japarizeWikipedia = () => {
  const wikipedia = 'wikipedia'
  const contextPatterns = [
    wikipedia,
    words.wikipedia,
  ]

  // document title
  document.title = document.title.replace(
    new RegExp(`${wikipedia}$`, 'i'),
    words.title
  )

  // search props
  const searchInput = document.getElementById('searchInput')
  const props = ['placeholder', 'title']
  const searchRegex = new RegExp(wikipedia, 'i')
  props.forEach((prop) => {
    searchInput[prop] = searchInput[prop].replace(searchRegex, words.title)
  })

  // text content
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  )

  let n
  const contextRegex = new RegExp(`(${contextPatterns.join('|')})`, 'gi')
  while ((n = walker.nextNode())) {
    n.textContent = n.textContent.replace(contextRegex, words.title)
  }
}

const japarizeHeader = () => {
  document
  .querySelectorAll('.mw-headline, #mw-panel h3')
  .forEach(el => (el.textContent = words.titlemin + el.textContent))
}

const becomeFriendWithSectionTitle = () => {
  const head = document.getElementById('firstHeading')
  head.textContent = [
    randomPick(words.exHeadList),
    randomPick(words.preHeadList),
    head.textContent,
    randomPick(words.postHeadList),
  ].join(' ')
}

const insertWordsInContent = () => {
  const regex = new RegExp(`(.+?${escapeRegExp(words.delimiter)})(?!([^<]+)?>)`, 'g')
  document
  .querySelectorAll('.mw-parser-output > p')
  .forEach((para) => {
    let sentence = para.innerHTML.match(regex)
    if (!sentence) {
      return
    }

    const last = sentence.length - 1
    sentence = sentence
    .map((s, i) => (
      (i !== last && Math.random() < sayRate)
        ? `${s}${kemoInnerHTML(words.postPeriodList)}`
        : s
      )
    )

    if (Math.random() < sayRate) {
      sentence.push(kemoInnerHTML(words.postParaList))
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
