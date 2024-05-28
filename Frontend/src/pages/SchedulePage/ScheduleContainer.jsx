import React, { useContext, useEffect } from 'react';
import { ScheduleContext } from '../../context/ScheduleContext/ScheduleContext';
import CalendarComponent from './components/CalendarComponent/calendarComponet';
import Logbook from './components/Logbook/Logbook';

const ScheduleContainer = () => {
	const { schedule, showLogbook, getSchedule } = useContext(ScheduleContext);

	return (
		<main>
			<div>{!showLogbook && <CalendarComponent cronograma={schedule} />}</div>
			<div>{showLogbook && <Logbook />}</div>
		</main>
	);
};

export default ScheduleContainer;
