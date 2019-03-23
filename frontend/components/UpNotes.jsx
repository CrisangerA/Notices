import React, { Component } from "react";

class UpNotes extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
      imagePath: "",
      category: "Otro",
      _id: "",
      Notes: [],
      categories: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addNotes = this.addNotes.bind(this);
    this.editNotes = this.editNotes.bind(this);
    this.deleteNotes = this.deleteNotes.bind(this);
    this.limpiarForm = this.limpiarForm.bind(this);
  }

  getNotes() {
    fetch("/api/notes")
      .then(res => res.json())
      .then(data => {
        this.setState({
          Notes: data
        });
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

  componentDidMount() {
    this.getCategories();
    this.getNotes();
  }

  handleChange(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  addNotes(e) {
    if (this.state._id) {
      const { description, imagePath, category } = this.state;
      const editNote = { description, imagePath, category };
      fetch(`/api/notes/${this.state._id}`, {
        method: "PUT",
        body: JSON.stringify(editNote),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            description: "",
            imagePath: "",
            category: "Otro",
            _id: ""
          });
          this.getNotes();
        })
        .catch(err => console.error(err));
    } else {
      const { description, imagePath, category } = this.state;
      const newNote = { description, imagePath, category };
      fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify(newNote),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            title: "",
            description: "",
            imagePath: "",
            category: "Otro"
          });
          this.getNotes();
        })
        .catch(err => console.error(err));
    }
    e.preventDefault();
  }

  editNotes(id) {
    fetch(`/api/notes/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          description: data.description,
          imagePath: data.imagePath,
          category: data.category,
          _id: data._id
        });
        $("#myModal").modal("show");
      });
  }

  deleteNotes(id) {
    if (confirm("¿Eliminar noticia?")) {
      fetch(`/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.getNotes();
        })
        .catch(err => console.error(err));
    }
  }

  limpiarForm() {
    this.setState({
      description: "",
      imagePath: "",
      category: "Otro",
      _id: ""
    });
    $("#myModal").modal("hide");
  }

  render() {
    const Notes = notesReverce.map((note, i) => {
      return (
        <tr key={i}>
          <th scope="row">{i + 1}</th>
          <td>{note.description}</td>
          <td>{note.imagePath}</td>
          <td>{note.category}</td>
          <td>
            <button type="button" className="btn btn-warning d-inline m-1" onClick={() => this.editNotes(note._id)}>
              <i className="fas fa-edit" />
            </button>
            <button type="button" className="btn btn-danger d-inline m-1" onClick={() => this.deleteNotes(note._id)}>
              <i className="fas fa-trash" />
            </button>
          </td>
        </tr>
      );
    }).reverse();

    const options = this.state.categories.map((option, i) => (
      <option key={i}>{option.name}</option>
    ));
    return (
      <div id="UpNotes" className="UpNotes mt-5">
        <div className="container">
          <div className="mt-5">
            <h1 className="mt-5">Noticias</h1>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">
              Crear Noticia
            </button>
          </div>

          <div id="myModal" className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <form onSubmit={this.addNotes}>
                  <div className="card-body">
                    <textarea id="description" placeholder="Descripción" cols="30" rows="4" className="form-control mb-1"
                      onChange={this.handleChange} value={this.state.description} />
                    <input id="imagePath" type="file" className="form-control-file float-right mb-1"/>
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

          {/* Notes */}
          <div className="card shadow-lg mt-5">
            <div className="card-header" />
            <div className="card-body" style={{ overflow: "auto" }}>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Imagen</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Opciones</th>
                  </tr>
                </thead>
                <tbody>{Notes}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UpNotes;