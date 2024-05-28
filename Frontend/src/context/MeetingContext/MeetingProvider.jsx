/* eslint-disable react/prop-types */
import { useState } from 'react';
import { MeetingContext } from './MeetingContext';

const MeetingProvider = ({ children }) => {
	const [meeting, setMeeting] = useState([]);
	return (
		<MeetingContext.Provider value={{ meeting }}>
			{children}
		</MeetingContext.Provider>
	);
};
export default MeetingProvider;
