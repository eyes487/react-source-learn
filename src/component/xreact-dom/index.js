function render(Element,container){
    console.log('Element',Element);
    
    //vnode->node,
    const node = createNode(Element);
    //将真实dom插入容器
    container.appendChild(node);
}

function createNode(vNode){
    const {type,props} = vNode;
    let node;
    if(typeof type === "function"){
        //isReactComponent 判断是class或者是function创建的组件,或者是fragment
       node = type.isReactComponent ? updateClassComponent(vNode) 
       : type.isFragment? node = document.createDocumentFragment()
       : updateFunctionComponent(vNode)
    }else if(type === "Text"){
        node = document.createTextNode("")
    }else{
        node = document.createElement(type)
    }
    
    updateNode(node,props)
    
    reconcilerChildren(props.children,node);

    return node;
}

//更新节点，为节点添加属性或者nodeValue
function updateNode(node,props){
    Object.keys(props)
    .filter(p=>p!=='children')
    .forEach(prop=>{
        if(prop.slice(0,2) === "on"){
            let name = prop.slice(2).toLocaleLowerCase();
            document.addEventListener(name,props[prop])
            return;
        }
        node[prop] = props[prop]
    })
}

//处理孩子节点
function reconcilerChildren(children,node){
    console.log('chile',children);
    
    children.forEach(child=>{
        //有可能会是数组
        if(Array.isArray(child)){
            child.forEach(e=>render(e,node))
            return ;
        }
        render( child, node)
    })
}

//处理function组件
function updateFunctionComponent(vnode){
    const {type,props} = vnode;
    let vvnode = type(props)
    let node = createNode(vvnode);
    return node;
}
//处理class组件
function updateClassComponent(vnode){
    const {type,props} = vnode;
    let cmp = new type(props)
    let vvnode = cmp.render();
    let node = createNode(vvnode);
    return node;
}

export default{
    render
}