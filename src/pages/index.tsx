import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useRouter } from "next/router";


export default function LoginForm() {
  const { data: session, status } = useSession();
  const router=useRouter();
 

  if(session){
    router.push("/calendar")
  }

  if(status==="authenticated" ){
    return(
      <div className="flex w-full h-full items-center justify-center">
        <h1 >Cargando....</h1>
      </div>
    )
  }
  

  return (
    <div className="flex h-screen items-center justify-center ">
      <Card className="mx-auto max-w-sm shadow-md bg-white">
        <CardHeader>
          <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
          <CardDescription>
            Ingrese su correo electrónico a continuación para iniciar sesión en
            su cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Olvidaste tu contraseña?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Iniciar sesión
            </Button>

              <Button
                onClick={() => {
                  signIn();
                  
                }}
                type="submit"
                variant="outline"
                className="w-full "
              >
                Iniciar sesion con Google
              </Button>
          

            {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            no tienes cuenta?{" "}
            <Link href="#" className="underline font-semibold">
              crear cuenta
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
