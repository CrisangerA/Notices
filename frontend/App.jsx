import React, { Component } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import UpNotes from './components/UpNotes.jsx';
import UpNotesShort from './components/UpNotesShort.jsx';
import Categories from './components/Categories.jsx';
import { Switch, Route } from 'react-router-dom';
import './components/styles/styles.css';

class App extends Component {
  render() {

    $(window).scroll(function() {
      var windowHeight = $(window).scrollTop();
      var News = $("#News").offset();
      News = News.top;
      if (windowHeight >= News) {
        $("#Navbar").addClass("bg-blue");
        $("#Navbar").removeClass("bg-initial");
      } else {
        $("#Navbar").removeClass("bg-blue");
        $("#Navbar").addClass("bg-initial");
      }
    });

    return (
      <div className="App">
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Notes" component={UpNotes} />
          <Route path="/NotesShort" component={UpNotesShort} />
          <Route path="/Categories" component={Categories} />
        </Switch>
      </div>
    );
  }
}

export default App;