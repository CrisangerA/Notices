import React, { Component } from 'react';
import Navbar from './components/Navbar.jsx';
//import Slider from './assets/img1.jpg';
import News from './components/News.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar></Navbar>
        {/*<img src={Slider} className="img-fluid"></img>*/}
        <div className="container-fluid">
          <News></News>
        </div>
      </div>
    );
  }
}

export default App;