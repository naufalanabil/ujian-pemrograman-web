"use client";

import { usePaginations } from "@/hooks/usePaginations";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type PaginationProps = {
  totalPages: number;
  currentData: number;
};

const CommentPaginations = ({ totalPages, currentData }: PaginationProps) => {
  const { currentPage, getPageNumbers } = usePaginations({
    totalPages,
    currentData,
  });
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageNumbers = getPageNumbers();

  const handlePageClick = (page: number) => {
    if (page > 0 && page <= totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`?${params.toString()}`);
      setTimeout(() => {
        const commentSection = document.getElementById("comment-section");
        if (commentSection) {
          // Pastikan scroll tetap di section komentar
          commentSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 300); // Delay sedikit untuk memastikan navigasi selesai
    }
  };

  return (
    <Pagination className="flex items-center mt-3 justify-end space-x-2">
      <PaginationContent>
        <PaginationItem
          className={`${currentPage === 1 && "text-muted-foreground"}`}
        >
          <PaginationPrevious
            onClick={() => handlePageClick(currentPage - 1)}
          />
        </PaginationItem>
        {pageNumbers.map((page, index) =>
          page === -1 ? (
            <PaginationItem key={index} className="px-2">
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem
          className={`${currentPage === totalPages && "text-muted-foreground"}`}
        >
          <PaginationNext onClick={() => handlePageClick(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CommentPaginations;
