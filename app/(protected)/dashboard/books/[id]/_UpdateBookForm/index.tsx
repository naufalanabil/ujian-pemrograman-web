"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import BookSchema, {
  BookSchemaValues,
} from "@/app/(protected)/dashboard/_schemas/bookSchema";
import {
  ChevronRight,
  LoaderCircleIcon,
  Paperclip,
  Trash2Icon,
} from "lucide-react";
import { MinimalTiptapEditor } from "@/components/extension/minimal-tiptap";
import { cn } from "@/lib/utils";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
} from "@/components/extension/file-uploader";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useRef } from "react";
import { Editor } from "@tiptap/react";
import { Book, Prisma } from "@prisma/client";
import updateBook from "@/actions/books/update";
import { toast } from "sonner";
const mandatoryIndicatorClassName = cn(
  "after:content-['*'] after:ml-0.5 after:text-red-500"
);
type BookWithComment = Prisma.BookGetPayload<{
  include: {
    comments: {
      select: {
        id: true;
        content: true;
        user: {
          select: {
            name: true;
            email: true;
            profileImgUrl: true;
          };
        };
        createdAt: true;
      };
    };
  };
}>;
export default function UpdateBookForm({ book }: { book: BookWithComment }) {
  const editorRef = useRef<Editor | null>(null);
  const router = useRouter();
  const form = useForm<BookSchemaValues>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      id: book.id,
      title: book.name,
      description: book.description || "",
      content: book.content || "",
      author: book.author,
      category: book.category,
      image: book.imageUrl as string,
    },
  });
  const handleCreate = useCallback(
    ({ editor }: { editor: Editor }) => {
      if (form.getValues("content") && editor.isEmpty) {
        editor.commands.setContent(form.getValues("content") || "");
      }
      editorRef.current = editor;
    },
    [form]
  );

  async function onSubmit(values: BookSchemaValues) {
    const formData = new FormData();
    try {
      Object.entries(values).forEach(([key, value]) => {
        if (value instanceof FileList) {
          // Handle FileList (e.g., for file inputs)
          Array.from(value).forEach((file) => formData.append(key, file));
        } else if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
      toast.promise(updateBook(formData), {
        loading: "Updating book...",
        success: "Book updated successfully",
        error: "Failed to update book",
      });
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  ">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={mandatoryIndicatorClassName}>
                  Title
                </FormLabel>
                <FormControl>
                  <Input placeholder="Book title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={mandatoryIndicatorClassName}>
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Book description"
                    className="min-h-52"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={mandatoryIndicatorClassName}>
                  Author
                </FormLabel>
                <FormControl>
                  <Input placeholder="Author name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={mandatoryIndicatorClassName}>
                  Category
                </FormLabel>
                <FormControl>
                  <Input placeholder="Book category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={mandatoryIndicatorClassName}>
                  Book Cover
                </FormLabel>
                <FileUploader
                  value={field.value instanceof File ? [field.value] : []}
                  onValueChange={(files) => files && field.onChange(files[0])}
                  dropzoneOptions={{
                    maxFiles: 1,
                    maxSize: 1024 * 1024 * 4,
                    accept: {
                      "image/*": [".png", ".jpeg", ".jpg"],
                    },
                  }}
                  className="relative rounded-lg p-2  bg-secondary min-w-0  "
                >
                  {field.value ? (
                    <FileUploaderContent>
                      <div className="flex relative items-center justify-center flex-col pt-3 pb-4 w-full ">
                        <Image
                          src={
                            field.value instanceof File
                              ? URL.createObjectURL(field.value)
                              : field.value
                          }
                          alt="Book Cover"
                          width={200}
                          height={400}
                          className=" object-cover rounded-lg"
                          priority
                        />
                        <Trash2Icon
                          onClick={() => (
                            form.resetField("image"), field.onChange(null)
                          )}
                          className=" mt-2 w-5 h-5 text-red-500 hover:text-red-600 cursor-pointer "
                        />
                      </div>
                    </FileUploaderContent>
                  ) : (
                    <FileInput className="outline-dashed outline-1 outline-black h-96">
                      <div className="flex items-center justify-center flex-col pt-3 pb-4 h-full w-full">
                        <Paperclip className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
                        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPEG, or JPG images only, max size 3MB
                        </p>
                      </div>
                    </FileInput>
                  )}
                </FileUploader>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={mandatoryIndicatorClassName}>
                  Content
                </FormLabel>
                <FormControl>
                  <MinimalTiptapEditor
                    {...field}
                    throttleDelay={0}
                    className={cn(
                      "h-full min-h-96 w-full max-w-sm min-w-0 md:max-w-none rounded-xl"
                    )}
                    editorContentClassName="overflow-auto h-full"
                    output="html"
                    immediatelyRender={false}
                    placeholder="Type your description here..."
                    onCreate={handleCreate}
                    autofocus={true}
                    editable={true}
                    injectCSS={true}
                    editorClassName="focus:outline-none px-5 py-4 h-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.formState.isDirty && (
            <Button
              type="submit"
              size="lg"
              className="fixed bottom-5 right-5"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <div className="flex items-center gap-3">
                  <p className="text-base text-muted-foreground">Loading...</p>
                  <LoaderCircleIcon className="text-muted-foreground animate-spin duration-1000 w- h-5" />
                </div>
              ) : (
                "Update Book"
              )}
            </Button>
          )}
        </form>
      </Form>
    </>
  );
}
