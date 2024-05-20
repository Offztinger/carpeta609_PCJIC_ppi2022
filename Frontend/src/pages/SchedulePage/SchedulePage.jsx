import React, { useContext } from 'react';
import CalendarComponent from './components/CalendarComponent/calendarComponet';
import { ScheduleContext } from '../../context/ScheduleContext/ScheduleContext';
import Logbook from './components/Logbook/Logbook';

const SchedulePage = () => {
	const { schedule, showLogbook } = useContext(ScheduleContext);

	return (
		<main>
			<div>{!showLogbook && <CalendarComponent cronograma={schedule} />}</div>
			{/* <div>{showLogbook && <Logbook />}</div> */}
		</main>
	);
};

export default SchedulePage;
