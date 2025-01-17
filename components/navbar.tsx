"use client";

import { useState } from "react";
import Link from "next/link";
import { LoaderCircleIcon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  return (
    <nav className="bg-background shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">Literasi</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                href="/books"
                className="text-gray-600 dark:text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
              Read Book
              </Link>
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
               Home
              </Link>
              {status === "authenticated" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center justify-end gap-2 flex-row-reverse">
                      <Avatar>
                        <AvatarImage
                          src={session?.user?.image || ""}
                          alt={session?.user?.name || ""}
                        />
                        <AvatarFallback>
                          {session?.user?.email?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-right">
                        <p className="font-semibold text-sm">
                          {session?.user?.name ? session?.user?.name : "User"}
                        </p>
                        <p className="font-light text-muted-foreground text-xs">
                          {session?.user?.email}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent sideOffset={5}>
                    <DropdownMenuItem inset asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-500"
                      onClick={async () => await signOut()}
                      inset
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {status === "loading" && (
                <LoaderCircleIcon className="animate-spin w-6 h-6" />
              )}
              {status === "unauthenticated" && (
                <Button variant={"outline"} asChild>
                  <Link
                    href="/signin"
                    className="text-gray-600 dark:text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                </Button>
              )}
              <ModeToggle />
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <ModeToggle />
            <Button
              variant="ghost"
              className="ml-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/books"
              className="text-gray-600 dark:text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              Read Book
            </Link>
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            {status === "loading" && (
                <LoaderCircleIcon className="animate-spin w-6 h-6" />
              )}
              {status === "unauthenticated" && (
                <Button variant={"outline"} asChild>
                  <Link
                    href="/signin"
                    className="text-gray-600 dark:text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                </Button>
              )}
                           {status === "authenticated" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center ml-3 justify-start gap-2 flex-row">
                      <Avatar>
                        <AvatarImage
                          src={session?.user?.image || ""}
                          alt={session?.user?.name || ""}
                        />
                        <AvatarFallback>
                          {session?.user?.email?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <p className="font-semibold text-sm">
                          {session?.user?.name ? session?.user?.name : "User"}
                        </p>
                        <p className="font-light text-muted-foreground text-xs">
                          {session?.user?.email}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" >
                    <DropdownMenuItem  asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-500"
                      onClick={async () => await signOut()}
                      
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
