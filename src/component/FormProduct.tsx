import { NextPage } from "next";
import { useState } from "react";
import { z } from "zod";

const createProduct = z.object({
  nombre: z.string(),
  precioCosto: z.number(),
  precioVenta: z.number(),
  cantidad: z.number(),
  descripcion: z.string().nullable(), 
  createdById: z.string(),
});

type FormProductProps = {
  handleProductFormSubmit: (product: z.infer<typeof createProduct>) => void;
};

interface FormData {
  nombre: string;
  precioCosto: number;
  precioVenta: number;
  cantidad: number;
  descripcion: string | null;
  createdById: string,
  
 
}

const FormProduct: NextPage<FormProductProps> = ({ handleProductFormSubmit,}) => {
  const [data, setData] = useState<FormData>({
    nombre: "",
    precioCosto: 0,
    precioVenta: 0,
    cantidad: 0,
    descripcion: "",  
    createdById: "",     
  });

  const handleChange = ( event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,) => {
    const { name, value } = event.target;
    const Values = name === 'nombre' || name === 'descripcion' ? value : parseInt(value);

    console.log("datos previos =>",Values);
    setData((prevData) => ({
      ...prevData,
      [name]: Values,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleProductFormSubmit(data); 
  };

  
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <label htmlFor="id" className="text-sm text-gray-500">
          Nombre
        </label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={data.nombre}
          onChange={handleChange}
          className="focus:ring-tremor-content-background mb-2 h-9 w-full appearance-none rounded-md pl-4 ring-1   ring-gray-200 transition duration-200 focus:outline-none focus:ring-2"
        />
      </div>

      <div className="col-span-1">
        <label htmlFor="id" className="text-sm text-gray-500">
          Precio Costo
        </label>
        <input
          type="number"
          name="precioCosto"
          id="precioCosto"
          value={data.precioCosto}
          onChange={handleChange}
          className="focus:ring-tremor-content-background mb-2 h-9 w-full appearance-none rounded-md pl-4 ring-1   ring-gray-200 transition duration-200 focus:outline-none focus:ring-2"
        />
      </div>

      <div className="col-span-1">
        <label htmlFor="id" className="text-sm text-gray-500">
          Precio Venta
        </label>
        <input
          type="number"
          name="precioVenta"
          id="precioVenta"
          value={data.precioVenta}
          onChange={handleChange}
          className="focus:ring-tremor-content-background mb-2 h-9 w-full appearance-none rounded-md pl-4 ring-1   ring-gray-200 transition duration-200 focus:outline-none focus:ring-2"
        />
      </div>

      <div className="col-span-1">
        <label htmlFor="id" className="text-sm text-gray-500">
          Cantidad
        </label>
        <input
          type="number"
          name="cantidad"
          id="cantidad"
          value={data.cantidad}
          onChange={handleChange}
          className="focus:ring-tremor-content-background mb-2 h-9 w-full appearance-none rounded-md pl-4 ring-1   ring-gray-200 transition duration-200 focus:outline-none focus:ring-2"
        />
      </div>

      <div className="col-span-1">
        <label htmlFor="id" className="text-sm text-gray-500">
          Descripcion
        </label>
        <input
          type="text"
          name="descripcion"
          id="descripcion"
          value={data.descripcion || ""}
          onChange={handleChange}
          className="focus:ring-tremor-content-background mb-2 h-9 w-full appearance-none rounded-md pl-4 ring-1   ring-gray-200 transition duration-200 focus:outline-none focus:ring-2"
        />
      </div>

      <div className="col-span-2">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-violet-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-violet-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormProduct;
