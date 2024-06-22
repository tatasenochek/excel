import { Page } from "../core/Page";
import { Excel } from '../core/components/Excel';
import { Formula } from '../core/components/Formula';
import { Header } from '../core/components/Header';
import { Table } from '../core/components/Table/Table';
import { debounce, storage } from '../core/components/Table/utils';
import { Toolbar } from '../core/components/Toolbar/Toolbar';
import { createStore } from '../core/createStore';
import { normalizeInitialState } from '../redux/initialState';
import { rootReduser } from '../redux/rootReduser';
import { storageName } from "./utils";

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString()

    const state = storage(storageName(this.params))
    const initialState = normalizeInitialState(state)
    const store = createStore(rootReduser, initialState)

    const stateListner = debounce(state => {
      storage(storageName(params), state)
    }, 300)

    store.subscribe(stateListner)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}