import React from 'react';
import TeamProvider from '../../context/TeamContext/TeamProvider';
import TeamContainer from './TeamContainer';
import './components/styles.css';

const TeamPage = () => {
	return (
		<TeamProvider>
			<TeamContainer />
		</TeamProvider>
	);
};

export default TeamPage;
