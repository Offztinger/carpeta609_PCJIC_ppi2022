import React, { useContext, useEffect } from 'react';
import { SectorContext } from '../../context/SectorContext/SectorContext'; // Asegúrate de importar el contexto correcto
import SectorTable from './components/SectorTable'; // Asegúrate de tener este componente creado

const SectorContainer = () => {
	const { getMethod, deleteSector, setSelectedId, setSectors } =
		useContext(SectorContext);

	useEffect(() => {
		getMethod('sector', setSectors);
	}, []);

	const onDelete = async idToDelete => {
		idToDelete && (await deleteSector('sector', idToDelete));
	};

	const updateId = id => {
		setSelectedId(id);
	};

	return (
		<main>
			<SectorTable deleteFunction={onDelete} updateId={updateId} />
		</main>
	);
};

export default SectorContainer;