import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  variant?: "default" | "primary" | "accent";
  className?: string;
}

export function StatsCard({ 
  label, 
  value, 
  subtitle, 
  variant = "default",
  className 
}: StatsCardProps) {
  return (
    <div className={cn(
      "p-4 rounded-lg bg-gradient-card shadow-card",
      "hover:shadow-glow transition-all duration-300",
      "border border-border/50",
      variant === "primary" && "bg-primary/5 border-primary/20",
      variant === "accent" && "bg-accent/5 border-accent/20",
      className
    )}>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm font-medium text-muted-foreground mb-1">{label}</div>
      {subtitle && (
        <div className="text-xs text-votes">{subtitle}</div>
      )}
    </div>
  );
}