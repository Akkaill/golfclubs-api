import { db } from "@/lib/db";


export async function GET(){
    const getall = await db.post.findMany()
    return Response.json(getall)
}
export async function POST(req:Request){
   try{ const {title,desc,content} = await req.json()
    const newPost = await db.post.create({
        data:{
            title,
            desc,
            content
        }
    })
    return Response.json(newPost)}
    catch(error){
        return new Response(error as BodyInit,{
            status:404
        })
    }
}