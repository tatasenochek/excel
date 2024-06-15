import { Excel } from './core/components/Excel';
import { Formula } from './core/components/Formula';
import { Header } from './core/components/Header';
import { Table } from './core/components/Table';
import { Toolbar } from './core/components/Toolbar';
import './scss/index.scss';

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table]
})

// console.log('Excel', excel)
excel.render()