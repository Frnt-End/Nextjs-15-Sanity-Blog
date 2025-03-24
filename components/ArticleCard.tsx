import { cn } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Author, Article } from "@/sanity/types";
import { Skeleton } from "@/components/ui/skeleton";

export type ArticleTypeCard = Omit<Article, "author"> & { author?: Author };

const ArticleCard = ({ post }: { post: ArticleTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description
  } = post;

  return (
    <li className="article-card group">
      <div className="flex-between items-center justify-center">
        <p className="article-card_date text-neutral-600">
          {formatDate(_createdAt)}
        </p>
        <div className="flex items-center gap-1">
          <EyeIcon className="size-5 text-neutral-500" />
          <span className="text-[14px] text-neutral-500 font-semibold">
            {views}
          </span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-3">
        <div className="flex-col">
          <Link
            className="!hover-link flex items-baseline gap-1"
            href={`/user/${author?._id}`}
          >
            <p className="border-spacing-1 text-[15px] leading-[20px] font-normal line-clamp-1">
              {author?.name}
            </p>
          </Link>
          <Link href={`/article/${_id}`}>
            <h3 className="text-26-semibold leading-[32px] line-clamp-1">
              {title}
            </h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image!}
            alt={author?.name!}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/article/${_id}`}>
        <p className="article-card_desc">{description}</p>
        <img src={image} alt="Article Image" className="article-card_img" />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="category-tag">{category}</p>
        </Link>
        <Button className="article-card_btn" asChild>
          <Link href={`/article/${_id}`}>Read</Link>
        </Button>
      </div>
    </li>
  );
};

export const ArticleCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="article-card_skeleton" />
      </li>
    ))}
  </>
);

export default ArticleCard;
