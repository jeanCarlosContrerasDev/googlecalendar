import { NextPage } from "next";
import { LuCalendarPlus } from "react-icons/lu";

const ItemEvent: NextPage = () => {
  const handleSubmit = () => {};
 

  return (
    <div className="modal-overlay" onClick={(e)=>e.stopPropagation()}>

    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 p-4">
      <div className="flex w-full items-center gap-2 text-2xl ">
        <LuCalendarPlus />
        <h1 className="flex w-full text-xl font-bold  text-gray-700">
          Crear Evento
        </h1>
      </div>
      

      <div className="col-span-2">
        <label htmlFor="id" className="text-sm text-gray-500">
          Titulo del Evento
        </label>
        <input
          type="text"
          name="nombre"
          id="nombre"
       
          //   value={data.nombre}
          //   onChange={handleChange}
          className="focus:ring-tremor-content-background mb-2 h-9 w-full appearance-none rounded-md pl-4 ring-1   ring-gray-200 transition duration-200 focus:outline-none focus:ring-2"
        />
      </div>

      <div className="col-span-2">
        <label htmlFor="id" className="text-sm text-gray-500">
          Fecha y Hora de Inicio
        </label>
        <input
          type="number"
          name="precioCosto"
          id="precioCosto"
          //   value={data.precioCosto}
          //   onChange={handleChange}
          className="focus:ring-tremor-content-background mb-2 h-9 w-full appearance-none rounded-md pl-4 ring-1   ring-gray-200 transition duration-200 focus:outline-none focus:ring-2"
        />
      </div>

      <div className="col-span-2">
        <label htmlFor="id" className="text-sm text-gray-500">
          Fecha y Hora de Finalización
        </label>
        <input
          type="text"
          name="precioVenta"
          id="precioVenta"
          //   value={data.precioVenta}
          //   onChange={handleChange}
          className="focus:ring-tremor-content-background mb-2 h-9 w-full appearance-none rounded-md pl-4 ring-1   ring-gray-200 transition duration-200 focus:outline-none focus:ring-2"
        />
      </div>

      <div className="col-span-2">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-violet-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-violet-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Guardar Evento
        </button>
      </div>
    </form>
    </div>
  );
};

export default ItemEvent;
