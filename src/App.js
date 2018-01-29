import React, { Component } from 'react';
// import Transpole from './views/Transpole'
import PlaqueTranspole from './views/PlaqueTranspole'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PlaqueTranspole/>
      </div>
    );
  }
}

const devMode = false;

window.apiUrl = devMode ? "http://localhost:5000" : "https://yuanzhou.azurewebsites.net"
export default App;
