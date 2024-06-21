function createLinkItem() {
  return `
    <li>
      <a href="#" class="item">
        <h3>Новая таблица</h3>
        <data>12.06.2024</data>
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