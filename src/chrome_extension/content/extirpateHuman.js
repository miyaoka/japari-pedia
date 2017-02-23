import * as storeKey from '../storekey'

const runIfHuman = (callback) => {
  const matched = location.pathname.match(/^\/wiki\/(.*)/)
  if (!matched[1]) {
    return
  }

  const title = decodeURI(matched[1])

  chrome.storage.local.get([storeKey.humanSitelinks, storeKey.humanSitelinksValid], (items) => {
    const storedSet = items[storeKey.humanSitelinks]

    if (items[storeKey.humanSitelinksValid]) {
      if (storedSet[title]) {
        callback()
      }

      return
    }

    fetch('https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q5&props=sitelinks&format=json')
      .then(response => response.json())
      .then((json) => {
        const fetchedSet = Object.create(null)
        const sitelinks = json.entities.Q5.sitelinks

        Object.keys(sitelinks)
          .forEach(key => (fetchedSet[sitelinks[key].title] = true))

        chrome.storage.local.set({
          [storeKey.humanSitelinks]: fetchedSet,
          [storeKey.humanSitelinksValid]: true,
        })

        if (fetchedSet[title]) {
          callback()
        }
      }, storedSet[title] && callback)
  })
}

const extirpateHumanInHominidae = () => {
  document
    .querySelectorAll('[aria-labelledby="Extant_species_of_family_Hominidae_.28Great_apes.29"] tr')
    .forEach(
      row => !row.getElementsByTagName('table').length &&
             /human/i.test(row.textContent) &&
             row.parentNode.removeChild(row)
    )
}

const extirpateHumanBody = () => {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  )

  let n
  while ((n = walker.nextNode())) {
    n.textContent = n.textContent
      .replace('only extant', 'last')
      .replace('single extant', 'last')
      .replace('現生人類', '最後の人類')
      .replace('現生の（現在生きている）', '最後の')
      .replace('現生の', '最後の')
      .replace('現在', '21世紀')
  }
}

const extirpateHumanCategory = () => {
  document
    .querySelectorAll('#mw-normal-catlinks a')
    .forEach((a) => {
      switch (a.pathname) {
        case '/wiki/Category:IUCN_Red_List_least_concern_species':
          a.href = '/wiki/Category:IUCN_Red_List_extinct_species'
          a.title = 'Category:IUCN Red List extinct species'
          a.textContent = 'IUCN Red List extinct species'
          break

        case '/wiki/Category:Least_concern':
          a.href = '/wiki/Category:Extinct'
          a.title = 'Category:Extinct'
          a.textContent = 'Extinct'
          break

        case '/wiki/Category:Extant_Gelasian_first_appearances':
          a.parentNode.removeChild(a)
          break

        default:
          break
      }
    })
}

const extirpateHumanInfobox = () => {
  document
    .querySelectorAll('.infobox')
    .forEach(
      table => Array.prototype.forEach.call(table.tBodies, (tbody) => {
        const iterator = tbody.rows[Symbol.iterator]()
        let iteration

        while (!(iteration = iterator.next()).done) {
          if (
            Array.prototype.some.call(iteration.value.cells,
              cell => cell.tagName === 'TH' &&
                      (cell.textContent === '保全状況評価' ||
                       cell.textContent === '\nConservation status\n'
                      )
            )
          ) {
            iteration = iterator.next()
            if (iteration.done) {
              break
            }

            iteration.value.innerHTML =
              '<td style="text-align:center">' +
                '<b>EXTINCT</b><br>' +
                '<small>(はかせ)</small><br>' +
                '<a href="/wiki/%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB:Status_iucn3.1_EX.svg" class="image">' +
                  '<img alt="Status iucn3.1 EX.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Status_iucn3.1_EX.svg/240px-Status_iucn3.1_EX.svg.png" width="240" height="64" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Status_iucn3.1_EX.svg/360px-Status_iucn3.1_EX.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Status_iucn3.1_EX.svg/480px-Status_iucn3.1_EX.svg.png 2x" data-file-width="240" data-file-height="64">' +
                '</a>' +
              '</td>'
          }
        }
      })
    )
}

const extirpateHumanNavbox = () => {
  Array.prototype.forEach.call(document.getElementsByClassName('navbox'),
    element => /extant/i.test(element.textContent) &&
               element.parentNode.removeChild(element))
}

export default () => {
  extirpateHumanInHominidae()

  runIfHuman(() => {
    extirpateHumanBody()
    extirpateHumanCategory()
    extirpateHumanNavbox()
    extirpateHumanInfobox()
  })
}
