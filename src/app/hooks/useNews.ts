"use server";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchNews = async () => {
  const data = await axios.get("/api/news");

  if (!data) {
    throw new Error("Failed to fetch news");
  }
  return data.data;
};

export const useFetchNews = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
  });
};
