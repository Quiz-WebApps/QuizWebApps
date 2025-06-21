import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database!");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);


    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "HTML",
        imageSrc: "/html.png",
      },
      {
        id: 2,
        title: "CSS",
        imageSrc: "/css.png",
      },
      {
        id: 3,
        title: "JavaScript",
        imageSrc: "/js.png",
      },
      {
        id: 4,
        title: "Python",
        imageSrc: "/python.png",
      },
      {
        id: 5,
        title: "PHP",
        imageSrc: "/php.png",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, //HTML
        title: "Unit 1",
        description: "Belajar dasar HTML",
        order: 1,
      }
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // Unit 1 (Belajar dasar Html...)
        order: 1,
        title: "Nouns",
      },
      {
        id: 2,
        unitId: 1, // Unit 1 (Belajar dasar Html...)
        order: 2,
        title: "Verbs",
      },
      {
        id: 3,
        unitId: 1, // Unit 1 (Belajar dasar Html...)
        order: 3,
        title: "Verbs",
      },
      {
        id: 4,
        unitId: 1, // Unit 1 (Belajar dasar Html...)
        order: 4,
        title: "Verbs",
      },
      {
        id: 5,
        unitId: 1, // Unit 1 (Belajar dasar Html...)
        order: 5,
        title: "Verbs",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 1,
        question: 'wich one of these is the "the man"?'
      },
      {
        id: 2,
        lessonId: 1, // Nouns
        type: "ASSIST",
        order: 2,
        question: '"the man"',
      },
      {
        id: 3,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 3,
        question: 'wich one of these is the "the robot"?',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1, // wich one of these is the "the man"?
        imageSrc: "/html.png",
        correct: true,
        text: "el hombre",
      },
      {
        challengeId: 1, // wich one of these is the "the man"?
        imageSrc: "/html.png",
        correct: false,
        text: "la mujer",
      },
      {
        challengeId: 1, // wich one of these is the "the man"?
        imageSrc: "/html.png",
        correct: false,
        text: "el robot",
      },
    ]);
    
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2, // "the man"
        correct: true,
        text: "el hombre",
      },
      {
        challengeId: 2, 
        correct: false,
        text: "la mujer",
      },
      {
        challengeId: 2,
        correct: false,
        text: "el robot",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3, // wich one of these is the "the man"?
        imageSrc: "/html.png",
        correct: false,
        text: "el hombre",
      },
      {
        challengeId: 3, // wich one of these is the "the man"?
        imageSrc: "/html.png",
        correct: false,
        text: "la mujer",
      },
      {
        challengeId: 3, // wich one of these is the "the man"?
        imageSrc: "/html.png",
        correct: true,
        text: "el robot",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 4,
        lessonId: 2, // Nouns
        type: "SELECT",
        order: 1,
        question: 'wich one of these is the "the man"?'
      },
      {
        id: 5,
        lessonId: 2, // Nouns
        type: "ASSIST",
        order: 2,
        question: '"the man"',
      },
      {
        id: 6,
        lessonId: 2, // Nouns
        type: "SELECT",
        order: 3,
        question: 'wich one of these is the "the robot"?',
      },
    ]);

    console.log("Seeding selesai!");
  } catch (error) {
    console.error(error);
    throw new Error("Gagal seeding database!");
  }
};

main();
