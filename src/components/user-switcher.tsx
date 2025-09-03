"use client";

import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function UserSwitcher({
  users,
}: {
  users: {
    name: string;
    logo: React.ElementType;
    country: string;
    currency: string;
    personId: string;
    avatarImageUrl: string;
  }[];
}) {
  const { isMobile } = useSidebar();
  const [activeUser, setActiveUser] = React.useState(users[0]);

  if (!activeUser) {
    return null;
  }

  function createInitials(name: string) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  }

  function getCountryAndCurrency(country: string, currency: string) {
    const countryFlags: Record<string, string> = {
      USA: "🇺🇸",
      GB: "🇬🇧",
      IN: "🇮🇳",
      DE: "🇩🇪",
      JP: "🇯🇵",
    };
    const currencySymbols: Record<string, string> = {
      USD: "USD $",
      GBP: "GBP £",
      INR: "INR ₹",
      EUR: "EUR €",
      JPY: "JPY ¥",
    };
    const flag = countryFlags[country] || country;
    const symbol = currencySymbols[currency] || currency;
    return (
      <div className="flex justify-between gap-2">
        <span className="truncate font-medium">{symbol}</span>
        <span className="truncate font-medium">{flag}</span>
      </div>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Avatar>
                  <AvatarImage src={activeUser.avatarImageUrl} />
                  <AvatarFallback>
                    {createInitials(activeUser.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeUser.name}</span>
                <span className="text-gray-600">
                  {getCountryAndCurrency(
                    activeUser.country,
                    activeUser.currency
                  )}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Users
            </DropdownMenuLabel>
            {users.map((user) => (
              <DropdownMenuItem
                key={user.name}
                onClick={() => setActiveUser(user)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <Avatar>
                    <AvatarImage src={user.avatarImageUrl} />
                    <AvatarFallback>{createInitials(user.name)}</AvatarFallback>
                  </Avatar>
                </div>
                {user.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
