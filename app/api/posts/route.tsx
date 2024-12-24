import { db } from "@/lib/db";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category");
  const sort = searchParams.get("sort") || "desc";
  const whereCondition = category
    ? {
        category,
        title: {
          contains: search,
          mode: "insensitive",
        },
      }
    : {
        title: {
          contains: search,
          mode: "insensitive",
        },
      };
  const getall = await db.post.findMany({
    where: whereCondition as any,
    orderBy: {
      createdAt: sort,
    } as any,
  });
  return Response.json(getall);
}
export async function POST(req: Request) {
  try {
    const { title, desc, content } = await req.json();
    const newPost = await db.post.create({
      data: {
        title,
        desc,
        content,
      },
    });
    return Response.json(newPost);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 404,
    });
  }
}
