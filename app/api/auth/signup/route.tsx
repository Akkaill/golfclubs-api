import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";



export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    const hashedPassword = bcrypt.hashSync(password, 10);
    const existtingUserEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existtingUserEmail) {
      return NextResponse.json(
        { user: null, message: "This user is used already" },
        { status: 409 }
      );
    }
    const user = await db.user.create({
      data: {
        name,
        email,
        password:hashedPassword,
      },
    });
    
    return NextResponse.json({ message: "User created", user });
  } catch (error) {
    return NextResponse.json({ error: "User could not be created" });
  }
}

export async function GET() {
  try {
    return NextResponse.json(await db.user.findMany());
  } catch (error) {
    return new NextResponse(error as BodyInit, {
      status: 404,
    });
  }
}
