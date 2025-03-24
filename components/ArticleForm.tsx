"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createArticle } from "@/lib/actions";
import { formSchema } from "@/lib/validation";

const ArticleForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        content
      };

      await formSchema.parseAsync(formValues);

      const result = await createArticle(prevState, formData, content);

      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your article has been created successfully"
        });

        router.push(`/article/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive"
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive"
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR"
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL"
  });

  return (
    <form action={formAction} className="article-form">
      <div>
        <label htmlFor="title" className="article-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="article-form_input"
          required
          placeholder="Article Title"
        />

        {errors.title && <p className="article-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="article-form_label">
          Description (20-500 characters)
        </label>
        <Textarea
          id="description"
          name="description"
          className="article-form_textarea"
          required
          placeholder="Article Description"
        />

        {errors.description && (
          <p className="article-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="article-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="article-form_input"
          required
          placeholder="Article Category (Tech, Health, Education...)"
        />

        {errors.category && (
          <p className="article-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="article-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="article-form_input"
          required
          placeholder="Article Image URL"
        />

        {errors.link && <p className="article-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="content" className="article-form_label">
          Content (10-2500 characters)
        </label>

        <MDEditor
          value={content}
          onChange={(value) => setContent(value as string)}
          id="content"
          preview="edit"
          height={300}
          className="article-form_editor"
          textareaProps={{
            placeholder: "INSPIRE & SHARE :)"
          }}
          previewOptions={{
            disallowedElements: ["style"]
          }}
        />

        {errors.content && (
          <p className="article-form_error">{errors.content}</p>
        )}
      </div>

      <Button
        type="submit"
        className="article-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Article"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default ArticleForm;
