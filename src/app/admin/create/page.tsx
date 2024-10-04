"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import { useToast } from "../../../hooks/use-toast";
import axios from "axios";
import { NewsForm } from "@/components/NewsForm";
import { Tag } from "@prisma/client";
import { ProgressLoading } from "@/components/ProgressLoading";
import "@/app/globals.css";

export default function page() {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: createNews, isPending } = useMutation({
    mutationFn: (newPost) => axios.post('/api/news', newPost),
    onSuccess: () => {
      toast({ title: "Success", description: "News created successfully!", variant: "default" });
      router.push("/admin/news");
      // router.refresh();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create news", variant: "destructive" });
    },
  });

  const { data: tags, isLoading } = useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await axios.get("/api/tags");
      return response.data;
    },
  });

  if (isLoading) return <div className="flex items-center justify-center h-screen w-full">
    <ProgressLoading/>
  </div>;

  const defaultValues = { title: "", descriptions: "", tag: "", content: "" };

  function handleSubmit(values: any) {
    console.log("value :", values);
    createNews(values);
  }

  return (
    <main className="container mx-auto p-24 px-[380px] overflow-y-scroll  no-scrollbar">
      <NewsForm onSubmit={handleSubmit} defaultValues={defaultValues} isPending={isPending} content={defaultValues.content} tags={tags || []} />
    </main>
  );
}
