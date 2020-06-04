import React,{Fragment,cloneElement,Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Children } from 'react';

// import './page1'   //react和react-dom
// import Page2 from './page2'   //redux
import Page3 from './page3'   //react-redux
import {Provider} from './component/xReact-Redux'
import {store} from './store'



ReactDOM.render(
    <Provider store={store}>
        <Page3/>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
