import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background min-h-screen text-foreground flex flex-col font-sans">
      {children}
    </div>
  );
}
