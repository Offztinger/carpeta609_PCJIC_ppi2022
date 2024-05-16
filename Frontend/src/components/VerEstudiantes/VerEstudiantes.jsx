import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import XLSX from 'xlsx-js-style';
import '../VerEstudiantes/VerEstudiantes.css'
import download from '../../icons/downloadfile.svg'

function VerEstudiantes({ estudiantes, setPutIDEs }) {
  const [deleteIDEs, setDeleteIDEs] = useState();
  const [show, setShow] = useState(false);
  const deleteEstudiante = () => {
    const response = fetch(`http://localhost:8080/estudiante/${deleteIDEs}`, {
      method: "DELETE",
    });
    // console.log("DELETE status" + response.status());
  };

  const exportToExcel = () => {
    // Creación del libro de trabajo
    const wb = XLSX.utils.book_new();
    // Creación de columnas de datos
    let row = [[
      { v: "Documento", t: "s", s: {} },
      { v: "Nombre Completo", t: "s", s: {} },
      { v: "Telefono Fijo", t: "s", s: {} },
      { v: "Celular", t: "s", s: {} },
      { v: "Correo institucional", t: "s", s: {} },
      { v: "Correo personal", t: "s", s: {} },
      { v: "Codigo plan", t: "s", s: {} },
      { v: "Modulo sol", t: "s", s: {} },
    ]];
    estudiantes.forEach(estudiante => {
      row = [...row, [
        {
          v: estudiante.documento, t: "s", s: {}
        },
        {
          v: estudiante.nombre_completo, t: "s", s: {}
        },
        {
          v: estudiante.telefono_fijo, t: "s", s: {}
        },
        {
          v: estudiante.celular, t: "s", s: {}
        },
        {
          v: estudiante.correo_estudiantil, t: "s", s: {}
        },
        {
          v: estudiante.correo_personal, t: "s", s: {}
        },
        {
          v: estudiante.codigo_plan, t: "s", s: {}
        },
        {
          v: estudiante.modulo_sol, t: "s", s: {}
        }

      ]]
    })
    const ws = XLSX.utils.aoa_to_sheet(row);
    XLSX.utils.book_append_sheet(wb, ws, + "Estudiantes");
    // Descarga del archivo desde el navegador
    XLSX.writeFile(wb, "lista" + "Estudiantes" + ".xlsx");
  }

  return (
    <div className="contenedorEstudiantes">
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>Está seguro que desea eliminar este registro?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-dark"
            onClick={() => setShow(false)}
          >
            ¡No!
          </Button>
          <Button
            variant="primary"
            className="btn btn-warning"
            onClick={() => {
              setShow(false);
              deleteEstudiante();
            }}
          >
            Sí, deseo eliminarlo
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex w-100 flex-column align-items-center">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Documento</th>
              <th scope="col">Nombre Completo</th>
              <th scope="col">Telefono Fijo</th>
              <th scope="col">Celular</th>
              <th scope="col">Correo Institucional</th>
              <th scope="col">Correo Personal</th>
              <th scope="col">Código Plan</th>
              <th scope="col">Modulo sol</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map((estudiante, index) => {
              return (
                <tr key={index}>
                  <td>{estudiante.documento}</td>
                  <td>{estudiante.nombre_completo}</td>
                  <td>{estudiante.telefono_fijo}</td>
                  <td>{estudiante.celular}</td>
                  <td>{estudiante.correo_estudiantil}</td>
                  <td>{estudiante.correo_personal}</td>
                  <td>{estudiante.codigo_plan}</td>
                  <td>{estudiante.modulo_sol}</td>
                  <td>
                    <Link
                      style={{ marginRight: "8px" }}
                      type="button"
                      className="btn btn-success"
                      onClick={() => setPutIDEs(estudiante.documento)}
                      to="/editEstudiante"
                    >
                      Editar
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        setShow(true);
                        setDeleteIDEs(estudiante.documento);
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="">
        <a data-tooltip-id="my-tooltip" data-tooltip-content="Hello world!">
              
          <button className="" onClick={() => {
            exportToExcel()
          }}><img src={download} alt="" style={{height:"45px"}} /></button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default VerEstudiantes;
