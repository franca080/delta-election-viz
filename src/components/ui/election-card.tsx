import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

interface ElectionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "winner" | "runner-up";
}

export function ElectionCard({ 
  title, 
  description, 
  children, 
  className,
  variant = "default" 
}: ElectionCardProps) {
  return (
    <Card className={cn(
      "bg-gradient-card shadow-card hover:shadow-glow transition-all duration-300",
      "border-2 hover:scale-105 transform",
      variant === "winner" && "border-winner bg-winner/5",
      variant === "runner-up" && "border-runner-up bg-runner-up/5",
      className
    )}>
      <CardHeader className="pb-3">
        <CardTitle className={cn(
          "text-xl font-bold",
          variant === "winner" && "text-winner",
          variant === "runner-up" && "text-runner-up"
        )}>
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}