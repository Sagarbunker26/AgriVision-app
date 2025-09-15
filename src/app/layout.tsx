import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/agrivision/sidebar-nav';
import { AppHeader } from '@/components/agrivision/header';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/agrivision/theme-provider';
import { LanguageProvider } from '@/hooks/use-language';

export const metadata: Metadata = {
  title: 'AgriVision',
  description: 'AI-Powered Agricultural Advisor',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <LanguageProvider>
            <SidebarProvider>
              <Sidebar>
                <SidebarNav />
              </Sidebar>
              <SidebarInset>
                <div className="flex min-h-svh flex-col">
                  <AppHeader />
                  <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
                </div>
              </SidebarInset>
            </SidebarProvider>
          </LanguageProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
