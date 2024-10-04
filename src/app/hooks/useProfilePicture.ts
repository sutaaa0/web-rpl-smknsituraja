"use client";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useProfilePicture = () => {
  const router = useRouter();

  // Mutation untuk update gambar profil
  const {mutate: updateProfilePicture, isPending: isUpdatePending } = useMutation({
    mutationFn: async (imageUrl: string) => {
      const res = await axios.post("/api/admin/update-picture", { imageUrl });
      return res.data;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      });
      router.refresh(); // Refresh data setelah sukses
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update profile picture",
        variant: "destructive",
      });
      console.error("Error updating picture:", error);
    },
  });

  // Fungsi untuk menghapus gambar profil
  const { mutate: deleteProfilePicture, isPending: isDeletePending } = useMutation({
    mutationFn: async () => {
      const res = await axios.delete("/api/admin/update-picture");
      if (res.status !== 200) {
        throw new Error("Failed to delete profile picture");
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Profile picture deleted successfully",
      });

      toast({
        title: "Success",
        description: "Profile picture deleted successfully",
      });
      router.refresh();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete profile picture",
        variant: "destructive",
      });
    },
  });

  // Fungsi untuk upload gambar ke Cloudinary
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "heszsyql");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dy3y5cnnq/image/upload`,
        formData
      );
      return res.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error; // Melempar error untuk ditangani di komponen yang memanggilnya
    }
  };

    const {mutate: uploadImageM, isPending: isUploadPending} = useMutation({
      mutationFn: async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "heszsyql");
  
        try {
          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/dy3y5cnnq/image/upload`,
            formData
          );
          return res.data.secure_url;
        } catch (error) {
          console.error("Error uploading image:", error);
          throw error; // Lempar error agar bisa ditangani di level komponen
        }
      },
      onError: (error) => {
        // Tampilkan toast atau error handling lain
        console.error("Failed to upload image", error);
      },
      onSuccess: (data) => {
        // Tindakan setelah berhasil mengunggah, misalnya memunculkan toast
        console.log("Image uploaded successfully", data);
      },
    });

  return {
    updateProfilePicture,
    deleteProfilePicture,
    uploadImage,
    uploadImageM,
    isUpdatePending,
    isDeletePending,
    isUploadPending,
  };
};
