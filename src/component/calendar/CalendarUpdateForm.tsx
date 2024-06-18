// Import necessary dependencies
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define the schema for form validation
const FormSchema = z.object({
  startDate: z.date({
    required_error: "A date of birth is required.",
  }),
  endDate: z.date({
    required_error: "A date of birth is required.",
  }),
});

// Define an interface for the Day type
interface Day {
  id: string;
  value: string;
}

export default function CalendarUpdateForm({captureEvent,data,}: { captureEvent: (data: any) => void; data: any;
}) 
{
  const [selectDay, setSelectDay] = useState<Day[]>([]);

  const date = new Date(data.start);

  const daysOfWeek = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",   
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  
  useEffect(() => {
    setValue("activityName", data.title);
    setValue("rootGoal", data.end);
    const selectedDay = weekdays.find((day) => day.name === dayOfWeek);
    if (selectedDay) {
      setSelectDay([selectedDay]);
    }
  }, [data]);

  const weekdays = [
    { id: "1", value: "L", name: "lunes" },
    { id: "2", value: "M", name: "martes" },
    { id: "3", value: "M", name: "miércoles" },
    { id: "4", value: "J", name: "jueves" },
    { id: "5", value: "V", name: "viernes" },
    { id: "6", value: "S", name: "sábado" },
    { id: "7", value: "D", name: "domingo" },
  ];

  const handleSubmitt = (item: Day) => {
    console.log("seleccionado =>", item);
    setSelectDay((prev) => {
      const isSelect = prev.some((element) => element.id === item.id);
      return isSelect
        ? prev.filter((element) => element.id !== item.id)
        : [...prev, item];
    });
  };

  const ToggleGroup = () => {
    return (
      <div className="mt-2 flex w-full gap-2">
        {weekdays.map((item, index) => (
          <div
            key={item.id}
            onClick={() => handleSubmitt(item)}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-violet-400 font-bold
            ${selectDay.some((day) => day.id === item.id) ? "bg-violet-700 text-white" : "bg-white"}`}
          >
            <p className="my-auto flex">{item.value}</p>
          </div>
        ))}
      </div>
    );
  };

  const onsubmit = handleSubmit((item) => {
    console.log("datos del forulario", item,data.id);
    captureEvent({
      ...item,
      dates: selectDay,
      idEvent:data.id
    });
    reset(); // Reset form after submission
  });

  return (
    <div className="modal-overlay grid  w-[400px] items-center justify-center gap-12 p-4">
      <div className="modal-overlay col-span-2 w-full space-y-2 pr-4">
        <h2 className="modal-overlay text-md font-bold">Actualizar evento</h2>
        <p className="modal-overlay text-xs text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quo
          corrupti voluptatibus quod expedita.
        </p>
        <form
          onClick={(e) => e.stopPropagation()}
          onSubmit={onsubmit}
          className="flex w-full flex-col space-y-4 "
        >
          <div className="modal-overlay col-span-2 ">
            <label htmlFor="id" className="text-sm font-bold text-black">
              Nombre de la actividad
            </label>
            <input
              {...register("activityName", { required: true })}
              type="text"
              className="modal-overlay focus:ring-tremor-content-background  h-9 w-full appearance-none rounded-md pl-4 ring-1   ring-gray-200 transition duration-200 focus:outline-none focus:ring-2"
            />
            {errors.activityName && (
              <span className="text-xs text-red-700">
                * Este campo es obligatorio.
              </span>
            )}
          </div>

          <div className="modal-overlay col-span-2 ">
            <label htmlFor="id" className="text-sm font-bold text-black">
              Duracion
            </label>
            <ToggleGroup />
          </div>
          <div className="modal-overlay col-span-2 ">
            <label htmlFor="id" className="text-sm font-bold text-black">
              Frecuencia semanal
            </label>
            <input
              {...register("weeklyfrequency", { required: true })}
              type="text"
              className="modal-overlay focus:ring-tremor-content-background  h-9 w-full appearance-none rounded-md pl-4 ring-1   ring-gray-200 transition duration-200 focus:outline-none focus:ring-2"
            />
            {errors.weeklyfrequency && (
              <span className="text-xs text-red-700">
                * Este campo es obligatorio.
              </span>
            )}
          </div>
          <div className="modal-overlay col-span-2 ">
            <label htmlFor="id" className="text-sm font-bold text-black">
              Descripcion
            </label>
            <input
              {...register("description", { required: true })}
              type="text"
              className="modal-overlay focus:ring-tremor-content-background  h-9 w-full appearance-none rounded-md pl-4 ring-1   ring-gray-200 transition duration-200 focus:outline-none focus:ring-2"
            />
            {errors.description && (
              <span className="text-xs text-red-700">
                * Este campo es obligatorio.
              </span>
            )}
          </div>
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-violet-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-violet-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}
