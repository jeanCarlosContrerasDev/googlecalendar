// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

export default function CalendarForm({ captureEvent }: { captureEvent: (data: any) => void }) {
  const [selectDay, setSelectDay] = useState<Day[]>([]);

  // UseForm hook for form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [event, setEvent] = useState<any>();

 

  const weekdays = [
    { id: "1", value: "L" },
    { id: "2", value: "M" },
    { id: "3", value: "M" },
    { id: "4", value: "J" },
    { id: "5", value: "V" },
    { id: "6", value: "S" },
    { id: "7", value: "D" },
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

  const onsubmit = handleSubmit((data) => {
    console.log("datos del forulario", data);
    captureEvent({
      ...data,
      dates: selectDay,
    });
    reset(); // Reset form after submission
  });

  return (
    <div className="modal-overlay grid h-[70%] w-[800px] grid-cols-2 items-center justify-center gap-12 p-4">
      <div className="modal-overlay col-span-1 w-full space-y-2 pr-4">
        <h2 className="modal-overlay text-md font-bold">Crear actividad</h2>
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
              Meta raiz
            </label>
            <input
              {...register("rootGoal", { required: true })}
              type="text"
              className="modal-overlay focus:ring-tremor-content-background  h-9 w-full appearance-none rounded-md pl-4 ring-1   ring-gray-200 transition duration-200 focus:outline-none focus:ring-2"
            />
            {errors.rootGoal && (
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
      <div className="modal-overlay h-full rounded-xl">
        <div className="modal-overlay relative h-[88%] w-full">
          <img
            src="https://www.debate.com.mx/__export/1677624300717/sites/debate/img/2023/02/28/deportes_extremos.jpg_242310155.jpg"
            alt=""
            className="modal-overlay h-full w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
