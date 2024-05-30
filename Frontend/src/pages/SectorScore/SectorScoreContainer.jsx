import React, { useContext, useEffect } from 'react';
import { SectorScoreContext } from '../../context/SectorScoreContext/SectorScoreContext';
import SectorScoreTable from './components/SectorScoreTable';

const SectorScoreContainer = () => {
	const { getMethod, deleteSectorScore, setSelectedId, setSectorScores } =
		useContext(SectorScoreContext);

	useEffect(() => {
		getMethod('sectorScore', setSectorScores);
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