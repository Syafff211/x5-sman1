import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar type="student" />
      <div className="pl-20 lg:pl-[280px] transition-all">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
