export function createStore(reducer,enhancer) {
    if(enhancer){
        return enhancer(createStore)(reducer)
    }
    //创建state，统一储存数据
    let state = undefined;
    //监听器数组
    let listenerMap = [];

    //getState():直接返回数据state
    function getState() {
        return state;
    }

    //dispatch: 执行action，会去reducer中查阅action执行，返回新的state
    //数据更新之后，监听器中存储的回调函数会被执行
    function dispatch(action) {
        state = reducer(state, action)
        listenerMap.map(listener => listener())
    }

    //subscribe: 订阅函数，把传入的回调函数，放入监听数组中
    function subscribe(listener) {
        listenerMap.push(listener)
    }

    //初始化数据，会走到default，直接返回state
    dispatch({ type: 'INIT' })

    return {
        getState,
        dispatch,
        subscribe
    }
}


export function combineReducers(reducers){
    let combineReducers = {...reducers}; //复制一份新的

    let keys = Object.keys(combineReducers);
    return function combination(state = {},action){
        let hasChanged = false;
        const nextState = {};
        keys.forEach(key=>{
            const previousStateKey = state[key];
            const nextStateKey = combineReducers[key](previousStateKey, action)
            nextState[key] = nextStateKey;
            hasChanged = hasChanged || nextStateKey !== previousStateKey
        })
        return hasChanged? nextState : state
    }
}

export function applyMiddleware(...middlewares){
     //middlewares  中间件数组,接收中间件，然后会返回一个函数，相当于上文中的enhancer
    //enhaner会接收 createStore 参数， 返回一个函数
    //这个函数 ，接收reducer，执行原来createStore该做的操作，
    return createStore=>(...args)=>{
        const store = createStore(...args)

        const middleApi = {
            getState: store.getState,
            dispatch: store.dispatch
        }

        //middlewares  传入的中间件数组，将middleApi传入，会返回一个新的函数数组
        const middlewareChain = middlewares.map(middleware=> 
            middleware(middleApi)
        )

        //通过把原始的dispatch，经过所有的中间件增强之后返回一个新的增加版dispatch，就可以做比如异步操作之类的了
        const dispatch = compose(...middlewareChain)(store.dispatch)
        return {
            ...store,
            dispatch
        }
    }
}

// 聚合函数  将上一个执行函数的返回值 ，传递给下一个参数
function compose(...funcs){
    return funcs.reduce((a,b)=>{
        return (...args)=>{
           return a(b(...args))
        }
    })
}


export function bindActionCreators(actionCreators, dispatch) {
    var boundActionCreators = {};
  
    for (var key in actionCreators) {
      var actionCreator = actionCreators[key];
  
      if (typeof actionCreator === 'function') {
        boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
      }
    }
    return boundActionCreators;
}
function bindActionCreator(actionCreator, dispatch) {
    return function () {
      return dispatch(actionCreator.apply(this, arguments));
    };
  }