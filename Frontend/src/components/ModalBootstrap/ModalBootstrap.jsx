import React from "react";
import ReactDOM from "react-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

const ModalBootstrap = ({ show, handleClose, isError, Msg }) => {
  return ReactDOM.createPortal(

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Estado registro</Modal.Title>
      </Modal.Header>
      {isError ? (
        <Modal.Body>Ups! Algo salió mal.</Modal.Body>
      ) : (
        <Modal.Body>{Msg}</Modal.Body>
      )}
      <Modal.Footer>
        <Button
          variant="secondary"
          className="btn btn-dark"
          onClick={handleClose}
        >
          Quedarse
        </Button>
        <Link
          to="/"
          variant="primary"
          className="btn btn-success"
          onClick={handleClose}
        >
          Ver Registros
        </Link>
      </Modal.Footer>
    </Modal>
    ,
    document.getElementById("modal")
  );
};

export default ModalBootstrap;
