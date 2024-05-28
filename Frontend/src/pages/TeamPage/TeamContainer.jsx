import React, { useEffect } from 'react';
import TeamTable from './components/TeamTable';
import { useContext } from 'react';
import { TeamContext } from '../../context/TeamContext/TeamContext';

const TeamContainer = () => {
	const { setSelectedId, getTeams, teams } = useContext(TeamContext);

	const updateId = id => {
		setSelectedId(id);
	};

	useEffect(() => {
		getTeams();
	}, []);

	return <main>{teams && <TeamTable updateId={updateId} />}</main>;
};

export default TeamContainer;
