import React from 'react';
import ButtonWrapper from './buttonHOC';

class Button extends React.Component{
    render(){
        return(<button onClick={() => this.props.changeSpeed()} className="btn-style">{this.props.children}</button>)
    }
}

export default Button;