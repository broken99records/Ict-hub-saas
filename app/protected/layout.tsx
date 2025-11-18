import Content from "@/components/content";
import ProtectedSidebar from "@/components/protected-sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Content>
      <div className="flex w-full min-h-screen">

        {/* Mobile toggle using <details> */}
        <details className="md:hidden relative">
          <summary className="p-4 cursor-pointer border-b flex items-center justify-between">
            <span></span>
            <span className="text-xl">☰</span> {/* Hamburger icon */}
          </summary>
          
          <aside className="absolute z-10 w-64 bg-white border-r shadow-md">
            <ProtectedSidebar />
          </aside>
        </details>

        {/* Desktop sidebar */}
        <aside className="hidden md:block w-64 shrink-0 border-r">
          <ProtectedSidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4">
          {children}
        </main>

      </div>
    </Content>
  );
}
