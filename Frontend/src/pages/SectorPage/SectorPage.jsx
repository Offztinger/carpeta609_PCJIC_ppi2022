import React from 'react';
import UserProvider from '../../context/UserContext/UserProvider';
import SectorContainer from './SectorContainer';

const SectorPage = () => {
	return (
		<UserProvider>
			<SectorContainer />
		</UserProvider>
	);
};

export default SectorPage;
