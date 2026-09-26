import React, { useState, useContext } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';
import {
  LayoutDashboard, User, Link as LinkIcon, Briefcase,
  Code, Award, MessageSquare, LogOut, Menu, X, ChevronRight
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard',       path: '/',           icon: LayoutDashboard },
  { name: 'Profile Settings',path: '/profile',    icon: User },
  { name: 'Social Links',    path: '/social-links',icon: LinkIcon },
  { name: 'Projects',        path: '/projects',   icon: Briefcase },
  { name: 'Skills',          path: '/skills',     icon: Code },
  { name: 'Certificates',    path: '/certificates',icon: Award },
  { name: 'Messages',        path: '/messages',   icon: MessageSquare },
];

const NavLink = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-[var(--duration-color)] group ${
        isActive
          ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)] border border-[var(--color-border-accent)] shadow-[var(--glow-sm,none)]'
          : 'text-[var(--color-text-2)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-1)]'
      }`}
    >
      <Icon size={20} className={isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-3)] group-hover:text-[var(--color-text-1)] transition-colors'} />
      <span className="font-medium text-sm">{item.name}</span>
      {isActive && <ChevronRight size={14} className="ml-auto opacity-50" />}
    </Link>
  );
};

const Layout = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { version } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const closeMobile = () => setMobileOpen(false);

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between shrink-0">
        <div>
          <h1
            className="text-xl font-bold tracking-widest text-[var(--color-accent)]"
            style={{ textShadow: 'var(--text-shadow-logo, none)' }}
          >
            ADMIN PANEL
          </h1>
          <p className="text-[10px] text-[var(--color-text-3)] tracking-widest mt-0.5 uppercase">Portfolio CMS</p>
        </div>
        {/* Close button — mobile only */}
        <button
          onClick={closeMobile}
          className="md:hidden p-1.5 rounded-lg text-[var(--color-text-3)] hover:text-[var(--color-text-1)] hover:bg-[var(--color-surface-2)] transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            item={item}
            isActive={location.pathname === item.path}
            onClick={closeMobile}
          />
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[var(--color-border)] shrink-0">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 text-[var(--color-danger)] hover:bg-[var(--color-surface-2)] rounded-xl transition-colors group"
        >
          <LogOut size={20} className="group-hover:rotate-12 transition-transform duration-200" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-[var(--color-bg)] text-[var(--color-text-1)] overflow-hidden">
      {/* ── Desktop Sidebar ── */}
      <aside className="w-64 bg-[var(--color-surface-1)] border-r border-[var(--color-border)] flex-col hidden md:flex shrink-0">
        <SidebarContent />
      </aside>

      {/* ── Mobile Sidebar Overlay ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMobile}
          />
          {/* Drawer */}
          <aside className="relative w-64 bg-[var(--color-surface-1)] border-r border-[var(--color-border)] flex flex-col z-10 animate-slide-in-left">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header (Desktop + Mobile) */}
        <header className="bg-[var(--color-surface-1)]/80 backdrop-blur border-b border-[var(--color-border)] px-4 py-3 flex justify-between items-center shrink-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-xl text-[var(--color-text-2)] hover:text-[var(--color-text-1)] hover:bg-[var(--color-surface-2)] transition-colors"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>
            <h1 className="md:hidden text-lg font-bold text-[var(--color-accent)] tracking-widest" style={{ textShadow: 'var(--text-shadow-logo, none)' }}>ADMIN</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeSwitcher compact={true} />
            
            <button
              onClick={logout}
              className="hidden md:flex p-2 rounded-xl text-[var(--color-danger)] hover:bg-[var(--color-surface-2)] transition-colors"
              aria-label="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
