import { NextPage } from "next";
import { dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { RiAddLargeFill } from "react-icons/ri";
import { useRef, useState } from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { api } from "~/utils/api";
import ReactBigCalendar from "~/component/ReactBigCalendar/ReactBigCalendar";
import { addDays, format, parse, setDay } from "date-fns";
import { es } from "date-fns/locale";
import ModalShared from "~/component/ModalShared";
import CalendarForm from "~/component/calendar/CalendarShared";

const Calendario: NextPage = () => {
  const createCalendar = api.calendar.createCalendarEvent.useMutation({});
  const getAllCalendar = api.calendar.getAllEventCalendar.useQuery();
  const response = getAllCalendar.data?.data.items;
  const [currentDate, setCurrentDay] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [update,setUpdate]=useState(false)

  dayjs.locale("es");
  
  const eventosMappping = response?.map((item, index) => {
    let start = null;
    let end = null;

    if (item.start?.dateTime && item.end?.dateTime) {
      start = new Date(item.start.dateTime);
      end = new Date(item.end.dateTime);
        
      return {
        id: item.id,
        title: item.summary,
        start: start ,
        end: end 
      };

    }else{
       console.log("error en las fechas del evento")
    } 
  
  });

  console.log("lista de calendarios=>", eventosMappping);

  const onCloseModal = () => setShowModal(false);

  const handleSubmit = () => {
    setShowModal(!showModal);
  };

  interface EventData {
    activityName: string;
    rootGoal: string;
    weeklyfrequency: string;
    description: string;
    dates: EventData[];
  }

  const captureEvent = (event: EventData) => {
    const data = calculateNextWorkoutDays(currentDate, event);
    let parsedDatesArray: Date[] = [];
    console.log("Evento capturado",event)
    if(data){
       parsedDatesArray = data.map((element:any) => {
        const originalFormat = "EEEE, dd MMMM yyyy";
        const dateString = element.nextWeek;
        const parsedDate = parse(dateString, originalFormat, new Date(), {
          locale: es,
        });
        return parsedDate;
      });
    }

    const isoDateList = parsedDatesArray.map((item: any) =>
      format(item, "yyyy-MM-dd'T'HH:mm:ssxxx"),
    );

    isoDateList.forEach(
      (element: string | number | Date | dayjs.Dayjs | null | undefined) => {
        
        const myEvent = [
          {
            title: event.activityName,
            start: dayjs(element).toDate(),
            end: dayjs(element).toDate(),
          },
        ];

        //creo el modelo evento google calendar
        const evento = myEvent ? myEvent[0] : null;
        if (evento) {
          const eventData = {
            title: evento.title,
            startTime: evento.start,
            endTime: evento.end,
          };

          //modelo de evento para guardar en base de datos
          const eventDataSupabase = {
            title: evento.title,
            startTime: evento.start,
            endTime: evento.end,
            rootGoal:event.rootGoal,
            weeklyfrequency:event.weeklyfrequency,
            description:event.description
          };
          try {
            createCalendar.mutateAsync(eventData);
            console.log("registro evento exitoso");
          } catch (error) {
            console.log("error al registrar evento");
          }
        } else {
          console.error("No hay eventos disponibles para enviar.");
        }
      },
    );
  };

  const calculateNextWorkoutDays = (currentDate: Date, event: EventData) => {
    const daysOfWeek = ["7", "1", "2", "3", "4", "5", "6"];
    let nextWorkoutDates: { thisWeek: string; nextWeek: string; }[];

    if(event.dates){
       nextWorkoutDates = event.dates.map((day: any) => {
          console.log("dia=>", day);
          const dayNumber = daysOfWeek.indexOf(day.id);
  
          const nextWorkoutDate = setDay(
            currentDate,
            dayNumber === 0 ? 7 : dayNumber,
          );
          const nextWeekWorkoutDate = addDays(nextWorkoutDate, 7);
          return {
            thisWeek: format(nextWorkoutDate, "eeee, dd MMMM yyyy", {
              locale: es,
            }),
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

  const listenUpdate = (): void => {
   setUpdate(!update)
  };

  return (
    <>
      <ModalShared showModal={showModal} size={"400px"} onClose={onCloseModal}>
        <CalendarForm captureEvent={captureEvent} />
      </ModalShared>
      <div className="mx-auto flex w-full flex-col items-center justify-center bg-slate-100 pt-8">
        <div className="mb-4 flex w-[80%]  justify-between px-11">
          <div>
            <div className="flex items-center gap-2">
              <div className=" w-14  items-center justify-center rounded-full bg-white p-4 text-3xl text-gray-500">
                <IoCalendarNumberOutline />
              </div>
              <h2 className="text-4xl font-light text-gray-600">Calendario</h2>
            </div>
            <span className="pl-2 text-lg font-normal text-gray-500">
              Crea y administar cada detalle de eventos
            </span>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSubmit}
              className="flex h-12 items-center justify-center gap-2 rounded-md bg-violet-800 px-4 py-3 text-white"
            >
              <RiAddLargeFill />
              Añadir evento
            </button>
          </div>
        </div>
        <div className="h-480 w-1020 m-auto flex flex-col bg-white p-5 shadow-2xl">
          <ReactBigCalendar evento={eventosMappping} listenUpdate={listenUpdate} />
        </div>
      </div>
    </>
  );
};

export default Calendario;
