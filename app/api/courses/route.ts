import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { courses } from "@/db/schema";

export const GET = async () => {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const data = await db.query.courses.findMany();

  const response = NextResponse.json(data);
  response.headers.set('Content-Range', `courses 0-${data.length - 1}/${data.length}`);
  
  return response;
};

export const POST = async (req: Request) => {
  if (!(await isAdmin())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db.insert(courses).values({
    ...body,
  }).returning();

  return NextResponse.json(data[0]);
};