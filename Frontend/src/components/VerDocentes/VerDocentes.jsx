import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function VerDocentes() {
  const [docentes, setDocentes] = useState([]);
  const [deleteIDEs, setDeleteIDEs] = useState();
  const [show, setShow] = useState(false);
  const fetchApi = async () => {
    const response = await fetch("http://localhost:8080/docente", {
      method: "GET",
    });
    const responseJSON = await response.json();
    setDocentes(responseJSON);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const deleteDocente = () => {
    const response = fetch(`http://localhost:8080/docente/${deleteIDEs}`, {
      method: "DELETE",
    });
    // console.log("DELETE status" + response.status());
  };

  return (
    <div>
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
              deleteDocente();
            }}
          >
            Sí, deseo eliminarlo
          </Button>
        </Modal.Footer>
      </Modal>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Documento</th>
            <th scope="col">Nombre docente</th>
            <th scope="col">Correo educativo</th>
            <th scope="col">Modulo Sol</th>
            <th scope="col">Tipo de modulo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {docentes.map((docente, index) => {
            return (
              <tr key={index}>
                <td>{docente.documento}</td>
                <td>{docente.nombre_completo}</td>
                <td>{docente.correo_educativo}</td>
                <td>{docente.modulo_sol}</td>
                <td>
                  {docente.tipo_modulo != 2
                    ? "Modulo Sol Principal"
                    : "Modulo Sol Alternativo"}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      setShow(true);
                      setDeleteIDEs(docente.documento);
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
    </div>
  );
}

export default VerDocentes;
