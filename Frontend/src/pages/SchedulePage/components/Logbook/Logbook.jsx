import React, { useState } from 'react';

function Logbook() {
	const [formulario, setFormulario] = useState({
		logbookId: '',
		meetingDate: '',
		missingStudents: '',
		meetingComments: '',
		meetingCommit: '',
		professorId: '',
		// Agrega aquí los campos que necesites
	});

	const handleChange = evento => {
		const { name, value } = evento.target;
		setFormulario(prevFormulario => ({ ...prevFormulario, [name]: value }));
	};

	const handleSubmit = evento => {
		evento.preventDefault();
		// Aquí puedes hacer una petición HTTP para publicar los cambios
		console.log('Formulario actualizado:', formulario);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Nombre:
				<input
					type='text'
					name='nombre'
					value={formulario.nombre}
					onChange={handleChange}
				/>
			</label>
			<br />
			<label>
				Apellido:
				<input
					type='text'
					name='apellido'
					value={formulario.apellido}
					onChange={handleChange}
				/>
			</label>
			<br />
			<label>
				Email:
				<input
					type='email'
					name='email'
					value={formulario.email}
					onChange={handleChange}
				/>
			</label>
			<br />
			<label>
				Teléfono:
				<input
					type='tel'
					name='telefono'
					value={formulario.telefono}
					onChange={handleChange}
				/>
			</label>
			<br />
			<label>
				Dirección:
				<input
					type='text'
					name='direccion'
					value={formulario.direccion}
					onChange={handleChange}
				/>
			</label>
			<br />
			<button type='submit'>Publicar cambios</button>
		</form>
	);
}

export default Logbook;
