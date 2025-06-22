import db from "@/db/drizzle";
import { courses } from "@/db/schema";
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

  const courseId = Number(params.id);
  if (isNaN(courseId)) {
    return new NextResponse("Invalid course ID", { status: 400 });
  }

  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  });

  return data
    ? NextResponse.json(data)
    : new NextResponse("Course not found", { status: 404 });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const courseId = Number(params.id);
  if (isNaN(courseId)) {
    return new NextResponse("Invalid course ID", { status: 400 });
  }

  try {
    const body = await req.json();
    const data = await db
      .update(courses)
      .set({ ...body })
      .where(eq(courses.id, courseId))
      .returning();

    return data.length > 0
      ? NextResponse.json(data[0])
      : new NextResponse("Course not found", { status: 404 });
  } catch (error) {
    return new NextResponse("Error updating course", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const courseId = Number(params.id);
  if (isNaN(courseId)) {
    return new NextResponse("Invalid course ID", { status: 400 });
  }

  try {
    const data = await db
      .delete(courses)
      .where(eq(courses.id, courseId))
      .returning();

    return data.length > 0
      ? NextResponse.json(data[0])
      : new NextResponse("Course not found", { status: 404 });
  } catch (error) {
    return new NextResponse("Error deleting course", { status: 500 });
  }
}