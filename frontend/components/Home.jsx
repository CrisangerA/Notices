import React, { Component } from 'react';
import Slider from './Home/Slider.jsx';
import News from './Home/News.jsx';

class Home extends Component {
  render() {
    $(window).scroll(function() {
      var windowHeight = $(window).scrollTop();
      var News = $("#News").offset();
      News = News.top;
      if (windowHeight >= News) {
        $("#Navbar").addClass("bg-blue");
      } else {
        $("#Navbar").removeClass("bg-blue");
      }
    });
    return (
      <div className="Home">
        <Slider></Slider>
        <div className="container-fluid">
          <News></News>
        </div>
      </div>
    );
  }
}

export default Home;
