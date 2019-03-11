import React, { Component } from 'react';
import { format } from 'timeago.js';

class NotesShort extends Component {
  constructor(){
    super();
    this.state = {
      title: '',
      description: '',
      _id: '',
      NotesShort: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.addNoteShort = this.addNoteShort.bind(this);
    this.editNoteShort = this.editNoteShort.bind(this);
    this.deleteNoteShort = this.deleteNoteShort.bind(this);
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

  handleChange(e){
    const {id, value } = e.target;
    this.setState({ [id]: value });
  }

  addNoteShort(e){
    if(this.state._id){
      const { title, description } = this.state;
      const editNoteShort = { title, description };
      fetch(`/api/notesshort/${this.state._id}`,{
        method: 'PUT',
        body: JSON.stringify(editNoteShort),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data =>{
          this.setState({
            title: '',
            description: '',
            _id: ''
          })
          this.getNotesShort();
        })
        .catch(err => console.error(err));
    }
    else{
      const { title, description } = this.state;
      const newNoteShort = { title, description };
      fetch('/api/notesshort', {
        method: 'POST',
        body: JSON.stringify(newNoteShort),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            title: '',
            description: '',
          })
          this.getNotesShort();
        })
        .catch(err => console.error(err));
    }
    e.preventDefault();
  }

  editNoteShort(id){
    fetch(`/api/notesshort/${id}`)
      .then(res => res.json())
      .then(data =>{
        this.setState({
          title: data.title,
          description: data.description,
          _id: data._id
        })
      })
  }

  deleteNoteShort(id){
    if(confirm('¿Eliminar Apunte corto?')){
      fetch(`/api/notesshort/${id}`,{
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data =>{
          this.getNotesShort();
        })
        .catch(err => console.error(err));
    }
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
            <button type="button" onClick={() => this.deleteNoteShort(note._id)} className="btn btn-danger d-inline float-right mx-1"><i class="fas fa-trash"></i></button>
            <button type="button" onClick={() => this.editNoteShort(note._id)} className="btn btn-warning d-inline float-right mx-1"><i class="fas fa-edit"></i></button>
          </div>
        </div>
      );
    });

    return (
      <div className="NotesShort">
        {/* UpNotesShort */}
        <div className="card mb-5">
          <form onSubmit={this.addNoteShort}>
            <div className="card-body">
                <input id="title" type="text" placeholder="Titulo" className="form-control mb-1" onChange={this.handleChange} value={this.state.title} />
                <textarea id="description" placeholder="descripción" className="form-control" onChange={this.handleChange} value={this.state.description} ></textarea>
                <div class="dropdown-divider"></div>
                <button type="submit" className="btn btn-success mb-2 float-right">
                  Publicar
                </button>
            </div>
          </form>
        </div>
        {/* NotesShort */}
        <div className="card text-center mb-3">
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
          <div className="card-footer text-muted">2 days ago</div>
        </div>
        {notesshort}
      </div>
    );
  }
}

export default NotesShort;
