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

    console.log("Seeding selesai!");
  } catch (error) {
    console.error(error);
    throw new Error("Gagal seeding database!");
  }
};

main();
