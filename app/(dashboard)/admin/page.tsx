import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


export default async function page() {
    const session = await getServerSession(authOptions)
    console.log(session)
    if(session?.user){
      return<h2>Admin Page {session?.user.name}</h2>
    }
    return<h2>You must to sign in first</h2>

}
