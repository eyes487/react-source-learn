/**
 * 测试自己写的react和react-dom
 * 
 */

// import React,{Fragment,cloneElement,Component} from 'react';
// import ReactDOM from 'react-dom';
import React from './component/xreact';
import Component from "./component/xreact/Component";
import ReactDOM from './component/xreact-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Children } from 'react';


const {cloneElement,Fragment} = React;

function FunctionComponent({name}){
    return <div className="border function">hello ,{name}</div>
}

class ClassComponent extends Component{
    static defaultProps = {
        name: 'defautProps',
        desc: '我是 defaultProps'
    }

    render(){
        const {name,desc} = this.props;
        return <div>
            <h2 className="border function">hello, {name}, {desc}</h2>
        </div>
    }
}

const Jsx =({name})=> <div className="border" key="1">
    <h1>{name}</h1>
    <h2 className="border" onClick={()=>{console.log(3333333)}}>That is ok</h2>
    <FunctionComponent name="function"/>
    <ClassComponent name="class" />
    {
        [1,2,34].map(v=><Fragment>
            <h3>{v}</h3>
            <p>{v} test</p>
        </Fragment>)
    }
</div>

const CloneJsx = cloneElement(<Jsx/>,{key: 5,name: '我是CloneElement'})

ReactDOM.render(<Jsx name="我是createElement"/>, document.getElementById('root'));
ReactDOM.render(CloneJsx, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
