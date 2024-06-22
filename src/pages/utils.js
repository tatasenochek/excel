import { storage } from "../core/components/Table/utils"

function createLinkItem(key) {
  const model = storage(key)
  const id = key.split(':')[1]
  
  return `
    <li>
      <a href="#excel/${id}" class="item">
        <h3>${model.title}</h3>
        <data>
        ${new Date(model.date).toLocaleDateString()} <br/>
        ${new Date(model.date).toLocaleTimeString()}
        </data>
      </a>
    </li>
  `
}

export function createLinkList() {
  const keys = getAllKeys()

  if (!keys.length) {
    return `<p class="empty">Вы еще не создали ни одной таблицы</p>`
  }

  return `
    <ul class="db__list">
      <li>
        <article class="item-header">
          <h3>Название таблицы</h3>
          <p>Дата создания</p>
        </article>
      </li>
      ${keys.map(createLinkItem).join('')}
    </ul>
  `
}

function getAllKeys() {
  const keys = []
  for(let i=0; i<localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function storageName(param) {
  return 'excel:' + param
}
