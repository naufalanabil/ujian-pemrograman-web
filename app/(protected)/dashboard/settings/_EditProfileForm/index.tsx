"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileWithPath, useDropzone } from "react-dropzone";
import { ImageCropper } from "@/components/extension/image-cropper";
import { User } from "@prisma/client";
import { toast } from "sonner";
import { signIn, useSession, getSession } from "next-auth/react";
import updateProfile from "@/actions/profile";
import {
  FileWithPreview,
  ProfileFormSchema,
  ProfileFormValues,
  accept,
} from "../../_schemas/ProfileSchema";

export function EditProfileForm({ user }: { user: User }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] =
    React.useState<FileWithPreview | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const { update } = useSession();
  const onDrop = React.useCallback((acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      alert("Selected image is too large!");
      return;
    }
    const fileWithPreview = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    setSelectedFile(fileWithPreview);
    setDialogOpen(true);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
  });
  const router = useRouter();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      email: user.email,
      name: user.name || "",
      image: user.profileImgUrl || "",
    },
  });
  const handleImageUpdate = useCallback(
    (base64: string | null) => {
      setCroppedImage(base64);
      form.setValue("image", base64 || "No File Selected");
      form.trigger("image");
    },
    [form]
  );

  async function onSubmit(values: ProfileFormValues) {
    try {
      if (!values.image) {
        toast.error("Please select an image.");
      }
      toast.promise(
        Promise.all([
          updateProfile({
            image: values.image,
          }),
          update({
            name: values.name,
          }),
        ]),
        {
          loading: "Updating...",
          success: "Profile updated successfully",
          error: "Something went wrong",
        }
      );
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                {selectedFile ? (
                  <ImageCropper
                    croppedImage={croppedImage}
                    setCroppedImage={handleImageUpdate}
                    dialogOpen={isDialogOpen}
                    setDialogOpen={setDialogOpen}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                  />
                ) : (
                  <Avatar
                    {...getRootProps()}
                    className="size-36 cursor-pointer ring-offset-2 ring-2 ring-slate-200"
                  >
                    <input {...getInputProps()} />
                    <AvatarImage
                      src={user.profileImgUrl ?? ""}
                      alt={user.name || "No Name yet"}
                    />
                    <AvatarFallback>
                      {user.name || "No Name yet"}
                    </AvatarFallback>
                  </Avatar>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Please enter your name" />
              </FormControl>
              <FormDescription>This is your full name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled placeholder="Email Edit Disabled" {...field} />
              </FormControl>
              <FormDescription>This is your email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={
            form.formState.isSubmitting || form.formState.isSubmitSuccessful
          }
        >
          {form.formState.isSubmitting ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
}
