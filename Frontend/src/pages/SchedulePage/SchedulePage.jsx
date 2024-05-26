import React from 'react';
import ScheduleProvider from '../../context/ScheduleContext/ScheduleProvider';
import ScheduleContainer from './ScheduleContainer';

const SchedulePage = () => {
	return (
		<ScheduleProvider>
			<ScheduleContainer />
		</ScheduleProvider>
	);
};

export default SchedulePage;
