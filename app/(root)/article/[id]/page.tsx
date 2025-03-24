import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { ARTICLE_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import markdownit from "markdown-it";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

const md = markdownit();

export const experimental_ppr = true;
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(ARTICLE_BY_ID_QUERY, { id });

  if (!post) return notFound();

  const parsedContent = md.render(post.content || "");

  return (
    <>
      <section className="section_container !pt-1 flex items-center justify-center flex-col">
        <div className="w-[90%] sm:w-[70%] space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex justify-between items-center gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-20-medium simple-link">{post.author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{post.category}</p>
          </div>
          <Suspense fallback={<Skeleton className="view_skeleton" />}>
            <View id={id} />
          </Suspense>
          <div className="article_main_img">
            <img
              src={post.image}
              alt="Article Image"
              className="m-auto shadow-2xl rounded-b-xl bg-no-repeat"
            />
          </div>

          <h1 className="inner-heading">{post.title}</h1>
          <p className="inner-sub-heading">{post.description}</p>

          <p className="article-date !text-[14px] !font-semibold">
            {formatDate(post?._createdAt)}
          </p>

          {parsedContent ? (
            <article
              className="prose text-[24px] sm:text-[16px] max-w-4xl font-paragraph font-light"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No content provided</p>
          )}
        </div>
      </section>
      <div className="divider"></div>
    </>
  );
};

export default Page;
