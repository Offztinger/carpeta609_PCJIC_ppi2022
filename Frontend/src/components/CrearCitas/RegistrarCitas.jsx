import { useEffect, useState } from "react";
import React from "react";
import Axios from "axios";
import ModalBootstrap from "../ModalBootstrap/ModalBootstrap";

// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function RegistrarCitas({ cronograma }) {
  const [show, setShow] = useState(false);
  const [formulario, setFormulario] = useState({
    numero_cita: 0,
    titulo: "",
    fecha: "",
    hora_inicio: "",
    hora_fin: "",
    descripcion: "",
    lugar: "",
  });
  const [isError, setIsError] = useState(false);

  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const cronogramaActual = cronograma.map((cita) => {
      return {
        fecha: `${cita.fecha}-${cita.hora_inicio}`,
      };
    });

    setCitas(cronogramaActual);
  }, [cronograma]);

  function handleChange(e) {
    const inputValue = e.target.value;
    setFormulario({
      ...formulario,
      [e.target.name]: inputValue,
    });
  }
  const postCita = async () => {
    const citaActual = `${formulario.fecha}-${formulario.hora_inicio}`;
    const citaExiste = citas.find((cita) => cita.fecha === citaActual);
    if (citaExiste) {
      return alert("La cita ya existe");
    }

    setShow(true);
    return await Axios.post(
      "http://localhost:8080/cronograma",
      {
        numero_cita: formulario.numero_cita,
        titulo: formulario.titulo,
        fecha: formulario.fecha,
        hora_inicio: formulario.hora_inicio,
        hora_fin: formulario.hora_fin,
        descripcion: formulario.descripcion,
        lugar: formulario.lugar,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((res) => {
        console.log(`CÓDIGO POST ESTUDIANTE: ${res.status}`);
        setIsError(false);
      })
      .catch((error) => {
        console.error(error);
        setIsError(true);
      });
  };

  function multipleFunction() {
    if (
      formulario.titulo !== "" &&
      formulario.fecha !== "" &&
      formulario.hora_inicio !== "" &&
      formulario.hora_fin !== "" &&
      formulario.descripcion !== "" &&
      formulario.lugar !== ""
    ) {
      const today = new Date();
      const date = new Date(formulario.fecha);
      if (date >= today) {
        postCita();
        setFormulario({
          numero_cita: 0,
          titulo: "",
          fecha: "",
          hora_inicio: "",
          hora_fin: "",
          descripcion: "",
          lugar: "",
        });
      } else {
        alert("La fecha no puede ser menor a la actual");
      }
    } else {
      alert("Por favor ingrese todos los datos");
    }
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <ModalBootstrap
        show={show}
        handleClose={() => setShow(false)}
        isError={isError}
        Msg={"Se ha creado el registro exitosamente"}
      />
      <h2 style={{ color: "black" }}>Registra un cita</h2>
      <div>
        <div className="form-group">
          <label>Titulo</label>
          <input
            type="text"
            name="titulo"
            className="form-control"
            value={formulario.titulo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Fecha</label>
          <input
            type="date"
            name="fecha"
            className="form-control"
            value={formulario.fecha}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Hora inicio</label>
          <input
            type="time"
            name="hora_inicio"
            className="form-control"
            value={formulario.hora_inicio}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Hora fin</label>
          <input
            type="time"
            name="hora_fin"
            className="form-control"
            value={formulario.hora_fin}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Descripcion</label>
          <input
            type="textarea"
            name="descripcion"
            className="form-control"
            value={formulario.descripcion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Lugar</label>
          <input
            type="text"
            name="lugar"
            className="form-control"
            value={formulario.lugar}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button onClick={multipleFunction} className="btn btn-success">
            Crear citas
          </button>
        </div>
      </div>
    </div>
  );
}
export default RegistrarCitas;
