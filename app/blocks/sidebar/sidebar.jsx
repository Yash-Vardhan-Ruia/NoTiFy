"use client";
import { cn } from "./utils";
import Link from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";

const SidebarContext = createContext(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = ({ profile, className, children, ...props }) => {
  return (
    <>
      <DesktopSidebar profile={profile} {...props} />
      <MobileSidebar profile={profile} {...props} />
    </>
  );
};

export const DesktopSidebar = ({ profile, className, children, ...props }) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <motion.div
      className={cn(
        "h-full px-4 py-4 hidden md:flex md:flex-col w-[200px] flex-shrink-0",
        "bg-[#2C1A47]",
        className
      )}
      animate={{
        width: animate ? (open ? "300px" : "75px") : "300px",
      }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {open ? <Logo /> : <LogoIcon />}
      <div className="mt-8 flex flex-col gap-2">
        {children}
      </div>
      {/* Display profile info at bottom if provided */}
      {profile && (
        <SidebarLink
          link={{
            label: profile.name,
            href: "#",
            icon: (
              <Image
                src={profile.avatar_url || "/default-avatar.png"}
                className="h-10 w-10 flex-shrink-0 rounded-full"
                width={40}
                height={40}
                alt={profile.name}
              />
            ),
          }}
        />
      )}
    </motion.div>
  );
};

export const MobileSidebar = ({ profile, className, children, ...props }) => {
  const { open, setOpen } = useSidebar();
  return (
    <div
      className={cn(
        "h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between w-full",
        "bg-[#2C1A47]",
        className
      )}
      {...props}
    >
      <div className="flex justify-end z-20 w-full">
        <IconMenu2
          className="text-neutral-800 dark:text-neutral-200"
          onClick={() => setOpen(!open)}
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className={cn(
              "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
              className
            )}
          >
            <div
              className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
              onClick={() => setOpen(!open)}
            >
              <IconX />
            </div>
            {children}
            {profile && (
              <SidebarLink
                link={{
                  label: profile.name,
                  href: "#",
                  icon: (
                    <Image
                      src={profile.avatar_url || "/default-avatar.png"}
                      className="h-10 w-10 flex-shrink-0 rounded-full"
                      width={40}
                      height={40}
                      alt={profile.name}
                    />
                  ),
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}) => {
  const { open, animate } = useSidebar();
  return (
    <Link
      href={link.href}
      className={cn("flex items-center justify-start gap-2 group/sidebar py-2", className)}
      {...props}
    >
      {link.icon}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};
