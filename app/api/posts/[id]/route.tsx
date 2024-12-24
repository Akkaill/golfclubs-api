import { db } from "@/lib/db";
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return Response.json(
    await db.post.findUnique({
      where: { id: Number(params.id) },
    })
  );
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, desc, content, category } = await request.json();
    return Response.json(
      await db.post.update({
        where: { id: Number(params.id) },
        data: { title, desc, content,category },
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
  const deletePost = await db.post.delete({
    where: {
      id: postId,
    },
  });
  return Response.json(deletePost);
}
