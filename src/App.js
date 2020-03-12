import React from 'react';
import './App.css';
import Home from './components/Home/Home';
import { Provider } from 'react-redux';
import {store} from './store.js'
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Home/>
      </Provider>
    </div>
  );
}

export default App;
