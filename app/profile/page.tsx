"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log('status',status);
  console.log('session',session);

  useEffect(()=>{

      if(status==='unauthenticated'){
          router.push('/')
      }
  },[router,status])
  return (

        status==='authenticated'&&
          session.user &&(
            <div className="flex pt-20">
              <p>Welcome {session.user.name}</p>
            </div>
          )

        
     
  );
}
