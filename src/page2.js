/**
 * 测试redux和react-redux
 * 
 */

import React,{ Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {store} from './store'

class App extends Component {
  componentDidMount(){
    store.subscribe(()=>{
      this.forceUpdate()
    })
  }
   onADD=()=>{
        
    store.dispatch({type:'ADD', payload: 2})
  }
   onMINUS=()=>{
        
    store.dispatch({type:'MINUS', payload: 2})
  }
  render(){
    return (
      <div className="App">
        <p>a: {store.getState().a}</p>
        <p>b: {store.getState().b}</p>
        <button onClick={this.onADD}>ADD</button>
        <button onClick={this.onMINUS}>MINUS</button>
      </div>
    );
  }
}

export default App;
