import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


export async function GET(){
    const getall = await prisma.post.findMany()
    return Response.json(getall)
}
export async function POST(req:Request){
   try{ const {title,desc,content} = await req.json()
    const newPost = await prisma.post.create({
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