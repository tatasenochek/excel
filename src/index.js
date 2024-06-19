import { Excel } from './core/components/Excel';
import { Formula } from './core/components/Formula';
import { Header } from './core/components/Header';
import { Table } from './core/components/Table';
import { Toolbar } from './core/components/Toolbar';
import { storage } from './core/components/utils';
import { createStore } from './core/createStore';
import { initialState } from './redux/initialState';
import { rootReduser } from './redux/rootReduser';
import './scss/index.scss';

const store = createStore(rootReduser, initialState)

store.subscribe(state => {
  console.log('App State:', state)
  storage('excel-state', state)
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()