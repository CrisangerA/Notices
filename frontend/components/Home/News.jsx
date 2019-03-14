import React, { Component } from 'react';
import Notes from '../News/Notes.jsx';
import NotesShort from '../News/NotesShort.jsx';

class News extends Component {
  render() {
    return (
      <div id="News" className="News card shadow-lg mt-n5 mb-5 mx-3 px-4 py-5">
        <div className="form-row">
          <div className="col-md-8">
            <Notes></Notes>
          </div>
          <div className="col-md-4">
            <NotesShort></NotesShort>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
