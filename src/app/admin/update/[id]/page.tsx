"use client";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { NewsForm } from "@/components/NewsForm";
import { Tag } from "@prisma/client";
import "@/app/globals.css";

export default function UpdateNewsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const newsId = params.id;

  const { data: newsData, isLoading: isNewsLoading } = useQuery({
    queryKey: ["news", newsId],
    queryFn: async () => {
      const response = await axios.get(`/api/news/${newsId}`);
      return response.data;
    },
    enabled: !!newsId,
  });

  const { data: tags, isLoading: isTagsLoading } = useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await axios.get("/api/tags");
      return response.data;
    },
  });

  const { mutate: updateNews, isPending } = useMutation({
    mutationFn: (updatedPost: any) => {
      const dataToSend = {
        title: updatedPost.title,
        descriptions: updatedPost.descriptions,
        content: updatedPost.content,
        tagId: updatedPost.tag,
      };
      return axios.patch(`/api/news/${newsId}`, dataToSend);
    },
    onSuccess: () => {
      toast({ title: "Success", description: "News updated successfully!", variant: "default" });
      router.push("/admin/news");
      router.refresh();

    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update news", variant: "destructive" });
    },
  });

  if (isNewsLoading || isTagsLoading) return <div>Loading...</div>;

  // Set the default values to the fetched news data
  const defaultValues = {
    title: newsData?.title || "",
    descriptions: newsData?.descriptions || "",
    tag: newsData?.tag?.id || "", // Use the tag ID instead of the whole tag object
    content: newsData?.content || "",
  };

  function handleSubmit(values: any) {
    console.log("value update:", values);
    updateNews(values);
  }

  return (
    <main className="container mx-auto p-24">
      <NewsForm 
        onSubmit={handleSubmit} 
        defaultValues={defaultValues} 
        isPending={isPending} 
        content={newsData?.content} 
        tags={tags || []} 
      />
    </main>
  );
}
