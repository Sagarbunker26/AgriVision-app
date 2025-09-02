"use client";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Sprout,
  Leaf,
  MessageSquare,
  LifeBuoy,
  Settings,
} from "lucide-react";

const Logo = () => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
    <path d="M5.5 21C3 19 3 16 5.5 14c2.5-2 5.5-2 8 0 2.5 2 2.5 5 0 7-2.5 2-5.5 2-8 0z"></path>
 </svg>
);


export function SidebarNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-lg font-semibold text-sidebar-foreground">
            AgriVision
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/")}
              tooltip={{ children: "Dashboard" }}
            >
              <Link href="/">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/recommendation")}
              tooltip={{ children: "Crop Recommendation" }}
            >
              <Link href="/recommendation">
                <Sprout />
                <span>Crop Recommendation</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/disease-detection")}
              tooltip={{ children: "Disease Detection" }}
            >
              <Link href="/disease-detection">
                <Leaf />
                <span>Disease Detection</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/qa")}
              tooltip={{ children: "Q&amp;A" }}
            >
              <Link href="/qa">
                <MessageSquare />
                <span>Agricultural Q&amp;A</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={{ children: "Help" }}>
              <LifeBuoy />
              <span>Help</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={{ children: "Settings" }}>
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
