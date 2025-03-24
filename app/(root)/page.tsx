import React from "react";
import SearchForm from "../../components/SearchForm";
import { ARTICLES_QUERY } from "@/sanity/lib/queries";
import ArticleCard, { ArticleTypeCard } from "@/components/ArticleCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({ query: ARTICLES_QUERY, params });
  const session = await auth();
  console.log("THE ID Number: ", session?.id);

  return (
    <>
      <section className="header-container mt-[-65px] relative z-10 bg-center">
        <h1 className="heading font-title">
          Read. Write. Inspire.
          <br />
          Let the words speak up
        </h1>

        <p className="sub-heading">
          Explore articles or create your story, poem, technical tutorial,
          review, and everything you would like to share. Articles are endless,
          just like your thoughts.
        </p>

        <div className="wrap-search-form">
          <SearchForm query={query} />
        </div>
      </section>

      <section className="section_container">
        <p className="text-30-semibold font-title">
          {query ? `Search results for "${query}"` : "Explore Articles"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: ArticleTypeCard) => (
              <ArticleCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No articles found</p>
          )}
        </ul>
      </section>
      <SanityLive />
      <div className="divider"></div>
    </>
  );
}
