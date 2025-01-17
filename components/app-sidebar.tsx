"use client";

import * as React from "react";
import {
  AudioWaveform,
  Book,
  Command,
  GalleryVerticalEnd,
  LoaderCircleIcon,
  Users,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import ProfileSkeleton from "./ProfileSkeleton";

// This is sample data.
const data = {
  teams: [
    {
      name: "Literasi",
      logo: Book,
      plan: "Admin Dashboard",
    },
  ],
  navMain: [
    {
      title: "User",
      url: "/dashboard/users",
      icon: Users,
      isActive: true,
    },
    {
      title: "Books",
      url: "/dashboard/books",
      icon: Book,
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {status === "authenticated" && (
          <NavUser
            user={{
              name: session?.user?.name || "",
              email: session?.user?.email || "",
              avatar: session?.user?.image || "",
            }}
          />
        )}

        {status === "loading" && <ProfileSkeleton/>}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}


