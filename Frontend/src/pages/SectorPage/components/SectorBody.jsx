import React from 'react';
import { useContext } from 'react';
import { SectorContext } from '../../../context/SectorContext/SectorContext';
const SectorBody = () => {
	const { formulario, handleChange } = useContext(SectorContext);
	return (
		<form>
			<div className='form-group'>
				<label>Nombre del cuadrante</label>
				<input
					type='text'
					name='sectorName'
					className='form-control'
					value={formulario.sectorName}
					onChange={e => handleChange(e, 'sector')}
				/>
				<small className='form-text text-muted'>
					Recuerde colocar el nombre del cuadrante sin errores.
				</small>
			</div>
			<div className='form-group'>
				<label>Objetivo del cuadrante</label>
				<input
					type='text'
					name='sectorObjective'
					className='form-control'
					value={formulario.sectorObjective}
					onChange={e => handleChange(e, 'sector')}
				/>
			</div>
		</form>
	);
};

export default SectorBody;
