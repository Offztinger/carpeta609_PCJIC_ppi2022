import React, { useContext } from 'react';
import CalendarComponent from './components/CalendarComponent/calendarComponet';
import { ScheduleContext } from '../../context/ScheduleContext/ScheduleContext';

const SchedulePage = () => {
	const { schedule } = useContext(ScheduleContext);

	return (
		<div>
			<CalendarComponent cronograma={schedule} />
		</div>
	);
};

export default SchedulePage;
