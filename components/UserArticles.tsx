import React from "react";
import { client } from "@/sanity/lib/client";
import { ARTICLES_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import ArticleCard, { ArticleTypeCard } from "@/components/ArticleCard";

const UserArticles = async ({ id }: { id: string }) => {
  const articles = await client.fetch(ARTICLES_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {articles.length > 0 ? (
        articles.map((article: ArticleTypeCard) => (
          <ArticleCard key={article._id} post={article} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
};
export default UserArticles;
