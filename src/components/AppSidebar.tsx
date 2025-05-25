import React, { useState } from 'react';
import { Home, Book, User, MessageSquare, Settings, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "About the Novel", url: "/novel", icon: Book },
  { title: "About the Author", url: "/author", icon: User },
  { title: "Reviews", url: "/reviews", icon: MessageSquare },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Burger Button */}
      <div className="absolute top-4 left-4 md:hidden z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg bg-starry-night/80 hover:bg-starry-blue/30 text-starry-gold hover:text-starry-bright-gold transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 768) && (
          <motion.aside
            className="fixed top-0 left-0 z-50 w-64 h-full md:static md:block bg-starry-night/80 border-r border-starry-gold/20 backdrop-blur-sm"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Starry background effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-[-1]">
              <div className="absolute top-16 right-4 w-2 h-2 bg-starry-gold rounded-full animate-float opacity-60" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-32 left-6 w-1 h-1 bg-starry-bright-gold rounded-full animate-float opacity-70" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-20 right-8 w-2 h-2 bg-starry-moon-gold rounded-full animate-float opacity-80" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-40 left-4 w-1 h-1 bg-starry-gold rounded-full animate-float opacity-50" style={{ animationDelay: '1.5s' }}></div>
            </div>

            {/* Sidebar Content */}
            <SidebarGroup className="flex flex-col items-center text-center pt-6">
              <SidebarGroupLabel className="text-starry-gold font-playfair text-lg font-semibold px-4 py-6 text-center w-full">
                Beaten Into Kindness
              </SidebarGroupLabel>
              <SidebarGroupContent className="w-full">
                <SidebarMenu className="space-y-2">
                  {menuItems.map((item) => {
                    const isActive = location.pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.title} className="w-full">
                        <SidebarMenuButton
                          asChild
                          className={`hover-glow transition-all duration-300 w-full justify-center md:justify-start ${
                            isActive
                              ? 'bg-starry-gold/20 text-starry-bright-gold border-l-2 border-starry-gold'
                              : 'text-slate-300 hover:text-starry-gold hover:bg-starry-blue/30'
                          }`}
                        >
                          <Link
                            to={item.url}
                            className="flex items-center gap-3 px-4 py-3 w-full"
                            onClick={() => setSidebarOpen(false)} // close on click
                          >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            <span
                                className={`font-medium text-left ${
                                  sidebarOpen || window.innerWidth >= 768 ? 'block' : 'hidden'
                                }`}
                              >
                                {item.title}
                              </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
