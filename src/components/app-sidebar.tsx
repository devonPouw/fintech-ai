"use client";

import {
  Banknote,
  Factory,
  Frame,
  Landmark,
  LandPlot,
  Map,
  PieChart,
  PiggyBank,
} from "lucide-react";
import * as React from "react";

import { NavChats } from "@/components/nav-chats";
import { UserSwitcher } from "@/components/user-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  users: [
    {
      name: "Devon Newone",
      personId: "e0c268c9-1320-4e18-8c5c-1769c40a594c",
      country: "USA",
      currency: "USD",
      createdAt: "2025-06-15",
      logo: PiggyBank,
    },
    {
      name: "Ralph Lauren",
      personId: "e45448e6-bd65-4556-9d9d-f69150d5e8a8",
      country: "GB",
      currency: "GBP",
      createdAt: "2025-06-15",
      logo: Banknote,
    },
    {
      name: "Resul Wonderboy",
      personId: "39250001-f9ad-4e61-9803-b6f9ae6cd95f",
      country: "IN",
      currency: "INR",
      createdAt: "2025-06-15",
      logo: Landmark,
    },
    {
      name: "Jan Omniscient",
      personId: "b7df0e5e-e9eb-449e-b2fd-52837c4f6a1e",
      country: "DE",
      currency: "EUR",
      createdAt: "2025-06-15",
      logo: Factory,
    },
    {
      name: "Sam Bashful",
      personId: "64643c10-ade3-466f-8125-271578d1430b",
      country: "JP",
      currency: "JPY",
      createdAt: "2025-06-15",
      logo: LandPlot,
    },
  ],
  chats: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <img src={"rabobank_logo_icon.svg"} alt={"Rabobank Logo"} />
      </SidebarHeader>
      <SidebarContent>
        <NavChats chats={data.chats} />
      </SidebarContent>
      <SidebarFooter>
        <UserSwitcher users={data.users} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
