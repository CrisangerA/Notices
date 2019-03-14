import React, { Component } from 'react';

class UpNotesShort extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div className="UpNotesShort mt-5">
                <div className="container">
                    <div className="mt-5">
                        <h1 className="mt-5">Apuntes</h1>
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">
                            Crear Apunte
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
                                        <th scope="col">Descripción</th>
                                        <th scope="col">Imagen</th>
                                        <th scope="col">Categoria</th>
                                        <th scope="col">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpNotesShort;