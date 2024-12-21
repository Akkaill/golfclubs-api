import Link from "next/link";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LogoutBTN from "./button/logout";

export const Navbar = async()=>{
    const session = await getServerSession(authOptions)
    return(
        <div className='bg-zinc-100 py-2 border-b fixed w-full z-10 top-0 '>
            <div className="container flex items-center justify-between">
                <Link href={'/'}>
                <button>Home</button>
                </Link>
                {session?.user?(
                    <LogoutBTN/>
                ):(<Link href={'/sign-in'}><button>Sign In</button></Link>)}
            </div>
        </div>
    )
}