import React from 'react';
import SectorContainer from './SectorContainer';
import SectorProvider from '../../context/SectorContext/SectorProvider';

const SectorPage = () => {
	return (
		<SectorProvider>
			<SectorContainer />
		</SectorProvider>
	);
};

export default SectorPage;
