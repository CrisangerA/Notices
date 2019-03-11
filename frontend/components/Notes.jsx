import React, { Component } from 'react';
import { format } from 'timeago.js'
import UpNotes from './UpNotes.jsx';

//Este componente solo Read, Delete
class Notes extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      imagePath: '',
      category: '',
      Notes: [],
      _id: ''
    };
    this.addNotes = this.addNotes.bind(this);
    this.editNotes = this.editNotes.bind(this);
    this.deleteNotes = this.deleteNotes.bind(this);
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

  addNotes(newNote) {
    fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify(newNote),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        //$('#toast').toast('show')
        this.getNotes();
      })
      .catch(err => console.error(err));
  }

  editNotes(id){
    fetch(`/api/notes/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          title: data.title,
          description: data.description,
          imagePath: data.imagePath,
          category: data.category,
          _id: data._id
        })
      })
  }

  deleteNotes(id){
    if(confirm('¿Eliminar apunte?')){
      fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data =>{
          //Toast
          this.getNotes();
        })
        .catch(err => console.error(err))
    }
  }

  render() {
    const notes = this.state.Notes.map((note, i) => {
      return (
        <div className="card shadow mb-3" key={i}>
          <div className="card-header">
            <h5 className="card-title d-inline"> {note.title} </h5>
            <button type="button" onClick={() => this.deleteNotes(note._id)} className="btn btn-danger d-inline float-right mx-1"><i class="fas fa-trash"></i></button>
            <button type="button" onClick={() => this.editNotes(note._id)} className="btn btn-warning d-inline float-right mx-1"><i class="fas fa-edit"></i></button>
          </div>
          <div className="card-body">
            <p className="card-text">
              {note.description}
            </p>
            <small> {note.category} {format(note.created_at)} </small>
          </div>
        </div>
      );
    });

    return (
      <div className="Notes">
        <UpNotes onAddNotes={this.addNotes} onEditNote={this.state}></UpNotes>
        <div className="card shadow mb-3">
          <div className="card-header">Featured</div>
          <div className="card-body">
            <h5 className="card-title">Special title treatment</h5>
            <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
        {notes}
      </div>
    );
  }
}

export default Notes;
