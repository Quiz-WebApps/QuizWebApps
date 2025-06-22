import db from "@/db/drizzle";
import { units } from "@/db/schema";
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

  const unitId = Number(params.id);
  if (isNaN(unitId)) {
    return new NextResponse("Invalid unit ID", { status: 400 });
  }

  const data = await db.query.units.findFirst({
    where: eq(units.id, unitId),
  });

  return data
    ? NextResponse.json(data)
    : new NextResponse("Unit not found", { status: 404 });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const unitId = Number(params.id);
  if (isNaN(unitId)) {
    return new NextResponse("Invalid unit ID", { status: 400 });
  }

  try {
    const body = await req.json();
    const data = await db
      .update(units)
      .set({ ...body })
      .where(eq(units.id, unitId))
      .returning();

    return data.length > 0
      ? NextResponse.json(data[0])
      : new NextResponse("Unit not found", { status: 404 });
  } catch (error) {
    return new NextResponse("Error updating unit", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const unitId = Number(params.id);
  if (isNaN(unitId)) {
    return new NextResponse("Invalid unit ID", { status: 400 });
  }

  try {
    const data = await db
      .delete(units)
      .where(eq(units.id, unitId))
      .returning();

    return data.length > 0
      ? NextResponse.json(data[0])
      : new NextResponse("Unit not found", { status: 404 });
  } catch (error) {
    return new NextResponse("Error deleting unit", { status: 500 });
  }
}