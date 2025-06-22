import db from "@/db/drizzle";
import { challenges } from "@/db/schema";
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

  const challengeId = Number(params.id);
  if (isNaN(challengeId)) {
    return new NextResponse("Invalid Challenge ID", { status: 400 });
  }

  const data = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  return data
    ? NextResponse.json(data)
    : new NextResponse("Challenge not found", { status: 404 });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const challengeId = Number(params.id);
  if (isNaN(challengeId)) {
    return new NextResponse("Invalid Challenge ID", { status: 400 });
  }

  try {
    const body = await req.json();
    const data = await db
      .update(challenges)
      .set({ ...body })
      .where(eq(challenges.id, challengeId))
      .returning();

    return data.length > 0
      ? NextResponse.json(data[0])
      : new NextResponse("Challenge not found", { status: 404 });
  } catch (error) {
    return new NextResponse("Error updating Challenge", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const challengeId = Number(params.id);
  if (isNaN(challengeId)) {
    return new NextResponse("Invalid Challenge ID", { status: 400 });
  }

  try {
    const data = await db
      .delete(challenges)
      .where(eq(challenges.id, challengeId))
      .returning();

    return data.length > 0
      ? NextResponse.json(data[0])
      : new NextResponse("Challenge not found", { status: 404 });
  } catch (error) {
    return new NextResponse("Error deleting Challenge", { status: 500 });
  }
}