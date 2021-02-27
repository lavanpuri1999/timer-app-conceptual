import React from 'react';
import Timer from './components/timer';
import './App.scss';

class App extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="App">
        <Timer />
      </div>
    );
  }
}

export default App;
