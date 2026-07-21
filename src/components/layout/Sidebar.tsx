'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home,
  Calendar,
  BookOpen,
  FileText,
  Award,
  Bell,
  Image,
  MessageSquare,
  User,
  Settings,
  LogOut,
  ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore, useUIStore } from '@/store';
import { Button } from '@/components/ui/button';

const studentMenuItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Calendar, label: 'Attendance', href: '/dashboard/attendance' },
  { icon: FileText, label: 'Assignments', href: '/dashboard/assignments' },
  { icon: BookOpen, label: 'Materials', href: '/dashboard/materials' },
  { icon: Award, label: 'Grades', href: '/dashboard/grades' },
  { icon: Bell, label: 'Announcements', href: '/dashboard/announcements' },
  { icon: Image, label: 'Gallery', href: '/dashboard/gallery' },
  { icon: Calendar, label: 'Schedule', href: '/dashboard/schedule' },
  { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages' },
  { icon: User, label: 'Profile', href: '/dashboard/profile' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

const adminMenuItems = [
  { icon: Home, label: 'Dashboard', href: '/admin' },
  { icon: User, label: 'Students', href: '/admin/students' },
  { icon: Calendar, label: 'Attendance', href: '/admin/attendance' },
  { icon: FileText, label: 'Assignments', href: '/admin/assignments' },
  { icon: BookOpen, label: 'Materials', href: '/admin/materials' },
  { icon: Award, label: 'Grades', href: '/admin/grades' },
  { icon: Image, label: 'Gallery', href: '/admin/gallery' },
  { icon: Bell, label: 'Announcements', href: '/admin/announcements' },
  { icon: Calendar, label: 'Calendar', href: '/admin/calendar' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
  { icon: Home, label: 'Landing Page', href: '/admin/landing' },
];

interface SidebarProps {
  type: 'student' | 'admin';
}

export function Sidebar({ type }: SidebarProps) {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { user, logout } = useAuthStore();
  const menuItems = type === 'admin' ? adminMenuItems : studentMenuItems;

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 280 : 80 }}
      className="fixed left-0 top-0 z-40 h-screen glass border-r border-white/10"
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-20 items-center justify-between px-6 border-b border-white/10">
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="text-lg font-bold text-gradient">X-5 SMAN 1</h1>
              <p className="text-xs text-muted-foreground">Purbalingga</p>
            </motion.div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8"
          >
            <ChevronLeft
              className={cn(
                'h-4 w-4 transition-transform',
                !sidebarOpen && 'rotate-180'
              )}
            />
          </Button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link href={item.href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all',
                        isActive
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      {sidebarOpen && (
                        <span className="text-sm font-medium">{item.label}</span>
                      )}
                    </motion.div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User */}
        {sidebarOpen && user && (
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                {user.full_name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.full_name}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user.role}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => logout()}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
