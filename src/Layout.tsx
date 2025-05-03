import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/LayoutSidebar";
import BreadCrumbs from "./components/BreadCrumbs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <BreadCrumbs />
        {children}
      </main>
    </SidebarProvider>
  );
}
