import { type SchemaTypeDefinition } from "sanity";

import { author } from "@/sanity/schemaTypes/author";
import { article } from "@/sanity/schemaTypes/article";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, article]
};
