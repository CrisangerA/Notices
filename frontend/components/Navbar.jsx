import React, { Component } from "react";
import { Link } from 'react-router-dom';
//import Logo from '../assets/Logo.png';

class Navbar extends Component {
  render() {
    return (
      <nav id="Navbar" className="navbar navbar-expand-lg navbar-dark fixed-top">
          <Link to="/">
            {/*<img src={Logo} className="Navbar-Logo" alt="Noticias"></img>*/}
            <a className="navbar-brand text-light"><i className="fab fa-react"/> Inicio</a>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Categorias
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">Tecnología</a>
                  <a className="dropdown-item" href="#">Educación</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Política</a>
                </div>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link to="/Notes" className="nav-link">
                  <i class="fas fa-upload"></i> Publicar
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fas fa-cogs"></i> Administrar
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/Notes">Noticias</Link>
                  <Link className="dropdown-item" to="/NotesShort">Apuntes</Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="/Categories">Categorias</Link>
                </div>
              </li>
            </ul>
          </div>
      </nav>
    );
  }
}

export default Navbar;
