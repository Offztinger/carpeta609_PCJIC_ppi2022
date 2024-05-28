import React, { useContext } from 'react';
import { ScheduleContext } from '../../context/ScheduleContext/ScheduleContext';
import CalendarComponent from './components/CalendarComponet';

const ScheduleContainer = () => {
	const { schedule } = useContext(ScheduleContext);

	return (
		<main>
			<CalendarComponent cronograma={schedule} />
		</main>
	);
};

export default ScheduleContainer;
