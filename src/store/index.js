import {createStore, combineReducers} from '../component/xRedux'

const initState = {a: 1,b: 3}

function counterReducer(state = initState,action){
    const {type,payload} = action;
    switch(type){
        case "ADD":
            let a = state.a + payload;
            return {...state,a};
        case "MINUS":
            let b = state.b - payload;
            return {...state,b};
        default:
            return state;
    }
}


//通过createStore创建唯一数据源
export const store = createStore(counterReducer);