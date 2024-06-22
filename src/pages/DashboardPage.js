import { Page } from "../core/Page";
import { $ } from "../core/components/Utilit";
import { createLinkList } from "./utils";


export class DashboardPage extends Page{
  getRoot() {
    const newId = Date.now().toString()
    return $.create('div', 'db').html(
     `
      <div class="db__header">
        <h1>Таблицы</h1>
      </div>
      <div class="db__new">
        <div class="link">
          <a href="#excel${newId}">
            <span class="material-symbols-outlined">
              add_circle
              </span>
          </a>
          <p>Новая таблица</p>
        </div>
      </div>

      ${createLinkList()}
     ` 
    )
  }
}