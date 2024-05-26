import React, { useContext, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Link } from 'react-router-dom';
import { ScheduleContext } from '../../../../context/ScheduleContext/ScheduleContext';
export default function CalendarComponent({ cronograma }) {
	const { createDateTime, setShowLogbook, showLogbook, setFolder } =
		useContext(ScheduleContext);
	const localizer = momentLocalizer(moment);

	const events = cronograma.map(actividad => {
		const scheduleDate = `${actividad.scheduleYear}-${actividad.scheduleMonth.padStart(2, '0')}-${actividad.scheduleDay.padStart(2, '0')}`;
		const startDate = createDateTime(scheduleDate, actividad.scheduleHour);
		console.log('startDate:', startDate.toISOString());
		const endDate = new Date(startDate.getTime() + 30 * 60000);
		console.log('endDate:', endDate.toISOString());

		return {
			title: 'Asesoria',
			start: startDate,
			end: endDate,
			folder: actividad.folderNumber,
		};
	});

	useEffect(() => {
		if (showLogbook) {
			setShowLogbook(false);
		}
	}, [showLogbook]);

	return (
		<div style={{ marginLeft: '150px', height: '700px', width: '70vw', marginTop: '12px' }}>
			<Link to='/'>
				<button className='btn btn-success mb-3'>Volver</button>
			</Link>
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor='start'
				endAccessor='end'
				defaultView='month'
				style={{ width: '100%', height: '100%' }}
				onSelectEvent={e => {
					setShowLogbook(true);
					setFolder(e.folder);
				}}
			/>
		</div>
	);
}
