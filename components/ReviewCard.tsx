import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const CommentCard = ({
  img,
  name,
  email,
  body,
  createdAt,
}: {
  img: string | null;
  name: string | null;
  email: string;
  body: string;
  createdAt: Date;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={img || `https://api.dicebear.com/6.x/initials/svg?seed=${name}`} alt={name || ""} />
          <AvatarFallback className="text-sm">{name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{email}</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground absolute bottom-2 right-2 translate-y-1">{createdAt.toDateString()}</p>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};
export default CommentCard;
