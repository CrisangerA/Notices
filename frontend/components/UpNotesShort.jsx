import React, { Component } from "react";

class UpNotesShort extends Component {
  constructor() {
    super();
    this.state = {
      description: '',
      category: 'Otro',
      _id: '',
      NotesShort: [],
      categories: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.addNotes = this.addNotes.bind(this);
    this.editNotes = this.editNotes.bind(this);
    this.deleteNotes = this.deleteNotes.bind(this);
    this.limpiarForm = this.limpiarForm.bind(this);
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

  getCategories() {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        this.setState({
          categories: data
        });
      });
  }

  componentDidMount(){
    this.getNotesShort();
    this.getCategories();
  }

  handleChange(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  addNotes(e){
    if(this.state._id){
      const { description, category } = this.state;
      const editNote = { description, category };
      fetch(`/api/notesshort/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify(editNote),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            description: '',
            category: '',
            category: 'Otro',
            _id: ''
          })
          this.getNotesShort();
          $('#myModal').modal('hide');
        })
        .catch(err => console.error(err))
    }
    else{
      const { description, category } = this.state;
      const newNote = { description, category };
      fetch('/api/notesshort', {
        method: 'POST',
        body: JSON.stringify(newNote),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            description: '',
            category: '',
            category: 'Otro'
          })
          this.getNotesShort();
        })
        .catch(err => console.error(err));
    }
    e.preventDefault();
  }

  editNotes(id){
    fetch(`/api/notesshort/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          description: data.description,
          category: data.category,
          _id: data._id
        })
        $('#myModal').modal('show');
      })
  }

  deleteNotes(id){
    if(confirm('¿Eliminar apunte?')){
      fetch(`/api/notesshort/${id}`,{
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(data => {
          this.getNotesShort();
        })
        .catch(err => console.error(err));
    }
  }

  limpiarForm(){
    this.setState({
      description: '',
      category: '',
      category: 'Otro',
      _id: ''
    });
    $('#myModal').modal('hide');
  }

  render() {
    const Notes = notes.map((note, i) => {
      return(
        <tr key={i}>
          <td> {i+1} </td>
          <td> {note.description} </td>
          <td> {note.category} </td>
          <td>
            <button type="button" className="btn btn-warning d-inline m-1" onClick={() => this.editNotes(note._id)}>
              <i className="fas fa-edit" />
            </button>
            <button type="button" className="btn btn-danger d-inline m-1" onClick={() => this.deleteNotes(note._id)}>
              <i className="fas fa-trash" />
            </button>
          </td>
        </tr>
      )
    }).reverse();

    const options = this.state.categories.map((option, i) => <option key={i}> {option.name} </option>);

    return (
      <div id="UpNotesShort" className="UpNotesShort mt-5">
        <div className="container">
          <div className="mt-5">
            <h1 className="mt-5">Apuntes</h1>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">
              Crear Apunte
            </button>
          </div>

          <div id="myModal" className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <form onSubmit={this.addNotes}>
                  <div className="card-body">
                    <textarea id="description" placeholder="Descripción" cols="30" rows="4" className="form-control mb-1"
                      onChange={this.handleChange} value={this.state.description} />
                    <select id="category" className="form-control" onChange={this.handleChange} value={this.state.category}>
                      {options}
                    </select>
                    <div class="dropdown-divider" />
                    <button type="button" className="btn btn-danger mb-2 float-left" onClick={this.limpiarForm}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-success mb-2 float-right">
                      Publicar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="dropdown-divider" />
          {/* NotesShort */}
          <div className="card shadow-lg mt-5">
            <div className="card-header" />
            <div className="card-body" style={{ overflow: "auto" }}>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {Notes}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpNotesShort;
