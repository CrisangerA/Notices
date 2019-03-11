import React, { Component } from "react";

class UpNotes extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      imagePath: '',
      category: ' Otro ',
      categories: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.getCategories();
    console.log('componentDidMount');
  }

  handleChange(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  handleSubmit(e){
    const { title, description, imagePath, category } = this.state;
    const newNote = { title, description, imagePath, category };
    this.props.onAddNotes(newNote);
    this.setState({
      title: '',
      description: '',
      imagePath: '',
      category: ' Otro ',
    });
    e.preventDefault();
  }

  render() {
    const options = this.state.categories.map((option, i) => (
      <option key={i}>{option.name}</option>
    ));

    return (
      <div className="card mb-5">
        <form onSubmit={this.handleSubmit}>
          <div className="card-body">
            <input id="title" type="text" placeholder="Titulo" className="form-control mb-1" onChange={this.handleChange} value={this.state.title} />
            <textarea id="description" placeholder="Descripción" className="form-control mb-1" onChange={this.handleChange} value={this.state.description} />
            <input id="imagePath" type="file" className="form-control-file float-right mb-1"/>
            <select id="category" className="form-control" onChange={this.handleChange} value={this.state.category}>
              {options}
            </select>
            <div class="dropdown-divider"></div>
            <h1>{console.log(this.props.onEditNote)}</h1>
            <button type="submit" className="btn btn-success mb-2 float-right">
              Publicar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UpNotes;
