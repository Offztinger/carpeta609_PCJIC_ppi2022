/* eslint-disable react/prop-types */

import { useState } from 'react';
import { StudentContext } from './StudentContext';

const StudentProvider = ({ children }) => {
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
		<UserContext.Provider value={{ user, setUser, message: 'hola' }}>
			{children}
		</UserContext.Provider>
	);
};
export default StudentProvider;
