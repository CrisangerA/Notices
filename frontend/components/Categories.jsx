import React, { Component } from 'react';

class Categories extends Component {
    constructor(){
        super();
        this.state = {
            Categories: []
        }
    }

    getCategories(){
        fetch('/api/categories')
            .then(res => res.json())
            .then(data =>{
                this.setState({
                    Categories: data
                })
            })
    }

    componentDidMount(){this.getCategories();}

  render() {

    const categories = this.state.Categories.map((categorie, i) =>{
        return(
            <tr key={i}>
                <th scope="row">{i+1}</th>
                <td>{categorie.name}</td>
            </tr>
        )
    })

    return (
      <div className="Categories mt-5">
          <div className="container">
              <div className="mt-5">
                    <h1 className="mt-5">Categorias</h1>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">
                        Crear Categoria
                    </button>
              </div>

              <div class="dropdown-divider"></div>
              {/* NotesShort */}
              <div className="card shadow-lg mt-5">
                <div className="card-header">
                </div>
                <div className="card-body" style={{overflow: 'auto'}}>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
      </div>
    );
  }
}

export default Categories;