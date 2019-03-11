import React, { Component } from "react";
import Notes from "./Notes.jsx";
import NotesShort from "./NotesShort.jsx";

class News extends Component {
  render() {
    return (
      <div className="News card shadow-lg mt-n5 mb-5 mx-3 px-4 py-3">
        <div className="form-row text-center d-inline mb-5">
          <input type="button" className="btn btn-primary mx-2 my-1" value="Tecnologia" />
          <input type="button" className="btn btn-success mx-2 my-1" value="Salud" />
        </div>
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
