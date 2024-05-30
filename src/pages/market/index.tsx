import { NextPage } from "next";
import { BsBox } from "react-icons/bs";
import TableProduct from "../../component/Table";
import RightSlideModal from "../../component/RightSlideModal";


import { api } from "~/utils/api";
import { useState } from "react";
import FormProduct from "~/component/FormProduct";
import { useProtectView } from "~/hook/useProtectView";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";



const MarketPage: NextPage = () => {  
  const [showModal, setShowModal] = useState(false);
  const getAllProduct = api.market.getAll.useQuery();


  // const {status:AuthStatus} =useProtectView("/");
  // console.log("estatus",AuthStatus)
  const router=useRouter();

  const{error,isLoading}=getAllProduct;

  // if(isLoading || AuthStatus==="loading" ){
  //   return(
  //     <div className="flex w-full h-full items-center justify-center">
  //       <h1 >Cargando....</h1>
  //     </div>
  //   )
  // }

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Nombre", accessor: "nombre" },
    { header: "Precio Costo", accessor: "precioCosto" },
    { header: "Precio Venta", accessor: "precioVenta" },
    { header: "Cantidad", accessor: "cantidad" },
    { header: "Descripcion", accessor: "descripcion" },
    { header: "ID de Creador", accessor: "createdById" },
  ];

  const closeModal = () => {
    setShowModal(!showModal);
  };

  interface FormData {
    nombre: string;
    precioCosto: number;
    precioVenta: number;
    cantidad: number;
    descripcion: string | null;  
    createdById: string,
  }

  const eventData = {
    summary: "Reunión de equipo",
    start: "2024-05-25T14:00:00Z",
    end: "2024-05-25T15:00:00Z",
    description: "Reunión semanal para discutir los avances del proyecto",
    timeZone: "America/New_York"
  };
  
  interface eventos {
    summary: string;
    description: string;
    start: {
      dateTime: string;
      timeZone: string;
    };
    end: {
      dateTime: string;
      timeZone: string;
    };
  }

  const handleProductFormSubmit=async(data: FormData)=>{   
    setShowModal(!showModal);
  }
 
  return (
    <>
      <RightSlideModal
        showModal={showModal}
        closeModal={closeModal}
        titleName="Registro productos"
        sizeModal="md"
      >
        <FormProduct handleProductFormSubmit={handleProductFormSubmit} />
      </RightSlideModal>

      <div className="mx-auto flex w-[1000px] flex-col p-8">
        <div>
          <div className="flex justify-between pb-4 ">
            <div>
              <div className="flex items-center gap-4">
                <div className=" w-14  items-center justify-center rounded-full bg-white p-4 text-2xl text-gray-500">
                  <BsBox />
                </div>
                <h2 className="text-4xl font-light text-gray-600">
                  Listado de productos
                </h2>
              </div>
              <span className="pl-2 text-lg font-normal text-gray-500">
                Crea, edita y administar cada detalle de tus productos
              </span>
            </div>
            <div className="flex flex-col items-end ">
               <h3 onClick={()=>signOut()} className="text-red-600 font-semibold pb-2 pr-2 cursor-pointer">Cerrar sesión</h3>
              <button
                className="h-10 items-end rounded-md border-0 bg-violet-800 px-4 py-2 text-white hover:bg-[#4C1180]"
                onClick={() => setShowModal(!showModal)}
              >
                Agregar Producto
              </button>
            </div>
          </div>
        </div>
        <TableProduct columns={columns} data={getAllProduct.data || []} />      
      </div>
    </>
  );
};
export default MarketPage;
