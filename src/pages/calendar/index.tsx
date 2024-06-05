import { NextPage } from "next";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { RiAddLargeFill } from "react-icons/ri";
import Modal from "../../component/ModalShared";
import { useEffect, useRef, useState } from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import CalendarForm from "~/component/calendar/CalendarShared";
import { api } from "~/utils/api";

const Calendario: NextPage = () => {
  const createCalendar = api.calendar.createCalendarEvent.useMutation({});

  const getAllCalendar = api.calendar.getAllEventCalendar.useQuery();

  const response = getAllCalendar.data?.data.items;

  const eventosMappping = response?.map((item) => {
    const start = item.start?.dateTime ? new Date(item.start.dateTime) : null;
    const end = item.end?.dateTime ? new Date(item.end.dateTime) : null;
    return {
      title: item.summary,
      start: start,
      end: end,
    };
  });

  console.log("lista de calendarios=>", eventosMappping);

  const [showModal, setShowModal] = useState(false);
  dayjs.locale("es");
  const localizer = dayjsLocalizer(dayjs);

  const myEvent = [
    {
      title: "Evento coliseo",
      start: dayjs("2024-05-16T08:00:00").toDate(),
      end: dayjs("2024-05-16T12:00:00").toDate(),
    },
  ];

  const calendarIframeRef = useRef<HTMLIFrameElement>(null);

  const updateCalendar = () => {
    const iframe = calendarIframeRef.current;
    if (iframe) {
      iframe.src =
        "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FBogota&bgcolor=%23ffffff&showTitle=0&showPrint=0&hl=es&src=cHJ1ZWJhamVhbjU4QGdtYWlsLmNvbQ&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679";
    }
  };

  const onCloseModal = () => setShowModal(false);

  const handleSubmit = () => {
    const event = myEvent ? myEvent[0] : null;

    if (event) {
      const eventData = {
        title: event.title,
        startTime: event.start,
        endTime: event.end,
      };

      createCalendar.mutateAsync(eventData);
      updateCalendar();
    } else {
      console.error("No hay eventos disponibles para enviar.");
    }
    setShowModal(!showModal);
  };

  return (
    <>
      <Modal showModal={showModal} size={"200px"} onClose={onCloseModal}>
        <CalendarForm />
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
        <Calendar
          localizer={localizer}
          events={eventosMappping}
          views={["month", "week", "day"]}
          startAccessor="start"
          endAccessor="end"
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

        <div className="h-480 w-1020 m-auto flex bg-white p-5 shadow-2xl">
          <iframe
            ref={calendarIframeRef}
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FBogota&bgcolor=%23ffffff&showTitle=0&showPrint=0&hl=es&src=cHJ1ZWJhamVhbjU4QGdtYWlsLmNvbQ&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679"
            width="1000"
            height="400"
            scrolling="no"
          ></iframe>
        </div>
        <div className="mt-4 flex w-full justify-center text-gray-700">
          {eventosMappping?.map((event, index) => (
            <h3 className="pr-3" key={index}>
              {event.title};
            </h3>
          ))}
        </div>
      </div>
    </>
  );
};

export default Calendario;
