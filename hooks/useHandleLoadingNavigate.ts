import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function useHandleLoadingNavigate({
  pathname,
  pageName,
}: {
  pathname: string;
  pageName: string;
}) {
  const router = useRouter();
  const handleNavigate = (href: string) => {
    if (pathname === href) return;
    const currentRoute = `${href
      .split("/")
      .pop()
      ?.slice(0, 1)
      .toUpperCase()}${href.split("/").pop()?.slice(1)}`;
    toast.loading(`Redirect${pathname ? ` to ${pageName}` : "..."}`, {
      id: "redirect",
    });

    router.push(href);
  };

  useEffect(() => {
    return () => {
      toast.dismiss("redirect");
    };
  }, [pathname]);
  return handleNavigate;
}
