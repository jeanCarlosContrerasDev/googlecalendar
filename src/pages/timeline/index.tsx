import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { IoMdArrowBack } from "react-icons/io";

export default function Component() {
  const [count, setCount] = useState(1);

  const handleSubmit = () => {
    setCount(count + 1);
  };

  const Time = () => {
    return (
      <div>
        <div className="flex w-full justify-between text-slate-500">
          <IoMdArrowBack />
          <h2 className="text-md mb-4   font-semibold ">
            Módulo de introducción
          </h2>
          <h2 className="text-sm">X</h2>
        </div>
      </div>
    );
  };

  const Informations = () => {
    return (
      <div>
        <div className="flex w-full items-center justify-center py-8">
          <div className="flex w-full max-w-2xl">
            <div className="flex w-1/2 flex-col justify-between rounded-lg  border-r bg-[#E4F1FA] px-6 py-8">
              <div className="mb-4 flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full  border-2 border-blue-500 ${count === 1 ? "bg-white text-blue-500" : "bg-blue-500 text-white"}`}
                >
                  1
                </div>
                <div className="ml-4 text-sm font-semibold text-gray-700">
                  <h2 className="text-md font-semibold text-gray-700 ">
                    {" "}
                    Introducción{" "}
                  </h2>
                  <span className="text-[13px] font-semibold text-gray-500">
                    {" "}
                    Primera actividad{" "}
                  </span>
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full  ${count === 2 ? "border-2 border-blue-500 bg-white text-blue-500" : "bg-white text-slate-600"}`}
                >
                  2
                </div>
                <div className="ml-4">
                  <h2 className="text-md font-semibold text-gray-700 ">
                    {" "}
                    Expectativas{" "}
                  </h2>
                  <span className="text-[13px] font-semibold text-gray-500">
                    {" "}
                    Segunda actividad{" "}
                  </span>
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-600">
                  3
                </div>
                <div className="ml-4 text-sm font-semibold text-gray-700">
                  <h2 className="text-md font-semibold text-gray-700 ">
                    {" "}
                    ¿Por qué estás aquí?{" "}
                  </h2>
                  <span className="text-[13px] font-semibold text-gray-500">
                    {" "}
                    Tercera actividad{" "}
                  </span>
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-600">
                  4
                </div>
                <div className="ml-4 text-sm font-semibold text-gray-700">
                  <h2 className="text-md font-semibold text-gray-700 ">
                    {" "}
                    ¿Qué Quieres Lograr o Cambiar?{" "}
                  </h2>
                  <span className="text-[13px] font-semibold text-gray-500">
                    {" "}
                    Cuarta actividad{" "}
                  </span>
                </div>
              </div>
              <div className="mb-4 flex items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-600">
                  5
                </div>
                <div className="ml-4 text-sm font-semibold text-gray-700">
                  <h2 className="text-md font-semibold text-gray-700 ">
                    {" "}
                    ¿En cuánto tiempo?{" "}
                  </h2>
                  <span className="text-[13px] font-semibold text-gray-500">
                    {" "}
                    Quinta actividad{" "}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex h-full w-1/2 flex-col p-8">
              <div className="flex h-full flex-col  space-y-4">
                {count === 1 ? (
                  <div className="text-sm">
                    <h2 className="mb-4 font-bold text-gray-800">
                      1. ¿Qué Quieres Lograr con Este Programa?
                    </h2>
                    <p className="text-xs text-gray-600">
                      ¡Bienvenido al Programa de Visualización se sueños,
                      Definición de Metas y transformación de plan a realidad!
                      Antes de comenzar este viaje transformador, es importante
                      establecer tus expectativas y objetivos para sacar el
                      máximo provecho de esta experiencia. Permíteme guiarte a
                      través de algunas reflexiones clave que te ayudarán a
                      definir tus metas y expectativas:
                    </p>
                  </div>
                ) : (
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <h2 className="mb-4 font-bold text-gray-800">
                        ¿Cuales son tus Expectativas del Programa?
                      </h2>
                      <p className="mb-4 text-xs text-gray-600">
                        Tómate un momento para reflexionar sobre qué esperas
                        lograr con este programa. ¿Estás buscando claridad en
                        tus metas? ¿Quieres adquirir herramientas para alcanzar
                        tus sueños? identificar tus expectativas te ayudará a
                        enfocar tus esfuerzos y aprovechar al máximo esta
                        oportunidad.
                      </p>
                    </div>
                    <Textarea />
                    <span className="mt-2 text-xs text-gray-400">
                      Máx 360 caracteres
                    </span>
                  </div>
                )}

                <Button
                  onClick={handleSubmit}
                  className="w-full bg-[#3b82f6] text-white"
                >
                  Continuar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="my-auto flex h-screen w-full flex-col items-center justify-center bg-slate-200">
      <div className=" w-80% rounded-lg bg-white px-10 py-6">
        <Time />
        <Informations />
      </div>
    </div>
  );
}
