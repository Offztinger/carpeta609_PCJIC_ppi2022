import React, { useEffect } from 'react';
import TeamTable from './components/TeamTable';
import { useContext } from 'react';
import { TeamContext } from '../../context/TeamContext/TeamContext';
import TeamMemberTable from './components/TeamMemberTable';

const TeamContainer = () => {
	const {
		setSelectedId,
		getTeams,
		teams,
		getTeamMembers,
		folderId,
		setFolderId,
	} = useContext(TeamContext);

	const updateId = id => {
		setSelectedId(id);
	};

	const currentUrl = window.location.href;
	const parts = currentUrl.split('/');
	const id = parts[parts.length - 1];

	useEffect(() => {
		getTeams();
		if (id != 'teams') {
			setFolderId(id);
		}
	}, []);

	useEffect(() => {
		console.log(folderId);
		if (folderId != undefined) {
			getTeamMembers(folderId);
		}
	}, [folderId]);

	return (
		<main>
			{teams && folderId == undefined && <TeamTable updateId={updateId} />}
			{folderId != undefined && <TeamMemberTable updateId={updateId} />}
		</main>
	);
};

export default TeamContainer;
