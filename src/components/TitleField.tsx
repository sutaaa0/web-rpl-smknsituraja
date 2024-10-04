import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input-search";

export function TitleField({ control }: { control: any }) {
  return (
    <FormField
      control={control}
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
  );
}