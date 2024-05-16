import React from "react";
import { useState, useEffect } from "react";
import { studentFormatter } from "./studentFormatter";

function CrearEquipos() {
  const [formulario, setFormulario] = useState({
    documento: "",
  });
  const [equipos, setEquipos] = useState([]);
  const [estudiantesEquipo, setEstudiantesEquipo] = useState([]);
  const [estudiante, setEstudiante] = useState([]);
  const [docentes, setDocentes] = useState([]);
  function handleChange(e) {
    const inputValue = e.target.value;
    setFormulario({
      ...formulario,
      [e.target.name]: inputValue,
    });
  }
  const buscarEstudiante = async (documento) => {
    const response = await fetch(
      `http://localhost:8080/estudiante/${documento}`,
      {
        method: "GET",
      }
    );
    const responseJSON = await response.json();
    setEstudiante(responseJSON);
    // setEstudiantesEquipo([...estudiantesEquipo, responseJSON]);
  };

  const getDocente = async () => {
    const response = await fetch(`http://localhost:8080/docente`, {
      method: "GET",
    });
    const responseJSON = await response.json();
    setDocentes(responseJSON);
  };

  const getEquipos = async () => {
    const response = await fetch(`http://localhost:8080/equipo`, {
      method: "GET",
    });
    const responseJSON = await response.json();
    setEquipos(responseJSON);
  };

  const crearEquipo = async (estudiantesEquipo) => {
    if (estudiantesEquipo.length >= 1) {
      const response = await fetch(`http://localhost:8080/equipo`, {
        method: "POST",
        body: JSON.stringify(estudiantesEquipo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status == 201) {
        alert("Equipo creado exitosamente");
        setEstudiantesEquipo([]);
      }
    } else {
      alert("Debe haber al menos 2 estudiantes en el equipo");
    }
  };

  useEffect(() => {
    if (estudiante.documento != null) {
      // Verificar si el estudiante ya está en el equipo
      const estudianteRepetido = estudiantesEquipo.find(
        (est) => est.documento === estudiante.documento
      );

      const estudianteExistente = equipos.filter(
        (equipo) => equipo.documento == estudiante.documento
      );

      if (estudianteRepetido != undefined) {
        alert("Este estudiante ya está en el equipo");
        return;
      }

      if (estudianteExistente.length > 0) {
        alert("Este estudiante ya está en otro equipo");
        return;
      }
      const docente_encargado = docentes.filter(
        (docente) => docente.modulo_sol === estudiante.modulo_sol
      )[0].nombre_completo;
      let numero_equipo = 0;
      if (equipos.length === 0) {
        numero_equipo = 400;
      } else {
        numero_equipo = parseInt(equipos[equipos.length - 1].numero_equipo) + 1;
      }
      if (estudiantesEquipo.length === 0) {
        const newStudent = studentFormatter(
          estudiante,
          numero_equipo,
          docente_encargado
        );
        setEstudiantesEquipo([newStudent]);
      } else {
        // Verificar la compatibilidad del módulo_sol
        if (estudiantesEquipo.length < 3) {
          if (estudiante.modulo_sol === estudiantesEquipo[0].modulo_sol) {
            const newStudent = studentFormatter(
              estudiante,
              numero_equipo,
              docente_encargado
            );
            setEstudiantesEquipo([...estudiantesEquipo, newStudent]);
          } else {
            alert("Los estudiantes deben pertenecer al mismo módulo sol");
          }
        } else {
          alert("No se pueden agregar más de 3 estudiantes por equipo");
        }
      }
    }
  }, [estudiante]);

  useEffect(() => {
    getDocente();
    getEquipos();
    const estudiantesEquipo = JSON.parse(
      localStorage.getItem("estudiantesEquipo")
    );
    if (estudiantesEquipo) {
      setEstudiantesEquipo(estudiantesEquipo);
    }
  }, []);

  return (
    <div>
      <div>
        <p>Digite un número de cédula para añadir al equipo</p>

        <div
          style={{ border: "1px solid black", borderRadius: "20px" }}
          className="d-flex justify-content-between align-items-center"
        >
          <input
            className="w-100"
            style={{
              border: "none",
              background: "transparent",
              outline: "none",
              paddingLeft: "5px",
              fontSize: "15px",
            }}
            type="number"
            name="documento"
            value={formulario.documento}
            onChange={handleChange}
          />
          <button
            onClick={() => {
              buscarEstudiante(formulario.documento);
            }}
          >
            <svg
              fill="#000000"
              height="20px"
              style={{ margin: "5px" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
            </svg>
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Documento</th>
            <th scope="col">Nombre Completo</th>
            <th scope="col">Modulo Sol</th>
            <th scope="col">Docente Encargado</th>
            <th scope="col">Numero Equipo</th>
          </tr>
        </thead>
        <tbody>
          {estudiantesEquipo.map((equipo, index) => {
            return (
              <tr key={index}>
                <td>{equipo.documento}</td>
                <td>{equipo.nombre_completo}</td>
                <td>{equipo.modulo_sol}</td>
                <td>{equipo.docente_encargado}</td>
                <td>{equipo.numero_equipo}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <button
          onClick={() => {
            crearEquipo(estudiantesEquipo);
          }}
          className="btn btn-success"
        >
          Crear equipo
        </button>
      </div>
    </div>
  );
}

export default CrearEquipos;
