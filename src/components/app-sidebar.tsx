"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserSwitcher } from "@/components/user-switcher";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <img src={"rabobank-logo-only.png"} alt={"Rabobank Logo"} />
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <UserSwitcher />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
