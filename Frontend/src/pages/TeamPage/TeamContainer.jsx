import React from 'react';
import TeamTable from './components/TeamTable';
import { useContext } from 'react';
import { TeamContext } from '../../context/TeamContext/TeamContext';

const TeamContainer = () => {
	const { setSelectedId } = useContext(TeamContext);

	const updateId = id => {
		setSelectedId(id);
	};

	return (
		<div>
			<TeamTable updateId={updateId} />
		</div>
	);
};

export default TeamContainer;
