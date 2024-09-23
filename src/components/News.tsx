"use client";
import { useEffect } from 'react';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import '../components/editor.css';
import { useQuery } from '@tanstack/react-query';
import { getNews } from '../../server/actions';

export default function News() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["news"],
        queryFn: getNews,
    });

    useEffect(() => {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block as HTMLElement);
        });
    }, [data]);



    if (error) console.error(error);

    return (
        <div>
            <h1>News</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {data?.data?.map((item) => {
                        const cleanContent = DOMPurify.sanitize(item.content);
                        return (
                            <div key={item.id}>
                                <h2>{item.title}</h2>
                                <div dangerouslySetInnerHTML={{ __html: cleanContent }} />
                                <p>{item.authorId}</p>
                                <p>{new Date(item.updatedAt).toLocaleString()}</p>
                                <p>{new Date(item.publishedAt).toLocaleString()}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
