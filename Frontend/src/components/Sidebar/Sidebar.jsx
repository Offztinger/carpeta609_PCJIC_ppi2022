import { NavLink } from "react-router-dom";
import './Sidebar.css'

export default function Sidebar({ user }) {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white"
      style={{ width: "280px", height: "100%", backgroundColor: "#013a06" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <img
          src="https://www.politecnicojic.edu.co/images/logo/logo.png"
          width={"100%"}
        />
      </a>
      <hr />
      <ul className="sidebar-content">
        <li className="nav-item">
          <NavLink
            to="/estudiantes"
            className="nav-link text-white"
            aria-current="page"
          >
            <svg className="bi me-2" width="16" height="16">
              <use href="#home"></use>
            </svg>
            Estudiantes
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/profesores"
            className="nav-link text-white"
            aria-current="page"
          >
            <svg className="bi me-2" width="16" height="16">
              <use href="#home"></use>
            </svg>
            Profesores
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/asesores"
            className="nav-link text-white"
            aria-current="page"
          >
            <svg className="bi me-2" width="16" height="16">
              <use href="#home"></use>
            </svg>
            Asesores
          </NavLink>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a
          to="/"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>{user.email.split('@')[0]}</strong>
        </a>
        <ul
          className="dropdown-menu dropdown-menu-dark text-small shadow"
          aria-labelledby="dropdownUser1"
        >
          <li>
            <a className="dropdown-item" to="/">
              New project...
            </a>
          </li>
          <li>
            <a className="dropdown-item" to="/">
              Settings
            </a>
          </li>
          <li>
            <a className="dropdown-item" to="/">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" to="/">
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
