import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Link } from "react-router-dom";

export default function CalendarComponent({ cronograma }) {
  const localizer = momentLocalizer(moment);

  const events = cronograma.map((actividad) => {
    return {
      title: actividad.titulo,
      start: new Date(`${actividad.fecha}T${actividad.hora_inicio}`),
      end: new Date(`${actividad.fecha}T${actividad.hora_fin}`),
    };
  });

  return (
    <div style={{ height: "700px", width: "70vw", marginTop: '12px' }}>
      <Link to="/">
        <button className="btn btn-success mb-3">Volver</button>
      </Link>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
