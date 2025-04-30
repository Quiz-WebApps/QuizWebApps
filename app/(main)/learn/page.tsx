import { redirect } from "next/navigation";

import { getUserProgress } from "@/db/queries";
import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";

import { Header } from "./header";

const LearnPage = async () => {
  const userProgressData = getUserProgress();

  const [
    userProgress,
  ] = await Promise.all([
    userProgressData,
  ]);

  if (!userProgress || !userProgress.activeCourse) redirect("/courses");

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{ title: "HTML", imageSrc: "/html.png" }}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title="HTML" />
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
