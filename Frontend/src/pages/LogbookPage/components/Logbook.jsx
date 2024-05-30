import React, { useContext, useEffect } from 'react';
import { LogbookContext } from '../../../context/LogbookContext/LogbookContext';
import './Logbook.css';

function Logbook() {
	const {
		formulario,
		handleChangeLogbook,
		handleSubmit,
		setFormulario,
		logbook,
		team,
		teamMembers,
		getMethod,
		setLogbookDetails,
	} = useContext(LogbookContext);

	useEffect(() => {
		setFormulario({
			id: logbook.id,
			projectName: logbook.projectName,
			folderNumberId: logbook.folderNumberId,
			description: logbook.description,
			detailedScope: logbook.detailedScope,
			firstMeetingScope: logbook.firstMeetingScope,
			secondMeetingScope: logbook.secondMeetingScope,
		});
	}, [logbook]);

	return (
		<section className='flex w-[100%] flex-col justify-center items-center'>
			<div className='w-[100%] p-8 grid grid-cols-2'>
				<div>
					<h1 className='text-xl font-bold'>Nombre del proyecto:</h1>
					<input
						type='text'
						name='projectName'
						className='form-control w-[90%]'
						value={formulario.projectName}
						onChange={e => handleChangeLogbook(e)}
					/>
					{/* <p>{logbook.projectName}</p> */}
				</div>
				<div>
					<h1 className='text-xl font-bold'>Número carpeta</h1>
					<input
						type='text'
						name='folderNumber'
						className='form-control w-[90%]'
						value={team.folderNumber}
						disabled={true}
					/>
				</div>
				<div className='mt-4'>
					<h1 className='text-xl font-bold'>Nombre completo</h1>
					{teamMembers.map((teamMember, index) => (
						<input
							key={index}
							type='text'
							name='teamMember'
							className='form-control w-[90%] mt-2'
							value={`${teamMember.student.name} ${teamMember.student.lastName}`}
							disabled={true}
						/>
					))}
					{/* <p>{logbook.projectName}</p> */}
				</div>
				<div className='mt-4'>
					<h1 className='text-xl font-bold'>Correos electronicos</h1>
					{teamMembers.map((teamMember, index) => (
						<input
							key={index}
							type='text'
							name='teamMember'
							className='form-control w-[90%] mt-2'
							value={`${teamMember.student.email}`}
							disabled={true}
						/>
					))}
					{/* <p>{logbook.projectName}</p> */}
				</div>
			</div>
			<div className='w-[100%] p-8 grid grid-cols-1'>
				<div>
					<h1 className='text-xl font-bold text-center mb-4'>
						Descripción detallada del proyecto:
					</h1>
					<textarea
						type='text'
						name='description'
						className='form-control w-[95%]'
						value={formulario.description}
						onChange={e => handleChangeLogbook(e)}
						rows={4}
					/>
				</div>
			</div>
			<div className='w-[100%] p-8 grid grid-cols-3'>
				<div>
					<h1 className='text-xl font-bold text-center mb-4'>
						Alcance detallado del proyecto
					</h1>
					<textarea
						type='text'
						name='detailedScope'
						className='form-control w-[95%]'
						value={formulario.detailedScope}
						onChange={e => handleChangeLogbook(e)}
						rows={4}
					/>
				</div>
				<div>
					<h1 className='text-xl font-bold text-center mb-4'>
						Alcance de funcionalidades para 1ra socialización
					</h1>
					<textarea
						type='text'
						name='firstMeetingScope'
						className='form-control w-[95%]'
						value={formulario.firstMeetingScope}
						onChange={e => handleChangeLogbook(e)}
						rows={4}
					/>
				</div>
				<div>
					<h1 className='text-xl font-bold text-center mb-4'>
						Alcance de funcionalidades para 2da socialización
					</h1>
					<textarea
						type='text'
						name='secondMeetingScope'
						className='form-control w-[95%]'
						value={formulario.secondMeetingScope}
						onChange={e => handleChangeLogbook(e)}
						rows={4}
					/>
				</div>
			</div>
			<div className='w-full flex justify-around'>
				<button
					className='crearModulo'
					onClick={e => {
						handleSubmit(e, 'logbook');
					}}
				>
					Guardar cambios
				</button>
				<button
					className='crearModulo'
					onClick={async () => {
						await getMethod(formulario.id, 'logbookDetail', setLogbookDetails);
					}}
				>
					Detalle Bitacora
				</button>
			</div>
		</section>
	);
}

export default Logbook;
