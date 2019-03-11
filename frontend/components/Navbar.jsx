import React, { Component } from "react";
//import Logo from '../assets/Logo.png';

class Navbar extends Component {
  render() {
    return (
      <nav id="navbar" className="navbar navbar-expand-lg navbar-dark bg-transparent fixed-top">
        <a className="navbar-brand" href="#">
          {/*<img src={Logo} className="Navbar-Logo" alt="Noticias"></img>*/}
          <i className="fab fa-react" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Los apuntes de mardel <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                <i className="fas fa-user-circle" /> Login
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
