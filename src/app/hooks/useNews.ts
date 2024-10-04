import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useNews = () => {
    
  const { data: news, isLoading: isNewsLoading } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await axios.get("/api/news");
      return response.data;
    },
  });

  return {
    news,
    isNewsLoading,
  };


};