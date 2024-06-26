import React, { useContext, useEffect } from 'react';
import { SectorScoreContext } from '../../context/SectorScoreContext/SectorScoreContext';
import SectorScoreTable from './components/SectorScoreTable';

const SectorScoreContainer = () => {
	const {
		deleteSectorScore,
		setSelectedId,
		getMethod,
		setSectorScores,
		setIdSectorScore,
	} = useContext(SectorScoreContext);

	useEffect(() => {
		const path = window.location.pathname;
		const parts = path.split('/');
		setIdSectorScore(parts[2]);
		getMethod(`sectorScore/${parts[2]}`, setSectorScores);
	}, []);

	const onDelete = async idToDelete => {
		idToDelete && (await deleteSectorScore(idToDelete));
	};

	const updateId = id => {
		setSelectedId(id);
	};

	return (
		<main>
			<SectorScoreTable deleteFunction={onDelete} updateId={updateId} />
		</main>
	);
};

export default SectorScoreContainer;
