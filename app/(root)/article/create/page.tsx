import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ArticleForm from "@/components/ArticleForm";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <h1 className="inner-heading pt-12">Create Your Article</h1>
      <ArticleForm />
      <div className="divider"></div>
    </>
  );
};

export default Page;
