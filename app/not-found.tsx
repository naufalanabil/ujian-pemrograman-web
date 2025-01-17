import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound404() {
  return (
    <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3 flex flex-col items-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Oops! Lost in Cyberspace
          </h1>
          <Image
            className="animate-bounce"
            src="/img/404.png"
            alt="404"
            width={150}
            height={150}
          />
          <p className="text-gray-500">
            Looks like you&apos;ve ventured into the unknown digital realm.
          </p>
        </div>
        <Button variant={"link"} asChild>
          <Link href="/" prefetch={false}>
            Return to website
          </Link>
        </Button>
      </div>
    </div>
  );
}
