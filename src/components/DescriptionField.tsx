import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input-search";

export function DescriptionField({ control }: { control: any }) {
  return (
    <FormField
      control={control}
      name="descriptions"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Descriptions</FormLabel>
          <FormControl>
            <Input placeholder="Short description" {...field} className="rounded" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}