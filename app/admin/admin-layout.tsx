import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isAdmin) redirect("/");

  return (
    <>
      {children}
    </>
  );
}