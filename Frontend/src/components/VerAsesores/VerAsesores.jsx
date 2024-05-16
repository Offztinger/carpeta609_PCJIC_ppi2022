import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function VerAsesores() {
  const [asesores, setAsesores] = useState([]);
  const [deleteIDEs, setDeleteIDEs] = useState();
  const [show, setShow] = useState(false);
  const fetchApi = async () => {
    const response = await fetch("http://localhost:8080/asesor", {
      method: "GET",
    });
    const responseJSON = await response.json();
    setAsesores(responseJSON);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const deleteAsesor = () => {
    const response = fetch(`http://localhost:8080/asesor/${deleteIDEs}`, {
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
              deleteAsesor();
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
            <th scope="col">Nombre asesor</th>
            <th scope="col">Correo</th>
            <th scope="col">Tipo de asesor</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {asesores.map((asesor, index) => {
            return (
              <tr key={index}>
                <td>{asesor.documento}</td>
                <td>{asesor.nombre_completo}</td>
                <td>{asesor.correo_educativo}</td>
                <td>
                  {asesor.tipo_asesor != 2
                    ? "Asesor Metodologico"
                    : "Asesor Tecnologico"}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      setShow(true);
                      setDeleteIDEs(asesor.documento);
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

export default VerAsesores;
