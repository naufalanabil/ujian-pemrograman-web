import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dateFormatter from "@/helper/dateFormatter";

// ... rest of your code ...
const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableHiding: true,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div>
          {user.name ? (
            user.name
          ) : (
            <span className="italic text-muted-foreground text-sm">
              *Registered User
            </span>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "profileImgUrl",
    header: "Profile Image",
    enableHiding: true,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Avatar>
          <AvatarImage src={user.profileImgUrl ?? ""} />
          <AvatarFallback>{user.email?.charAt(0)}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    enableHiding: true,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy user ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default userColumns;
