import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/ui/hero-section";
import { PollingUnitResults } from "@/components/PollingUnitResults";
import { LGAResults } from "@/components/LGAResults";
import { StoreResults } from "@/components/StoreResults";
import { Card, CardContent } from "@/components/ui/card";
import { Vote, BarChart3, PlusSquare, MapPin } from "lucide-react";

type ActiveTab = "polling" | "lga" | "store";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("polling");

  const tabs = [
    {
      id: "polling" as const,
      label: "Polling Unit Results",
      icon: Vote,
      description: "View individual polling unit results"
    },
    {
      id: "lga" as const,
      label: "LGA Results",
      icon: BarChart3,
      description: "Aggregated results by Local Government Area"
    },
    {
      id: "store" as const,
      label: "Store Results",
      icon: PlusSquare,
      description: "Enter new election results"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection>
        <div className="text-center text-white">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Delta State Election Dashboard
            </h1>
          </div>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            2011 Election Results Management System
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "hero" : "secondary"}
                  size="lg"
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </HeroSection>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Tab Description */}
        <Card className="mb-8 bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              {(() => {
                const currentTab = tabs.find(tab => tab.id === activeTab);
                const Icon = currentTab?.icon || Vote;
                return <Icon className="w-6 h-6 text-primary" />;
              })()}
              <div>
                <h2 className="text-xl font-semibold">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h2>
                <p className="text-muted-foreground">
                  {tabs.find(tab => tab.id === activeTab)?.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tab Content */}
        <div className="animate-in fade-in duration-500">
          {activeTab === "polling" && <PollingUnitResults />}
          {activeTab === "lga" && <LGAResults />}
          {activeTab === "store" && <StoreResults />}
        </div>
      </div>
    </div>
  );
}