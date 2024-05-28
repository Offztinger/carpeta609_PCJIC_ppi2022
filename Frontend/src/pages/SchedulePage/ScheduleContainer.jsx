import React, { useContext, useEffect } from 'react';
import { ScheduleContext } from '../../context/ScheduleContext/ScheduleContext';
import CalendarComponent from './components/CalendarComponet';
import { useNavigate } from 'react-router-dom';
const ScheduleContainer = () => {
	const navigate = useNavigate();
	const { schedule, logbook } = useContext(ScheduleContext);

	useEffect(() => {
		if (logbook != undefined) {
			navigate(`/logbook/${logbook.id}`);
		}
	}, [logbook]);

	return (
		<main>
			<CalendarComponent cronograma={schedule} />
		</main>
	);
};

export default ScheduleContainer;
