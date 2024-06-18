import React, { useEffect, useState, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { api } from "~/utils/api";
import ModalShared from "../ModalShared";
import CalendarUpdateForm from "../calendar/CalendarUpdateForm";
import { addDays, format, parse, setDay } from "date-fns";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { es } from "date-fns/locale";


moment.locale("en-GB");
const localizer = momentLocalizer(moment);

interface Event {
  id?: string;
  title: string;
  start: Date;
  end: Date;
}

interface UpdateData {
  id?: string;
  title?: string;
  start?: Date;
  end?: Date;
}
interface EventData {
    activityName: string;
    dates: { id: string; value: string; name: string }[]; 
    description: string;
    rootGoal: Date; 
    weeklyfrequency: string;
    idEvent:String;
  }
  

export default function ReactBigCalendar({ evento, listenUpdate }: { evento: Event[] ,listenUpdate:() => void}) {
  const [showModal, setShowModal] = useState(false);
  const [eventsData, setEventsData] = useState<Event[]>(evento);
  const [updateData, setUpdateData] = useState<UpdateData | null>(null);
  const [currentDate, setCurrentDay] = useState(new Date());


  dayjs.locale("es");

  moment.locale("es");
  const localizer = momentLocalizer(moment);

  const updateCalendar = api.calendar.updateCalendarEvent.useMutation({});


  useEffect(() => {
    setEventsData(evento);
  }, [evento]);

  const handleSelect = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      const title = window.prompt("Nombre del evento");
      if (title) {
        setEventsData([...eventsData, { start, end, title }]);
      }
    },
    [eventsData],
  );

  const onclickEvent = useCallback(async (itemEvent: any) => {
    console.log("datos del item",itemEvent)
    setShowModal(true);
    setUpdateData(itemEvent);   
  }, []);

  const captureEvent = useCallback((data: EventData) => {
    console.log("datos capturados para actualizar", data);
    
    // Llamada a calculateNextWorkoutDays - asegúrate de definir esta función correctamente
    const datas = calculateNextWorkoutDays(currentDate, data.dates);
  
    let parsedDatesArray: Date[] = [];
    console.log("Evento capturado", data);
  
    if (datas) {
      parsedDatesArray = datas.map((element: any) => {
        const originalFormat = "EEEE, dd MMMM yyyy";
        const dateString = element.nextWeek;
        const parsedDate = parse(dateString, originalFormat, new Date(), {
          locale: es,
        });
        return parsedDate;
      });
    }
  
    const isoDateList = parsedDatesArray.map((item: any) =>
      format(item, "yyyy-MM-dd'T'HH:mm:ssxxx")
    );
  
    isoDateList.forEach((element: string) => {
        console.log("fechas recorrido",element)
      const myEvent = [
        {
          id:data.idEvent,
          title: data.activityName,
          start: dayjs(element).toDate(),
          end: dayjs(element).toDate(),
        },
      ];
  
      // Creo el modelo evento google calendar
      const evento = myEvent ? myEvent[0] : null;
      if (evento) {
        const eventData = {
          id: evento.id.toString(), 
          title: evento.title,
          startTime: evento.start,
          endTime: evento.end,
        };
  
        try {
          const response = updateCalendar.mutateAsync(eventData);
          setUpdateData(eventData);
          setShowModal(false)
          listenUpdate();
          console.log("registro UPDATE exitoso", response);
        } catch (error) {
          console.log("error al registrar evento");
        }
      } else {
        console.error("No hay eventos disponibles para enviar.");
      }
    });
  }, []);
  

  const calculateNextWorkoutDays = (currentDate: Date, dates: { id: string; value: string; name: string }[],) => {
    const daysOfWeek = [ "1", "2", "3", "4", "5", "6","7"];
    let nextWorkoutDates: { thisWeek: string; nextWeek: string; }[];

    if(dates){
       nextWorkoutDates = dates.map((day: any) => {
          console.log("dia=>", day);
          const dayNumber = daysOfWeek.indexOf(day.id);
  
          const nextWorkoutDate = setDay(
            currentDate,
            dayNumber === 0 ? 7 : dayNumber,
          );
          const nextWeekWorkoutDate = addDays(nextWorkoutDate, 7);
          return {
            thisWeek: format(nextWorkoutDate, "eeee, dd MMMM yyyy", {locale: es,}),
            nextWeek: format(nextWeekWorkoutDate, "eeee, dd MMMM yyyy", {
              locale: es,
            }),
          };
        })   
    }else{
      console.log("El evento no tiene información sobre fechas de entrenamiento");
      nextWorkoutDates = [];
    }

    return nextWorkoutDates;
  };


  const onCloseModal = () => {
    setShowModal(false);
    setUpdateData(null);
  };

  return (
    <div className="App">
      <ModalShared showModal={showModal} size="200px" onClose={onCloseModal}>
        <CalendarUpdateForm captureEvent={captureEvent} data={updateData} />
      </ModalShared>

      <Calendar
        views={["day", "agenda", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        onSelectEvent={(itemEvent: Event) => onclickEvent(itemEvent)}
        onSelectSlot={handleSelect}
        messages={{
          next: "sig",
          previous: "ant",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
        }}
        style={{ height: 450, width: 1000 }}
      />
    </div>
  );
}
