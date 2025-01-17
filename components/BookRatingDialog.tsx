"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Book } from "@prisma/client";
import { toast } from "sonner";
import createRate from "@/actions/ratings/create";
import { useRouter } from "next/navigation";
import { BookResponse } from "@/actions/books/get";

const ratingSchema = z.object({
  rating: z.number().min(1).max(5),
});

export type RatingValues = z.infer<typeof ratingSchema>;

export function BookRatingDialog({
  book,
  isRated,
}: BookResponse) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<RatingValues>({
    resolver: zodResolver(ratingSchema),
    defaultValues: {
      rating: 0,
    },
  });
const router=  useRouter()
  async function onSubmit(values: z.infer<typeof ratingSchema>) {
    try {
      toast.promise(
        createRate({ book: { id: book.id }, rating: values.rating }),
        {
          loading: `Creating rates to ${book.name}...`,
          success: `Rate for ${book.name} created successfully!`,
          error: "Failed to create rate. Please try again.",
        }
      );
      setIsOpen(false);
      router.refresh();
      form.reset();
    } catch (error) {
      toast.error("Failed to create rate. Please try again.");
      console.error("Error submitting rating:", error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          disabled={
            form.formState.isSubmitting ||
            form.formState.isSubmitSuccessful ||
            isRated
          }
          className={`my-5 ${form.formState.isSubmitSuccessful || isRated ? "text-green-800 bg-green-100" : ""}`}
          variant="outline"
        >
          {form.formState.isSubmitSuccessful
            ? "Thanks for rating!"
            : isRated
              ? "You already rated this book"
              : "Rate this book"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rate &quot;{book.name}&quot;</DialogTitle>
          <DialogDescription>
            How many stars would you give to this book by {book.author}?
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Rating</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-8 w-8 cursor-pointer ${
                            field.value >= star
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                          onClick={() => field.onChange(star)}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Click on a star to set your rating
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Submit Rating</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
