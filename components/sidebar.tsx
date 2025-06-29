import Link from "next/link";
import Image from "next/image";
import {
  ClerkLoading,
  ClerkLoaded,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";
import { SidebarItem } from "@/components/sidebar-item";

type Props = {
  className?: string;
};

export const Sidebar = ({
  className,
}: Props) => {
  return (
    <div className={cn(
      "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
      className,
    )}>
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/logo.png" height={80} width={80} alt="Logo" />
          <h1 className="text-2xl font-extrabold text-violet-600 tracking-wide">
            Quiz App
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem
          label="Belajar"
          iconSrc="/learn.png"
          href="/learn"
        />
        <SidebarItem
          label="Papan Peringkat"
          iconSrc="/leaderboard.png"
          href="/leaderboard"
        />
        <SidebarItem
          label="Misi"
          iconSrc="/quest.png"
          href="/quests"
        />
        <SidebarItem
          label="Toko"
          iconSrc="/shop.png"
          href="/shop"
        />
      </div>
      <div className="p-4 ">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
};
