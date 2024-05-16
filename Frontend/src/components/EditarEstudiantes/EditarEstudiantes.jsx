import { useState, useEffect } from "react";
import "../EditarEstudiantes/EditarEstudiantes.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";
import { Link } from "react-router-dom";
import ModalBootstrap from "../ModalBootstrap/ModalBootstrap";

function EditarEstudiantes({ putIDEs, setPutIDEs }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [putEstudiante, setPutEstudiante] = useState({});

  const fetchApi = async () => {
    const response = await fetch(
      `http://localhost:8080/estudiante/${putIDEs}`,
      {
        method: "GET",
      }
    );
    const responseJSON = await response.json();
    setPutEstudiante(responseJSON);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  function handleChange(e) {
    const inputValue = e.target.value;
    setPutEstudiante({
      ...putEstudiante,
      [e.target.name]: inputValue,
    });
  }

  const updateEstudiante = () => {
    Axios.put(
      `http://localhost:8080/estudiante/${putIDEs}`,
      {
        documento: putEstudiante.documento,
        nombre_completo: putEstudiante.nombre_completo,
        telefono_fijo: putEstudiante.telefono_fijo,
        celular: putEstudiante.celular,
        correo_institucional: putEstudiante.correo_institucional,
        correo_personal: putEstudiante.correo_personal,
        codigo_plan: putEstudiante.codigo_plan,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function multipleFunction() {
    updateEstudiante();
    setTimeout(() => {
      handleShow();
    }, 2000);
  }

  return (
    <div className="contenedorEstudiantes">
      <br />
      <ModalBootstrap
        show={show}
        handleClose={() => setShow(false)}
        Msg={('Se han editado correctamente los datos')}
      />
      <div className="d-flex flex-column align-items-center">
        <br />
        <h2>Edita un estudiante</h2>
        <div>
          <div className="form-group">
            <label>Documento</label>
            <input
              type="number"
              name="documento"
              className="form-control"
              value={putEstudiante.documento}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Nombre Completo</label>
            <input
              type="text"
              name="nombre_completo"
              className="form-control"
              value={putEstudiante.nombre_completo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Telefono Fijo</label>
            <input
              type="number"
              name="telefono_fijo"
              className="form-control"
              value={putEstudiante.telefono_fijo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Celular</label>
            <input
              type="number"
              name="celular"
              className="form-control"
              value={putEstudiante.celular}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Correo institucional</label>
            <input
              type="email"
              name="correo_estudiantil"
              className="form-control"
              value={putEstudiante.correo_estudiantil}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Correo Personal</label>
            <input
              type="email"
              name="correo_personal"
              className="form-control"
              value={putEstudiante.correo_personal}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Código Plan</label>
            <input
              type="number"
              name="codigo_plan"
              className="form-control"
              value={putEstudiante.codigo_plan}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button onClick={multipleFunction} className="btn btn-primary">
              Actualizar estudiante
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarEstudiantes;
