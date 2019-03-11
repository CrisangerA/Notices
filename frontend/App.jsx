import React, { Component } from 'react';
import Navbar from './components/Navbar.jsx';
import Slider from './components/Slider.jsx';
import News from './components/News.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar></Navbar>
        <Slider></Slider>
        <div className="container-fluid">
          <News></News>
        </div>
      </div>
    );
  }
}

export default App;