import { prisma } from "@/lib/db";
import "@/app/globals.css";
import type { News as NewsType } from "@/types";
import News from "@/components/News";
import { Progress } from "@/components/ui/progress";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

// ISR dengan revalidasi setiap 60 detik
export const revalidate = 60;

const NewsPage = async () => {
  const session = await auth();
  if(!session) return redirect('/auth/signin')

  const news = await prisma.news.findMany({
    include: {
      author: true,
      tag: true,
    },
  });

  if (!news || news.length === 0) {
    return <Progress/>
  }

  return (
    <div className="min-h-screen overflow-y-scroll no-scrollbar mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {news.map((newsItem: NewsType) => (
          <News key={newsItem.id} news={newsItem} />
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
