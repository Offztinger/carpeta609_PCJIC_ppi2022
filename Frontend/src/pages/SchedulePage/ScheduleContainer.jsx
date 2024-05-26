import React from 'react';
import CalendarComponent from './components/CalendarComponent/calendarComponet';
import Logbook from './components/Logbook/Logbook';

const ScheduleContainer = () => {
	const { schedule, showLogbook } = useContext(ScheduleContext);

	return (
		<main>
			<div>{!showLogbook && <CalendarComponent cronograma={schedule} />}</div>
			<div>{showLogbook && <Logbook />}</div>
		</main>
	);
};

export default ScheduleContainer;
