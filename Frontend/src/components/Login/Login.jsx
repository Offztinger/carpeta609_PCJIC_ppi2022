import React, { useState } from "react";
import Axios from "axios";

export default function Login({ setIsLogged, isLogged, user, setUser }) {
  console.log(isLogged);

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post(
      "http://127.0.0.1:4000/auth/login",
      {
        email: user.email,
        password: user.password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((res) => {
        console.log(`Login Exitoso: ${res.status}`);
        setIsLogged(true);
      })
      .catch((error) => {
        console.error(error);
        alert(error.response.data.message);
      });
  };

  return (
    <form className="d-flex flex-column mt-5 w-25 " onSubmit={handleSubmit}>
      <label htmlFor="username">Usuario:</label>
      <input
        className="form-control"
        type="text"
        id="email"
        name="email"
        value={user.email}
        onChange={(e) =>
          setUser({
            ...user,
            email: e.target.value,
          })
        }
      />

      <label className="" htmlFor="password">
        Contraseña:
      </label>
      <input
        className="form-control"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) =>
          setUser({
            ...user,
            password: e.target.value,
          })
        }
      />

      <button className="btn btn-success mt-3" type="submit">
        Iniciar sesión
      </button>
    </form>
  );
}
