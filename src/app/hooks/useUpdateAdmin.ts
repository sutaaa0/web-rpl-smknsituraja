import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useUpdateAdmin = () => {
  const router = useRouter();
  const { mutate: updateName, isPending: isUpdateNamePending } = useMutation({
    mutationFn: async (name: string) => {
      const res = await axios.post("/api/admin/update-admin", { name });
      return res.data;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Name updated successfully",
      });
      router.refresh();
    },

    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update name",
        variant: "destructive",
      });
    },
  });

  const { mutate: updateEmail, isPending: isUpdateEmailPending } = useMutation({
    mutationFn: async (email: string) => {
      const res = await axios.post("/api/admin/update-email", { email });
      return res.data;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Email updated successfully",
      });
      router.refresh();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update email",
        variant: "destructive",
      });
    },
  });

  const { mutate: updatePassword, isPending: isUpdatePasswordPending } =
    useMutation({
      mutationFn: async (password: string) => {
        const res = await axios.patch("/api/admin/update-password", {
          password,
        });
        return res.data;
      },

      onSuccess: () => {
        toast({
          title: "Success",
          description: "Password updated successfully",
        }),
          router.refresh();
      },

      onError: () => {
        toast({
          title: "Succes",
          description: "Failed to update password",
          variant: "destructive",
        });
      },
    });

  return {
    updateName,
    updateEmail,
    updatePassword,
    isUpdatePasswordPending,
    isUpdateEmailPending,
    isUpdateNamePending,
  };
};
