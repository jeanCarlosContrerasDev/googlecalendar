import { NextPage } from "next";
import {dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { RiAddLargeFill } from "react-icons/ri";
import Modal from "../../component/ModalShared";
import { useRef, useState } from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import CalendarForm from "~/component/calendar/CalendarShared";
import { api } from "~/utils/api";
import ReactBigCalendar from "~/component/ReactBigCalendar/ReactBigCalendar";
import { addDays, format, parse, setDay } from "date-fns";
import { es } from "date-fns/locale";

const Calendario: NextPage = () => {
  const createCalendar = api.calendar.createCalendarEvent.useMutation({});
  const getAllCalendar = api.calendar.getAllEventCalendar.useQuery();
  const response = getAllCalendar.data?.data.items;
  const [currentDate, setCurrentDay] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  dayjs.locale("es"); 

  const eventosMappping = response?.map((item, index) => {
    const start = item.start?.dateTime ? new Date(item.start.dateTime) : null;
    const end = item.end?.dateTime ? new Date(item.end.dateTime) : null;
    return {
      id: index,
      title: item.summary,
      allDay: !start || !end,
      start: start || new Date(),
      end: end || new Date(),
    };
  });

  console.log("lista de calendarios=>", eventosMappping);

  const onCloseModal = () => setShowModal(false);

  const handleSubmit = () => {
    setShowModal(!showModal);
  };

  const captureEvent = (event: any) => {
    const data = calculateNextWorkoutDays(currentDate, event);

    const parsedDatesArray = data.map((element) => {
      const originalFormat = "EEEE, dd MMMM yyyy";
      const dateString = element.nextWeek;
      const parsedDate = parse(dateString, originalFormat, new Date(), {
        locale: es,
      });
      return parsedDate;
    });

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

        const evento = myEvent ? myEvent[0] : null;
        if (evento) {
          const eventData = {
            title: evento.title,
            startTime: evento.start,
            endTime: evento.end,
          };
          try {
            createCalendar.mutateAsync(eventData);
          console.log("registro evento exitoso")
          } catch (error) {
            console.log("error al registrar evento")
          }
        } else {
          console.error("No hay eventos disponibles para enviar.");
        }
      },
    );
  };

  const calculateNextWorkoutDays = (currentDate: Date, event: string[]) => {
    const daysOfWeek = ["7", "1", "2", "3", "4", "5", "6"];
    const nextWorkoutDates = event.dates
      .map((day: string) => {
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
      .filter((date: null) => date !== null);

    return nextWorkoutDates;
  };

  return (
    <>
      <Modal showModal={showModal} size={"200px"} onClose={onCloseModal}>
        <CalendarForm captureEvent={captureEvent} />
      </Modal>
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
          <ReactBigCalendar evento={eventosMappping} />
        </div>
      </div>
    </>
  );
};

export default Calendario;
