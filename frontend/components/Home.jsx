import React, { Component } from 'react';
import Slider from './Home/Slider.jsx';
import News from './Home/News.jsx';

class Home extends Component {
  render() {
    return (
      <div id="Home" className="Home">
        <Slider></Slider>
        <div className="container-fluid">
          <News></News>
        </div>
      </div>
    );
  }
}

export default Home;
