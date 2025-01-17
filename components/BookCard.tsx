"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StarRating } from "./StarRating";
import Image from "next/image";
import { Book, Prisma, Rating } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { useHandleLoadingNavigate } from "@/hooks/useHandleLoadingNavigate";
import titleToSlug from "@/helper/titleToSlug";

type BookCardProps = Prisma.BookGetPayload<{
  include:{
    ratings: {
      select: {
        rate: true,
      }
    }
  },
}> & {
  children?: React.ReactNode;
 
}

export function BookCard({
  name: title,
  author,
  description,
  imageUrl: coverImage,
  children,
  id,
}: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const slug = titleToSlug(title);
  const pathname = usePathname();
  const handleNavigate = useHandleLoadingNavigate({
    pathname,
    pageName: title,
  });
  return (
    <Card
      className="w-full aspect-[3/4] cursor-pointer relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleNavigate(`/books/${slug}?id=${id}`)}
    >
      <Image
        width={200}
        height={300}
        src={coverImage ?? "https://via.placeholder.com/150"}
        alt={`Cover of ${title}`}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div
        className={`absolute inset-0 bg-black bg-opacity-70 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <CardContent className="p-4 h-full flex flex-col justify-end text-white">
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-sm mb-2">{author}</p>
          <p className="text-sm line-clamp-3 mb-2">{description}</p>
          {children}
        </CardContent>
      </div>
    </Card>
  );
}
