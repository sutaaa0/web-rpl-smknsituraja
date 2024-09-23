import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input-search";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Tiptap from "@/components/Tiptap";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import
axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../hooks/use-toast";

// Separate component for form logic
const CreateNewsForm = ({ onSubmit }) => {
    const router = useRouter();
    const { toast } = useToast();

    // Corrected schema name
    const formSchema = z.object({
        title: z.string().min(5, { message: "Title must be at least 5 characters long" }).max(100, { message: "Title must be at most 100 characters long" }),
        tag: z.string(),
        content: z.string().min(5, { message: "Content must be at least 5 characters long" }).max(100, { message: "Content must be at most 100 characters long" }).trim(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            tag: "news", // Provide a default tag
            content: "",
        },
    });

    const { mutate, isPending } = useMutation({
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

    const handleSubmit = form.handleSubmit(onSubmit);

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit}>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Main title for your product" {...field}
                                    className="rounded" />
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
                                        <SelectValue placeholder="Select   
 a tag" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Tags</SelectLabel>
                                            <SelectItem value="news">News</SelectItem>

                                            <SelectItem value="updates">Updates</SelectItem>
                                            <SelectItem value="events">Events</SelectItem>
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
    );
};

export default CreateNewsForm;