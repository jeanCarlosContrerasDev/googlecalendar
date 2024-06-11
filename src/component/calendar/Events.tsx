import React from "react";
import { Calendar } from "~/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { LuCalendarPlus } from "react-icons/lu";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "~/lib/utils";


const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});


export default function EventsCreationForm() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const handleModalClick = (e: any) => {
    console.log("presionado", e.target);
    if (!e.target.className.includes("modal-overlay")) {
      //   onClose();
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <div
      onClick={handleModalClick}
      className="modal-overlay grid h-[70%] w-full grid-cols-2 items-center justify-center gap-12 p-4"
    >
      <div className="modal-overlay col-span-1 w-full space-y-2 pr-4">
        <h2 className="modal-overlay text-md font-bold">Crear actividad</h2>
        <p className="modal-overlay text-xs text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quo
          corrupti voluptatibus quod expedita.
        </p>
        <form
          onClick={handleModalClick}
          // onSubmit={handleSubmit}
          className="modal-overlay grid grid-cols-2 gap-4"
        >
          <div className="modal-overlay col-span-2 ">
            <label htmlFor="id" className="text-sm font-bold text-gray-500">
              Nombre de la actividad
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              //   value={data.nombre}
              //   onChange={handleChange}
              className="modal-overlay focus:ring-tremor-content-background mb-2 h-9 w-full appearance-none rounded-md pl-4 ring-1   ring-gray-200 transition duration-200 focus:outline-none focus:ring-2"
            />
          </div>

          <div className="modal-overlay col-span-2 ">
            <label htmlFor="id" className="text-sm font-bold text-gray-500">
              Meta raiz
            </label>
            <input
              type="number"
              name="precioCosto"
              id="precioCosto"
              //   value={data.precioCosto}
              //   onChange={handleChange}
              className="modal-overlay focus:ring-tremor-content-background mb-2 h-9 w-full appearance-none rounded-md pl-4 ring-1   ring-gray-200 transition duration-200 focus:outline-none focus:ring-2"
            />
          </div>

          <div className=" modal-overlay modal-overlay col-span-2 ">
            <label
              htmlFor="id"
              className=" modal-overlay text-sm font-bold text-gray-500"
            >
              Duración
            </label>
            <div className="modal-overlay flex gap-4">
            <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex w-full items-center gap-2 text-2xl mb-4 mt-4 ">
                <LuCalendarPlus />
                <h1 className="flex w-full text-xl font-bold  text-gray-700 ">
                  Crear Evento
                </h1>
              </div>    

              <FormLabel >Fecha de Finalización</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] pl-3 text-left font-normal ",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Fecha de Inicio</span>
                      )}
                      <div className="ml-auto text-2xl text-gray-700">
                        <IoCalendarNumberOutline />
                      </div>
                      {/* <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> */}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto bg-white p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {/* <FormDescription>
                Crea un nuevo evento .
              </FormDescription> */}
              <FormMessage />
             
            </FormItem>
          )}
        />
              <input
                type="number"
                name="precioVenta"
                id="precioVenta"
                //   value={data.precioVenta}
                //   onChange={handleChange}
                className="modal-overlay focus:ring-tremor-content-background mb-2 h-9 w-full appearance-none rounded-md pl-4 ring-1   ring-gray-200 transition duration-200 focus:outline-none focus:ring-2"
              />
            </div>
          </div>

          <div className="modal-overlay col-span-2 ">
            <label
              htmlFor="id"
              className="modal-overlay text-sm font-bold text-gray-500"
            >
              Frecuencia semanal
            </label>
            <input
              type="number"
              name="cantidad"
              id="cantidad"
              //   value={data.cantidad}
              //   onChange={handleChange}
              className="modal-overlay focus:ring-tremor-content-background mb-2 h-9 w-full appearance-none rounded-md pl-4 ring-1   ring-gray-200 transition duration-200 focus:outline-none focus:ring-2"
            />
          </div>

          <div className="col-span-2">
            <label
              htmlFor="id"
              className="modal-overlay text-sm font-bold text-gray-500"
            >
              Descripcion
            </label>
            <input
              type="text"
              name="descripcion"
              id="descripcion"
              //   value={data.descripcion || ""}
              //   onChange={handleChange}
              className="modal-overlay focus:ring-tremor-content-background mb-2 h-9 w-full appearance-none rounded-md pl-4 ring-1   ring-gray-200 transition duration-200 focus:outline-none focus:ring-2"
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className=" modal-overlayinline-flex w-full justify-center rounded-md border border-transparent bg-violet-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-violet-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Crear actividad
            </button>
          </div>
        </form>
      </div>
      <div className="modal-overlay h-full rounded-xl">
        <div className="modal-overlay relative h-[88%] w-full">
          <img
            src="https://www.debate.com.mx/__export/1677624300717/sites/debate/img/2023/02/28/deportes_extremos.jpg_242310155.jpg"
            alt=""
            className="modal-overlay w-ful h-full rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
}
