import React, { useContext, useEffect } from 'react';
import { SectorScoreContext } from '../../context/SectorScoreContext/SectorScoreContext';
import SectorScoreTable from './components/SectorScoreTable';

const SectorScoreContainer = () => {
	const { getSectorScores, deleteSectorScore, setSelectedId } =
		useContext(SectorScoreContext);

	useEffect(() => {
		getSectorScores();
	}, []);

	const onDelete = async idToDelete => {
		idToDelete && (await deleteSectorScore('sectorScore', idToDelete));
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
