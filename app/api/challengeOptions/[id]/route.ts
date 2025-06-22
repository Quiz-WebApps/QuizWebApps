import db from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
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

  const challengeOptionId = Number(params.id);
  if (isNaN(challengeOptionId)) {
    return new NextResponse("Invalid challenge option ID", { status: 400 });
  }

  const data = await db.query.challengeOptions.findFirst({
    where: eq(challengeOptions.id, challengeOptionId),
  });

  return data
    ? NextResponse.json(data)
    : new NextResponse("Challenge option not found", { status: 404 });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const challengeOptionId = Number(params.id);
  if (isNaN(challengeOptionId)) {
    return new NextResponse("Invalid challenge option ID", { status: 400 });
  }

  try {
    const body = await req.json();
    const data = await db
      .update(challengeOptions)
      .set({ ...body })
      .where(eq(challengeOptions.id, challengeOptionId))
      .returning();

    return data.length > 0
      ? NextResponse.json(data[0])
      : new NextResponse("Challenge option not found", { status: 404 });
  } catch (error) {
    return new NextResponse("Error updating challenge option", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const challengeOptionId = Number(params.id);
  if (isNaN(challengeOptionId)) {
    return new NextResponse("Invalid challenge option ID", { status: 400 });
  }

  try {
    const data = await db
      .delete(challengeOptions)
      .where(eq(challengeOptions.id, challengeOptionId))
      .returning();

    return data.length > 0
      ? NextResponse.json(data[0])
      : new NextResponse("Challenge option not found", { status: 404 });
  } catch (error) {
    return new NextResponse("Error deleting challenge option", { status: 500 });
  }
}