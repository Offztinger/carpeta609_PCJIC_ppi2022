import React, { useContext, useEffect } from 'react';
import { SectorContext } from '../../context/SectorContext/SectorContext';
import SectorCourseTable from './components/SectorCourseTable';

const SectorCourseContainer = () => {
	const {
		setSectorCourses,
		getMethod,
		setSelectedId,
		deleteSector,
		setIdCourse,
	} = useContext(SectorContext);

	useEffect(() => {
		const path = window.location.pathname;
		const parts = path.split('/');
		setIdCourse(parts[2]);
		const url = `sectorCourse/course/${parts[2]}`;
		getMethod(url, setSectorCourses);
	}, []);

	const onDelete = async idToDelete => {
		idToDelete && (await deleteSector('sectorCourse', idToDelete));
	};

	const updateId = id => {
		setSelectedId(id);
	};

	return (
		<main>
			<SectorCourseTable deleteFunction={onDelete} updateId={updateId} />
		</main>
	);
};

export default SectorCourseContainer;
