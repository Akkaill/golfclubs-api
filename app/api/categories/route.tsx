import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    try{const {name}= await req.json()

        const res = await  db.category.findMany
    }
    
}