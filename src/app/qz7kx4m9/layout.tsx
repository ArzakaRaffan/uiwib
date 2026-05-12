// src/app/admin/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

const navItems = [
  { href: "/qz7kx4m9/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/qz7kx4m9/competition", label: "Competition", icon: "🏆" },
  { href: "/qz7kx4m9/training", label: "Training", icon: "📚" },
  { href: "/qz7kx4m9/job-expo", label: "Job Expo", icon: "💼" },
  { href: "/qz7kx4m9/partners", label: "Partners", icon: "🤝" },
];

function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Don't show sidebar on login page
  if (pathname === "/qz7kx4m9") return null;

  return (
    <aside className="fixed top-0 left-0 h-screen w-60 bg-white border-r border-neutral-100 flex flex-col z-40 shadow-sm">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-navy-gradient flex items-center justify-center text-white text-xs font-bold font-display">
            UI
          </div>
          <div>
            <p className="text-xs font-bold" style={{ color: "var(--color-navy)" }}>UIWIB Admin</p>
            <p className="text-[10px] text-neutral-400">Content Management</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-link ${isActive ? "active" : ""}`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User info + logout */}
      <div className="px-3 py-4 border-t border-neutral-100">
        {session?.user && (
          <div className="px-4 py-2 mb-2">
            <p className="text-xs font-semibold text-neutral-700">{session.user.name}</p>
            <p className="text-[10px] text-neutral-400">{session.user.email}</p>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/qz7kx4m9" })}
          className="admin-nav-link w-full text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <span>🚪</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminSidebar />
      <div className="ml-0 admin-content">
        {children}
      </div>
      <style jsx global>{`
        /* Only offset content when sidebar is present */
        body:has(.admin-nav-link) .admin-content {
          margin-left: 240px;
        }
      `}</style>
    </SessionProvider>
  );
}
