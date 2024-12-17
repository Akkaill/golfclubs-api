import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
    // const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });
    return Response.json({ message: "User created", user });
  } catch (error) {
    return Response.json({ error: "User could not be created" });
  }
}

export async function GET() {
  try {
    return Response.json(await prisma.user.findMany());
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 404,
    });
  }
}
