import db from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const lessonId = Number(params.id);
  if (isNaN(lessonId)) {
    return new NextResponse("Invalid lesson ID", { status: 400 });
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
  });

  return data
    ? NextResponse.json(data)
    : new NextResponse("Lesson not found", { status: 404 });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const lessonId = Number(params.id);
  if (isNaN(lessonId)) {
    return new NextResponse("Invalid lesson ID", { status: 400 });
  }

  try {
    const body = await req.json();
    const data = await db
      .update(lessons)
      .set({ ...body })
      .where(eq(lessons.id, lessonId))
      .returning();

    return data.length > 0
      ? NextResponse.json(data[0])
      : new NextResponse("Lesson not found", { status: 404 });
  } catch (error) {
    return new NextResponse("Error updating lesson", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const lessonId = Number(params.id);
  if (isNaN(lessonId)) {
    return new NextResponse("Invalid lesson ID", { status: 400 });
  }

  try {
    const data = await db
      .delete(lessons)
      .where(eq(lessons.id, lessonId))
      .returning();

    return data.length > 0
      ? NextResponse.json(data[0])
      : new NextResponse("Lesson not found", { status: 404 });
  } catch (error) {
    return new NextResponse("Error deleting lesson", { status: 500 });
  }
}