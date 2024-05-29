import React from 'react';
import SectorProvider from '../../context/SectorContext/SectorProvider';
import SectorCourseContainer from './SectorCourseContainer';

const SectorCoursePage = () => {
	return (
		<SectorProvider>
			<SectorCourseContainer />
		</SectorProvider>
	);
};

export default SectorCoursePage;
