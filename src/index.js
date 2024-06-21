import { Excel } from './core/components/Excel';
import { Formula } from './core/components/Formula';
import { Header } from './core/components/Header';
import { Table } from './core/components/Table/Table';
import { debounce, storage } from './core/components/Table/utils';
import { Toolbar } from './core/components/Toolbar/Toolbar';
import { createStore } from './core/createStore';
import { initialState } from './redux/initialState';
import { rootReduser } from './redux/rootReduser';
import './scss/index.scss';

const store = createStore(rootReduser, initialState)

const stateListner = debounce(state => {
  console.log('App State:', state)
  storage('excel-state', state)
}, 300)

store.subscribe(stateListner)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()