import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useOpenAndDeleteBookWithDialog from "@/hooks/useOpenAndDeleteBookWithDialog";
import React from "react";

const DeleteBookBtn = (book:{ id: string }) => {
  const onOpen = useOpenAndDeleteBookWithDialog(state => state.onOpen);
  return (
    <DropdownMenuItem
      className="text-destructive"
      onClick={() => onOpen(true, book.id)}
    >
      Delete book
    </DropdownMenuItem>
  );
};

export default DeleteBookBtn;
