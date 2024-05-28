import React, { useContext, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, getDay, startOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Link } from 'react-router-dom';
import { ScheduleContext } from '../../../../context/ScheduleContext/ScheduleContext';
import useAxiosHandler from '../../../../hooks/axiosHandler';

const locales = {
	es: es,
};

const localizer = dateFnsLocalizer({
	format: (date, formatStr, options) =>
		format(date, formatStr, { locale: es, ...options }),
	parse: (dateString, formatString, backupDate, options) =>
		parse(dateString, formatString, backupDate, { locale: es, ...options }),
	startOfWeek: (date, options) => startOfWeek(date, { locale: es, ...options }),
	getDay,
	locales,
});

// Definir los mensajes en español
const messages = {
	date: 'Fecha',
	time: 'Hora',
	event: 'Evento',
	allDay: 'Todo el día',
	week: 'Semana',
	work_week: 'Semana laboral',
	day: 'Día',
	month: 'Mes',
	previous: 'Anterior',
	next: 'Siguiente',
	yesterday: 'Ayer',
	tomorrow: 'Mañana',
	today: 'Hoy',
	agenda: 'Agenda',
	noEventsInRange: 'No hay eventos en este rango',
	showMore: total => `+ Ver más (${total})`,
};

export default function CalendarComponent({ cronograma }) {
	const { setFolder } = useContext(ScheduleContext);
	const [logbook, setLogbook] = useState([]);
	const { GETRequest } = useAxiosHandler();
	const events = cronograma.map(actividad => {
		const scheduleDate = new Date(actividad.scheduleDate);
		const hours = actividad.scheduleHour.split(':')[0];
		scheduleDate.setHours(scheduleDate.getHours() + 5);
		const startDate = new Date(scheduleDate);
		const endDate = new Date(scheduleDate);
		startDate.setHours(hours);
		endDate.setHours(hours);
		endDate.setMinutes(30);
		return {
			title: 'Asesoria',
			start: startDate,
			end: endDate,
			folder: actividad.folderNumberId,
		};
	});

	const idLogbook = async id => {
		const logbook = await GETRequest(
			`http://127.0.0.1:4000/logbook/${id}`,
			setLogbook,
		);

		return;
	};

	return (
		<div
			style={{
				marginLeft: '150px',
				height: '700px',
				width: '70vw',
				marginTop: '30px',
			}}
		>
			<Link to='/'>
				<button className='btn btn-success mb-3'>Volver</button>
			</Link>
			<Calendar
				localizer={localizer}
				events={events}
				messages={messages}
				startAccessor='start'
				endAccessor='end'
				defaultView='month'
				culture='es'
				style={{ width: '100%', height: '100%' }}
				onSelectEvent={e => {
					idLogbook(e.folder);
				}}
			/>
		</div>
	);
}
