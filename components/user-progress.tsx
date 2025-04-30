import Image from "next/image";
import Link from "next/link";
import { InfinityIcon } from "lucide-react";

import { courses } from "@/db/schema";
import { Button } from "@/components/ui/button";

type Props = {
  activeCourse: typeof courses.$inferSelect;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
}

export const UserProgress = ({
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Link href="/courses">
        <Button variant="ghost">
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className="rounded-md border"
            width={30}
            height={30}
          />
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-orange-500">
          <Image src="/points.png" height={28} width={28} alt="Points" className="mr-2" />
          {points}
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-rose-500">
          <Image src="/heart.png" height={22} width={22} alt="Heart" className="mr-2" />
          {hasActiveSubscription
            ? <InfinityIcon className="h-4 w-4 stroke-3" />
            : hearts
          }
        </Button>
      </Link>
    </div>
  );
};
