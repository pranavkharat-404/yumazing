"use client";

import * as React from "react";
import { Drawer } from "vaul";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Sheet({ open, onOpenChange, children }: SheetProps) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} shouldScaleBackground>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-forest-900/40 backdrop-blur-sm" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mt-24 flex max-h-[92vh] flex-col rounded-t-4xl bg-cream-50 outline-none">
          <div className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-forest-100" />
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export function SheetHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("border-b border-forest-100 px-6 pb-4 pt-3", className)}>
      {children}
    </div>
  );
}

export function SheetTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <Drawer.Title className={cn("font-display text-xl font-semibold text-forest-900", className)}>
      {children}
    </Drawer.Title>
  );
}

export function SheetBody({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("flex-1 overflow-y-auto px-6 py-4", className)}>{children}</div>;
}

export function SheetFooter({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("border-t border-forest-100 bg-cream-50 px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]", className)}>
      {children}
    </div>
  );
}
