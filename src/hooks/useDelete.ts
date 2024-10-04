"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./use-toast";
import { useRouter } from "next/navigation";

export const useDelete = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/news/${id}`);
    },

    onSuccess: () => {
      toast({
        title: "Success",
        description: "News deleted successfully",
        variant: "default",
      });

    router.refresh();
    },

    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete news",
        variant: "destructive",
      });
    },
  });
};
