import React, { Component } from 'react';
import { format } from 'timeago.js';

class NotesShort extends Component {
  constructor(){
    super();
    this.state = {
      NotesShort: [],
    };
  }

  getNotesShort(){
    fetch('/api/notesshort')
      .then(res => res.json())
      .then(data =>{
        this.setState({
          NotesShort: data
        })
      });
  }

  componentDidMount(){
    this.getNotesShort();
  }

  render() {
    const notes = this.state.NotesShort;
    const notesReverce = notes.reverse();
    const notesshort = notesReverce.map((note, i) => {
      return(
        <div className="card text-center mb-3" key={i}>
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">
              {note.description}
            </p>
          </div>
          <div className="card-footer text-muted">
            {format(note.created_at)}
          </div>
        </div>
      );
    });

    return (
      <div className="NotesShort">
        {/* NotesShort */}
        {notesshort}
      </div>
    );
  }
}

export default NotesShort;