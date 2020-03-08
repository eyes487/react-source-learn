
function createElement(type,config,...childrens){
    const props = {};
    let key , ref;
    
    if(config&& typeof config === "object"){
        delete config.__source;
        delete config.__self;

        key = config.key;
        ref = config.ref;

        Object.keys(config)
        .filter(k=>k!=='key'&&k!=='ref')
        .forEach(p=>{
            props[p] = config[p]
        })
    }

    props.children = childrens.map(child=> 
        typeof child === 'object'? child 
        : createTextNode(child)
        )


    if(type&&type.defaultProps){
        const defaultProps = type.defaultProps;
        Object.keys(defaultProps)
        .forEach(p=>{
            if(props[p] === undefined){
                props[p] = defaultProps[p]
            }
        })
    }
    return {
        type,
        key,
        ref,
        props
    }
}


function cloneElement(element,config, ...childrens){
    const props = {...element.props};
    let key = element.key;
    let ref = element.ref;
    
    if(config&& typeof config === "object"){
        delete config.__source;
        delete config.__self;

        key = config.key&&config.key;
        ref = config.ref&&config.ref;

        Object.keys(config)
        .filter(k=>k!=='key'&&k!=='ref')
        .forEach(p=>{
            props[p] = config[p]
        })
    }

    if(childrens.length){
        props.children = childrens.map(child=> 
            typeof child === 'object'? child 
            : createTextNode(child)
            )
    }

    if(element.type&&element.type.defaultProps){
        const defaultProps = element.type.defaultProps;
        Object.keys(defaultProps)
        .forEach(p=>{
            if(props[p] === undefined){
                props[p] = defaultProps[p]
            }
        })
    }
    return {
        type: element.type,
        key,
        ref,
        props
    }

}

//创建文本节点，统一树结构
function createTextNode(text){
    return {
        type:'Text',
        props: {
            children: [],
            nodeValue: text
        }
    }
}

class Fragment{
    static isFragment = true;
    constructor(props){
        this.props = props;
    }
}
export default{
    createElement,
    Fragment,
    cloneElement,
}