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
import { useLanguage } from "@/hooks/use-language";

const Logo = () => (
  // YOU CAN REPLACE THIS SVG WITH YOUR OWN LOGO
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
    <path d="M5.5 21C3 19 3 16 5.5 14c2.5-2 5.5-2 8 0 2.5 2 2.5 5 0 7-2.5 2-5.5 2-8 0z"></path>
  </svg>
);


export function SidebarNav() {
  const pathname = usePathname();
  const { t } = useLanguage();
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
              tooltip={{ children: t('sidebar.dashboard') }}
            >
              <Link href="/">
                <LayoutDashboard />
                <span>{t('sidebar.dashboard')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/recommendation")}
              tooltip={{ children: t('sidebar.recommendation') }}
            >
              <Link href="/recommendation">
                <Sprout />
                <span>{t('sidebar.recommendation')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/disease-detection")}
              tooltip={{ children: t('sidebar.disease_detection') }}
            >
              <Link href="/disease-detection">
                <Leaf />
                <span>{t('sidebar.disease_detection')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/qa")}
              tooltip={{ children: t('sidebar.qa') }}
            >
              <Link href="/qa">
                <MessageSquare />
                <span>{t('sidebar.qa')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/help")} tooltip={{ children: t('sidebar.help') }}>
              <Link href="/help">
                <LifeBuoy />
                <span>{t('sidebar.help')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/settings")} tooltip={{ children: t('sidebar.settings') }}>
              <Link href="/settings">
                <Settings />
                <span>{t('sidebar.settings')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
