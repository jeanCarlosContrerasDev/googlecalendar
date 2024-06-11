import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";


moment.locale("en-GB");
const localizer = momentLocalizer(moment);

// @ts-ignore
export default function ReactBigCalendar({evento}) {
  const [eventsData, setEventsData] = useState(evento);

  useEffect(()=>{
    setEventsData(evento);
  },[evento])

  // @ts-ignore
  const handleSelect = ({ start, end }) => {
    console.log(start);
    console.log(end);
    const title = window.prompt("Nombre del evento");
    if (title)
      setEventsData([
        // @ts-ignore
        ...eventsData,
        // @ts-ignore
        {
          start,
          end,
          title
        }
      ]);
  };
  return (
    <div className="App">
      <Calendar
        views={["day", "agenda", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
        messages={{
          next: "sig",
          previous: "ant",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
        }}
        style={{
          height: 450,
          width: 1000,
        }}
      />
    </div>
  );
}
