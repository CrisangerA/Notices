import React, { Component } from "react";

class UpNotesShort extends Component {
  render() {
    return (
      <div className="card mb-5">
        <div className="card-body">
            <input type="text" placeholder="Titulo" className="form-control mb-1"/>
            <textarea className="form-control"></textarea>
        </div>
        <div className="card-footer">
            <input type="button" className="btn btn-success float-right" value="Publicar" />
        </div>
      </div>
    );
  }
}

export default UpNotesShort;