import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HeroSectionProps {
  children: ReactNode;
  className?: string;
}

export function HeroSection({ children, className }: HeroSectionProps) {
  return (
    <section className={cn(
      "relative overflow-hidden bg-gradient-hero py-16 px-4",
      "before:absolute before:inset-0 before:bg-white/10 before:backdrop-blur-sm",
      className
    )}>
      <div className="relative z-10 container mx-auto max-w-6xl">
        {children}
      </div>
    </section>
  );
}