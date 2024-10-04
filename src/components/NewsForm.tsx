import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { TitleField } from "./TitleField";
import { DescriptionField } from "./DescriptionField";
import { TagField } from "./TagField";
import { ContentField } from "./ContentField";
import { Tag } from "@prisma/client";

const formSchema = z.object({
  title: z.string().min(5).max(70, { message: "Title must be at most 70 characters long" }).trim(),
  descriptions: z.string().min(5).max(160, { message: "Descriptions must be at most 160 characters long" }).trim(),
  tag: z.string(),
  content: z.string().min(5).max(5000).trim(),
});

export function NewsForm({ 
  onSubmit, 
  defaultValues, 
  isPending, 
  tags, 
  content,
}: { 
  onSubmit: (values: any) => void, 
  defaultValues: any, 
  isPending: boolean, 
  tags: Tag[], 
  content: string,
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <TitleField control={form.control} />
        <DescriptionField control={form.control} />
        <TagField control={form.control} tags={tags} />
        <ContentField control={form.control} content={content} />
        <Button type="submit" className="mt-5">
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
