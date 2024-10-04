"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input-search";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Tiptap from "@/components/Tiptap";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Tag } from "@prisma/client";


const FormNews = () => {
    const router = useRouter();
    const { toast } = useToast();

    // Corrected schema name
    const formSchema = z.object({
        title: z.string().min(5, { message: "Title must be at least 5 characters long" }).max(100, { message: "Title must be at most 100 characters long" }),
        tag: z.string(),
        content: z.string().min(5, { message: "Content must be at least 5 characters long" }).max(5000, { message: "Content must be at most 100 characters long" }).trim(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            tag: "",
            content: "",
        },
    });

    // Mutation for submitting the news
    const { mutate: createNews, isPending } = useMutation({
        mutationFn: (newPost: z.infer<typeof formSchema>) => {
            return axios.post('/api/news', newPost);
        },
        onError: (error) => {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to create news",
                variant: "destructive",
            });
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "News created successfully!",
                variant: "default",
            });
            router.refresh();
        },
    });

    const { data, isError, isLoading } = useQuery<Tag[]>({
        queryKey: ["tags"],
        queryFn: async () => {
            const response = await axios.get("/api/tags");
            return response.data;
        },
    })


    // Submit handler
    function onSubmit(values: z.infer<typeof formSchema>) {
        createNews(values);
    }

    return (
        <main className="container mx-auto p-24">
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
                        name="tag"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tag</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a tag" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Tags</SelectLabel>
                                                <SelectItem value="news">News</SelectItem>
                                                {data?.map((tag: any, index) => (
                                                    <SelectItem key={index} value={tag.id}>
                                                        {tag.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
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
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Tiptap description={field.name} onChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="mt-5">
                        {isPending ? 'Submitting...' : 'Submit'}
                    </Button>
                </form>
            </Form>
        </main>
    );
}

export default FormNews