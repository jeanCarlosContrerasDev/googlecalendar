import { z } from "zod";
const createProduct = z.object({
    nombre:z.string(),
    precioCosto: z.number(),
    precioVenta: z.number(),
    cantidad: z.number(),
    descripcion: z.string().nullable(), 
    createdById: z.string(), 
  });

  

  export default createProduct