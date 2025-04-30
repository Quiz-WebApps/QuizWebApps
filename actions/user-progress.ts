"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";

import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";
import { getCoursesById, getUserProgress } from "@/db/queries";

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) throw new Error("Akses Ditolak!");

  const course = await getCoursesById(courseId);

  if (!course) throw new Error("Kursus tidak ditemukan!");

  // if (!course.units.length || !course.units[0].lessons.length) throw new Error("Kursus masih kosong!");

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: courseId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/logo.png",
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
  }

  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/logo.png",
  });

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};
