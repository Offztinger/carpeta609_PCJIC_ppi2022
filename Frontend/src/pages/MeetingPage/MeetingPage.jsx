import React from 'react';
import MeetingProvider from '../../context/MeetingContext/MeetingProvider';
import MeetingContainer from './MeetingContainer';

const MeetingPage = () => {
	return (
		<MeetingProvider>
			<MeetingContainer />
		</MeetingProvider>
	);
};

export default MeetingPage;
