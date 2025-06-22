import { auth } from "@clerk/nextjs/server";

const adminIds = [
  "user_2wOw7giyE10jzGgB8IsUaphcWWL",
  "user_2wUtnSwwPEQR87LW60AUj1OVCWb",
];

export const isAdmin = async () => {
  const { userId } = await auth();
  
  if (!userId) {
    return false;
  }

  return adminIds.includes(userId);
};