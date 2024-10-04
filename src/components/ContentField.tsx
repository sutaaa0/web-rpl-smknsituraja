import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import Tiptap from "@/components/Tiptap";

export function ContentField({ control, content }: { control: any, content: string }) {
  return (
    <FormField
      control={control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Content</FormLabel>
          <FormControl>
            <Tiptap description={content || field.name} onChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}