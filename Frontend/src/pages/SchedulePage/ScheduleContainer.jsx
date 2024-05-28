import React, { useContext, useEffect } from 'react';
import { ScheduleContext } from '../../context/ScheduleContext/ScheduleContext';
import CalendarComponent from './components/CalendarComponent/calendarComponet';

const ScheduleContainer = () => {
	const { schedule } = useContext(ScheduleContext);

	return (
		<main>
			<div>{<CalendarComponent cronograma={schedule} />}</div>
		</main>
	);
};

export default ScheduleContainer;
