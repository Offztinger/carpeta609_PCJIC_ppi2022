import React from 'react';
import Logbook from './components/Logbook';
import { useEffect, useContext } from 'react';
import { LogbookContext } from '../../context/LogbookContext/LogbookContext';
import useAxiosHandler from '../../hooks/axiosHandler';
import LogbookDetails from './components/LogbookDetails';

const LogbookContainer = () => {
	const { GETRequest } = useAxiosHandler();
	const { getMethod, setTeam, setTeamMembers, setLogbook, logbookDetails } =
		useContext(LogbookContext);
	const path = window.location.pathname;
	const id = path.split('/')[2];

	useEffect(() => {
		getMethod(id, 'logbook', setLogbook);
		GETRequest(`http://localhost:4000/teams/${id}`, setTeam);
		GETRequest(`http://localhost:4000/teamMember/${id}`, setTeamMembers);
	}, []);

	return (
		<main>
			{logbookDetails.length > 0 && <LogbookDetails />}
			{logbookDetails.length == 0 && <Logbook />}
		</main>
	);
};

export default LogbookContainer;
