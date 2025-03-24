"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createArticle = async (
  state: any,
  form: FormData,
  content: string
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR"
    });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "content")
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const article = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug
      },
      author: {
        _type: "reference",
        _ref: session?.id
      },
      content
    };

    const result = await writeClient.create({
      _type: "article",
      ...article
    });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS"
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR"
    });
  }
};
