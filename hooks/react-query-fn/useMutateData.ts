import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function  useMutateData<T>({
  toastSuccess,
  toastLoading,
  toastId,
  fetcher,
  tags,
  redirectUrl,
  redirect = true,
}: {
  toastSuccess?: string;
  toastLoading?: string;
  toastId?: string;
  fetcher: (data: T) => Promise<{ success: boolean; error?: string }>;
  redirectUrl?: string;
  tags?: string;
  redirect?: boolean;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationKey: [tags],
    mutationFn: fetcher,
    onMutate: () => {
      toast.loading(toastLoading, {
        id: toastId,
        position: "bottom-right",
        description: "Waiting for response",
      });
    },
    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.error || "Failed", {
          id: toastId,
          position: "bottom-right",
          description: "You are not authorized to perform this action.",
        });
        return;
      }

      queryClient.invalidateQueries({ queryKey: [tags] });
      toast.success(toastSuccess, {
        id: toastId,
        position: "bottom-right",
        description: "Successfully updated!",
      });
      if (redirect) {
        router.push(`${redirectUrl}`);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed", {
        id: toastId,
        position: "bottom-right",
        description: "Please try again later",
      });
    },
  });

  return result;
}
