import React, { Component } from 'react';
import { format } from 'timeago.js';

class Notes extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      imagePath: '',
      category: 'Otro',
      Notes: [],
      categories: [],
      _id: ''
    };
    this.handleChange = this.handleChange.bind(this);
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

  getCategories() {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        this.setState({
          categories: data
        });
      });
  }

  componentDidMount() {
    this.getNotes();
    this.getCategories();
  }

  handleChange(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  addNotes(e) {
    if(this.state._id){
      const { title, description, imagePath, category } = this.state;
      const editNote = { title, description, imagePath, category };
      fetch(`/api/notes/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify(editNote),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            title: '',
            description: '',
            imagePath: '',
            category: 'Otro',
            _id: ''
          });
          this.getNotes();
        })
        .catch(err => console.error(err));
    }
    else{
      const { title, description, imagePath, category } = this.state;
      const newNote = { title, description, imagePath, category };
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
          this.setState({
            title: '',
            description: '',
            imagePath: '',
            category: ' Otro ',
          });
          this.getNotes();
        })
        .catch(err => console.error(err));
    }
    e.preventDefault();
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
            <div className="row">
              <div className="col-md-6">
                <small className="d-inline"> {note.category} {format(note.created_at)} </small>
              </div>
              <div className="col-md-6">
                <button type="button" onClick={() => this.deleteNotes(note._id)} className="btn btn-danger d-inline float-right mx-1"><i class="fas fa-trash"></i></button>
                <button type="button" onClick={() => this.editNotes(note._id)} className="btn btn-warning d-inline float-right mx-1"><i class="fas fa-edit"></i></button>
              </div>
            </div>
          </div>
        </div>
      );         
    });
    /*const notes = this.state.Notes.map((note, i) => {
      return (
        <div className="card shadow mb-3" key={i}>
          <div className="card-header">
            <h5 className="card-title d-inline"> {note.title} </h5>
          </div>
          <div className="card-body">
            <p className="card-text">
              {note.description}
            </p>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col-md-6">
                <small className="d-inline"> {note.category} {format(note.created_at)} </small>
              </div>
              <div className="col-md-6">
                <button type="button" onClick={() => this.deleteNotes(note._id)} className="btn btn-danger d-inline float-right mx-1"><i class="fas fa-trash"></i></button>
                <button type="button" onClick={() => this.editNotes(note._id)} className="btn btn-warning d-inline float-right mx-1"><i class="fas fa-edit"></i></button>
              </div>
            </div>
          </div>
        </div>
      );
    });*/

    const options = this.state.categories.map((option, i) => (<option key={i}>{option.name}</option>));

    return (
      <div className="Notes">
        {/* UpNotes*/}
        <div className="card mb-5">
          <form onSubmit={this.addNotes}>
            <div className="card-body">
              <input id="title" type="text" placeholder="Titulo" className="form-control mb-1" onChange={this.handleChange} value={this.state.title} />
              <textarea id="description" placeholder="Descripción" className="form-control mb-1" onChange={this.handleChange} value={this.state.description} />
              <input id="imagePath" type="file" className="form-control-file float-right mb-1"/>
              <select id="category" className="form-control" onChange={this.handleChange} value={this.state.category}>
                {options}
              </select>
              <div class="dropdown-divider"></div>
              <button type="submit" className="btn btn-success mb-2 float-right">
                Publicar
              </button>
            </div>
          </form>
        </div>
        {/* Notes */}
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
        {Notes}
      </div>
    );
  }
}

export default Notes;