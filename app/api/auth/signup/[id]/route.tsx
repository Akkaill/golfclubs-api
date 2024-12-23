import { db } from "@/lib/db";
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return Response.json(
    await db.user.findUnique({
      where: { id: Number(params.id) },
    })
  );
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const {email,name,password,image,role} = await request.json();
    return Response.json(
      await db.user.update({
        where: { id: Number(params.id) },
        data: {email,name,password,image,role},
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
  const userId = Number(params.id);
  const deletePost = await db.user.delete({
    where: {
      id: userId,
    },
  });
  return Response.json(deletePost);
}
