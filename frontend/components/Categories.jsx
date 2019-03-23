import React, { Component } from "react";

class Categories extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      _id: '',
      Categories: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addCategories = this.addCategories.bind(this);
    this.editCategories = this.editCategories.bind(this);
    this.deleteCategories = this.deleteCategories.bind(this);
    this.limpiarForm = this.limpiarForm.bind(this);
  }

  getCategories() {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        this.setState({
          Categories: data
        });
      });
  }

  componentDidMount() {
    this.getCategories();
  }

  handleChange(e){
    const { id, value } = e.target;
    this.setState({ [id]: value});
  }

  limpiarForm(){
    this.setState({name: '', _id: ''});
    $('#myModal').modal('hide');
  }

  addCategories(e){
    if(this.state._id){
      const { name } = this.state;
      const editCategorie = { name };
      fetch(`/api/categories/${this.state._id}`,{
        method: 'PUT',
        body: JSON.stringify(editCategorie),
        headers: {
          Accept: 'Application/json',
          'Content-Type': 'Application/json'
        }
      })
        .then(res => res.json())
        .then(data =>{
          this.setState({ name: '', _id: ''});
          this.getCategories();
          $('#myModal').modal('hide')
        })
        .catch(err => console.error(err))
    }
    else{
      const { name } = this.state;
      const newCategorie = { name };
      fetch('/api/categories',{
        method: 'POST',
        body: JSON.stringify(newCategorie),
        headers: {
          Accept: 'Application/json',
          'Content-Type': 'Application/json'
        }
      })
        .then(res => res.json())
        .then(data =>{
          this.setState({ name: ''});
          this.getCategories();
        })
        .catch(err => console.error(err));
    }
    e.preventDefault();
  }

  editCategories(id){
    fetch(`/api/categories/${id}`)
      .then(res => res.json())
      .then(data =>{
        this.setState({ name: data.name, _id: data._id});
        $('#myModal').modal('show');
      })
      .catch(err => console.error(err));
  }

  deleteCategories(id){
    if(confirm('¿Eliminar categoria?')){
      fetch(`/api/categories/${id}`,{
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(data => {
          this.getCategories();
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    const categories = this.state.Categories.map((categorie, i) => {
      return (
        <tr key={i}>
          <th scope="row">{i + 1}</th>
          <td>{categorie.name}</td>
          <td>
            <button type="button" className="btn btn-warning d-inline m-1" onClick={() => this.editCategories(categorie._id)}>
              <i className="fas fa-edit" />
            </button>
            <button type="button" className="btn btn-danger d-inline m-1" onClick={() => this.deleteCategories(categorie._id)}>
              <i className="fas fa-trash" />
            </button>
          </td>
        </tr>
      );
    }).reverse();

    return (
      <div id="Categories" className="Categories mt-5">
        <div className="container">
          <div className="mt-5">
            <h1 className="mt-5">Categorias</h1>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">
              Crear Categoria
            </button>
          </div>

          <div id="myModal" className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <form onSubmit={this.addCategories}>
                  <div className="card-body">
                    <input id="name" type="text" placeholder="Nombre" onChange={this.handleChange} value={this.state.name} className="form-control"/>
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
          <div className="card shadow-lg mt-5 mb-5">
            <div className="card-header" />
            <div className="card-body" style={{ overflow: "auto" }}>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Opciones</th>
                  </tr>
                </thead>
                <tbody>{categories}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Categories;
