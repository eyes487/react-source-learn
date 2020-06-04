/**
 * 测试react-redux
 * 
 */

import React,{ Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {store} from './store'
import {connect} from './component/xReact-Redux'

class App extends Component {
   onADD=()=>{
        
    this.props.dispatch({type:'ADD', payload: 2})
  }
   onMINUS=()=>{
        
    this.props.dispatch({type:'MINUS', payload: 2})
  }
  render(){
      console.log('this.props',this.props);
      
      const {count={}} = this.props
    return (
      <div className="App">
        <p>a: {count.a}</p>
        <p>b: {count.b}</p>
        <button onClick={this.onADD}>ADD</button>
        <button onClick={this.onMINUS}>MINUS</button>
      </div>
    );
  }
}

export default connect((state)=>({count: state}))(App);
