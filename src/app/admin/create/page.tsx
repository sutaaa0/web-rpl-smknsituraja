"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input-search";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Tiptap from "@/components/Tiptap";

export default function Page() {
  const formShcema = z.object({
    title: z.string().min(5, { message: "Title must be at least 5 characters long" }).max(100, { message: "Title must be at most 100 characters long" }),
    price: z.number().min(5, { message: "Title must be at least 5 characters long" }).max(100, { message: "Title must be at most 100 characters long" }),
    content: z.string().min(5, { message: "Title must be at least 5 characters long" }).max(100, { message: "Title must be at most 100 characters long" }).trim(),
  });

  const form = useForm<z.infer<typeof formShcema>>({
    resolver: zodResolver(formShcema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formShcema>) {

  }

  return (
    <main className="p-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Main title for your product" {...field} className="rounded" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>content</FormLabel>
                <FormControl>
                  <Tiptap description={field.name} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-5">Submit</Button>
        </form>
      </Form>
    </main>
  );
}
