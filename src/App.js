import React from 'react';
import logo from './logo.svg';
import './App.css';
import {store} from './store'

function App() {

  const onADD=()=>{
        
    store.dispatch({type:'ADD', payload: 2})
  }
  return (
    <div className="App">
      <p>{store.getState().a}</p>
      <button onClick={onADD}></button>
    </div>
  );
}

export default App;
