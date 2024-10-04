"use client";
import { useEffect } from "react";
import hljs from "highlight.js";
import DOMPurify from "dompurify";
import "../components/editor.css";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";
import { Ellipsis, Link2, SendHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { News } from "@/types";
import { useRouter } from "next/navigation";
import { useDelete } from "@/hooks/useDelete";
import { formatDistanceToNow } from "date-fns";

export default function News({ news }: { news: News }) {
  const router = useRouter();
  const publishedAt = new Date(news.publishedAt);
  const timeAgo = formatDistanceToNow(publishedAt, { addSuffix: true }).replace("about ", "");

  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightBlock(block as HTMLElement);
    });
  }, []);

  const deleteNews = useDelete();
  const handleDelete = async (id: string) => {
    deleteNews.mutate(id);
  }

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card key={news.id} className="max-w-lg w-full">
      <CardHeader className="flex flex-row space-x-4 w-full">
        <div className="flex justify-between w-full items-center">
          <div className="flex w-full justify-start items-center gap-x-3">
            <Avatar>
              <AvatarImage src={news.author.imageUrl as string} />
              <AvatarFallback className="p-2 w-[50px] h-[50px] flex justify-center items-center rounded-full">
                <div className="text-2xl font-bold text-black">
                  {getInitials(news.author.name as string)}
                </div>
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center items-start">
              <div className="font-bold">
                <h1>{news.author.name}</h1>
              </div>
              <div>
                <p className="text-sm text-neutral-700">Published: {timeAgo}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-x-2 items-center">
            <Badge variant="outline">{news.tag.name}</Badge>
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Ellipsis className="cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>News</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { router.push(`/admin/update/${news.id}`) }}>Update</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { handleDelete(news.id)}}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-3">
          <div>
            <a className="text-2xl font-bold" href={`/admin/news/${news.id}`}>
              {news.title}
            </a>
          </div>
          <p>{news.descriptions}</p>
        </div>
      </CardContent>
      <CardFooter className="w-full flex justify-end items-center gap-x-5 text-neutral-700 text-sm h-[50px] mb-1">
        <div className="p-2 flex justify-center items-center rounded-full">
          <Link2 className="cursor-pointer" />
        </div>
        <div className="p-2 bg-green-300 flex justify-center items-center rounded-full">
          <SendHorizontal className="cursor-pointer" />
        </div>
      </CardFooter>
    </Card>
  );
}
