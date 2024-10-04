"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BtnLogout from "@/components/BtnLogout";
import "@/app/globals.css";
import { Admin as AdminType } from "./page";
import { useProfilePicture } from "@/app/hooks/useProfilePicture";
import { useUpdateAdmin } from "@/app/hooks/useUpdateAdmin";
import { toast } from "@/hooks/use-toast";

const ProfilePageClient = React.memo(({ admin }: { admin: AdminType }) => {
  const {
    updateProfilePicture,
    deleteProfilePicture,
    uploadImageM,
    isUpdatePending,
    isUploadPending,
    isDeletePending,
  } = useProfilePicture();
  const {
    updateName,
    updatePassword,
    isUpdatePasswordPending,
    isUpdateNamePending,
  } = useUpdateAdmin();

  const [nameUpdate, setNameUpdate] = useState("");
  const [password, setPassword] = useState("");

  const getInitials = (name: string) => {
    return name.split(" ").map((word) => word[0]).join("").toUpperCase().substring(0, 2);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    uploadImageM(file, {
      onSuccess: (imageUrl: string) => updateProfilePicture(imageUrl),
      onError: (error) => console.error("Error handling file change:", error),
    });
  };

  const handleDeletePicture = () => {
    deleteProfilePicture();
  };

  const handleUpdateName = () => {
    if (nameUpdate.length < 4 || nameUpdate.length > 50) {
      return toast({
        title: "Error",
        description: "Name minimal 4 dan maksimal 50 karakter",
        variant: "destructive",
      });
    }
    updateName(nameUpdate);
    setNameUpdate("");
  };

  const handleUpdatePassword = () => {
    if (password.length < 8 || password.length > 50) {
      return toast({
        title: "Error",
        description: "Password minimal 8 dan maksimal 50 karakter",
        variant: "destructive",
      });
    }
    updatePassword(password);
    setPassword("");
  };

  const nameIsEmpty = nameUpdate === "";
  const passwordIsEmpty = password === "";

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <div className="flex-grow overflow-y-auto no-scrollbar">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 flex flex-col gap-4 min-h-full">
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>
                Gambar profil yang mewakili Anda di platform
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full flex items-center gap-x-12">
              <Avatar className="w-[100px] h-[100px]">
                <AvatarImage src={admin?.imageUrl || ""} />
                <AvatarFallback>
                  <div className="flex justify-center items-center text-2xl font-bold text-black w-[100px] h-[100px]">
                    <h1 className="text-3xl">{getInitials(admin?.name || "")}</h1>
                  </div>
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-x-6">
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    id="upload-image"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Button
                    className="p-2"
                    onClick={() => document.getElementById("upload-image")?.click()}
                    disabled={isUpdatePending || isUploadPending}
                  >
                    Change Picture
                  </Button>
                </div>
                <div>
                  <Button
                    className="p-2 text-red-500"
                    variant="outline"
                    onClick={handleDeletePicture}
                    disabled={isDeletePending}
                  >
                    Delete Picture
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>User Name</CardTitle>
              <CardDescription>
                Digunakan sebagai identitas unik Anda dalam sistem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder={admin?.name || ""}
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
                className="p-5"
              />
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleUpdateName} disabled={isUpdateNamePending || nameIsEmpty}>
                Save
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Email</CardTitle>
              <CardDescription>
                Digunakan untuk komunikasi dan pemulihan akun
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder={admin?.email || ""}
                className="p-5"
                disabled
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Kunci keamanan untuk melindungi akun Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder={"**********"}
                className="p-5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={handleUpdatePassword} disabled={isUpdatePasswordPending || passwordIsEmpty}>
                Save
              </Button>
            </CardFooter>
          </Card>
          <div className="flex min-w-full justify-end items-center mt-12">
            <BtnLogout />
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfilePageClient;
