import { useEffect, useState } from "react";
import React from "react";
import Axios from "axios";
import ModalBootstrap from "../ModalBootstrap/ModalBootstrap";

// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function RegistrarAsesores() {
  const [show, setShow] = useState(false);
  const [formulario, setFormulario] = useState({
    documento: 0,
    nombre_completo: "",
    correo_educativo: "",
    tipo_asesor: 0,
  });
  const [isError, setIsError] = useState(false);

  function handleChange(e) {
    const inputValue = e.target.value;
    setFormulario({
      ...formulario,
      [e.target.name]: inputValue,
    });
  }
  const postAsesor = () => {
    Axios.post(
      "http://localhost:8080/asesor",
      {
        documento: formulario.documento,
        nombre_completo: formulario.nombre_completo,
        correo_educativo: formulario.correo_educativo,
        tipo_asesor: formulario.tipo_asesor,
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
  const [formError, setFormError] = useState(true);
  function multipleFunction() {
    if (
      formulario.documento !== 0 &&
      formulario.nombre_completo !== "" &&
      formulario.correo_educativo !== "" &&
      formulario.tipo_asesor !== 0
    ) {
      if (formulario.correo_educativo.includes("@elpoli.edu.co")) {
        if (
          parseInt(formulario.documento) > 0 &&
          parseInt(formulario.tipo_asesor) > 0
        ) {
          setFormError(false);
        } else {
          alert("Los campos numericos deben ser mayores a 0");
        }
      } else {
        alert("El correo institucional debe ser de la universidad");
      }
    } else {
      alert("Valide los datos en el formulario");
    }
  }

  useEffect(() => {
    if (!formError) {
      postAsesor();
      setShow(true);
    }
  }, [formError]);

  return (
    <div className="d-flex flex-column align-items-center">
      <ModalBootstrap
        show={show}
        handleClose={() => setShow(false)}
        isError={isError}
        Msg={"Se ha creado el registro exitosamente"}
      />
      <h2 style={{ color: "black" }}>Registra un asesor</h2>
      <div>
        <div className="form-group">
          <label>Documento</label>
          <input
            type="number"
            name="documento"
            className="form-control"
            value={formulario.documento}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Asesor, recuerde colocar el documento de identidad sin errores. Ya
            que después no sé podrá editar si no se escala con la
            administración.
          </small>
        </div>
        <div className="form-group">
          <label>Nombre Completo</label>
          <input
            type="text"
            name="nombre_completo"
            className="form-control"
            value={formulario.nombre_completo}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Correo educativo</label>
          <input
            type="email"
            name="correo_educativo"
            className="form-control"
            value={formulario.correo_educativo}
            onChange={handleChange}
          />
        </div>
        <div className="input-group-text w-100 mt-3">
          <input
            className="form-check-input mt-0"
            name="tipo_asesor"
            type="radio"
            value="1"
            onChange={handleChange}
            aria-label="Asesor Metodologico"
          />
          <p style={{ marginLeft: "16px" }} className="ml-5 mb-0">
            Asesor Metodologico
          </p>
        </div>
        <div className="input-group-text w-100 mt-3">
          <input
            className="form-check-input mt-0"
            name="tipo_asesor"
            type="radio"
            value="2"
            onChange={handleChange}
            aria-label="Asesor Tecnologico"
          />
          <p style={{ marginLeft: "16px" }} className="mb-0">
            Asesor Tecnologico
          </p>
        </div>

        <div className="form-group">
          <button onClick={multipleFunction} className="btn btn-success">
            Crear asesores
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrarAsesores;
