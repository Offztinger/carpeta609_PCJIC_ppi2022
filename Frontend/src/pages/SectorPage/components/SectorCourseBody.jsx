import React, { useEffect, useContext, useState } from 'react';
import { SectorContext } from '../../../context/SectorContext/SectorContext';

const SectorCourseBody = () => {
	const { formularioCourse, handleChange, getMethod, setFormularioCourse } =
		useContext(SectorContext);
	const [courses, setCourses] = useState([]);
	const [sectors, setSectors] = useState([]);

	useEffect(() => {
		getMethod('course', setCourses);
		getMethod('sector', setSectors);
		setFormularioCourse({
			id: '',
			idSector: '',
			idCourse: '',
			sectorObjectiveCourse: '',
		});
	}, []);
	
	return (
		<form>
			<div className='form-group'>
				<label>Seleccionar Sector</label>
				<select
					name='idSector'
					className='form-control'
					value={formularioCourse.idSector}
					onChange={e => handleChange(e, 'sectorCourse')}
				>
					<option value=''>Seleccione un sector</option>
					{sectors.map(sector => (
						<option key={sector.id} value={sector.id}>
							{sector.sectorName}
						</option>
					))}
				</select>
			</div>

			<div className='form-group'>
				<label>Seleccionar Curso</label>
				<select
					name='idCourse'
					className='form-control'
					value={formularioCourse.idCourse}
					onChange={e => handleChange(e, 'sectorCourse')}
				>
					<option value=''>Seleccione un curso</option>
					{courses.map(course => (
						<option className='w-auto' key={course.id} value={course.id}>
							{course.courseName}
						</option>
					))}
				</select>
			</div>

			<div className='form-group'>
				<label>Objetivo del cuadrante curso</label>
				<input
					type='text'
					name='sectorObjectiveCourse'
					className='form-control'
					value={formularioCourse.sectorObjectiveCourse}
					onChange={e => handleChange(e, 'sectorCourse')}
				/>
			</div>
		</form>
	);
};

export default SectorCourseBody;
