import React from 'react';
import SectorScoreContainer from './SectorScoreContainer';
import SectorScoreProvider from '../../context/SectorScoreContext/SectorScoreProvider';

const SectorScorePage = () => {
	return (
		<SectorScoreProvider>
			<SectorScoreContainer />
		</SectorScoreProvider>
	);
};

export default SectorScorePage;
