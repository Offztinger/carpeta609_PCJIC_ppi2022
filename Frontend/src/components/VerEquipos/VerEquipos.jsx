import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function VerEquipos() {
  const [equipos, setEquipos] = useState([]);
  const [deleteIDEs, setDeleteIDEs] = useState();
  const [show, setShow] = useState(false);
  const fetchApi = async () => {
    const response = await fetch("http://localhost:8080/equipo", {
      method: "GET",
    });
    const responseJSON = await response.json();
    setEquipos(responseJSON);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const deleteEquipo = () => {
    const response = fetch(`http://localhost:8080/equipo/${deleteIDEs}`, {
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
              deleteEquipo();
            }}
          >
            Sí, deseo eliminarlo
          </Button>
        </Modal.Footer>
      </Modal>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre Completo</th>
            <th scope="col">Modulo Sol</th>
            <th scope="col">Docente Encargado</th>
            <th scope="col">Numero Equipo</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((equipo, index) => {
            return (
              <tr key={index}>
                <td>{equipo.nombre_completo}</td>
                <td>{equipo.modulo_sol}</td>
                <td>{equipo.docente_encargado}</td>
                <td>{equipo.numero_equipo}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      setShow(true);
                      setDeleteIDEs(equipo.id);
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

export default VerEquipos;
