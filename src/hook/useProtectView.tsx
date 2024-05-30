import {useSession}from 'next-auth/react'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function useProtectView(location:string){
    const {data, status}=useSession();
    const router=useRouter();

    useEffect(()=>{
        if(status==="unauthenticated"){
            router.push(location);
        }
    },[status])

    return{
        status,
    };
}

