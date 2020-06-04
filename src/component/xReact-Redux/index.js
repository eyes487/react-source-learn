import React, { Component } from 'react'
import {bindActionCreators} from '../xRedux'

const ValueContext = React.createContext();

export const connect = (mapStateToProps, mapDispatchToProps, mergeProps) => WrapperComponent=> {
    return class extends Component{
        static contextType = ValueContext;
        state ={
            props: {}
        }
        componentDidMount(){
            const {subscribe} = this.context;
            this.update()
            subscribe(this.update)
        }

        update =()=>{
            const {dispatch,getState} = this.context;
            let stateProps = mapStateToProps(getState());
            let dispatchProps ;

            if(typeof mapDispatchToProps === 'object'){
                dispatchProps = bindActionCreators(mapDispatchToProps,dispatch)
            }else if(typeof mapDispatchToProps === 'function'){
                dispatchProps = mapDispatchToProps(dispatch)
            }else{
                dispatchProps = {dispatch};
            }
            this.setState({
                props: {
                    ...dispatchProps,
                    ...stateProps,
                }
            })
        }
        render(){
            return <WrapperComponent {...this.state.props}/>
        }
    }
}

export class Provider extends Component {
    render() {
        return <ValueContext.Provider value={this.props.store}>
            {this.props.children}
        </ValueContext.Provider>
    }
}

