"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { logInWithCredentials } from "@/app/actions/auth"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email" }).trim(),
  password: z.string().min(5, { message: "Password must be at least 5 characters long" }).max(50, { message: "Password must be at most 50 characters long" }).trim(),
})

export function SignInForm() {
  const router = useRouter();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await logInWithCredentials(values.email, values.password); // Ganti dengan logIn
    console.log("result :",result);
    if (result.status == 200) {
      toast({
        title: "Success",
        description: "Logged in successfully",
        variant: "default"
      });
      router.push("/admin/dashboard");
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to log in",
        variant: "destructive"
      })

      console.log("Error:", result.error);
      console.log("Status:", result.status);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-lg w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
