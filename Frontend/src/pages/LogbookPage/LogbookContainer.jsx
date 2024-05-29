import React from 'react';
import Logbook from './components/Logbook';
import { useEffect, useContext } from 'react';
import { LogbookContext } from '../../context/LogbookContext/LogbookContext';
import useAxiosHandler from '../../hooks/axiosHandler';

const LogbookContainer = () => {
	const { GETRequest } = useAxiosHandler();
	const { getLogbook, setTeam, setTeamMembers } = useContext(LogbookContext);
	const path = window.location.pathname;
	const id = path.split('/')[2];

	useEffect(() => {
		getLogbook(id);
		GETRequest(`http://localhost:4000/teams/${id}`, setTeam);
		GETRequest(`http://localhost:4000/teamMember/${id}`, setTeamMembers);
	}, []);

	return (
		<main>
			<Logbook />
		</main>
	);
};

export default LogbookContainer;
