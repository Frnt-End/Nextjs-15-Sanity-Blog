import { client } from "@/sanity/lib/client";
import { ARTICLE_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { EyeIcon } from "lucide-react";
import { after } from "next/server";

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(ARTICLE_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit()
  );

  return (
    <p className="view-text">
      <span>{totalViews} </span>
      <EyeIcon className="text-right size-5 text-neutral-500" />
    </p>
  );
};
export default View;
