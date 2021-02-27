import React from 'react';

function ButtonWrapper(Button, btnType){

    return class extends React.Component{
        constructor(props){
            super(props);
        }

        render(){
            return(
                btnType==="reset" ? 
                 (
                    <div className="btn-pane">
                        <Button {...this.props}>
                            <span>Reset Counter</span>
                        </Button>
                    </div>
                 ) 
                 : 
                 (
                 <div className="btn-pane">
                    <Button {...this.props}>
                        <span>{btnType==="inc" ? "+" : "-"}</span>
                    </Button>
                    <p>{btnType==="inc" ? "Increase speed" : "Decrease speed"}</p>
                </div>
                )
            );
        }
    }

}

export default ButtonWrapper;