"use client";
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import React, { useEffect } from 'react'
import "./styleNews.css";

const DetailsNews = ({ news }: {news : any}) => {

    useEffect(() => {
        document.querySelectorAll("pre code").forEach((block) => {
          hljs.highlightBlock(block as HTMLElement);
        });
      }, []);
      
      // Membersihkan konten dengan DOMPurify
      const cleanContent = news?.content ?? '';

  return (
    <div className="w-full overflow-y-scroll no-scrollbar">
          <div className="font-bold text-center text-2xl sm:text-5xl w-full py-12">
            <h1>{news?.title}</h1>
          </div>
          <div dangerouslySetInnerHTML={{ __html: cleanContent || '<br>' }} />

    </div>
  )
}

export default DetailsNews