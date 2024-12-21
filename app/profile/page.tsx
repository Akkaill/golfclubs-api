 'use client'
  import { useEffect } from "react"
  import { useRouter } from "next/navigation"
  import { useSession } from "next-auth/react"
  export default function profile(){
    const router = useRouter()
    const {data:status,session}=useSession()

    useEffect(()=>{

        if(status==='unauthenticated'){
            router.push('/')
        }
    },[router,status])
    return(status==='authenticated'&&{
        
    }
        <div></div>
    )
  }