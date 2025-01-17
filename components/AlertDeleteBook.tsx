"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useOpenAndDeleteBookWithDialog from "@/hooks/useOpenAndDeleteBookWithDialog";
import { useRouter } from "next/navigation";

export default function AlertDeleteBook() {
  const isOpen = useOpenAndDeleteBookWithDialog(state => state.isOpen);
  const onOpen = useOpenAndDeleteBookWithDialog(state => state.onOpen);
  const onDelete = useOpenAndDeleteBookWithDialog(state => state.onDelete);
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpen(false)}>Cancel</AlertDialogCancel>
          <Button
            variant={"destructive"}
            onClick={async () => {
              await onDelete();
            }}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
