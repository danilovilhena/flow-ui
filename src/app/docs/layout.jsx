import DocsHeader from '@/components/docs/header.jsx';
import DocsSidebar from '@/components/docs/sidebar.jsx';
import { SidebarProvider } from '@/components/ui/sidebar.jsx';

const DocsLayout = ({ children }) => {
  return (
    <>
      <DocsHeader />
      <SidebarProvider>
        <DocsSidebar />
        <main className="flex">{children}</main>
      </SidebarProvider>
    </>
  );
};

export default DocsLayout;
