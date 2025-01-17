import { FileWithPath } from "react-dropzone";
import * as z from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 0.8; // 800kB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const ProfileFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  image: z
    .instanceof(File, {
      message: "Please upload an image.",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `The image is too large. Please choose an image smaller than  1MB.`,
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Please upload a valid image file (JPEG, PNG, or WebP).",
    })
    .or(z.string().url()),
  name: z
    .string()
    .min(6, {
      message: "Name must be at least 6 characters.",
    })
    .max(50, {
      message: "Name must be at most 50 characters.",
    })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Name can only contain alphabetic characters and spaces.",
    }),
});

export type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

export type FileWithPreview = FileWithPath & {
  preview: string;
};

export const accept = {
  "image/*": [".png", ".jpg", ".jpeg"],
};
