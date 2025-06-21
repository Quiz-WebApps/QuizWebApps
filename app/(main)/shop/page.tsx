import { redirect } from "next/navigation";
import Image from "next/image";

import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { FeedWrapper } from "@/components/feed-wrapper";


import { getUserProgress, getUserSubscription } from "@/db/queries";
import { Items } from "./items";



const ShopPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [
    userProgress,
  ] = await Promise.all([
    userProgressData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress 
        activeCourse={userProgress.activeCourse}
        hearts={userProgress.hearts}
        points={userProgress.points}
        hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image
            src="/store.png"
            alt="Shop"
            height={90}
            width={90}
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Toko
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Belanjakan poin Anda untuk hal-hal keren.
          </p>
          <Items
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={false}
          />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default ShopPage;