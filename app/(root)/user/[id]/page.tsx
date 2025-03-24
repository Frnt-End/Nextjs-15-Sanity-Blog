import { Suspense } from "react";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserArticles from "@/components/UserArticles";
import { ArticleCardSkeleton } from "@/components/ArticleCard";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <Image
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className="profile_image"
          />

          <div className="profile_title">
            <h3 className="font-semibold text-[28px] text-center line-clamp-1">
              {user.name}
            </h3>
          </div>

          <p className="profile_user">@{user?.username}</p>
          <p className="profile_bio">{user?.bio}</p>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold font-title">
            {session?.id === id ? "Your" : "All"} Articles
          </p>
          <ul className="card_grid-sm">
            <Suspense fallback={<ArticleCardSkeleton />}>
              <UserArticles id={id} />
            </Suspense>
          </ul>
        </div>
      </section>{" "}
      <div className="divider"></div>
    </>
  );
};

export default Page;
