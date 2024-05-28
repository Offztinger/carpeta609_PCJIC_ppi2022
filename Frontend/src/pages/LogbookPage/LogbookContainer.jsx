import React from 'react';
import Logbook from './components/Logbook';
import { useEffect, useContext } from 'react';
import { ScheduleContext } from '../../context/ScheduleContext/ScheduleContext';

const LogbookContainer = () => {
	const { setLogbook } = useContext(ScheduleContext);
	
	useEffect(() => {
		setLogbook(undefined);
	}, []);

	return (
		<main>
			<Logbook />
		</main>
	);
};

export default LogbookContainer;
