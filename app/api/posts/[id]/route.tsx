import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return Response.json(
    await prisma.post.findUnique({
      where: { id: Number(params.id) },
    })
  );
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, desc, content } = await request.json();
    return Response.json(
      await prisma.post.update({
        where: { id: Number(params.id) },
        data: { title, desc, content },
      })
    );
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 404,
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const postId = Number(params.id);
  const deletePost = await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  return Response.json(deletePost);
}
