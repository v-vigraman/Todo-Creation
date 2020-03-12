import { createStore } from 'redux'
import reducers from './redux/index'


export const store = createStore(reducers)