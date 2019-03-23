import React, { Component } from 'react';
import { format } from 'timeago.js';

class Notes extends Component {
  constructor() {
    super();
    this.state = {
      Notes: [],
    };
  }

  getNotes() {
    fetch('/api/notes')
      .then(res => res.json())
      .then(data => {
        this.setState({
          Notes: data
        })
      });
  }

  componentDidMount() {
    this.getNotes();
  }

  render() {
    const notes = this.state.Notes;
    const notesReverce = notes.reverse();
    const Notes = notesReverce.map((note, i) =>{
      return (
        <div className="card shadow mb-3" key={i}>
          <div className="card-body">
            <h5 className="card-title"> {note.title} </h5>
            <p className="card-text">
              {note.description}
            </p>
          </div>
          <div className="card-footer">
            <small className="d-inline"> {note.category} - {format(note.created_at)} </small>
          </div>
        </div>
      );         
    });

    return (
      <div className="Notes">
        {/* Notes */}
        <div className="card-columns">
          {Notes}
        </div>
      </div>
    );
  }
}

export default Notes;