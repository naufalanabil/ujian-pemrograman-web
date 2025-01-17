import deleteBook from "@/actions/books/delete";
import { toast } from "sonner";
import { create } from "zustand";

interface OpenAlertDialogStore {
  isOpen: boolean;
  id?: string;
  onOpen: (isOpen: boolean, id?: string) => void;
  onDelete: () => Promise<void>;
}

const useOpenAndDeleteBookWithDialog = create<OpenAlertDialogStore>((set, get) => ({
  isOpen: false,
  id: undefined,
  onOpen: (isOpen, id) => {
    set({ isOpen, id });
  },
  onDelete: async () => {
    const { id } = get();
    if (!id) throw new Error("No id provided");
    toast.promise(deleteBook(id), {
      loading: "Deleting book...",
      success: "Book deleted successfully",
      error: "Failed to delete book",
    });
    set({ isOpen: false, id: undefined });
  },
}));

export default useOpenAndDeleteBookWithDialog;
